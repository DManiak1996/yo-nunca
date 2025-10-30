/**
 * 🃏 TIPOS TYPESCRIPT PARA "EL REY DE COPAS"
 *
 * Juego de cartas basado en baraja española (50 cartas)
 * - 48 cartas estándar (12 cartas × 4 palos)
 * - 2 Jokers/Comodines
 */

import { Player } from './index';

// ============================================
// TIPOS DE CARTAS
// ============================================

/**
 * Valores posibles de las cartas
 * 1-9: Cartas numéricas
 * sota, caballo, rey: Figuras
 * joker: Comodín especial
 */
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'sota' | 'caballo' | 'rey' | 'joker';

/**
 * Palos de la baraja española
 * Solo efecto estético (no modifica mecánicas)
 */
export type CardSuit = 'oros' | 'copas' | 'espadas' | 'bastos' | 'joker';

/**
 * Efectos únicos de cada carta
 */
export type CardEffect =
  | 'distribute_drinks'   // Cartas 1-5: Repartir N tragos
  | 'yo_nunca'            // Carta 6: Mostrar frase "Yo Nunca"
  | 'truth_or_dare'       // Carta 7: Verdad o Reto
  | 'you_drink'           // Carta 8: Tú bebes
  | 'everyone_drinks'     // Carta 9: Todos beben (PROGRESIVO)
  | 'categories'          // Sota: Juego de categorías
  | 'no_eye_contact'      // Caballo: No mirar a los ojos
  | 'waterfall'           // Rey: Cascada
  | 'joker_rule';         // Joker: Regla especial del Payaso

/**
 * Interfaz de una carta individual
 */
export interface Card {
  id: string;           // Identificador único (ej: "1_oros", "joker_1")
  value: CardValue;     // Valor de la carta
  suit: CardSuit;       // Palo de la carta
  effect: CardEffect;   // Efecto asociado a la carta
}

// ============================================
// REGLAS DEL JOKER
// ============================================

/**
 * Categorías de reglas del Joker
 */
export type JokerRuleCategory = 'verbal' | 'gesture' | 'interaction' | 'absurd';

/**
 * Interfaz de una regla del Joker
 * Las reglas se ACUMULAN (máximo 2 simultáneas)
 */
export interface JokerRule {
  id: string;                     // ID único
  description: string;            // Descripción completa de la regla
  penalty: string;                // Penalización si se incumple
  category: JokerRuleCategory;    // Categoría de la regla
}

// ============================================
// CATEGORÍAS (CARTA SOTA)
// ============================================

/**
 * Interfaz de una categoría para el juego de la Sota
 * Ej: "Países de Europa", "Marcas de coches"
 */
export interface Category {
  id: string;           // ID único
  name: string;         // Nombre de la categoría
  examples: string[];   // Ejemplos válidos (opcional, para validación)
}

// ============================================
// VERDADES Y RETOS (CARTA 7)
// ============================================

/**
 * Tipos de desafíos
 */
export type ChallengeType = 'truth' | 'dare';

/**
 * Interfaz para verdades y retos
 */
export interface Challenge {
  id: string;
  type: ChallengeType;
  text: string;         // Pregunta (verdad) o reto (desafío)
}

// ============================================
// ESTADO DEL JUEGO
// ============================================

/**
 * Interfaz principal del estado del juego de cartas
 */
export interface CardGameState {
  // Mazo y cartas
  deck: Card[];                 // Cartas restantes en el mazo
  usedCards: Card[];            // Cartas ya jugadas
  currentCard: Card | null;     // Carta actual en pantalla

  // Reglas activas
  activeRules: JokerRule[];     // Reglas del Joker activas (máx 2)

  // Contadores especiales
  everyoneDrinksCount: number;  // Contador para carta 9 progresivo (0-3)

  // Estado especial de cartas
  noEyeContactPlayers: string[]; // IDs de jugadores con "No mirar a los ojos" activo

  // Jugadores
  players: Player[];            // Reutilizar del tipo existente
}

// ============================================
// HISTORIAL DE PAREJAS (Para "No mirar a los ojos")
// ============================================

/**
 * Registro de quién tiene activo "No mirar a los ojos"
 * Se resetea cada vez que sale un nuevo Caballo
 */
export interface NoEyeContactState {
  active: boolean;          // Si hay algún jugador con restricción activa
  playerId: string | null;  // ID del jugador con restricción (null si no hay)
}

// ============================================
// UTILIDADES
// ============================================

/**
 * Resultado de repartir tragos (cartas 1-5)
 */
export interface DrinkDistribution {
  playerId: string;
  drinksAssigned: number;
}

/**
 * Resultado de votación en categorías
 */
export interface CategoryResult {
  playerId: string;
  failed: boolean;  // True si falló/repitió
}

/**
 * Configuración inicial del juego de cartas
 */
export interface CardGameConfig {
  players: Player[];
  includeJokers: boolean;  // Por defecto true
  shuffleOnStart: boolean; // Por defecto true
}
