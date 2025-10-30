/**
 * 🍻 MODAL: TODOS BEBEN (Carta 9 - PROGRESIVO)
 *
 * Cada vez que sale un 9, todos beben más:
 * 1er 9 = 1 trago
 * 2do 9 = 2 tragos
 * 3er 9 = 3 tragos
 * 4to 9 = 4 tragos
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Animated,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

interface Props {
  visible: boolean;
  drinkCount: number; // 1, 2, 3, o 4
  onContinue: () => void;
}

export default function EveryoneDrinksModal({
  visible,
  drinkCount,
  onContinue,
}: Props) {
  const { theme } = useTheme();

  const handleContinue = async () => {
    await triggerHaptic('heavy');
    onContinue();
  };

  const getMessage = (): string => {
    switch (drinkCount) {
      case 1:
        return '¡Este es el primer 9! 🍺';
      case 2:
        return '¡Segundo 9! La cosa se pone seria... 🍻';
      case 3:
        return '¡Tercer 9! Esto ya es fiesta 🎉';
      case 4:
        return '¡CUARTO 9! ¡¡¡EL ÚLTIMO!!! 🔥🍺🔥';
      default:
        return '¡Todos beben!';
    }
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
          {/* Emoji grande */}
          <Text style={styles.emoji}>
            {drinkCount === 4 ? '🔥' : '🍻'}
          </Text>

          {/* Título */}
          <Text style={[styles.title, { color: theme.primary }]}>
            ¡TODOS BEBEN!
          </Text>

          {/* Contador de tragos */}
          <View style={[styles.drinkCounter, { backgroundColor: theme.background }]}>
            <Text style={[styles.drinkCountText, { color: theme.text }]}>
              {drinkCount} trago{drinkCount === 1 ? '' : 's'}
            </Text>
          </View>

          {/* Mensaje */}
          <Text style={[styles.message, { color: theme.text }]}>
            {getMessage()}
          </Text>

          {/* Indicador de progresión */}
          <View style={styles.progressContainer}>
            {[1, 2, 3, 4].map((num) => (
              <View
                key={num}
                style={[
                  styles.progressDot,
                  {
                    backgroundColor: num <= drinkCount ? theme.primary : theme.border,
                  },
                ]}
              />
            ))}
          </View>

          {/* Botón */}
          <CustomButton
            title="¡Salud! 🍺"
            onPress={handleContinue}
            variant="primary"
            style={styles.button}
          />
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
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    marginBottom: moderateScale(20),
    textAlign: 'center',
  },
  drinkCounter: {
    paddingHorizontal: moderateScale(30),
    paddingVertical: moderateScale(15),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(16),
  },
  drinkCountText: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  message: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    marginBottom: moderateScale(24),
  },
  progressContainer: {
    flexDirection: 'row',
    gap: moderateScale(12),
    marginBottom: moderateScale(24),
  },
  progressDot: {
    width: moderateScale(16),
    height: moderateScale(16),
    borderRadius: moderateScale(8),
  },
  button: {
    minWidth: scale(200),
  },
});
