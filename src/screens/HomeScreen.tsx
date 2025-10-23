/**
 * Pantalla de inicio de la app
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import ResumeGameModal from '../components/ResumeGameModal';
import { RootStackParamList, GameSession } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { getGameSession, clearGameSession } from '../utils/storage';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();
  const [savedSession, setSavedSession] = useState<GameSession | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);

  /**
   * Verifica si hay una sesión guardada al montar
   */
  useEffect(() => {
    checkSavedSession();
  }, []);

  /**
   * Verifica si hay una sesión de juego guardada
   */
  const checkSavedSession = async () => {
    try {
      const session = await getGameSession();
      // Ignorar sesiones que han sido finalizadas manualmente
      if (session && !session.gameEnded) {
        setSavedSession(session);
        setShowResumeModal(true);
      } else if (session?.gameEnded) {
        // Limpiar sesión terminada
        await clearGameSession();
      }
    } catch (error) {
      console.error('Error al verificar sesión guardada:', error);
    }
  };

  /**
   * Continúa la partida guardada
   */
  const handleContinueGame = () => {
    if (!savedSession) return;
    setShowResumeModal(false);
    navigation.navigate('GameMultiplayer', {
      players: savedSession.players,
      difficulty: savedSession.difficulty,
    });
  };

  /**
   * Inicia una nueva partida y limpia la sesión guardada
   */
  const handleNewGame = async () => {
    try {
      await clearGameSession();
    } catch (error) {
      console.error('Error al limpiar sesión:', error);
    }
    setShowResumeModal(false);
    setSavedSession(null);
    navigation.navigate('CategorySelection');
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Header con icono de configuración */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsIcon}
          >
            <Text style={[styles.settingsIconText, { color: theme.text }]}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Logo y título */}
        <View style={styles.titleContainer}>
          <Text style={[styles.logo, { color: theme.text }]}>🍻Yo Nunca🍻</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            El cuerpo lo pide y lo sabes.
          </Text>
        </View>

        {/* Botones principales */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Jugar"
            onPress={() => navigation.navigate('CategorySelection')}
            variant="primary"
            style={styles.button}
          />
          <CustomButton
            title="Mis Frases"
            onPress={() => navigation.navigate('CustomPhrases')}
            variant="secondary"
            style={styles.button}
          />
        </View>

        {/* Footer */}
        <Text style={[styles.footer, { color: theme.textSecondary }]}>
          Para mayores de 18 años
        </Text>
      </View>

      {/* Modal para continuar partida guardada */}
      <ResumeGameModal
        visible={showResumeModal}
        session={savedSession}
        onContinue={handleContinueGame}
        onNewGame={handleNewGame}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  settingsIcon: {
    padding: 10,
  },
  settingsIconText: {
    fontSize: 28,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 16,
    paddingBottom: 40,
  },
  button: {
    width: '100%',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 20,
  },
});
