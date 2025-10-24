/**
 * Hook para cargar y gestionar estadísticas globales
 */

import { useState, useEffect, useCallback } from 'react';
import { GlobalStats } from '../types';
import { getGlobalStats, resetGlobalStats } from '../utils/storage';

export function useGlobalStats() {
  const [stats, setStats] = useState<GlobalStats | null>(null);
  const [loading, setLoading] = useState(true);

  /**
   * Carga las estadísticas desde storage
   */
  const loadStats = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getGlobalStats();
      setStats(data);
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  /**
   * Resetea todas las estadísticas
   */
  const handleResetStats = useCallback(async () => {
    try {
      await resetGlobalStats();
      await loadStats();
    } catch (error) {
      console.error('Error al resetear estadísticas:', error);
      throw error;
    }
  }, [loadStats]);

  /**
   * Obtiene la categoría favorita
   */
  const getFavoriteCategory = useCallback((): string => {
    if (!stats) return 'N/A';

    const { categoryCount } = stats;
    const categories = [
      { name: 'Cagón', count: categoryCount.cagon },
      { name: 'Medio', count: categoryCount.medio },
      { name: 'Picante', count: categoryCount.picante },
      { name: 'Muy Picante', count: categoryCount.muy_picante },
    ];

    const max = categories.reduce((prev, current) =>
      current.count > prev.count ? current : prev
    );

    return max.count > 0 ? max.name : 'N/A';
  }, [stats]);

  /**
   * Calcula el promedio de jugadores
   */
  const getAveragePlayers = useCallback((): number => {
    if (!stats || stats.gamesPlayed === 0) return 0;
    return Math.round(stats.totalPlayersSum / stats.gamesPlayed);
  }, [stats]);

  /**
   * Formatea duración total en horas y minutos
   */
  const getFormattedDuration = useCallback((): string => {
    if (!stats) return '0h 0m';

    const hours = Math.floor(stats.totalDurationMinutes / 60);
    const minutes = Math.round(stats.totalDurationMinutes % 60);

    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  }, [stats]);

  // Cargar al montar
  useEffect(() => {
    loadStats();
  }, [loadStats]);

  return {
    stats,
    loading,
    loadStats,
    handleResetStats,
    getFavoriteCategory,
    getAveragePlayers,
    getFormattedDuration,
  };
}
