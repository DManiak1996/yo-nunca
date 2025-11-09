/**
 * Modal de estadísticas en tiempo real durante la partida
 * Muestra ranking de jugadores y métricas actuales
 * V2.0 - Refactorizado con Design Tokens
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Player } from '../types';
import { useStats } from '../hooks/useStats';
import { colors, spacing, typography, shadows, borderRadius } from '../design-system/tokens';

interface Props {
  visible: boolean;
  onClose: () => void;
  players: Player[];
  phrasesPlayed: number;
  totalPhrases: number;
  unusedPhrases: number;
}

const StatsModal = React.memo(function StatsModal({
  visible,
  onClose,
  players,
  phrasesPlayed,
  totalPhrases,
  unusedPhrases,
}: Props) {
  const { theme } = useTheme();
  const { ranking, mostDiablo, mostBendito, totalDrinks, averageDrinks } =
    useStats(players);

  /**
   * Obtiene el emoji de medalla según la posición
   */
  const getMedalEmoji = (position: number) => {
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

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.cardBackground }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={[styles.title, { color: theme.text }]}>
              🏆 Estadísticas Actuales
            </Text>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={[styles.closeButtonText, { color: theme.textSecondary }]}>
                ✕
              </Text>
            </TouchableOpacity>
          </View>

          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Frases jugadas */}
            <View style={[styles.section, { borderBottomColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                📊 Progreso
              </Text>
              <View style={styles.progressInfo}>
                <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                  Frases jugadas: <Text style={{ color: theme.primary, fontWeight: 'bold' }}>{phrasesPlayed}</Text> / {totalPhrases}
                </Text>
                <Text style={[styles.progressText, { color: theme.textSecondary }]}>
                  Quedan: <Text style={{ color: theme.success, fontWeight: 'bold' }}>{unusedPhrases}</Text>
                </Text>
              </View>
            </View>

            {/* Ranking */}
            <View style={[styles.section, { borderBottomColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                👥 Ranking
              </Text>
              {ranking.map((player, index) => (
                <View
                  key={player.id}
                  style={[
                    styles.rankingItem,
                    {
                      backgroundColor:
                        index < 3
                          ? `${theme.primary}20`
                          : 'transparent',
                    },
                  ]}
                >
                  <Text style={styles.rankingMedal}>
                    {getMedalEmoji(index + 1)}
                  </Text>
                  <Text style={styles.rankingAvatar}>{player.avatar}</Text>
                  <Text
                    style={[styles.rankingName, { color: theme.text }]}
                    numberOfLines={1}
                  >
                    {player.name}
                  </Text>
                  <View style={styles.rankingDrinks}>
                    <Text style={[styles.rankingDrinksNumber, { color: theme.primary }]}>
                      {player.drinks}
                    </Text>
                    <Text style={[styles.rankingDrinksLabel, { color: theme.textSecondary }]}>
                      🍺
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Destacados */}
            <View style={styles.section}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                🌟 Destacados
              </Text>

              {/* Más diablo */}
              {mostDiablo && (
                <View style={[styles.highlightItem, { backgroundColor: `${theme.danger}30` }]}>
                  <Text style={styles.highlightIcon}>😈</Text>
                  <View style={styles.highlightInfo}>
                    <Text style={[styles.highlightLabel, { color: theme.danger }]}>
                      Más diablo
                    </Text>
                    <Text style={[styles.highlightName, { color: theme.text }]}>
                      {mostDiablo.avatar} {mostDiablo.name}
                    </Text>
                    <Text style={[styles.highlightValue, { color: theme.textSecondary }]}>
                      {mostDiablo.drinks} tragos
                    </Text>
                  </View>
                </View>
              )}

              {/* Más bendito */}
              {mostBendito && (
                <View style={[styles.highlightItem, { backgroundColor: `${theme.success}30` }]}>
                  <Text style={styles.highlightIcon}>😇</Text>
                  <View style={styles.highlightInfo}>
                    <Text style={[styles.highlightLabel, { color: theme.success }]}>
                      Más bendito
                    </Text>
                    <Text style={[styles.highlightName, { color: theme.text }]}>
                      {mostBendito.avatar} {mostBendito.name}
                    </Text>
                    <Text style={[styles.highlightValue, { color: theme.textSecondary }]}>
                      {mostBendito.drinks} tragos
                    </Text>
                  </View>
                </View>
              )}

              {/* Métricas generales */}
              <View style={[styles.metricsContainer, { backgroundColor: `${theme.primary}20` }]}>
                <View style={styles.metricItem}>
                  <Text style={[styles.metricValue, { color: theme.primary }]}>
                    {totalDrinks}
                  </Text>
                  <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>
                    Tragos totales
                  </Text>
                </View>
                <View style={[styles.metricDivider, { backgroundColor: theme.border }]} />
                <View style={styles.metricItem}>
                  <Text style={[styles.metricValue, { color: theme.primary }]}>
                    {averageDrinks.toFixed(1)}
                  </Text>
                  <Text style={[styles.metricLabel, { color: theme.textSecondary }]}>
                    Promedio
                  </Text>
                </View>
              </View>
            </View>
          </ScrollView>

          {/* Botón cerrar */}
          <TouchableOpacity
            style={[styles.closeButtonBottom, { backgroundColor: theme.primary }]}
            onPress={onClose}
          >
            <Text style={[styles.closeButtonBottomText, { color: colors.text.inverse }]}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
});

export default StatsModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay.medium,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.lg,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: borderRadius['2xl'],
    ...shadows.xl,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.lg,
    paddingBottom: spacing.base,
  },
  title: {
    fontSize: typography.fontSize['2xl'],
    fontWeight: typography.fontWeight.bold,
  },
  closeButton: {
    padding: spacing.xs,
  },
  closeButtonText: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
  },
  content: {
    paddingHorizontal: spacing.lg,
  },
  section: {
    marginBottom: spacing.lg,
    paddingBottom: spacing.lg,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.md,
  },
  progressInfo: {
    gap: spacing.sm,
  },
  progressText: {
    fontSize: typography.fontSize.sm,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.md,
    borderRadius: borderRadius.lg,
    marginBottom: spacing.sm,
  },
  rankingMedal: {
    fontSize: typography.fontSize['2xl'],
    marginRight: spacing.sm,
    width: 32,
  },
  rankingAvatar: {
    fontSize: typography.fontSize['2xl'],
    marginRight: spacing.md,
  },
  rankingName: {
    flex: 1,
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
  },
  rankingDrinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
  },
  rankingDrinksNumber: {
    fontSize: typography.fontSize.xl,
    fontWeight: typography.fontWeight.bold,
  },
  rankingDrinksLabel: {
    fontSize: typography.fontSize.base,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.base,
    borderRadius: borderRadius.xl,
    marginBottom: spacing.md,
  },
  highlightIcon: {
    fontSize: typography.fontSize['4xl'],
    marginRight: spacing.md,
  },
  highlightInfo: {
    flex: 1,
  },
  highlightLabel: {
    fontSize: typography.fontSize.sm,
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  highlightName: {
    fontSize: typography.fontSize.base,
    fontWeight: typography.fontWeight.bold,
    marginBottom: 2,
  },
  highlightValue: {
    fontSize: typography.fontSize.sm,
  },
  metricsContainer: {
    flexDirection: 'row',
    padding: spacing.base,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: typography.fontSize['3xl'],
    fontWeight: typography.fontWeight.bold,
    marginBottom: spacing.xs,
  },
  metricLabel: {
    fontSize: typography.fontSize.xs,
    textAlign: 'center',
  },
  metricDivider: {
    width: 1,
    height: 40,
  },
  closeButtonBottom: {
    margin: spacing.lg,
    marginTop: spacing.md,
    padding: spacing.base,
    borderRadius: borderRadius.xl,
    alignItems: 'center',
    ...shadows.md,
  },
  closeButtonBottomText: {
    fontSize: typography.fontSize.lg,
    fontWeight: typography.fontWeight.bold,
  },
});
