/**
 * Componente para mostrar un jugador en la lista durante el juego
 * Con zonas táctiles: izquierda resta, derecha suma
 * Sistema de bloqueo de tragos al cambiar de frase
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Player } from '../types';
import { useTheme } from '../context/ThemeContext';

interface Props {
  player: Player;
  rank?: number; // Posición en el ranking (opcional)
  onIncrementDrinks: (playerId: string) => void;
  onDecrementDrinks: (playerId: string) => void;
  showRank?: boolean;
}

const PlayerListItem = React.memo(function PlayerListItem({
  player,
  rank,
  onIncrementDrinks,
  onDecrementDrinks,
  showRank = false,
}: Props) {
  const { theme } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  /**
   * Animación bounce
   */
  const animateBounce = () => {
    Animated.sequence([
      Animated.spring(scaleAnim, {
        toValue: 1.1,
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
  };

  /**
   * Maneja el incremento de tragos
   */
  const handleIncrement = () => {
    animateBounce();
    onIncrementDrinks(player.id);
  };

  /**
   * Maneja el decremento de tragos
   */
  const handleDecrement = () => {
    const lockedDrinks = player.drinksLockedAt || 0;
    // Solo permitir restar si hay tragos no bloqueados
    if (player.drinks > lockedDrinks) {
      animateBounce();
      onDecrementDrinks(player.id);
    }
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

  // Calcular tragos desbloqueados (que se pueden restar)
  const unlockedDrinks = player.drinks - (player.drinksLockedAt || 0);
  const canDecrement = unlockedDrinks > 0;

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

      {/* ZONA IZQUIERDA (40%) - RESTAR */}
      <TouchableOpacity
        style={styles.leftZone}
        onPress={handleDecrement}
        activeOpacity={canDecrement ? 0.7 : 1}
        disabled={!canDecrement}
      >
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
          {/* Indicador de racha - V3.0 */}
          {player.currentStreak >= 3 && (
            <View style={styles.streakBadge}>
              <Text style={styles.streakText}>
                🔥 {player.currentStreak} racha
              </Text>
            </View>
          )}
          {/* Indicador visual zona restar */}
          {canDecrement && (
            <Text style={[styles.zoneIndicator, { color: theme.textSecondary }]}>
              ← Restar
            </Text>
          )}
        </View>
      </TouchableOpacity>

      {/* ZONA DERECHA (60%) - SUMAR */}
      <TouchableOpacity
        style={styles.rightZone}
        onPress={handleIncrement}
        activeOpacity={0.7}
      >
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
          {/* Indicador visual zona sumar */}
          <Text style={[styles.zoneIndicator, { color: theme.textSecondary }]}>
            Sumar →
          </Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
});

export default PlayerListItem;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    borderWidth: 2,
    overflow: 'hidden',
  },
  rankContainer: {
    position: 'absolute',
    top: 4,
    left: 4,
    zIndex: 10,
  },
  rankText: {
    fontSize: 16,
  },
  leftZone: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingRight: 6,
    minHeight: 70,
  },
  rightZone: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    minHeight: 70,
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
  },
  avatar: {
    fontSize: 26,
    marginRight: 8,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
  },
  drinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  drinkIcon: {
    fontSize: 11,
    marginRight: 1,
  },
  drinkCount: {
    fontSize: 11,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  counterContainer: {
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  counterLabel: {
    fontSize: 10,
    marginTop: 2,
  },
  zoneIndicator: {
    fontSize: 10,
    marginTop: 2,
    opacity: 0.6,
  },
  streakBadge: {
    backgroundColor: 'rgba(255, 87, 34, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
    marginTop: 4,
    alignSelf: 'flex-start',
  },
  streakText: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#FF5722',
  },
});
