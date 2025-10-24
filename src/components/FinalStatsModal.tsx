/**
 * Modal de estadísticas finales al terminar la partida
 * Diseño estilo campeonato con podio y métricas completas
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
                  <View style={[styles.podiumBase, styles.podiumBaseSecond, { backgroundColor: '#C0C0C0' }]}>
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
                    <Text style={[styles.podiumLabel, { color: '#000' }]}>tragos</Text>
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
                  <View style={[styles.podiumBase, styles.podiumBaseThird, { backgroundColor: '#CD7F32' }]}>
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
                  <View style={[styles.highlightCard, { backgroundColor: '#E67E2230' }]}>
                    <Text style={styles.highlightIcon}>🔥</Text>
                    <Text style={[styles.highlightLabel, { color: '#E67E22' }]}>
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
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '95%',
    maxWidth: 500,
    height: '90%', // CAMBIADO: de maxHeight a height para que flex funcione
    borderRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
    flexDirection: 'column', // AÑADIDO: estructura flex
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  header: {
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 16,
  },
  trophy: {
    fontSize: 64,
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  podiumContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 16,
    paddingVertical: 24,
    gap: 8,
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
    fontSize: 32,
    marginBottom: 4,
  },
  podiumAvatarFirst: {
    fontSize: 48,
    marginBottom: 8,
  },
  podiumAvatar: {
    fontSize: 36,
    marginBottom: 6,
  },
  podiumNameFirst: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  podiumName: {
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 4,
  },
  goldMedal: {
    fontSize: 36,
    marginBottom: 8,
  },
  silverMedal: {
    fontSize: 32,
    marginBottom: 6,
  },
  bronzeMedal: {
    fontSize: 28,
    marginBottom: 6,
  },
  podiumBase: {
    width: '100%',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  podiumBaseFirst: {
    paddingVertical: 16,
  },
  podiumBaseSecond: {
    paddingVertical: 12,
  },
  podiumBaseThird: {
    paddingVertical: 10,
  },
  podiumDrinks: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
  podiumDrinksFirst: {
    fontSize: 28,
    color: '#000',
  },
  podiumLabel: {
    fontSize: 12,
    color: '#FFF',
    marginTop: 2,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  highlightsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  highlightCard: {
    width: '48%',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  highlightIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  highlightLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  highlightName: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 4,
    textAlign: 'center',
  },
  highlightValue: {
    fontSize: 13,
  },
  summaryCard: {
    flexDirection: 'row',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
    flex: 1,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  summaryLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 40,
  },
  buttonsContainer: {
    padding: 20,
    paddingTop: 12,
    gap: 12,
  },
});
