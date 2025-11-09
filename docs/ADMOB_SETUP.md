# Configuración de Google AdMob

## Paso 1: Crear cuenta de AdMob

1. Ve a https://admob.google.com
2. Crea una cuenta con tu email de Google
3. Acepta los términos y condiciones

## Paso 2: Crear una aplicación

1. En el panel de AdMob, haz clic en "Apps" > "Add App"
2. Selecciona "Android"
3. Nombre de la app: "Yo Nunca"
4. Copia el **App ID** (formato: ca-app-pub-XXXXXXXXXXXXX~XXXXXXXXXX)

## Paso 3: Crear unidades de anuncios

### Banner Ad
1. Ve a "Ad units" > "Add ad unit" > "Banner"
2. Nombre: "Yo Nunca - Home Banner"
3. Copia el **Ad Unit ID**

### Interstitial Ad
1. Ve a "Ad units" > "Add ad unit" > "Interstitial"
2. Nombre: "Yo Nunca - Game Interstitial"
3. Copia el **Ad Unit ID**

### Rewarded Ad (opcional)
1. Ve a "Ad units" > "Add ad unit" > "Rewarded"
2. Nombre: "Yo Nunca - Stats Reward"
3. Copia el **Ad Unit ID**

## Paso 4: Actualizar el proyecto

### 1. Actualizar app.json
Reemplaza los IDs de TEST en `app.json`:

```json
{
  "expo": {
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "TU_APP_ID_AQUI",
          "iosAppId": "TU_IOS_APP_ID_AQUI"
        }
      ]
    ]
  }
}
```

### 2. Actualizar BannerAdComponent.tsx
Reemplaza el Ad Unit ID en `/src/components/BannerAdComponent.tsx`:

```typescript
const BANNER_AD_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : Platform.OS === 'android'
    ? 'TU_BANNER_AD_UNIT_ID_AQUI'
    : 'TU_IOS_BANNER_AD_UNIT_ID_AQUI';
```

### 3. Actualizar useInterstitialAd.ts
Reemplaza el Ad Unit ID en `/src/hooks/useInterstitialAd.ts`:

```typescript
const AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : Platform.OS === 'android'
    ? 'TU_INTERSTITIAL_AD_UNIT_ID_AQUI'
    : 'TU_IOS_INTERSTITIAL_AD_UNIT_ID_AQUI';
```

### 4. Actualizar useRewardedAd.ts
Reemplaza el Ad Unit ID en `/src/hooks/useRewardedAd.ts`:

```typescript
const AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : Platform.OS === 'android'
    ? 'TU_REWARDED_AD_UNIT_ID_AQUI'
    : 'TU_IOS_REWARDED_AD_UNIT_ID_AQUI';
```

## Paso 5: Testing

En modo desarrollo (`__DEV__ = true`), la app usará Test IDs de Google automáticamente.

Para testing en producción, usa el modo TEST de AdMob antes de publicar.

## Notas Importantes

- Los anuncios reales solo aparecen en builds de producción
- En desarrollo siempre verás anuncios de prueba
- Nunca hagas clic en tus propios anuncios (puede suspender tu cuenta)
- La monetización comienza cuando publiques la app en Play Store

## Proyección de Ingresos

Con 1,000 usuarios activos diarios, se estima:
- Ingresos mensuales: $260-$600 USD
- eCPM promedio: $2-$5 USD
- CTR esperado: 1-3%

## Soporte

Si necesitas ayuda, consulta la documentación oficial:
- https://developers.google.com/admob
- https://github.com/invertase/react-native-google-mobile-ads
