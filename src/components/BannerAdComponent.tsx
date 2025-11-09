import React from 'react';
import { View, StyleSheet } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';
import { DEV_CONFIG } from '../config/devConfig';

interface BannerAdComponentProps {
  style?: any;
}

/**
 * Componente de Banner de AdMob
 *
 * IMPORTANTE: Solo funciona con ENABLE_ADMOB = true
 * En Expo Go, este componente retorna null
 */
export default function BannerAdComponent({ style }: BannerAdComponentProps) {
  // Si AdMob está deshabilitado (Expo Go), no renderizar nada
  if (!DEV_CONFIG.ENABLE_ADMOB) {
    return null;
  }

  // Usar Test ID de Google para desarrollo/testing
  const adUnitId = TestIds.BANNER;

  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={adUnitId}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
});
