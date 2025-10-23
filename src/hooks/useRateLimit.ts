/**
 * Hook para rate limiting (anti-spam)
 * Previene que una acción se ejecute demasiado rápido
 */

import { useRef, useCallback } from 'react';

interface RateLimitOptions {
  maxCalls: number; // Número máximo de llamadas
  windowMs: number; // Ventana de tiempo en milisegundos
}

/**
 * Hook que implementa rate limiting para prevenir spam
 * @param options Configuración del rate limiter
 * @returns Función que checkea si la acción está permitida
 */
export function useRateLimit(options: RateLimitOptions) {
  const { maxCalls, windowMs } = options;
  const callTimestamps = useRef<number[]>([]);

  /**
   * Checkea si la acción está permitida según el rate limit
   * @returns true si está permitido, false si está bloqueado (spam)
   */
  const checkRateLimit = useCallback((): boolean => {
    const now = Date.now();
    const timestamps = callTimestamps.current;

    // Limpiar timestamps antiguos fuera de la ventana
    callTimestamps.current = timestamps.filter((t) => now - t < windowMs);

    // Verificar si excede el límite
    if (callTimestamps.current.length >= maxCalls) {
      return false; // Bloqueado por spam
    }

    // Registrar nueva llamada
    callTimestamps.current.push(now);
    return true; // Permitido
  }, [maxCalls, windowMs]);

  /**
   * Resetea el rate limiter (útil para tests o casos especiales)
   */
  const reset = useCallback(() => {
    callTimestamps.current = [];
  }, []);

  return { checkRateLimit, reset };
}
