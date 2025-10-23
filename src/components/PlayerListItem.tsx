/**
 * Componente para mostrar un jugador en la lista durante el juego
 * Incluye avatar, nombre, contador de tragos y botón para incrementar
 * Con animaciones bounce al incrementar tragos
 */

import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Alert } from 'react-native';
import { Player } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useRateLimit } from '../hooks/useRateLimit';

interface Props {
  player: Player;
  rank?: number; // Posición en el ranking (opcional)
  onIncrementDrinks: (playerId: string) => void;
  showRank?: boolean;
}

const PlayerListItem = React.memo(function PlayerListItem({
  player,
  rank,
  onIncrementDrinks,
  showRank = false,
}: Props) {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  // Rate limiting: máximo 10 clicks por segundo (anti-spam)
  const { checkRateLimit } = useRateLimit({ maxCalls: 10, windowMs: 1000 });

  /**
   * Maneja el incremento con animación bounce
   */
  const handleIncrementWithAnimation = () => {
    // Verificar rate limit
    if (!checkRateLimit()) {
      Alert.alert(
        '¡Tranquilo! 🍺',
        'No tan rápido... Dale tiempo al jugador para beber 😅',
        [{ text: 'OK' }]
      );
      return;
    }

    // Animación de bounce
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.2,
        tension: 100,
        friction: 3,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 100,
        friction: 5,
        useNativeDriver: true,
      }),
    ]).start();

    onIncrementDrinks(player.id);
  };

  /**
   * Obtiene el emoji de medalla según el rank
   */
  const getRankEmoji = (position?: number) => {
    if (!position) return '';
    switch (position) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return `#${position}`;
    }
  };

  /**
   * Obtiene el color del borde según los tragos
   */
  const getBorderColor = () => {
    if (player.drinks === 0) return theme.border;
    if (player.drinks < 3) return theme.success;
    if (player.drinks < 6) return theme.primary;
    if (player.drinks < 10) return '#E67E22'; // Naranja
    return theme.danger; // Rojo si tiene 10+
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.cardBackground,
          borderColor: getBorderColor(),
        },
      ]}
    >
      {/* Rank (si aplica) */}
      {showRank && rank && (
        <View style={styles.rankContainer}>
          <Text style={styles.rankText}>{getRankEmoji(rank)}</Text>
        </View>
      )}

      {/* Avatar */}
      <Text style={styles.avatar}>{player.avatar}</Text>

      {/* Info del jugador */}
      <View style={styles.infoContainer}>
        <Text style={[styles.name, { color: theme.text }]} numberOfLines={1}>
          {player.name}
        </Text>
        <View style={styles.drinksContainer}>
          {[...Array(Math.min(player.drinks, 10))].map((_, index) => (
            <Text key={index} style={styles.drinkIcon}>
              🍺
            </Text>
          ))}
          {player.drinks > 10 && (
            <Text style={[styles.drinkCount, { color: theme.danger }]}>
              +{player.drinks - 10}
            </Text>
          )}
        </View>
      </View>

      {/* Contador de tragos con animación */}
      <Animated.View
        style={[
          styles.counterContainer,
          { transform: [{ scale: scaleAnim }] }
        ]}
      >
        <Text style={[styles.counterNumber, { color: theme.primary }]}>
          {player.drinks}
        </Text>
        <Text style={[styles.counterLabel, { color: theme.textSecondary }]}>
          {player.drinks === 1 ? 'trago' : 'tragos'}
        </Text>
      </Animated.View>

      {/* Botón [+] */}
      <TouchableOpacity
        style={[styles.incrementButton, { backgroundColor: theme.primary }]}
        onPress={handleIncrementWithAnimation}
        activeOpacity={0.7}
      >
        <Text style={styles.incrementButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
});

export default PlayerListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
  },
  rankContainer: {
    marginRight: 8,
    minWidth: 32,
    alignItems: 'center',
  },
  rankText: {
    fontSize: 20,
  },
  avatar: {
    fontSize: 28,
    marginRight: 12,
  },
  infoContainer: {
    flex: 1,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  drinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  drinkIcon: {
    fontSize: 12,
    marginRight: 2,
  },
  drinkCount: {
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  counterContainer: {
    alignItems: 'center',
    marginRight: 12,
    minWidth: 50,
  },
  counterNumber: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  counterLabel: {
    fontSize: 10,
  },
  incrementButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  incrementButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
});
