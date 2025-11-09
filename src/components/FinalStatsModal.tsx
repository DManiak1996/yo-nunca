/**
 * Modal de estadísticas finales al terminar la partida
 * Diseño estilo campeonato con podio y métricas completas
 * V2.0 - Refactorizado con Design Tokens
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Player } from '../types';
import { useStats } from '../hooks/useStats';
import CustomButton from './CustomButton';
import { colors, spacing, typography, shadows, borderRadius } from '../design-system/tokens';

interface Props {
  visible: boolean;
  onPlayAgain: () => void;
  onExit: () => void;
  players: Player[];
  phrasesPlayed: number;
  duration: number; // en minutos
}

export default function FinalStatsModal({
  visible,
  onPlayAgain,
  onExit,
  players,
  phrasesPlayed,
  duration,
}: Props) {
  const { theme } = useTheme();
  const { ranking, mostDiablo, mostBendito, totalDrinks } = useStats(players);

  // Top 3 jugadores
  const winner = ranking[0] || null;
  const second = ranking[1] || null;
  const third = ranking[2] || null;

  // Estadísticas adicionales
  const mostMisterioso = getMostMisterioso();
  const mostArdiente = getMostArdiente();

  /**
   * Calcula el jugador más misterioso
   * (pocos tragos pero no es el que menos tiene)
   */
  function getMostMisterioso(): Player | null {
    if (ranking.length < 3) return null;

    const middleIndex = Math.floor(ranking.length / 2);
    const middlePlayers = ranking.slice(
      Math.max(1, middleIndex - 1),
      Math.min(ranking.length - 1, middleIndex + 2)
    );

    return middlePlayers[0] || null;
  }

  /**
   * Calcula el jugador más ardiente
   * (más tragos en las últimas rondas - simplificado: el que más tragos tiene)
   */
  function getMostArdiente(): Player | null {
    return mostDiablo;
  }

  /**
   * Formatea la duración en minutos y segundos
   */
  function formatDuration(minutes: number): string {
    const mins = Math.floor(minutes);
    const secs = Math.floor((minutes - mins) * 60);
    return `${mins}:${secs.toString().padStart(2, '0')} min`;
  }

  if (!visible) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onExit}
    >
      <View style={styles.overlay}>
        <View
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.cardBackground,
            },
          ]}
        >
          <ScrollView
            style={styles.scrollView}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
          >
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.trophy}>🏆</Text>
              <Text style={[styles.title, { color: theme.text }]}>
                FIN DE LA PARTIDA
              </Text>
            </View>

            {/* Podio */}
            <View style={styles.podiumContainer}>
              {/* Segundo lugar (izquierda) */}
              {second && (
                <View style={styles.podiumSecond}>
                  <Text style={styles.podiumAvatar}>{second.avatar || '🎭'}</Text>
                  <Text style={[styles.podiumName, { color: theme.text }]} numberOfLines={1}>
                    {second.name}
                  </Text>
                  <Text style={styles.silverMedal}>🥈</Text>
                  <View style={[styles.podiumBase, styles.podiumBaseSecond, { backgroundColor: colors.neutral[400] }]}>
                    <Text style={styles.podiumDrinks}>{second.drinks}</Text>
                    <Text style={styles.podiumLabel}>tragos</Text>
                  </View>
                </View>
              )}

              {/* Primer lugar (centro) */}
              {winner && (
                <View style={styles.podiumFirst}>
                  <Text style={styles.crownIcon}>👑</Text>
                  <Text style={styles.podiumAvatarFirst}>{winner.avatar || '🎭'}</Text>
                  <Text style={[styles.podiumNameFirst, { color: theme.text }]} numberOfLines={1}>
                    {winner.name}
                  </Text>
                  <Text style={styles.goldMedal}>🥇</Text>
                  <View style={[styles.podiumBase, styles.podiumBaseFirst, { backgroundColor: theme.primary }]}>
                    <Text style={[styles.podiumDrinks, styles.podiumDrinksFirst]}>
                      {winner.drinks}
                    </Text>
                    <Text style={[styles.podiumLabel, { color: colors.text.inverse }]}>tragos</Text>
                  </View>
                </View>
              )}

              {/* Tercer lugar (derecha) */}
              {third && (
                <View style={styles.podiumThird}>
                  <Text style={styles.podiumAvatar}>{third.avatar || '🎭'}</Text>
                  <Text style={[styles.podiumName, { color: theme.text }]} numberOfLines={1}>
                    {third.name}
                  </Text>
                  <Text style={styles.bronzeMedal}>🥉</Text>
                  <View style={[styles.podiumBase, styles.podiumBaseThird, { backgroundColor: colors.warning[700] }]}>
                    <Text style={styles.podiumDrinks}>{third.drinks}</Text>
                    <Text style={styles.podiumLabel}>tragos</Text>
                  </View>
                </View>
              )}
            </View>

            {/* Destacados */}
            <View style={[styles.section, { borderTopColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                🌟 Destacados
              </Text>

              <View style={styles.highlightsGrid}>
                {/* Más diablo */}
                {mostDiablo && (
                  <View style={[styles.highlightCard, { backgroundColor: `${theme.danger}30` }]}>
                    <Text style={styles.highlightIcon}>😈</Text>
                    <Text style={[styles.highlightLabel, { color: theme.danger }]}>
                      Más diablo
                    </Text>
                    <Text style={[styles.highlightName, { color: theme.text }]} numberOfLines={1}>
                      {mostDiablo.name}
                    </Text>
                    <Text style={[styles.highlightValue, { color: theme.textSecondary }]}>
                      {mostDiablo.drinks} 🍺
                    </Text>
                  </View>
                )}

                {/* Más bendito */}
                {mostBendito && (
                  <View style={[styles.highlightCard, { backgroundColor: `${theme.success}30` }]}>
                    <Text style={styles.highlightIcon}>😇</Text>
                    <Text style={[styles.highlightLabel, { color: theme.success }]}>
                      Más bendito
                    </Text>
                    <Text style={[styles.highlightName, { color: theme.text }]} numberOfLines={1}>
                      {mostBendito.name}
                    </Text>
                    <Text style={[styles.highlightValue, { color: theme.textSecondary }]}>
                      {mostBendito.drinks} 🍺
                    </Text>
                  </View>
                )}

                {/* Más misterioso */}
                {mostMisterioso && (
                  <View style={[styles.highlightCard, { backgroundColor: `${theme.secondary}30` }]}>
                    <Text style={styles.highlightIcon}>🎭</Text>
                    <Text style={[styles.highlightLabel, { color: theme.secondary }]}>
                      Más misterioso
                    </Text>
                    <Text style={[styles.highlightName, { color: theme.text }]} numberOfLines={1}>
                      {mostMisterioso.name}
                    </Text>
                    <Text style={[styles.highlightValue, { color: theme.textSecondary }]}>
                      {mostMisterioso.drinks} 🍺
                    </Text>
                  </View>
                )}

                {/* Más ardiente */}
                {mostArdiente && (
                  <View style={[styles.highlightCard, { backgroundColor: colors.overlay.medium }]}>
                    <Text style={styles.highlightIcon}>🔥</Text>
                    <Text style={[styles.highlightLabel, { color: colors.warning[500] }]}>
                      Más ardiente
                    </Text>
                    <Text style={[styles.highlightName, { color: theme.text }]} numberOfLines={1}>
                      {mostArdiente.name}
                    </Text>
                    <Text style={[styles.highlightValue, { color: theme.textSecondary }]}>
                      {mostArdiente.drinks} 🍺
                    </Text>
                  </View>
                )}

                {/* Mayor Racha - V3.0 */}
                {(() => {
                  const bestStreakPlayer = players.reduce((best, p) =>
                    (p.maxStreak || 0) > (best.maxStreak || 0) ? p : best
                  , players[0]);

                  if (bestStreakPlayer && (bestStreakPlayer.maxStreak || 0) > 0) {
                    return (
                      <View style={[styles.highlightCard, { backgroundColor: colors.overlay.medium }]}>
                        <Text style={styles.highlightIcon}>⚡</Text>
                        <Text style={[styles.highlightLabel, { color: colors.primary[500] }]}>
                          Mayor racha
                        </Text>
                        <Text style={[styles.highlightName, { color: theme.text }]} numberOfLines={1}>
                          {bestStreakPlayer.name}
                        </Text>
                        <Text style={[styles.highlightValue, { color: theme.textSecondary }]}>
                          {bestStreakPlayer.maxStreak} consecutivos
                        </Text>
                      </View>
                    );
                  }
                  return null;
                })()}
              </View>
            </View>

            {/* Resumen de partida */}
            <View style={[styles.section, { borderTopColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                📈 Resumen
              </Text>
              <View style={[styles.summaryCard, { backgroundColor: `${theme.primary}20` }]}>
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: theme.primary }]}>
                    {phrasesPlayed}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                    Frases jugadas
                  </Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: theme.border }]} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: theme.primary }]}>
                    {totalDrinks}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                    Total tragos
                  </Text>
                </View>
                <View style={[styles.summaryDivider, { backgroundColor: theme.border }]} />
                <View style={styles.summaryItem}>
                  <Text style={[styles.summaryValue, { color: theme.primary }]}>
                    {formatDuration(duration)}
                  </Text>
                  <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
                    Duración
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Botones */}
          <View style={styles.buttonsContainer}>
            <CustomButton title="Jugar de nuevo" onPress={onPlayAgain} variant="primary" />
            <CustomButton title="Salir" onPress={onExit} variant="secondary" />
          </View>
        </View>
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
  },
  modalContainer: {
    width: '95%',
    maxWidth: 500,
    height: '90%',
    borderRadius: borderRadius['2xl'],
    ...shadows.xl,
    flexDirection: 'column',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: spacing.lg,
  },
  header: {
    alignItems: 'center',
    paddingTop: spacing.lg,
    paddingBottom: spacing.base,
  },
  trophy: {
    fontSize: 64,
    marginBottom: spacing.sm,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: spacing.base,
    paddingVertical: spacing.lg,
    gap: spacing.sm,
  },
  podiumFirst: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 120,
  },
  podiumSecond: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 100,
    marginBottom: 30,
  },
  podiumThird: {
    alignItems: 'center',
    flex: 1,
    maxWidth: 100,
    marginBottom: 50,
  },
  crownIcon: {
    fontSize: typography.fontSize['4xl'],
    marginBottom: spacing.xs,
  },
  podiumAvatarFirst: {
    fontSize: typography.fontSize['5xl'],
    marginBottom: spacing.sm,
  },
  podiumAvatar: {
    fontSize: typography.fontSize['4xl'],
    marginBottom: spacing.xs,
  },
  podiumNameFirst: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  podiumName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  goldMedal: {
    fontSize: typography.fontSize['4xl'],
    marginBottom: spacing.sm,
  },
  silverMedal: {
    fontSize: typography.fontSize['3xl'],
    marginBottom: spacing.xs,
  },
  bronzeMedal: {
    fontSize: typography.fontSize['3xl'],
    marginBottom: spacing.xs,
  },
  podiumBase: {
    width: '100%',
    paddingVertical: spacing.md,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
  },
  podiumBaseFirst: {
    paddingVertical: spacing.base,
  },
  podiumBaseSecond: {
    paddingVertical: spacing.md,
  },
  podiumBaseThird: {
    paddingVertical: spacing.sm,
  },
  podiumDrinks: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    color: colors.text.primary,
  },
  podiumDrinksFirst: {
    fontSize: typography.fontSize['3xl'],
    color: colors.text.inverse,
  },
  podiumLabel: {
    fontSize: typography.fontSize.xs,
    color: colors.text.primary,
    marginTop: 2,
  },
  section: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.base,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
  },
  highlightCard: {
    width: '48%',
    padding: spacing.base,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
  },
  highlightIcon: {
    fontSize: typography.fontSize['4xl'],
    marginBottom: spacing.sm,
  },
  highlightLabel: {
    fontSize: typography.fontSize.xs,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  highlightName: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
    textAlign: 'center',
  },
  highlightValue: {
    fontSize: typography.fontSize.xs,
  },
  summaryCard: {
    flexDirection: 'row',
    padding: spacing.lg,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  summaryLabel: {
    fontSize: typography.fontSize.xs,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
  },
  buttonsContainer: {
    padding: spacing.lg,
    paddingTop: spacing.md,
    gap: spacing.md,
  },
});
