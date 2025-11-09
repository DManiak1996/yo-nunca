/**
 * Sistema de Tipografía
 * Jerarquía consistente con las fuentes del proyecto
 */

export const typography = {
  // Familias de fuentes
  fontFamily: {
    display: 'BebasNeue_400Regular', // Títulos y encabezados
    body: 'Nunito_400Regular',       // Texto normal
    bodyBold: 'Nunito_700Bold',      // Texto en negrita
    bodyLight: 'Nunito_300Light',    // Texto ligero
  },

  // Tamaños de fuente
  fontSize: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
  },

  // Alturas de línea
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
    loose: 2,
  },

  // Pesos de fuente (para referencia)
  fontWeight: {
    light: '300',
    regular: '400',
    bold: '700',
  },
} as const;

export type TypographyToken = typeof typography;
