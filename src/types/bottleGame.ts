/**
 * 🍾 TIPOS TYPESCRIPT PARA "LA BOTELLA"
 *
 * Juego de la botella con sistema de escalado
 * - 5 niveles de besos
 * - 5 niveles de pruebas
 * - Tracking de parejas
 */

import { Player } from './index';

// ============================================
// TIPOS DE ACCIÓN
// ============================================

/**
 * Tipo de acción que puede elegir la pareja
 */
export type BottleActionType = 'kiss' | 'dare';

/**
 * Niveles de intensidad (1-5)
 */
export type IntensityLevel = 1 | 2 | 3 | 4 | 5;

// ============================================
// BESOS
// ============================================

/**
 * Nombres de los niveles de besos
 */
export interface KissLevel {
  level: IntensityLevel;
  name: string;
  emoji: string;
  description: string;
}

/**
 * Niveles de besos predefinidos
 */
export const KISS_LEVELS: KissLevel[] = [
  {
    level: 1,
    name: 'Beso en la mejilla',
    emoji: '😊',
    description: 'Suave y amigable',
  },
  {
    level: 2,
    name: 'Beso en la comisura',
    emoji: '😘',
    description: 'Un poco más atrevido',
  },
  {
    level: 3,
    name: 'Pico',
    emoji: '💋',
    description: 'Beso rápido en los labios',
  },
  {
    level: 4,
    name: 'Morreo',
    emoji: '🔥',
    description: 'Beso más largo',
  },
  {
    level: 5,
    name: 'Lío',
    emoji: '🌶️',
    description: 'Beso intenso y prolongado',
  },
];

// ============================================
// PRUEBAS/RETOS
// ============================================

/**
 * Tipo de prueba
 */
export type DareType = 'physical' | 'verbal' | 'intimate';

/**
 * Interfaz de una prueba
 */
export interface BottleDare {
  id: string;
  level: IntensityLevel;
  description: string;
  type: DareType;
}

// ============================================
// TRACKING DE PAREJAS
// ============================================

/**
 * Datos de una pareja (jugador + objetivo)
 */
export interface PairData {
  player1Id: string;
  player2Id: string;
  level: IntensityLevel; // Nivel actual (1-5)
  timesMatched: number; // Cuántas veces han salido juntos
  lastAction: BottleActionType | null; // Última acción elegida
}

/**
 * Genera una key única para una pareja (orden alfabético)
 */
export function getPairKey(player1Id: string, player2Id: string): string {
  return [player1Id, player2Id].sort().join('_');
}

// ============================================
// ESTADO DEL JUEGO
// ============================================

/**
 * Estado principal del juego de la botella
 */
export interface BottleGameState {
  players: Player[];
  currentSpinnerIndex: number; // Índice del jugador que gira
  targetPlayerIndex: number | null; // Índice del jugador objetivo
  isSpinning: boolean; // Si la botella está girando
  pairHistory: Map<string, PairData>; // Historial de parejas (key: getPairKey())
  spinCount: number; // Contador de giros totales
}

/**
 * Resultado de un giro de botella
 */
export interface SpinResult {
  spinner: Player;
  target: Player;
  pairKey: string;
  currentLevel: IntensityLevel;
  timesMatched: number;
  isFirstTime: boolean;
}

// ============================================
// CONFIGURACIÓN DEL JUEGO
// ============================================

/**
 * Configuración inicial del juego
 */
export interface BottleGameConfig {
  players: Player[];
  allowSamePerson: boolean; // Si la botella puede apuntar al mismo que gira (default: false)
}
