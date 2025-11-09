import { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

const AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : Platform.OS === 'android'
    ? 'ca-app-pub-XXXXXXXXXXXXX/XXXXXXXXXX' // Usuario debe reemplazar
    : 'ca-app-pub-XXXXXXXXXXXXX/XXXXXXXXXX';

const rewarded = RewardedAd.createForAdRequest(AD_UNIT_ID, {
  requestNonPersonalizedAdsOnly: false,
});

export function useRewardedAd(onRewarded: () => void) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => {
        setLoaded(true);
      }
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward:', reward);
        onRewarded();
      }
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      AdEventType.CLOSED,
      () => {
        setLoaded(false);
        rewarded.load();
      }
    );

    rewarded.load();

    return () => {
      unsubscribeLoaded();
      unsubscribeEarned();
      unsubscribeClosed();
    };
  }, [onRewarded]);

  const showAd = async () => {
    if (loaded) {
      try {
        await rewarded.show();
      } catch (error) {
        console.error('Error showing rewarded ad:', error);
      }
    }
  };

  return { loaded, showAd };
}
