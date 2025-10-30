/**
 * 🃏 HOOK: useCardGame
 *
 * Maneja toda la lógica del juego "El Rey de Copas"
 * - Creación y gestión del mazo de 50 cartas
 * - Efectos de cartas
 * - Reglas del Joker (acumulables, máx 2)
 * - Contador progresivo de "Todos beben" (carta 9)
 * - Estado "No mirar a los ojos" (carta Caballo)
 */

import { useState, useCallback, useEffect } from 'react';
import {
  Card,
  CardValue,
  CardSuit,
  CardEffect,
  CardGameState,
  JokerRule,
  CardGameConfig,
} from '../types/cardGame';
import { Player } from '../types';

// ============================================
// CONSTANTES
// ============================================

const CARD_VALUES: CardValue[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 'sota', 'caballo', 'rey'];
const SUITS: CardSuit[] = ['oros', 'copas', 'espadas', 'bastos'];

/**
 * Mapeo de valores de carta a efectos
 */
const CARD_EFFECTS_MAP: Record<CardValue, CardEffect> = {
  1: 'distribute_drinks',
  2: 'distribute_drinks',
  3: 'distribute_drinks',
  4: 'distribute_drinks',
  5: 'distribute_drinks',
  6: 'yo_nunca',
  7: 'truth_or_dare',
  8: 'you_drink',
  9: 'everyone_drinks',
  sota: 'categories',
  caballo: 'no_eye_contact',
  rey: 'waterfall',
  joker: 'joker_rule',
};

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Genera el mazo completo de 50 cartas
 * - 48 cartas estándar (12 valores × 4 palos)
 * - 2 Jokers
 */
function createDeck(includeJokers: boolean = true): Card[] {
  const deck: Card[] = [];

  // Crear 48 cartas estándar
  SUITS.forEach((suit) => {
    CARD_VALUES.forEach((value) => {
      deck.push({
        id: `${value}_${suit}`,
        value,
        suit,
        effect: CARD_EFFECTS_MAP[value],
      });
    });
  });

  // Agregar 2 Jokers si está habilitado
  if (includeJokers) {
    deck.push({
      id: 'joker_1',
      value: 'joker',
      suit: 'joker',
      effect: 'joker_rule',
    });
    deck.push({
      id: 'joker_2',
      value: 'joker',
      suit: 'joker',
      effect: 'joker_rule',
    });
  }

  return deck;
}

/**
 * Baraja un array usando el algoritmo Fisher-Yates
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Obtiene el nombre visual de una carta
 */
export function getCardDisplayName(card: Card): string {
  const valueNames: Record<CardValue, string> = {
    1: 'As',
    2: '2',
    3: '3',
    4: '4',
    5: '5',
    6: '6',
    7: '7',
    8: '8',
    9: '9',
    sota: 'Sota',
    caballo: 'Caballo',
    rey: 'Rey',
    joker: 'Joker',
  };

  const suitNames: Record<CardSuit, string> = {
    oros: 'Oros',
    copas: 'Copas',
    espadas: 'Espadas',
    bastos: 'Bastos',
    joker: '',
  };

  if (card.value === 'joker') {
    return '🤡 Joker';
  }

  return `${valueNames[card.value]} de ${suitNames[card.suit]}`;
}

/**
 * Obtiene emoji del palo
 */
export function getSuitEmoji(suit: CardSuit): string {
  const emojis: Record<CardSuit, string> = {
    oros: '🟡',
    copas: '🍷',
    espadas: '⚔️',
    bastos: '🌿',
    joker: '🤡',
  };
  return emojis[suit];
}

// ============================================
// HOOK PRINCIPAL
// ============================================

export function useCardGame(config: CardGameConfig) {
  const [state, setState] = useState<CardGameState>(() => {
    const initialDeck = createDeck(config.includeJokers);
    return {
      deck: config.shuffleOnStart ? shuffleArray(initialDeck) : initialDeck,
      usedCards: [],
      currentCard: null,
      activeRules: [],
      everyoneDrinksCount: 0,
      noEyeContactPlayers: [],
      players: config.players,
    };
  });

  // ============================================
  // GESTIÓN DEL MAZO
  // ============================================

  /**
   * Roba una carta del mazo
   * Si el mazo está vacío, lo reinicia automáticamente
   */
  const drawCard = useCallback((): Card | null => {
    setState((prevState) => {
      // Si no quedan cartas, reiniciar el mazo
      if (prevState.deck.length === 0) {
        const newDeck = shuffleArray([...prevState.usedCards]);
        const [drawnCard, ...remainingDeck] = newDeck;

        return {
          ...prevState,
          deck: remainingDeck,
          usedCards: [drawnCard],
          currentCard: drawnCard,
          everyoneDrinksCount: 0, // Resetear contador al reiniciar mazo
        };
      }

      // Robar carta normalmente
      const [drawnCard, ...remainingDeck] = prevState.deck;

      return {
        ...prevState,
        deck: remainingDeck,
        usedCards: [...prevState.usedCards, drawnCard],
        currentCard: drawnCard,
      };
    });

    return state.currentCard;
  }, [state.currentCard]);

  /**
   * Reinicia el mazo completo (útil para empezar nueva partida)
   */
  const resetDeck = useCallback(() => {
    const newDeck = shuffleArray(createDeck(config.includeJokers));
    setState({
      deck: newDeck,
      usedCards: [],
      currentCard: null,
      activeRules: [],
      everyoneDrinksCount: 0,
      noEyeContactPlayers: [],
      players: config.players,
    });
  }, [config.includeJokers, config.players]);

  /**
   * Baraja el mazo actual (sin resetear cartas usadas)
   */
  const shuffleDeck = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      deck: shuffleArray(prevState.deck),
    }));
  }, []);

  // ============================================
  // CARTA 9: TODOS BEBEN (PROGRESIVO)
  // ============================================

  /**
   * Incrementa el contador de "Todos beben"
   * 1er 9 = 1 trago, 2do = 2, 3er = 3, 4to = 4
   * Máximo: 4 (luego se resetea al reiniciar mazo)
   */
  const incrementEveryoneDrinks = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      everyoneDrinksCount: Math.min(prevState.everyoneDrinksCount + 1, 4),
    }));
  }, []);

  // ============================================
  // CARTA CABALLO: NO MIRAR A LOS OJOS
  // ============================================

  /**
   * Activa "No mirar a los ojos" para un jugador
   * Si ya hay otro jugador con restricción, lo libera primero
   */
  const toggleNoEyeContact = useCallback((playerId: string) => {
    setState((prevState) => {
      // Si el jugador ya tiene la restricción, no hacer nada
      if (prevState.noEyeContactPlayers.includes(playerId)) {
        return prevState;
      }

      // Si hay otro jugador con restricción, liberarlo y activar para el nuevo
      return {
        ...prevState,
        noEyeContactPlayers: [playerId], // Solo 1 jugador a la vez
      };
    });
  }, []);

  /**
   * Remueve la restricción "No mirar a los ojos" de un jugador
   */
  const removeNoEyeContact = useCallback((playerId: string) => {
    setState((prevState) => ({
      ...prevState,
      noEyeContactPlayers: prevState.noEyeContactPlayers.filter((id) => id !== playerId),
    }));
  }, []);

  // ============================================
  // JOKER: REGLAS ESPECIALES (ACUMULABLES)
  // ============================================

  /**
   * Añade una regla del Joker
   * Las reglas se ACUMULAN (máximo 2 simultáneas)
   * Si ya hay 2, debe eliminarse una antes de agregar otra
   */
  const addJokerRule = useCallback((rule: JokerRule) => {
    setState((prevState) => {
      // No permitir más de 2 reglas
      if (prevState.activeRules.length >= 2) {
        console.warn('Ya hay 2 reglas activas. Elimina una antes de agregar otra.');
        return prevState;
      }

      // No agregar regla duplicada
      if (prevState.activeRules.some((r) => r.id === rule.id)) {
        return prevState;
      }

      return {
        ...prevState,
        activeRules: [...prevState.activeRules, rule],
      };
    });
  }, []);

  /**
   * Elimina una regla del Joker por ID
   */
  const removeJokerRule = useCallback((ruleId: string) => {
    setState((prevState) => ({
      ...prevState,
      activeRules: prevState.activeRules.filter((rule) => rule.id !== ruleId),
    }));
  }, []);

  /**
   * Limpia todas las reglas del Joker
   */
  const clearJokerRules = useCallback(() => {
    setState((prevState) => ({
      ...prevState,
      activeRules: [],
    }));
  }, []);

  // ============================================
  // UTILIDADES
  // ============================================

  /**
   * Obtiene el número de cartas restantes
   */
  const getRemainingCards = useCallback(() => {
    return state.deck.length;
  }, [state.deck.length]);

  /**
   * Obtiene información de la carta actual
   */
  const getCurrentCardInfo = useCallback(() => {
    if (!state.currentCard) return null;

    return {
      card: state.currentCard,
      displayName: getCardDisplayName(state.currentCard),
      suitEmoji: getSuitEmoji(state.currentCard.suit),
    };
  }, [state.currentCard]);

  /**
   * Verifica si un jugador tiene "No mirar a los ojos" activo
   */
  const hasNoEyeContact = useCallback(
    (playerId: string) => {
      return state.noEyeContactPlayers.includes(playerId);
    },
    [state.noEyeContactPlayers]
  );

  // ============================================
  // RETURN
  // ============================================

  return {
    // Estado
    state,

    // Gestión del mazo
    drawCard,
    resetDeck,
    shuffleDeck,
    getRemainingCards,
    getCurrentCardInfo,

    // Carta 9: Todos beben
    incrementEveryoneDrinks,
    everyoneDrinksCount: state.everyoneDrinksCount,

    // Carta Caballo: No mirar a los ojos
    toggleNoEyeContact,
    removeNoEyeContact,
    hasNoEyeContact,
    noEyeContactPlayers: state.noEyeContactPlayers,

    // Joker: Reglas especiales
    addJokerRule,
    removeJokerRule,
    clearJokerRules,
    activeRules: state.activeRules,

    // Carta actual
    currentCard: state.currentCard,
  };
}
