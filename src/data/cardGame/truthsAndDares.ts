/**
 * 🎭 VERDADES Y RETOS PARA "EL REY DE COPAS" - CARTA 7
 *
 * 60 preguntas/retos variados sin niveles de intensidad
 * - 30 Verdades (preguntas comprometidas)
 * - 30 Retos (desafíos divertidos)
 *
 * Todas mezcladas aleatoriamente sin filtrar por intensidad
 */

import { Challenge } from '../../types/cardGame';

// ============================================
// VERDADES (30 preguntas)
// ============================================

export const truths: Challenge[] = [
  // Verdades suaves/medias
  {
    id: 'truth_001',
    type: 'truth',
    text: '¿Cuál es tu mayor secreto que nadie aquí sabe?',
  },
  {
    id: 'truth_002',
    type: 'truth',
    text: '¿Alguna vez has mentido sobre tu edad para entrar a algún sitio?',
  },
  {
    id: 'truth_003',
    type: 'truth',
    text: '¿Cuál fue tu peor cita?',
  },
  {
    id: 'truth_004',
    type: 'truth',
    text: '¿Has llorado viendo una película? ¿Cuál?',
  },
  {
    id: 'truth_005',
    type: 'truth',
    text: '¿Alguna vez has robado algo? ¿Qué fue?',
  },
  {
    id: 'truth_006',
    type: 'truth',
    text: '¿Cuál es la cosa más vergonzosa que has hecho borracho/a?',
  },
  {
    id: 'truth_007',
    type: 'truth',
    text: '¿Has devuelto alguna vez un regalo?',
  },
  {
    id: 'truth_008',
    type: 'truth',
    text: '¿Cuál es tu mayor miedo?',
  },
  {
    id: 'truth_009',
    type: 'truth',
    text: '¿Has tenido alguna vez un crush con alguien de este grupo?',
  },
  {
    id: 'truth_010',
    type: 'truth',
    text: '¿Cuál es tu fantasía sexual más rara?',
  },

  // Verdades picantes
  {
    id: 'truth_011',
    type: 'truth',
    text: '¿Has engañado alguna vez a tu pareja?',
  },
  {
    id: 'truth_012',
    type: 'truth',
    text: '¿Con quién de este grupo te irías a una isla desierta?',
  },
  {
    id: 'truth_013',
    type: 'truth',
    text: '¿Cuál fue tu experiencia sexual más extraña?',
  },
  {
    id: 'truth_014',
    type: 'truth',
    text: '¿Has besado a alguien del mismo sexo?',
  },
  {
    id: 'truth_015',
    type: 'truth',
    text: '¿Cuál es tu mayor arrepentimiento?',
  },
  {
    id: 'truth_016',
    type: 'truth',
    text: '¿Has tenido un lío de una noche? ¿Cuántos?',
  },
  {
    id: 'truth_017',
    type: 'truth',
    text: '¿Alguna vez has enviado nudes? ¿A quién?',
  },
  {
    id: 'truth_018',
    type: 'truth',
    text: '¿Qué es lo más ilegal que has hecho?',
  },
  {
    id: 'truth_019',
    type: 'truth',
    text: '¿Has fingido un orgasmo?',
  },
  {
    id: 'truth_020',
    type: 'truth',
    text: '¿Cuál es tu fetiche sexual?',
  },

  // Verdades muy picantes
  {
    id: 'truth_021',
    type: 'truth',
    text: '¿Con quién de aquí te acostarías si tuvieras que elegir?',
  },
  {
    id: 'truth_022',
    type: 'truth',
    text: '¿Has tenido un trío? ¿Con quién?',
  },
  {
    id: 'truth_023',
    type: 'truth',
    text: '¿Cuántas personas hay en esta sala con las que te has liado?',
  },
  {
    id: 'truth_024',
    type: 'truth',
    text: '¿Has grabado alguna vez un vídeo sexual?',
  },
  {
    id: 'truth_025',
    type: 'truth',
    text: '¿Alguna vez has estado enamorado/a de dos personas a la vez?',
  },
  {
    id: 'truth_026',
    type: 'truth',
    text: '¿Cuál es la mentira más grande que has dicho a tu pareja?',
  },
  {
    id: 'truth_027',
    type: 'truth',
    text: '¿Has tenido sexo en un lugar público? ¿Dónde?',
  },
  {
    id: 'truth_028',
    type: 'truth',
    text: '¿Cuál es tu posición sexual favorita?',
  },
  {
    id: 'truth_029',
    type: 'truth',
    text: '¿Has hecho sexting con alguien de este grupo?',
  },
  {
    id: 'truth_030',
    type: 'truth',
    text: '¿Cuál es la cosa más pervertida que has pensado sobre alguien aquí?',
  },
];

// ============================================
// RETOS (30 desafíos)
// ============================================

export const dares: Challenge[] = [
  // Retos suaves/medios
  {
    id: 'dare_001',
    type: 'dare',
    text: 'Imita a alguien del grupo durante 1 minuto',
  },
  {
    id: 'dare_002',
    type: 'dare',
    text: 'Baila una canción elegida por el grupo',
  },
  {
    id: 'dare_003',
    type: 'dare',
    text: 'Cuenta un chiste (si nadie se ríe, bebes doble)',
  },
  {
    id: 'dare_004',
    type: 'dare',
    text: 'Haz 10 flexiones',
  },
  {
    id: 'dare_005',
    type: 'dare',
    text: 'Canta una canción completa en voz alta',
  },
  {
    id: 'dare_006',
    type: 'dare',
    text: 'Llama a tus padres y diles que los quieres (en altavoz)',
  },
  {
    id: 'dare_007',
    type: 'dare',
    text: 'Deja que alguien del grupo revise tus mensajes durante 1 minuto',
  },
  {
    id: 'dare_008',
    type: 'dare',
    text: 'Habla con acento extranjero durante 3 rondas',
  },
  {
    id: 'dare_009',
    type: 'dare',
    text: 'Haz una llamada de broma a alguien de tu agenda',
  },
  {
    id: 'dare_010',
    type: 'dare',
    text: 'Deja que el grupo escriba un estado en tus redes sociales',
  },

  // Retos picantes
  {
    id: 'dare_011',
    type: 'dare',
    text: 'Besa en la mejilla a la persona de tu derecha',
  },
  {
    id: 'dare_012',
    type: 'dare',
    text: 'Da un masaje de hombros de 30 segundos a quien elija el grupo',
  },
  {
    id: 'dare_013',
    type: 'dare',
    text: 'Envía un mensaje atrevido a alguien de tu agenda (el grupo elige)',
  },
  {
    id: 'dare_014',
    type: 'dare',
    text: 'Quítate una prenda de ropa (puede ser calcetines, bufanda...)',
  },
  {
    id: 'dare_015',
    type: 'dare',
    text: 'Baila de forma sensual 20 segundos',
  },
  {
    id: 'dare_016',
    type: 'dare',
    text: 'Siéntate en el regazo de alguien del grupo durante 2 rondas',
  },
  {
    id: 'dare_017',
    type: 'dare',
    text: 'Intercambia una prenda de ropa con alguien del grupo',
  },
  {
    id: 'dare_018',
    type: 'dare',
    text: 'Dale de comer algo a la persona de tu izquierda',
  },
  {
    id: 'dare_019',
    type: 'dare',
    text: 'Confiesa tu crush a alguien del grupo (puede ser broma)',
  },
  {
    id: 'dare_020',
    type: 'dare',
    text: 'Haz 15 abdominales mientras alguien te cuenta un chiste',
  },

  // Retos muy picantes
  {
    id: 'dare_021',
    type: 'dare',
    text: 'Besa a la persona de tu derecha en los labios (pico)',
  },
  {
    id: 'dare_022',
    type: 'dare',
    text: 'Chupito del ombligo de alguien del grupo',
  },
  {
    id: 'dare_023',
    type: 'dare',
    text: 'Baila pegado/a a alguien del grupo durante 30 segundos',
  },
  {
    id: 'dare_024',
    type: 'dare',
    text: 'Di 3 cosas que te gustan físicamente de alguien del grupo',
  },
  {
    id: 'dare_025',
    type: 'dare',
    text: 'Masaje en las piernas a quien elija el grupo (30 segundos)',
  },
  {
    id: 'dare_026',
    type: 'dare',
    text: 'Quítate la camiseta/blusa durante 3 rondas',
  },
  {
    id: 'dare_027',
    type: 'dare',
    text: 'Beso francés a quien elija el grupo (3 segundos)',
  },
  {
    id: 'dare_028',
    type: 'dare',
    text: 'Minuto en el armario/habitación a solas con alguien del grupo',
  },
  {
    id: 'dare_029',
    type: 'dare',
    text: 'Haz un striptease de 20 segundos (el grupo elige la música)',
  },
  {
    id: 'dare_030',
    type: 'dare',
    text: 'Body shot: alguien del grupo bebe un chupito de tu cuerpo',
  },
];

// ============================================
// FUNCIONES AUXILIARES
// ============================================

/**
 * Obtiene todas las verdades y retos combinados
 */
export const allChallenges: Challenge[] = [...truths, ...dares];

/**
 * Obtiene un challenge aleatorio (verdad o reto)
 */
export function getRandomChallenge(): Challenge {
  const randomIndex = Math.floor(Math.random() * allChallenges.length);
  return allChallenges[randomIndex];
}

/**
 * Obtiene una verdad aleatoria
 */
export function getRandomTruth(): Challenge {
  const randomIndex = Math.floor(Math.random() * truths.length);
  return truths[randomIndex];
}

/**
 * Obtiene un reto aleatorio
 */
export function getRandomDare(): Challenge {
  const randomIndex = Math.floor(Math.random() * dares.length);
  return dares[randomIndex];
}

/**
 * Obtiene N challenges aleatorios sin repetir
 */
export function getRandomChallenges(count: number): Challenge[] {
  const shuffled = [...allChallenges].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, Math.min(count, allChallenges.length));
}

/**
 * Estadísticas del banco
 */
export function getChallengeStats() {
  return {
    total: allChallenges.length,
    truths: truths.length,
    dares: dares.length,
  };
}
