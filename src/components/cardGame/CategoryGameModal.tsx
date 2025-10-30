/**
 * 📚 MODAL: CATEGORÍAS (Carta Sota)
 *
 * Se elige una categoría aleatoria
 * Por turnos, los jugadores dicen ejemplos
 * Quien repita o no sepa, bebe
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Category } from '../../types/cardGame';
import { getRandomCategory } from '../../data/cardGame/categories';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

interface Props {
  visible: boolean;
  onContinue: () => void;
}

export default function CategoryGameModal({ visible, onContinue }: Props) {
  const { theme } = useTheme();
  const [category, setCategory] = useState<Category | null>(null);

  /**
   * Obtiene categoría aleatoria al abrir
   */
  useEffect(() => {
    if (visible) {
      const randomCategory = getRandomCategory();
      setCategory(randomCategory);
      triggerHaptic('medium');
    }
  }, [visible]);

  const handleContinue = async () => {
    await triggerHaptic('medium');
    setCategory(null);
    onContinue();
  };

  if (!category) return null;

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
            <Text style={styles.emoji}>📚</Text>
            <Text style={[styles.title, { color: theme.primary }]}>
              Categorías
            </Text>
          </View>

          {/* Categoría */}
          <View style={[styles.categoryContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.categoryName, { color: theme.text }]}>
              {category.name}
            </Text>
          </View>

          {/* Instrucciones */}
          <View style={styles.instructions}>
            <Text style={[styles.instructionsTitle, { color: theme.text }]}>
              Cómo jugar:
            </Text>
            <Text style={[styles.instructionsText, { color: theme.textMuted }]}>
              • Por turnos, decid ejemplos de esta categoría
            </Text>
            <Text style={[styles.instructionsText, { color: theme.textMuted }]}>
              • No podéis repetir
            </Text>
            <Text style={[styles.instructionsText, { color: theme.textMuted }]}>
              • Quien repita o no sepa, bebe 🍺
            </Text>
          </View>

          {/* Ejemplos (pista) */}
          {category.examples.length > 0 && (
            <View style={[styles.examplesContainer, { borderColor: theme.border }]}>
              <Text style={[styles.examplesLabel, { color: theme.textMuted }]}>
                Ejemplos: {category.examples.slice(0, 3).join(', ')}...
              </Text>
            </View>
          )}

          {/* Botón */}
          <CustomButton
            title="Empezar"
            onPress={handleContinue}
            variant="primary"
          />
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
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  emoji: {
    fontSize: moderateScale(48),
    marginBottom: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  categoryContainer: {
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(20),
    minHeight: moderateScale(80),
    justifyContent: 'center',
  },
  categoryName: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  instructions: {
    marginBottom: moderateScale(20),
  },
  instructionsTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(12),
  },
  instructionsText: {
    fontSize: moderateScale(14),
    marginBottom: moderateScale(6),
    paddingLeft: moderateScale(8),
  },
  examplesContainer: {
    borderTopWidth: 1,
    paddingTop: moderateScale(16),
    marginBottom: moderateScale(20),
  },
  examplesLabel: {
    fontSize: moderateScale(12),
    fontStyle: 'italic',
    textAlign: 'center',
  },
});
