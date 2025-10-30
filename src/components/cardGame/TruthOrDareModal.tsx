/**
 * 🎭 MODAL: VERDAD O RETO (Carta 7)
 *
 * El jugador elige entre Verdad o Reto
 * Se muestra una pregunta/reto aleatorio del banco
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Player } from '../../types';
import { Challenge, ChallengeType } from '../../types/cardGame';
import { getRandomTruth, getRandomDare } from '../../data/cardGame/truthsAndDares';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

interface Props {
  visible: boolean;
  currentPlayer: Player; // Quien sacó la carta
  onContinue: () => void;
}

export default function TruthOrDareModal({
  visible,
  currentPlayer,
  onContinue,
}: Props) {
  const { theme } = useTheme();
  const [selectedType, setSelectedType] = useState<ChallengeType | null>(null);
  const [challenge, setChallenge] = useState<Challenge | null>(null);

  /**
   * Maneja la selección de Verdad o Reto
   */
  const handleSelect = async (type: ChallengeType) => {
    await triggerHaptic('medium');

    const selectedChallenge = type === 'truth' ? getRandomTruth() : getRandomDare();

    setSelectedType(type);
    setChallenge(selectedChallenge);
  };

  /**
   * Resetea el estado al cerrar
   */
  const handleContinue = async () => {
    await triggerHaptic('medium');
    setSelectedType(null);
    setChallenge(null);
    onContinue();
  };

  /**
   * Vuelve a la selección inicial
   */
  const handleGoBack = async () => {
    await triggerHaptic('light');
    setSelectedType(null);
    setChallenge(null);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onContinue}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.primary }]}>
              🎭 Verdad o Reto
            </Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>
              {currentPlayer.name}, ¿qué eliges?
            </Text>
          </View>

          {/* Pantalla de selección */}
          {!selectedType && (
            <View style={styles.selectionContainer}>
              <CustomButton
                title="🤐 Verdad"
                onPress={() => handleSelect('truth')}
                variant="primary"
                style={styles.selectionButton}
              />
              <CustomButton
                title="🔥 Reto"
                onPress={() => handleSelect('dare')}
                variant="secondary"
                style={styles.selectionButton}
              />
            </View>
          )}

          {/* Pantalla de challenge */}
          {selectedType && challenge && (
            <>
              {/* Tipo de challenge */}
              <View style={[styles.typeContainer, { backgroundColor: theme.background }]}>
                <Text style={[styles.typeLabel, { color: theme.primary }]}>
                  {selectedType === 'truth' ? '🤐 VERDAD' : '🔥 RETO'}
                </Text>
              </View>

              {/* Texto del challenge */}
              <View style={[styles.challengeContainer, { backgroundColor: theme.background }]}>
                <Text style={[styles.challengeText, { color: theme.text }]}>
                  {challenge.text}
                </Text>
              </View>

              {/* Botones */}
              <View style={styles.actions}>
                <CustomButton
                  title="Volver"
                  onPress={handleGoBack}
                  variant="secondary"
                  style={styles.actionButton}
                />
                <CustomButton
                  title="Continuar"
                  onPress={handleContinue}
                  variant="primary"
                  style={styles.actionButton}
                />
              </View>
            </>
          )}
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  modalContainer: {
    width: '100%',
    maxWidth: scale(400),
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
  },
  header: {
    marginBottom: moderateScale(24),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    marginBottom: moderateScale(8),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  selectionContainer: {
    gap: moderateScale(16),
  },
  selectionButton: {
    minHeight: moderateScale(60),
  },
  typeContainer: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
    alignItems: 'center',
  },
  typeLabel: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
  },
  challengeContainer: {
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(20),
    minHeight: moderateScale(120),
    justifyContent: 'center',
  },
  challengeText: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    lineHeight: moderateScale(24),
  },
  actions: {
    flexDirection: 'row',
    gap: moderateScale(12),
  },
  actionButton: {
    flex: 1,
  },
});
