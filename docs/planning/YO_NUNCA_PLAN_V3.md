# 🎯 PLAN COMPLETO: YO NUNCA V3.0 - MEJORAS FINALES PRE-PRODUCCIÓN

## 📋 RESUMEN EJECUTIVO

Transformación de "Yo Nunca V2.1" en una versión lista para producción con mejoras de gamificación, seguridad legal, nuevo modo de juego y opcionalmente multiplayer local P2P.

**Tiempo estimado total:** 24-46 horas (3-6 semanas)
**Complejidad:** Alta (incluye networking P2P opcional)
**Objetivos principales:**
1. Cumplimiento legal estricto (age gate, políticas, disclaimers)
2. Gamificación mejorada (rachas, vibración)
3. Juego responsable (límite de tragos pero como disclaimer al iniciar la app)
4. Nuevo modo "Detectives" (sin tragos, para conocerse)
5. Multiplayer local P2P (Bluetooth/WiFi) - OPCIONAL

**Estado actual:** V2.1 completada
- 240 frases en 3 niveles
- Multijugador 2-20 jugadores
- Estadísticas globales y de partida
- Guardado automático
- Animaciones y UI pulida

---

## 🎨 DECISIONES DE DISEÑO

### Arquitectura técnica

#### Nuevos tipos TypeScript
```typescript
// src/types/index.ts

// Rachas de tragos
export interface Player {
  id: string;
  name: string;
  drinks: number;
  avatar?: string;
  currentStreak: number;      // NUEVO - racha actual
  maxStreak: number;          // NUEVO - mejor racha de la partida
  isRetired: boolean;         // NUEVO - retirado por límite de tragos
}

// Límite de tragos
export interface GameSession {
  id: string;
  players: Player[];
  difficulty: DifficultyLevel;
  phrasesPlayed: number;
  currentPhraseIndex: number;
  createdAt: number;
  lastPlayedAt: number;
  drinkLimit: number | null;  // NUEVO - límite de tragos (null = sin límite)
  gameMode: GameMode;          // NUEVO - modo de juego
  gameEnded: boolean;
}

// Modo de juego
export type GameMode = 'normal' | 'detectives';

// Estadísticas globales ampliadas
export interface GlobalStats {
  gamesPlayed: number;
  favoriteCategory: string;
  avgPlayers: number;
  totalPlayTime: number;
  totalDrinks: number;
  currentStreak: number;
  recordDrinks: number;
  bestStreak: number;         // NUEVO - mejor racha histórica
  lastPlayedDate: string;
}

// Modo Detectives - Votación
export interface DetectivesVote {
  playerId: string;
  voted: boolean;            // SÍ o NO
}

export interface DetectivesRound {
  phrase: string;
  votes: DetectivesVote[];
  revealed: boolean;
}

// Multiplayer Local - Networking
export type ConnectionType = 'bluetooth' | 'wifi-direct';

export interface NetworkPlayer {
  id: string;
  name: string;
  deviceId: string;
  isHost: boolean;
}

export interface NetworkMessage {
  type: 'PLAYER_JOIN' | 'PLAYER_LEAVE' | 'GAME_START' | 'PHRASE_UPDATE'
        | 'DRINK_INCREMENT' | 'GAME_END' | 'HEARTBEAT' | 'VOTE_UPDATE';
  payload: any;
  timestamp: number;
}

export interface LocalGameSession extends GameSession {
  hostDeviceId: string;
  connectedPlayers: NetworkPlayer[];
  connectionType: ConnectionType;
}
```

### Dependencias a instalar

```bash
# Vibración (ya incluida en React Native)
# No requiere instalación adicional

# Multiplayer Local (solo si se implementa)
npx expo install react-native-ble-plx
npm install react-native-wifi-p2p

# Encriptación (opcional, para seguridad)
npm install react-native-encrypted-storage
```

### Permisos requeridos

```json
// app.json
{
  "expo": {
    "android": {
      "permissions": [
        "VIBRATE",                    // Para feedback háptico
        "BLUETOOTH",                  // Multiplayer Local
        "BLUETOOTH_ADMIN",            // Multiplayer Local
        "BLUETOOTH_CONNECT",          // Multiplayer Local (Android 12+)
        "BLUETOOTH_SCAN",             // Multiplayer Local (Android 12+)
        "ACCESS_FINE_LOCATION",       // Requerido para Bluetooth en Android
        "ACCESS_WIFI_STATE",          // WiFi Direct
        "CHANGE_WIFI_STATE"           // WiFi Direct
      ],
      "blockedPermissions": [
        "READ_PHONE_STATE",           // Bloqueamos permisos innecesarios
        "READ_CONTACTS",
        "CAMERA"
      ]
    },
    "ios": {
      "infoPlist": {
        "NSBluetoothAlwaysUsageDescription": "Necesario para jugar en modo multiplayer local con tus amigos cercanos.",
        "NSBluetoothPeripheralUsageDescription": "Necesario para crear partidas locales."
      }
    }
  }
}
```

---

## 📐 IMPLEMENTACIÓN POR FASES

### **FASE A: LEGAL Y SEGURIDAD (PRIORITARIO)** ⏱️ 9 horas

**Objetivo:** Cumplir con requisitos legales y proteger la app antes de producción.

**Dependencias:** Ninguna (primera fase)

---

#### A.1 - Age Gate Screen (2 horas)

**Descripción:** Pantalla obligatoria de verificación de edad al abrir la app por primera vez. (pregunta: ¿Cómo validamos esto sin usar internet?. El consentimiento otorgado por un menor de edad en esta materia, como se valida. Entiendo que play store tendrá filtros en su plataforma, ¿no?)

**Archivos a crear:**
1. `src/screens/AgeGateScreen.tsx`
2. `src/components/ResponsibilityDisclaimer.tsx`

**Archivos a modificar:**
1. `src/navigation/AppNavigator.tsx` - añadir AgeGate como pantalla inicial
2. `src/utils/storage.ts` - funciones para verificar/guardar confirmación de edad

**Implementación:**

```typescript
// src/screens/AgeGateScreen.tsx
import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { setAgeVerified } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';

export default function AgeGateScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleAgeConfirm = async () => {
    await setAgeVerified(true);
    // Mostrar disclaimer de responsabilidad
    Alert.alert(
      "Consumo Responsable",
      "Recuerda beber con responsabilidad.\n\nNunca conduzcas bajo los efectos del alcohol.\n\nSi eliges jugar sin alcohol, puedes usar otras 'penas'.",
      [{ text: "Entendido", onPress: () => navigation.replace('Home' as never) }]
    );
  };

  const handleAgeDeny = () => {
    Alert.alert(
      "Acceso Denegado",
      "Esta aplicación es solo para mayores de 18 años.",
      [{ text: "Salir", onPress: () => {
        // En producción, cerrar la app
        // En desarrollo, no podemos cerrar, solo mostrar el alert
      }}]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.icon, { color: theme.text }]}>🍺</Text>
        <Text style={[styles.title, { color: theme.text }]}>
          Verificación de Edad
        </Text>

        <View style={styles.warningBox}>
          <Text style={[styles.warningText, { color: theme.text }]}>
            Esta aplicación contiene:
          </Text>
          <Text style={[styles.warningItem, { color: theme.textSecondary }]}>
            • Referencias a consumo de alcohol
          </Text>
          <Text style={[styles.warningItem, { color: theme.textSecondary }]}>
            • Contenido sexual/adulto en algunas frases
          </Text>
          <Text style={[styles.warningItem, { color: theme.textSecondary }]}>
            • Lenguaje explícito
          </Text>
        </View>

        <Text style={[styles.question, { color: theme.text }]}>
          ¿Eres mayor de 18 años?
        </Text>

        <View style={styles.buttons}>
          <CustomButton
            title="NO, soy menor"
            onPress={handleAgeDeny}
            variant="danger"
          />
          <CustomButton
            title="SÍ, soy mayor"
            onPress={handleAgeConfirm}
            variant="primary"
          />
        </View>

        <Text style={[styles.disclaimer, { color: theme.textSecondary }]}>
          Al continuar, declaras bajo tu responsabilidad que eres mayor de edad
          y aceptas los términos de uso.
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  warningBox: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    width: '100%',
  },
  warningText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  warningItem: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 6,
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    gap: 16,
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
});
```

```typescript
// src/utils/storage.ts - añadir funciones

const AGE_VERIFIED_KEY = '@yonunca_age_verified';

export async function isAgeVerified(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(AGE_VERIFIED_KEY);
    return value === 'true';
  } catch (error) {
    console.error('Error checking age verification:', error);
    return false;
  }
}

export async function setAgeVerified(verified: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(AGE_VERIFIED_KEY, verified ? 'true' : 'false');
  } catch (error) {
    console.error('Error setting age verification:', error);
  }
}
```

```typescript
// src/navigation/AppNavigator.tsx - modificar

import AgeGateScreen from '../screens/AgeGateScreen';
import { isAgeVerified } from '../utils/storage';

export default function AppNavigator() {
  const { theme } = useTheme();
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAge() {
      const verified = await isAgeVerified();
      setAgeVerified(verified);
    }
    checkAge();
  }, []);

  // Mostrar loading mientras verifica
  if (ageVerified === null) {
    return null; // O un splash screen
  }

  return (
    <Stack.Navigator
      initialRouteName={ageVerified ? "Home" : "AgeGate"}
      screenOptions={{
        headerStyle: { backgroundColor: theme.cardBackground },
        headerTintColor: theme.text,
      }}
    >
      {!ageVerified && (
        <Stack.Screen
          name="AgeGate"
          component={AgeGateScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      {/* ... resto de pantallas */}
    </Stack.Navigator>
  );
}
```

**Criterios de éxito:**
- ✅ Age gate se muestra solo la primera vez
- ✅ No se puede saltar el age gate
- ✅ Presionar "NO" muestra alert de denegación
- ✅ Presionar "SÍ" guarda verificación y muestra disclaimer
- ✅ Disclaimer de consumo responsable se muestra
- ✅ Después de verificar, nunca más se pide

---

#### A.2 - Políticas Legales (2 horas)

**Descripción:** Crear políticas de privacidad y términos de servicio actualizados y accesibles.

**Archivos a crear:**
1. `docs/PRIVACY_POLICY_V2.md`
2. `docs/TERMS_OF_SERVICE.md`

**Archivos a modificar:**
1. `src/screens/SettingsScreen.tsx` - links a políticas

**Implementación:**

```markdown
<!-- docs/PRIVACY_POLICY_V2.md -->
# POLÍTICA DE PRIVACIDAD - YO NUNCA

**Última actualización:** [FECHA]

## Cumplimiento GDPR y CCPA

Yo Nunca respeta tu privacidad. Esta app:
- **NO recopila datos personales identificables**
- **NO transmite información a servidores externos**
- **NO usa cookies ni tracking**
- **NO comparte datos con terceros**
- **NO incluye publicidad**

## Datos almacenados LOCALMENTE en tu dispositivo

1. **Frases personalizadas:** Frases que añades voluntariamente
2. **Estadísticas de juego:** Récords y partidas jugadas (anónimas)
3. **Preferencias:** Tema, vibración, límite de tragos
4. **Partidas guardadas:** Estado de partida en curso
5. **Verificación de edad:** Confirmación única de ser mayor de 18

Estos datos:
- Se almacenan SOLO en tu dispositivo
- NO se transmiten a ningún servidor
- NO son accesibles por terceros
- Se eliminan completamente al desinstalar la app

## Modo Local Multiplayer (si aplica)

Cuando usas el modo multiplayer local (Bluetooth/WiFi):
- Los datos solo se comparten con dispositivos conectados DIRECTAMENTE
- La comunicación es peer-to-peer (sin servidor intermedio)
- Los datos NO se guardan ni se transmiten fuera de la sesión
- Requiere permisos de Bluetooth y ubicación (necesarios para Bluetooth en Android)

## Permisos solicitados

- **Vibración:** Para feedback háptico durante el juego (opcional)
- **Bluetooth:** Solo para modo multiplayer local (opcional)
- **Ubicación:** Requerido técnicamente por Android para usar Bluetooth. NO usamos tu ubicación real.
- **WiFi:** Solo para modo multiplayer local vía WiFi Direct (opcional, solo Android)

## Tus derechos

- Puedes eliminar todos tus datos desde Ajustes → "Resetear Aplicación"
- Puedes rechazar permisos opcionales sin afectar funcionalidad básica
- Puedes desinstalar la app en cualquier momento para eliminar todos los datos

## Contenido de la app

Esta app contiene:
- Referencias a consumo de alcohol (mayores de 18)
- Contenido sexual/adulto en algunas frases
- Lenguaje explícito

**Clasificación:** 18+ / Mature

## Consumo responsable

Esta app NO promueve el consumo excesivo de alcohol.
La opción de jugar sin alcohol está disponible.
Si decides beber, hazlo con responsabilidad.

## Contacto

Para preguntas sobre privacidad: danielarmendiagiron@gmail.com

## Cambios a esta política

Notificaremos cambios significativos dentro de la app en futuras actualizaciones.
```

```markdown
<!-- docs/TERMS_OF_SERVICE.md -->
# TÉRMINOS DE SERVICIO - YO NUNCA

**Última actualización:** [FECHA]

## Aceptación de Términos

Al usar esta aplicación, aceptas estos términos de servicio.

## Restricción de Edad

- Debes ser **mayor de 18 años** para usar esta app
- Declaras bajo tu responsabilidad que cumples este requisito
- Los desarrolladores no son responsables del uso por menores de edad

## Uso Responsable

- Esta app es un **JUEGO** para entretenimiento entre amigos
- NO promovemos el consumo excesivo de alcohol
- Beber es **OPCIONAL**: puedes usar otras "penas" o jugar sin alcohol
- **NUNCA conduzcas** bajo efectos del alcohol
- Conoce tus límites y respétalos

## Exención de Responsabilidad

Los desarrolladores NO son responsables por:
- Consecuencias del consumo de alcohol
- Lesiones o daños derivados del uso del juego
- Conflictos interpersonales entre jugadores
- Contenido de frases personalizadas creadas por usuarios

## Contenido Generado por Usuarios

- Las frases personalizadas son responsabilidad exclusiva del usuario
- NO almacenamos ni revisamos estas frases en servidores
- El usuario es responsable del contenido que crea y comparte

## Uso del Modo Multiplayer

En modo multiplayer local (si aplica):
- La conexión es directamente entre dispositivos (P2P)
- No hay supervisión ni moderación del desarrollador
- Los usuarios son responsables de su comportamiento

## Limitación de Garantías

Esta app se proporciona "tal cual" sin garantías de ningún tipo.
No garantizamos que:
- La app esté libre de errores
- Funcione en todos los dispositivos
- Esté disponible ininterrumpidamente

## Modificaciones

Nos reservamos el derecho de:
- Modificar estos términos en cualquier momento
- Añadir o eliminar funcionalidades
- Discontinuar la app si es necesario

Los cambios se notificarán en actualizaciones.

## Jurisdicción

Estos términos se rigen por las leyes de España.

## Contacto

Para preguntas: danielfvera.codes@gmail.com

---

**Al usar esta app, confirmas haber leído, entendido y aceptado estos términos.**
```

```typescript
// src/screens/SettingsScreen.tsx - modificar sección legal

// Añadir botones en el render:
<View style={styles.section}>
  <Text style={[styles.sectionTitle, { color: theme.text }]}>Legal</Text>

  <TouchableOpacity
    style={[styles.legalButton, { backgroundColor: theme.cardBackground }]}
    onPress={() => {
      Alert.alert(
        "Política de Privacidad",
        "Ver en GitHub: https://github.com/[tu-usuario]/yo-nunca/blob/main/docs/PRIVACY_POLICY_V2.md\n\n" +
        "Resumen: Esta app NO recopila datos personales. Todo se almacena localmente.",
        [{ text: "Entendido" }]
      );
    }}
  >
    <Text style={[styles.legalButtonText, { color: theme.text }]}>
      📄 Política de Privacidad
    </Text>
  </TouchableOpacity>

  <TouchableOpacity
    style={[styles.legalButton, { backgroundColor: theme.cardBackground }]}
    onPress={() => {
      Alert.alert(
        "Términos de Servicio",
        "Ver en GitHub: https://github.com/[tu-usuario]/yo-nunca/blob/main/docs/TERMS_OF_SERVICE.md\n\n" +
        "Resumen: App para mayores de 18. Beber es opcional. No somos responsables del uso.",
        [{ text: "Entendido" }]
      );
    }}
  >
    <Text style={[styles.legalButtonText, { color: theme.text }]}>
      📜 Términos de Servicio
    </Text>
  </TouchableOpacity>
</View>
```

**Criterios de éxito:**
- ✅ Ambas políticas completas y detalladas
- ✅ Cumplen con GDPR y CCPA
- ✅ Accesibles desde SettingsScreen
- ✅ Lenguaje claro y directo

---

#### A.3 - Validación y Sanitización (3 horas)

**Descripción:** Validar todos los inputs de usuarios para prevenir bugs y problemas de seguridad. Introducir mecanismos para identificar palabras que hagan alusión a delitos (violar, matar,...)

**Archivos a crear:**
1. `src/utils/validation.ts`
2. `src/utils/sanitization.ts`

**Archivos a modificar:**
1. `src/screens/PlayerSetupScreen.tsx`
2. `src/screens/CustomPhrasesScreen.tsx`
3. `src/utils/storage.ts`

**Implementación:**

```typescript
// src/utils/validation.ts
export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validatePlayerName(name: string): ValidationResult {
  const trimmed = name.trim();

  // Longitud
  if (trimmed.length < 2) {
    return { valid: false, error: "Nombre muy corto (mínimo 2 caracteres)" };
  }
  if (trimmed.length > 20) {
    return { valid: false, error: "Nombre muy largo (máximo 20 caracteres)" };
  }

  // Caracteres permitidos (letras, números, espacios, emojis comunes)
  const validChars = /^[\p{L}\p{N}\p{Emoji}\s]+$/u;
  if (!validChars.test(trimmed)) {
    return { valid: false, error: "Caracteres no permitidos" };
  }

  // Palabras reservadas/prohibidas
  const bannedWords = ['admin', 'null', 'undefined', 'system', 'test'];
  const lowerName = trimmed.toLowerCase();
  if (bannedWords.some(word => lowerName.includes(word))) {
    return { valid: false, error: "Nombre no permitido" };
  }

  return { valid: true };
}

export function validateCustomPhrase(phrase: string): ValidationResult {
  const trimmed = phrase.trim();

  // Longitud mínima (sin contar "yo nunca" que se añade automáticamente)
  if (trimmed.length < 10) {
    return { valid: false, error: "Frase muy corta (mínimo 10 caracteres)" };
  }

  // Longitud máxima
  if (trimmed.length > 200) {
    return { valid: false, error: "Frase muy larga (máximo 200 caracteres)" };
  }

  // No permitir frases vacías o solo espacios
  if (trimmed.length === 0) {
    return { valid: false, error: "La frase no puede estar vacía" };
  }

  return { valid: true };
}

export function validateDrinkLimit(limit: number | null): ValidationResult {
  if (limit === null) {
    return { valid: true }; // Sin límite es válido
  }

  if (!Number.isInteger(limit)) {
    return { valid: false, error: "El límite debe ser un número entero" };
  }

  if (limit < 5) {
    return { valid: false, error: "Límite muy bajo (mínimo 5)" };
  }

  if (limit > 50) {
    return { valid: false, error: "Límite muy alto (máximo 50)" };
  }

  return { valid: true };
}
```

```typescript
// src/utils/sanitization.ts
export function sanitizePlayerName(name: string): string {
  let clean = name.trim();

  // Eliminar múltiples espacios consecutivos
  clean = clean.replace(/\s+/g, ' ');

  // Limitar longitud
  if (clean.length > 20) {
    clean = clean.substring(0, 20);
  }

  // Eliminar caracteres de control (invisibles)
  clean = clean.replace(/[\x00-\x1F\x7F]/g, '');

  return clean;
}

export function sanitizeCustomPhrase(phrase: string): string {
  let clean = phrase.trim();

  // Eliminar múltiples espacios
  clean = clean.replace(/\s+/g, ' ');

  // Escapar HTML (prevención básica)
  clean = clean
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');

  // Eliminar caracteres de control
  clean = clean.replace(/[\x00-\x1F\x7F]/g, '');

  // Eliminar "yo nunca" del inicio si el usuario lo escribió
  clean = clean.replace(/^(yo nunca|yo\s+nunca)\s+/i, '');

  // Limitar longitud
  if (clean.length > 200) {
    clean = clean.substring(0, 200);
  }

  return clean;
}
```

```typescript
// src/screens/PlayerSetupScreen.tsx - modificar addPlayer

import { validatePlayerName, sanitizePlayerName } from '../utils/validation';

const handleAddPlayer = () => {
  if (players.length >= 20) {
    Alert.alert('Límite alcanzado', 'Máximo 20 jugadores permitidos');
    return;
  }

  const finalName = newPlayerName.trim() === ''
    ? generateRandomName()
    : newPlayerName;

  // Validar nombre
  const validation = validatePlayerName(finalName);
  if (!validation.valid) {
    Alert.alert('Nombre inválido', validation.error || 'Por favor, elige otro nombre');
    return;
  }

  // Sanitizar
  const sanitized = sanitizePlayerName(finalName);

  // Verificar que no exista ya
  if (players.some(p => p.name.toLowerCase() === sanitized.toLowerCase())) {
    Alert.alert('Nombre duplicado', 'Este nombre ya existe. Elige otro.');
    return;
  }

  addPlayer(sanitized);
  setNewPlayerName('');
};
```

```typescript
// src/screens/CustomPhrasesScreen.tsx - modificar addPhrase

import { validateCustomPhrase, sanitizeCustomPhrase } from '../utils/validation';

const handleAddPhrase = async () => {
  const trimmed = newPhrase.trim();

  // Validar
  const validation = validateCustomPhrase(trimmed);
  if (!validation.valid) {
    Alert.alert('Frase inválida', validation.error || 'Revisa la frase e intenta de nuevo');
    return;
  }

  // Sanitizar
  const sanitized = sanitizeCustomPhrase(trimmed);

  // Verificar duplicado
  if (customPhrases.some(p => p.text.toLowerCase() === sanitized.toLowerCase())) {
    Alert.alert('Frase duplicada', 'Esta frase ya existe en tu lista');
    return;
  }

  await addCustomPhrase(sanitized);
  setNewPhrase('');
  setModalVisible(false);
};
```

**Criterios de éxito:**
- ✅ Nombres de jugadores validados (longitud, caracteres)
- ✅ Frases personalizadas sanitizadas
- ✅ Límites de tragos validados
- ✅ Mensajes de error claros al usuario
- ✅ No se puede ingresar contenido malicioso

---

#### A.4 - Rate Limiting y Seguridad (2 horas)

**Descripción:** Aplicar rate limiting a acciones críticas para prevenir spam y bugs.

**Archivos a modificar:**
1. `src/hooks/useRateLimit.ts` - ya existe, solo verificar
2. `src/screens/GameScreenMultiplayer.tsx`
3. `src/components/PlayerListItem.tsx`
4. `src/screens/CustomPhrasesScreen.tsx`

**Implementación:**

```typescript
// src/screens/GameScreenMultiplayer.tsx - rate limit en "Siguiente Frase"

import { useRateLimit } from '../hooks/useRateLimit';

export default function GameScreenMultiplayer({ route }: Props) {
  // ... código existente

  const nextPhraseRateLimit = useRateLimit(1000); // 1 segundo entre frases

  const handleNextPhrase = () => {
    if (!nextPhraseRateLimit()) {
      Alert.alert('Espera un momento', 'Ve más despacio, deja que disfruten la frase');
      return;
    }

    nextPhrase();
    // ... resto de lógica
  };

  // ...
}
```

```typescript
// src/screens/CustomPhrasesScreen.tsx - rate limit en añadir/eliminar

const addPhraseRateLimit = useRateLimit(12000); // 5 frases por minuto = 12s por frase
const deletePhraseRateLimit = useRateLimit(6000); // 10 por minuto = 6s por frase

const handleAddPhrase = async () => {
  if (!addPhraseRateLimit()) {
    Alert.alert('Espera un momento', 'Estás añadiendo frases muy rápido');
    return;
  }

  // ... resto de validación y sanitización
};

const handleDeletePhrase = async (id: string) => {
  if (!deletePhraseRateLimit()) {
    Alert.alert('Espera un momento', 'Estás eliminando frases muy rápido');
    return;
  }

  // ... resto de lógica
};
```

**Criterios de éxito:**
- ✅ No se puede spam-clickear "Siguiente Frase"
- ✅ No se puede spam-clickear botón [+] de tragos (ya implementado en V2.1)
- ✅ Rate limits en añadir/eliminar frases
- ✅ Mensajes amigables cuando se alcanza límite

---

### **FASE B: QUICK WINS - GAMIFICACIÓN** ⏱️ 5 horas

**Objetivo:** Añadir features rápidas que mejoran la experiencia de juego.

**Dependencias:** Fase A completada (validación de datos)

---

#### B.1 - Contador de Rachas (2 horas)

**Descripción:** Detectar cuando un jugador bebe varias veces seguidas y mostrar mensajes especiales.

**Archivos a modificar:**
1. `src/types/index.ts` - añadir campos a Player
2. `src/hooks/usePlayers.ts` - lógica de rachas
3. `src/screens/GameScreenMultiplayer.tsx` - trigger mensajes
4. `src/components/FinalStatsModal.tsx` - mostrar mejor racha
5. `src/hooks/useGlobalStats.ts` - trackear mejor racha histórica

**Implementación:**

```typescript
// src/types/index.ts - ya incluido arriba en tipos

// src/hooks/usePlayers.ts - añadir lógica de rachas
export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);

  const incrementDrinks = (playerId: string) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player => {
        if (player.id === playerId) {
          const newDrinks = player.drinks + 1;
          const newStreak = player.currentStreak + 1;
          const newMaxStreak = Math.max(newStreak, player.maxStreak);

          return {
            ...player,
            drinks: newDrinks,
            currentStreak: newStreak,
            maxStreak: newMaxStreak,
          };
        }
        return player;
      })
    );
  };

  const resetStreaks = () => {
    // Llamar cuando cambia de frase y nadie bebe
    setPlayers(prevPlayers =>
      prevPlayers.map(player => ({
        ...player,
        currentStreak: 0,
      }))
    );
  };

  const resetStreakForPlayer = (playerId: string) => {
    // Llamar cuando un jugador específico NO bebe
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, currentStreak: 0 }
          : player
      )
    );
  };

  return {
    players,
    addPlayer,
    removePlayer,
    incrementDrinks,
    resetAllDrinks,
    resetStreaks,
    resetStreakForPlayer,
  };
}
```

```typescript
// src/screens/GameScreenMultiplayer.tsx - detectar rachas

const handleIncrementDrinks = (playerId: string) => {
  incrementDrinks(playerId);

  // Verificar racha del jugador
  const player = players.find(p => p.id === playerId);
  if (player && player.currentStreak >= 2) { // Racha de 3 o más (después de incrementar)
    const streakMessages = [
      `🔥 ${player.name} está en RACHA! ${player.currentStreak + 1} seguidos`,
      `🍺 ${player.name} no para de beber! ${player.currentStreak + 1} tragos consecutivos`,
      `😈 ${player.name} está imparable! Racha de ${player.currentStreak + 1}`,
      `🎯 COMBO x${player.currentStreak + 1}! ${player.name} está en modo bestia`,
    ];
    const randomMessage = streakMessages[Math.floor(Math.random() * streakMessages.length)];

    // Mostrar toast o alert breve
    Alert.alert('', randomMessage, [{ text: 'OK' }], { cancelable: true });
  }

  // Aplicar vibración (ver siguiente sección)
};
```

```typescript
// src/components/FinalStatsModal.tsx - añadir sección de rachas

// En el render, añadir después de "Destacados":
<View style={styles.highlightsSection}>
  <Text style={[styles.highlightTitle, { color: theme.text }]}>
    🔥 Mayor Racha
  </Text>
  {(() => {
    const bestStreak = players.reduce((best, p) =>
      p.maxStreak > best.maxStreak ? p : best
    , players[0]);

    return (
      <Text style={[styles.highlightText, { color: theme.textSecondary }]}>
        {bestStreak.name} - {bestStreak.maxStreak} tragos consecutivos
      </Text>
    );
  })()}
</View>
```

```typescript
// src/hooks/useGlobalStats.ts - añadir tracking de mejor racha

export function useGlobalStats() {
  const updateStats = async (session: GameSession) => {
    const currentStats = await getGlobalStats();

    // Calcular mejor racha de la partida
    const bestStreakThisGame = Math.max(...session.players.map(p => p.maxStreak));

    const updatedStats: GlobalStats = {
      // ... stats existentes
      bestStreak: Math.max(currentStats.bestStreak || 0, bestStreakThisGame),
    };

    await updateGlobalStats(updatedStats);
  };

  return { updateStats };
}
```

**Criterios de éxito:**
- ✅ Campo `currentStreak` se incrementa al beber
- ✅ `currentStreak` se resetea al NO beber
- ✅ Mensaje aparece cuando racha >= 3
- ✅ Mejor racha se muestra en estadísticas finales
- ✅ Mejor racha histórica se guarda en GlobalStats

---

#### B.2 - Vibración (1 hora)

**Descripción:** Añadir feedback háptico en momentos clave del juego.

**Archivos a crear:**
1. `src/utils/haptics.ts`

**Archivos a modificar:**
1. `src/screens/SettingsScreen.tsx` - toggle vibración
2. `src/screens/GameScreenMultiplayer.tsx` - vibrar al cambiar frase
3. `src/components/PlayerListItem.tsx` - vibrar al incrementar tragos
4. `src/components/FinalStatsModal.tsx` - vibrar al abrir
5. `src/utils/storage.ts` - guardar preferencia

**Implementación:**

```typescript
// src/utils/haptics.ts
import { Vibration, Platform } from 'react-native';
import { getVibrationEnabled } from './storage';

export const HapticPatterns = {
  light: 10,                    // Tap ligero
  medium: 50,                   // Tap medio
  heavy: 100,                   // Tap fuerte
  success: [0, 50, 100, 50],    // Patrón de éxito
  warning: [0, 100, 50, 100],   // Patrón de advertencia
};

export type HapticType = keyof typeof HapticPatterns;

export async function triggerHaptic(type: HapticType) {
  try {
    // Verificar si vibración está habilitada
    const enabled = await getVibrationEnabled();
    if (!enabled) return;

    const pattern = HapticPatterns[type];

    if (Platform.OS === 'android') {
      if (Array.isArray(pattern)) {
        Vibration.vibrate(pattern);
      } else {
        Vibration.vibrate(pattern);
      }
    } else if (Platform.OS === 'ios') {
      // iOS solo soporta vibración simple
      if (Array.isArray(pattern)) {
        Vibration.vibrate();
      } else {
        Vibration.vibrate();
      }
    }
  } catch (error) {
    console.error('Error triggering haptic:', error);
  }
}
```

```typescript
// src/utils/storage.ts - añadir funciones

const VIBRATION_ENABLED_KEY = '@yonunca_vibration_enabled';

export async function getVibrationEnabled(): Promise<boolean> {
  try {
    const value = await AsyncStorage.getItem(VIBRATION_ENABLED_KEY);
    return value !== 'false'; // Por defecto true
  } catch (error) {
    console.error('Error getting vibration preference:', error);
    return true;
  }
}

export async function setVibrationEnabled(enabled: boolean): Promise<void> {
  try {
    await AsyncStorage.setItem(VIBRATION_ENABLED_KEY, enabled ? 'true' : 'false');
  } catch (error) {
    console.error('Error setting vibration preference:', error);
  }
}
```

```typescript
// src/screens/SettingsScreen.tsx - añadir toggle

import { getVibrationEnabled, setVibrationEnabled } from '../utils/storage';

export default function SettingsScreen() {
  const [vibrationEnabled, setVibrationEnabledState] = useState(true);

  useEffect(() => {
    async function loadVibration() {
      const enabled = await getVibrationEnabled();
      setVibrationEnabledState(enabled);
    }
    loadVibration();
  }, []);

  const handleToggleVibration = async () => {
    const newValue = !vibrationEnabled;
    setVibrationEnabledState(newValue);
    await setVibrationEnabled(newValue);

    // Vibrar una vez para feedback
    if (newValue) {
      triggerHaptic('light');
    }
  };

  return (
    // ... en el render:
    <View style={styles.settingRow}>
      <Text style={[styles.settingLabel, { color: theme.text }]}>
        Vibración
      </Text>
      <Switch
        value={vibrationEnabled}
        onValueChange={handleToggleVibration}
        trackColor={{ false: '#767577', true: theme.primary }}
      />
    </View>
  );
}
```

```typescript
// src/screens/GameScreenMultiplayer.tsx - vibrar al cambiar frase

import { triggerHaptic } from '../utils/haptics';

const handleNextPhrase = () => {
  triggerHaptic('light');
  nextPhrase();
  // ... resto de lógica
};
```

```typescript
// src/components/PlayerListItem.tsx - vibrar al incrementar tragos

import { triggerHaptic } from '../utils/haptics';

const handlePress = () => {
  if (player.isRetired) return;

  triggerHaptic('light');
  onIncrement(player.id);
};
```

```typescript
// src/components/FinalStatsModal.tsx - vibrar al abrir

import { triggerHaptic } from '../utils/haptics';

useEffect(() => {
  if (visible) {
    triggerHaptic('success');
  }
}, [visible]);
```

**Criterios de éxito:**
- ✅ Vibración funciona en dispositivo real
- ✅ Toggle en Settings habilita/deshabilita
- ✅ Vibra al: incrementar tragos, cambiar frase, abrir stats finales
- ✅ Vibración de feedback al cambiar toggle
- ✅ No vibra si está deshabilitado

**Nota:** Testear en dispositivo físico, NO funciona en emulador.

---

#### B.3 - Límite de Alcohol Configurable (2 horas)
(ESTO NO LO QUIERO)

**Descripción:** Permitir configurar un límite de tragos por jugador para juego responsable.

**Archivos a modificar:**
1. `src/types/index.ts` - añadir `drinkLimit` a GameSession
2. `src/screens/PlayerSetupScreen.tsx` - selector de límite
3. `src/screens/GameScreenMultiplayer.tsx` - verificar límite al incrementar
4. `src/components/PlayerListItem.tsx` - UI para jugadores retirados
5. `src/components/FinalStatsModal.tsx` - indicar jugadores retirados

**Implementación:**

```typescript
// src/screens/PlayerSetupScreen.tsx - añadir selector

import { Picker } from '@react-native-picker/picker';

export default function PlayerSetupScreen({ route }: Props) {
  const [drinkLimit, setDrinkLimit] = useState<number | null>(null);

  const handleStartGame = () => {
    if (players.length < 2) {
      Alert.alert('Jugadores insuficientes', 'Necesitas al menos 2 jugadores');
      return;
    }

    // Crear sesión con límite
    const session: GameSession = {
      id: Date.now().toString(),
      players: players,
      difficulty: difficulty,
      phrasesPlayed: 0,
      currentPhraseIndex: 0,
      createdAt: Date.now(),
      lastPlayedAt: Date.now(),
      drinkLimit: drinkLimit,
      gameMode: 'normal',
      gameEnded: false,
    };

    navigation.navigate('GameScreenMultiplayer', { session });
  };

  return (
    // ... en el render, antes de "Comenzar Juego":
    <View style={styles.limitSection}>
      <Text style={[styles.sectionTitle, { color: theme.text }]}>
        Límite de Tragos (Opcional)
      </Text>
      <Text style={[styles.limitDescription, { color: theme.textSecondary }]}>
        Configura un límite responsable. Los jugadores recibirán un aviso al alcanzarlo.
      </Text>

      <Picker
        selectedValue={drinkLimit}
        onValueChange={setDrinkLimit}
        style={[styles.picker, { color: theme.text }]}
      >
        <Picker.Item label="Sin límite" value={null} />
        <Picker.Item label="10 tragos" value={10} />
        <Picker.Item label="15 tragos (Recomendado)" value={15} />
        <Picker.Item label="20 tragos" value={20} />
        <Picker.Item label="25 tragos" value={25} />
      </Picker>
    </View>
  );
}
```

```typescript
// src/screens/GameScreenMultiplayer.tsx - verificar límite

const handleIncrementDrinks = (playerId: string) => {
  const player = players.find(p => p.id === playerId);
  if (!player) return;

  // Incrementar primero
  incrementDrinks(playerId);

  const newDrinkCount = player.drinks + 1;

  // Verificar si alcanza límite
  if (drinkLimit && newDrinkCount >= drinkLimit && !player.isRetired) {
    Alert.alert(
      "⚠️ Límite Alcanzado",
      `${player.name} ha alcanzado el límite de ${drinkLimit} tragos.\n\n¿Qué quieres hacer?`,
      [
        {
          text: "Continuar jugando",
          onPress: () => {
            // Solo muestra el aviso, no retira
          },
        },
        {
          text: "Retirar de la partida",
          onPress: () => {
            retirePlayer(playerId);
          },
          style: 'destructive',
        },
      ]
    );
  }

  // ... resto de lógica de rachas y vibración
};

const retirePlayer = (playerId: string) => {
  setPlayers(prevPlayers =>
    prevPlayers.map(player =>
      player.id === playerId
        ? { ...player, isRetired: true }
        : player
    )
  );

  Alert.alert(
    "Jugador Retirado",
    "Recuerda: beber con responsabilidad es importante. 🍺",
    [{ text: "Entendido" }]
  );
};
```

```typescript
// src/components/PlayerListItem.tsx - UI para retirados

export default function PlayerListItem({ player, onIncrement }: Props) {
  const { theme } = useTheme();

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: theme.cardBackground },
        player.isRetired && styles.retiredContainer, // Añadir opacidad
      ]}
    >
      <View style={styles.info}>
        <Text style={[styles.avatar, player.isRetired && styles.retiredText]}>
          {player.avatar || '🎭'}
        </Text>
        <Text style={[styles.name, { color: theme.text }, player.isRetired && styles.retiredText]}>
          {player.name}
        </Text>
        {player.isRetired && (
          <View style={styles.retiredBadge}>
            <Text style={styles.retiredBadgeText}>Retirado</Text>
          </View>
        )}
      </View>

      <View style={styles.actions}>
        <Text style={[styles.drinks, { color: theme.text }, player.isRetired && styles.retiredText]}>
          {player.drinks} 🍺
        </Text>
        <TouchableOpacity
          style={[
            styles.button,
            { backgroundColor: theme.primary },
            player.isRetired && styles.disabledButton,
          ]}
          onPress={handlePress}
          disabled={player.isRetired}
        >
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  // ... estilos existentes
  retiredContainer: {
    opacity: 0.5,
  },
  retiredText: {
    textDecorationLine: 'line-through',
  },
  retiredBadge: {
    backgroundColor: '#FF6B35',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    marginLeft: 8,
  },
  retiredBadgeText: {
    color: '#FFF',
    fontSize: 10,
    fontWeight: 'bold',
  },
  disabledButton: {
    backgroundColor: '#999',
  },
});
```

```typescript
// src/components/FinalStatsModal.tsx - indicar retirados

// En el podio, añadir indicador si está retirado:
{winner.isRetired && (
  <Text style={[styles.retiredLabel, { color: theme.textSecondary }]}>
    (Retirado)
  </Text>
)}
```

**Criterios de éxito:**
- ✅ Selector de límite en PlayerSetup
- ✅ Alert aparece al alcanzar límite
- ✅ Jugador puede ser retirado o continuar
- ✅ Jugadores retirados se muestran en gris
- ✅ Botón [+] deshabilitado para retirados
- ✅ Retirados aparecen en estadísticas finales con indicador

---

### **FASE C: MODO DETECTIVES** ⏱️ 10 horas

**Objetivo:** Implementar modo alternativo de juego sin tragos, basado en votaciones secretas.

**Dependencias:** Fase A y B completadas

---

#### C.1 - Infraestructura y Tipos (2 horas)

**Descripción:** Crear tipos y estructura base para el modo detectives.

**Archivos a modificar:**
1. `src/types/index.ts` - añadir tipos DetectivesVote y DetectivesRound
2. `src/screens/CategorySelectionScreen.tsx` - añadir toggle "Modo Detectives"

**Implementación:**

```typescript
// src/types/index.ts - ya incluido en sección de tipos arriba

// src/screens/CategorySelectionScreen.tsx - añadir toggle

export default function CategorySelectionScreen() {
  const [gameMode, setGameMode] = useState<GameMode>('normal');

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Toggle de modo */}
      <View style={styles.modeToggleContainer}>
        <Text style={[styles.modeLabel, { color: theme.text }]}>
          Modo de Juego:
        </Text>
        <View style={styles.modeButtons}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              gameMode === 'normal' && [styles.modeButtonActive, { backgroundColor: theme.primary }],
              gameMode !== 'normal' && { backgroundColor: theme.cardBackground },
            ]}
            onPress={() => setGameMode('normal')}
          >
            <Text style={[styles.modeButtonText, gameMode === 'normal' && styles.modeButtonTextActive]}>
              🍺 Normal (con tragos)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              gameMode === 'detectives' && [styles.modeButtonActive, { backgroundColor: theme.primary }],
              gameMode !== 'detectives' && { backgroundColor: theme.cardBackground },
            ]}
            onPress={() => setGameMode('detectives')}
          >
            <Text style={[styles.modeButtonText, gameMode === 'detectives' && styles.modeButtonTextActive]}>
              🕵️ Detectives (sin tragos)
            </Text>
          </TouchableOpacity>
        </View>

        {gameMode === 'detectives' && (
          <Text style={[styles.modeDescription, { color: theme.textSecondary }]}>
            En modo Detectives, todos votan en secreto si han hecho la cosa o no.
            Luego se revelan las respuestas. Sin tragos, solo para conocerse mejor.
          </Text>
        )}
      </View>

      {/* Botones de categoría existentes */}
      {/* ... */}

      {/* Al navegar, pasar gameMode */}
      <CustomButton
        title={categoryNames[difficulty]}
        onPress={() => {
          navigation.navigate('PlayerSetup', {
            difficulty,
            gameMode  // NUEVO
          });
        }}
        variant="primary"
      />
    </SafeAreaView>
  );
}
```

**Criterios de éxito:**
- ✅ Toggle permite elegir entre Normal y Detectives
- ✅ Descripción clara de cada modo
- ✅ gameMode se pasa correctamente a PlayerSetup

---

#### C.2 - Componente de Votación (4 horas)

**Descripción:** Crear componente para que cada jugador vote SÍ/NO en secreto.

**Archivos a crear:**
1. `src/components/DetectivesVoting.tsx`
2. `src/components/DetectivesResults.tsx`

**Implementación:**

```typescript
// src/components/DetectivesVoting.tsx
import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Player, DetectivesVote } from '../types';
import CustomButton from './CustomButton';

interface Props {
  players: Player[];
  phrase: string;
  onAllVoted: (votes: DetectivesVote[]) => void;
}

export default function DetectivesVoting({ players, phrase, onAllVoted }: Props) {
  const { theme } = useTheme();
  const [votes, setVotes] = useState<DetectivesVote[]>(
    players.map(p => ({ playerId: p.id, voted: false }))
  );

  const handleVote = (playerId: string, voted: boolean) => {
    setVotes(prevVotes =>
      prevVotes.map(v =>
        v.playerId === playerId ? { ...v, voted } : v
      )
    );
  };

  const allVoted = votes.every(v => v.voted !== null);
  const votedCount = votes.filter(v => v.voted).length;

  const renderPlayer = ({ item }: { item: Player }) => {
    const vote = votes.find(v => v.playerId === item.id);
    const hasVoted = vote && vote.voted !== null;

    return (
      <View style={[styles.playerRow, { backgroundColor: theme.cardBackground }]}>
        <Text style={[styles.playerName, { color: theme.text }]}>
          {item.avatar || '🎭'} {item.name}
        </Text>

        <View style={styles.voteButtons}>
          <TouchableOpacity
            style={[
              styles.voteButton,
              vote?.voted === false && [styles.voteButtonActive, { backgroundColor: '#4CAF50' }],
              { borderColor: '#4CAF50' },
            ]}
            onPress={() => handleVote(item.id, false)}
          >
            <Text style={[styles.voteButtonText, vote?.voted === false && styles.voteButtonTextActive]}>
              NO
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.voteButton,
              vote?.voted === true && [styles.voteButtonActive, { backgroundColor: '#FF6B35' }],
              { borderColor: '#FF6B35' },
            ]}
            onPress={() => handleVote(item.id, true)}
          >
            <Text style={[styles.voteButtonText, vote?.voted === true && styles.voteButtonTextActive]}>
              SÍ
            </Text>
          </TouchableOpacity>
        </View>

        {hasVoted && (
          <Text style={[styles.checkmark, { color: theme.primary }]}>✓</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        Vota en secreto
      </Text>
      <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
        ¿Quién ha hecho esto?
      </Text>

      <View style={styles.progressContainer}>
        <Text style={[styles.progressText, { color: theme.text }]}>
          {votedCount} de {players.length} han votado
        </Text>
      </View>

      <FlatList
        data={players}
        renderItem={renderPlayer}
        keyExtractor={item => item.id}
        style={styles.list}
      />

      <CustomButton
        title="Revelar Resultados"
        onPress={() => onAllVoted(votes)}
        variant="primary"
        disabled={!allVoted}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  progressContainer: {
    padding: 12,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    borderRadius: 8,
    marginBottom: 16,
  },
  progressText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
  list: {
    flex: 1,
    marginBottom: 16,
  },
  playerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
    flex: 1,
  },
  voteButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  voteButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 2,
  },
  voteButtonActive: {
    // backgroundColor set dinamically
  },
  voteButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#FFF',
  },
  voteButtonTextActive: {
    color: '#FFF',
  },
  checkmark: {
    fontSize: 24,
    marginLeft: 12,
  },
});
```

```typescript
// src/components/DetectivesResults.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Player, DetectivesVote } from '../types';
import CustomButton from './CustomButton';

interface Props {
  players: Player[];
  votes: DetectivesVote[];
  phrase: string;
  onNext: () => void;
}

export default function DetectivesResults({ players, votes, phrase, onNext }: Props) {
  const { theme } = useTheme();

  const yesVotes = votes.filter(v => v.voted).length;
  const noVotes = votes.filter(v => !v.voted).length;
  const yesPlayers = players.filter(p => votes.find(v => v.playerId === p.id)?.voted);
  const noPlayers = players.filter(p => !votes.find(v => v.playerId === p.id)?.voted);

  return (
    <ScrollView style={styles.container}>
      <Text style={[styles.title, { color: theme.text }]}>
        📊 Resultados
      </Text>

      <View style={styles.summary}>
        <View style={[styles.summaryBox, { backgroundColor: 'rgba(255, 107, 53, 0.2)' }]}>
          <Text style={[styles.summaryCount, { color: '#FF6B35' }]}>{yesVotes}</Text>
          <Text style={[styles.summaryLabel, { color: theme.text }]}>SÍ lo han hecho</Text>
        </View>

        <View style={[styles.summaryBox, { backgroundColor: 'rgba(76, 175, 80, 0.2)' }]}>
          <Text style={[styles.summaryCount, { color: '#4CAF50' }]}>{noVotes}</Text>
          <Text style={[styles.summaryLabel, { color: theme.text }]}>NO lo han hecho</Text>
        </View>
      </View>

      {yesPlayers.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            😈 Lo han hecho:
          </Text>
          {yesPlayers.map(p => (
            <View key={p.id} style={[styles.playerItem, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.playerText, { color: theme.text }]}>
                {p.avatar || '🎭'} {p.name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {noPlayers.length > 0 && (
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            😇 NO lo han hecho:
          </Text>
          {noPlayers.map(p => (
            <View key={p.id} style={[styles.playerItem, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.playerText, { color: theme.text }]}>
                {p.avatar || '🎭'} {p.name}
              </Text>
            </View>
          ))}
        </View>
      )}

      {yesPlayers.length === 0 && (
        <Text style={[styles.noOneText, { color: theme.textSecondary }]}>
          Nadie lo ha hecho... o todos mienten 😏
        </Text>
      )}

      {yesPlayers.length === players.length && (
        <Text style={[styles.everyoneText, { color: theme.primary }]}>
          ¡Todos lo han hecho! Este grupo es salvaje 🔥
        </Text>
      )}

      <CustomButton
        title="Siguiente Frase"
        onPress={onNext}
        variant="primary"
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 32,
  },
  summaryBox: {
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  summaryCount: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  summaryLabel: {
    fontSize: 14,
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  playerItem: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  playerText: {
    fontSize: 16,
  },
  noOneText: {
    fontSize: 16,
    textAlign: 'center',
    fontStyle: 'italic',
    marginVertical: 24,
  },
  everyoneText: {
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
    marginVertical: 24,
  },
});
```

**Criterios de éxito:**
- ✅ Cada jugador puede votar SÍ/NO
- ✅ Se muestra progreso de votación
- ✅ Botón "Revelar" se habilita cuando todos votaron
- ✅ Resultados muestran quién votó qué
- ✅ Mensajes especiales si nadie o todos votaron SÍ

---

#### C.3 - Integración con GameScreen (4 horas)

**Descripción:** Modificar GameScreenMultiplayer para soportar modo detectives.

**Archivos a modificar:**
1. `src/screens/GameScreenMultiplayer.tsx` - conditional rendering según modo

**Implementación:**

```typescript
// src/screens/GameScreenMultiplayer.tsx - añadir lógica para modo detectives

import DetectivesVoting from '../components/DetectivesVoting';
import DetectivesResults from '../components/DetectivesResults';

export default function GameScreenMultiplayer({ route }: Props) {
  const { session } = route.params;
  const { gameMode } = session;

  // Estado para modo detectives
  const [detectivesVotes, setDetectivesVotes] = useState<DetectivesVote[]>([]);
  const [showDetectivesResults, setShowDetectivesResults] = useState(false);

  const handleDetectivesVoted = (votes: DetectivesVote[]) => {
    setDetectivesVotes(votes);
    setShowDetectivesResults(true);
    triggerHaptic('medium');
  };

  const handleDetectivesNext = () => {
    setShowDetectivesResults(false);
    setDetectivesVotes([]);
    nextPhrase();
  };

  // Render condicional según modo
  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header común */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackButton}>
          <Text style={[styles.headerButton, { color: theme.text }]}>✕ Salir</Text>
        </TouchableOpacity>

        {gameMode === 'normal' && (
          <TouchableOpacity onPress={() => setShowStatsModal(true)}>
            <Text style={[styles.headerButton, { color: theme.text }]}>🏆 Stats</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Frase actual */}
      <PhraseCard phrase={currentPhrase} />

      {/* Contador de frases */}
      <Text style={[styles.counter, { color: theme.textSecondary }]}>
        Quedan {unusedPhrases.length} frases
      </Text>

      {/* Render condicional según modo */}
      {gameMode === 'normal' ? (
        // MODO NORMAL (existente)
        <>
          <FlatList
            data={players}
            renderItem={renderPlayerItem}
            keyExtractor={item => item.id}
            style={styles.playersList}
          />

          <View style={styles.buttons}>
            <CustomButton
              title="Siguiente Frase"
              onPress={handleNextPhrase}
              variant="primary"
            />
            <CustomButton
              title="Finalizar Partida"
              onPress={handleFinishGame}
              variant="secondary"
            />
          </View>
        </>
      ) : (
        // MODO DETECTIVES (nuevo)
        <>
          {!showDetectivesResults ? (
            <DetectivesVoting
              players={players}
              phrase={currentPhrase}
              onAllVoted={handleDetectivesVoted}
            />
          ) : (
            <DetectivesResults
              players={players}
              votes={detectivesVotes}
              phrase={currentPhrase}
              onNext={handleDetectivesNext}
            />
          )}

          <CustomButton
            title="Finalizar Partida"
            onPress={handleFinishGame}
            variant="secondary"
          />
        </>
      )}

      {/* Modales */}
      {gameMode === 'normal' && (
        <>
          <StatsModal visible={showStatsModal} onClose={() => setShowStatsModal(false)} players={players} />
          <FinalStatsModal
            visible={showFinalStatsModal}
            onClose={() => setShowFinalStatsModal(false)}
            players={players}
            totalPhrases={phrasesPlayed}
            duration={duration}
            onPlayAgain={handlePlayAgain}
            onExit={handleExit}
          />
        </>
      )}

      {gameMode === 'detectives' && (
        <FinalStatsModal
          visible={showFinalStatsModal}
          onClose={() => setShowFinalStatsModal(false)}
          players={players}
          totalPhrases={phrasesPlayed}
          duration={duration}
          onPlayAgain={handlePlayAgain}
          onExit={handleExit}
          isDetectivesMode={true}  // Nueva prop
        />
      )}
    </SafeAreaView>
  );
}
```

```typescript
// src/components/FinalStatsModal.tsx - añadir soporte para modo detectives

interface Props {
  // ... props existentes
  isDetectivesMode?: boolean;  // NUEVO
}

export default function FinalStatsModal({
  visible,
  onClose,
  players,
  totalPhrases,
  duration,
  onPlayAgain,
  onExit,
  isDetectivesMode = false,  // NUEVO
}: Props) {
  // ... código existente

  // Estadísticas específicas para detectives
  // (Futuro: trackear votos SÍ/NO por jugador y calcular "más sincero", "más inocente")

  return (
    <Modal visible={visible} transparent animationType="fade">
      {/* ... resto del modal */}

      {isDetectivesMode ? (
        <View style={styles.detectivesStats}>
          <Text style={[styles.statsTitle, { color: theme.text }]}>
            🕵️ Modo Detectives Completado
          </Text>
          <Text style={[styles.statsText, { color: theme.textSecondary }]}>
            Frases exploradas: {totalPhrases}
          </Text>
          <Text style={[styles.statsText, { color: theme.textSecondary }]}>
            Tiempo jugado: {Math.floor(duration / 60)} minutos
          </Text>
          <Text style={[styles.statsText, { color: theme.text }]}>
            ¡Ahora conoces mejor a tus amigos! 😏
          </Text>
        </View>
      ) : (
        // Stats normales con podio
        // ... código existente
      )}
    </Modal>
  );
}
```

**Criterios de éxito:**
- ✅ Modo Normal sigue funcionando como antes
- ✅ Modo Detectives muestra votación en lugar de lista de jugadores
- ✅ Resultados de votación se muestran correctamente
- ✅ Al finalizar, estadísticas apropiadas según modo
- ✅ No se trackean tragos en modo Detectives

---

### **FASE D: MULTIPLAYER LOCAL P2P (NO ES OPCIONAL)** ⏱️ 22 horas

**Dependencias:** Fases A, B, C completadas

---

#### D.1 - Servicio de Networking Base (6 horas)

**Descripción:** Crear servicio base para comunicación Bluetooth/WiFi P2P.

**Archivos a crear:**
1. `src/services/localMultiplayer.ts`

**Dependencias a instalar:**
```bash
npx expo install react-native-ble-plx
npm install react-native-wifi-p2p
```

**Implementación:**

```typescript
// src/services/localMultiplayer.ts
import { BleManager, Device } from 'react-native-ble-plx';
import { NetworkMessage, NetworkPlayer, LocalGameSession } from '../types';
import { Platform } from 'react-native';

const SERVICE_UUID = 'YO-NUNCA-SERVICE-UUID'; // Debe ser UUID válido
const CHARACTERISTIC_UUID = 'YO-NUNCA-CHAR-UUID';

class LocalMultiplayerService {
  private bleManager: BleManager;
  private isHost: boolean = false;
  private connectedDevices: Device[] = [];
  private messageQueue: NetworkMessage[] = [];
  private onMessageCallback?: (message: NetworkMessage) => void;

  constructor() {
    this.bleManager = new BleManager();
  }

  // Inicializar como HOST
  async startHost(): Promise<string> {
    // Generar código de 6 dígitos
    const gameCode = Math.floor(100000 + Math.random() * 900000).toString();

    this.isHost = true;

    // Iniciar advertising Bluetooth
    if (Platform.OS === 'android') {
      // Implementación específica Android
      // TODO: Configurar BLE advertising
    } else if (Platform.OS === 'ios') {
      // Implementación específica iOS
      // TODO: Configurar BLE peripheral
    }

    return gameCode;
  }

  // Escanear partidas disponibles (CLIENTE)
  async scanForGames(): Promise<NetworkPlayer[]> {
    const availableHosts: NetworkPlayer[] = [];

    // Escanear dispositivos BLE cercanos
    this.bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error('Scan error:', error);
        return;
      }

      if (device && device.name?.startsWith('YoNunca-')) {
        // Parsear info del host
        const hostInfo: NetworkPlayer = {
          id: device.id,
          name: device.name.replace('YoNunca-', ''),
          deviceId: device.id,
          isHost: true,
        };
        availableHosts.push(hostInfo);
      }
    });

    // Escanear por 10 segundos
    await new Promise(resolve => setTimeout(resolve, 10000));
    this.bleManager.stopDeviceScan();

    return availableHosts;
  }

  // Conectar a un HOST (CLIENTE)
  async joinGame(hostId: string, playerName: string): Promise<void> {
    try {
      const device = await this.bleManager.connectToDevice(hostId);
      await device.discoverAllServicesAndCharacteristics();

      // Enviar mensaje de join
      const joinMessage: NetworkMessage = {
        type: 'PLAYER_JOIN',
        payload: { name: playerName },
        timestamp: Date.now(),
      };

      await this.sendMessage(joinMessage, device);

      this.connectedDevices.push(device);
    } catch (error) {
      console.error('Join error:', error);
      throw error;
    }
  }

  // Enviar mensaje
  async sendMessage(message: NetworkMessage, device?: Device) {
    const serialized = JSON.stringify(message);

    if (this.isHost) {
      // Broadcast a todos los clientes
      for (const dev of this.connectedDevices) {
        try {
          await dev.writeCharacteristicWithResponseForService(
            SERVICE_UUID,
            CHARACTERISTIC_UUID,
            Buffer.from(serialized).toString('base64')
          );
        } catch (error) {
          console.error('Error sending to device:', error);
        }
      }
    } else if (device) {
      // Enviar solo al host
      await device.writeCharacteristicWithResponseForService(
        SERVICE_UUID,
        CHARACTERISTIC_UUID,
        Buffer.from(serialized).toString('base64')
      );
    }
  }

  // Recibir mensajes
  onMessage(callback: (message: NetworkMessage) => void) {
    this.onMessageCallback = callback;
  }

  // Desconectar
  async disconnect() {
    for (const device of this.connectedDevices) {
      await device.cancelConnection();
    }
    this.connectedDevices = [];
    if (this.isHost) {
      this.bleManager.stopDeviceScan();
    }
  }

  // Heartbeat (keepalive)
  startHeartbeat() {
    setInterval(() => {
      const heartbeat: NetworkMessage = {
        type: 'HEARTBEAT',
        payload: {},
        timestamp: Date.now(),
      };
      this.sendMessage(heartbeat);
    }, 5000); // Cada 5 segundos
  }
}

export default new LocalMultiplayerService();
```

**Nota:** Esta es una implementación simplificada. La versión real requeriría:
- Manejo robusto de errores
- Reconexión automática
- Detección de desconexiones
- Encriptación de mensajes (opcional)
- Soporte para WiFi Direct en Android

**Criterios de éxito:**
- ✅ Host puede iniciar advertising
- ✅ Cliente puede escanear y ver hosts disponibles
- ✅ Cliente puede conectarse a host
- ✅ Mensajes básicos se envían/reciben

---

#### D.2 - Pantallas de Lobby (4 horas)

**Descripción:** Crear pantallas de host y cliente para gestionar conexiones.

**Archivos a crear:**
1. `src/screens/LocalHostScreen.tsx`
2. `src/screens/LocalJoinScreen.tsx`
3. `src/components/LocalLobby.tsx`
4. `src/components/ConnectionStatus.tsx`

**Implementación:**

```typescript
// src/screens/LocalHostScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import LocalMultiplayerService from '../services/localMultiplayer';

export default function LocalHostScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [gameCode, setGameCode] = useState<string>('');
  const [connectedPlayers, setConnectedPlayers] = useState<NetworkPlayer[]>([]);

  useEffect(() => {
    async function initHost() {
      const code = await LocalMultiplayerService.startHost();
      setGameCode(code);

      LocalMultiplayerService.onMessage((message) => {
        if (message.type === 'PLAYER_JOIN') {
          const player: NetworkPlayer = {
            id: Date.now().toString(),
            name: message.payload.name,
            deviceId: message.payload.deviceId,
            isHost: false,
          };
          setConnectedPlayers(prev => [...prev, player]);
        }
      });
    }

    initHost();

    return () => {
      LocalMultiplayerService.disconnect();
    };
  }, []);

  const handleStartGame = () => {
    if (connectedPlayers.length < 1) {
      Alert.alert('Jugadores insuficientes', 'Necesitas al menos 1 jugador conectado');
      return;
    }

    // Enviar mensaje de inicio a todos
    const startMessage: NetworkMessage = {
      type: 'GAME_START',
      payload: { difficulty: 'medio' }, // TODO: Permitir elegir
      timestamp: Date.now(),
    };
    LocalMultiplayerService.sendMessage(startMessage);

    // Navegar a CategorySelection en modo host
    navigation.navigate('CategorySelection', { isLocalMultiplayer: true, isHost: true });
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Partida Local - Host
      </Text>

      <View style={styles.codeContainer}>
        <Text style={[styles.codeLabel, { color: theme.textSecondary }]}>
          Código de partida:
        </Text>
        <Text style={[styles.code, { color: theme.primary }]}>
          {gameCode}
        </Text>
        <Text style={[styles.codeHint, { color: theme.textSecondary }]}>
          Los jugadores deben ingresar este código
        </Text>
      </View>

      <View style={styles.playersSection}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Jugadores Conectados ({connectedPlayers.length})
        </Text>

        {connectedPlayers.length === 0 && (
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            Esperando jugadores...
          </Text>
        )}

        <FlatList
          data={connectedPlayers}
          renderItem={({ item }) => (
            <View style={[styles.playerItem, { backgroundColor: theme.cardBackground }]}>
              <Text style={[styles.playerName, { color: theme.text }]}>
                🎭 {item.name}
              </Text>
              <Text style={[styles.playerStatus, { color: theme.primary }]}>
                ✓ Conectado
              </Text>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <CustomButton
        title="Iniciar Juego"
        onPress={handleStartGame}
        variant="primary"
        disabled={connectedPlayers.length < 1}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  codeContainer: {
    alignItems: 'center',
    padding: 24,
    backgroundColor: 'rgba(212, 165, 116, 0.2)',
    borderRadius: 16,
    marginBottom: 32,
  },
  codeLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  code: {
    fontSize: 48,
    fontWeight: 'bold',
    letterSpacing: 8,
  },
  codeHint: {
    fontSize: 12,
    marginTop: 8,
    fontStyle: 'italic',
  },
  playersSection: {
    flex: 1,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 24,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  playerName: {
    fontSize: 16,
    fontWeight: '600',
  },
  playerStatus: {
    fontSize: 14,
  },
});
```

```typescript
// src/screens/LocalJoinScreen.tsx
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import LocalMultiplayerService from '../services/localMultiplayer';

export default function LocalJoinScreen({ navigation }: any) {
  const { theme } = useTheme();
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');
  const [availableGames, setAvailableGames] = useState<NetworkPlayer[]>([]);
  const [scanning, setScanning] = useState(false);

  const handleScan = async () => {
    setScanning(true);
    const games = await LocalMultiplayerService.scanForGames();
    setAvailableGames(games);
    setScanning(false);
  };

  const handleJoinByCode = async () => {
    if (playerName.trim().length < 2) {
      Alert.alert('Nombre inválido', 'Ingresa tu nombre');
      return;
    }
    if (gameCode.trim().length !== 6) {
      Alert.alert('Código inválido', 'El código debe tener 6 dígitos');
      return;
    }

    try {
      // TODO: Buscar host por código
      // await LocalMultiplayerService.joinGame(hostId, playerName);

      Alert.alert('Conectado', 'Esperando que el host inicie el juego...');
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar a la partida');
    }
  };

  const handleJoinGame = async (hostId: string) => {
    if (playerName.trim().length < 2) {
      Alert.alert('Nombre inválido', 'Primero ingresa tu nombre');
      return;
    }

    try {
      await LocalMultiplayerService.joinGame(hostId, playerName);
      Alert.alert('Conectado', 'Esperando que el host inicie el juego...');
    } catch (error) {
      Alert.alert('Error', 'No se pudo conectar');
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <Text style={[styles.title, { color: theme.text }]}>
        Unirse a Partida Local
      </Text>

      <View style={styles.nameSection}>
        <Text style={[styles.label, { color: theme.text }]}>Tu nombre:</Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text }]}
          value={playerName}
          onChangeText={setPlayerName}
          placeholder="Ingresa tu nombre"
          placeholderTextColor={theme.textSecondary}
          maxLength={20}
        />
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Opción 1: Ingresar código
        </Text>
        <TextInput
          style={[styles.input, { backgroundColor: theme.cardBackground, color: theme.text }]}
          value={gameCode}
          onChangeText={setGameCode}
          placeholder="123456"
          placeholderTextColor={theme.textSecondary}
          keyboardType="number-pad"
          maxLength={6}
        />
        <CustomButton
          title="Unirse por Código"
          onPress={handleJoinByCode}
          variant="primary"
        />
      </View>

      <View style={styles.divider} />

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Opción 2: Buscar partidas cercanas
        </Text>

        <CustomButton
          title={scanning ? "Buscando..." : "Buscar Partidas"}
          onPress={handleScan}
          variant="secondary"
          disabled={scanning}
        />

        {availableGames.length > 0 && (
          <FlatList
            data={availableGames}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.gameItem, { backgroundColor: theme.cardBackground }]}
                onPress={() => handleJoinGame(item.deviceId)}
              >
                <Text style={[styles.gameName, { color: theme.text }]}>
                  {item.name}
                </Text>
                <Text style={[styles.joinText, { color: theme.primary }]}>
                  Unirse →
                </Text>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
          />
        )}

        {!scanning && availableGames.length === 0 && (
          <Text style={[styles.emptyText, { color: theme.textSecondary }]}>
            No hay partidas cercanas
          </Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  // ... estilos similares a LocalHostScreen
});
```

**Criterios de éxito:**
- ✅ Host genera código y lo muestra
- ✅ Host ve jugadores que se conectan en tiempo real
- ✅ Cliente puede ingresar código manualmente
- ✅ Cliente puede escanear partidas cercanas
- ✅ Cliente puede conectarse a host

---

#### D.3 - Sincronización de Estado (6 horas)

**Descripción:** Implementar protocolo de mensajes para sincronizar frases, tragos, etc.

**Archivos a modificar:**
1. `src/screens/GameScreenMultiplayer.tsx` - lógica de sincronización
2. `src/hooks/useLocalMultiplayer.ts` (crear hook helper)

**Implementación:**

```typescript
// src/hooks/useLocalMultiplayer.ts
import { useEffect, useState } from 'react';
import LocalMultiplayerService from '../services/localMultiplayer';
import { NetworkMessage, Player } from '../types';

export function useLocalMultiplayer(isHost: boolean) {
  const [remotePlayers, setRemotePlayers] = useState<Player[]>([]);

  useEffect(() => {
    LocalMultiplayerService.onMessage((message: NetworkMessage) => {
      handleMessage(message);
    });

    if (isHost) {
      LocalMultiplayerService.startHeartbeat();
    }
  }, []);

  const handleMessage = (message: NetworkMessage) => {
    switch (message.type) {
      case 'DRINK_INCREMENT':
        // Actualizar tragos de jugador remoto
        setRemotePlayers(prev =>
          prev.map(p =>
            p.id === message.payload.playerId
              ? { ...p, drinks: message.payload.newDrinks }
              : p
          )
        );
        break;

      case 'PHRASE_UPDATE':
        // Host envió nueva frase
        // TODO: Actualizar frase actual
        break;

      case 'GAME_END':
        // Host finalizó partida
        // TODO: Mostrar stats finales
        break;

      // ... más casos
    }
  };

  const sendDrinkIncrement = (playerId: string, newDrinks: number) => {
    const message: NetworkMessage = {
      type: 'DRINK_INCREMENT',
      payload: { playerId, newDrinks },
      timestamp: Date.now(),
    };
    LocalMultiplayerService.sendMessage(message);
  };

  const sendPhraseUpdate = (phrase: string, phraseNumber: number) => {
    const message: NetworkMessage = {
      type: 'PHRASE_UPDATE',
      payload: { phrase, phraseNumber },
      timestamp: Date.now(),
    };
    LocalMultiplayerService.sendMessage(message);
  };

  return {
    remotePlayers,
    sendDrinkIncrement,
    sendPhraseUpdate,
  };
}
```

**Criterios de éxito:**
- ✅ Host puede enviar nueva frase a todos
- ✅ Clientes reciben frase actualizada
- ✅ Cliente puede incrementar sus tragos
- ✅ Host ve tragos actualizados de todos
- ✅ Todos los clientes ven tragos actualizados

---

#### D.4 - Testing y Polish (6 horas)

**Descripción:** Testing exhaustivo con múltiples dispositivos y manejo de edge cases.

**Testing requerido:**
- Conectar 2 dispositivos Android
- Conectar 5 dispositivos (límite razonable para Bluetooth)
- Simular desconexión de cliente
- Simular desconexión de host
- Verificar alcance (10-30 metros)
- Verificar latencia de sincronización
- Probar reconexión automática

**Edge cases a manejar:**
- Host se desconecta → terminar partida para todos
- Cliente se desconecta → marcar como desconectado, permitir reconexión
- Mensajes duplicados → deduplicar por timestamp
- Orden de mensajes → buffer y ordenar
- Lag de red → mostrar indicador de "sincronizando"

**Criterios de éxito:**
- ✅ Funciona con 2-7 dispositivos
- ✅ Manejo robusto de desconexiones
- ✅ Latencia aceptable (< 500ms)
- ✅ Reconexión automática funciona
- ✅ UI muestra estado de conexión claramente

---

## 🗂️ ESTRUCTURA DE ARCHIVOS FINAL

```
yo-nunca/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx (modificada - botones multiplayer local)
│   │   ├── AgeGateScreen.tsx (NUEVA)
│   │   ├── CategorySelectionScreen.tsx (modificada - toggle modo detectives)
│   │   ├── PlayerSetupScreen.tsx (modificada - límite de tragos)
│   │   ├── GameScreenMultiplayer.tsx (modificada - rachas, límites, modo detectives, networking)
│   │   ├── LocalHostScreen.tsx (NUEVA)
│   │   ├── LocalJoinScreen.tsx (NUEVA)
│   │   ├── GlobalStatsScreen.tsx (existente)
│   │   ├── CustomPhrasesScreen.tsx (modificada - validación)
│   │   └── SettingsScreen.tsx (modificada - vibración, legal, reset)
│   ├── components/
│   │   ├── CustomButton.tsx (existente)
│   │   ├── PhraseCard.tsx (existente)
│   │   ├── PlayerListItem.tsx (modificada - rachas, vibración, retirados)
│   │   ├── StatsModal.tsx (existente)
│   │   ├── FinalStatsModal.tsx (modificada - rachas, modo detectives)
│   │   ├── ResumeGameModal.tsx (existente)
│   │   ├── CagonModal.tsx (existente)
│   │   ├── ResponsibilityDisclaimer.tsx (NUEVA)
│   │   ├── DetectivesVoting.tsx (NUEVA)
│   │   ├── DetectivesResults.tsx (NUEVA)
│   │   ├── LocalLobby.tsx (NUEVA)
│   │   ├── ConnectionStatus.tsx (NUEVA)
│   │   ├── BeerTransitionAnimation.tsx (existente)
│   │   └── IdleBubblesAnimation.tsx (existente)
│   ├── hooks/
│   │   ├── usePhrases.ts (existente)
│   │   ├── usePlayers.ts (modificado - rachas, retirados)
│   │   ├── useGameSession.ts (existente)
│   │   ├── useStats.ts (modificado - rachas)
│   │   ├── useAutoSave.ts (existente)
│   │   ├── useRateLimit.ts (existente)
│   │   ├── useGlobalStats.ts (modificado - rachas)
│   │   └── useLocalMultiplayer.ts (NUEVO)
│   ├── services/
│   │   └── localMultiplayer.ts (NUEVO)
│   ├── data/
│   │   ├── phrases/ (existente)
│   │   ├── funnyNames.ts (existente)
│   │   ├── funnyMessages.ts (existente)
│   │   └── cagonPhrases.ts (existente)
│   ├── utils/
│   │   ├── storage.ts (modificado - edad, vibración, validación)
│   │   ├── haptics.ts (NUEVO)
│   │   ├── validation.ts (NUEVO)
│   │   └── sanitization.ts (NUEVO)
│   ├── constants/
│   │   └── Colors.ts (existente)
│   └── types/
│       └── index.ts (modificado - nuevos tipos)
├── docs/
│   ├── PRIVACY_POLICY_V2.md (NUEVA)
│   ├── TERMS_OF_SERVICE.md (NUEVA)
│   └── ... otros docs existentes
├── assets/ (existentes)
└── App.tsx (existente)
```

---

## 🧪 TESTING CHECKLIST

### Por Fase:

**FASE A (Legal y Seguridad):**
- [ ] Age gate se muestra solo la primera vez
- [ ] No se puede saltar age gate presionando "atrás"
- [ ] Políticas accesibles desde Settings
- [ ] Nombres de jugadores validados correctamente
- [ ] Frases personalizadas sanitizadas
- [ ] Rate limiting funciona en todas las acciones

**FASE B (Quick Wins):**
- [ ] Rachas se detectan y muestran mensaje
- [ ] Mejor racha aparece en stats finales
- [ ] Vibración funciona en dispositivo real
- [ ] Toggle de vibración habilita/deshabilita
- [ ] Límite de tragos muestra alert al alcanzarlo
- [ ] Jugadores retirados se ven en gris
- [ ] Jugadores retirados no pueden beber más

**FASE C (Modo Detectives):**
- [ ] Toggle permite elegir modo
- [ ] Votación funciona correctamente
- [ ] Resultados se muestran bien
- [ ] Modo normal sigue funcionando
- [ ] Stats finales apropiadas para cada modo

**FASE D (Multiplayer Local - OPCIONAL):**
- [ ] Host genera código
- [ ] Cliente puede escanear partidas
- [ ] Cliente puede conectarse
- [ ] Frase se sincroniza a todos
- [ ] Tragos se sincronizan a todos
- [ ] Desconexión de cliente se maneja bien
- [ ] Desconexión de host termina partida

### Edge Cases:

- [ ] App funciona sin internet
- [ ] Funciona con 2 jugadores
- [ ] Funciona con 20 jugadores
- [ ] Agotar todas las frases de una categoría
- [ ] Cerrar app en medio de partida (modo detectives)
- [ ] Nombres muy largos se manejan bien
- [ ] Frases muy largas se manejan bien
- [ ] Spam en botones no causa bugs
- [ ] Múltiples jugadores con mismo nombre (no debería permitirse)

---

## ⚠️ RIESGOS Y CONSIDERACIONES

### Riesgos técnicos:

1. **Multiplayer Local muy complejo**
   - Mitigación: Hacer opcional, implementar post-lanzamiento
   - Requiere testing extensivo con dispositivos físicos
   - Limitaciones de Bluetooth (máx 7 dispositivos)

2. **Vibración no funciona en emulador**
   - Mitigación: Testing en dispositivo real obligatorio

3. **Age gate podría tener exploits**
   - Mitigación: Verificación simple pero efectiva, responsabilidad del usuario

4. **Rate limiting podría frustrar usuarios legítimos**
   - Mitigación: Límites generosos, mensajes claros

### Riesgos de UX:

1. **Modo Detectives puede confundir**
   - Mitigación: Descripción clara al seleccionar modo
   - Tutorial opcional (futuro)

2. **Límite de tragos puede ser ignorado**
   - Mitigación: Es opcional, depende del grupo decidir

3. **Demasiadas opciones pueden abrumar**
   - Mitigación: Valores por defecto sensatos, opciones avanzadas ocultas

### Dependencias críticas:

```json
{
  "react-native-ble-plx": "^2.x",     // Solo si implementas Fase D
  "react-native-wifi-p2p": "^latest",  // Solo si implementas Fase D, solo Android
}
```

### Permisos adicionales requeridos:

```json
// app.json - solo si implementas Fase D
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

## 📊 ORDEN DE EJECUCIÓN RECOMENDADO

### Sesión 1 (9 horas): Legal y Seguridad - CRÍTICO
**Objetivo:** App legalmente segura antes de producción
- FASE A.1: Age Gate (2h)
- FASE A.2: Políticas legales (2h)
- FASE A.3: Validación y sanitización (3h)
- FASE A.4: Rate limiting (2h)

### Sesión 2 (5 horas): Quick Wins - Gamificación
**Objetivo:** Mejorar experiencia de juego
- FASE B.1: Contador de rachas (2h)
- FASE B.2: Vibración (1h)
- FASE B.3: Límite de alcohol (2h)

### Sesión 3 (10 horas): Modo Detectives
**Objetivo:** Nuevo modo de juego
- FASE C.1: Infraestructura y tipos (2h)
- FASE C.2: Componente de votación (4h)
- FASE C.3: Integración con GameScreen (4h)

### Sesión 4 (22 horas): Multiplayer Local - OPCIONAL
**Objetivo:** Juego multiplataforma P2P
- FASE D.1: Servicio de networking (6h)
- FASE D.2: Pantallas de lobby (4h)
- FASE D.3: Sincronización de estado (6h)
- FASE D.4: Testing y polish (6h)

**TOTAL: 24 horas (sin Multiplayer Local) o 46 horas (completo)**

---

## ✅ CHECKLIST DE COMPLETITUD V3.0

Al final de V3.0, la app debe tener:

### Must-Have (Fases A, B, C):
- ✅ Age gate obligatorio al abrir
- ✅ Políticas de privacidad y términos actualizados
- ✅ Validación y sanitización de todos los inputs
- ✅ Rate limiting en acciones críticas
- ✅ Contador de rachas con mensajes especiales
- ✅ Vibración en eventos importantes (configurable)
- ✅ Límite de tragos configurable
- ✅ Modo Detectives funcional
- ✅ Estadísticas adaptadas a cada modo
- ✅ Sin bugs críticos
- ✅ Performance optimizada

### Nice-to-Have (Fase D):
- ✅ Multiplayer local P2P (Bluetooth/WiFi)
- ✅ Lobby de host y cliente
- ✅ Sincronización en tiempo real
- ✅ Manejo robusto de desconexiones

### Backwards Compatibility:
- ✅ Partidas guardadas de V2.1 funcionan en V3.0
- ✅ Estadísticas globales se migran correctamente
- ✅ Frases personalizadas se preservan
- ✅ Configuraciones de usuario se preservan

---

## 🚀 PRÓXIMOS PASOS DESPUÉS DE V3.0

1. **Testing exhaustivo** (1 semana)
   - Testing manual completo
   - Testing con usuarios reales
   - Recopilar feedback

2. **Preparación para producción** (Fase 9 del devlog original)
   - Crear assets finales (icono, splash)
   - Build de APK/AAB
   - Subir a Google Play

3. **Post-lanzamiento** (continuo)
   - Monitorear reviews
   - Recopilar métricas
   - Implementar Fase D si se desea
   - Futuras features (traducciones, más categorías, etc.)

---

**Fecha de creación:** 2025-10-24
**Versión:** 3.0
**Estado:** Listo para implementación
**Autor:** Claude Code (en modo plan)

---

**¿Listo para implementar?**
