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

/**
 * Estadísticas globales del usuario
 */
export interface GlobalStats {
  gamesPlayed: number;
  categoryCount: {
    cagon: number;
    medio: number;
    picante: number;
    muy_picante: number;
  };
  totalPlayersSum: number; // Para calcular promedio
  totalDurationMinutes: number;
  totalDrinks: number;
  lastPlayedDate: string; // ISO date
  currentStreak: number;
  maxDrinksRecord: {
    playerName: string;
    drinks: number;
    date: string;
  } | null;
}

export type RootStackParamList = {
  AgeGate: undefined;
  Home: undefined;
  CategorySelection: undefined;
  PlayerSetup: { difficulty: DifficultyLevel };
  GameMultiplayer: { players: Player[]; difficulty: DifficultyLevel };
  Game: undefined; // mantener por compatibilidad con v1.0
  CustomPhrases: undefined;
  Settings: undefined;
  GlobalStats: undefined;
};
