/**
 * Utilidades para sanitización de inputs de usuario
 */

/**
 * Sanitiza el nombre de un jugador
 * @param name Nombre del jugador a sanitizar
 * @returns Nombre sanitizado
 */
export function sanitizePlayerName(name: string): string {
  let clean = name.trim();

  // Eliminar múltiples espacios consecutivos
  clean = clean.replace(/\s+/g, ' ');

  // Limitar longitud
  if (clean.length > 20) {
    clean = clean.substring(0, 20);
  }

  // Eliminar caracteres de control (invisibles)
  clean = clean.replace(/[\x00-\x1F\x7F]/g, '');

  return clean;
}

/**
 * Sanitiza una frase personalizada
 * @param phrase Frase a sanitizar
 * @returns Frase sanitizada
 */
export function sanitizeCustomPhrase(phrase: string): string {
  let clean = phrase.trim();

  // Eliminar múltiples espacios
  clean = clean.replace(/\s+/g, ' ');

  // Escapar HTML (prevención básica)
  clean = clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  // Eliminar caracteres de control
  clean = clean.replace(/[\x00-\x1F\x7F]/g, '');

  // Eliminar "yo nunca" del inicio si el usuario lo escribió
  clean = clean.replace(/^(yo nunca|yo\s+nunca)\s+/i, '');

  // Limitar longitud
  if (clean.length > 200) {
    clean = clean.substring(0, 200);
  }

  return clean;
}
