/**
 * 🍺 MODAL: REPARTIR TRAGOS (Cartas 1-5)
 *
 * Permite al jugador repartir N tragos entre los demás jugadores
 * Puede dividir los tragos como quiera
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { Player } from '../../types';
import { DrinkDistribution } from '../../types/cardGame';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

interface Props {
  visible: boolean;
  totalDrinks: number; // Cuántos tragos debe repartir (valor de la carta)
  currentPlayer: Player; // Quien sacó la carta
  allPlayers: Player[]; // Todos los jugadores
  onConfirm: (distribution: DrinkDistribution[]) => void;
  onClose: () => void;
}

export default function DistributeDrinksModal({
  visible,
  totalDrinks,
  currentPlayer,
  allPlayers,
  onConfirm,
  onClose,
}: Props) {
  const { theme } = useTheme();

  // Estado: { playerId: cantidad de tragos asignados }
  const [distribution, setDistribution] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    allPlayers.forEach((player) => {
      initial[player.id] = 0;
    });
    return initial;
  });

  /**
   * Resetear distribución cada vez que se abre el modal o cambia totalDrinks
   */
  useEffect(() => {
    if (visible) {
      const initial: Record<string, number> = {};
      allPlayers.forEach((player) => {
        initial[player.id] = 0;
      });
      setDistribution(initial);
    }
  }, [visible, totalDrinks, allPlayers]);

  /**
   * Calcula cuántos tragos se han asignado en total
   */
  const getTotalAssigned = (): number => {
    return Object.values(distribution).reduce((sum, count) => sum + count, 0);
  };

  /**
   * Incrementa tragos asignados a un jugador
   */
  const incrementDrinks = (playerId: string) => {
    const totalAssigned = getTotalAssigned();
    if (totalAssigned >= totalDrinks) {
      triggerHaptic('warning');
      Alert.alert(
        'Límite alcanzado',
        `Ya has asignado todos los ${totalDrinks} trago${totalDrinks === 1 ? '' : 's'}.`
      );
      return;
    }

    setDistribution((prev) => ({
      ...prev,
      [playerId]: prev[playerId] + 1,
    }));
    triggerHaptic('light');
  };

  /**
   * Decrementa tragos asignados a un jugador
   */
  const decrementDrinks = (playerId: string) => {
    if (distribution[playerId] === 0) return;

    setDistribution((prev) => ({
      ...prev,
      [playerId]: Math.max(0, prev[playerId] - 1),
    }));
    triggerHaptic('light');
  };

  /**
   * Confirma la distribución
   */
  const handleConfirm = async () => {
    const totalAssigned = getTotalAssigned();

    if (totalAssigned !== totalDrinks) {
      Alert.alert(
        'Distribución incompleta',
        `Debes repartir exactamente ${totalDrinks} trago${totalDrinks === 1 ? '' : 's'}. ` +
        `Llevas ${totalAssigned} asignado${totalAssigned === 1 ? '' : 's'}.`
      );
      return;
    }

    await triggerHaptic('success');

    // Convertir a array de DrinkDistribution
    const distributionArray: DrinkDistribution[] = Object.entries(distribution)
      .filter(([_, drinks]) => drinks > 0)
      .map(([playerId, drinksAssigned]) => ({
        playerId,
        drinksAssigned,
      }));

    onConfirm(distributionArray);
  };

  /**
   * Resetea la distribución
   */
  const handleReset = () => {
    const initial: Record<string, number> = {};
    allPlayers.forEach((player) => {
      initial[player.id] = 0;
    });
    setDistribution(initial);
    triggerHaptic('light');
  };

  const totalAssigned = getTotalAssigned();
  const remaining = totalDrinks - totalAssigned;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.primary }]}>
              🍺 Reparte {totalDrinks} Trago{totalDrinks === 1 ? '' : 's'}
            </Text>
            <Text style={[styles.subtitle, { color: theme.text }]}>
              {currentPlayer.name}, elige a quién dar de beber
            </Text>
          </View>

          {/* Contador de tragos restantes */}
          <View style={[styles.counterContainer, { backgroundColor: theme.background }]}>
            <Text style={[styles.counterLabel, { color: theme.textMuted }]}>
              Tragos restantes:
            </Text>
            <Text
              style={[
                styles.counterValue,
                { color: remaining === 0 ? theme.success : theme.primary },
              ]}
            >
              {remaining}
            </Text>
          </View>

          {/* Lista de jugadores */}
          <ScrollView style={styles.playersList}>
            {allPlayers.map((player) => (
              <View
                key={player.id}
                style={[
                  styles.playerRow,
                  { borderBottomColor: theme.border },
                ]}
              >
                <View style={styles.playerInfo}>
                  <Text style={[styles.playerName, { color: theme.text }]}>
                    {player.name}
                    {player.id === currentPlayer.id && ' (Tú)'}
                  </Text>
                  <Text style={[styles.playerDrinks, { color: theme.textMuted }]}>
                    {distribution[player.id]} trago{distribution[player.id] === 1 ? '' : 's'}
                  </Text>
                </View>

                <View style={styles.controls}>
                  <TouchableOpacity
                    style={[
                      styles.controlButton,
                      { backgroundColor: theme.danger },
                      distribution[player.id] === 0 && styles.controlButtonDisabled,
                    ]}
                    onPress={() => decrementDrinks(player.id)}
                    disabled={distribution[player.id] === 0}
                  >
                    <Text style={styles.controlButtonText}>−</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={[
                      styles.controlButton,
                      { backgroundColor: theme.success },
                      remaining === 0 && styles.controlButtonDisabled,
                    ]}
                    onPress={() => incrementDrinks(player.id)}
                    disabled={remaining === 0}
                  >
                    <Text style={styles.controlButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </ScrollView>

          {/* Botones de acción */}
          <View style={styles.actions}>
            <CustomButton
              title="Resetear"
              onPress={handleReset}
              variant="secondary"
              style={styles.actionButton}
            />
            <CustomButton
              title="Confirmar"
              onPress={handleConfirm}
              variant="primary"
              style={styles.actionButton}
              disabled={remaining !== 0}
            />
          </View>
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
    maxHeight: '80%',
  },
  header: {
    marginBottom: moderateScale(20),
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
  counterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(16),
  },
  counterLabel: {
    fontSize: moderateScale(14),
    marginRight: moderateScale(8),
  },
  counterValue: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  playersList: {
    maxHeight: moderateScale(300),
    marginBottom: moderateScale(16),
  },
  playerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: moderateScale(12),
    borderBottomWidth: 1,
  },
  playerInfo: {
    flex: 1,
  },
  playerName: {
    fontSize: moderateScale(16),
    fontWeight: '600',
    marginBottom: moderateScale(4),
  },
  playerDrinks: {
    fontSize: moderateScale(12),
  },
  controls: {
    flexDirection: 'row',
    gap: moderateScale(8),
  },
  controlButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(20),
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonDisabled: {
    opacity: 0.3,
  },
  controlButtonText: {
    color: '#FFF',
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  actions: {
    flexDirection: 'row',
    gap: moderateScale(12),
  },
  actionButton: {
    flex: 1,
  },
});
