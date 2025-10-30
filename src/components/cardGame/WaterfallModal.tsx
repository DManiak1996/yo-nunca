/**
 * 🌊 MODAL: CASCADA (Carta Rey)
 *
 * Bebida en cadena:
 * - El que sacó la carta empieza a beber
 * - El primero puede parar cuando quiera
 * - El siguiente empieza cuando el anterior empieza
 * - Cada uno puede parar cuando pare el anterior
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Player } from '../../types';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

interface Props {
  visible: boolean;
  currentPlayer: Player; // Quien sacó la carta (empieza primero)
  allPlayers: Player[]; // Todos los jugadores en orden
  onContinue: () => void;
}

export default function WaterfallModal({
  visible,
  currentPlayer,
  allPlayers,
  onContinue,
}: Props) {
  const { theme } = useTheme();

  const handleContinue = async () => {
    await triggerHaptic('heavy');
    onContinue();
  };

  // Reordenar jugadores para que el actual sea el primero
  const orderedPlayers = [
    currentPlayer,
    ...allPlayers.filter((p) => p.id !== currentPlayer.id),
  ];

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
            <Text style={styles.emoji}>🌊</Text>
            <Text style={[styles.title, { color: theme.primary }]}>
              CASCADA
            </Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>
              ¡Bebida en cadena!
            </Text>
          </View>

          {/* Instrucciones */}
          <View style={[styles.instructionsContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.instructionsTitle, { color: theme.text }]}>
              Cómo funciona:
            </Text>
            <Text style={[styles.instructionText, { color: theme.textMuted }]}>
              1️⃣ {currentPlayer.name} empieza a beber
            </Text>
            <Text style={[styles.instructionText, { color: theme.textMuted }]}>
              2️⃣ Cuando empieza, el siguiente también empieza
            </Text>
            <Text style={[styles.instructionText, { color: theme.textMuted }]}>
              3️⃣ {currentPlayer.name} puede parar cuando quiera
            </Text>
            <Text style={[styles.instructionText, { color: theme.textMuted }]}>
              4️⃣ Cada uno para cuando pare el anterior
            </Text>
          </View>

          {/* Orden de jugadores */}
          <View style={styles.orderSection}>
            <Text style={[styles.orderTitle, { color: theme.text }]}>
              Orden de la cascada:
            </Text>
            {orderedPlayers.map((player, index) => (
              <View
                key={player.id}
                style={[
                  styles.playerItem,
                  { backgroundColor: theme.background },
                ]}
              >
                <View style={styles.playerNumber}>
                  <Text style={[styles.playerNumberText, { color: theme.primary }]}>
                    {index + 1}
                  </Text>
                </View>
                <Text style={[styles.playerName, { color: theme.text }]}>
                  {player.name}
                  {index === 0 && ' (Empieza)'}
                </Text>
              </View>
            ))}
          </View>

          {/* Aviso especial */}
          <View style={[styles.warningContainer, { backgroundColor: theme.warning + '20', borderColor: theme.warning }]}>
            <Text style={[styles.warningText, { color: theme.text }]}>
              ⚠️ {currentPlayer.name} tiene el poder de decidir cuánto beben todos
            </Text>
          </View>

          {/* Botón */}
          <CustomButton
            title="¡Empezar Cascada! 🌊"
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
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
    fontSize: moderateScale(64),
    marginBottom: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginBottom: moderateScale(4),
  },
  subtitle: {
    fontSize: moderateScale(14),
  },
  instructionsContainer: {
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(20),
  },
  instructionsTitle: {
    fontSize: moderateScale(16),
    fontWeight: 'bold',
    marginBottom: moderateScale(12),
  },
  instructionText: {
    fontSize: moderateScale(13),
    marginBottom: moderateScale(6),
  },
  orderSection: {
    marginBottom: moderateScale(16),
  },
  orderTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: moderateScale(12),
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(6),
  },
  playerNumber: {
    width: moderateScale(28),
    height: moderateScale(28),
    borderRadius: moderateScale(14),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: moderateScale(12),
  },
  playerNumberText: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
  },
  playerName: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  warningContainer: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    borderWidth: 1,
    marginBottom: moderateScale(20),
  },
  warningText: {
    fontSize: moderateScale(12),
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
