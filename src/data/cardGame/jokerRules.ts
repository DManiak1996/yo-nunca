/**
 * 🤡 REGLAS DEL JOKER PARA "EL REY DE COPAS"
 *
 * 30 reglas especiales que se activan cuando sale un Joker
 * Las reglas se ACUMULAN (máximo 2 simultáneas)
 *
 * Categorías:
 * - Verbales (10)
 * - Gestos (8)
 * - Interacción (7)
 * - Absurdas/Divertidas (5)
 */

import { JokerRule } from '../../types/cardGame';

export const jokerRules: JokerRule[] = [
  // ============================================
  // REGLAS VERBALES (10 reglas)
  // ============================================
  {
    id: 'joker_verbal_001',
    description: 'Prohibido decir nombres propios',
    penalty: 'Quien diga un nombre propio, bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_002',
    description: 'Prohibido decir números',
    penalty: 'Quien diga un número, bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_003',
    description: 'Prohibido usar determinantes (el, la, los, las, un, una...)',
    penalty: 'Quien use un determinante, bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_004',
    description: 'Prohibido decir "yo"',
    penalty: 'Sustituir por "este servidor" o tu nombre. Quien diga "yo", bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_005',
    description: 'Prohibido decir palabras que empiecen por "S"',
    penalty: 'Quien diga una palabra que empiece por "S", bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_006',
    description: 'Prohibido decir "sí" o "no"',
    penalty: 'Solo asentir/negar con la cabeza. Quien diga sí o no, bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_007',
    description: 'Prohibido decir palabrotas',
    penalty: 'Quien maldiga o diga tacos, bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_008',
    description: 'Hablar en tercera persona',
    penalty: 'Decir "Pepito quiere agua" en vez de "Quiero agua". Quien falle, bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_009',
    description: 'Prohibido hacer preguntas',
    penalty: 'Solo afirmaciones permitidas. Quien haga una pregunta, bebe',
    category: 'verbal',
  },
  {
    id: 'joker_verbal_010',
    description: 'Terminar cada frase con "en la cama"',
    penalty: 'Todas tus frases deben acabar con "en la cama". Quien olvide, bebe',
    category: 'verbal',
  },

  // ============================================
  // REGLAS DE GESTOS (8 reglas)
  // ============================================
  {
    id: 'joker_gesture_001',
    description: 'Mano en la cabeza al beber',
    penalty: 'Debes poner una mano en tu cabeza al beber. Quien olvide, bebe doble',
    category: 'gesture',
  },
  {
    id: 'joker_gesture_002',
    description: 'Aplaudir antes de beber',
    penalty: 'Debes aplaudir 3 veces antes de cada trago. Quien olvide, bebe doble',
    category: 'gesture',
  },
  {
    id: 'joker_gesture_003',
    description: 'Beber con la mano no dominante',
    penalty: 'Zurdos con derecha, diestros con izquierda. Quien falle, bebe doble',
    category: 'gesture',
  },
  {
    id: 'joker_gesture_004',
    description: 'Guiñar un ojo al terminar de hablar',
    penalty: 'Debes guiñar un ojo cada vez que termines de hablar. Quien olvide, bebe',
    category: 'gesture',
  },
  {
    id: 'joker_gesture_005',
    description: 'Hacer un saludo militar antes de beber',
    penalty: 'Saludo militar obligatorio antes de cada trago. Quien olvide, trago extra',
    category: 'gesture',
  },
  {
    id: 'joker_gesture_006',
    description: 'Levantarse al beber',
    penalty: 'Debes ponerte de pie para beber. Beber sentado = 2 tragos',
    category: 'gesture',
  },
  {
    id: 'joker_gesture_007',
    description: 'Pulgar en la frente al hablar',
    penalty: 'Pon tu pulgar en la frente al hablar (como saludo indio). Quien olvide, bebe',
    category: 'gesture',
  },
  {
    id: 'joker_gesture_008',
    description: 'Brindar antes de cada trago',
    penalty: 'Debes decir "¡Salud!" y brindar aunque bebas solo. Quien olvide, bebe doble',
    category: 'gesture',
  },

  // ============================================
  // REGLAS DE INTERACCIÓN (7 reglas)
  // ============================================
  {
    id: 'joker_interaction_001',
    description: 'Mirar hacia arriba al reírte',
    penalty: 'Cuando te rías, mira al techo. Quien se ría mirando adelante, bebe',
    category: 'interaction',
  },
  {
    id: 'joker_interaction_002',
    description: 'Señalar a alguien antes de hablar',
    penalty: 'Debes señalar a cualquier persona antes de decir algo. Quien olvide, bebe',
    category: 'interaction',
  },
  {
    id: 'joker_interaction_003',
    description: 'Pedir permiso al Payaso para ir al baño',
    penalty: 'Quien sacó esta carta es el Payaso. Debes pedirle permiso para ir al baño',
    category: 'interaction',
  },
  {
    id: 'joker_interaction_004',
    description: 'Último en tocar la mesa cuando alguien dice "suelo"',
    penalty: 'Cuando alguien diga "suelo", todos deben tocar la mesa. El último bebe',
    category: 'interaction',
  },
  {
    id: 'joker_interaction_005',
    description: 'Copiar el gesto del anterior',
    penalty: 'Si alguien se rasca, tú también. Si bebe, tú bebes. Quien olvide, bebe extra',
    category: 'interaction',
  },
  {
    id: 'joker_interaction_006',
    description: 'Prohibido cruzar las piernas',
    penalty: 'Nadie puede cruzar las piernas. Quien cruce, bebe',
    category: 'interaction',
  },
  {
    id: 'joker_interaction_007',
    description: 'Hablar solo al jugador de tu derecha',
    penalty: 'Solo puedes hablarle a quien esté a tu derecha. Ignorar al resto o bebe',
    category: 'interaction',
  },

  // ============================================
  // REGLAS ABSURDAS/DIVERTIDAS (5 reglas)
  // ============================================
  {
    id: 'joker_absurd_001',
    description: 'Hablar como pirata',
    penalty: '¡Arrr! Habla como pirata hasta que salga otro Joker. Quien falle, bebe',
    category: 'absurd',
  },
  {
    id: 'joker_absurd_002',
    description: 'Usar acento extranjero al hablar',
    penalty: 'Elige un acento (francés, italiano, ruso...) y úsalo siempre. Quien olvide, bebe',
    category: 'absurd',
  },
  {
    id: 'joker_absurd_003',
    description: 'Cantar en vez de hablar',
    penalty: 'Todas tus frases deben ser cantadas. Quien hable normal, bebe',
    category: 'absurd',
  },
  {
    id: 'joker_absurd_004',
    description: 'Hablar en susurros',
    penalty: 'Todo el mundo debe hablar susurrando. Quien hable alto, bebe',
    category: 'absurd',
  },
  {
    id: 'joker_absurd_005',
    description: 'Inventar un apodo para cada persona',
    penalty: 'Usa solo apodos, nada de nombres reales. Quien use un nombre, bebe',
    category: 'absurd',
  },
];

/**
 * Obtiene una regla del Joker aleatoria
 */
export function getRandomJokerRule(): JokerRule {
  const randomIndex = Math.floor(Math.random() * jokerRules.length);
  return jokerRules[randomIndex];
}

/**
 * Obtiene una regla del Joker aleatoria que NO esté ya activa
 */
export function getRandomJokerRuleExcluding(excludeIds: string[]): JokerRule | null {
  const availableRules = jokerRules.filter((rule) => !excludeIds.includes(rule.id));

  if (availableRules.length === 0) {
    return null; // No quedan reglas disponibles
  }

  const randomIndex = Math.floor(Math.random() * availableRules.length);
  return availableRules[randomIndex];
}

/**
 * Obtiene reglas del Joker por categoría
 */
export function getJokerRulesByCategory(category: 'verbal' | 'gesture' | 'interaction' | 'absurd'): JokerRule[] {
  return jokerRules.filter((rule) => rule.category === category);
}

/**
 * Obtiene estadísticas de las reglas
 */
export function getJokerRulesStats() {
  return {
    total: jokerRules.length,
    verbal: jokerRules.filter((r) => r.category === 'verbal').length,
    gesture: jokerRules.filter((r) => r.category === 'gesture').length,
    interaction: jokerRules.filter((r) => r.category === 'interaction').length,
    absurd: jokerRules.filter((r) => r.category === 'absurd').length,
  };
}
