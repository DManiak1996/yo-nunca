/**
 * 🍾 PANTALLA: LA BOTELLA
 *
 * Juego de la botella con sistema de escalado
 * - Animación 2D de botella girando
 * - 5 niveles de intensidad (besos/pruebas)
 * - Tracking de parejas
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useBottleGame } from '../hooks/useBottleGame';
import { SpinResult, KISS_LEVELS } from '../types/bottleGame';
import CustomButton from '../components/CustomButton';
import KissModal from '../components/bottle/KissModal';
import DareModal from '../components/bottle/DareModal';
import { triggerHaptic } from '../utils/haptics';
import { scale, moderateScale } from '../utils/responsive';

type BottleGameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BottleGame'>;
type BottleGameScreenRouteProp = RouteProp<RootStackParamList, 'BottleGame'>;

interface Props {
  navigation: BottleGameScreenNavigationProp;
  route: BottleGameScreenRouteProp;
}

export default function BottleGameScreen({ navigation, route }: Props) {
  const { players: initialPlayers } = route.params;
  const { theme } = useTheme();

  const {
    spinBottle,
    resetGame,
    updateLastAction,
    getCurrentSpinner,
    getTargetPlayer,
    isSpinning,
    spinCount,
  } = useBottleGame({
    players: initialPlayers,
    allowSamePerson: false,
  });

  const [spinResult, setSpinResult] = useState<SpinResult | null>(null);
  const [showKiss, setShowKiss] = useState(false);
  const [showDare, setShowDare] = useState(false);
  const [rotationAnim] = useState(new Animated.Value(0));

  /**
   * Maneja el giro de la botella
   */
  const handleSpin = async () => {
    await triggerHaptic('heavy');

    // Animación de rotación
    rotationAnim.setValue(0);
    Animated.timing(rotationAnim, {
      toValue: 1,
      duration: 2500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: true,
    }).start();

    // Obtener resultado del giro
    const result = await spinBottle();
    setSpinResult(result);
  };

  /**
   * Maneja la elección de Beso
   */
  const handleChooseKiss = () => {
    if (!spinResult) return;
    updateLastAction(spinResult.spinner.id, spinResult.target.id, 'kiss');
    setShowKiss(true);
  };

  /**
   * Maneja la elección de Prueba
   */
  const handleChooseDare = () => {
    if (!spinResult) return;
    updateLastAction(spinResult.spinner.id, spinResult.target.id, 'dare');
    setShowDare(true);
  };

  /**
   * Continúa al siguiente giro
   */
  const handleContinue = () => {
    setSpinResult(null);
    setShowKiss(false);
    setShowDare(false);
  };

  /**
   * Volver atrás
   */
  const handleGoBack = () => {
    Alert.alert(
      'Salir del juego',
      '¿Seguro que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', style: 'destructive', onPress: () => navigation.goBack() },
      ]
    );
  };

  const currentSpinner = getCurrentSpinner();
  const targetPlayer = getTargetPlayer();

  // Animación de rotación
  const spin = rotationAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '1800deg'], // 5 vueltas completas
  });

  const getLevelEmoji = (level: number): string => {
    const kissLevel = KISS_LEVELS.find((k) => k.level === level);
    return kissLevel?.emoji || '💋';
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.primary }]}>
          🍾 LA BOTELLA 🔥
        </Text>
        <Text style={[styles.subtitle, { color: theme.text }]}>
          Giros: {spinCount}
        </Text>
      </View>

      {/* Turno actual */}
      <View style={[styles.turnContainer, { backgroundColor: theme.cardBg }]}>
        <Text style={[styles.turnLabel, { color: theme.textMuted }]}>
          Turno de:
        </Text>
        <Text style={[styles.turnPlayer, { color: theme.primary }]}>
          {currentSpinner.name}
        </Text>
      </View>

      {/* Botella (animación 2D simple) */}
      <View style={styles.bottleContainer}>
        <Animated.View style={[styles.bottle, { transform: [{ rotate: spin }] }]}>
          <Text style={styles.bottleEmoji}>🍾</Text>
        </Animated.View>
      </View>

      {/* Resultado del giro */}
      {spinResult && !isSpinning && (
        <View style={styles.resultContainer}>
          {/* Pareja */}
          <View style={[styles.pairContainer, { backgroundColor: theme.cardBg }]}>
            <Text style={[styles.pairText, { color: theme.text }]}>
              {spinResult.spinner.name} ➡️ {spinResult.target.name}
            </Text>
          </View>

          {/* Nivel */}
          <View style={[styles.levelInfo, { backgroundColor: theme.background }]}>
            <Text style={[styles.levelLabel, { color: theme.textMuted }]}>
              {spinResult.isFirstTime ? '¡Primera vez juntos!' : `Veces juntos: ${spinResult.timesMatched}`}
            </Text>
            <View style={styles.levelIndicator}>
              <Text style={[styles.levelText, { color: theme.primary }]}>
                Nivel {spinResult.currentLevel}/5 {getLevelEmoji(spinResult.currentLevel)}
              </Text>
            </View>
          </View>

          {/* Botones de elección */}
          <View style={styles.choiceContainer}>
            <CustomButton
              title="💋 Beso"
              onPress={handleChooseKiss}
              variant="primary"
              style={styles.choiceButton}
            />
            <CustomButton
              title="🎭 Prueba"
              onPress={handleChooseDare}
              variant="secondary"
              style={styles.choiceButton}
            />
          </View>
        </View>
      )}

      {/* Botón girar botella */}
      {!spinResult && (
        <View style={styles.actions}>
          <CustomButton
            title={isSpinning ? 'Girando...' : '🌀 Girar Botella'}
            onPress={handleSpin}
            variant="primary"
            disabled={isSpinning}
          />
        </View>
      )}

      {/* Botón salir */}
      <CustomButton
        title="Salir"
        onPress={handleGoBack}
        variant="danger"
        style={styles.exitButton}
      />

      {/* MODALES */}
      {spinResult && (
        <>
          <KissModal
            visible={showKiss}
            level={spinResult.currentLevel}
            onContinue={handleContinue}
          />
          <DareModal
            visible={showDare}
            level={spinResult.currentLevel}
            onContinue={handleContinue}
          />
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: moderateScale(16),
  },
  header: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: moderateScale(4),
  },
  subtitle: {
    fontSize: moderateScale(14),
  },
  turnContainer: {
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginBottom: moderateScale(24),
  },
  turnLabel: {
    fontSize: moderateScale(12),
    marginBottom: moderateScale(4),
  },
  turnPlayer: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  bottleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: moderateScale(20),
  },
  bottle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottleEmoji: {
    fontSize: moderateScale(100),
  },
  resultContainer: {
    marginBottom: moderateScale(20),
  },
  pairContainer: {
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  pairText: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  levelInfo: {
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(16),
    alignItems: 'center',
  },
  levelLabel: {
    fontSize: moderateScale(12),
    marginBottom: moderateScale(8),
  },
  levelIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelText: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
  },
  choiceContainer: {
    flexDirection: 'row',
    gap: moderateScale(12),
  },
  choiceButton: {
    flex: 1,
  },
  actions: {
    marginBottom: moderateScale(16),
  },
  exitButton: {
    marginTop: moderateScale(8),
  },
});
