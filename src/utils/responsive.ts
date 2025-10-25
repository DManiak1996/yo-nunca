/**
 * Utilidades para diseño responsive
 * Escala automáticamente tamaños según el dispositivo
 */

import { Dimensions, Platform, PixelRatio } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

// Dimensiones base (diseño basado en iPhone 15)
const BASE_WIDTH = 393; // iPhone 15 width
const BASE_HEIGHT = 852; // iPhone 15 height

/**
 * Escala horizontal basada en el ancho de pantalla
 * Usa esto para: margins, paddings horizontales, anchos
 */
export const scale = (size: number): number => {
  const ratio = SCREEN_WIDTH / BASE_WIDTH;
  // Si la pantalla es más grande, limitar el crecimiento al 90%
  const adjustedRatio = ratio > 1 ? 1 + (ratio - 1) * 0.9 : ratio;
  return Math.round(PixelRatio.roundToNearestPixel(size * adjustedRatio));
};

/**
 * Escala vertical basada en la altura de pantalla
 * Usa esto para: heights, paddings verticales, margins verticales
 */
export const verticalScale = (size: number): number => {
  const ratio = SCREEN_HEIGHT / BASE_HEIGHT;
  // Si la pantalla es más grande, limitar el crecimiento al 90%
  const adjustedRatio = ratio > 1 ? 1 + (ratio - 1) * 0.9 : ratio;
  return Math.round(PixelRatio.roundToNearestPixel(size * adjustedRatio));
};

/**
 * Escala moderada (promedio entre horizontal y vertical)
 * Usa esto para: font sizes, border radius, icon sizes
 * El factor controla cuánto escalar (0 = nada, 1 = completo)
 */
export const moderateScale = (size: number, factor: number = 0.3): number => {
  const ratio = SCREEN_WIDTH / BASE_WIDTH;
  // Si es más grande que base, reducir agresivamente
  const adjustedRatio = ratio > 1 ? 1 + (ratio - 1) * 0.6 : ratio;
  return Math.round(PixelRatio.roundToNearestPixel(size + (adjustedRatio - 1) * size * factor));
};

/**
 * Verifica si el dispositivo es "pequeño" (iPhone SE, etc)
 */
export const isSmallDevice = (): boolean => {
  return SCREEN_HEIGHT < 700;
};

/**
 * Verifica si el dispositivo es "extra pequeño" (muy compacto)
 */
export const isTinyDevice = (): boolean => {
  return SCREEN_HEIGHT < 600 || SCREEN_WIDTH < 350;
};

/**
 * Obtiene un valor escalado según el tamaño del dispositivo
 * @param normal - Valor para dispositivos normales
 * @param small - Valor para dispositivos pequeños (opcional)
 * @param tiny - Valor para dispositivos muy pequeños (opcional)
 */
export const responsiveSize = (
  normal: number,
  small?: number,
  tiny?: number
): number => {
  if (isTinyDevice() && tiny !== undefined) {
    return tiny;
  }
  if (isSmallDevice() && small !== undefined) {
    return small;
  }
  return normal;
};

// Exportar dimensiones de pantalla
export const screenWidth = SCREEN_WIDTH;
export const screenHeight = SCREEN_HEIGHT;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
