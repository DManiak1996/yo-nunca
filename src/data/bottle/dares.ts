/**
 * 🎭 PRUEBAS PARA "LA BOTELLA"
 *
 * 40 pruebas distribuidas en 5 niveles de intensidad
 * - Nivel 1: Suave (8 pruebas)
 * - Nivel 2: Media (8 pruebas)
 * - Nivel 3: Picante (8 pruebas)
 * - Nivel 4: Muy Picante (8 pruebas)
 * - Nivel 5: Extremo (8 pruebas)
 */

import { BottleDare } from '../../types/bottleGame';

export const bottleDares: BottleDare[] = [
  // ============================================
  // NIVEL 1 - SUAVE (8 pruebas)
  // ============================================
  {
    id: 'dare_lv1_001',
    level: 1,
    description: 'Dar un cumplido sincero',
    type: 'verbal',
  },
  {
    id: 'dare_lv1_002',
    level: 1,
    description: 'Bailar juntos 10 segundos',
    type: 'physical',
  },
  {
    id: 'dare_lv1_003',
    level: 1,
    description: 'Hacer 5 flexiones',
    type: 'physical',
  },
  {
    id: 'dare_lv1_004',
    level: 1,
    description: 'Contar un chiste',
    type: 'verbal',
  },
  {
    id: 'dare_lv1_005',
    level: 1,
    description: 'Cantar 10 segundos de una canción',
    type: 'verbal',
  },
  {
    id: 'dare_lv1_006',
    level: 1,
    description: 'Hacer una reverencia al otro',
    type: 'physical',
  },
  {
    id: 'dare_lv1_007',
    level: 1,
    description: 'Dar la mano y presentarse formalmente',
    type: 'intimate',
  },
  {
    id: 'dare_lv1_008',
    level: 1,
    description: 'Hacer un piropo gracioso',
    type: 'verbal',
  },

  // ============================================
  // NIVEL 2 - MEDIA (8 pruebas)
  // ============================================
  {
    id: 'dare_lv2_001',
    level: 2,
    description: 'Hablar con acento extranjero durante 1 minuto',
    type: 'verbal',
  },
  {
    id: 'dare_lv2_002',
    level: 2,
    description: 'Hacer 10 abdominales',
    type: 'physical',
  },
  {
    id: 'dare_lv2_003',
    level: 2,
    description: 'Imitar al otro durante 30 segundos',
    type: 'verbal',
  },
  {
    id: 'dare_lv2_004',
    level: 2,
    description: 'Contar una anécdota vergonzosa',
    type: 'verbal',
  },
  {
    id: 'dare_lv2_005',
    level: 2,
    description: 'Intercambiar una prenda de ropa (bufanda, gorra...)',
    type: 'intimate',
  },
  {
    id: 'dare_lv2_006',
    level: 2,
    description: 'Bailar pegados 15 segundos',
    type: 'physical',
  },
  {
    id: 'dare_lv2_007',
    level: 2,
    description: 'Hacer un retrato del otro con los ojos cerrados',
    type: 'physical',
  },
  {
    id: 'dare_lv2_008',
    level: 2,
    description: 'Decir 3 cosas que te gustan del otro',
    type: 'verbal',
  },

  // ============================================
  // NIVEL 3 - PICANTE (8 pruebas)
  // ============================================
  {
    id: 'dare_lv3_001',
    level: 3,
    description: 'Masaje de hombros 30 segundos',
    type: 'intimate',
  },
  {
    id: 'dare_lv3_002',
    level: 3,
    description: 'Baile sensual 20 segundos',
    type: 'physical',
  },
  {
    id: 'dare_lv3_003',
    level: 3,
    description: 'Confesar tu crush del grupo',
    type: 'verbal',
  },
  {
    id: 'dare_lv3_004',
    level: 3,
    description: 'Sentarte en el regazo del otro 30 segundos',
    type: 'intimate',
  },
  {
    id: 'dare_lv3_005',
    level: 3,
    description: 'Dar de comer algo a la otra persona',
    type: 'intimate',
  },
  {
    id: 'dare_lv3_006',
    level: 3,
    description: 'Acariciar el cabello del otro 20 segundos',
    type: 'intimate',
  },
  {
    id: 'dare_lv3_007',
    level: 3,
    description: 'Bailar un tango improvisado',
    type: 'physical',
  },
  {
    id: 'dare_lv3_008',
    level: 3,
    description: 'Susurrar un secreto al oído del otro',
    type: 'intimate',
  },

  // ============================================
  // NIVEL 4 - MUY PICANTE (8 pruebas)
  // ============================================
  {
    id: 'dare_lv4_001',
    level: 4,
    description: 'Quitarte una prenda de ropa (calcetines, camiseta...)',
    type: 'physical',
  },
  {
    id: 'dare_lv4_002',
    level: 4,
    description: 'Bailar pegados 30 segundos de forma sensual',
    type: 'intimate',
  },
  {
    id: 'dare_lv4_003',
    level: 4,
    description: 'Masaje en las piernas 30 segundos',
    type: 'intimate',
  },
  {
    id: 'dare_lv4_004',
    level: 4,
    description: 'Decir 3 cosas que te gustan físicamente del otro',
    type: 'verbal',
  },
  {
    id: 'dare_lv4_005',
    level: 4,
    description: 'Chupito del ombligo del otro',
    type: 'intimate',
  },
  {
    id: 'dare_lv4_006',
    level: 4,
    description: 'Sentaros juntos pegados durante 3 rondas',
    type: 'intimate',
  },
  {
    id: 'dare_lv4_007',
    level: 4,
    description: 'Masaje de espalda completo 1 minuto',
    type: 'intimate',
  },
  {
    id: 'dare_lv4_008',
    level: 4,
    description: 'Miradas fijas a los ojos sin reír durante 30 segundos',
    type: 'intimate',
  },

  // ============================================
  // NIVEL 5 - EXTREMO (8 pruebas)
  // ============================================
  {
    id: 'dare_lv5_001',
    level: 5,
    description: 'Minuto en el armario/habitación a solas',
    type: 'intimate',
  },
  {
    id: 'dare_lv5_002',
    level: 5,
    description: 'Striptease de 30 segundos',
    type: 'physical',
  },
  {
    id: 'dare_lv5_003',
    level: 5,
    description: 'Body shot (chupito del cuerpo)',
    type: 'intimate',
  },
  {
    id: 'dare_lv5_004',
    level: 5,
    description: '7 minutos en el cielo (habitación a solas)',
    type: 'intimate',
  },
  {
    id: 'dare_lv5_005',
    level: 5,
    description: 'Baile de lap dance 30 segundos',
    type: 'intimate',
  },
  {
    id: 'dare_lv5_006',
    level: 5,
    description: 'Masaje completo de cuerpo 2 minutos',
    type: 'intimate',
  },
  {
    id: 'dare_lv5_007',
    level: 5,
    description: 'Quitarse dos prendas de ropa',
    type: 'physical',
  },
  {
    id: 'dare_lv5_008',
    level: 5,
    description: 'Recrear una escena romántica de película',
    type: 'intimate',
  },
];

/**
 * Obtiene una prueba aleatoria de un nivel específico
 */
export function getRandomDareByLevel(level: 1 | 2 | 3 | 4 | 5): BottleDare {
  const daresForLevel = bottleDares.filter((dare) => dare.level === level);
  const randomIndex = Math.floor(Math.random() * daresForLevel.length);
  return daresForLevel[randomIndex];
}

/**
 * Obtiene todas las pruebas de un nivel específico
 */
export function getDaresByLevel(level: 1 | 2 | 3 | 4 | 5): BottleDare[] {
  return bottleDares.filter((dare) => dare.level === level);
}

/**
 * Estadísticas del banco de pruebas
 */
export function getDaresStats() {
  return {
    total: bottleDares.length,
    byLevel: {
      level1: bottleDares.filter((d) => d.level === 1).length,
      level2: bottleDares.filter((d) => d.level === 2).length,
      level3: bottleDares.filter((d) => d.level === 3).length,
      level4: bottleDares.filter((d) => d.level === 4).length,
      level5: bottleDares.filter((d) => d.level === 5).length,
    },
    byType: {
      physical: bottleDares.filter((d) => d.type === 'physical').length,
      verbal: bottleDares.filter((d) => d.type === 'verbal').length,
      intimate: bottleDares.filter((d) => d.type === 'intimate').length,
    },
  };
}
