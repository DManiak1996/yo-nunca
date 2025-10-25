/**
 * Hook para gestionar la sesión de juego multijugador
 * Maneja frases, jugadores, estado de la partida y guardado automático
 */

import { useState, useEffect, useCallback } from 'react';
import { Player, DifficultyLevel, GameSession } from '../types';
import { shuffle } from '../utils/shuffle';
import { medioLevelPhrases } from '../data/phrases/medioLevel';
import { picanteLevelPhrases } from '../data/phrases/picanteLevel';
import { muyPicanteLevelPhrases } from '../data/phrases/muyPicanteLevel';
import { getCustomPhrases } from '../utils/storage';

interface UseGameSessionProps {
  initialPlayers: Player[];
  difficulty: DifficultyLevel;
  includeCustomPhrases?: boolean;
}

interface UseGameSessionReturn {
  players: Player[];
  currentPhrase: string;
  phrasesPlayed: number;
  totalPhrases: number;
  unusedPhrases: string[];
  sessionId: string;
  createdAt: number;
  incrementPlayerDrinks: (playerId: string) => void;
  decrementPlayerDrinks: (playerId: string) => void;
  lockPlayerDrinks: () => void;
  nextPhrase: () => void;
  resetGame: () => void;
  getPlayersSortedByDrinks: () => Player[];
  getSessionData: () => GameSession;
}

export function useGameSession({
  initialPlayers,
  difficulty,
  includeCustomPhrases = false,
}: UseGameSessionProps): UseGameSessionReturn {
  const [sessionId] = useState(
    () => `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  );
  const [createdAt] = useState(() => Date.now());
  const [players, setPlayers] = useState<Player[]>(initialPlayers);
  const [allPhrases, setAllPhrases] = useState<string[]>([]);
  const [unusedPhrases, setUnusedPhrases] = useState<string[]>([]);
  const [currentPhrase, setCurrentPhrase] = useState<string>('');
  const [phrasesPlayed, setPhrasesPlayed] = useState(0);

  /**
   * Carga las frases según la dificultad seleccionada
   */
  const loadPhrases = useCallback(async () => {
    let basePhrases: string[] = [];

    // Seleccionar frases según dificultad
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

    // Añadir frases personalizadas si está habilitado
    if (includeCustomPhrases) {
      try {
        const customPhrases = await getCustomPhrases();
        basePhrases = [...basePhrases, ...customPhrases];
      } catch (error) {
        console.error('Error al cargar frases personalizadas:', error);
      }
    }

    // Barajar frases
    const shuffledPhrases = shuffle([...basePhrases]);

    setAllPhrases(basePhrases);
    setUnusedPhrases(shuffledPhrases);
    setCurrentPhrase(shuffledPhrases[0] || '');
  }, [difficulty, includeCustomPhrases]);

  /**
   * Inicializa el juego cargando frases
   */
  useEffect(() => {
    loadPhrases();
  }, [loadPhrases]);

  /**
   * Incrementa el contador de tragos de un jugador y actualiza rachas
   */
  const incrementPlayerDrinks = useCallback((playerId: string) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) => {
        if (player.id === playerId) {
          const newDrinks = player.drinks + 1;
          const newStreak = (player.currentStreak || 0) + 1;
          const newMaxStreak = Math.max(newStreak, player.maxStreak || 0);

          return {
            ...player,
            drinks: newDrinks,
            currentStreak: newStreak,
            maxStreak: newMaxStreak,
          };
        }
        return player;
      })
    );
  }, []);

  /**
   * Decrementa el contador de tragos de un jugador (solo si tiene tragos desbloqueados)
   */
  const decrementPlayerDrinks = useCallback((playerId: string) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) => {
        if (player.id === playerId) {
          const lockedDrinks = player.drinksLockedAt || 0;
          // Solo decrementar si hay tragos desbloqueados
          if (player.drinks > lockedDrinks) {
            return { ...player, drinks: player.drinks - 1 };
          }
        }
        return player;
      })
    );
  }, []);

  /**
   * Bloquea los tragos actuales de todos los jugadores (llamar al cambiar de frase)
   */
  const lockPlayerDrinks = useCallback(() => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) => ({
        ...player,
        drinksLockedAt: player.drinks,
        currentStreak: 0, // Resetear rachas al cambiar de frase
      }))
    );
  }, []);

  /**
   * Avanza a la siguiente frase
   */
  const nextPhrase = useCallback(() => {
    if (unusedPhrases.length <= 1) {
      // Última frase o se acabaron - resetear pool
      const shuffledPhrases = shuffle([...allPhrases]);
      setUnusedPhrases(shuffledPhrases);
      setCurrentPhrase(shuffledPhrases[0] || '');
      setPhrasesPlayed((prev) => prev + 1);
    } else {
      // Hay más frases
      const remaining = unusedPhrases.slice(1);
      setUnusedPhrases(remaining);
      setCurrentPhrase(remaining[0]);
      setPhrasesPlayed((prev) => prev + 1);
    }
  }, [unusedPhrases, allPhrases]);

  /**
   * Resetea el juego completo
   */
  const resetGame = useCallback(() => {
    // Resetear contadores de tragos
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) => ({ ...player, drinks: 0 }))
    );

    // Resetear frases
    const shuffledPhrases = shuffle([...allPhrases]);
    setUnusedPhrases(shuffledPhrases);
    setCurrentPhrase(shuffledPhrases[0] || '');
    setPhrasesPlayed(0);
  }, [allPhrases]);

  /**
   * Obtiene los jugadores ordenados por número de tragos (descendente)
   */
  const getPlayersSortedByDrinks = useCallback(() => {
    return [...players].sort((a, b) => b.drinks - a.drinks);
  }, [players]);

  /**
   * Obtiene los datos de la sesión actual para guardar
   */
  const getSessionData = useCallback((): GameSession => {
    return {
      id: sessionId,
      players,
      difficulty,
      phrasesPlayed,
      currentPhraseIndex: allPhrases.length - unusedPhrases.length,
      createdAt,
      lastPlayedAt: Date.now(),
      gameEnded: false, // Por defecto no está finalizada
    };
  }, [
    sessionId,
    players,
    difficulty,
    phrasesPlayed,
    allPhrases.length,
    unusedPhrases.length,
    createdAt,
  ]);

  return {
    players,
    currentPhrase,
    phrasesPlayed,
    totalPhrases: allPhrases.length,
    unusedPhrases,
    sessionId,
    createdAt,
    incrementPlayerDrinks,
    decrementPlayerDrinks,
    lockPlayerDrinks,
    nextPhrase,
    resetGame,
    getPlayersSortedByDrinks,
    getSessionData,
  };
}
