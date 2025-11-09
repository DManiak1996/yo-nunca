/**
 * Configuración de anuncios - Filosofía User-Friendly
 *
 * La app prioriza experiencia de usuario sobre monetización.
 * Los anuncios son discretos y poco frecuentes.
 */

export const ADS_CONFIG = {
  // Frecuencia de anuncios intersticiales
  INTERSTITIAL_FREQUENCY: 2, // Mostrar cada X juegos completados (aumentado de 4 a 2 para mayor monetización)

  // Habilitar/deshabilitar tipos de anuncios
  ENABLE_BANNER_ADS: true,
  ENABLE_INTERSTITIAL_ADS: true,
  ENABLE_REWARDED_ADS: false, // No implementado aún

  // Ubicaciones de banners
  BANNER_LOCATIONS: {
    HOME_SCREEN: true,
    GAME_SELECTION: false, // No mostrar en pantallas críticas
    STATS_SCREEN: false,
  },

  // Configuración de experiencia de usuario
  RESPECT_USER_EXPERIENCE: true,
  MIN_GAMEPLAY_TIME_BEFORE_AD: 120, // 2 minutos mínimo antes de mostrar intersticial
};

/**
 * Función para verificar si se debe mostrar un anuncio intersticial
 * @param gamesPlayed Número de juegos jugados
 * @param lastAdTimestamp Timestamp del último anuncio mostrado
 * @returns boolean
 */
export const shouldShowInterstitial = (
  gamesPlayed: number,
  lastAdTimestamp?: number
): boolean => {
  // Verificar frecuencia de juegos
  if (gamesPlayed % ADS_CONFIG.INTERSTITIAL_FREQUENCY !== 0) {
    return false;
  }

  // Verificar tiempo mínimo entre anuncios (opcional)
  if (lastAdTimestamp) {
    const timeSinceLastAd = Date.now() - lastAdTimestamp;
    const minTimeBetweenAds = ADS_CONFIG.MIN_GAMEPLAY_TIME_BEFORE_AD * 1000;

    if (timeSinceLastAd < minTimeBetweenAds) {
      return false; // Muy pronto para mostrar otro anuncio
    }
  }

  return ADS_CONFIG.ENABLE_INTERSTITIAL_ADS;
};
