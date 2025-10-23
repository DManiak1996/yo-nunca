/**
 * Hook para calcular estadísticas de la partida
 * Genera rankings y métricas en tiempo real
 */

import { useMemo } from 'react';
import { Player } from '../types';

interface StatsResult {
  ranking: Player[];
  mostDiablo: Player | null;
  mostBendito: Player | null;
  totalDrinks: number;
  averageDrinks: number;
}

export function useStats(players: Player[]): StatsResult {
  /**
   * Calcula el ranking de jugadores ordenados por tragos (descendente)
   */
  const ranking = useMemo(() => {
    return [...players].sort((a, b) => b.drinks - a.drinks);
  }, [players]);

  /**
   * Jugador con más tragos (el más diablo)
   */
  const mostDiablo = useMemo(() => {
    if (ranking.length === 0) return null;
    const topPlayer = ranking[0];
    return topPlayer.drinks > 0 ? topPlayer : null;
  }, [ranking]);

  /**
   * Jugador con menos tragos (el más bendito)
   */
  const mostBendito = useMemo(() => {
    if (ranking.length === 0) return null;
    const bottomPlayer = ranking[ranking.length - 1];
    // Solo contar si hay al menos un jugador con tragos
    const hasDrinks = ranking.some((p) => p.drinks > 0);
    return hasDrinks ? bottomPlayer : null;
  }, [ranking]);

  /**
   * Total de tragos de todos los jugadores
   */
  const totalDrinks = useMemo(() => {
    return players.reduce((sum, player) => sum + player.drinks, 0);
  }, [players]);

  /**
   * Promedio de tragos por jugador
   */
  const averageDrinks = useMemo(() => {
    if (players.length === 0) return 0;
    return totalDrinks / players.length;
  }, [totalDrinks, players.length]);

  return {
    ranking,
    mostDiablo,
    mostBendito,
    totalDrinks,
    averageDrinks,
  };
}
