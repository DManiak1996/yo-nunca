/**
 * Hook para guardado automático de la sesión de juego
 * Guarda cada 10 segundos en AsyncStorage
 */

import { useEffect, useRef } from 'react';
import { GameSession } from '../types';
import { saveGameSession } from '../utils/storage';

interface UseAutoSaveProps {
  gameSession: GameSession;
  enabled?: boolean;
  interval?: number; // en milisegundos
}

export function useAutoSave({
  gameSession,
  enabled = true,
  interval = 10000, // 10 segundos por defecto
}: UseAutoSaveProps) {
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!enabled) {
      // Limpiar intervalo si está deshabilitado
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    // Guardar inmediatamente al montar
    saveGameSession(gameSession).catch((error) => {
      console.error('Error al guardar sesión inicial:', error);
    });

    // Configurar guardado automático
    intervalRef.current = setInterval(() => {
      saveGameSession(gameSession).catch((error) => {
        console.error('Error al auto-guardar sesión:', error);
      });
    }, interval);

    // Limpiar al desmontar
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [gameSession, enabled, interval]);

  // No retorna nada, solo hace el guardado automático
}
