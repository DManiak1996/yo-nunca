# Bug Fix: AgeGate y Onboarding no se resetean correctamente

## Problema Original

### Síntomas
- **Primera instalación**: Pide confirmación de edad ✓ → SALTA onboarding ✗ → Home
- **Reinstalar app**: NO pide confirmación de edad ✗ → Home directo
- **Flujo esperado**: AgeGate → Onboarding → Home (primera vez)

### Causa raíz
AsyncStorage persiste entre desinstalaciones en modo desarrollo + errores en la lógica de navegación.

---

## Problemas Encontrados y Corregidos

### 1. AppNavigator.tsx - Carga condicional incorrecta de estados

**ANTES** (líneas 36-48):
```typescript
async function checkInitialState() {
  const verified = await isAgeVerified();
  setAgeVerified(verified);

  // Solo verificar onboarding si ya pasó la verificación de edad
  if (verified) {
    const completed = await AsyncStorage.getItem('onboardingCompleted');
    setOnboardingCompleted(completed === 'true');
  } else {
    setOnboardingCompleted(false); // No importa si no ha verificado edad
  }
}
```

**Problema**:
- Solo verifica `onboardingCompleted` SI `ageVerified` es `true`
- Establece `onboardingCompleted = false` arbitrariamente si no hay edad verificada
- No carga el estado real del onboarding en primera instalación

**DESPUÉS**:
```typescript
async function checkInitialState() {
  // Cargar AMBOS estados en paralelo, siempre
  const [verified, onboardingStatus] = await Promise.all([
    isAgeVerified(),
    AsyncStorage.getItem('onboardingCompleted'),
  ]);

  setAgeVerified(verified);
  setOnboardingCompleted(onboardingStatus === 'true');
}
```

**Mejoras**:
- ✅ Carga AMBOS estados SIEMPRE, sin condiciones
- ✅ Usa `Promise.all` para cargar en paralelo (más rápido)
- ✅ Lee el estado real de AsyncStorage

---

### 2. AppNavigator.tsx - Condición de loading incorrecta

**ANTES** (línea 51):
```typescript
if (ageVerified === null || (ageVerified && onboardingCompleted === null)) {
```

**Problema**:
- NO espera si `ageVerified = false` Y `onboardingCompleted = null`
- Podría renderizar antes de tener todos los datos

**DESPUÉS**:
```typescript
if (ageVerified === null || onboardingCompleted === null) {
```

**Mejoras**:
- ✅ Espera a que AMBOS estados estén cargados antes de renderizar

---

### 3. AgeGateScreen.tsx - Navegación incorrecta después de verificar edad

**ANTES** (línea 23):
```typescript
navigation.dispatch(
  CommonActions.reset({
    index: 0,
    routes: [{ name: 'Home' }], // ❌ SALTA el onboarding
  })
);
```

**Problema CRÍTICO**:
- Después de verificar edad, navega directamente a `'Home'`
- Bypasea completamente el Onboarding
- El usuario NUNCA ve el onboarding en primera instalación

**DESPUÉS**:
```typescript
navigation.dispatch(
  CommonActions.reset({
    index: 0,
    routes: [{ name: 'Onboarding' }], // ✅ Va a onboarding
  })
);
```

**Mejoras**:
- ✅ Navega a Onboarding después de verificar edad
- ✅ Respeta el flujo esperado: AgeGate → Onboarding → Home

---

## Flujo Corregido

### Primera instalación (todo vacío en AsyncStorage)
1. **Estado inicial**: `ageVerified = null`, `onboardingCompleted = null`
2. **Carga de datos**: Ambos estados se cargan en paralelo
3. **Resultado**: `ageVerified = false`, `onboardingCompleted = false`
4. **Navegación**: `getInitialRoute()` retorna `'AgeGate'`
5. **Usuario confirma edad** → Navega a `'Onboarding'`
6. **Usuario completa onboarding** → Navega a `'Home'`

### Usuario que ya verificó edad pero no vio onboarding
1. **Estado**: `ageVerified = true`, `onboardingCompleted = false`
2. **Navegación**: `getInitialRoute()` retorna `'Onboarding'`
3. **Usuario completa onboarding** → Navega a `'Home'`

### Usuario que completó todo
1. **Estado**: `ageVerified = true`, `onboardingCompleted = true`
2. **Navegación**: `getInitialRoute()` retorna `'Home'`

---

## Testing

### Utilidad de desarrollo creada

Se creó `/src/utils/resetAppState.ts` con funciones helper para testing:

```typescript
import { simulateFirstInstall, showAppState } from './utils/resetAppState';

// Ver estado actual
await showAppState();

// Simular primera instalación
await simulateFirstInstall();
// Reinicia la app → Verás: AgeGate → Onboarding → Home
```

### Comandos de testing disponibles

```typescript
// En consola de React Native Debugger o código temporal:

// 1. Resetear todo (simular primera instalación)
import { simulateFirstInstall } from './src/utils/resetAppState';
await simulateFirstInstall();

// 2. Ver estado actual
import { showAppState } from './src/utils/resetAppState';
await showAppState();

// 3. Simular usuario con edad verificada pero sin onboarding
import { simulateAgeVerifiedOnly } from './src/utils/resetAppState';
await simulateAgeVerifiedOnly();

// 4. Simular usuario que completó todo
import { simulateCompletedUser } from './src/utils/resetAppState';
await simulateCompletedUser();

// 5. Reset manual directo
import AsyncStorage from '@react-native-async-storage/async-storage';
await AsyncStorage.multiRemove(['ageVerified', 'onboardingCompleted']);
```

### Casos de prueba

1. **Primera instalación** ✅
   - Resetear: `simulateFirstInstall()`
   - Reiniciar app
   - Verificar: AgeGate → Onboarding → Home

2. **Reinstalación (AsyncStorage limpio)** ✅
   - Desinstalar app
   - Reinstalar
   - Verificar: AgeGate → Onboarding → Home

3. **Usuario existente** ✅
   - Simular: `simulateCompletedUser()`
   - Reiniciar app
   - Verificar: Home directo

4. **Usuario que solo verificó edad** ✅
   - Simular: `simulateAgeVerifiedOnly()`
   - Reiniciar app
   - Verificar: Onboarding → Home

---

## Archivos Modificados

1. `/home/user/yo-nunca/src/navigation/AppNavigator.tsx`
   - Corregida lógica de carga de estados
   - Corregida condición de loading

2. `/home/user/yo-nunca/src/screens/AgeGateScreen.tsx`
   - Corregida navegación después de verificar edad

3. `/home/user/yo-nunca/src/utils/resetAppState.ts` (NUEVO)
   - Utilidades de testing para desarrollo

---

## Resultado Esperado

✅ **Primera instalación**: AgeGate → Onboarding → Home
✅ **Ya verificó edad pero no vio onboarding**: Onboarding → Home
✅ **Ya completó todo**: Home directo
✅ **Reinstalación**: AgeGate → Onboarding → Home (si AsyncStorage se limpia)

---

## Notas

- AsyncStorage persiste entre desinstalaciones en modo desarrollo
- Para testing completo de "primera instalación", usar las utilidades de reseteo
- Los cambios NO afectan producción (AsyncStorage se limpia en reinstalaciones reales)
- NO se realizó commit según instrucciones
