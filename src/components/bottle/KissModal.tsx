/**
 * 💋 MODAL: BESO (La Botella)
 *
 * Muestra el tipo de beso según el nivel de la pareja
 */

import React from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { KISS_LEVELS, IntensityLevel } from '../../types/bottleGame';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

interface Props {
  visible: boolean;
  level: IntensityLevel;
  onContinue: () => void;
}

export default function KissModal({ visible, level, onContinue }: Props) {
  const { theme } = useTheme();
  const kissData = KISS_LEVELS.find((k) => k.level === level) || KISS_LEVELS[0];

  const handleContinue = async () => {
    await triggerHaptic('heavy');
    onContinue();
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onContinue}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
          {/* Emoji grande */}
          <Text style={styles.emoji}>{kissData.emoji}</Text>

          {/* Título */}
          <Text style={[styles.title, { color: theme.primary }]}>
            {kissData.name}
          </Text>

          {/* Descripción */}
          <Text style={[styles.description, { color: theme.text }]}>
            {kissData.description}
          </Text>

          {/* Nivel */}
          <View style={[styles.levelContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.levelText, { color: theme.textMuted }]}>
              Nivel {level}/5
            </Text>
          </View>

          {/* Botón */}
          <CustomButton title="¡Hecho! 💋" onPress={handleContinue} variant="primary" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  modalContainer: {
    width: '100%',
    maxWidth: scale(400),
    borderRadius: moderateScale(16),
    padding: moderateScale(30),
    alignItems: 'center',
  },
  emoji: {
    fontSize: moderateScale(80),
    marginBottom: moderateScale(16),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginBottom: moderateScale(12),
    textAlign: 'center',
  },
  description: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginBottom: moderateScale(20),
  },
  levelContainer: {
    paddingHorizontal: moderateScale(20),
    paddingVertical: moderateScale(8),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(24),
  },
  levelText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
});
