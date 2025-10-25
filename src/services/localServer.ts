/**
 * Servidor HTTP local que corre en el móvil del HOST
 * FASE D - V3.0
 *
 * Permite crear un servidor simple en el dispositivo del host
 * para que los clientes se conecten vía WebSocket
 *
 * PRIVACIDAD: Todo el tráfico es local, nada va a la nube
 */

import TcpSocket from 'react-native-tcp-socket';
import { NetworkMessage, ConnectedPlayer } from './localMultiplayer';

interface ClientConnection {
  socket: any;
  player: ConnectedPlayer;
}

/**
 * Servidor HTTP/WebSocket local en el móvil del host
 */
class LocalServer {
  private server: any = null;
  private clients: Map<string, ClientConnection> = new Map();
  private port: number = 8080; // Puerto del servidor
  private isRunning: boolean = false;
  private messageHandlers: Map<string, (msg: NetworkMessage, clientId: string) => void> = new Map();

  /**
   * Inicia el servidor en el móvil del host
   */
  async start(port: number = 8080): Promise<number> {
    if (this.isRunning) {
      throw new Error('Server already running');
    }

    this.port = port;

    return new Promise((resolve, reject) => {
      try {
        // Crear servidor TCP
        this.server = TcpSocket.createServer((socket: any) => {
          console.log('Client connected:', socket.address());

          // Generar ID único para el cliente
          const clientId = `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

          // Almacenar conexión
          this.clients.set(clientId, {
            socket,
            player: {
              id: clientId,
              name: 'Unknown',
              isHost: false,
              lastHeartbeat: Date.now(),
            },
          });

          // Handler para datos recibidos
          socket.on('data', (data: any) => {
            try {
              const message = this.parseMessage(data.toString());
              if (message) {
                this.handleClientMessage(message, clientId);
              }
            } catch (error) {
              console.error('Error parsing client message:', error);
            }
          });

          // Handler para desconexión
          socket.on('close', () => {
            console.log('Client disconnected:', clientId);
            this.clients.delete(clientId);
            this.broadcastPlayerLeave(clientId);
          });

          // Handler para errores
          socket.on('error', (error: any) => {
            console.error('Client socket error:', error);
          });
        });

        // Escuchar en todas las interfaces (0.0.0.0)
        this.server.listen({ port: this.port, host: '0.0.0.0' }, () => {
          this.isRunning = true;
          console.log(`Server listening on port ${this.port}`);
          resolve(this.port);
        });

        this.server.on('error', (error: any) => {
          console.error('Server error:', error);
          this.isRunning = false;
          reject(error);
        });

      } catch (error) {
        console.error('Error starting server:', error);
        reject(error);
      }
    });
  }

  /**
   * Parsea mensaje JSON recibido
   */
  private parseMessage(data: string): NetworkMessage | null {
    try {
      // El mensaje puede venir en formato HTTP o WebSocket
      // Para simplicidad, asumimos JSON directo
      const lines = data.split('\n');
      const jsonLine = lines.find(line => line.trim().startsWith('{'));

      if (jsonLine) {
        return JSON.parse(jsonLine);
      }

      // Intentar parsear todo el mensaje
      return JSON.parse(data);
    } catch (error) {
      return null;
    }
  }

  /**
   * Maneja mensajes de clientes
   */
  private handleClientMessage(message: NetworkMessage, clientId: string): void {
    console.log('Message from', clientId, ':', message.type);

    // Actualizar info del jugador si es JOIN
    if (message.type === 'PLAYER_JOIN' && message.payload?.name) {
      const client = this.clients.get(clientId);
      if (client) {
        client.player.name = message.payload.name;
        client.player.avatar = message.payload.avatar;
        client.player.lastHeartbeat = Date.now();

        // Notificar a todos los demás
        this.broadcast(
          {
            type: 'PLAYER_JOIN',
            payload: {
              id: clientId,
              name: message.payload.name,
              avatar: message.payload.avatar,
            },
            timestamp: Date.now(),
          },
          clientId // Excluir al que se unió
        );
      }
    }

    // Actualizar heartbeat
    const client = this.clients.get(clientId);
    if (client) {
      client.player.lastHeartbeat = Date.now();
    }

    // Llamar handlers registrados
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message, clientId);
    }

    // Reenviar mensaje a todos los demás clientes (relay)
    if (message.type !== 'HEARTBEAT') {
      this.broadcast(message, clientId);
    }
  }

  /**
   * Envía mensaje a todos los clientes (broadcast)
   */
  broadcast(message: NetworkMessage, excludeClientId?: string): void {
    const messageStr = JSON.stringify(message) + '\n';

    this.clients.forEach((client, clientId) => {
      if (clientId !== excludeClientId) {
        try {
          client.socket.write(messageStr);
        } catch (error) {
          console.error('Error sending to client:', error);
        }
      }
    });
  }

  /**
   * Envía mensaje a un cliente específico
   */
  sendToClient(clientId: string, message: NetworkMessage): void {
    const client = this.clients.get(clientId);
    if (client) {
      try {
        const messageStr = JSON.stringify(message) + '\n';
        client.socket.write(messageStr);
      } catch (error) {
        console.error('Error sending to client:', error);
      }
    }
  }

  /**
   * Notifica que un jugador se fue
   */
  private broadcastPlayerLeave(clientId: string): void {
    this.broadcast({
      type: 'PLAYER_LEAVE',
      payload: { playerId: clientId },
      timestamp: Date.now(),
    });
  }

  /**
   * Registra un handler para mensajes
   */
  onMessage(type: string, handler: (msg: NetworkMessage, clientId: string) => void): void {
    this.messageHandlers.set(type, handler);
  }

  /**
   * Obtiene lista de jugadores conectados
   */
  getConnectedPlayers(): ConnectedPlayer[] {
    return Array.from(this.clients.values()).map(c => c.player);
  }

  /**
   * Detiene el servidor
   */
  async stop(): Promise<void> {
    if (!this.isRunning) return;

    // Cerrar todas las conexiones de clientes
    this.clients.forEach((client) => {
      try {
        client.socket.destroy();
      } catch (error) {
        console.error('Error closing client socket:', error);
      }
    });

    this.clients.clear();

    // Cerrar servidor
    if (this.server) {
      return new Promise((resolve) => {
        this.server.close(() => {
          this.isRunning = false;
          this.server = null;
          console.log('Server stopped');
          resolve();
        });
      });
    }

    this.isRunning = false;
  }

  /**
   * Verifica si el servidor está corriendo
   */
  isServerRunning(): boolean {
    return this.isRunning;
  }

  /**
   * Obtiene el puerto del servidor
   */
  getPort(): number {
    return this.port;
  }

  /**
   * Obtiene número de clientes conectados
   */
  getClientCount(): number {
    return this.clients.size;
  }
}

// Exportar instancia única (singleton)
export default new LocalServer();
