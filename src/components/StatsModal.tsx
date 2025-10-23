/**
 * Modal de estadísticas en tiempo real durante la partida
 * Muestra ranking de jugadores y métricas actuales
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
            <Text style={styles.closeButtonBottomText}>Cerrar</Text>
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
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: 24,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  content: {
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 24,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  progressInfo: {
    gap: 8,
  },
  progressText: {
    fontSize: 15,
  },
  rankingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  rankingMedal: {
    fontSize: 24,
    marginRight: 8,
    width: 32,
  },
  rankingAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  rankingName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  rankingDrinks: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rankingDrinksNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  rankingDrinksLabel: {
    fontSize: 16,
  },
  highlightItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
  },
  highlightIcon: {
    fontSize: 36,
    marginRight: 12,
  },
  highlightInfo: {
    flex: 1,
  },
  highlightLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  highlightName: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 2,
  },
  highlightValue: {
    fontSize: 14,
  },
  metricsContainer: {
    flexDirection: 'row',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  metricItem: {
    alignItems: 'center',
    flex: 1,
  },
  metricValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  metricLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  metricDivider: {
    width: 1,
    height: 40,
  },
  closeButtonBottom: {
    margin: 20,
    marginTop: 12,
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
  },
  closeButtonBottomText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
});
