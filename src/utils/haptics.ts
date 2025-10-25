/**
 * Utilidades para feedback háptico (vibración)
 * V3.0 - Mejora la experiencia con vibración táctil
 */

import { Vibration, Platform } from 'react-native';
import { getVibrationEnabled } from './storage';

export const HapticPatterns = {
  light: 10,                    // Tap ligero
  medium: 50,                   // Tap medio
  heavy: 100,                   // Tap fuerte
  success: [0, 50, 100, 50] as number[],    // Patrón de éxito
  warning: [0, 100, 50, 100] as number[],   // Patrón de advertencia
};

export type HapticType = keyof typeof HapticPatterns;

/**
 * Activa feedback háptico si está habilitado
 * @param type Tipo de vibración a realizar
 */
export async function triggerHaptic(type: HapticType) {
  try {
    // Verificar si vibración está habilitada
    const enabled = await getVibrationEnabled();
    if (!enabled) return;

    const pattern = HapticPatterns[type];

    if (Platform.OS === 'android') {
      if (Array.isArray(pattern)) {
        Vibration.vibrate(pattern);
      } else {
        Vibration.vibrate(pattern);
      }
    } else if (Platform.OS === 'ios') {
      // iOS solo soporta vibración simple
      if (Array.isArray(pattern)) {
        Vibration.vibrate();
      } else {
        Vibration.vibrate();
      }
    }
  } catch (error) {
    console.error('Error triggering haptic:', error);
  }
}
