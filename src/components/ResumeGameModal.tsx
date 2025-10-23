/**
 * Modal para continuar una partida guardada
 * Se muestra al abrir la app si existe una sesión guardada reciente
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { GameSession } from '../types';
import CustomButton from './CustomButton';

interface Props {
  visible: boolean;
  session: GameSession | null;
  onContinue: () => void;
  onNewGame: () => void;
}

export default function ResumeGameModal({
  visible,
  session,
  onContinue,
  onNewGame,
}: Props) {
  const { theme } = useTheme();

  if (!session) return null;

  /**
   * Formatea el timestamp a fecha legible
   */
  const formatLastPlayed = (timestamp: number): string => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 1000 / 60);
    const hours = Math.floor(minutes / 60);

    if (hours > 0) {
      return `Hace ${hours} hora${hours > 1 ? 's' : ''}`;
    } else if (minutes > 0) {
      return `Hace ${minutes} minuto${minutes > 1 ? 's' : ''}`;
    } else {
      return 'Hace unos segundos';
    }
  };

  /**
   * Obtiene el nombre de la dificultad
   */
  const getDifficultyName = (difficulty: string): string => {
    switch (difficulty) {
      case 'medio':
        return 'Medio';
      case 'picante':
        return 'Picante';
      case 'muy_picante':
        return 'Muy Picante';
      default:
        return difficulty;
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onNewGame}
    >
      <View style={styles.overlay}>
        <View style={[styles.modalContainer, { backgroundColor: theme.cardBackground }]}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.icon}>⏸️</Text>
            <Text style={[styles.title, { color: theme.text }]}>
              Tienes una partida en curso
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              {formatLastPlayed(session.lastPlayedAt)}
            </Text>
          </View>

          {/* Info de la sesión */}
          <ScrollView
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Categoría */}
            <View style={[styles.infoCard, { backgroundColor: `${theme.primary}20` }]}>
              <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
                Categoría
              </Text>
              <Text style={[styles.infoValue, { color: theme.text }]}>
                {getDifficultyName(session.difficulty)}
              </Text>
            </View>

            {/* Jugadores */}
            <View style={[styles.section, { borderTopColor: theme.border }]}>
              <Text style={[styles.sectionTitle, { color: theme.text }]}>
                👥 Jugadores ({session.players.length})
              </Text>
              {session.players.map((player) => (
                <View
                  key={player.id}
                  style={[styles.playerItem, { backgroundColor: `${theme.cardBackground}` }]}
                >
                  <Text style={styles.playerAvatar}>{player.avatar}</Text>
                  <Text style={[styles.playerName, { color: theme.text }]} numberOfLines={1}>
                    {player.name}
                  </Text>
                  <View style={styles.playerDrinks}>
                    <Text style={[styles.playerDrinksNumber, { color: theme.primary }]}>
                      {player.drinks}
                    </Text>
                    <Text style={[styles.playerDrinksLabel, { color: theme.textSecondary }]}>
                      {player.drinks === 1 ? 'trago' : 'tragos'}
                    </Text>
                  </View>
                </View>
              ))}
            </View>

            {/* Progreso */}
            <View style={[styles.progressCard, { backgroundColor: `${theme.success}20` }]}>
              <Text style={[styles.progressLabel, { color: theme.textSecondary }]}>
                Frases jugadas
              </Text>
              <Text style={[styles.progressValue, { color: theme.text }]}>
                {session.phrasesPlayed}
              </Text>
            </View>
          </ScrollView>

          {/* Botones */}
          <View style={styles.buttonsContainer}>
            <CustomButton
              title="Continuar Partida"
              onPress={onContinue}
              variant="primary"
            />
            <CustomButton
              title="Nueva Partida"
              onPress={onNewGame}
              variant="secondary"
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
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 450,
    maxHeight: '85%',
    borderRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  header: {
    alignItems: 'center',
    padding: 24,
    paddingBottom: 16,
  },
  icon: {
    fontSize: 56,
    marginBottom: 12,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  infoCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  infoValue: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  section: {
    paddingTop: 16,
    paddingBottom: 16,
    borderTopWidth: 1,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  playerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  playerAvatar: {
    fontSize: 24,
    marginRight: 12,
  },
  playerName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
  },
  playerDrinks: {
    alignItems: 'center',
  },
  playerDrinksNumber: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  playerDrinksLabel: {
    fontSize: 10,
  },
  progressCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginTop: 12,
    marginBottom: 16,
  },
  progressLabel: {
    fontSize: 12,
    marginBottom: 6,
  },
  progressValue: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  buttonsContainer: {
    padding: 20,
    paddingTop: 12,
    gap: 12,
  },
});
