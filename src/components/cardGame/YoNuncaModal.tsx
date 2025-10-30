/**
 * 🍻 MODAL: YO NUNCA (Carta 6)
 *
 * Muestra una frase aleatoria del banco de "Yo Nunca"
 * Los jugadores que lo hayan hecho, beben
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

// Importar frases existentes
import { medioLevelPhrases } from '../../data/phrases/medioLevel';
import { picanteLevelPhrases } from '../../data/phrases/picanteLevel';
import { muyPicanteLevelPhrases } from '../../data/phrases/muyPicanteLevel';

interface Props {
  visible: boolean;
  onContinue: () => void;
}

export default function YoNuncaModal({ visible, onContinue }: Props) {
  const { theme } = useTheme();
  const [phrase, setPhrase] = useState<string>('');

  /**
   * Obtiene una frase aleatoria mezclando todos los niveles
   */
  useEffect(() => {
    if (visible) {
      const allPhrases = [...medioLevelPhrases, ...picanteLevelPhrases, ...muyPicanteLevelPhrases];
      const randomPhrase = allPhrases[Math.floor(Math.random() * allPhrases.length)];
      setPhrase(randomPhrase);
      triggerHaptic('light');
    }
  }, [visible]);

  const handleContinue = async () => {
    await triggerHaptic('medium');
    onContinue();
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
              🍻 Yo Nunca...
            </Text>
          </View>

          {/* Frase */}
          <View style={[styles.phraseContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.phraseText, { color: theme.text }]}>
              {phrase}
            </Text>
          </View>

          {/* Instrucciones */}
          <View style={styles.instructions}>
            <Text style={[styles.instructionsText, { color: theme.textMuted }]}>
              Si lo has hecho, bebes 🍺
            </Text>
          </View>

          {/* Botón continuar */}
          <CustomButton
            title="Continuar"
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
    marginBottom: moderateScale(20),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  phraseContainer: {
    padding: moderateScale(20),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(20),
    minHeight: moderateScale(100),
    justifyContent: 'center',
  },
  phraseText: {
    fontSize: moderateScale(18),
    textAlign: 'center',
    lineHeight: moderateScale(26),
  },
  instructions: {
    marginBottom: moderateScale(20),
    alignItems: 'center',
  },
  instructionsText: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
