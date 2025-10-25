/**
 * Pantalla de HOST - Crear sala local
 * FASE D - V3.0
 *
 * El host crea una sala local, inicia el servidor y comparte el código
 *
 * TODO PRODUCCIÓN: Implementar QR codes con Development Build
 * - Instalar react-native-qrcode-svg
 * - Crear Development Build (no funciona en Expo Go)
 * - Ver: https://docs.expo.dev/development/introduction/
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Alert, ScrollView, Share } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import LocalMultiplayer from '../services/localMultiplayer';
import { moderateScale, verticalScale, scale } from '../utils/responsive';

type LocalHostScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LocalHost'>;
type LocalHostScreenRouteProp = RouteProp<RootStackParamList, 'LocalHost'>;

interface Props {
  navigation: LocalHostScreenNavigationProp;
  route: LocalHostScreenRouteProp;
}

export default function LocalHostScreen({ navigation, route }: Props) {
  const { theme } = useTheme();
  const { hostName } = route.params;

  const [roomInfo, setRoomInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [connectedPlayers, setConnectedPlayers] = useState<any[]>([]);

  useEffect(() => {
    startHostServer();

    // Polling para actualizar jugadores conectados
    const interval = setInterval(() => {
      const players = LocalMultiplayer.getConnectedPlayers();
      setConnectedPlayers(players);
    }, 1000);

    return () => {
      clearInterval(interval);
      LocalMultiplayer.disconnect();
    };
  }, []);

  const startHostServer = async () => {
    try {
      setLoading(true);
      const info = await LocalMultiplayer.startHost(hostName);
      setRoomInfo(info);

      // Registrar handler para nuevos jugadores
      LocalMultiplayer.onMessage('PLAYER_JOIN', (msg) => {
        console.log('New player joined:', msg.payload.name);
        const players = LocalMultiplayer.getConnectedPlayers();
        setConnectedPlayers(players);
      });

      setLoading(false);
    } catch (error) {
      console.error('Error starting host:', error);
      Alert.alert('Error', 'No se pudo iniciar el servidor. Verifica los permisos de red.');
      setLoading(false);
    }
  };

  const handleStartGame = () => {
    if (connectedPlayers.length < 2) {
      Alert.alert('Esperando jugadores', 'Necesitas al menos 2 jugadores para empezar');
      return;
    }

    // Enviar mensaje de inicio de juego
    LocalMultiplayer.sendMessage({
      type: 'GAME_START',
      payload: { players: connectedPlayers },
      timestamp: Date.now(),
    });

    // Navegar al modo Detectives con multiplayer
    navigation.navigate('GameDetectives', {
      players: connectedPlayers.map(p => ({
        id: p.id,
        name: p.name,
        avatar: p.avatar || '🎭',
        drinks: 0,
        currentStreak: 0,
        maxStreak: 0,
      })),
      difficulty: 'medio', // Por defecto, se puede elegir antes
    });
  };

  const handleShareCode = async () => {
    if (!roomInfo) return;

    const message = `¡Únete a mi partida de Yo Nunca!

Código: ${roomInfo.code}
IP: ${roomInfo.hostIP}:${roomInfo.port}

1. Conecta al mismo WiFi que yo
2. Abre Yo Nunca → Unirse a Sala
3. Introduce el código: ${roomInfo.code}`;

    try {
      await Share.share({
        message,
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancelar sala',
      '¿Estás seguro de que quieres cancelar la sala?',
      [
        { text: 'No', style: 'cancel' },
        {
          text: 'Sí, cancelar',
          style: 'destructive',
          onPress: () => {
            LocalMultiplayer.disconnect();
            navigation.goBack();
          },
        },
      ]
    );
  };

  if (loading || !roomInfo) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Iniciando servidor local...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            🎮 Sala Local Creada
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Comparte el código con tus amigos
          </Text>
        </View>

        {/* Código grande */}
        <View style={[styles.codeContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.codeLabel, { color: theme.textSecondary }]}>
            Código de sala
          </Text>
          <Text style={[styles.code, { color: theme.primary }]}>
            {roomInfo.code}
          </Text>
          <Text style={[styles.ipLabel, { color: theme.textSecondary }]}>
            IP: {roomInfo.hostIP}:{roomInfo.port}
          </Text>
        </View>

        {/* Instrucciones */}
        <View style={[styles.instructionsContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.instructionsTitle, { color: theme.text }]}>
            📋 Instrucciones para unirse
          </Text>
          <Text style={[styles.instruction, { color: theme.textSecondary }]}>
            1. Todos deben estar en el mismo WiFi
          </Text>
          <Text style={[styles.instruction, { color: theme.textSecondary }]}>
            2. Si no están en WiFi, activa tu Hotspot Personal
          </Text>
          <Text style={[styles.instruction, { color: theme.textSecondary }]}>
            3. Cada jugador introduce el código manualmente
          </Text>
        </View>

        {/* Jugadores conectados */}
        <View style={[styles.playersContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.playersTitle, { color: theme.text }]}>
            Jugadores ({connectedPlayers.length})
          </Text>
          {connectedPlayers.map((player) => (
            <View key={player.id} style={styles.playerRow}>
              <Text style={styles.playerAvatar}>{player.avatar || '🎭'}</Text>
              <Text style={[styles.playerName, { color: theme.text }]}>
                {player.name}
              </Text>
              {player.isHost && (
                <View style={[styles.hostBadge, { backgroundColor: theme.primary }]}>
                  <Text style={styles.hostBadgeText}>HOST</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Compartir Código"
            onPress={handleShareCode}
            variant="secondary"
          />
          <CustomButton
            title={`Iniciar Partida (${connectedPlayers.length} jugadores)`}
            onPress={handleStartGame}
            variant="primary"
            disabled={connectedPlayers.length < 2}
          />
          <CustomButton
            title="Cancelar"
            onPress={handleCancel}
            variant="danger"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: scale(20),
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: moderateScale(16),
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  codeContainer: {
    padding: scale(30),
    borderRadius: moderateScale(20),
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  codeLabel: {
    fontSize: moderateScale(16),
    marginBottom: verticalScale(12),
    fontWeight: '600',
  },
  code: {
    fontSize: moderateScale(48),
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  ipLabel: {
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
  },
  instructionsContainer: {
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
  },
  instructionsTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },
  instruction: {
    fontSize: moderateScale(13),
    marginBottom: verticalScale(4),
  },
  playersContainer: {
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(16),
  },
  playersTitle: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: verticalScale(12),
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: verticalScale(8),
  },
  playerAvatar: {
    fontSize: moderateScale(20),
    marginRight: scale(8),
  },
  playerName: {
    fontSize: moderateScale(14),
    flex: 1,
  },
  hostBadge: {
    paddingVertical: verticalScale(4),
    paddingHorizontal: scale(8),
    borderRadius: moderateScale(6),
  },
  hostBadgeText: {
    color: '#000',
    fontSize: moderateScale(10),
    fontWeight: 'bold',
  },
  buttonsContainer: {
    gap: verticalScale(12),
  },
});
