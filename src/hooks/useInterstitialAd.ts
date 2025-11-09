import { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

const AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === 'android'
    ? 'ca-app-pub-XXXXXXXXXXXXX/XXXXXXXXXX' // Usuario debe reemplazar
    : 'ca-app-pub-XXXXXXXXXXXXX/XXXXXXXXXX';

const interstitial = InterstitialAd.createForAdRequest(AD_UNIT_ID, {
  requestNonPersonalizedAdsOnly: false,
});

export function useInterstitialAd() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    const unsubscribeClosed = interstitial.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        interstitial.load();
      }
    );

    interstitial.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeClosed();
    };
  }, []);

  const showAd = async () => {
    if (loaded) {
      try {
        await interstitial.show();
      } catch (error) {
        console.error('Error showing interstitial ad:', error);
      }
    }
  };

  return { loaded, showAd };
}
