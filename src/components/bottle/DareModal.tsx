/**
 * 🎭 MODAL: PRUEBA (La Botella)
 *
 * Muestra una prueba aleatoria según el nivel de la pareja
 */

import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Modal } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { IntensityLevel, BottleDare } from '../../types/bottleGame';
import { getRandomDareByLevel } from '../../data/bottle/dares';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

interface Props {
  visible: boolean;
  level: IntensityLevel;
  onContinue: () => void;
}

export default function DareModal({ visible, level, onContinue }: Props) {
  const { theme } = useTheme();
  const [dare, setDare] = useState<BottleDare | null>(null);

  useEffect(() => {
    if (visible) {
      const randomDare = getRandomDareByLevel(level);
      setDare(randomDare);
      triggerHaptic('medium');
    }
  }, [visible, level]);

  const handleContinue = async () => {
    await triggerHaptic('heavy');
    setDare(null);
    onContinue();
  };

  if (!dare) return null;

  const getTypeEmoji = (type: string): string => {
    switch (type) {
      case 'physical': return '💪';
      case 'verbal': return '💬';
      case 'intimate': return '🔥';
      default: return '🎭';
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onContinue}>
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.emoji}>{getTypeEmoji(dare.type)}</Text>
            <Text style={[styles.title, { color: theme.primary }]}>
              PRUEBA
            </Text>
          </View>

          {/* Descripción */}
          <View style={[styles.dareContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.dareText, { color: theme.text }]}>
              {dare.description}
            </Text>
          </View>

          {/* Nivel */}
          <View style={[styles.levelContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.levelText, { color: theme.textMuted }]}>
              Nivel {level}/5
            </Text>
          </View>

          {/* Botón */}
          <CustomButton title="¡Cumplido! ✓" onPress={handleContinue} variant="primary" />
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
  header: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  emoji: {
    fontSize: moderateScale(60),
    marginBottom: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  dareContainer: {
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(20),
    minHeight: moderateScale(100),
    justifyContent: 'center',
    width: '100%',
  },
  dareText: {
    fontSize: moderateScale(18),
    textAlign: 'center',
    lineHeight: moderateScale(26),
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
