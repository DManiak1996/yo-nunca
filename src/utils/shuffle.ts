/**
 * Algoritmo Fisher-Yates para barajar arrays
 * Garantiza una distribución uniforme y aleatoria
 */

/**
 * Baraja un array aleatoriamente usando el algoritmo Fisher-Yates
 * @param array Array a barajar
 * @returns Nuevo array barajado (no modifica el original)
 */
export function shuffle<T>(array: T[]): T[] {
  // Crear copia para no modificar el array original
  const shuffled = [...array];

  // Fisher-Yates shuffle algorithm
  for (let i = shuffled.length - 1; i > 0; i--) {
    // Generar índice aleatorio entre 0 e i (inclusive)
    const j = Math.floor(Math.random() * (i + 1));

    // Intercambiar elementos en posiciones i y j
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
}
