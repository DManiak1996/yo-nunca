/**
 * Modal troll que aparece cuando el usuario selecciona la categoría "CAGÓN"
 * Muestra frases graciosas y lleva un contador de clicks
 * V2.0 - Refactorizado con Design Tokens
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getRandomCagonPhrase } from '../data/cagonPhrases';
import { getCagonCounter, incrementCagonCounter } from '../utils/storage';
import { colors, spacing, typography, shadows, borderRadius } from '../design-system/tokens';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function CagonModal({ visible, onClose }: Props) {
  const { theme } = useTheme();
  const [phrase, setPhrase] = useState('');
  const [counter, setCounter] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      // Generar frase aleatoria
      setPhrase(getRandomCagonPhrase());

      // Incrementar contador y obtenerlo
      incrementCagonCounter()
        .then((newCount) => setCounter(newCount))
        .catch(() => setCounter(0));

      // Animación de entrada
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      // Resetear animación
      scaleAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={handleClose}
    >
      <View style={styles.overlay}>
        <Animated.View
          style={[
            styles.modalContainer,
            { backgroundColor: theme.cardBackground, transform: [{ scale: scaleAnim }] },
          ]}
        >
          {/* Icono grande */}
          <Text style={styles.icon}>🐔</Text>

          {/* Frase graciosa */}
          <Text style={[styles.phrase, { color: theme.text }]}>{phrase}</Text>

          {/* Contador de intentos */}
          <View style={[styles.counterContainer, { backgroundColor: theme.danger }]}>
            <Text style={styles.counterText}>
              Intento #{counter} de ser cagón
            </Text>
          </View>

          {/* Mensaje adicional si hay muchos clicks */}
          {counter >= 5 && (
            <Text style={[styles.extraMessage, { color: theme.textSecondary }]}>
              Ya van {counter} veces... ¿en serio? 🤦
            </Text>
          )}

          {counter >= 10 && (
            <Text style={[styles.extraMessage, { color: theme.danger }]}>
              ¡RÉCORD! Eres oficialmente el más cagón del grupo 🏆🐔
            </Text>
          )}

          {/* Botón cerrar */}
          <TouchableOpacity
            style={[styles.closeButton, { backgroundColor: theme.primary }]}
            onPress={handleClose}
          >
            <Text style={[styles.closeButtonText, { color: colors.text.inverse }]}>
              Entendido, lo siento 😔
            </Text>
          </TouchableOpacity>

          {/* Texto pequeño de pista */}
          <Text style={[styles.hint, { color: theme.textSecondary }]}>
            Pista: Prueba con otra categoría...
          </Text>
        </Animated.View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay.dark,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: borderRadius['2xl'],
    padding: spacing.xl,
    alignItems: 'center',
    ...shadows.xl,
  },
  icon: {
    fontSize: 80,
    marginBottom: spacing.lg,
  },
  phrase: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: typography.fontSize['2xl'] * typography.lineHeight.tight,
  },
  counterContainer: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.base,
  },
  counterText: {
    color: colors.text.primary,
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
  },
  extraMessage: {
    fontSize: typography.fontSize.sm,
    textAlign: 'center',
    marginBottom: spacing.md,
    fontStyle: 'italic',
  },
  closeButton: {
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.base,
    borderRadius: borderRadius.xl,
    marginTop: spacing.sm,
    width: '100%',
    alignItems: 'center',
    ...shadows.md,
  },
  closeButtonText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
  hint: {
    fontSize: typography.fontSize.xs,
    marginTop: spacing.base,
    textAlign: 'center',
  },
});
