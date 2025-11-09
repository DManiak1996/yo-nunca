/**
 * Componente que muestra los resultados de votación en modo Detectives
 * Calcula fallos y muestra quién debe beber
 */

import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Player, DetectivesVote, DetectivesTruth, DetectivesRoundResult } from '../types';
import CustomButton from './CustomButton';

interface Props {
  players: Player[];
  votes: DetectivesVote[];
  truths: DetectivesTruth[];
  phrase: string;
  onNext: () => void;
}

export default function DetectivesResults({
  players,
  votes,
  truths,
  phrase,
  onNext,
}: Props) {
  const { theme } = useTheme();

  // Calcular resultados: quién falló y cuántos tragos bebe
  const calculateResults = (): DetectivesRoundResult[] => {
    return players.map(player => {
      // Votos que hizo este jugador sobre otros
      const playerVotes = votes.filter(v => v.voterId === player.id);

      // Contar fallos
      let failedPredictions = 0;

      playerVotes.forEach(vote => {
        const truth = truths.find(t => t.playerId === vote.targetId);
        if (!truth) return;

        // Si la predicción no coincide con la verdad, es un fallo
        if (vote.prediction !== truth.didIt) {
          failedPredictions++;
        }
      });

      return {
        playerId: player.id,
        failedPredictions,
        drinks: failedPredictions, // 1 trago por cada fallo
      };
    });
  };

  const results = calculateResults();

  // Ordenar por más fallos (los que más beben primero)
  const sortedResults = [...results].sort(
    (a, b) => b.failedPredictions - a.failedPredictions
  );

  const renderResult = ({ item }: { item: DetectivesRoundResult }) => {
    const player = players.find(p => p.id === item.playerId);
    if (!player) return null;

    const hasDrinks = item.drinks > 0;

    return (
      <View
        style={[
          styles.resultRow,
          {
            backgroundColor: hasDrinks
              ? `${theme.danger}20`
              : `${theme.success}20`,
          },
        ]}
      >
        <View style={styles.playerInfo}>
          <Text style={styles.playerAvatar}>{player.avatar || '🎭'}</Text>
          <Text
            style={[styles.playerName, { color: theme.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {player.name}
          </Text>
        </View>

        <View style={styles.resultInfo}>
          <Text style={[styles.failsText, { color: theme.textSecondary }]}>
            {item.failedPredictions} {item.failedPredictions === 1 ? 'fallo' : 'fallos'}
          </Text>
          {hasDrinks ? (
            <View style={[styles.drinksBadge, { backgroundColor: theme.danger }]}>
              <Text style={styles.drinksText}>
                🍺 {item.drinks} {item.drinks === 1 ? 'trago' : 'tragos'}
              </Text>
            </View>
          ) : (
            <View style={[styles.perfectBadge, { backgroundColor: theme.success }]}>
              <Text style={styles.perfectText}>¡Perfecto! ✨</Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  // Contar cuántos jugadores beben
  const playersDrinking = results.filter(r => r.drinks > 0).length;
  const totalDrinks = results.reduce((sum, r) => sum + r.drinks, 0);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.phrase, { color: theme.text }]}>
          Yo nunca {phrase}
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Resultados de la ronda
        </Text>
      </View>

      <View style={[styles.summaryContainer, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: theme.danger }]}>
            {playersDrinking}
          </Text>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            {playersDrinking === 1 ? 'Jugador bebe' : 'Jugadores beben'}
          </Text>
        </View>

        <View style={styles.summaryDivider} />

        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: theme.primary }]}>
            {totalDrinks}
          </Text>
          <Text style={[styles.summaryLabel, { color: theme.textSecondary }]}>
            {totalDrinks === 1 ? 'Trago total' : 'Tragos totales'}
          </Text>
        </View>
      </View>

      <FlatList
        data={sortedResults}
        renderItem={renderResult}
        keyExtractor={(item) => item.playerId}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <CustomButton
          title="Siguiente Frase ➜"
          onPress={onNext}
          variant="primary"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  phrase: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  summaryContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  summaryDivider: {
    width: 1,
    height: 60,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
  },
  list: {
    paddingHorizontal: 20,
    gap: 12,
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  playerAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  resultInfo: {
    alignItems: 'flex-end',
  },
  failsText: {
    fontSize: 12,
    marginBottom: 4,
  },
  drinksBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  drinksText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  perfectBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  perfectText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  footer: {
    padding: 20,
  },
});
