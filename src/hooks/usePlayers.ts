/**
 * Hook para gestión de jugadores en modo multijugador
 */

import { useState, useCallback } from 'react';
import { Player } from '../types';
import { generatePlayerList, generateSinglePlayer, getRandomAvatar, renamePlayer as renamePlayerUtil } from '../utils/funnyNames';

export function usePlayers(initialCount: number = 4) {
  const [players, setPlayers] = useState<Player[]>(() => generatePlayerList(initialCount));

  /**
   * Añade un nuevo jugador con nombre autogenerado o personalizado
   * @param name Nombre opcional (si no se proporciona, se genera automáticamente)
   */
  const addPlayer = useCallback((name?: string) => {
    setPlayers((currentPlayers) => {
      if (currentPlayers.length >= 20) {
        throw new Error('Máximo 20 jugadores permitidos');
      }

      let newPlayer: Player;

      if (name && name.trim()) {
        // Nombre personalizado
        const trimmedName = name.trim();
        // Verificar que no exista
        const nameExists = currentPlayers.some(
          (p) => p.name.toLowerCase() === trimmedName.toLowerCase()
        );
        if (nameExists) {
          throw new Error('Ya existe un jugador con ese nombre');
        }

        newPlayer = {
          id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: trimmedName,
          drinks: 0,
          avatar: getRandomAvatar(),
          currentStreak: 0, // V3.0 - Inicializar racha
          maxStreak: 0, // V3.0 - Inicializar mejor racha
        };
      } else {
        // Nombre autogenerado usando la nueva función
        const existingNames = currentPlayers.map(p => p.name);
        newPlayer = generateSinglePlayer(existingNames);
      }

      return [...currentPlayers, newPlayer];
    });
  }, []);

  /**
   * Elimina un jugador por su ID
   * @param id ID del jugador a eliminar
   */
  const removePlayer = useCallback((id: string) => {
    setPlayers((currentPlayers) => {
      if (currentPlayers.length <= 2) {
        throw new Error('Mínimo 2 jugadores requeridos');
      }
      return currentPlayers.filter((player) => player.id !== id);
    });
  }, []);

  /**
   * Incrementa el contador de tragos de un jugador
   * @param playerId ID del jugador
   * @param amount Cantidad a incrementar (default: 1)
   */
  const incrementDrinks = useCallback((playerId: string, amount: number = 1) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === playerId
          ? { ...player, drinks: player.drinks + amount }
          : player
      )
    );
  }, []);

  /**
   * Decrementa el contador de tragos de un jugador (mínimo 0)
   * @param playerId ID del jugador
   * @param amount Cantidad a decrementar (default: 1)
   */
  const decrementDrinks = useCallback((playerId: string, amount: number = 1) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === playerId
          ? { ...player, drinks: Math.max(0, player.drinks - amount) }
          : player
      )
    );
  }, []);

  /**
   * Resetea el contador de tragos de todos los jugadores a 0
   */
  const resetAllDrinks = useCallback(() => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) => ({ ...player, drinks: 0 }))
    );
  }, []);

  /**
   * Cambia el nombre de un jugador
   * @param playerId ID del jugador
   * @param newName Nuevo nombre
   */
  const renamePlayer = useCallback((playerId: string, newName: string) => {
    setPlayers((currentPlayers) => {
      try {
        return renamePlayerUtil(currentPlayers, playerId, newName);
      } catch (error) {
        throw error;
      }
    });
  }, []);

  /**
   * Genera una nueva lista de jugadores con nombres autogenerados
   * @param count Número de jugadores (2-20)
   */
  const regeneratePlayers = useCallback((count: number) => {
    if (count < 2 || count > 20) {
      throw new Error('El número de jugadores debe estar entre 2 y 20');
    }
    setPlayers(generatePlayerList(count));
  }, []);

  /**
   * Establece una lista específica de jugadores
   * @param newPlayers Lista de jugadores
   */
  const setPlayerList = useCallback((newPlayers: Player[]) => {
    if (newPlayers.length < 2) {
      throw new Error('Mínimo 2 jugadores requeridos');
    }
    if (newPlayers.length > 20) {
      throw new Error('Máximo 20 jugadores permitidos');
    }
    setPlayers(newPlayers);
  }, []);

  /**
   * Cambia el avatar de un jugador
   * @param playerId ID del jugador
   * @param avatar Nuevo avatar (emoji)
   */
  const changeAvatar = useCallback((playerId: string, avatar: string) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((player) =>
        player.id === playerId ? { ...player, avatar } : player
      )
    );
  }, []);

  return {
    players,
    addPlayer,
    removePlayer,
    incrementDrinks,
    decrementDrinks,
    resetAllDrinks,
    renamePlayer,
    regeneratePlayers,
    setPlayerList,
    changeAvatar,
  };
}
