/**
 * Pantalla principal de juego multijugador
 * Muestra frases, lista de jugadores, contadores y mensajes graciosos
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useGameSession } from '../hooks/useGameSession';
import { useAutoSave } from '../hooks/useAutoSave';
import PhraseCard from '../components/PhraseCard';
import PlayerListItem from '../components/PlayerListItem';
import CustomButton from '../components/CustomButton';
import StatsModal from '../components/StatsModal';
import FinalStatsModal from '../components/FinalStatsModal';
import { getRandomFunnyMessage, shouldShowFunnyMessage } from '../data/funnyMessages';
import { clearGameSession } from '../utils/storage';

type GameScreenMultiplayerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GameMultiplayer'
>;

type GameScreenMultiplayerRouteProp = RouteProp<
  RootStackParamList,
  'GameMultiplayer'
>;

interface Props {
  navigation: GameScreenMultiplayerNavigationProp;
  route: GameScreenMultiplayerRouteProp;
}

export default function GameScreenMultiplayer({ navigation, route }: Props) {
  const { players: initialPlayers, difficulty } = route.params;
  const { theme } = useTheme();

  const {
    players,
    currentPhrase,
    phrasesPlayed,
    totalPhrases,
    unusedPhrases,
    incrementPlayerDrinks,
    nextPhrase,
    resetGame,
    getPlayersSortedByDrinks,
    getSessionData,
  } = useGameSession({
    initialPlayers,
    difficulty,
    includeCustomPhrases: false, // Por ahora sin frases personalizadas
  });

  const [funnyMessage, setFunnyMessage] = useState<string | null>(null);
  const [fadeAnim] = useState(new Animated.Value(1));
  const [messageOpacity] = useState(new Animated.Value(0));
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showFinalStatsModal, setShowFinalStatsModal] = useState(false);
  const [gameStartTime] = useState(() => Date.now());

  // Guardado automático cada 10 segundos
  useAutoSave({
    gameSession: getSessionData(),
    enabled: !showFinalStatsModal, // No guardar si ya terminó
  });

  /**
   * Configura el header personalizado
   */
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          style={styles.headerButton}
          onPress={handleShowStats}
        >
          <Text style={styles.headerButtonText}>🏆</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation, players]);

  /**
   * Verifica si debe mostrar mensaje gracioso después de cada frase
   */
  useEffect(() => {
    if (shouldShowFunnyMessage(phrasesPlayed)) {
      showFunnyMessage();
    }
  }, [phrasesPlayed]);

  /**
   * Muestra un mensaje gracioso temporal
   */
  const showFunnyMessage = () => {
    const sortedPlayers = getPlayersSortedByDrinks();
    if (sortedPlayers.length === 0 || sortedPlayers[0].drinks === 0) return;

    const topPlayer = sortedPlayers[0];
    const message = getRandomFunnyMessage(topPlayer);
    setFunnyMessage(message);

    // Animación de fade in
    Animated.sequence([
      Animated.timing(messageOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(3000), // Mostrar 3 segundos
      Animated.timing(messageOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setFunnyMessage(null);
    });
  };

  /**
   * Maneja el avance a la siguiente frase
   */
  const handleNextPhrase = () => {
    // Animación de fade out y fade in
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();

    nextPhrase();
  };

  /**
   * Maneja la finalización de la partida
   */
  const handleFinishGame = () => {
    Alert.alert(
      'Finalizar Partida',
      '¿Estás seguro de terminar el juego?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Finalizar',
          style: 'destructive',
          onPress: () => {
            setShowFinalStatsModal(true);
          },
        },
      ]
    );
  };

  /**
   * Maneja el botón "Jugar de nuevo"
   */
  const handlePlayAgain = async () => {
    try {
      await clearGameSession();
    } catch (error) {
      console.error('Error al limpiar sesión:', error);
    }
    setShowFinalStatsModal(false);
    navigation.navigate('CategorySelection');
  };

  /**
   * Maneja el botón "Salir"
   */
  const handleExit = async () => {
    try {
      await clearGameSession();
    } catch (error) {
      console.error('Error al limpiar sesión:', error);
    }
    setShowFinalStatsModal(false);
    navigation.navigate('Home');
  };

  /**
   * Muestra estadísticas en tiempo real
   */
  const handleShowStats = () => {
    setShowStatsModal(true);
  };

  /**
   * Maneja el reset del juego
   */
  const handleResetGame = () => {
    Alert.alert(
      'Reiniciar Juego',
      '¿Quieres reiniciar el juego? Se resetearán todos los contadores.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          onPress: () => {
            resetGame();
            Alert.alert('¡Juego reiniciado!', 'Todos los contadores se han reseteado.');
          },
        },
      ]
    );
  };

  /**
   * Renderiza cada jugador
   */
  const renderPlayerItem = ({ item }: { item: typeof players[0] }) => (
    <PlayerListItem
      player={item}
      onIncrementDrinks={incrementPlayerDrinks}
    />
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Mensaje gracioso flotante */}
      {funnyMessage && (
        <Animated.View
          style={[
            styles.funnyMessageContainer,
            { backgroundColor: theme.primary, opacity: messageOpacity },
          ]}
        >
          <Text style={styles.funnyMessageText}>{funnyMessage}</Text>
        </Animated.View>
      )}

      {/* Tarjeta de frase */}
      <Animated.View style={[styles.phraseContainer, { opacity: fadeAnim }]}>
        <PhraseCard phrase={currentPhrase} />
        <Text style={[styles.phrasesCounter, { color: theme.textSecondary }]}>
          Quedan {unusedPhrases.length} frases
        </Text>
      </Animated.View>

      {/* Lista de jugadores */}
      <View style={styles.playersSection}>
        <Text style={[styles.playersTitle, { color: theme.text }]}>
          Jugadores ({players.length})
        </Text>
        <FlatList
          data={players}
          renderItem={renderPlayerItem}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.playersList}
        />
      </View>

      {/* Botones de acción */}
      <View style={styles.actionsContainer}>
        <View style={styles.buttonRow}>
          <View style={styles.smallButton}>
            <CustomButton
              title="↻ Reiniciar"
              onPress={handleResetGame}
              variant="secondary"
            />
          </View>
          <View style={styles.largeButton}>
            <CustomButton
              title="Siguiente Frase"
              onPress={handleNextPhrase}
              variant="primary"
            />
          </View>
        </View>
        <CustomButton
          title="Finalizar Partida"
          onPress={handleFinishGame}
          variant="danger"
        />
      </View>

      {/* Modal de estadísticas */}
      <StatsModal
        visible={showStatsModal}
        onClose={() => setShowStatsModal(false)}
        players={players}
        phrasesPlayed={phrasesPlayed}
        totalPhrases={totalPhrases}
        unusedPhrases={unusedPhrases.length}
      />

      {/* Modal de estadísticas finales */}
      <FinalStatsModal
        visible={showFinalStatsModal}
        onPlayAgain={handlePlayAgain}
        onExit={handleExit}
        players={players}
        phrasesPlayed={phrasesPlayed}
        duration={(Date.now() - gameStartTime) / 1000 / 60}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButton: {
    marginRight: 16,
    padding: 8,
  },
  headerButtonText: {
    fontSize: 24,
  },
  funnyMessageContainer: {
    position: 'absolute',
    top: 20,
    left: 16,
    right: 16,
    zIndex: 1000,
    padding: 16,
    borderRadius: 12,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  funnyMessageText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#000',
  },
  phraseContainer: {
    padding: 16,
    alignItems: 'center',
  },
  phrasesCounter: {
    fontSize: 14,
    marginTop: 12,
    textAlign: 'center',
  },
  playersSection: {
    flex: 1,
    paddingHorizontal: 16,
  },
  playersTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  playersList: {
    paddingBottom: 8,
  },
  actionsContainer: {
    padding: 16,
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  smallButton: {
    flex: 1,
  },
  largeButton: {
    flex: 2,
  },
});
