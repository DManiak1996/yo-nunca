/**
 * Componente de votación para modo Detectives (un solo móvil)
 * Cada jugador vota sobre lo que CREE que han hecho los DEMÁS
 * Flujo: votación por turnos → revelación de verdades → cálculo de fallos
 */

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Alert } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Player, DetectivesVote, DetectivesTruth } from '../types';
import CustomButton from './CustomButton';

interface Props {
  players: Player[];
  phrase: string;
  onAllComplete: (votes: DetectivesVote[], truths: DetectivesTruth[]) => void;
}

type Phase = 'voting' | 'truths';

export default function DetectivesVoting({ players, phrase, onAllComplete }: Props) {
  const { theme } = useTheme();

  // Estado
  const [phase, setPhase] = useState<Phase>('voting');
  const [currentVoterIndex, setCurrentVoterIndex] = useState(0);
  const [votes, setVotes] = useState<DetectivesVote[]>([]);
  const [truths, setTruths] = useState<DetectivesTruth[]>(
    players.map(p => ({ playerId: p.id, didIt: null }))
  );

  const currentVoter = players[currentVoterIndex];
  const otherPlayers = players.filter(p => p.id !== currentVoter.id);

  // Votos del jugador actual
  const currentVoterVotes = votes.filter(v => v.voterId === currentVoter.id);
  const hasVotedForAll = currentVoterVotes.length === otherPlayers.length;

  const handleVote = (targetId: string, prediction: boolean) => {
    // Agregar o actualizar voto
    setVotes(prevVotes => {
      const existingIndex = prevVotes.findIndex(
        v => v.voterId === currentVoter.id && v.targetId === targetId
      );

      const newVote: DetectivesVote = {
        voterId: currentVoter.id,
        targetId,
        prediction,
      };

      if (existingIndex >= 0) {
        // Actualizar voto existente
        const updated = [...prevVotes];
        updated[existingIndex] = newVote;
        return updated;
      } else {
        // Agregar nuevo voto
        return [...prevVotes, newVote];
      }
    });
  };

  const handleNextVoter = () => {
    if (!hasVotedForAll) {
      Alert.alert('Faltan votos', `${currentVoter.name} debe votar sobre todos los jugadores`);
      return;
    }

    if (currentVoterIndex < players.length - 1) {
      // Pasar al siguiente votante
      setCurrentVoterIndex(prev => prev + 1);
    } else {
      // Todos votaron, pasar a fase de verdades
      setPhase('truths');
    }
  };

  const handleTruthReveal = (playerId: string, didIt: boolean) => {
    setTruths(prevTruths =>
      prevTruths.map(t =>
        t.playerId === playerId ? { ...t, didIt } : t
      )
    );
  };

  const handleComplete = () => {
    const allTruthsRevealed = truths.every(t => t.didIt !== null);

    if (!allTruthsRevealed) {
      Alert.alert('Faltan verdades', 'Todos los jugadores deben revelar su verdad');
      return;
    }

    onAllComplete(votes, truths);
  };

  // Renderizado de fase de votación
  if (phase === 'voting') {
    const renderTargetPlayer = ({ item: target }: { item: Player }) => {
      const existingVote = currentVoterVotes.find(v => v.targetId === target.id);
      const hasVoted = existingVote !== undefined;
      const prediction = existingVote?.prediction;

      return (
        <View style={[styles.targetRow, { backgroundColor: theme.cardBackground }]}>
          <View style={styles.targetInfo}>
            <Text style={styles.targetAvatar}>{target.avatar || '🎭'}</Text>
            <Text
              style={[styles.targetName, { color: theme.text }]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {target.name}
            </Text>
          </View>

          {!hasVoted ? (
            <View style={styles.voteButtons}>
              <TouchableOpacity
                style={[styles.voteButton, { borderColor: theme.danger }]}
                onPress={() => handleVote(target.id, false)}
              >
                <Text style={[styles.voteButtonText, { color: theme.danger }]}>
                  NO
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.voteButton, { borderColor: theme.success }]}
                onPress={() => handleVote(target.id, true)}
              >
                <Text style={[styles.voteButtonText, { color: theme.success }]}>
                  SÍ
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View
              style={[
                styles.votedBadge,
                {
                  backgroundColor: prediction
                    ? theme.success
                    : theme.danger,
                },
              ]}
            >
              <Text style={styles.votedText}>
                {prediction ? 'SÍ' : 'NO'}
              </Text>
            </View>
          )}
        </View>
      );
    };

    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.phrase, { color: theme.text }]}>
            Yo nunca {phrase}
          </Text>
          <View style={[styles.voterBadge, { backgroundColor: theme.primary }]}>
            <Text style={styles.voterBadgeText}>
              Turno de {currentVoter.name} {currentVoter.avatar}
            </Text>
          </View>
          <Text style={[styles.instruction, { color: theme.textSecondary }]}>
            ¿Quién crees que SÍ lo ha hecho?
          </Text>
        </View>

        <View style={[styles.progressContainer, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.progressText, { color: theme.text }]}>
            Votante {currentVoterIndex + 1}/{players.length}
          </Text>
        </View>

        <FlatList
          data={otherPlayers}
          renderItem={renderTargetPlayer}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          showsVerticalScrollIndicator={false}
        />

        <View style={styles.footer}>
          <CustomButton
            title={
              currentVoterIndex < players.length - 1
                ? "Siguiente Jugador ➜"
                : "Revelar Verdades ➜"
            }
            onPress={handleNextVoter}
            variant="primary"
            disabled={!hasVotedForAll}
          />
        </View>
      </View>
    );
  }

  // Renderizado de fase de verdades
  const renderTruthReveal = ({ item: player }: { item: Player }) => {
    const truth = truths.find(t => t.playerId === player.id);
    const hasRevealed = truth?.didIt !== null;
    const didIt = truth?.didIt;

    return (
      <View style={[styles.targetRow, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.targetInfo}>
          <Text style={styles.targetAvatar}>{player.avatar || '🎭'}</Text>
          <Text
            style={[styles.targetName, { color: theme.text }]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {player.name}
          </Text>
        </View>

        {!hasRevealed ? (
          <View style={styles.voteButtons}>
            <TouchableOpacity
              style={[styles.voteButton, { borderColor: theme.danger }]}
              onPress={() => handleTruthReveal(player.id, false)}
            >
              <Text style={[styles.voteButtonText, { color: theme.danger }]}>
                NO
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.voteButton, { borderColor: theme.success }]}
              onPress={() => handleTruthReveal(player.id, true)}
            >
              <Text style={[styles.voteButtonText, { color: theme.success }]}>
                SÍ
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View
            style={[
              styles.votedBadge,
              {
                backgroundColor: didIt ? theme.success : theme.danger,
              },
            ]}
          >
            <Text style={styles.votedText}>
              {didIt ? 'SÍ lo hice' : 'NO lo hice'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={[styles.phrase, { color: theme.text }]}>
          Yo nunca {phrase}
        </Text>
        <Text style={[styles.instruction, { color: theme.textSecondary }]}>
          Cada jugador revela su verdad
        </Text>
      </View>

      <FlatList
        data={players}
        renderItem={renderTruthReveal}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <CustomButton
          title="Ver Resultados ➜"
          onPress={handleComplete}
          variant="primary"
          disabled={truths.some(t => t.didIt === null)}
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
    marginBottom: 12,
  },
  voterBadge: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 8,
  },
  voterBadgeText: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  instruction: {
    fontSize: 14,
    textAlign: 'center',
  },
  progressContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
  },
  list: {
    paddingHorizontal: 20,
    gap: 8,
  },
  targetRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },
  targetInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
  },
  targetAvatar: {
    fontSize: 16,
    marginRight: 8,
  },
  targetName: {
    fontSize: 13,
    fontWeight: '600',
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 6,
  },
  voteButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 2,
    minWidth: 50,
    alignItems: 'center',
  },
  voteButtonText: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  votedBadge: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  votedText: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '600',
  },
  footer: {
    padding: 20,
  },
});
