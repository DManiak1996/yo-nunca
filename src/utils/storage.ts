/**
 * Utilidades para persistencia de datos con AsyncStorage
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

// Keys para AsyncStorage
const CUSTOM_PHRASES_KEY = '@yonunca_custom_phrases';
const THEME_KEY = '@yonunca_theme';

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
    const trimmedPhrase = phrase.trim();

    // Validaciones
    if (!trimmedPhrase) {
      throw new Error('La frase no puede estar vacía');
    }
    if (trimmedPhrase.length < 10) {
      throw new Error('La frase debe tener al menos 10 caracteres');
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
