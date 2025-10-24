/**
 * Utilidades para persistencia de datos con AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';
import { GameSession, CagonCounter, GlobalStats, DifficultyLevel, Player } from '../types';

// Keys para AsyncStorage
const CUSTOM_PHRASES_KEY = '@yonunca_custom_phrases';
const THEME_KEY = '@yonunca_theme';
const GAME_SESSION_KEY = '@yonunca_game_session';
const CAGON_COUNTER_KEY = '@yonunca_cagon_counter';
const GLOBAL_STATS_KEY = '@yonunca_global_stats';

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

// ========== FUNCIONES PARA ESTADÍSTICAS GLOBALES (V2.1) ==========

/**
 * Obtiene las estadísticas globales del usuario
 * @returns GlobalStats o objeto inicial si no existe
 */
export async function getGlobalStats(): Promise<GlobalStats> {
  try {
    const jsonValue = await AsyncStorage.getItem(GLOBAL_STATS_KEY);
    if (jsonValue === null) {
      // Retornar stats iniciales
      return {
        gamesPlayed: 0,
        categoryCount: {
          cagon: 0,
          medio: 0,
          picante: 0,
          muy_picante: 0,
        },
        totalPlayersSum: 0,
        totalDurationMinutes: 0,
        totalDrinks: 0,
        lastPlayedDate: '',
        currentStreak: 0,
        maxDrinksRecord: null,
      };
    }
    return JSON.parse(jsonValue);
  } catch (error) {
    console.error('Error al obtener estadísticas globales:', error);
    return {
      gamesPlayed: 0,
      categoryCount: {
        cagon: 0,
        medio: 0,
        picante: 0,
        muy_picante: 0,
      },
      totalPlayersSum: 0,
      totalDurationMinutes: 0,
      totalDrinks: 0,
      lastPlayedDate: '',
      currentStreak: 0,
      maxDrinksRecord: null,
    };
  }
}

/**
 * Actualiza las estadísticas globales después de una partida
 * @param difficulty Categoría jugada
 * @param players Lista de jugadores
 * @param durationMinutes Duración de la partida en minutos
 */
export async function updateGlobalStats(
  difficulty: DifficultyLevel,
  players: Player[],
  durationMinutes: number
): Promise<void> {
  try {
    const stats = await getGlobalStats();

    // Calcular tragos totales de esta partida
    const gameDrinks = players.reduce((sum, p) => sum + p.drinks, 0);

    // Encontrar jugador con más tragos
    const maxDrinksPlayer = players.reduce((max, p) =>
      p.drinks > max.drinks ? p : max
    , players[0]);

    // Actualizar contador de categoría
    stats.categoryCount[difficulty]++;

    // Calcular racha
    const today = new Date().toISOString().split('T')[0];
    const lastPlayed = stats.lastPlayedDate ? stats.lastPlayedDate.split('T')[0] : '';

    if (lastPlayed) {
      const lastDate = new Date(lastPlayed);
      const todayDate = new Date(today);
      const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        // Día consecutivo
        stats.currentStreak++;
      } else if (diffDays > 1) {
        // Se rompió la racha
        stats.currentStreak = 1;
      }
      // Si diffDays === 0, ya se jugó hoy, no cambiar racha
    } else {
      // Primera partida
      stats.currentStreak = 1;
    }

    // Actualizar récord de tragos
    if (!stats.maxDrinksRecord || maxDrinksPlayer.drinks > stats.maxDrinksRecord.drinks) {
      stats.maxDrinksRecord = {
        playerName: maxDrinksPlayer.name,
        drinks: maxDrinksPlayer.drinks,
        date: new Date().toISOString(),
      };
    }

    // Actualizar stats generales
    stats.gamesPlayed++;
    stats.totalPlayersSum += players.length;
    stats.totalDurationMinutes += durationMinutes;
    stats.totalDrinks += gameDrinks;
    stats.lastPlayedDate = new Date().toISOString();

    // Guardar
    const jsonValue = JSON.stringify(stats);
    await AsyncStorage.setItem(GLOBAL_STATS_KEY, jsonValue);
  } catch (error) {
    console.error('Error al actualizar estadísticas globales:', error);
    throw error;
  }
}

/**
 * Resetea todas las estadísticas globales
 */
export async function resetGlobalStats(): Promise<void> {
  try {
    await AsyncStorage.removeItem(GLOBAL_STATS_KEY);
  } catch (error) {
    console.error('Error al resetear estadísticas globales:', error);
    throw error;
  }
}
