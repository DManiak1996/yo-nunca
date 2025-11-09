/**
 * Design System - Punto de entrada centralizado
 * Importa todos los tokens en un solo lugar
 */

export { colors } from './colors';
export { spacing } from './spacing';
export { typography } from './typography';
export { shadows } from './shadows';
export { borderRadius } from './borderRadius';

export type { ColorToken } from './colors';
export type { SpacingToken } from './spacing';
export type { TypographyToken } from './typography';
export type { ShadowToken } from './shadows';
export type { BorderRadiusToken } from './borderRadius';

// Exportación combinada para facilidad de uso
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';
import { shadows } from './shadows';
import { borderRadius } from './borderRadius';

export const tokens = {
  colors,
  spacing,
  typography,
  shadows,
  borderRadius,
};
