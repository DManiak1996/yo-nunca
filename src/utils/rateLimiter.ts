/**
 * Utilidad para Rate Limiting y prevención de spam
 * V3.0 - Protección contra acciones rápidas repetidas
 */

/**
 * Almacena timestamps de última acción por clave
 */
const lastActionTimestamps: Map<string, number> = new Map();

/**
 * Throttle: Previene múltiples ejecuciones en un intervalo de tiempo
 * @param key Identificador único de la acción
 * @param minInterval Intervalo mínimo en ms entre ejecuciones (por defecto 500ms)
 * @returns true si la acción está permitida, false si debe bloquearse
 */
export function canPerformAction(key: string, minInterval: number = 500): boolean {
  const now = Date.now();
  const lastAction = lastActionTimestamps.get(key);

  if (!lastAction || now - lastAction >= minInterval) {
    lastActionTimestamps.set(key, now);
    return true;
  }

  return false;
}

/**
 * Resetea el timestamp de una acción específica
 * @param key Identificador único de la acción
 */
export function resetAction(key: string): void {
  lastActionTimestamps.delete(key);
}

/**
 * Resetea todos los timestamps
 */
export function resetAllActions(): void {
  lastActionTimestamps.clear();
}

/**
 * Hook personalizado para rate limiting en componentes
 * @param actionKey Identificador de la acción
 * @param minInterval Intervalo mínimo en ms
 * @returns Función que devuelve true/false según rate limit
 */
export function useRateLimiter(actionKey: string, minInterval: number = 500) {
  return () => canPerformAction(actionKey, minInterval);
}
