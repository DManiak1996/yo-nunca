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
  Easing,
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
import ConfirmEndGameModal from '../components/ConfirmEndGameModal';
import { getRandomFunnyMessage, shouldShowFunnyMessage } from '../data/funnyMessages';
import { clearGameSession, updateGlobalStats } from '../utils/storage';

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
    decrementPlayerDrinks,
    lockPlayerDrinks,
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
  const [slideAnim] = useState(new Animated.Value(0));
  const [messageOpacity] = useState(new Animated.Value(0));
  const [showStatsModal, setShowStatsModal] = useState(false);
  const [showFinalStatsModal, setShowFinalStatsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [gameStartTime] = useState(() => Date.now());

  // Guardado automático cada 10 segundos
  useAutoSave({
    gameSession: getSessionData(),
    enabled: !showFinalStatsModal, // No guardar si ya terminó
  });


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
    // Bloquear tragos actuales antes de cambiar de frase
    lockPlayerDrinks();

    // Animación: card actual sale hacia la izquierda
    Animated.timing(slideAnim, {
      toValue: -400,
      duration: 300,
      easing: Easing.in(Easing.cubic),
      useNativeDriver: true,
    }).start(() => {
      // Cambiar la frase
      nextPhrase();

      // Resetear posición a la derecha
      slideAnim.setValue(400);

      // Nueva card entra desde la derecha con deceleration
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    });
  };

  /**
   * Maneja la finalización de la partida
   */
  const handleFinishGame = () => {
    setShowConfirmModal(true);
  };

  /**
   * Confirma la finalización del juego
   */
  const confirmFinishGame = () => {
    setShowConfirmModal(false);
    setShowFinalStatsModal(true);
  };

  /**
   * Maneja el botón "Jugar de nuevo"
   */
  const handlePlayAgain = async () => {
    try {
      // Trackear estadísticas
      const durationMinutes = (Date.now() - gameStartTime) / 1000 / 60;
      await updateGlobalStats(difficulty, players, durationMinutes);

      // Limpiar sesión
      await clearGameSession();
    } catch (error) {
      console.error('Error al guardar estadísticas o limpiar sesión:', error);
    }
    setShowFinalStatsModal(false);
    // Usar reset para limpiar el stack de navegación
    navigation.reset({
      index: 0,
      routes: [{ name: 'Home' }],
    });
    // Navegar a CategorySelection después del reset
    setTimeout(() => {
      navigation.navigate('CategorySelection');
    }, 100);
  };

  /**
   * Maneja el botón "Salir"
   */
  const handleExit = async () => {
    try {
      // Trackear estadísticas
      const durationMinutes = (Date.now() - gameStartTime) / 1000 / 60;
      await updateGlobalStats(difficulty, players, durationMinutes);

      // Limpiar la sesión al salir
      await clearGameSession();
    } catch (error) {
      console.error('Error al guardar estadísticas o limpiar sesión:', error);
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
      onDecrementDrinks={decrementPlayerDrinks}
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

      {/* Tarjeta de frase con animación swipe */}
      <Animated.View
        style={[
          styles.phraseContainer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        <PhraseCard phrase={currentPhrase} />
        <Text style={[styles.phrasesCounter, { color: theme.textSecondary }]}>
          Quedan {unusedPhrases.length} frases
        </Text>
      </Animated.View>

      {/* Lista de jugadores */}
      <View style={styles.playersSection}>
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
        <View style={styles.topButtonRow}>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.cardBackground }]}
            onPress={handleResetGame}
          >
            <Text style={[styles.iconButtonText, { color: theme.text }]}>↻</Text>
          </TouchableOpacity>
          <View style={styles.mainButton}>
            <CustomButton
              title="Siguiente"
              onPress={handleNextPhrase}
              variant="primary"
            />
          </View>
          <TouchableOpacity
            style={[styles.iconButton, { backgroundColor: theme.cardBackground }]}
            onPress={handleShowStats}
          >
            <Text style={styles.iconButtonText}>🏆</Text>
          </TouchableOpacity>
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

      {/* Modal de confirmación */}
      <ConfirmEndGameModal
        visible={showConfirmModal}
        onConfirm={confirmFinishGame}
        onCancel={() => setShowConfirmModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
  },
  headerButton: {
    padding: 8,
    marginHorizontal: 4,
  },
  headerButtonText: {
    fontSize: 22,
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
  topButtonRow: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  iconButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  iconButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  mainButton: {
    flex: 1,
  },
});
