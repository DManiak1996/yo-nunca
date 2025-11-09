# 📱 YO NUNCA V3.0 - PLAN DE DEPLOYMENT A PRODUCCIÓN

**Fecha:** 2025-10-25
**Estado actual:** App lista para producción en Expo Go (sin multiplayer)
**Versión:** 2.1 → 3.0

---

## 🎯 ESTADO ACTUAL DEL PROYECTO

### ✅ Features Completadas y Funcionando (Expo Go)

#### FASE A - Modos de Juego Alternativos
- ✅ Modo Normal (clásico con tragos)
- ✅ Modo Detectives (votación + tragos por fallos)
- ✅ Toggle en CategorySelectionScreen
- ✅ GameScreenDetectives con sistema de votación
- ✅ Animaciones de transición entre rondas (BeerTransitionAnimation)

#### FASE B - Gestión de Partidas
- ✅ Guardar partidas en AsyncStorage
- ✅ Cargar partidas guardadas desde HomeScreen
- ✅ Autoguardado cada 3 rondas
- ✅ Modal de confirmación para salir
- ✅ Botón de volver a jugar

#### FASE C - Personalización
- ✅ Frases personalizadas en CustomPhrasesScreen
- ✅ Filtro de contenido prohibido (violencia, abuso, menores)
- ✅ AsyncStorage para persistencia de custom phrases
- ✅ Validación con 30+ patrones regex
- ✅ Integración en todas las dificultades

#### Responsive Design
- ✅ Utilidad responsive.ts (scale, verticalScale, moderateScale)
- ✅ Todas las pantallas responsive (iPhone 15, Android 1080x2400)
- ✅ isSmallDevice() para ajustes específicos

#### Limpieza de Contenido
- ✅ 26 frases inapropiadas eliminadas de la base de datos
- ✅ Política de contenido documentada
- ✅ Filtro preventivo para custom phrases

---

### 🚧 FASE D - Multiplayer Local (IMPLEMENTADA pero REQUIERE DEVELOPMENT BUILD)

**⚠️ BLOQUEADOR:** react-native-tcp-socket NO funciona en Expo Go

#### Código Implementado (comentado temporalmente)
- ✅ `src/services/localServer.ts` - Servidor TCP en dispositivo host
- ✅ `src/services/localMultiplayer.ts` - Capa de coordinación
- ✅ `src/screens/LocalHostScreen.tsx` - Lobby del host (con código numérico grande)
- ✅ `src/screens/LocalJoinScreen.tsx` - Pantalla de cliente (entrada manual)
- ✅ Botones en CategorySelectionScreen (comentados en líneas 284-307)
- ✅ Rutas en AppNavigator.tsx
- ✅ Tipos en types/index.ts

#### Arquitectura Multiplayer
- **100% Local:** Servidor TCP corre en el dispositivo del host
- **Puerto:** 8080
- **Protocolo:** TCP sockets con mensajes JSON
- **Privacidad:** Sin cloud, todo en red local (192.168.x.x)
- **Código de sala:** 6 dígitos numéricos
- **IP manual:** Host comparte IP + código

#### QR Codes (futuro)
- ❌ react-native-qrcode-svg NO funciona en Expo Go
- 📝 TODOs documentados en LocalHostScreen.tsx y LocalJoinScreen.tsx
- 🔮 Implementar en Development Build

---

## 🚀 PLAN DE PRODUCCIÓN - PRÓXIMOS PASOS

### PASO 1: Crear Development Build (EAS Build)

**⚠️ PREREQUISITO:** Los Development Builds permiten usar módulos nativos personalizados que Expo Go no soporta.

#### 1.1 Instalar EAS CLI
```bash
npm install -g eas-cli
eas login
```

#### 1.2 Configurar EAS Build
```bash
eas build:configure
```

Esto creará `eas.json` con configuración de builds.

#### 1.3 Configurar app.json
Asegurarse de que `app.json` tiene:
```json
{
  "expo": {
    "name": "Yo Nunca",
    "slug": "yo-nunca",
    "version": "3.0.0",
    "ios": {
      "bundleIdentifier": "com.yourcompany.yonunca",
      "buildNumber": "1"
    },
    "android": {
      "package": "com.yourcompany.yonunca",
      "versionCode": 1
    }
  }
}
```

#### 1.4 Crear Development Build

**Para iOS:**
```bash
eas build --profile development --platform ios
```

**Para Android:**
```bash
eas build --profile development --platform android
```

**Ambos:**
```bash
eas build --profile development --platform all
```

⏱️ **Tiempo estimado:** 10-20 minutos por plataforma

#### 1.5 Instalar Development Build

**Android:**
- Descargar APK directamente desde link del build
- Instalar en dispositivo (activar "Fuentes desconocidas")
- **Gratis** ✅

**iOS:**
- ⚠️ **Requiere Apple Developer Account** ($99/año)
- Build se sube automáticamente a TestFlight
- Instalar app TestFlight desde App Store
- Recibir invitación y descargar desde TestFlight

**iOS sin Apple Developer:**
- Usar Expo Go para testear (sin módulos nativos como TCP)
- Solo para testing de UI/UX, no multiplayer

#### 1.6 Ejecutar con Development Build
```bash
npx expo start --dev-client
```

---

### PASO 1.7: Development Build para iOS (OPCIONAL)

**⚠️ PREREQUISITOS:**
- Apple Developer Account ($99/año) - https://developer.apple.com
- Dispositivo iOS registrado

**Comandos:**
```bash
# Registrar dispositivo iOS (abre link en iPhone)
eas device:create

# Crear build iOS
eas build --profile development --platform ios

# EAS pedirá:
# - Login con Apple ID
# - Generar certificados automáticamente (responder Y)
# - Registrar dispositivo

# Subir a TestFlight
eas submit --platform ios
```

**En tu iPhone:**
1. Descargar app "TestFlight" desde App Store
2. Esperar invitación por email (5-30 minutos)
3. Abrir invitación y descargar build

**Tiempo estimado:** 20-40 minutos (primera vez)

---

### PASO 2: Habilitar Multiplayer Local

Una vez tengas el Development Build funcionando:

#### 2.1 Descomentar UI de Multiplayer

**En `src/screens/CategorySelectionScreen.tsx` líneas 284-307:**
```tsx
{/* TODO PRODUCCIÓN: Descomentar cuando se cree Development Build */}
<View style={styles.multiplayerSection}>
  <Text style={[styles.multiplayerTitle, { color: theme.text }]}>
    🌐 Modo Multijugador Local
  </Text>
  {/* ... resto del código */}
</View>
```

**En `src/navigation/AppNavigator.tsx` líneas 19-21 y 105-114:**
```tsx
// TODO PRODUCCIÓN: Descomentar cuando se cree Development Build
import LocalHostScreen from '../screens/LocalHostScreen';
import LocalJoinScreen from '../screens/LocalJoinScreen';

// Y descomentar las rutas:
<Stack.Screen
  name="LocalHost"
  component={LocalHostScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="LocalJoin"
  component={LocalJoinScreen}
  options={{ headerShown: false }}
/>
```

#### 2.2 Reinstalar Dependencias Nativas

**⚠️ IMPORTANTE:** Las dependencias nativas fueron desinstaladas temporalmente para permitir testing en Expo Go.

```bash
npm install react-native-tcp-socket@^6.3.0
npx expo install @react-native-community/netinfo
```

Verificar instalación:
```bash
npm list react-native-tcp-socket
npm list @react-native-community/netinfo
```

#### 2.3 Rebuild Development Build
```bash
eas build --profile development --platform all
```

#### 2.4 Testear Multiplayer
1. Instalar Development Build en 2+ dispositivos
2. Conectar todos al mismo WiFi
3. Device 1: "Crear Sala" → obtener código + IP
4. Device 2+: "Unirse a Sala" → introducir código + IP
5. Host inicia partida → todos navegan a GameDetectives

---

### PASO 3: Implementar QR Codes (Opcional)

#### 3.1 Instalar Librerías QR
```bash
npx expo install react-native-qrcode-svg expo-camera
```

#### 3.2 Actualizar LocalHostScreen.tsx
Descomentar TODOs en líneas **7-10** y restaurar código QR:
```tsx
import QRCode from 'react-native-qrcode-svg';

const qrData = JSON.stringify({
  code: roomInfo.code,
  ip: roomInfo.hostIP,
  port: roomInfo.port,
  host: hostName,
});

<QRCode
  value={qrData}
  size={moderateScale(200)}
  backgroundColor="white"
  color="black"
/>
```

#### 3.3 Actualizar LocalJoinScreen.tsx
Descomentar TODOs en líneas **7-10** y añadir escáner QR:
```tsx
import { Camera } from 'expo-camera';

// Implementar handleScanQR con Camera
```

#### 3.4 Rebuild
```bash
eas build --profile development --platform all
```

---

### PASO 4: Preparar Preview/Production Builds

#### 4.1 Preview Build (Testing Interno)
```bash
eas build --profile preview --platform all
```

Compartir con testers vía:
- iOS: TestFlight
- Android: APK directo o Google Play Internal Testing

#### 4.2 Production Build (Release)
```bash
eas build --profile production --platform all
```

#### 4.3 App Store Submission
**iOS:**
```bash
eas submit --platform ios
```

**Android:**
```bash
eas submit --platform android
```

---

## 📋 CHECKLIST DE PRODUCCIÓN

### Pre-Build
- [ ] Actualizar `version` en app.json a "3.0.0"
- [ ] Incrementar `buildNumber` (iOS) y `versionCode` (Android)
- [ ] Revisar `bundleIdentifier` y `package` únicos
- [ ] Configurar iconos y splash screen finales
- [ ] Revisar políticas de privacidad (sin tracking, 100% local)
- [ ] Limpiar console.logs innecesarios

### Testing
- [ ] Testear todos los flujos en Development Build
- [ ] Probar multiplayer con 2+ dispositivos reales
- [ ] Verificar persistencia de partidas
- [ ] Testear custom phrases + filtro de contenido
- [ ] Probar ambos modos (Normal y Detectives)
- [ ] Testear responsive en diferentes tamaños de pantalla
- [ ] Verificar animaciones de transición

### Deployment
- [ ] Crear Development Build (iOS + Android)
- [ ] Testear multiplayer local
- [ ] (Opcional) Implementar QR codes
- [ ] Crear Preview Build
- [ ] Testing interno completo
- [ ] Crear Production Build
- [ ] Submit a App Store
- [ ] Submit a Google Play

---

## 🔧 TROUBLESHOOTING

### Error: "Native module doesn't exist" en Expo Go
**Solución:** Crear Development Build. Expo Go NO soporta módulos nativos custom.

### Multiplayer no conecta
- Verificar que ambos dispositivos están en el mismo WiFi
- Revisar firewall del dispositivo host
- Confirmar que IP es correcta (192.168.x.x)
- Probar con Hotspot Personal si WiFi no funciona

### QR Code no funciona
- Verificar que react-native-qrcode-svg está instalado
- Confirmar que estás usando Development Build (no Expo Go)
- Rebuild después de instalar dependencias

### TypeScript errors
```bash
npx tsc --noEmit
```
Debe ejecutarse sin errores antes de hacer build.

---

## 📦 DEPENDENCIAS CRÍTICAS PARA PRODUCCIÓN

```json
{
  "react-native-tcp-socket": "^6.2.0",  // ⚠️ Requiere Development Build
  "@react-native-community/netinfo": "~11.4.1",
  "react-native-qrcode-svg": "^6.3.11",  // ⚠️ Requiere Development Build (opcional)
  "react-native-svg": "15.8.0",  // ✅ Funciona en Expo Go
  "@react-native-async-storage/async-storage": "2.1.0"
}
```

---

## 📚 RECURSOS ÚTILES

- [EAS Build Documentation](https://docs.expo.dev/build/introduction/)
- [Development Builds](https://docs.expo.dev/development/introduction/)
- [App Store Submission](https://docs.expo.dev/submit/ios/)
- [Google Play Submission](https://docs.expo.dev/submit/android/)
- [react-native-tcp-socket Docs](https://github.com/Rapsssito/react-native-tcp-socket)

---

## 🎮 ARQUITECTURA MULTIPLAYER - REFERENCIA TÉCNICA

### Servidor TCP (Host)
- **Archivo:** `src/services/localServer.ts`
- **Puerto:** 8080 (configurable)
- **Protocolo:** TCP con mensajes JSON delimitados por `\n`
- **Clase:** `LocalServer` (singleton)
- **Métodos clave:**
  - `start(port)` - Inicia servidor
  - `broadcast(message)` - Envía a todos los clientes
  - `handleClientMessage(message, clientId)` - Procesa mensajes entrantes

### Cliente TCP
- **Archivo:** `src/services/localMultiplayer.ts`
- **Clase:** `LocalMultiplayerService` (singleton)
- **Métodos clave:**
  - `startHost(hostName)` - Inicia servidor + devuelve RoomInfo
  - `joinRoom(ip, port, code, name)` - Conecta como cliente
  - `sendMessage(message)` - Envía mensaje al servidor
  - `onMessage(type, callback)` - Handler de mensajes

### Tipos de Mensajes
```typescript
type NetworkMessageType =
  | 'PLAYER_JOIN'      // Cliente → Host: nuevo jugador
  | 'PLAYER_LEAVE'     // Cliente → Host: jugador se va
  | 'GAME_START'       // Host → Clientes: iniciar partida
  | 'ROUND_START'      // Host → Clientes: nueva ronda
  | 'VOTE_CAST'        // Cliente → Host: voto emitido
  | 'ROUND_END'        // Host → Clientes: resultados ronda
  | 'GAME_END';        // Host → Clientes: fin de partida
```

### Flow de Conexión
1. Host ejecuta `LocalMultiplayer.startHost('Juan')`
2. Se inicia servidor TCP en 0.0.0.0:8080
3. Se obtiene IP local vía NetInfo (192.168.x.x)
4. Se genera código de 6 dígitos
5. Se muestra QR/código + IP en LocalHostScreen
6. Cliente ejecuta `LocalMultiplayer.joinRoom('192.168.1.45', 8080, '123456', 'María')`
7. Cliente envía `PLAYER_JOIN` con su nombre
8. Host recibe mensaje, añade a lista de jugadores
9. Host hace broadcast de lista actualizada
10. Cliente espera mensaje `GAME_START`
11. Host hace clic en "Iniciar Partida"
12. Todos navegan a GameDetectives

---

## 🔐 PRIVACIDAD Y GDPR

### Datos Locales (100% privado)
- Partidas guardadas: AsyncStorage local
- Custom phrases: AsyncStorage local
- Conexiones TCP: Red local (192.168.x.x)
- **Sin servidores externos**
- **Sin tracking**
- **Sin analytics de terceros**

### Declaración de Privacidad
```
Esta aplicación NO recopila, almacena ni comparte datos personales.
Toda la información se guarda localmente en tu dispositivo.
El modo multijugador funciona 100% en tu red local sin conectarse a Internet.
```

---

## 📝 NOTAS FINALES

### Estado del Código
- ✅ TypeScript compila sin errores
- ✅ ESLint clean
- ✅ Responsive design implementado
- ✅ Animaciones optimizadas
- ✅ Contenido apropiado (26 frases eliminadas)
- ✅ Filtro de contenido activo

### Comentarios en el Código
Todos los archivos de multiplayer tienen TODOs claramente marcados:
- `src/screens/LocalHostScreen.tsx` líneas 7-10
- `src/screens/LocalJoinScreen.tsx` líneas 7-10
- `src/screens/CategorySelectionScreen.tsx` líneas 281-283
- `src/components/BeerTransitionAnimation.tsx` (mantiene SVG para animaciones)

### Próxima Sesión - Comenzar con:
```bash
# 1. Instalar EAS CLI
npm install -g eas-cli

# 2. Login
eas login

# 3. Configurar proyecto
eas build:configure

# 4. Crear primer Development Build
eas build --profile development --platform android  # Más rápido para probar
```

---

**¡Listo para producción!** 🚀
