import { useState, useEffect } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { DEV_CONFIG } from '../config/devConfig';

/**
 * Hook para anuncios intersticiales de AdMob
 *
 * IMPORTANTE: Solo funciona con ENABLE_ADMOB = true
 * En Expo Go, este hook retorna un mock que no hace nada
 */
export function useInterstitialAd() {
  const [loaded, setLoaded] = useState(false);
  const [interstitial, setInterstitial] = useState<InterstitialAd | null>(null);

  useEffect(() => {
    // Si AdMob está deshabilitado, no hacer nada
    if (!DEV_CONFIG.ENABLE_ADMOB) {
      return;
    }

    // Usar Test ID de Google para desarrollo/testing
    const adUnitId = TestIds.INTERSTITIAL;
    const ad = InterstitialAd.createForAdRequest(adUnitId, {
      requestNonPersonalizedAdsOnly: true,
    });

    const unsubscribeLoaded = ad.addAdEventListener(AdEventType.LOADED, () => {
      setLoaded(true);
    });

    const unsubscribeClosed = ad.addAdEventListener(AdEventType.CLOSED, () => {
      setLoaded(false);
      ad.load(); // Precargar el siguiente anuncio
    });

    ad.load();
    setInterstitial(ad);

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const showAd = async () => {
    // Si AdMob está deshabilitado, no hacer nada
    if (!DEV_CONFIG.ENABLE_ADMOB) {
      return;
    }

    if (loaded && interstitial) {
      interstitial.show();
    }
  };

  return { loaded, showAd };
}
