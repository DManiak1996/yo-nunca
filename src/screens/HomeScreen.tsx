/**
 * Pantalla de inicio de la app
 * V2.0 - Refactorizado con Design Tokens
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import ResumeGameModal from '../components/ResumeGameModal';
import BeerTransitionAnimation from '../components/BeerTransitionAnimation';
import IdleBubblesAnimation from '../components/IdleBubblesAnimation';
import BannerAdComponent from '../components/BannerAdComponent';
import { RootStackParamList, GameSession } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { getGameSession, clearGameSession } from '../utils/storage';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { Nunito_400Regular, Nunito_600SemiBold } from '@expo-google-fonts/nunito';
import { moderateScale, verticalScale, scale, isSmallDevice } from '../utils/responsive';
import { spacing, typography } from '../design-system/tokens';

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
        {/* Logo y título */}
        <View style={styles.titleContainer}>
          <Text style={[styles.logo, { color: theme.text }]}>Yo Nunca</Text>
        </View>

        {/* Botones principales */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="🎮 Seleccionar Juego"
            onPress={() => navigation.navigate('GameSelection')}
            variant="primary"
            style={styles.button}
            accessibilityLabel="Seleccionar Juego"
            accessibilityHint="Toca dos veces para ir a la pantalla de selección de juegos"
          />

          <CustomButton
            title="⚙️ Configuración y Ajustes"
            onPress={() => navigation.navigate('Settings')}
            variant="secondary"
            style={styles.button}
            accessibilityLabel="Configuración y Ajustes"
            accessibilityHint="Toca dos veces para abrir la configuración"
          />
        </View>
        {/* Footer */}
        <Text style={[styles.footer, { color: theme.textSecondary }]}>
          Para mayores de 18 años
        </Text>

        {/* Banner Ad */}
        <BannerAdComponent style={styles.adContainer} />
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
    paddingHorizontal: scale(spacing.lg),
    zIndex: 10, // Por encima de las burbujas
    elevation: 10, // Para Android
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: verticalScale(spacing.sm),
  },
  settingsIcon: {
    padding: scale(spacing.sm),
  },
  settingsIconText: {
    fontSize: moderateScale(typography.fontSize['3xl']),
    fontWeight: 'bold'
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(isSmallDevice() ? 40 : 60),
  },
  logo: {
    fontSize: moderateScale(typography.fontSize['5xl']),
    fontFamily: typography.fontFamily.display,
    textAlign: 'center',
    marginBottom: 0,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: moderateScale(typography.fontSize.xl),
    fontFamily: typography.fontFamily.bodyBold,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: verticalScale(spacing.md),
    paddingBottom: verticalScale(spacing.xl),
  },
  button: {
    width: '100%',
  },
  sectionTitle: {
    fontSize: moderateScale(typography.fontSize.base),
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: verticalScale(spacing.sm),
    marginBottom: verticalScale(spacing.xs),
  },
  footer: {
    textAlign: 'center',
    fontSize: moderateScale(typography.fontSize.xs),
    paddingBottom: spacing.lg,
  },
  adContainer: {
    marginTop: spacing.xl, // Mayor separación del contenido principal (user-friendly)
    marginBottom: spacing.sm,
    opacity: 0.9, // Ligeramente transparente para ser menos intrusivo
  },
});
