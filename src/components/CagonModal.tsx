/**
 * Modal troll que aparece cuando el usuario selecciona la categoría "CAGÓN"
 * Muestra frases graciosas y lleva un contador de clicks
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
            <Text style={[styles.closeButtonText, { color: '#000' }]}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  phrase: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 30,
  },
  counterContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginBottom: 16,
  },
  counterText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  extraMessage: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 12,
    fontStyle: 'italic',
  },
  closeButton: {
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 16,
    marginTop: 8,
    width: '100%',
    alignItems: 'center',
    elevation: 4,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  hint: {
    fontSize: 12,
    marginTop: 16,
    textAlign: 'center',
  },
});
