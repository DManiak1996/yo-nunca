/**
 * Generador de nombres fiesteros para jugadores
 */

import { Player } from '../types';

// Nombres fiesteros y picantes creativos
const PARTY_NAMES = [
  // 🔥 Fiesteros y picantes
  "El Padrino del Perreo",
  "La Reina del Descontrol",
  "El Sultán del Sudor",
  "La Diosa del Pecado",
  "El Arquitecto del Caos Sexual",
  "La Ingeniera del Deseo",
  "El Bandido del Beso Robado",
  "La Maestra del Faje",
  "El Titán del Toqueteo",
  "La Fiera del After",
  "El Sicario del Amor",
  "La Reina del '¿solo amigos?'",
  "El Príncipe del Calor",
  "La Señorita del Delirio",
  "El Mago del Kiki",
  "La Hechicera del Jäger",
  "El Devoto del Desmadre",
  "La Virgen del Vino",
  "El Pecador del Ron",
  "La Bruja del Whisky",

  // 🍸 Humor y doble sentido
  "El CEO del Vacile",
  "La Gerenta del Placer Corporativo",
  "El Consultor de Cuerpos",
  "La Community Manager del Caos",
  "El Influencer del Pecado",
  "La Diseñadora del Deseo",
  "El Pastor del Perreo",
  "La Monja de la Fiesta",
  "El Papa del Poteo",
  "La Condesa del Copazo",
  "El Notario de los Pecados",
  "La Psicóloga del After",
  "El Sommelier del Sudor",
  "La Curandera del Gin",
  "El Chamán del Kiki",
  "La Embajadora del Desmadre",
  "El Barón del Beso",
  "La Marquesa del Trago",
  "El Poeta del Pecado",
  "La Reina del Trébol",

  // 💃 Energía sexual y fiesta
  "El Animal del Amor",
  "La Pantera del Perreo",
  "El Demonio del Deseo",
  "La Tentación de la Noche",
  "El Ángel del After",
  "La Gata del Gin",
  "El Tigre del Tequila",
  "La Sirena del Ron",
  "El Vampiro del Vodka",
  "La Fénix del Fuego Interno",
  "El Dragón del Delirio",
  "La Musa del Caos",
  "El Capitán del Coqueteo",
  "La General del Golpe Bajo",
  "El Hacker de Corazones",
  "La Criminóloga del Kiki",
  "El Piloto del Pecado",
  "La Controladora del Calor",
  "El Alquimista del Sudor",
  "La Sultana del After",
];

/**
 * Genera un nombre aleatorio de PARTY_NAMES
 * @returns String con el nombre generado
 */
export function generateRandomName(): string {
  return PARTY_NAMES[Math.floor(Math.random() * PARTY_NAMES.length)];
}

/**
 * Genera una lista de jugadores con nombres aleatorios únicos
 * @param count Número de jugadores a generar (2-20)
 * @returns Array de Player con nombres únicos
 */
export function generatePlayerList(count: number): Player[] {
  if (count < 2 || count > 20) {
    throw new Error('El número de jugadores debe estar entre 2 y 20');
  }

  const players: Player[] = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name = generateRandomName();

    // Asegurar que el nombre es único
    let attempts = 0;
    while (usedNames.has(name) && attempts < 50) {
      name = generateRandomName();
      attempts++;
    }

    // Si después de 50 intentos sigue repetido, añadir número
    if (usedNames.has(name)) {
      name = `${name} ${i + 1}`;
    }

    usedNames.add(name);

    players.push({
      id: `player_${Date.now()}_${i}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      drinks: 0,
      avatar: getRandomAvatar(),
    });
  }

  return players;
}

/**
 * Genera un avatar aleatorio (emoji) fiestero
 * @returns String con emoji
 */
export function getRandomAvatar(): string {
  const avatars = [
    '🥳', '🎉', '🍺', '🍻', '🥂', '🍾', '🎊', '🎈', '🎆', '🎇',
    '😎', '🕶️', '🤠', '🎩', '👑', '🔥', '⚡', '💥', '✨', '🌟',
    '🎭', '👹', '👺', '💀', '👽', '🤖', '🎃', '😈', '👿', '🦄',
  ];
  return avatars[Math.floor(Math.random() * avatars.length)];
}

/**
 * Genera un solo jugador nuevo (útil para añadir jugadores)
 * @param existingNames Nombres ya usados para evitar duplicados
 * @returns Player nuevo
 */
export function generateSinglePlayer(existingNames: string[] = []): Player {
  let name = generateRandomName();

  // Asegurar unicidad
  let attempts = 0;
  while (existingNames.includes(name) && attempts < 50) {
    name = generateRandomName();
    attempts++;
  }

  // Si después de 50 intentos sigue repetido, añadir número
  if (existingNames.includes(name)) {
    name = `${name} ${existingNames.length + 1}`;
  }

  return {
    id: `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    name,
    drinks: 0,
    avatar: getRandomAvatar(),
  };
}

/**
 * Cambia el nombre de un jugador asegurando que sea único
 * @param players Lista actual de jugadores
 * @param playerId ID del jugador a renombrar
 * @param newName Nuevo nombre deseado
 * @returns Lista actualizada de jugadores
 */
/**
 * Sanitiza un nombre de jugador removiendo caracteres peligrosos
 * @param name Nombre a sanitizar
 * @returns Nombre sanitizado
 */
function sanitizeName(name: string): string {
  // Eliminar etiquetas HTML/scripts potencialmente peligrosos
  let sanitized = name.replace(/<[^>]*>/g, '');

  // Eliminar caracteres de control y caracteres especiales peligrosos
  sanitized = sanitized.replace(/[\x00-\x1F\x7F-\x9F]/g, '');

  // Limitar a caracteres seguros (letras, números, espacios, emojis básicos)
  sanitized = sanitized.replace(/[^\p{L}\p{N}\p{Emoji}\s\-_']/gu, '');

  return sanitized.trim();
}

export function renamePlayer(
  players: Player[],
  playerId: string,
  newName: string
): Player[] {
  // Sanitizar primero
  const sanitizedName = sanitizeName(newName);
  const trimmedName = sanitizedName.trim();

  if (!trimmedName) {
    throw new Error('El nombre no puede estar vacío');
  }

  if (trimmedName.length < 2) {
    throw new Error('El nombre debe tener al menos 2 caracteres');
  }

  if (trimmedName.length > 30) {
    throw new Error('El nombre no puede tener más de 30 caracteres');
  }

  // Verificar que no exista otro jugador con ese nombre
  const nameExists = players.some(
    (p) => p.id !== playerId && p.name.toLowerCase() === trimmedName.toLowerCase()
  );

  if (nameExists) {
    throw new Error('Ya existe un jugador con ese nombre');
  }

  return players.map((player) =>
    player.id === playerId ? { ...player, name: trimmedName } : player
  );
}
