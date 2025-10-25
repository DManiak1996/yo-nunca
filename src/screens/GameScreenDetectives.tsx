/**
 * Pantalla de juego modo Detectives
 * Sin tragos, basado en votaciones SÍ/NO
 */

import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Player, DetectivesVote, DetectivesTruth, DifficultyLevel } from '../types';
import { useTheme } from '../context/ThemeContext';
import { shuffle } from '../utils/shuffle';
import { medioLevelPhrases } from '../data/phrases/medioLevel';
import { picanteLevelPhrases } from '../data/phrases/picanteLevel';
import { muyPicanteLevelPhrases } from '../data/phrases/muyPicanteLevel';
import DetectivesVoting from '../components/DetectivesVoting';
import DetectivesResults from '../components/DetectivesResults';
import CustomButton from '../components/CustomButton';

type GameScreenDetectivesNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameDetectives'
>;

type GameScreenDetectivesRouteProp = RouteProp<
  RootStackParamList,
  'GameDetectives'
>;

interface Props {
  navigation: GameScreenDetectivesNavigationProp;
  route: GameScreenDetectivesRouteProp;
}

export default function GameScreenDetectives({ navigation, route }: Props) {
  const { players: initialPlayers, difficulty } = route.params;
  const { theme } = useTheme();

  // Estado del juego
  const [phrases] = useState(() => {
    let basePhrases: string[] = [];
    switch (difficulty) {
      case 'medio':
        basePhrases = [...medioLevelPhrases];
        break;
      case 'picante':
        basePhrases = [...picanteLevelPhrases];
        break;
      case 'muy_picante':
        basePhrases = [...muyPicanteLevelPhrases];
        break;
      default:
        basePhrases = [...medioLevelPhrases];
    }
    return shuffle(basePhrases);
  });

  const [currentPhraseIndex, setCurrentPhraseIndex] = useState(0);
  const [phrasesPlayed, setPhrasesPlayed] = useState(0);
  const [showVoting, setShowVoting] = useState(true);
  const [currentVotes, setCurrentVotes] = useState<DetectivesVote[]>([]);
  const [currentTruths, setCurrentTruths] = useState<DetectivesTruth[]>([]);

  const currentPhrase = phrases[currentPhraseIndex];

  /**
   * Callback cuando todos han votado y revelado verdades
   */
  const handleAllComplete = useCallback((votes: DetectivesVote[], truths: DetectivesTruth[]) => {
    setCurrentVotes(votes);
    setCurrentTruths(truths);
    setShowVoting(false);
  }, []);

  /**
   * Avanza a la siguiente frase
   */
  const handleNextPhrase = useCallback(() => {
    const nextIndex = currentPhraseIndex + 1;

    if (nextIndex >= phrases.length) {
      // Se acabaron las frases - volver a mezclar
      Alert.alert(
        'Fin de las frases',
        '¡Han completado todas las frases! ¿Quieren seguir jugando?',
        [
          { text: 'Salir', onPress: () => navigation.navigate('Home') },
          {
            text: 'Seguir jugando',
            onPress: () => {
              setCurrentPhraseIndex(0);
              setShowVoting(true);
              setPhrasesPlayed(prev => prev + 1);
            },
          },
        ]
      );
    } else {
      setCurrentPhraseIndex(nextIndex);
      setShowVoting(true);
      setPhrasesPlayed(prev => prev + 1);
    }
  }, [currentPhraseIndex, phrases.length, navigation]);

  /**
   * Maneja el botón salir
   */
  const handleExit = () => {
    Alert.alert(
      'Salir del juego',
      '¿Estás seguro de que quieres salir?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Salir', onPress: () => navigation.navigate('Home'), style: 'destructive' },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerInfo}>
          <Text style={[styles.headerMode, { color: theme.primary }]}>
            🕵️ Modo Detectives
          </Text>
          <Text style={[styles.headerPhrase, { color: theme.textSecondary }]}>
            Frase {phrasesPlayed + 1} • {phrases.length} totales
          </Text>
        </View>
        <CustomButton
          title="Salir"
          onPress={handleExit}
          variant="secondary"
          style={styles.exitButton}
        />
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        {showVoting ? (
          <DetectivesVoting
            players={initialPlayers}
            phrase={currentPhrase}
            onAllComplete={handleAllComplete}
          />
        ) : (
          <DetectivesResults
            players={initialPlayers}
            votes={currentVotes}
            truths={currentTruths}
            phrase={currentPhrase}
            onNext={handleNextPhrase}
          />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  headerInfo: {
    flex: 1,
  },
  headerMode: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  headerPhrase: {
    fontSize: 13,
    marginTop: 2,
  },
  exitButton: {
    minWidth: 80,
  },
  content: {
    flex: 1,
  },
});
