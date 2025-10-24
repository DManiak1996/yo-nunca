# 🎯 IDEAS SELECCIONADAS PARA YO NUNCA V3.0

**Fecha:** 2025-10-24
**Estado actual:** V2.1 completada (multijugador, categorías, 240 frases, estadísticas)
**Objetivo:** Implementar features seleccionadas antes de pasar a producción

---

## 📋 RESUMEN DE IDEAS SELECCIONADAS

Total de ideas: **6 features principales**
Tiempo estimado total: **~25-30 horas** (2-3 semanas de trabajo)
Complejidad: **Media-Alta** (incluye modo multiplayer local)

---

## 🟢 QUICK WINS SELECCIONADAS

### 1. **Contador de "rachas" (combos)** (#4 del brainstorming)

**Problema:** No se recompensa a quien bebe mucho seguido

**Solución:**
- Detectar si un jugador ha bebido X veces seguidas (ej: 3+)
- Mostrar mensaje especial: "🔥 Pedro está en RACHA! 5 seguidos"
- Añadir a estadísticas finales: "Mayor racha: Pedro (7 seguidos)"

**Detalles técnicos:**
- Hook `usePlayers.ts`: añadir campo `currentStreak: number` por jugador
- Incrementar streak cuando bebe, resetear a 0 cuando no bebe
- Detectar racha >= 3 y mostrar toast/mensaje
- En `FinalStatsModal`: calcular y mostrar "Mayor racha"
- En `GlobalStatsScreen`: trackear "Mejor racha histórica"

**Archivos a modificar:**
- `src/types/index.ts` - añadir `currentStreak` a interface Player
- `src/hooks/usePlayers.ts` - lógica de racha
- `src/components/FunnyMessageToast.tsx` - mensajes de racha
- `src/screens/GameScreenMultiplayer.tsx` - trigger de mensajes
- `src/components/FinalStatsModal.tsx` - estadística de racha
- `src/hooks/useGlobalStats.ts` - trackear mejor racha histórica

**Complejidad:** 🟢 2 horas
**Impacto:** ⭐⭐⭐⭐ (gamificación divertida)

---

### 2. **Vibración en eventos importantes** (#7 del brainstorming)

**Problema:** Falta feedback háptico en momentos clave

**Solución:**
- Vibrar al:
  - Incrementar tragos
  - Finalizar partida
  - Logros/rachas (cuando racha >= 3)
  - Modal de estadísticas finales
  - Cambiar de frase

**Detalles técnicos:**
- Usar `Vibration` de React Native
- Crear utility `utils/haptics.ts` con funciones:
  ```typescript
  export const HapticPatterns = {
    light: 10,      // Tap ligero (incrementar trago)
    medium: 50,     // Tap medio (racha)
    heavy: 100,     // Tap fuerte (finalizar)
    success: [0, 50, 100, 50], // Patrón (logro)
  };

  export function triggerHaptic(pattern: keyof typeof HapticPatterns) {
    Vibration.vibrate(HapticPatterns[pattern]);
  }
  ```
- Setting en SettingsScreen: toggle "Vibración" (ON/OFF)
- Guardar preferencia en AsyncStorage

**Archivos a crear:**
- `src/utils/haptics.ts` (NUEVO)

**Archivos a modificar:**
- `src/screens/GameScreenMultiplayer.tsx` - vibrar al cambiar frase
- `src/components/PlayerListItem.tsx` - vibrar al incrementar tragos
- `src/components/FinalStatsModal.tsx` - vibrar al abrir
- `src/screens/SettingsScreen.tsx` - toggle de vibración
- `src/utils/storage.ts` - funciones para guardar preferencia

**Complejidad:** 🟢 1 hora
**Impacto:** ⭐⭐⭐⭐ (feedback sensorial)

**Nota:** Testear en dispositivo real, en emulador no funciona

---

### 3. **Límite de alcohol configurable (modo "responsable")** (#10 del brainstorming)

**Problema:** Algunos jugadores se pasan de rosca

**Solución:**
- Setting en PlayerSetupScreen: "Límite de tragos por jugador"
- Opciones: OFF / 10 / 15 / 20 / 25
- Cuando un jugador alcanza el límite:
  - Alert: "⚠️ Juan ha alcanzado su límite de tragos (20)"
  - Opciones:
    - "Entendido" (continúa jugando, solo aviso)
    - "Retirar de la partida" (marca jugador como "retirado")
- Jugadores retirados:
  - Aparecen en gris en la lista
  - No pueden incrementar más tragos
  - Siguen apareciendo en estadísticas finales

**Detalles técnicos:**
- Añadir campo `drinkLimit: number | null` a GameSession
- Añadir campo `isRetired: boolean` a Player
- En PlayerSetupScreen: dropdown/picker para límite
- En GameScreenMultiplayer:
  - Al incrementar trago, verificar si alcanza límite
  - Mostrar Alert con opciones
  - Si retira, marcar `isRetired = true`
- En PlayerListItem:
  - Si retired, mostrar con opacidad reducida y badge "Retirado"
  - Deshabilitar botón [+]
- En FinalStatsModal: incluir jugadores retirados con indicador

**Archivos a modificar:**
- `src/types/index.ts` - añadir `drinkLimit` a GameSession, `isRetired` a Player
- `src/screens/PlayerSetupScreen.tsx` - selector de límite
- `src/screens/GameScreenMultiplayer.tsx` - lógica de verificación
- `src/components/PlayerListItem.tsx` - UI para retirados
- `src/components/FinalStatsModal.tsx` - mostrar retirados

**Complejidad:** 🟢 2 horas
**Impacto:** ⭐⭐⭐⭐⭐ (seguridad, responsabilidad social)

**Mensaje sugerido al habilitar:**
```
"Límite de alcohol configurado"
"Recibirás un aviso cuando un jugador alcance el límite.
Recuerda: beber con responsabilidad 🍺"
```

---

## 🟡 MEDIUM EFFORT SELECCIONADAS

### 4. **Modo "Detectives"** (del #12 del brainstorming - Modos alternativos)

**Problema:** Siempre es el mismo formato de juego

**Solución - Modo Detectives:**
- Gameplay diferente al modo normal
- Todos responden en secreto (sí/no) si han hecho la cosa
- Luego se revelan respuestas simultáneamente
- Genera debate, sorpresas y revelaciones
- Útil para conocer mejor al grupo

**Flujo del juego:**
1. Se muestra la frase: "Yo nunca he robado en una tienda"
2. Cada jugador presiona botón "SÍ" o "NO" en secreto
3. Cuando todos respondieron, se revelan respuestas
4. Se muestra: "3 de 5 jugadores SÍ lo han hecho: Juan, María, Pedro"
5. Grupo puede comentar/debatir
6. Host presiona "Siguiente" para continuar

**Detalles técnicos:**
- Añadir nuevo tipo: `GameMode = 'normal' | 'detectives'`
- En CategorySelectionScreen: añadir toggle "Modo Detectives" (opcional)
- Crear nuevo componente `DetectivesVoting.tsx`:
  - Muestra botones "SÍ" / "NO" para cada jugador
  - Trackea quién ha votado
  - Cuando todos votan, muestra resultados
- Modificar GameScreenMultiplayer:
  - Detectar si es modo detectives
  - Mostrar componente DetectivesVoting en vez de PlayerList normal
- NO hay tragos en este modo (solo revelaciones)
- Estadísticas finales diferentes:
  - "Más sincero" (más SÍ)
  - "Más inocente" (más NO)
  - "El misterioso" (50/50)

**Archivos a crear:**
- `src/components/DetectivesVoting.tsx` (NUEVO)
- `src/components/DetectivesResults.tsx` (NUEVO) - pantalla de revelación

**Archivos a modificar:**
- `src/types/index.ts` - añadir GameMode
- `src/screens/CategorySelectionScreen.tsx` - toggle modo
- `src/screens/GameScreenMultiplayer.tsx` - conditional rendering
- `src/components/FinalStatsModal.tsx` - estadísticas para detectives

**Flujo de pantallas modo detectives:**
```
CategorySelection (con toggle "Modo Detectives")
  ↓
PlayerSetup (sin límite de tragos, no aplica)
  ↓
GameScreenMultiplayer
  ├─ Muestra frase
  ├─ DetectivesVoting component
  │   ├─ Cada jugador vota SÍ/NO
  │   └─ Botón "Revelar" (disabled hasta que todos voten)
  ├─ DetectivesResults component
  │   ├─ Muestra quién votó qué
  │   └─ Botón "Siguiente Frase"
  └─ Botón "Finalizar"
    ↓
FinalStatsModal (estadísticas detectives)
```

**Complejidad:** 🟡 8-10 horas
**Impacto:** ⭐⭐⭐⭐⭐ (rejugabilidad, nuevo tipo de diversión)

**Notas importantes:**
- Este modo NO incluye tragos, es solo para conocerse
- Perfecto para grupos que no quieren beber o como precalentamiento
- Opción futura: combinar con modo normal (primero votan, luego quien dijo SÍ bebe)

---

## 🌐 ONLINE MODE SELECCIONADO

### 5. **Modo "Local Multiplayer" (Bluetooth/WiFi Direct)** (#27 del brainstorming)

**Problema:** Pasar un solo móvil es incómodo, pero no queremos servidor/backend

**Solución:** Multiplayer local P2P sin internet ni servidor

**Concepto:**
- Un jugador crea partida (HOST)
- Otros jugadores se conectan vía Bluetooth o WiFi Direct
- Sincronización P2P en tiempo real
- Cada jugador ve su propia pantalla en su móvil
- Host controla las frases y el flujo del juego
- Todos ven la misma frase simultáneamente
- Cada uno tiene su botón [+] en su móvil

**Ventajas:**
- ✅ Sin servidor (0 costos recurrentes)
- ✅ Funciona sin internet
- ✅ Privacidad total (datos no salen de los dispositivos)
- ✅ Mejor experiencia que pasar un móvil

**Desventajas:**
- ⚠️ Solo funciona si están físicamente cerca (10-30 metros)
- ⚠️ Limitaciones de Bluetooth (máx 7 dispositivos simultáneos)
- ⚠️ Complejidad técnica alta

**Arquitectura técnica:**

#### Tecnología a usar:
```typescript
// Opción 1: react-native-ble-plx (Bluetooth Low Energy)
// Mejor para: grupos pequeños (2-7 jugadores)
// Alcance: ~10 metros

// Opción 2: react-native-wifi-p2p (WiFi Direct)
// Mejor para: grupos medianos (2-15 jugadores)
// Alcance: ~30 metros
// Solo Android (iOS no soporta WiFi Direct nativamente)

// DECISIÓN: Implementar AMBOS
// - Android: ofrecer ambas opciones
// - iOS: solo Bluetooth (limitación de la plataforma)
```

#### Flujo de conexión:
```
HOST:
1. HomeScreen → Botón "Crear Partida Local"
2. LocalHostScreen:
   - Genera código único de 6 dígitos
   - Inicia broadcasting (Bluetooth/WiFi)
   - Muestra código en pantalla grande
   - Lista de jugadores conectados en tiempo real
3. Cuando todos conectados → "Iniciar Juego"
4. CategorySelection (solo host controla)
5. GameScreenMultiplayer (modo host)
   - Host controla frases (Siguiente/Saltar)
   - Host ve lista de todos los jugadores
   - Sincroniza estado a todos

CLIENTE:
1. HomeScreen → Botón "Unirse a Partida Local"
2. LocalJoinScreen:
   - Escanea redes cercanas
   - Lista de partidas disponibles
   - O ingresar código manual
3. Ingresa su nombre
4. Espera en lobby (ve otros jugadores uniéndose)
5. GameScreenMultiplayer (modo cliente)
   - Ve frase actual (sincronizada)
   - Solo ve su contador de tragos
   - Botón [+] para incrementar sus tragos
   - Los tragos se sincronizan al host y a todos
```

#### Protocolo de comunicación:
```typescript
// Mensajes que se envían entre dispositivos

type NetworkMessage =
  | { type: 'PLAYER_JOIN', player: Player }
  | { type: 'PLAYER_LEAVE', playerId: string }
  | { type: 'GAME_START', difficulty: DifficultyLevel }
  | { type: 'PHRASE_UPDATE', phrase: string, phraseNumber: number }
  | { type: 'DRINK_INCREMENT', playerId: string, newDrinks: number }
  | { type: 'GAME_END', finalStats: GameStats }
  | { type: 'HEARTBEAT', timestamp: number }; // keepalive
```

#### Manejo de desconexiones:
- Heartbeat cada 5 segundos
- Si un jugador se desconecta:
  - Host notifica a todos
  - Jugador marcado como "desconectado" pero no eliminado
  - Puede reconectarse con mismo ID
- Si HOST se desconecta:
  - Partida termina para todos
  - Alert: "Host desconectado, partida finalizada"

**Archivos a crear:**
- `src/services/localMultiplayer.ts` (NUEVO) - lógica P2P
- `src/hooks/useLocalMultiplayer.ts` (NUEVO) - hook para usar en screens
- `src/screens/LocalHostScreen.tsx` (NUEVO) - pantalla host
- `src/screens/LocalJoinScreen.tsx` (NUEVO) - pantalla cliente
- `src/components/LocalLobby.tsx` (NUEVO) - lobby de espera
- `src/components/ConnectionStatus.tsx` (NUEVO) - indicador de conexión

**Archivos a modificar:**
- `src/screens/HomeScreen.tsx` - botones "Crear Partida" y "Unirse"
- `src/types/index.ts` - tipos para networking
- `src/navigation/AppNavigator.tsx` - nuevas pantallas
- `src/screens/GameScreenMultiplayer.tsx` - modo host vs cliente

**Dependencias a instalar:**
```bash
# Bluetooth Low Energy
npx expo install react-native-ble-plx

# WiFi Direct (solo Android)
npm install react-native-wifi-p2p
```

**Permisos necesarios:**
```json
// app.json - Android
"permissions": [
  "BLUETOOTH",
  "BLUETOOTH_ADMIN",
  "BLUETOOTH_CONNECT",
  "BLUETOOTH_SCAN",
  "ACCESS_FINE_LOCATION",
  "ACCESS_WIFI_STATE",
  "CHANGE_WIFI_STATE"
]

// iOS: solo Bluetooth
"NSBluetoothAlwaysUsageDescription": "Necesario para jugar en modo local"
```

**Fases de implementación:**

**Fase 1: Infraestructura base (6 horas)**
- Instalar dependencias
- Crear servicio `localMultiplayer.ts`
- Implementar discovery (encontrar dispositivos)
- Implementar conexión básica

**Fase 2: Pantallas de lobby (4 horas)**
- LocalHostScreen con código
- LocalJoinScreen con lista de partidas
- LocalLobby con jugadores conectados

**Fase 3: Sincronización (6 horas)**
- Implementar protocolo de mensajes
- Sincronizar frases
- Sincronizar tragos
- Manejo de desconexiones

**Fase 4: Integración con GameScreen (4 horas)**
- Modificar GameScreenMultiplayer para modo host/cliente
- Testing exhaustivo con múltiples dispositivos

**Fase 5: Polish y UX (2 horas)**
- Indicadores de conexión
- Manejo de errores
- Mensajes de feedback

**Complejidad:** 🔴 ~22 horas (3 semanas)
**Impacto:** ⭐⭐⭐⭐⭐ (experiencia de juego totalmente nueva)

**Testing requerido:**
- Mínimo 2 dispositivos Android físicos
- Testear con 2, 5 y 7 jugadores
- Simular desconexiones
- Testear alcance (distancia)
- Verificar consumo de batería

**Notas importantes:**
- WiFi Direct solo funcionará en Android
- iOS estará limitado a Bluetooth (máx 7 jugadores)
- Alternativa futura: implementar con servidor real (#26)

---

## 🔒 SEGURIDAD & LEGAL (COMPLETO)

### 6. **Mejoras de seguridad**

**Problema:** App actual tiene validaciones básicas pero puede mejorarse

**Soluciones:**

#### 6.1 Rate Limiting en acciones críticas
**Qué proteger:**
- Incremento de tragos: máx 10 veces por segundo por jugador
- Cambio de frase: máx 1 vez por segundo
- Añadir frase personalizada: máx 5 por minuto
- Eliminar frase: máx 10 por minuto

**Implementación:**
- Ya existe `hooks/useRateLimit.ts` ✅
- Aplicar a todas las acciones mencionadas
- Mostrar toast: "Espera un momento antes de continuar"

#### 6.2 Validación exhaustiva de inputs
**Nombres de jugadores:**
```typescript
function validatePlayerName(name: string): { valid: boolean; error?: string } {
  const trimmed = name.trim();

  // Longitud
  if (trimmed.length < 2) return { valid: false, error: "Nombre muy corto" };
  if (trimmed.length > 20) return { valid: false, error: "Nombre muy largo" };

  // Caracteres permitidos (letras, números, espacios, emojis)
  const validChars = /^[\p{L}\p{N}\p{Emoji}\s]+$/u;
  if (!validChars.test(trimmed)) {
    return { valid: false, error: "Caracteres no permitidos" };
  }

  // Palabras prohibidas (lista básica)
  const bannedWords = ['admin', 'null', 'undefined', 'system'];
  if (bannedWords.some(word => trimmed.toLowerCase().includes(word))) {
    return { valid: false, error: "Nombre no permitido" };
  }

  return { valid: true };
}
```

**Frases personalizadas:**
```typescript
function sanitizeCustomPhrase(phrase: string): string {
  let clean = phrase.trim();

  // Eliminar múltiples espacios
  clean = clean.replace(/\s+/g, ' ');

  // Escapar HTML (por si acaso)
  clean = clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  // Eliminar caracteres de control
  clean = clean.replace(/[\x00-\x1F\x7F]/g, '');

  return clean;
}
```

#### 6.3 Encriptación de AsyncStorage (datos sensibles)
```typescript
// Para datos realmente sensibles (si los hay en el futuro)
// Usar react-native-encrypted-storage

import EncryptedStorage from 'react-native-encrypted-storage';

async function saveSecureData(key: string, value: any) {
  try {
    await EncryptedStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving secure data:', error);
  }
}

// Aplicar a:
// - Estadísticas globales (prevenir manipulación)
// - Settings sensibles
```

#### 6.4 Validación de datos de AsyncStorage
```typescript
// Siempre validar al leer
async function getGameSession(): Promise<GameSession | null> {
  try {
    const data = await AsyncStorage.getItem(GAME_SESSION_KEY);
    if (!data) return null;

    const parsed = JSON.parse(data);

    // Validar estructura
    if (!isValidGameSession(parsed)) {
      console.warn('Invalid game session data, clearing');
      await AsyncStorage.removeItem(GAME_SESSION_KEY);
      return null;
    }

    return parsed;
  } catch (error) {
    console.error('Error reading game session:', error);
    return null;
  }
}

function isValidGameSession(data: any): data is GameSession {
  return (
    data &&
    typeof data.id === 'string' &&
    Array.isArray(data.players) &&
    data.players.length > 0 &&
    typeof data.difficulty === 'string' &&
    ['medio', 'picante', 'muy_picante'].includes(data.difficulty)
  );
}
```

**Archivos a crear:**
- `src/utils/validation.ts` (NUEVO) - funciones de validación
- `src/utils/sanitization.ts` (NUEVO) - funciones de sanitización

**Archivos a modificar:**
- `src/screens/PlayerSetupScreen.tsx` - validar nombres
- `src/screens/CustomPhrasesScreen.tsx` - sanitizar frases
- `src/utils/storage.ts` - validación al leer, sanitización al escribir
- Todos los screens que usan rate limiting

**Complejidad:** 🟡 4-6 horas
**Impacto:** ⭐⭐⭐⭐⭐ (protección contra bugs y edge cases)

---

### 7. **Cumplimiento legal**

**Problema:** App tiene contenido adulto y alcohol, necesita cumplimiento estricto

**Soluciones:**

#### 7.1 Age Gate estricto (18+)
**Implementación:**
- Al abrir app por primera vez, mostrar pantalla de verificación de edad
- NO usar input de fecha (fácil de burlar)
- Usar pregunta más seria:

```typescript
// AgeGateScreen.tsx
"Esta aplicación contiene referencias a alcohol y contenido adulto.

¿Eres mayor de 18 años?"

[NO, soy menor] [SÍ, soy mayor]
```

- Si presiona NO: cerrar app inmediatamente
- Si presiona SÍ: guardar en AsyncStorage, no volver a preguntar
- Mostrar disclaimer adicional:

```
"Recuerda beber con responsabilidad.
Nunca conduzcas bajo los efectos del alcohol.
Si eliges jugar sin alcohol, puedes usar otras 'penas'."

[Entendido]
```

#### 7.2 Política de Privacidad actualizada
**Contenido a añadir/actualizar:**

```markdown
# POLÍTICA DE PRIVACIDAD - YO NUNCA

Última actualización: [FECHA]

## Cumplimiento GDPR y CCPA

Yo Nunca respeta tu privacidad. Esta app:
- NO recopila datos personales identificables
- NO transmite información a servidores externos
- NO usa cookies ni tracking
- NO comparte datos con terceros

## Datos almacenados LOCALMENTE en tu dispositivo:

1. **Frases personalizadas:** Frases que añades voluntariamente
2. **Estadísticas de juego:** Récords y partidas jugadas (anónimas)
3. **Preferencias:** Tema, vibración, límite de tragos
4. **Partidas guardadas:** Estado de partida en curso
5. **Verificación de edad:** Confirmación de ser mayor de 18

Estos datos:
- Se almacenan SOLO en tu dispositivo
- NO se transmiten a ningún servidor
- NO son accesibles por terceros
- Se eliminan al desinstalar la app

## Modo Local Multiplayer (si aplica):

Cuando usas el modo multiplayer local (Bluetooth/WiFi):
- Los datos solo se comparten con dispositivos conectados DIRECTAMENTE
- La comunicación es peer-to-peer (sin servidor intermedio)
- Los datos NO se guardan ni se transmiten fuera de la sesión
- Requiere permisos de Bluetooth y ubicación (necesarios para Bluetooth en Android)

## Permisos solicitados:

- **Vibración:** Para feedback háptico (opcional)
- **Bluetooth:** Solo para modo multiplayer local (opcional)
- **Ubicación:** Requerido por Android para Bluetooth (no usamos tu ubicación)
- **Almacenamiento:** Para guardar capturas de estadísticas (opcional)

## Tus derechos:

- Puedes eliminar todos tus datos desde Ajustes → "Resetear App"
- Puedes rechazar permisos opcionales sin afectar funcionalidad básica
- Puedes exportar tus frases personalizadas (función futura)

## Contenido de la app:

Esta app contiene:
- Referencias a consumo de alcohol (mayores de 18)
- Contenido sexual/adulto en algunas frases
- Lenguaje explícito

Clasificación: 18+ / Mature

## Consumo responsable:

Esta app NO promueve el consumo excesivo de alcohol.
Opciones para jugar sin alcohol están disponibles.
Si decides beber, hazlo con responsabilidad.

## Contacto:

Para preguntas sobre privacidad: [EMAIL]

## Cambios a esta política:

Notificaremos cambios significativos dentro de la app.
```

**Archivo a crear:**
- `docs/PRIVACY_POLICY_V2.md` (NUEVO, actualizado)

#### 7.3 Términos de Servicio
```markdown
# TÉRMINOS DE SERVICIO - YO NUNCA

## Aceptación de Términos

Al usar esta aplicación, aceptas estos términos.

## Restricción de Edad

Debes ser mayor de 18 años para usar esta app.
Declaras bajo tu responsabilidad que cumples este requisito.

## Uso Responsable

- Esta app es un JUEGO para entretenimiento
- NO promovemos el consumo excesivo de alcohol
- Beber es OPCIONAL, puedes usar otras "penas"
- NUNCA conduzcas bajo efectos del alcohol
- Conoce tus límites y respétalos

## Exención de Responsabilidad

Los desarrolladores NO son responsables por:
- Consecuencias del consumo de alcohol
- Lesiones o daños derivados del juego
- Conflictos entre jugadores
- Contenido de frases personalizadas creadas por usuarios

## Contenido Generado por Usuarios

Las frases personalizadas son responsabilidad del usuario.
NO almacenamos ni revisamos estas frases.
El usuario es responsable del contenido que crea.

## Uso del Modo Multiplayer

En modo multiplayer local:
- La conexión es entre dispositivos directamente
- Sin supervisión ni moderación del desarrollador
- Los usuarios son responsables de su comportamiento

## Modificaciones

Nos reservamos el derecho de modificar estos términos.
Los cambios se notificarán en la app.

## Jurisdicción

Estos términos se rigen por las leyes de [TU PAÍS].

---

Al presionar "Aceptar", confirmas haber leído y aceptado estos términos.
```

**Archivo a crear:**
- `docs/TERMS_OF_SERVICE.md` (NUEVO)

#### 7.4 Disclaimers en la app

**Al iniciar juego (cada vez):**
```typescript
// Mostrar antes de CategorySelection, opcionalmente
"Recuerda: Bebe con responsabilidad 🍺

Esta app es un juego. El alcohol es opcional.
Nunca conduzcas bajo sus efectos.

[Entendido] [Jugar sin alcohol]"
```

**En PlayerSetup al configurar límite:**
```typescript
"Límite de alcohol: Una opción responsable ✅

Configura un límite de tragos por jugador.
Recibirás avisos cuando se alcance.

Límite recomendado: 10-15 tragos"
```

**Archivos a modificar:**
- Crear `src/screens/AgeGateScreen.tsx` (NUEVO)
- Crear `src/components/ResponsibilityDisclaimer.tsx` (NUEVO)
- `src/navigation/AppNavigator.tsx` - añadir AgeGate como primera pantalla
- `src/screens/HomeScreen.tsx` - verificar age gate antes de jugar
- `src/screens/SettingsScreen.tsx` - links a Privacidad y Términos

#### 7.5 Opción de "Reset completo"

```typescript
// En SettingsScreen
"Resetear Aplicación"

Elimina TODOS los datos:
- Frases personalizadas
- Estadísticas
- Partidas guardadas
- Preferencias

Esta acción NO se puede deshacer.

[Cancelar] [Eliminar Todo]
```

**Complejidad:** 🟢 2-3 horas (mayormente copywriting y UI)
**Impacto:** ⭐⭐⭐⭐⭐ (evitar problemas legales, protección)

**Archivos a crear:**
- `docs/PRIVACY_POLICY_V2.md`
- `docs/TERMS_OF_SERVICE.md`
- `src/screens/AgeGateScreen.tsx`
- `src/components/ResponsibilityDisclaimer.tsx`

**Archivos a modificar:**
- `src/navigation/AppNavigator.tsx`
- `src/screens/HomeScreen.tsx`
- `src/screens/SettingsScreen.tsx`
- `src/utils/storage.ts` - función resetAll()

---

## 📊 RESUMEN TÉCNICO

### Nuevos archivos a crear:
1. `src/utils/haptics.ts`
2. `src/utils/validation.ts`
3. `src/utils/sanitization.ts`
4. `src/components/DetectivesVoting.tsx`
5. `src/components/DetectivesResults.tsx`
6. `src/services/localMultiplayer.ts`
7. `src/hooks/useLocalMultiplayer.ts`
8. `src/screens/LocalHostScreen.tsx`
9. `src/screens/LocalJoinScreen.tsx`
10. `src/screens/AgeGateScreen.tsx`
11. `src/components/LocalLobby.tsx`
12. `src/components/ConnectionStatus.tsx`
13. `src/components/ResponsibilityDisclaimer.tsx`
14. `docs/PRIVACY_POLICY_V2.md`
15. `docs/TERMS_OF_SERVICE.md`

### Archivos a modificar:
1. `src/types/index.ts` - nuevos types
2. `src/hooks/usePlayers.ts` - rachas, retirados
3. `src/screens/GameScreenMultiplayer.tsx` - vibración, límites, rachas, modo host/cliente
4. `src/screens/PlayerSetupScreen.tsx` - límite de tragos, validación nombres
5. `src/screens/CategorySelectionScreen.tsx` - modo detectives toggle
6. `src/screens/SettingsScreen.tsx` - vibración, legal, reset
7. `src/screens/HomeScreen.tsx` - botones multiplayer, age gate
8. `src/components/PlayerListItem.tsx` - vibración, jugadores retirados
9. `src/components/FinalStatsModal.tsx` - rachas, estadísticas detectives
10. `src/components/FunnyMessageToast.tsx` - mensajes de racha
11. `src/hooks/useGlobalStats.ts` - trackear rachas
12. `src/navigation/AppNavigator.tsx` - nuevas pantallas
13. `src/utils/storage.ts` - validación, sanitización, resetAll()
14. `src/screens/CustomPhrasesScreen.tsx` - sanitización

### Nuevas dependencias:
```bash
npx expo install react-native-ble-plx
npm install react-native-wifi-p2p
npm install react-native-encrypted-storage  # opcional
```

### Nuevos permisos (app.json):
```json
{
  "permissions": [
    "VIBRATE",
    "BLUETOOTH",
    "BLUETOOTH_ADMIN",
    "BLUETOOTH_CONNECT",
    "BLUETOOTH_SCAN",
    "ACCESS_FINE_LOCATION",
    "ACCESS_WIFI_STATE",
    "CHANGE_WIFI_STATE"
  ]
}
```

---

## ⏱️ ESTIMACIÓN DE TIEMPO

| Feature | Tiempo | Prioridad |
|---------|--------|-----------|
| Contador de rachas (#4) | 2h | 🔴 Alta |
| Vibración (#7) | 1h | 🔴 Alta |
| Límite de alcohol (#10) | 2h | 🔴 Alta |
| Modo Detectives (#12) | 10h | 🟡 Media |
| Multiplayer Local (#27) | 22h | 🟢 Baja* |
| Seguridad | 6h | 🔴 Alta |
| Legal | 3h | 🔴 Alta |

**Total: ~46 horas** (6-7 días de trabajo full-time, o 2-3 semanas part-time)

*Multiplayer Local es baja prioridad porque es una feature grande opcional.

---

## 🎯 ORDEN DE IMPLEMENTACIÓN RECOMENDADO

### FASE 1: Quick Wins + Legal (1 semana)
1. Legal y seguridad (9h) - PRIMERO por importancia
2. Vibración (1h)
3. Contador de rachas (2h)
4. Límite de alcohol (2h)

**Total: 14 horas** - Funcionalidades críticas

### FASE 2: Modo Detectives (1 semana)
5. Modo Detectives (10h)

**Total: 10 horas** - Nueva forma de jugar

### FASE 3: Multiplayer Local (2-3 semanas) - OPCIONAL
6. Multiplayer Local (22h)

**Total: 22 horas** - Feature avanzada, considerar después del lanzamiento

---

## 📝 NOTAS PARA EL PLAN V3.0

### Decisiones de arquitectura:
- Mantener compatibilidad con V2.1 existente
- Todos los cambios deben ser retrocompatibles
- Nuevas features deben ser opcionales (no romper flujo actual)
- Testing exhaustivo con V2.1 antes de implementar

### Testing requerido:
- Rachas: verificar conteo correcto
- Vibración: testear en dispositivo real (no funciona en emulador)
- Límites: testear con diferentes valores
- Detectives: testear con 2, 5 y 10 jugadores
- Multiplayer: mínimo 2 dispositivos físicos
- Legal: verificar age gate no se puede saltar

### Backwards compatibility:
- Partidas guardadas de V2.1 deben funcionar en V3.0
- Estadísticas globales de V2.1 deben migrarse
- Frases personalizadas deben preservarse

---

## 🚀 PRÓXIMOS PASOS

1. **Revisar este documento** con el usuario
2. **Crear YO_NUNCA_PLAN_V3.md** con especificaciones detalladas
3. **Implementar fase por fase** siguiendo el orden recomendado
4. **Testing exhaustivo** después de cada fase
5. **Actualizar DevLog** con progreso
6. **Preparar para producción** cuando esté completo

---

**Fecha de creación:** 2025-10-24
**Para:** Claude Code (nueva instancia en modo plan)
**Estado:** Listo para convertir en plan de implementación

