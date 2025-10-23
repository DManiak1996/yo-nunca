/**
 * Generador de nombres aleatorios graciosos para jugadores
 * Incluye borrachos famosos y animales festivos
 */

import { Player } from '../types';

// Borrachos famosos y personajes legendarios
const DRUNK_CELEBRITIES = [
  "Amy Winehouse",
  "Charles Bukowski",
  "Ernest Hemingway",
  "Diego Maradona",
  "Keith Richards",
  "Ozzy Osbourne",
  "Winston Churchill",
  "Frank Sinatra",
  "Hunter S. Thompson",
  "Jim Morrison",
  "Bon Scott",
  "Janis Joplin",
  "Shane MacGowan",
  "George Best",
  "Oliver Reed",
  "Dean Martin",
  "W.C. Fields",
  "Richard Burton",
  "Boris Yeltsin",
  "Pablo Escobar (borracho de poder)",
];

// Animales fiesteros con emojis
const FUNNY_ANIMALS = [
  "🐻 Oso borracho",
  "🦊 Zorro fiestero",
  "🐼 Panda pachanguero",
  "🦁 León melenas",
  "🐯 Tigre salvaje",
  "🐺 Lobo aullador",
  "🦝 Mapache travieso",
  "🐨 Koala dormilón",
  "🦘 Canguro saltarín",
  "🐷 Cerdo glotón",
  "🐵 Mono borrachín",
  "🦍 Gorila gigante",
  "🐸 Rana cantarina",
  "🦎 Lagarto escurridizo",
  "🐊 Cocodrilo hambriento",
  "🦈 Tiburón cazador",
  "🐙 Pulpo tentáculo",
  "🦀 Cangrejo pinzas",
  "🐌 Caracol lento",
  "🦋 Mariposa voladora",
  "🐝 Abeja trabajadora",
  "🦗 Grillo musical",
  "🕷️ Araña tejedora",
  "🦂 Escorpión peligroso",
  "🐢 Tortuga sabia",
];

// Apodos españoles graciosos
const SPANISH_NICKNAMES = [
  "El Cachondo",
  "La Borracha",
  "El Descarado",
  "La Picante",
  "El Turbio",
  "La Salvaje",
  "El Loco",
  "La Diablesa",
  "El Vicio",
  "La Locuela",
  "El Fiestero",
  "La Marchosa",
  "El Sinvergüenza",
  "La Desfasada",
  "El Mamado",
  "La Piripi",
  "El Colocado",
  "La Temeraria",
  "El Descontrolado",
  "La Alocada",
];

// Combinación de adjetivos + sustantivos random
const ADJECTIVES = [
  "Épico",
  "Salvaje",
  "Loco",
  "Místico",
  "Turbio",
  "Legendario",
  "Caótico",
  "Divino",
  "Maldito",
  "Bendito",
];

const NOUNS = [
  "Bebedor",
  "Fiestero",
  "Guerrero",
  "Campeón",
  "Maestro",
  "Rey",
  "Héroe",
  "Villano",
  "Leyenda",
  "Mito",
];

/**
 * Genera un nombre aleatorio gracioso
 * @returns String con el nombre generado
 */
export function generateRandomName(): string {
  const categories = [
    DRUNK_CELEBRITIES,
    FUNNY_ANIMALS,
    SPANISH_NICKNAMES,
  ];

  // 70% de probabilidad de usar una de las 3 categorías principales
  // 30% de probabilidad de generar combinación adjetivo + sustantivo
  const useMainCategories = Math.random() < 0.7;

  if (useMainCategories) {
    const randomCategory = categories[Math.floor(Math.random() * categories.length)];
    return randomCategory[Math.floor(Math.random() * randomCategory.length)];
  } else {
    // Generar combinación
    const adj = ADJECTIVES[Math.floor(Math.random() * ADJECTIVES.length)];
    const noun = NOUNS[Math.floor(Math.random() * NOUNS.length)];
    return `${adj} ${noun}`;
  }
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
 * Genera un avatar aleatorio (emoji)
 * @returns String con emoji
 */
export function getRandomAvatar(): string {
  const avatars = [
    '🎭', '🎪', '🎨', '🎬', '🎤', '🎧', '🎮', '🎯', '🎲', '🎰',
    '👑', '👒', '🎩', '🧢', '👓', '🕶️', '🥽', '🥳', '🤠', '🤡',
    '👹', '👺', '💀', '👽', '🤖', '🎃', '😈', '👿', '🔥', '⚡',
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
