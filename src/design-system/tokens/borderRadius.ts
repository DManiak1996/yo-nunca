/**
 * Sistema de Border Radius
 * Consistencia en redondeo de esquinas
 */

export const borderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 24,
  full: 9999, // Para círculos perfectos
} as const;

export type BorderRadiusToken = keyof typeof borderRadius;
