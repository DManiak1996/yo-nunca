/**
 * Utilidades para validación de inputs de usuario
 */

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

/**
 * Valida el nombre de un jugador
 * @param name Nombre del jugador a validar
 * @returns ValidationResult con el resultado de la validación
 */
export function validatePlayerName(name: string): ValidationResult {
  const trimmed = name.trim();

  // Longitud
  if (trimmed.length < 2) {
    return { valid: false, error: "Nombre muy corto (mínimo 2 caracteres)" };
  }
  if (trimmed.length > 20) {
    return { valid: false, error: "Nombre muy largo (máximo 20 caracteres)" };
  }

  // Caracteres permitidos (letras, números, espacios, emojis comunes)
  const validChars = /^[\p{L}\p{N}\p{Emoji}\s]+$/u;
  if (!validChars.test(trimmed)) {
    return { valid: false, error: "Caracteres no permitidos" };
  }

  // Palabras reservadas/prohibidas
  const bannedWords = ['admin', 'null', 'undefined', 'system', 'test'];
  const lowerName = trimmed.toLowerCase();
  if (bannedWords.some(word => lowerName.includes(word))) {
    return { valid: false, error: "Nombre no permitido" };
  }

  return { valid: true };
}

/**
 * Valida una frase personalizada
 * @param phrase Frase a validar
 * @returns ValidationResult con el resultado de la validación
 */
export function validateCustomPhrase(phrase: string): ValidationResult {
  const trimmed = phrase.trim();

  // Longitud mínima (sin contar "yo nunca" que se añade automáticamente)
  if (trimmed.length < 10) {
    return { valid: false, error: "Frase muy corta (mínimo 10 caracteres)" };
  }

  // Longitud máxima
  if (trimmed.length > 200) {
    return { valid: false, error: "Frase muy larga (máximo 200 caracteres)" };
  }

  // No permitir frases vacías o solo espacios
  if (trimmed.length === 0) {
    return { valid: false, error: "La frase no puede estar vacía" };
  }

  // Lista de palabras prohibidas relacionadas con delitos graves
  const prohibitedWords = [
    'matar', 'asesinar', 'violar', 'violación', 'abusar', 'abuso',
    'pegar', 'golpear', 'maltratar', 'maltrato', 'torturar', 'tortura',
    'secuestrar', 'secuestro', 'terrorismo', 'terrorista',
    'suicidio', 'suicidarme', 'drogar', 'drogas duras'
  ];

  const lowerPhrase = trimmed.toLowerCase();
  const foundProhibited = prohibitedWords.find(word => lowerPhrase.includes(word));

  if (foundProhibited) {
    return {
      valid: false,
      error: "Esta frase contiene contenido no permitido relacionado con delitos graves"
    };
  }

  return { valid: true };
}

/**
 * Valida el límite de tragos configurado
 * @param limit Límite de tragos o null si no hay límite
 * @returns ValidationResult con el resultado de la validación
 */
export function validateDrinkLimit(limit: number | null): ValidationResult {
  if (limit === null) {
    return { valid: true }; // Sin límite es válido
  }

  if (!Number.isInteger(limit)) {
    return { valid: false, error: "El límite debe ser un número entero" };
  }

  if (limit < 5) {
    return { valid: false, error: "Límite muy bajo (mínimo 5)" };
  }

  if (limit > 50) {
    return { valid: false, error: "Límite muy alto (máximo 50)" };
  }

  return { valid: true };
}
