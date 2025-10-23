/**
 * Utilidades para persistencia de datos con AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameSession, CagonCounter } from '../types';

// Keys para AsyncStorage
const CUSTOM_PHRASES_KEY = '@yonunca_custom_phrases';
const THEME_KEY = '@yonunca_theme';
const GAME_SESSION_KEY = '@yonunca_game_session';
const CAGON_COUNTER_KEY = '@yonunca_cagon_counter';

/**
 * Obtiene las frases personalizadas guardadas
 * @returns Array de strings con las frases personalizadas
 */
export async function getCustomPhrases(): Promise<string[]> {
  try {
    const jsonValue = await AsyncStorage.getItem(CUSTOM_PHRASES_KEY);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (error) {
    console.error('Error al obtener frases personalizadas:', error);
    return [];
  }
}

/**
 * Guarda el array completo de frases personalizadas
 * @param phrases Array de strings con las frases
 */
export async function saveCustomPhrases(phrases: string[]): Promise<void> {
  try {
    const jsonValue = JSON.stringify(phrases);
    await AsyncStorage.setItem(CUSTOM_PHRASES_KEY, jsonValue);
  } catch (error) {
    console.error('Error al guardar frases personalizadas:', error);
    throw error;
  }
}

/**
 * Añade una nueva frase personalizada
 * @param phrase String con la nueva frase
 */
export async function addCustomPhrase(phrase: string): Promise<void> {
  try {
    const existingPhrases = await getCustomPhrases();
    let trimmedPhrase = phrase.trim();

    // Eliminar "yo nunca" del inicio si lo incluye (case insensitive)
    const yoNuncaRegex = /^(yo nunca|yo\s+nunca)\s+/i;
    trimmedPhrase = trimmedPhrase.replace(yoNuncaRegex, '');

    // Validaciones
    if (!trimmedPhrase) {
      throw new Error('La frase no puede estar vacía');
    }
    if (trimmedPhrase.length < 10) {
      throw new Error('La frase debe tener al menos 10 caracteres (sin contar "yo nunca")');
    }
    if (trimmedPhrase.length > 200) {
      throw new Error('La frase no puede tener más de 200 caracteres');
    }
    if (existingPhrases.includes(trimmedPhrase)) {
      throw new Error('Esta frase ya existe');
    }
    if (existingPhrases.length >= 100) {
      throw new Error('Has alcanzado el límite de 100 frases personalizadas');
    }

    existingPhrases.push(trimmedPhrase);
    await saveCustomPhrases(existingPhrases);
  } catch (error) {
    console.error('Error al añadir frase personalizada:', error);
    throw error;
  }
}

/**
 * Elimina una frase personalizada por su índice
 * @param index Índice de la frase a eliminar
 */
export async function deleteCustomPhrase(index: number): Promise<void> {
  try {
    const existingPhrases = await getCustomPhrases();
    if (index < 0 || index >= existingPhrases.length) {
      throw new Error('Índice inválido');
    }
    existingPhrases.splice(index, 1);
    await saveCustomPhrases(existingPhrases);
  } catch (error) {
    console.error('Error al eliminar frase personalizada:', error);
    throw error;
  }
}

/**
 * Elimina todas las frases personalizadas
 */
export async function clearCustomPhrases(): Promise<void> {
  try {
    await AsyncStorage.removeItem(CUSTOM_PHRASES_KEY);
  } catch (error) {
    console.error('Error al limpiar frases personalizadas:', error);
    throw error;
  }
}

/**
 * Obtiene la preferencia de tema guardada
 * @returns 'dark' o 'light'
 */
export async function getThemePreference(): Promise<'dark' | 'light'> {
  try {
    const value = await AsyncStorage.getItem(THEME_KEY);
    return (value === 'light' ? 'light' : 'dark') as 'dark' | 'light';
  } catch (error) {
    console.error('Error al obtener preferencia de tema:', error);
    return 'dark';
  }
}

/**
 * Guarda la preferencia de tema
 * @param theme 'dark' o 'light'
 */
export async function saveThemePreference(theme: 'dark' | 'light'): Promise<void> {
  try {
    await AsyncStorage.setItem(THEME_KEY, theme);
  } catch (error) {
    console.error('Error al guardar preferencia de tema:', error);
    throw error;
  }
}

// ========== FUNCIONES PARA GAME SESSION (V2.0) ==========

/**
 * Guarda la sesión de juego actual
 * @param session Sesión de juego a guardar
 */
export async function saveGameSession(session: GameSession): Promise<void> {
  try {
    const jsonValue = JSON.stringify(session);
    await AsyncStorage.setItem(GAME_SESSION_KEY, jsonValue);
  } catch (error) {
    console.error('Error al guardar sesión de juego:', error);
    throw error;
  }
}

/**
 * Obtiene la sesión de juego guardada (si existe)
 * @returns GameSession o null si no existe
 */
export async function getGameSession(): Promise<GameSession | null> {
  try {
    const jsonValue = await AsyncStorage.getItem(GAME_SESSION_KEY);
    if (jsonValue === null) {
      return null;
    }
    const session: GameSession = JSON.parse(jsonValue);

    // Validar que la sesión no sea muy antigua (más de 24h)
    const now = Date.now();
    const sessionAge = now - session.lastPlayedAt;
    const MAX_AGE = 24 * 60 * 60 * 1000; // 24 horas en milisegundos

    if (sessionAge > MAX_AGE) {
      // Sesión muy antigua, limpiarla
      await clearGameSession();
      return null;
    }

    return session;
  } catch (error) {
    console.error('Error al obtener sesión de juego:', error);
    return null;
  }
}

/**
 * Elimina la sesión de juego guardada
 */
export async function clearGameSession(): Promise<void> {
  try {
    await AsyncStorage.removeItem(GAME_SESSION_KEY);
  } catch (error) {
    console.error('Error al limpiar sesión de juego:', error);
    throw error;
  }
}

// ========== FUNCIONES PARA CONTADOR CAGÓN (V2.0) ==========

/**
 * Obtiene el contador de clicks en el botón "Cagón"
 * @returns CagonCounter con el contador y última actualización
 */
export async function getCagonCounter(): Promise<CagonCounter> {
  try {
    const jsonValue = await AsyncStorage.getItem(CAGON_COUNTER_KEY);
    if (jsonValue === null) {
      return { count: 0, lastUpdated: Date.now() };
    }
    return JSON.parse(jsonValue);
  } catch (error) {
    console.error('Error al obtener contador cagón:', error);
    return { count: 0, lastUpdated: Date.now() };
  }
}

/**
 * Incrementa el contador de clicks en el botón "Cagón"
 * @returns El nuevo valor del contador
 */
export async function incrementCagonCounter(): Promise<number> {
  try {
    const counter = await getCagonCounter();
    const newCounter: CagonCounter = {
      count: counter.count + 1,
      lastUpdated: Date.now(),
    };
    const jsonValue = JSON.stringify(newCounter);
    await AsyncStorage.setItem(CAGON_COUNTER_KEY, jsonValue);
    return newCounter.count;
  } catch (error) {
    console.error('Error al incrementar contador cagón:', error);
    throw error;
  }
}

/**
 * Resetea el contador de clicks en el botón "Cagón"
 */
export async function resetCagonCounter(): Promise<void> {
  try {
    const newCounter: CagonCounter = {
      count: 0,
      lastUpdated: Date.now(),
    };
    const jsonValue = JSON.stringify(newCounter);
    await AsyncStorage.setItem(CAGON_COUNTER_KEY, jsonValue);
  } catch (error) {
    console.error('Error al resetear contador cagón:', error);
    throw error;
  }
}
