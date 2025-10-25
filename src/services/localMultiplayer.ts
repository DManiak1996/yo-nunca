/**
 * Servicio de Multiplayer Local usando servidor HTTP local
 * FASE D - V3.0
 *
 * HOST: Inicia servidor HTTP en su móvil
 * CLIENTES: Se conectan al servidor del host vía TCP
 *
 * 100% PRIVADO: Todo el tráfico es local, nada va a internet
 */

import NetInfo from '@react-native-community/netinfo';
import TcpSocket from 'react-native-tcp-socket';
import LocalServer from './localServer';

// Tipos de mensajes
export type MessageType =
  | 'PLAYER_JOIN'
  | 'PLAYER_LEAVE'
  | 'GAME_START'
  | 'PHRASE_CHANGE'
  | 'VOTE_CAST'
  | 'TRUTH_REVEAL'
  | 'VOTES_REVEAL'
  | 'NEXT_PHRASE'
  | 'GAME_END'
  | 'HEARTBEAT'
  | 'SYNC_STATE';

export interface NetworkMessage {
  type: MessageType;
  payload: any;
  timestamp: number;
  senderId?: string;
}

export interface ConnectedPlayer {
  id: string;
  name: string;
  avatar?: string;
  isHost: boolean;
  lastHeartbeat: number;
}

export interface RoomInfo {
  code: string;
  hostName: string;
  hostIP: string;
  port: number;
  players: ConnectedPlayer[];
  maxPlayers: number;
  gameStarted: boolean;
}

/**
 * Servicio de Multiplayer Local
 */
class LocalMultiplayerService {
  private isHost: boolean = false;
  private roomCode: string = '';
  private hostName: string = '';
  private localIP: string = '';
  private port: number = 8080;
  private clientSocket: any = null;
  private messageHandlers: Map<MessageType, (msg: NetworkMessage) => void> = new Map();
  private heartbeatInterval: NodeJS.Timeout | null = null;

  /**
   * Obtiene la IP local del dispositivo
   */
  async getLocalIP(): Promise<string> {
    try {
      const state = await NetInfo.fetch();

      if (state.type === 'wifi' && state.details) {
        // @ts-ignore - ipAddress existe en WiFi
        const ip = state.details.ipAddress;
        if (ip) {
          this.localIP = ip;
          return ip;
        }
      }

      // Si no está en WiFi, puede ser hotspot
      // IP típica de hotspot: 192.168.43.1 (Android) o 172.20.10.1 (iOS)
      this.localIP = '192.168.43.1';
      return this.localIP;
    } catch (error) {
      console.error('Error getting local IP:', error);
      this.localIP = '192.168.43.1';
      return this.localIP;
    }
  }

  /**
   * HOST: Inicia sala local
   */
  async startHost(hostName: string, port: number = 8080): Promise<RoomInfo> {
    this.isHost = true;
    this.hostName = hostName;
    this.port = port;

    // Generar código de sala de 6 dígitos
    this.roomCode = Math.floor(100000 + Math.random() * 900000).toString();

    // Obtener IP local
    await this.getLocalIP();

    // Iniciar servidor local
    await LocalServer.start(this.port);

    // Registrar handlers del servidor
    LocalServer.onMessage('PLAYER_JOIN', (msg, clientId) => {
      console.log('Player joined:', msg.payload.name);
      this.handleMessage(msg);
    });

    LocalServer.onMessage('VOTE_CAST', (msg, clientId) => {
      this.handleMessage(msg);
    });

    LocalServer.onMessage('TRUTH_REVEAL', (msg, clientId) => {
      this.handleMessage(msg);
    });

    // Iniciar heartbeat
    this.startHeartbeat();

    const roomInfo: RoomInfo = {
      code: this.roomCode,
      hostName: this.hostName,
      hostIP: this.localIP,
      port: this.port,
      players: [{
        id: 'host',
        name: hostName,
        isHost: true,
        lastHeartbeat: Date.now(),
      }],
      maxPlayers: 20,
      gameStarted: false,
    };

    console.log('Host started:', roomInfo);
    return roomInfo;
  }

  /**
   * CLIENTE: Unirse a sala
   */
  async joinRoom(hostIP: string, port: number, code: string, playerName: string): Promise<void> {
    this.isHost = false;
    this.roomCode = code;

    return new Promise((resolve, reject) => {
      try {
        // Conectar al servidor del host
        this.clientSocket = TcpSocket.createConnection(
          {
            port: port,
            host: hostIP,
          },
          () => {
            console.log('Connected to host:', hostIP);

            // Enviar mensaje de join
            this.sendMessage({
              type: 'PLAYER_JOIN',
              payload: { name: playerName },
              timestamp: Date.now(),
            });

            this.startHeartbeat();
            resolve();
          }
        );

        // Handler para datos recibidos
        this.clientSocket.on('data', (data: any) => {
          try {
            const messages = data.toString().split('\n').filter((line: string) => line.trim());
            messages.forEach((msgStr: string) => {
              const message: NetworkMessage = JSON.parse(msgStr);
              this.handleMessage(message);
            });
          } catch (error) {
            console.error('Error parsing server message:', error);
          }
        });

        // Handler para desconexión
        this.clientSocket.on('close', () => {
          console.log('Disconnected from host');
          this.cleanup();
        });

        // Handler para errores
        this.clientSocket.on('error', (error: any) => {
          console.error('Socket error:', error);
          reject(error);
        });

      } catch (error) {
        console.error('Error joining room:', error);
        reject(error);
      }
    });
  }

  /**
   * Envía un mensaje
   */
  sendMessage(message: NetworkMessage): void {
    if (this.isHost) {
      // El host usa el servidor para broadcast
      LocalServer.broadcast(message);
    } else if (this.clientSocket) {
      // El cliente envía al servidor del host
      try {
        const messageStr = JSON.stringify(message) + '\n';
        this.clientSocket.write(messageStr);
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }

  /**
   * Maneja mensajes recibidos
   */
  private handleMessage(message: NetworkMessage): void {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    }
  }

  /**
   * Registra un handler para un tipo de mensaje
   */
  onMessage(type: MessageType, handler: (msg: NetworkMessage) => void): void {
    this.messageHandlers.set(type, handler);
  }

  /**
   * Elimina un handler
   */
  offMessage(type: MessageType): void {
    this.messageHandlers.delete(type);
  }

  /**
   * Inicia el heartbeat
   */
  private startHeartbeat(): void {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
    }

    this.heartbeatInterval = setInterval(() => {
      this.sendMessage({
        type: 'HEARTBEAT',
        payload: {},
        timestamp: Date.now(),
      });
    }, 5000); // Cada 5 segundos
  }

  /**
   * Obtiene jugadores conectados
   */
  getConnectedPlayers(): ConnectedPlayer[] {
    if (this.isHost) {
      return [
        {
          id: 'host',
          name: this.hostName,
          isHost: true,
          lastHeartbeat: Date.now(),
        },
        ...LocalServer.getConnectedPlayers(),
      ];
    }
    return [];
  }

  /**
   * Obtiene información de la sala
   */
  getRoomInfo(): RoomInfo | null {
    if (!this.roomCode) return null;

    return {
      code: this.roomCode,
      hostName: this.hostName,
      hostIP: this.localIP,
      port: this.port,
      players: this.getConnectedPlayers(),
      maxPlayers: 20,
      gameStarted: false,
    };
  }

  /**
   * Desconecta
   */
  async disconnect(): Promise<void> {
    this.sendMessage({
      type: 'PLAYER_LEAVE',
      payload: { playerId: this.isHost ? 'host' : 'client' },
      timestamp: Date.now(),
    });

    await this.cleanup();
  }

  /**
   * Limpia recursos
   */
  private async cleanup(): Promise<void> {
    if (this.heartbeatInterval) {
      clearInterval(this.heartbeatInterval);
      this.heartbeatInterval = null;
    }

    if (this.isHost) {
      await LocalServer.stop();
    } else if (this.clientSocket) {
      this.clientSocket.destroy();
      this.clientSocket = null;
    }

    this.messageHandlers.clear();
    this.isHost = false;
    this.roomCode = '';
  }

  /**
   * Verifica si está conectado
   */
  isConnected(): boolean {
    if (this.isHost) {
      return LocalServer.isServerRunning();
    }
    return this.clientSocket !== null;
  }

  /**
   * Obtiene el código de la sala
   */
  getRoomCode(): string {
    return this.roomCode;
  }

  /**
   * Verifica si es el host
   */
  isHostRole(): boolean {
    return this.isHost;
  }

  /**
   * Obtiene la IP local
   */
  getLocalIPAddress(): string {
    return this.localIP;
  }

  /**
   * Obtiene el puerto
   */
  getPort(): number {
    return this.port;
  }
}

// Exportar instancia única (singleton)
export default new LocalMultiplayerService();
