/**
 * Configuración de desarrollo
 * Controla features que requieren builds nativos
 */

/**
 * IMPORTANTE: AdMob NO funciona en Expo Go
 * Solo funciona en:
 * - Development Build (npx expo run:android)
 * - Preview Build (eas build --profile preview)
 * - Production Build (eas build --profile production)
 *
 * Mientras desarrollas UI/UX, mantén esto en false
 * y usa Expo Go para hot reload rápido
 */
export const DEV_CONFIG = {
  /**
   * Habilitar anuncios de AdMob
   *
   * false = No se muestran anuncios (para Expo Go)
   * true = Se muestran anuncios (requiere build nativo)
   */
  ENABLE_ADMOB: true,

  /**
   * Modo de desarrollo
   * En dev, puedes ver logs adicionales
   */
  IS_DEV: __DEV__,
};
