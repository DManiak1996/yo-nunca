# 🚀 Desarrollo con Expo Go (Sin AdMob)

## ❌ Problema

AdMob **NO funciona en Expo Go** porque requiere código nativo. Si intentas ejecutar la app con el plugin de AdMob habilitado en Expo Go, obtendrás este error:

```
PluginError: Failed to resolve plugin for module "react-native-google-mobile-ads"
```

## ✅ Solución Implementada

He configurado la app para que puedas desarrollar con **Expo Go** (hot reload rápido) **SIN** tener que compilar builds nativos cada vez.

### Cómo funciona:

1. **Flag de desarrollo**: `src/config/devConfig.ts`
   ```typescript
   export const DEV_CONFIG = {
     ENABLE_ADMOB: false,  // false = Expo Go OK
   };
   ```

2. **Imports condicionales**: Los componentes de AdMob solo se importan si `ENABLE_ADMOB = true`

3. **Plugin deshabilitado**: El plugin de AdMob en `app.json` está comentado

## 🎮 Cómo Desarrollar (Dos Modos)

### Modo 1: Expo Go (UI/UX Development) - RÁPIDO ⚡

**Usa esto para:**
- Desarrollar UI/UX
- Testear flujos de juego
- Ver cambios de diseño visual
- Hot reload instantáneo

**Pasos:**

1. **Asegúrate de que AdMob esté deshabilitado:**
   ```typescript
   // src/config/devConfig.ts
   ENABLE_ADMOB: false  ✅
   ```

2. **Inicia Expo Go:**
   ```bash
   npx expo start
   ```

3. **Escanea el QR** con Expo Go en tu móvil

**Qué funciona:**
- ✅ Todo el juego (UI, navegación, lógica)
- ✅ Design system (colores, tipografía, espaciado)
- ✅ Animaciones
- ✅ Estadísticas
- ❌ **NO** verás anuncios (normal, AdMob deshabilitado)

---

### Modo 2: Development Build (Testear AdMob) - LENTO 🐢

**Usa esto para:**
- Testear AdMob (banners, intersticiales)
- Ver cómo se ven los anuncios reales
- Testing pre-producción

**Pasos:**

1. **Habilita AdMob:**
   ```typescript
   // src/config/devConfig.ts
   ENABLE_ADMOB: true  ✅
   ```

2. **Habilita el plugin en app.json:**
   ```json
   "plugins": [
     [
       "react-native-google-mobile-ads",
       {
         "androidAppId": "ca-app-pub-3940256099942544~3347511713",
         "iosAppId": "ca-app-pub-3940256099942544~1458002511"
       }
     ]
   ]
   ```

3. **Instala Java JDK** (si no lo tienes):
   - Descarga: https://www.oracle.com/java/technologies/downloads/#java17
   - Configura JAVA_HOME en variables de entorno de Windows

4. **Crea un development build:**
   ```bash
   npx expo prebuild --clean
   npx expo run:android
   ```
   ⚠️ Esto tarda ~5-10 minutos la primera vez

**Qué funciona:**
- ✅ Todo del Modo 1
- ✅ **SÍ** verás anuncios (Test Ads de Google)

---

## 📋 Workflow Recomendado

### Desarrollo diario (90% del tiempo):
```bash
# AdMob deshabilitado, Expo Go
npx expo start
```
- Cambios instantáneos con hot reload
- Desarrollo rápido de UI/UX
- Sin esperas de compilación

### Testing de anuncios (10% del tiempo):
```bash
# AdMob habilitado, build nativo
npx expo run:android
```
- Ver cómo se ven los anuncios
- Testear frecuencia de intersticiales
- Verificar antes de publicar

---

## 🔄 Cambiar Entre Modos

### Expo Go → Development Build:

1. Cambia `ENABLE_ADMOB: true` en `src/config/devConfig.ts`
2. Descomenta plugin en `app.json`
3. `npx expo prebuild --clean`
4. `npx expo run:android`

### Development Build → Expo Go:

1. Cambia `ENABLE_ADMOB: false` en `src/config/devConfig.ts`
2. Comenta plugin en `app.json` (pon `"plugins": []`)
3. `npx expo start`

---

## ⚠️ Errores Comunes

### Error: "Failed to resolve plugin for module react-native-google-mobile-ads"
**Causa:** Tienes el plugin de AdMob habilitado en `app.json` pero estás usando Expo Go

**Solución:**
```json
// app.json
"plugins": []  // Deja vacío para Expo Go
```

### Error: "JAVA_HOME is not set"
**Causa:** No tienes Java instalado o configurado

**Solución:**
1. Instala Java JDK 17+
2. Configura JAVA_HOME en Windows:
   - Panel de Control → Sistema → Variables de entorno
   - Nueva variable: `JAVA_HOME = C:\Program Files\Java\jdk-17`
   - Edita `Path` y añade: `%JAVA_HOME%\bin`

### La app no muestra anuncios en Expo Go
**Causa:** AdMob NO funciona en Expo Go (es esperado)

**Solución:** Usa Development Build si necesitas ver anuncios

---

## 📝 Resumen Rápido

| Feature | Expo Go | Development Build |
|---------|---------|-------------------|
| Hot Reload | ✅ Instantáneo | ❌ Reinicio completo |
| Tiempo de inicio | ⚡ 10 segundos | 🐢 5-10 minutos |
| AdMob (anuncios) | ❌ No funciona | ✅ Funciona |
| UI/UX/Lógica | ✅ Funciona | ✅ Funciona |
| Requiere Java | ❌ No | ✅ Sí |
| Uso recomendado | Desarrollo diario | Testing pre-launch |

---

## 🚀 Próximos Pasos

### Para publicar en Play Store:

1. **Testea todo en Expo Go** (UI/UX, flujos, diseño)
2. **Cambia a Development Build** con AdMob habilitado
3. **Verifica anuncios** (frecuencia, posición, UX)
4. **Crea Production Build:**
   ```bash
   eas build --platform android --profile production
   ```
5. **Publica en Play Store**

Ver [docs/PLAY_STORE_CHECKLIST.md](docs/PLAY_STORE_CHECKLIST.md) para guía completa.

---

**Última actualización:** Noviembre 2025
