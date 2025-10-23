/**
 * TypeScript interfaces y tipos para la app Yo Nunca
 */

export interface Phrase {
  id: string;
  text: string;
  isCustom: boolean;
}

export interface Theme {
  background: string;
  cardBackground: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  danger: string;
  success: string;
  border: string;
}

/**
 * Niveles de dificultad del juego
 */
export type DifficultyLevel = 'cagon' | 'medio' | 'picante' | 'muy_picante';

/**
 * Jugador en una partida multijugador
 */
export interface Player {
  id: string;
  name: string;
  drinks: number;
  drinksLockedAt?: number; // Tragos bloqueados de frases anteriores
  avatar?: string; // emoji o icono
}

/**
 * Sesión de juego activa
 */
export interface GameSession {
  id: string;
  players: Player[];
  difficulty: DifficultyLevel;
  phrasesPlayed: number;
  currentPhraseIndex: number;
  createdAt: number;
  lastPlayedAt: number;
  gameEnded?: boolean; // Marca partidas finalizadas manualmente
}

/**
 * Estadísticas finales de una partida
 */
export interface GameStats {
  winner: Player;           // jugador con más tragos
  second: Player | null;    // segundo lugar
  third: Player | null;     // tercer lugar
  mostDiablo: Player;       // más tragos
  mostBendito: Player;      // menos tragos
  totalPhrases: number;
  duration: number;         // duración en minutos
}

/**
 * Contador de clicks en el botón "Cagón"
 */
export interface CagonCounter {
  count: number;
  lastUpdated: number;
}

export type RootStackParamList = {
  Home: undefined;
  CategorySelection: undefined;
  PlayerSetup: { difficulty: DifficultyLevel };
  GameMultiplayer: { players: Player[]; difficulty: DifficultyLevel };
  Game: undefined; // mantener por compatibilidad con v1.0
  CustomPhrases: undefined;
  Settings: undefined;
};
