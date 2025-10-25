/**
 * Pantalla de CLIENTE - Unirse a sala local
 * FASE D - V3.0
 *
 * El cliente introduce código manualmente para unirse a la sala del host
 *
 * TODO PRODUCCIÓN: Implementar escáner QR con Development Build
 * - Instalar expo-camera o react-native-camera
 * - Crear Development Build (no funciona en Expo Go)
 * - Ver: https://docs.expo.dev/development/introduction/
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import LocalMultiplayer from '../services/localMultiplayer';
import { moderateScale, verticalScale, scale } from '../utils/responsive';

type LocalJoinScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LocalJoin'>;
type LocalJoinScreenRouteProp = RouteProp<RootStackParamList, 'LocalJoin'>;

interface Props {
  navigation: LocalJoinScreenNavigationProp;
  route: LocalJoinScreenRouteProp;
}

export default function LocalJoinScreen({ navigation, route }: Props) {
  const { theme } = useTheme();
  const { playerName } = route.params;

  const [code, setCode] = useState('');
  const [hostIP, setHostIP] = useState('');
  const [connecting, setConnecting] = useState(false);

  const handleJoin = async () => {
    if (!code || code.length !== 6) {
      Alert.alert('Código inválido', 'El código debe tener 6 dígitos');
      return;
    }

    if (!hostIP) {
      Alert.alert('IP requerida', 'Introduce la IP del host');
      return;
    }

    setConnecting(true);

    try {
      // Conectar al servidor del host
      await LocalMultiplayer.joinRoom(hostIP, 8080, code, playerName);

      // Esperar mensaje de GAME_START
      LocalMultiplayer.onMessage('GAME_START', (msg) => {
        console.log('Game started!', msg.payload);

        // Navegar al modo Detectives
        navigation.navigate('GameDetectives', {
          players: msg.payload.players.map((p: any) => ({
            id: p.id,
            name: p.name,
            avatar: p.avatar || '🎭',
            drinks: 0,
            currentStreak: 0,
            maxStreak: 0,
          })),
          difficulty: 'medio',
        });
      });

      // Mostrar sala de espera
      Alert.alert(
        '✅ Conectado',
        'Esperando a que el host inicie la partida...',
        [
          {
            text: 'Desconectar',
            style: 'destructive',
            onPress: () => {
              LocalMultiplayer.disconnect();
              navigation.goBack();
            },
          },
        ]
      );

      setConnecting(false);
    } catch (error) {
      console.error('Error joining room:', error);
      Alert.alert(
        'Error de conexión',
        'No se pudo conectar al host. Verifica:\n\n• Estás en el mismo WiFi\n• La IP es correcta\n• El host tiene la sala abierta'
      );
      setConnecting(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={[styles.title, { color: theme.text }]}>
            🔗 Unirse a Sala
          </Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            Introduce el código del host
          </Text>
        </View>

        {/* Formulario */}
        <View style={styles.form}>
          {/* Código */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>
              Código de Sala (6 dígitos)
            </Text>
            <TextInput
              style={[styles.input, {
                backgroundColor: theme.cardBackground,
                color: theme.text,
                borderColor: theme.primary,
              }]}
              placeholder="123456"
              placeholderTextColor={theme.textSecondary}
              value={code}
              onChangeText={setCode}
              keyboardType="number-pad"
              maxLength={6}
              autoFocus
            />
          </View>

          {/* IP del host */}
          <View style={styles.inputContainer}>
            <Text style={[styles.label, { color: theme.text }]}>
              IP del Host
            </Text>
            <TextInput
              style={[styles.input, {
                backgroundColor: theme.cardBackground,
                color: theme.text,
                borderColor: theme.primary,
              }]}
              placeholder="192.168.1.45"
              placeholderTextColor={theme.textSecondary}
              value={hostIP}
              onChangeText={setHostIP}
              keyboardType="decimal-pad"
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={[styles.hint, { color: theme.textSecondary }]}>
              La IP aparece en la pantalla del host
            </Text>
          </View>

          {/* Instrucciones */}
          <View style={[styles.infoBox, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.infoTitle, { color: theme.text }]}>
              💡 ¿Cómo conectarse?
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              1. Asegúrate de estar en el mismo WiFi que el host
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              2. Si el host creó un hotspot, conéctate a él primero
            </Text>
            <Text style={[styles.infoText, { color: theme.textSecondary }]}>
              3. Introduce el código y la IP que aparecen en su pantalla
            </Text>
          </View>
        </View>

        {/* Botones */}
        <View style={styles.buttonsContainer}>
          {connecting ? (
            <View style={[styles.loadingButton, { backgroundColor: theme.primary }]}>
              <ActivityIndicator color="#000" />
              <Text style={styles.loadingText}>Conectando...</Text>
            </View>
          ) : (
            <CustomButton
              title="Unirse a la Sala"
              onPress={handleJoin}
              variant="primary"
              disabled={!code || !hostIP}
            />
          )}

          <CustomButton
            title="Volver"
            onPress={() => navigation.goBack()}
            variant="danger"
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: scale(20),
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(24),
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
  form: {
    flex: 1,
    gap: verticalScale(16),
  },
  inputContainer: {
    marginBottom: verticalScale(16),
  },
  label: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },
  input: {
    borderWidth: 2,
    borderRadius: moderateScale(12),
    padding: scale(16),
    fontSize: moderateScale(16),
    textAlign: 'center',
    letterSpacing: 2,
  },
  hint: {
    fontSize: moderateScale(12),
    marginTop: verticalScale(4),
    textAlign: 'center',
  },
  infoBox: {
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginTop: verticalScale(8),
  },
  infoTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    marginBottom: verticalScale(8),
  },
  infoText: {
    fontSize: moderateScale(12),
    marginBottom: verticalScale(4),
  },
  buttonsContainer: {
    gap: verticalScale(12),
  },
  loadingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: verticalScale(14),
    borderRadius: moderateScale(14),
    gap: scale(12),
  },
  loadingText: {
    color: '#000',
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
});
