/**
 * Pantalla de inicio de la app
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import ResumeGameModal from '../components/ResumeGameModal';
import BeerTransitionAnimation from '../components/BeerTransitionAnimation';
import IdleBubblesAnimation from '../components/IdleBubblesAnimation';
import { RootStackParamList, GameSession } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { getGameSession, clearGameSession } from '../utils/storage';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { moderateScale, verticalScale, scale, isSmallDevice } from '../utils/responsive';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();

  // Cargar fuentes personalizadas (DEBE IR AL PRINCIPIO)
  const [fontsLoaded] = useFonts({
    BebasNeue_400Regular,
    Nunito_400Regular,
    Nunito_600SemiBold,
  });

  const [savedSession, setSavedSession] = useState<GameSession | null>(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [showBeerAnimation, setShowBeerAnimation] = useState(false);
  const [navigationTarget, setNavigationTarget] = useState<keyof RootStackParamList | null>(null);

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

  /**
   * Activa la animación de cerveza y guarda el destino
   */
  const handleNavigationWithAnimation = (target: keyof RootStackParamList) => {
    setShowBeerAnimation(true);
    setNavigationTarget(target);
  };

  /**
   * Callback cuando la animación termina
   */
  const handleAnimationComplete = () => {
    if (navigationTarget) {
      navigation.navigate(navigationTarget as any);
      setNavigationTarget(null);
      // Mantener animación visible 200ms más para cubrir el parpadeo de carga
      setTimeout(() => {
        setShowBeerAnimation(false);
      }, 200);
    } else {
      setShowBeerAnimation(false);
    }
  };

  /**
   * Verifica si hay una sesión guardada al montar
   */
  useEffect(() => {
    checkSavedSession();
  }, []);

  // Esperar a que las fuentes carguen (DESPUÉS de todos los hooks y funciones)
  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Imagen del logo de fondo */}
      <Image
        source={require('../../fondo.png')}
        style={styles.logoImage}
        resizeMode="contain"
      />

      {/* Animación idle de burbujas de fondo */}
      <IdleBubblesAnimation />

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
          <Text style={[styles.logo, { color: theme.text }]}>Yo Nunca</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            El cuerpo lo pide y lo sabes.
          </Text>
        </View>

        {/* Botones principales */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Jugar"
            onPress={() => handleNavigationWithAnimation('CategorySelection')}
            variant="primary"
            style={styles.button}
          />
          <CustomButton
            title="Mis Frases"
            onPress={() => handleNavigationWithAnimation('CustomPhrases')}
            variant="secondary"
            style={styles.button}
          />
          <CustomButton
            title="Tus Estadísticas"
            onPress={() => handleNavigationWithAnimation('GlobalStats')}
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

      {/* Animación de transición de cerveza */}
      {showBeerAnimation && (
        <BeerTransitionAnimation onComplete={handleAnimationComplete} />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoImage: {
    position: 'absolute',
    width: '130%',
    height: '60%',
    top: '3%',
    left: scale(-60),
    zIndex: 0, // Detrás de todo (fondo)
    opacity: 0.9,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
    zIndex: 10, // Por encima de las burbujas
    elevation: 10, // Para Android
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: verticalScale(10),
  },
  settingsIcon: {
    padding: scale(10),
  },
  settingsIconText: {
    fontSize: moderateScale(28),
    fontWeight: 'bold'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(isSmallDevice() ? 40 : 60),
  },
  logo: {
    fontSize: moderateScale(48),
    fontFamily: 'BebasNeue_400Regular',
    textAlign: 'center',
    marginBottom: 0,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: moderateScale(20),
    fontFamily: 'Nunito_600SemiBold',
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: verticalScale(14),
    paddingBottom: verticalScale(30),
  },
  button: {
    width: '100%',
  },
  footer: {
    textAlign: 'center',
    fontSize: moderateScale(12),
    paddingBottom: 20,
  },
});
