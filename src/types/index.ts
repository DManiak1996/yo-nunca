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
 * Modos de juego - V3.0
 */
export type GameMode = 'normal' | 'detectives';

/**
 * Jugador en una partida multijugador
 */
export interface Player {
  id: string;
  name: string;
  drinks: number;
  drinksLockedAt?: number; // Tragos bloqueados de frases anteriores
  avatar?: string; // emoji o icono
  currentStreak: number; // V3.0 - Racha actual de tragos consecutivos
  maxStreak: number; // V3.0 - Mejor racha de la partida
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
  bestStreak?: number; // V3.0 - Mejor racha histórica de todos los tiempos
}

/**
 * Voto de un jugador en modo Detectives - V3.0
 * Cada jugador vota sobre lo que CREE que han hecho los DEMÁS
 */
export interface DetectivesVote {
  voterId: string; // Quién está votando
  targetId: string; // Sobre quién está votando
  prediction: boolean | null; // true = "Creo que SÍ lo ha hecho", false = "Creo que NO", null = no ha votado
}

/**
 * Verdad revelada de cada jugador (si realmente lo hizo o no)
 */
export interface DetectivesTruth {
  playerId: string;
  didIt: boolean | null; // true = SÍ lo hizo, false = NO, null = no ha respondido
}

/**
 * Resultado de la ronda de detectives
 */
export interface DetectivesRoundResult {
  playerId: string;
  failedPredictions: number; // Cuántos fallos tuvo
  drinks: number; // Tragos que debe beber (= failedPredictions)
}

export type RootStackParamList = {
  AgeGate: undefined;
  Home: undefined;
  CategorySelection: undefined;
  PlayerSetup: { difficulty: DifficultyLevel; gameMode?: GameMode };
  GameMultiplayer: { players: Player[]; difficulty: DifficultyLevel };
  GameDetectives: { players: Player[]; difficulty: DifficultyLevel }; // V3.0 - Modo Detectives
  LocalHost: { hostName: string }; // V3.0 - FASE D - Crear sala local
  LocalJoin: { playerName: string }; // V3.0 - FASE D - Unirse a sala local
  Game: undefined; // mantener por compatibilidad con v1.0
  CustomPhrases: undefined;
  Settings: undefined;
  GlobalStats: undefined;
};
