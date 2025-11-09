/**
 * Componente para mostrar un jugador en la lista durante el juego
 * Con zonas táctiles: izquierda resta, derecha suma
 * Sistema de bloqueo de tragos al cambiar de frase
 * V2.0 - Refactorizado con Design Tokens
 */

import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Player } from '../types';
import { useTheme } from '../context/ThemeContext';
import { colors, spacing, typography, shadows, borderRadius } from '../design-system/tokens';

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
    if (player.drinks < 10) return colors.warning[500]; // Naranja
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
        accessibilityLabel={`${player.name}, ${player.drinks} ${player.drinks === 1 ? 'trago' : 'tragos'}`}
        accessibilityHint={canDecrement ? "Toca dos veces para restar un trago" : "No hay tragos para restar"}
        accessibilityRole="button"
        accessibilityState={{ disabled: !canDecrement }}
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
        accessibilityLabel={`Agregar trago a ${player.name}`}
        accessibilityHint="Toca dos veces para sumar un trago"
        accessibilityRole="button"
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
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
    ...shadows.sm,
    borderWidth: 2,
    overflow: 'hidden',
  },
  rankContainer: {
    position: 'absolute',
    top: spacing.xs,
    left: spacing.xs,
    zIndex: 10,
  },
  rankText: {
    fontSize: typography.fontSize.base,
  },
  leftZone: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
    paddingRight: spacing.xs,
    minHeight: 70,
  },
  rightZone: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.md,
    minHeight: 70,
    borderLeftWidth: 1,
    borderLeftColor: colors.overlay.light,
  },
  avatar: {
    fontSize: typography.fontSize['2xl'],
    marginRight: spacing.sm,
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  drinksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 2,
  },
  drinkIcon: {
    fontSize: typography.fontSize.xs,
    marginRight: 1,
  },
  drinkCount: {
    fontSize: typography.fontSize.xs,
    fontWeight: 'bold',
    marginLeft: 3,
  },
  counterContainer: {
    alignItems: 'center',
  },
  counterNumber: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: 'bold',
  },
  counterLabel: {
    fontSize: typography.fontSize.xs,
    marginTop: 2,
  },
  zoneIndicator: {
    fontSize: typography.fontSize.xs,
    marginTop: 2,
    opacity: 0.6,
  },
  streakBadge: {
    backgroundColor: colors.overlay.medium,
    paddingHorizontal: spacing.xs,
    paddingVertical: 2,
    borderRadius: borderRadius.md,
    marginTop: spacing.xs,
    alignSelf: 'flex-start',
  },
  streakText: {
    fontSize: typography.fontSize.xs,
    fontWeight: 'bold',
    color: colors.error[500],
  },
});
