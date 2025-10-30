/**
 * 🍾 HOOK: useBottleGame
 *
 * Maneja toda la lógica del juego "La Botella"
 * - Animación y giro de la botella
 * - Sistema de escalado de niveles por pareja
 * - Tracking de parejas
 */

import { useState, useCallback } from 'react';
import {
  BottleGameState,
  BottleGameConfig,
  PairData,
  SpinResult,
  IntensityLevel,
  getPairKey,
} from '../types/bottleGame';
import { Player } from '../types';

export function useBottleGame(config: BottleGameConfig) {
  const [state, setState] = useState<BottleGameState>(() => ({
    players: config.players,
    currentSpinnerIndex: 0,
    targetPlayerIndex: null,
    isSpinning: false,
    pairHistory: new Map(),
    spinCount: 0,
  }));

  /**
   * Gira la botella y selecciona un jugador aleatorio
   */
  const spinBottle = useCallback((): Promise<SpinResult> => {
    return new Promise((resolve) => {
      setState((prevState) => ({ ...prevState, isSpinning: true }));

      // Simular duración de la animación (2-3 segundos)
      setTimeout(() => {
        setState((prevState) => {
          const spinner = prevState.players[prevState.currentSpinnerIndex];

          // Elegir objetivo aleatorio (excluyendo al que gira si allowSamePerson es false)
          let availableIndices = prevState.players
            .map((_, index) => index)
            .filter((index) => config.allowSamePerson || index !== prevState.currentSpinnerIndex);

          const randomIndex = Math.floor(Math.random() * availableIndices.length);
          const targetIndex = availableIndices[randomIndex];
          const target = prevState.players[targetIndex];

          // Obtener o crear datos de la pareja
          const pairKey = getPairKey(spinner.id, target.id);
          const existingPair = prevState.pairHistory.get(pairKey);

          let pairData: PairData;
          if (existingPair) {
            // Incrementar nivel si ya existe la pareja
            pairData = {
              ...existingPair,
              level: Math.min(existingPair.level + 1, 5) as IntensityLevel,
              timesMatched: existingPair.timesMatched + 1,
            };
          } else {
            // Crear nueva pareja con nivel 1
            pairData = {
              player1Id: spinner.id,
              player2Id: target.id,
              level: 1,
              timesMatched: 1,
              lastAction: null,
            };
          }

          // Actualizar historial
          const newHistory = new Map(prevState.pairHistory);
          newHistory.set(pairKey, pairData);

          // Avanzar al siguiente jugador que girará
          const nextSpinnerIndex = (prevState.currentSpinnerIndex + 1) % prevState.players.length;

          const result: SpinResult = {
            spinner,
            target,
            pairKey,
            currentLevel: pairData.level,
            timesMatched: pairData.timesMatched,
            isFirstTime: pairData.timesMatched === 1,
          };

          // Resolver la promesa con el resultado
          resolve(result);

          return {
            ...prevState,
            targetPlayerIndex: targetIndex,
            isSpinning: false,
            pairHistory: newHistory,
            spinCount: prevState.spinCount + 1,
            currentSpinnerIndex: nextSpinnerIndex,
          };
        });
      }, 2500); // 2.5 segundos de animación
    });
  }, [config.allowSamePerson]);

  /**
   * Obtiene los datos de una pareja específica
   */
  const getPairData = useCallback(
    (player1Id: string, player2Id: string): PairData | null => {
      const pairKey = getPairKey(player1Id, player2Id);
      return state.pairHistory.get(pairKey) || null;
    },
    [state.pairHistory]
  );

  /**
   * Obtiene el nivel actual de una pareja
   */
  const getCurrentLevel = useCallback(
    (player1Id: string, player2Id: string): IntensityLevel => {
      const pairData = getPairData(player1Id, player2Id);
      return pairData?.level || 1;
    },
    [getPairData]
  );

  /**
   * Actualiza la última acción de una pareja
   */
  const updateLastAction = useCallback(
    (player1Id: string, player2Id: string, action: 'kiss' | 'dare') => {
      setState((prevState) => {
        const pairKey = getPairKey(player1Id, player2Id);
        const pairData = prevState.pairHistory.get(pairKey);

        if (!pairData) return prevState;

        const updatedPair: PairData = {
          ...pairData,
          lastAction: action,
        };

        const newHistory = new Map(prevState.pairHistory);
        newHistory.set(pairKey, updatedPair);

        return {
          ...prevState,
          pairHistory: newHistory,
        };
      });
    },
    []
  );

  /**
   * Reinicia el juego
   */
  const resetGame = useCallback(() => {
    setState({
      players: config.players,
      currentSpinnerIndex: 0,
      targetPlayerIndex: null,
      isSpinning: false,
      pairHistory: new Map(),
      spinCount: 0,
    });
  }, [config.players]);

  /**
   * Obtiene estadísticas del juego
   */
  const getGameStats = useCallback(() => {
    const totalPairs = state.pairHistory.size;
    const totalSpins = state.spinCount;

    // Pareja con más encuentros
    let mostMatchedPair: PairData | null = null;
    let maxMatches = 0;

    state.pairHistory.forEach((pair) => {
      if (pair.timesMatched > maxMatches) {
        maxMatches = pair.timesMatched;
        mostMatchedPair = pair;
      }
    });

    return {
      totalPairs,
      totalSpins,
      mostMatchedPair,
      maxMatches,
    };
  }, [state.pairHistory, state.spinCount]);

  /**
   * Obtiene el jugador actual que debe girar
   */
  const getCurrentSpinner = useCallback(() => {
    return state.players[state.currentSpinnerIndex];
  }, [state.players, state.currentSpinnerIndex]);

  /**
   * Obtiene el jugador objetivo actual
   */
  const getTargetPlayer = useCallback(() => {
    if (state.targetPlayerIndex === null) return null;
    return state.players[state.targetPlayerIndex];
  }, [state.players, state.targetPlayerIndex]);

  return {
    // Estado
    state,
    isSpinning: state.isSpinning,
    spinCount: state.spinCount,

    // Acciones
    spinBottle,
    resetGame,
    updateLastAction,

    // Consultas
    getPairData,
    getCurrentLevel,
    getGameStats,
    getCurrentSpinner,
    getTargetPlayer,
  };
}
