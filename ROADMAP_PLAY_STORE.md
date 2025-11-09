# 📱 Roadmap: Yo Nunca → Play Store Android

**Última actualización**: 9 de noviembre de 2025
**Objetivo**: Publicar app local (sin backend, sin multijugador) con monetización por anuncios

---

## 🎯 Resumen Ejecutivo

### Estado Actual
- **Código base**: 33,240 líneas (1,286 líneas de multijugador innecesarias)
- **Accesibilidad**: 0% TalkBack (crítico para Play Store)
- **Diseño Visual**: 5.5/10 (sin sistema de tokens)
- **Monetización**: No implementada
- **Tests**: 0 tests
- **Play Store Ready**: ❌ NO (2-3 semanas necesarias)

### Diagnóstico Global

| Aspecto | Puntuación | Estado |
|---------|-----------|---------|
| **Arquitectura** (Play Store focus) | 8.5/10 | ✅ CONTINUAR (con limpieza) |
| **UX/UI** (Accesibilidad) | 5.5/10 | ⚠️ REFACTORIZAR |
| **Diseño Visual** | 5.5/10 | ⚠️ MEJORAR (opcional) |
| **Monetización** | 0/10 | 🆕 IMPLEMENTAR |

---

## 🚀 Roadmap Simplificado (3 semanas)

### 📅 Semana 1: Limpieza y Fundamentos
**Prioridad**: CRÍTICA
**Tiempo estimado**: 2-3 días

#### 1.1 Eliminar Código Multijugador (1,286 líneas)
```bash
# Archivos a ELIMINAR completamente:
rm src/services/localServer.ts              # 286 líneas
rm src/services/localMultiplayer.ts         # 378 líneas
rm src/screens/LocalHostScreen.tsx          # 339 líneas
rm src/screens/LocalJoinScreen.tsx          # 283 líneas
```

**Refactorizar archivos existentes**:
- `CategorySelectionScreen.tsx`: Eliminar botones multijugador (líneas 62-114, 246-273)
- `AppNavigator.tsx`: Eliminar rutas multijugador (líneas 27-37, 138-146)
- `types/index.ts`: Eliminar LocalHost y LocalJoin de RootStackParamList

**Limpiar dependencias**:
```json
// package.json - ELIMINAR:
"react-native-tcp-socket": "^6.3.0"
"@react-native-community/netinfo": "^11.4.1"
```

#### 1.2 Implementar Accesibilidad CRÍTICA
**Por qué es crítico**: Google Play Store puede rechazar apps sin soporte TalkBack

**Componentes prioritarios**:
1. `CustomButton.tsx`: Añadir accessibilityLabel, accessibilityHint, accessibilityRole
2. `CustomInput.tsx`: Añadir accessibilityLabel para campos de texto
3. `PlayerCircle.tsx`: Describir estado del jugador para TalkBack
4. `CategoryCard.tsx`: Describir categoría e ícono

**Touch targets** (aumentar a 48dp mínimo):
```typescript
// CustomButton.tsx - ACTUALIZAR:
paddingVertical: 16,  // era 14
minHeight: 48,        // AÑADIR
```

**Tiempo estimado**: 1 día (Claude puede hacerlo en 2-3 horas)

#### 1.3 Configurar EAS Build para Play Store
```bash
# Instalar EAS CLI
npm install -g eas-cli

# Configurar proyecto
eas build:configure

# Crear build de producción (APK)
eas build --platform android --profile production
```

**Actualizar app.json**:
```json
{
  "expo": {
    "android": {
      "versionCode": 1,
      "package": "com.anonymous.yonunca",
      "permissions": ["ACCESS_NETWORK_STATE", "INTERNET"]
    }
  }
}
```

---

### 📅 Semana 2: Monetización y Optimización
**Prioridad**: ALTA
**Tiempo estimado**: 5-7 días

#### 2.1 Implementar AdMob (Monetización)
**Proyección de ingresos**: $260-$600/mes con 1,000 usuarios activos diarios

**Paso 1: Instalar dependencias**
```bash
npx expo install react-native-google-mobile-ads
```

**Paso 2: Configurar app.json**
```json
{
  "expo": {
    "plugins": [
      [
        "react-native-google-mobile-ads",
        {
          "androidAppId": "ca-app-pub-XXXXXXXXXXXXX~XXXXXXXXXX"
        }
      ]
    ]
  }
}
```

**Paso 3: Crear componentes de anuncios**

Crear `/src/components/BannerAdComponent.tsx`:
```typescript
import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import { BannerAd, BannerAdSize, TestIds } from 'react-native-google-mobile-ads';

const BANNER_AD_UNIT_ID = __DEV__
  ? TestIds.BANNER
  : 'ca-app-pub-XXXXXXXXXXXXX/XXXXXXXXXX';

export default function BannerAdComponent({ style }: { style?: any }) {
  return (
    <View style={[styles.container, style]}>
      <BannerAd
        unitId={BANNER_AD_UNIT_ID}
        size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER}
        requestOptions={{ requestNonPersonalizedAdsOnly: false }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
```

Crear `/src/hooks/useInterstitialAd.ts`:
```typescript
import { useEffect, useState } from 'react';
import { InterstitialAd, AdEventType, TestIds } from 'react-native-google-mobile-ads';
import { Platform } from 'react-native';

const AD_UNIT_ID = __DEV__
  ? TestIds.INTERSTITIAL
  : 'ca-app-pub-XXXXXXXXXXXXX/XXXXXXXXXX';

const interstitial = InterstitialAd.createForAdRequest(AD_UNIT_ID);

export function useInterstitialAd() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = interstitial.addAdEventListener(
      AdEventType.LOADED,
      () => setLoaded(true)
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
      await interstitial.show();
    }
  };

  return { loaded, showAd };
}
```

Crear `/src/hooks/useRewardedAd.ts`:
```typescript
import { useEffect, useState } from 'react';
import { RewardedAd, RewardedAdEventType, TestIds } from 'react-native-google-mobile-ads';

const AD_UNIT_ID = __DEV__
  ? TestIds.REWARDED
  : 'ca-app-pub-XXXXXXXXXXXXX/XXXXXXXXXX';

const rewarded = RewardedAd.createForAdRequest(AD_UNIT_ID);

export function useRewardedAd(onRewarded: () => void) {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const unsubscribeLoaded = rewarded.addAdEventListener(
      RewardedAdEventType.LOADED,
      () => setLoaded(true)
    );

    const unsubscribeEarned = rewarded.addAdEventListener(
      RewardedAdEventType.EARNED_REWARD,
      reward => {
        console.log('User earned reward:', reward);
        onRewarded();
      }
    );

    const unsubscribeClosed = rewarded.addAdEventListener(
      RewardedAdEventType.CLOSED,
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
      await rewarded.show();
    }
  };

  return { loaded, showAd };
}
```

**Paso 4: Integrar anuncios en pantallas**

Modificar `HomeScreen.tsx`:
```typescript
import BannerAdComponent from '../components/BannerAdComponent';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      {/* Contenido existente */}

      {/* Añadir banner al final */}
      <BannerAdComponent style={styles.adContainer} />
    </View>
  );
}

const styles = StyleSheet.create({
  // ... estilos existentes
  adContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
```

Modificar `GameScreenMultiplayer.tsx`:
```typescript
import { useInterstitialAd } from '../hooks/useInterstitialAd';

export default function GameScreenMultiplayer() {
  const { loaded, showAd } = useInterstitialAd();
  const [gamesPlayed, setGamesPlayed] = useState(0);

  const handleFinishGame = () => {
    const newCount = gamesPlayed + 1;
    setGamesPlayed(newCount);

    // Mostrar anuncio cada 2 juegos
    if (newCount % 2 === 0 && loaded) {
      showAd();
    }

    // ... resto de lógica
  };

  return (
    // ... JSX existente
  );
}
```

**Ubicaciones de anuncios recomendadas**:
1. **Banner**: HomeScreen, GameSelectionScreen (parte inferior)
2. **Intersticial**: Después de terminar cada 2 partidas
3. **Recompensa**: Desbloquear estadísticas premium en GlobalStatsScreen

#### 2.2 Actualizar Privacy Policy (CRÍTICO)
**Ubicación**: Publicar en web pública (ej: GitHub Pages)

**Añadir sección sobre anuncios**:
```markdown
## Publicidad

Esta aplicación utiliza Google AdMob para mostrar anuncios personalizados.
Google puede recopilar los siguientes datos:
- ID de publicidad (Advertising ID)
- Dirección IP
- Datos de uso de la aplicación

Para más información, consulta:
- Política de privacidad de Google: https://policies.google.com/privacy
- Cómo administrar tus anuncios: https://adssettings.google.com/

Puedes optar por no recibir anuncios personalizados en la configuración de tu dispositivo.
```

#### 2.3 Crear Onboarding Screen (Opcional pero recomendado)
**Beneficio**: +40% retención de usuarios

Crear `/src/screens/OnboardingScreen.tsx`:
```typescript
import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';

const { width } = Dimensions.get('window');

const STEPS = [
  {
    title: '¡Bienvenido a Yo Nunca!',
    description: 'El mejor juego de fiesta para conocer a tus amigos',
    icon: '🍺',
  },
  {
    title: 'Elige tu juego',
    description: 'Yo Nunca clásico, Hot, Atrevido o Extremo',
    icon: '🎮',
  },
  {
    title: 'Configura jugadores',
    description: 'Añade hasta 10 jugadores y personaliza sus avatares',
    icon: '👥',
  },
  {
    title: '¡A jugar!',
    description: 'Responde las preguntas y descubre secretos',
    icon: '🎉',
  },
];

export default function OnboardingScreen({ navigation }: any) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = async () => {
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    navigation.replace('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>{STEPS[currentStep].icon}</Text>
      <Text style={styles.title}>{STEPS[currentStep].title}</Text>
      <Text style={styles.description}>{STEPS[currentStep].description}</Text>

      <View style={styles.pagination}>
        {STEPS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentStep && styles.activeDot,
            ]}
          />
        ))}
      </View>

      <CustomButton
        onPress={handleNext}
        title={currentStep === STEPS.length - 1 ? 'Comenzar' : 'Siguiente'}
      />

      {currentStep > 0 && (
        <CustomButton
          onPress={() => setCurrentStep(currentStep - 1)}
          title="Atrás"
          variant="secondary"
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C1810',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'BebasNeue_400Regular',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    fontFamily: 'Nunito_400Regular',
    color: '#CCC',
    textAlign: 'center',
    marginBottom: 40,
  },
  pagination: {
    flexDirection: 'row',
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#666',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#FF6B35',
    width: 30,
  },
});
```

**Integrar en AppNavigator.tsx**:
```typescript
// Verificar onboarding en App.tsx o AppNavigator
const [onboardingCompleted, setOnboardingCompleted] = useState(false);

useEffect(() => {
  AsyncStorage.getItem('onboardingCompleted').then(value => {
    setOnboardingCompleted(value === 'true');
  });
}, []);

// Renderizar:
{onboardingCompleted ? <HomeScreen /> : <OnboardingScreen />}
```

---

### 📅 Semana 3: Testing y Publicación
**Prioridad**: MEDIA
**Tiempo estimado**: 3-4 días

#### 3.1 Testing Manual Completo
**Checklist**:
- [ ] Probar todos los modos de juego (Clásico, Hot, Atrevido, Extremo)
- [ ] Verificar configuración de jugadores (2-10 jugadores)
- [ ] Probar gestión de vidas (eliminar jugadores)
- [ ] Verificar estadísticas globales
- [ ] Probar anuncios en modo DEV (TestIds)
- [ ] Verificar onboarding en instalación limpia
- [ ] Probar accesibilidad con TalkBack activado
- [ ] Verificar rotación de pantalla (portrait lock)
- [ ] Probar en dispositivos de diferentes tamaños

#### 3.2 Optimización de APK
```bash
# Build de producción optimizado
eas build --platform android --profile production

# Verificar tamaño de APK (objetivo: <50MB)
# Google Play Store tiene límite de 150MB para APK
```

**Optimizaciones recomendadas**:
- Eliminar assets no utilizados
- Comprimir imágenes PNG/JPG
- Usar Hermes engine (ya activado en Expo 54)

#### 3.3 Crear Cuenta de Google Play Developer
**Costo**: $25 USD (pago único de por vida)

**Pasos**:
1. Ir a https://play.google.com/console
2. Pagar $25 USD con tarjeta de crédito
3. Completar perfil de desarrollador
4. Configurar cuenta de AdMob (https://admob.google.com)

#### 3.4 Preparar Assets de Play Store
**Requeridos**:
- [ ] Ícono de app (512x512 PNG)
- [ ] Feature Graphic (1024x500 PNG)
- [ ] Capturas de pantalla (mínimo 2, máximo 8)
- [ ] Video promocional (opcional)
- [ ] Descripción corta (80 caracteres)
- [ ] Descripción completa (4000 caracteres)

**Ejemplo de descripción corta**:
```
🍺 Yo Nunca - El mejor juego de fiesta para descubrir secretos con amigos
```

#### 3.5 Publicar en Play Store
**Pasos**:
1. Crear nueva aplicación en Google Play Console
2. Subir APK generado por EAS Build
3. Completar información de la app
4. Añadir Privacy Policy URL
5. Configurar categoría: "Casual" o "Party Games"
6. Establecer clasificación de contenido (PEGI 16+/18+)
7. Completar cuestionario de contenido para ads
8. Enviar para revisión (1-3 días)

---

## 🎨 Mejora Visual (OPCIONAL - Post-lanzamiento)
**Prioridad**: BAJA
**Tiempo estimado**: 17 horas (Claude puede hacerlo)

### ¿Puede Claude mejorar el diseño visual?
**Respuesta**: ✅ **SÍ, Claude puede implementar el 85-90% de las mejoras**

El agente de Visual Design ha creado un plan completo de implementación en:
```
/home/user/yo-nunca/VISUAL_DESIGN_EVALUATION_AND_IMPLEMENTATION_PLAN.md
```

### Mejoras incluidas:
1. **Sistema de Design Tokens** (3 horas)
   - Paleta de colores profesional con escala 50-900
   - Espaciado consistente (4, 8, 12, 16, 24, 32, 48, 64)
   - Tipografía estandarizada
   - Sombras y efectos reutilizables

2. **Refactorización de Componentes** (8 horas)
   - CustomButton con variantes consistentes
   - Modales unificados
   - Cards estandarizadas
   - Gradientes optimizados

3. **Responsive Design** (3 horas)
   - Utilidades de escala (scale, verticalScale, moderateScale)
   - Breakpoints para tablets
   - Touch targets adaptativos

4. **Animaciones y Transiciones** (3 horas)
   - Feedback visual consistente
   - Micro-interacciones
   - Transiciones suaves

**Recomendación**: Implementar DESPUÉS del lanzamiento en Play Store para no retrasar el MVP.

---

## 💰 Proyección de Monetización

### Escenario Conservador (1,000 DAU)
**Métricas estimadas**:
- Usuarios activos diarios: 1,000
- Impresiones de banner: 2,000/día
- Impresiones de intersticial: 500/día
- CTR promedio: 1.5%
- CPM: $0.50 - $1.50

**Ingresos estimados**:
- **Mensual**: $260 - $600 USD
- **Anual**: $3,120 - $7,200 USD

### Escenario Optimista (5,000 DAU)
**Ingresos estimados**:
- **Mensual**: $1,300 - $3,000 USD
- **Anual**: $15,600 - $36,000 USD

### Estrategias de Crecimiento
1. **Marketing orgánico**:
   - Compartir en redes sociales (Instagram, TikTok)
   - Botón de compartir dentro de la app
   - Pedir valoraciones en Play Store

2. **ASO (App Store Optimization)**:
   - Keywords: "yo nunca", "juego de fiesta", "juego para beber"
   - Capturas de pantalla atractivas
   - Descripción optimizada

3. **Monetización adicional**:
   - Versión PRO sin anuncios ($2.99)
   - Packs de preguntas premium
   - Temas visuales desbloqueables

---

## ✅ Checklist Final: Ready for Play Store

### Código
- [ ] Eliminar 1,286 líneas de código multijugador
- [ ] Limpiar dependencias innecesarias (tcp-socket, netinfo)
- [ ] Implementar accessibilityLabels en componentes críticos
- [ ] Aumentar touch targets a 48dp mínimo
- [ ] Integrar AdMob (banner + interstitial + rewarded)

### Configuración
- [ ] EAS Build configurado
- [ ] app.json con versionCode y permissions correctos
- [ ] AdMob plugin configurado en app.json
- [ ] Privacy Policy publicada en web

### Testing
- [ ] Probar todos los flujos de usuario
- [ ] Verificar anuncios con TestIds
- [ ] Probar con TalkBack activado
- [ ] Testing en múltiples dispositivos

### Play Store
- [ ] Cuenta de Google Play Developer ($25 USD)
- [ ] Cuenta de AdMob configurada
- [ ] Assets preparados (ícono, capturas, descripción)
- [ ] Clasificación de contenido completada
- [ ] APK optimizado (<50MB)

---

## 🎯 Priorización Recomendada

### HACER AHORA (Crítico para publicación):
1. ✅ Eliminar código multijugador (1 día)
2. ✅ Implementar accesibilidad básica (1 día)
3. ✅ Configurar EAS Build (2 horas)
4. ✅ Integrar AdMob (3-4 días)
5. ✅ Actualizar Privacy Policy (1 hora)
6. ✅ Testing manual completo (2 días)
7. ✅ Publicar en Play Store (1 día)

**Total**: 2-3 semanas

### HACER DESPUÉS (Post-lanzamiento):
1. 📊 Implementar analytics (Firebase, Amplitude)
2. 🎨 Mejoras de diseño visual con Claude (17 horas)
3. 🔔 Sistema de onboarding mejorado
4. 💎 Versión PRO sin anuncios
5. 📦 Packs de preguntas premium
6. 🧪 Tests automatizados (Jest, Detox)

### NO HACER (Fuera de alcance para v1.0):
- ❌ Backend / API REST
- ❌ Multijugador online
- ❌ Chat entre usuarios
- ❌ Rankings globales
- ❌ Sistema de cuentas/login

---

## 📞 Siguiente Paso Inmediato

**Acción recomendada**: Empezar con la limpieza del código multijugador

```bash
# Comando para Claude:
"Elimina todo el código relacionado con multijugador local:
- Borra archivos: localServer.ts, localMultiplayer.ts, LocalHostScreen.tsx, LocalJoinScreen.tsx
- Refactoriza CategorySelectionScreen.tsx para remover botones de multijugador
- Actualiza AppNavigator.tsx eliminando rutas de multijugador
- Limpia package.json de dependencias tcp-socket y netinfo
- Actualiza types/index.ts eliminando tipos LocalHost y LocalJoin"
```

**¿Quieres que Claude empiece con esta limpieza ahora?**

---

## 📚 Recursos Adicionales

### Documentación oficial:
- Expo EAS Build: https://docs.expo.dev/build/introduction/
- Google AdMob: https://developers.google.com/admob/android/quick-start
- Play Store Publishing: https://developer.android.com/distribute/console

### Herramientas útiles:
- AdMob Test IDs: https://developers.google.com/admob/android/test-ads
- Material Design (Accesibilidad): https://m3.material.io/foundations/accessible-design
- EAS Build Dashboard: https://expo.dev/accounts/[your-account]/projects/yo-nunca/builds

---

**Creado por**: Claude (Arquitectura + UX + Visual Design + Monetización)
**Versión**: 1.0.0
**Fecha**: 9 de noviembre de 2025
