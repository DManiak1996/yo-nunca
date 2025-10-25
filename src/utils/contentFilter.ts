/**
 * Filtro de contenido para frases personalizadas
 * Previene contenido ilegal, violento, abusivo o inapropiado
 */

/**
 * Lista de palabras y patrones prohibidos
 * Categorías: delitos, violencia, abuso, menores, no consentimiento
 */
const FORBIDDEN_PATTERNS = [
  // Violencia y abuso
  /violen(cia|to|ta)/i,
  /abuso/i,
  /abus[oa]/i,
  /golpe[aors]/i,
  /pegar/i,
  /maltr[ao]/i,
  /agr[ae]d/i,
  /agresi[oó]n/i,
  /tortur/i,
  /muert[eo]/i,
  /matar/i,
  /asesina/i,
  /lesion/i,
  /da[ñn]o físico/i,

  // Abuso sexual y no consentimiento
  /violar/i,
  /viola(ción|dor)/i,
  /forzar/i,
  /forzad[oa]/i,
  /obligar/i,
  /obligad[oa]/i,
  /sin (su )?consent/i,
  /contra (su )?voluntad/i,
  /drog(ar|ué)/i,
  /drogu[eé]/i,
  /abuso sexual/i,
  /acos[oó] sexual/i,
  /agresi[oó]n sexual/i,

  // Menores de edad
  /menor[ea]s? de edad/i,
  /ni[ñn][oa]s?/i,
  /beb[eé]s?/i,
  /infant/i,
  /adolescent/i,
  /joven[ea]s? (de )?(\d+)/i,
  /pedo[fp]/i,
  /menores/i,

  // Delitos graves
  /denunci/i,
  /polic[íi]a/i,
  /arrest/i,
  /detenid/i,
  /c[aá]rcel/i,
  /prisi[oó]n/i,
  /secuestr/i,
  /extorsi[oó]n/i,
  /chantaje/i,
  /amenaza (de muerte|con|con matar)/i,
  /amenazo con/i,

  // Contenido ilegal explícito
  /vend[ií] drogas/i,
  /tr[aá]fico de/i,
  /traficante/i,
  /conduc[íi] (bajo|con) (efectos|influencia)/i,
  /conduje borracho/i,
  /conduje drogado/i,
  /atropell/i,
  /accidente mortal/i,

  // Palabras clave de delitos
  /estafa/i,
  /robo (a mano armada|con violencia)/i,
  /atraco/i,
  /asalto/i,
  /allanamiento/i,

  // Compartir contenido sin consentimiento
  /sin (su )?permiso/i,
  /sin (que lo )?supiera/i,
  /(grab[eé]|film[eé]) (sin|a escondidas)/i,
  /comparti.+ (fotos|v[íi]deos|nudes).+ sin/i,
  /revenge porn/i,

  // Términos de violencia doméstica
  /violencia dom[ée]stica/i,
  /maltrato (dom[eé]stico|de pareja)/i,
  /violencia de g[eé]nero/i,
  /violencia machista/i,
];

/**
 * Palabras sospechosas que requieren contexto
 * Se bloquean si aparecen combinadas con ciertos verbos
 */
const SUSPICIOUS_WORDS = [
  'menor', 'niño', 'niña', 'bebé', 'adolescente',
  'violencia', 'golpe', 'pegar', 'maltratar',
  'violar', 'forzar', 'obligar', 'drogar',
  'denunciar', 'policía', 'cárcel', 'arrestar',
];

/**
 * Resultado de la validación de contenido
 */
export interface ContentFilterResult {
  allowed: boolean;
  reason?: string;
  matchedPattern?: string;
}

/**
 * Verifica si una frase contiene contenido prohibido
 * @param phrase - La frase a validar
 * @returns Resultado indicando si está permitida y por qué
 */
export function filterContent(phrase: string): ContentFilterResult {
  const normalizedPhrase = phrase.toLowerCase().trim();

  // Verificar patrones prohibidos
  for (const pattern of FORBIDDEN_PATTERNS) {
    if (pattern.test(normalizedPhrase)) {
      return {
        allowed: false,
        reason: 'Contenido prohibido: no se permiten referencias a violencia, abuso, delitos graves o menores de edad',
        matchedPattern: pattern.source,
      };
    }
  }

  // Verificar combinaciones sospechosas
  const hasSuspiciousWord = SUSPICIOUS_WORDS.some(word =>
    normalizedPhrase.includes(word.toLowerCase())
  );

  if (hasSuspiciousWord) {
    // Patrones de contexto problemático
    const problematicContexts = [
      /con (un |una )?(menor|niño|niña|bebé|adolescente)/i,
      /(menor|niño|niña|bebé|adolescente).+(sex|acost|bes|toc)/i,
      /(golpe|pegu[eé]|maltrat[eé]).+(pareja|novi[oa]|espos[oa])/i,
      /(forzar|obligar|drogar).+(sex|acost|bes)/i,
    ];

    for (const context of problematicContexts) {
      if (context.test(normalizedPhrase)) {
        return {
          allowed: false,
          reason: 'Contenido inapropiado: contexto problemático detectado',
          matchedPattern: context.source,
        };
      }
    }
  }

  // Verificar longitud mínima
  if (normalizedPhrase.length < 10) {
    return {
      allowed: false,
      reason: 'La frase es demasiado corta (mínimo 10 caracteres)',
    };
  }

  // Verificar que no sea solo números/símbolos
  if (!/[a-záéíóúñ]/i.test(normalizedPhrase)) {
    return {
      allowed: false,
      reason: 'La frase debe contener letras',
    };
  }

  return {
    allowed: true,
  };
}

/**
 * Mensaje de ayuda sobre qué contenido no está permitido
 */
export const CONTENT_POLICY_MESSAGE = `
📋 Política de contenido

❌ NO se permiten frases sobre:
• Violencia, abuso o maltrato
• Delitos graves (violación, secuestro, etc.)
• Menores de edad en contextos inapropiados
• Conductas sin consentimiento
• Contenido ilegal explícito

✅ SÍ se permiten frases sobre:
• Situaciones vergonzosas
• Experiencias sexuales consensuadas
• Infidelidades y secretos
• Consumo responsable de sustancias
• Mentiras y engaños (sin delitos)
`.trim();
