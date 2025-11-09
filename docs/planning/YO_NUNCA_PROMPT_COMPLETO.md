# Desarrollo y Publicación de "Yo Nunca" - App para Google Play Store

Quiero que actúes como un desarrollador senior de React Native experto en Expo. Tu tarea es crear desde cero una app móvil **"Yo Nunca"** (juego de beber para mayores de edad) lista para publicar en **Google Play Store**.

## 🎯 Objetivos del proyecto

### Objetivo 1: Desarrollo funcional
- App completa en React Native + Expo + TypeScript
- Funciona 100% offline (sin conexión a internet)
- Interfaz minimalista, rápida y atractiva
- Sistema de frases aleatorias sin repetición
- Gestión de frases personalizadas con persistencia local

### Objetivo 2: Preparación para Google Play Store
- Configuración completa para compilación de producción
- Assets en formatos correctos (icono, splash, screenshots)
- Política de privacidad incluida
- Clasificación de contenido: 18+ (Mature)
- Build listo para subir a Google Play Console

---

## 🛠️ PARTE A: DESARROLLO DE LA APP

### Stack tecnológico

#### Core
- **Framework:** React Native con Expo SDK 51 o superior
- **Lenguaje:** TypeScript estricto
- **IDE:** VS Code
- **Plataforma inicial:** Android (Google Play)
- **Plataforma futura:** iOS (preparar código compatible)

#### Dependencias principales
```json
{
  "@react-navigation/native": "^6.x",
  "@react-navigation/stack": "^6.x",
  "@react-native-async-storage/async-storage": "^1.x",
  "react-native-screens": "^3.x",
  "react-native-safe-area-context": "^4.x",
  "expo": "~51.x",
  "expo-status-bar": "~1.x"
}
```

#### Gestión de estado
- React Hooks (useState, useEffect, useContext)
- Context API para tema (oscuro/claro)
- AsyncStorage para persistencia de frases personalizadas
- NO usar Redux (mantener simplicidad)

---

### 🎮 Funcionalidad detallada

#### 1. HomeScreen (Pantalla de inicio)
**Elementos visuales:**
- Logo/título grande centrado: "🍻 Yo Nunca"
- Subtítulo: "El juego de beber definitivo"
- Botón principal grande: "Jugar" (color dorado)
- Botón secundario: "Mis Frases" (color morado)
- Icono de configuración en esquina superior derecha (⚙️)

**Navegación:**
- "Jugar" → GameScreen
- "Mis Frases" → CustomPhrasesScreen
- Icono ⚙️ → SettingsScreen

---

#### 2. GameScreen (Pantalla de juego)
**Elementos visuales:**
- Tarjeta grande centrada con la frase actual
- Formato: "Yo nunca..." seguido de la frase
- Botón principal grande: "Siguiente" (siguiente frase)
- Botón pequeño arriba: "↻ Reiniciar" (resetea pool de frases)
- Contador sutil abajo: "Quedan X frases"

**Lógica de frases (CRÍTICO):**
```typescript
// Pseudocódigo de la lógica esperada:
const allPhrases = [...defaultPhrases, ...customPhrases];
const [unusedPhrases, setUnusedPhrases] = useState(shuffle(allPhrases));
const [currentPhrase, setCurrentPhrase] = useState(unusedPhrases[0]);

function nextPhrase() {
  if (unusedPhrases.length === 1) {
    // Última frase, resetear pool
    alert("¡Se acabaron las frases! Reiniciando...");
    setUnusedPhrases(shuffle(allPhrases));
    setCurrentPhrase(unusedPhrases[0]);
  } else {
    // Mostrar siguiente sin repetir
    const remaining = unusedPhrases.slice(1);
    setUnusedPhrases(remaining);
    setCurrentPhrase(remaining[0]);
  }
}
```

**Requisitos:**
- ✅ NO repetir frases hasta agotar todo el pool
- ✅ Mezclar frases predefinidas + personalizadas en un solo pool
- ✅ Shuffle/barajar frases al inicio y al resetear
- ✅ Mostrar contador de frases restantes
- ✅ Permitir reiniciar manualmente en cualquier momento

---

#### 3. CustomPhrasesScreen (Gestión de frases personalizadas)
**Elementos visuales:**
- Header: "Mis Frases Personalizadas"
- Botón superior: "+ Añadir Nueva Frase"
- Lista scrolleable de frases (FlatList)
- Cada item tiene:
  - Texto de la frase
  - Icono de eliminar (🗑️) a la derecha
- Botón inferior: "Eliminar Todas" (con confirmación)
- Estado vacío: Mensaje amigable si no hay frases

**Funcionalidad:**
- Al tocar "+ Añadir Nueva Frase" → Modal/Alert con input de texto
- Validación: mínimo 10 caracteres, máximo 200 caracteres, no vacío
- Al tocar 🗑️ en una frase → Eliminar esa frase específica
- "Eliminar Todas" → Diálogo de confirmación antes de borrar
- Persistir en AsyncStorage cada cambio inmediatamente

**Límite recomendado:**
- Máximo 100 frases personalizadas
- Mostrar warning si se intenta superar

---

#### 4. SettingsScreen (Configuración)
**Elementos:**
- Toggle: "Modo oscuro" (guardar preferencia en AsyncStorage)
- Botón: "Resetear frases personalizadas" (con diálogo de confirmación)
- Sección informativa:
  - Versión de la app (leer de app.json)
  - "Hecho con ❤️ para fiestas épicas"
  - Botón: "Política de Privacidad" → Modal con texto completo

**Funcionalidad:**
- Toggle mode oscuro/claro con cambio inmediato
- Persistir preferencia de tema
- Resetear frases = eliminar todas las personalizadas

---

### 📁 Estructura de carpetas

```
yo-nunca/
├── App.tsx
├── app.json
├── eas.json
├── package.json
├── tsconfig.json
├── babel.config.js
├── metro.config.js
├── .gitignore
├── assets/
│   ├── icon.png (1024x1024)
│   ├── adaptive-icon.png (1024x1024)
│   ├── splash.png (1284x2778)
│   └── favicon.png (48x48)
├── src/
│   ├── navigation/
│   │   └── AppNavigator.tsx
│   ├── screens/
│   │   ├── HomeScreen.tsx
│   │   ├── GameScreen.tsx
│   │   ├── CustomPhrasesScreen.tsx
│   │   └── SettingsScreen.tsx
│   ├── components/
│   │   ├── PhraseCard.tsx
│   │   └── CustomButton.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   └── usePhrases.ts
│   ├── data/
│   │   └── defaultPhrases.ts
│   ├── utils/
│   │   ├── storage.ts
│   │   └── shuffle.ts
│   ├── constants/
│   │   └── Colors.ts
│   ├── types/
│   │   └── index.ts
│   └── legal/
│       └── PrivacyPolicy.ts
├── docs/
│   ├── PRIVACY_POLICY.md
│   └── ICON_GUIDE.md
└── README.md
```

---

### 🎨 Diseño visual

#### Paleta de colores - Tema oscuro (por defecto)
```typescript
export const DarkTheme = {
  background: '#0F0F0F',      // Negro profundo
  cardBackground: '#1E1E1E',  // Gris muy oscuro
  primary: '#FFD700',         // Dorado brillante
  secondary: '#9D4EDD',       // Morado vibrante
  text: '#FFFFFF',            // Blanco
  textSecondary: '#B0B0B0',   // Gris claro
  danger: '#FF4444',          // Rojo para eliminar
  success: '#00C851',         // Verde para éxito
  border: '#333333',          // Bordes sutiles
};
```

#### Paleta de colores - Tema claro
```typescript
export const LightTheme = {
  background: '#F5F5F5',      // Gris muy claro
  cardBackground: '#FFFFFF',  // Blanco
  primary: '#FFA500',         // Naranja
  secondary: '#7B2CBF',       // Morado oscuro
  text: '#1E1E1E',            // Casi negro
  textSecondary: '#666666',   // Gris medio
  danger: '#D32F2F',          // Rojo oscuro
  success: '#388E3C',         // Verde oscuro
  border: '#E0E0E0',          // Bordes grises
};
```

#### Tipografía
- **Título principal (HomeScreen):** 36px, bold, centrado
- **Frases del juego:** 26px, regular, centrado, line-height: 1.5
- **Botones grandes:** 20px, semi-bold
- **Botones pequeños:** 16px, regular
- **Texto secundario:** 14px, regular
- **Emojis:** Usar con moderación (🍻, 🎉, 🔥, 😈, ⚙️, 🗑️)

#### Componentes de UI
- **Botones principales:**
  - Border radius: 16px
  - Padding vertical: 16px
  - Padding horizontal: 32px
  - Sombra sutil (elevation: 4)

- **Tarjeta de frase (GameScreen):**
  - Border radius: 20px
  - Padding: 32px
  - Sombra media (elevation: 6)
  - Centrada vertical y horizontalmente
  - Min height: 200px

- **Items de lista (CustomPhrasesScreen):**
  - Border radius: 12px
  - Padding: 16px
  - Margin bottom: 8px
  - Fondo card background

---

### 💾 Datos y contenido

#### Frases predefinidas (`src/data/defaultPhrases.ts`)

**IMPORTANTE:** Necesitas proporcionar exactamente 50 frases variadas en tono. Aquí ejemplos por categoría:

**Suaves (10 frases):**
- "he mentido en mi CV"
- "he cancelado planes fingiendo estar enfermo"
- "he llorado viendo una película de Disney"
- "he hablado solo en público"
- "he olvidado el cumpleaños de alguien importante"
- "he cantado en la ducha pensando que nadie me escucha"
- "he visto todos los capítulos de una serie en un día"
- "he robado comida del frigorífico de mis compañeros de piso"
- "he usado la misma contraseña para todo"
- "he fingido entender algo que no entendía en absoluto"

**Medias (15 frases):**
- "he espiado el móvil de mi pareja"
- "he robado algo de una tienda"
- "he enviado un mensaje hot a la persona equivocada"
- "he mentido sobre mi edad"
- "he stalkeado a mi ex en redes sociales"
- "he fingido un orgasmo"
- "he besado a alguien solo por una apuesta"
- "he llamado enfermo al trabajo para quedarme en casa sin hacer nada"
- "he mentido sobre mi trabajo o estudios"
- "he odiado el regalo de alguien pero fingí que me encantaba"
- "he tenido sueños sexuales con alguien presente aquí"
- "he guardado rencor a alguien durante años"
- "he escrito una carta de amor que nunca envié"
- "he ido a trabajar con resaca"
- "he borrado mensajes comprometedores antes de que los leyeran"

**Picantes (15 frases):**
- "he tenido un lío con alguien del trabajo"
- "he tenido sexo en un lugar público"
- "he mandado nudes a un desconocido"
- "he hecho un trío"
- "he tenido sexo en la primera cita"
- "he engañado a mi pareja"
- "he tenido sexo con más de una persona en el mismo día"
- "he tenido un rollo de una noche y no recuerdo su nombre"
- "he fingido estar soltero/a para ligar"
- "he tenido una aventura con alguien comprometido"
- "he tenido fantasías sexuales con el/la ex de un amigo/a"
- "he practicado sexting durante horas de trabajo"
- "he tenido sexo en casa de mis padres con ellos dentro"
- "he participado en un juego sexual en grupo"
- "he usado juguetes sexuales"

**Muy picantes/cerdas (10 frases):**
- "he grabado un vídeo sexual"
- "he ido a un club de intercambio de parejas"
- "he practicado BDSM"
- "he tenido una orgía"
- "he usado juguetes sexuales con alguien más"
- "he tenido sexo con alguien el mismo día que lo conocí"
- "he participado en sexo grupal con desconocidos"
- "he tenido sexo anal"
- "he hecho sexo telefónico o por videollamada con un desconocido"
- "he experimentado con personas del mismo sexo"

**Formato TypeScript esperado:**
```typescript
export const defaultPhrases: string[] = [
  "he mentido en mi CV",
  "he espiado el móvil de mi pareja",
  "he tenido sexo en un lugar público",
  // ... 47 frases más
];
```

**NOTA:** Las frases NO incluyen "Yo nunca" al principio (se añade en el componente).

---

#### Frases personalizadas
- Guardadas en AsyncStorage con key: `@yonunca_custom_phrases`
- Formato: `string[]` (array de strings)
- Validación al añadir:
  - No vacío (trim)
  - Mínimo 10 caracteres
  - Máximo 200 caracteres
  - No duplicados (verificar contra existentes)

---

### 🧩 Plan de ejecución - Desarrollo

#### Fase 1: Setup inicial (Pasos 1-4)
1. Crear proyecto: `npx create-expo-app yo-nunca --template expo-template-blank-typescript`
2. Instalar dependencias de navegación:
   ```bash
   npx expo install @react-navigation/native @react-navigation/stack
   npx expo install react-native-screens react-native-safe-area-context
   ```
3. Instalar AsyncStorage:
   ```bash
   npx expo install @react-native-async-storage/async-storage
   ```
4. Crear estructura de carpetas completa según árbol especificado

#### Fase 2: Configuración base (Pasos 5-7)
5. Configurar `tsconfig.json` con strict mode
6. Crear archivo de tipos `src/types/index.ts` con interfaces:
   ```typescript
   export interface Phrase {
     id: string;
     text: string;
     isCustom: boolean;
   }

   export interface Theme {
     background: string;
     cardBackground: string;
     primary: string;
     secondary: string;
     text: string;
     textSecondary: string;
     danger: string;
     success: string;
     border: string;
   }

   export type RootStackParamList = {
     Home: undefined;
     Game: undefined;
     CustomPhrases: undefined;
     Settings: undefined;
   };
   ```
7. Crear constantes de colores en `src/constants/Colors.ts`

#### Fase 3: Utilidades y datos (Pasos 8-11)
8. Implementar `src/utils/storage.ts` con funciones:
   - `getCustomPhrases(): Promise<string[]>`
   - `saveCustomPhrases(phrases: string[]): Promise<void>`
   - `addCustomPhrase(phrase: string): Promise<void>`
   - `deleteCustomPhrase(index: number): Promise<void>`
   - `clearCustomPhrases(): Promise<void>`
   - `getThemePreference(): Promise<'dark' | 'light'>`
   - `saveThemePreference(theme: 'dark' | 'light'): Promise<void>`

9. Implementar `src/utils/shuffle.ts`:
   ```typescript
   export function shuffle<T>(array: T[]): T[] {
     // Fisher-Yates shuffle algorithm
   }
   ```

10. Crear `src/data/defaultPhrases.ts` con las 50 frases predefinidas

11. Crear hook personalizado `src/hooks/usePhrases.ts`:
    - Estado: `allPhrases`, `unusedPhrases`, `currentPhrase`
    - Funciones: `nextPhrase()`, `resetPool()`, `loadPhrases()`
    - Lógica anti-repetición completa

#### Fase 4: Contexto y navegación (Pasos 12-13)
12. Implementar `src/context/ThemeContext.tsx`:
    - Provider con estado dark/light
    - Hook `useTheme()` para consumir
    - Persistir preferencia en AsyncStorage

13. Configurar `src/navigation/AppNavigator.tsx`:
    - Stack Navigator con 4 pantallas
    - Headers personalizados con colores del tema
    - Tipos TypeScript correctos

#### Fase 5: Componentes reutilizables (Pasos 14-15)
14. Crear `src/components/CustomButton.tsx`:
    - Props: `title`, `onPress`, `variant` ('primary' | 'secondary' | 'danger')
    - Estilos según tema actual
    - TypeScript strict

15. Crear `src/components/PhraseCard.tsx`:
    - Props: `phrase: string`
    - Tarjeta con diseño especificado
    - Ajustar font size según longitud de frase (responsive)

#### Fase 6: Pantallas (Pasos 16-19)
16. Implementar `src/screens/HomeScreen.tsx`:
    - Layout centrado
    - Logo grande
    - 2 botones principales + icono settings
    - Navegación a otras pantallas

17. Implementar `src/screens/GameScreen.tsx`:
    - Usar hook `usePhrases`
    - PhraseCard centrada
    - Botón "Siguiente" → `nextPhrase()`
    - Botón "Reiniciar" → `resetPool()`
    - Contador de frases restantes

18. Implementar `src/screens/CustomPhrasesScreen.tsx`:
    - FlatList de frases personalizadas
    - Botón añadir → Alert.prompt (o modal custom)
    - Botón eliminar individual por frase
    - Botón eliminar todas con confirmación
    - Estado vacío con mensaje amigable

19. Implementar `src/screens/SettingsScreen.tsx`:
    - Toggle modo oscuro/claro
    - Botón resetear frases personalizadas
    - Versión de la app
    - Botón ver política de privacidad (modal)

#### Fase 7: App principal y polish (Pasos 20-22)
20. Configurar `App.tsx`:
    - Wrap con ThemeProvider
    - Wrap con NavigationContainer
    - AppNavigator como root

21. Aplicar estilos finales:
    - SafeAreaView en todas las pantallas
    - StatusBar con colores correctos según tema
    - Verificar responsive en diferentes tamaños

22. Testing manual:
    - Probar flujo completo de navegación
    - Verificar anti-repetición de frases
    - Añadir/eliminar frases personalizadas
    - Verificar persistencia (cerrar/abrir app)
    - Cambiar tema oscuro/claro
    - Verificar en Expo Go

---

## 🛠️ PARTE B: PREPARACIÓN PARA GOOGLE PLAY STORE

### Configuración de producción

#### 1. Archivo `app.json` completo

```json
{
  "expo": {
    "name": "Yo Nunca",
    "slug": "yo-nunca",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#0F0F0F"
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.partyapps.yonunca",
      "buildNumber": "1"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#0F0F0F"
      },
      "package": "com.partyapps.yonunca",
      "versionCode": 1,
      "permissions": [],
      "googleServicesFile": null
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "eas": {
        "projectId": "GENERAR_CON_EAS_BUILD"
      }
    },
    "runtimeVersion": {
      "policy": "appVersion"
    },
    "updates": {
      "url": "https://u.expo.dev/GENERAR_CON_EAS_BUILD"
    }
  }
}
```

**Notas importantes:**
- `package`: `com.partyapps.yonunca` (ÚNICO en Google Play)
- `permissions`: Array vacío (la app no necesita permisos especiales)
- `version`: Incrementar en cada release (1.0.0 → 1.0.1 → 1.1.0)
- `versionCode` (Android): Incrementar en CADA build (1, 2, 3...)

---

#### 2. Configuración EAS Build (`eas.json`)

Crear archivo `eas.json` en la raíz:

```json
{
  "cli": {
    "version": ">= 5.0.0"
  },
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  },
  "submit": {
    "production": {
      "android": {
        "serviceAccountKeyPath": "./google-play-service-account.json",
        "track": "internal"
      }
    }
  }
}
```

**Explicación:**
- `preview`: Genera `.apk` para pruebas (instalar directamente en móvil)
- `production`: Genera `.aab` (Android App Bundle) para Google Play
- `.aab` es el formato requerido por Google Play desde 2021

---

### 🎨 Assets de producción

#### Icono de la app (`assets/icon.png`)

**Especificaciones:**
- Tamaño: **1024 x 1024 px**
- Formato: PNG con transparencia
- Forma: Cuadrado (Google Play le aplica forma automáticamente)
- Diseño: Simple, reconocible a pequeño tamaño

**Recomendaciones de herramientas:**

1. **Figma (GRATIS - Recomendado):**
   - Ir a figma.com
   - Crear archivo nuevo 1024x1024px
   - Diseño sugerido:
     - Fondo: Degradado negro a morado oscuro
     - Emoji grande centrado: 🍻 o 🎉
     - Texto "YO NUNCA" en dorado (#FFD700)
   - Exportar como PNG

2. **Canva (GRATIS):**
   - canva.com → "Icono de app"
   - Plantillas prediseñadas
   - Personalizar con emojis y texto
   - Descargar PNG

3. **Icon Kitchen (GRATIS - Específico para Android):**
   - icon.kitchen
   - Sube imagen simple o emoji
   - Genera todos los tamaños automáticamente
   - Descarga paquete completo

4. **Flaticon / IconFinder (GRATIS con atribución):**
   - Buscar iconos de "beer", "party", "drink"
   - Descargar PNG de alta resolución
   - Personalizar colores en Figma/Canva

**Adaptive Icon (Android específico):**
- `assets/adaptive-icon.png`: 1024x1024px
- Debe funcionar con máscara circular, cuadrada, redondeada
- Área segura: círculo de 640px de diámetro centrado

---

#### Splash Screen (`assets/splash.png`)

**Especificaciones:**
- Tamaño: **1284 x 2778 px** (proporción iPhone 13 Pro Max)
- Formato: PNG
- Diseño:
  - Fondo sólido: `#0F0F0F` (negro)
  - Logo/icono centrado
  - Texto "Yo Nunca" en dorado

**Herramienta recomendada:**
- Figma: Canvas 1284x2778px, exportar PNG

---

#### Screenshots para Google Play Store

**Requisitos de Google Play:**
- Mínimo: 2 screenshots
- Recomendado: 4-8 screenshots
- Formato: JPEG o PNG de 24 bits
- Tamaño mínimo: 320px
- Tamaño máximo: 3840px
- Proporción: Entre 16:9 y 9:16

**Cómo obtener screenshots:**

1. **Método 1: Expo Go (más fácil)**
   - Abrir app en Expo Go en tu Android
   - Capturar pantalla de cada screen importante
   - Transferir a PC

2. **Método 2: Android Studio Emulator**
   - Abrir emulador Android
   - Ejecutar `npx expo start` → abrir en emulador
   - Capturar screenshots desde emulador
   - Usar dispositivo Pixel 5 o similar (resolución común)

3. **Método 3: Herramientas de mockup (profesional)**
   - mockuphone.com (GRATIS)
   - placeit.net (De pago pero mejor calidad)
   - Sube tus screenshots simples
   - Genera imágenes con frame de móvil

**Screenshots recomendados:**
1. HomeScreen (pantalla de inicio)
2. GameScreen mostrando frase picante
3. CustomPhrasesScreen con lista de frases
4. SettingsScreen mostrando opciones

---

### 📄 Política de Privacidad

Google Play **REQUIERE** una política de privacidad si la app:
- Es para niños
- Accede a datos sensibles
- Requiere permisos

Aunque tu app es offline, es **recomendable incluirla** para profesionalidad.

**Crear archivo:** `docs/PRIVACY_POLICY.md`

```markdown
# Política de Privacidad - Yo Nunca

**Última actualización:** [FECHA]

Party Apps ("nosotros", "nuestro") opera la aplicación móvil Yo Nunca (en adelante, "la Aplicación").

Esta página le informa de nuestras políticas en materia de recopilación, uso y divulgación de datos personales cuando utiliza nuestra Aplicación.

## 1. Información que NO recopilamos

Yo Nunca es una aplicación **100% offline** que NO recopila, transmite, almacena ni comparte ningún dato personal del usuario.

Específicamente, NO recopilamos:
- Nombres, correos electrónicos o información de contacto
- Datos de ubicación
- Información del dispositivo
- Datos de uso o analítica
- Cookies o identificadores de publicidad
- Ningún tipo de información personal identificable

## 2. Almacenamiento local

La Aplicación almacena la siguiente información **únicamente en su dispositivo local**:

- **Frases personalizadas:** Frases que el usuario añade voluntariamente al juego
- **Preferencias de tema:** Configuración de modo oscuro/claro

Esta información:
- Se almacena SOLO en su dispositivo (usando AsyncStorage de React Native)
- NO se transmite a ningún servidor externo
- NO es accesible para nosotros ni para terceros
- Se elimina completamente al desinstalar la aplicación

## 3. Permisos

La Aplicación NO requiere ni solicita ningún permiso especial del dispositivo:
- NO accede a la cámara
- NO accede al micrófono
- NO accede a los contactos
- NO accede a la ubicación
- NO accede a archivos externos
- NO requiere conexión a Internet

## 4. Servicios de terceros

La Aplicación NO utiliza:
- Servicios de analítica (Google Analytics, Firebase, etc.)
- Redes publicitarias
- Servicios de autenticación
- APIs externas
- Ningún servicio de terceros que recopile datos

## 5. Contenido de la aplicación

Yo Nunca es un juego de beber para **mayores de 18 años**.

- El contenido incluye frases de naturaleza adulta/sexual
- Los usuarios pueden crear frases personalizadas bajo su propia responsabilidad
- No monitorizamos ni moderamos el contenido creado por los usuarios (ya que es local)

## 6. Seguridad de datos

Dado que no recopilamos datos personales, no existe riesgo de exposición de datos. La información almacenada localmente está protegida por las medidas de seguridad del sistema operativo de su dispositivo.

## 7. Enlaces a otros sitios

Esta Aplicación no contiene enlaces a sitios externos.

## 8. Privacidad de menores

Esta aplicación está clasificada como **18+** y NO está dirigida a menores de edad. No recopilamos intencionadamente información de menores de 18 años.

## 9. Cambios a esta Política de Privacidad

Podemos actualizar nuestra Política de Privacidad ocasionalmente. Le notificaremos cualquier cambio publicando la nueva Política de Privacidad en esta página y actualizando la "fecha de última actualización".

## 10. Contacto

Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos:

- Por correo electrónico: [TU_EMAIL_AQUÍ]

## 11. Consentimiento

Al usar nuestra Aplicación, usted acepta esta Política de Privacidad.

---

**Resumen:** Yo Nunca no recopila, transmite ni comparte ningún dato personal. Toda la información permanece en su dispositivo.
```

**IMPORTANTE:**
- Reemplazar `[FECHA]` con la fecha actual
- Reemplazar `[TU_EMAIL_AQUÍ]` con un email de contacto real
- Subir esta política a un sitio web público (GitHub Pages, etc.) o incluirla en la ficha de Google Play

---

### 🚀 Proceso de compilación con EAS Build

#### Paso 1: Instalar EAS CLI

```bash
npm install -g eas-cli
```

#### Paso 2: Login en Expo

```bash
eas login
```

Si no tienes cuenta:
```bash
eas register
```

#### Paso 3: Configurar proyecto

```bash
cd yo-nunca
eas build:configure
```

Esto:
- Crea `eas.json` (ya lo tienes en este prompt)
- Añade `projectId` a `app.json`

#### Paso 4: Build de prueba (APK)

Para probar en tu móvil sin subir a Google Play:

```bash
eas build --platform android --profile preview
```

- Selecciona Android cuando pregunte
- Espera ~10-15 minutos (compila en la nube)
- Descarga el `.apk` generado
- Instala directamente en tu Android

#### Paso 5: Build de producción (AAB para Google Play)

```bash
eas build --platform android --profile production
```

Esto genera un `.aab` (Android App Bundle) listo para Google Play.

**IMPORTANTE:** Google Play REQUIERE `.aab` (no `.apk`) desde agosto 2021.

---

### 📤 Subir a Google Play Console

#### Requisitos previos:
1. **Cuenta de Google Play Developer**
   - Costo: ~25€ (pago único)
   - Registro: play.google.com/console
   - Proceso de verificación: ~48 horas

2. **Archivos necesarios:**
   - ✅ Archivo `.aab` (del paso anterior)
   - ✅ Icono 512x512px (alta resolución)
   - ✅ Banner 1024x500px (opcional pero recomendado)
   - ✅ Mínimo 2 screenshots
   - ✅ Descripción de la app (corta y larga)
   - ✅ URL de política de privacidad

---

#### Paso a paso en Google Play Console:

**1. Crear nueva aplicación**
- Ir a Google Play Console → "Crear aplicación"
- Nombre: "Yo Nunca"
- Idioma predeterminado: Español
- Tipo: Aplicación/Juego
- Categoría: Casual (o Entretenimiento)
- Clasificación de contenido: Preparar cuestionario

**2. Clasificación de contenido**
- Completar cuestionario de IARC
- Preguntas clave para "Yo Nunca":
  - ¿Contiene violencia? NO
  - ¿Contiene contenido sexual? SÍ (referencias sexuales)
  - ¿Contiene drogas/alcohol? SÍ (es un juego de beber)
  - ¿Es para niños? NO
- Resultado esperado: **18+ / Mature**

**3. Ficha de Play Store**
- **Título:** "Yo Nunca - Juego de Beber"
- **Descripción corta (80 caracteres):**
  ```
  El juego de beber definitivo para fiestas épicas 🍻
  ```

- **Descripción larga (4000 caracteres max):**
  ```
  🍻 YO NUNCA - EL JUEGO DE BEBER PARA FIESTAS ÉPICAS

  ¿Buscas el juego perfecto para animar tus fiestas? Yo Nunca es la app definitiva para conocer los secretos más oscuros de tus amigos mientras os lo pasáis en grande.

  🎮 CÓMO JUGAR:
  1. Reúne a tus amigos en círculo
  2. Abre la app y pulsa "Jugar"
  3. Lee en voz alta la frase que aparece: "Yo nunca..."
  4. Todos los que SÍ lo hayan hecho, ¡beben!
  5. Pulsa "Siguiente" para la siguiente frase

  ✨ CARACTERÍSTICAS:
  • 50+ frases predefinidas desde suaves hasta MUY picantes
  • Añade tus propias frases personalizadas ilimitadas
  • Sin repeticiones: no se repiten frases hasta agotar todas
  • 100% offline: no requiere conexión a internet
  • Modo oscuro para jugar de noche
  • Interfaz simple y rápida
  • Sin anuncios molestos
  • Gratis para siempre

  🔥 FRASES PICANTES:
  Desde preguntas inocentes hasta confesiones comprometedoras. ¿Te atreves a descubrir los secretos de tus amigos?

  🎉 PERFECTO PARA:
  • Fiestas de cumpleaños
  • Despedidas de soltero/a
  • Previa antes de salir
  • Reuniones con amigos
  • Conocer mejor a gente nueva

  ⚠️ AVISO IMPORTANTE:
  • App para mayores de 18 años
  • Bebe responsablemente
  • No conducir después de beber
  • Respetar los límites de cada persona

  🔒 PRIVACIDAD:
  Tu privacidad es importante. Esta app NO recopila datos personales, NO requiere registro y funciona 100% offline. Tus frases personalizadas se guardan solo en tu dispositivo.

  📱 SOPORTE:
  ¿Problemas o sugerencias? Contacta: [TU_EMAIL]

  Descarga YO NUNCA ahora y haz que tu próxima fiesta sea inolvidable 🎉🍻
  ```

- **Screenshots:** Subir las 4 imágenes capturadas
- **Icono:** Subir `icon.png` 512x512px
- **Banner:** (Opcional) Crear en Canva 1024x500px

**4. Configuración de precios**
- Gratis (0€)
- Disponible en todos los países (o seleccionar manualmente)

**5. Política de privacidad**
- Subir `PRIVACY_POLICY.md` a:
  - GitHub Pages (gratis): username.github.io/yo-nunca-privacy
  - Google Sites (gratis)
  - Tu propio dominio si tienes
- Pegar URL en Google Play Console

**6. Subir versión (AAB)**
- Ir a "Producción" → "Crear nueva versión"
- Subir el archivo `.aab` generado con EAS Build
- Nombre de versión: 1.0.0 (debe coincidir con `app.json`)
- Notas de la versión:
  ```
  Primera versión de Yo Nunca:
  • 50 frases predefinidas variadas
  • Añade frases personalizadas ilimitadas
  • Modo oscuro/claro
  • Sin anuncios
  • 100% offline
  ```

**7. Revisión de contenido**
- Google Play revisará la app (1-7 días normalmente)
- Pueden pedir:
  - Aclaración sobre contenido adulto
  - Cuestionario adicional sobre alcohol
  - Declaración de que es para mayores de edad

**8. Publicación**
- Una vez aprobada, pulsa "Publicar"
- La app estará disponible en Google Play en ~2-4 horas

---

### ✅ Checklist pre-publicación

Antes de subir a Google Play, verificar:

**Código:**
- [ ] App compila sin errores en EAS Build
- [ ] Todas las pantallas funcionan correctamente
- [ ] Frases no se repiten (lógica anti-repetición OK)
- [ ] Frases personalizadas persisten tras cerrar app
- [ ] Modo oscuro/claro funciona
- [ ] No hay console.log innecesarios
- [ ] Versión en `app.json` es correcta (1.0.0)

**Assets:**
- [ ] Icono 1024x1024 listo
- [ ] Adaptive icon 1024x1024 listo
- [ ] Splash screen 1284x2778 listo
- [ ] Mínimo 2 screenshots de calidad
- [ ] Banner 1024x500 (opcional)

**Legal:**
- [ ] Política de privacidad redactada
- [ ] Política subida a URL pública accesible
- [ ] Email de contacto válido en política

**Google Play Console:**
- [ ] Cuenta de desarrollador activa (25€ pagados)
- [ ] Cuestionario de clasificación completado
- [ ] Descripción corta y larga escritas
- [ ] Categoría seleccionada (Casual/Entretenimiento)
- [ ] Clasificación 18+ configurada

**Testing:**
- [ ] Probado en mínimo 1 dispositivo Android real
- [ ] Probado en Expo Go
- [ ] Probado APK de preview instalado
- [ ] Sin crashes al abrir/cerrar app
- [ ] SafeArea correcta en dispositivos con notch

---

## 📚 Documentación final

### README.md completo

Crear `README.md` en la raíz del proyecto:

```markdown
# 🍻 Yo Nunca - Juego de Beber

App móvil multiplataforma (Android/iOS) del clásico juego de beber "Yo Nunca" para fiestas.

## 🎯 Características

- ✅ 50 frases predefinidas (suaves a muy picantes)
- ✅ Frases personalizadas ilimitadas
- ✅ Sin repeticiones en misma sesión
- ✅ Modo oscuro/claro
- ✅ 100% offline (sin internet)
- ✅ Sin anuncios
- ✅ Gratis y open source

## 🛠️ Stack Tecnológico

- React Native
- Expo SDK 51+
- TypeScript
- React Navigation
- AsyncStorage

## 📦 Requisitos previos

- Node.js 18+ instalado
- npm o yarn
- Expo Go app en tu móvil (para desarrollo)
- Android Studio (opcional, para emulador)

## 🚀 Instalación y ejecución

### 1. Clonar repositorio

```bash
git clone https://github.com/tu-usuario/yo-nunca.git
cd yo-nunca
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar en desarrollo

```bash
npx expo start
```

### 4. Abrir en dispositivo

**Opción A: Expo Go (más fácil)**
- Instala "Expo Go" desde Play Store/App Store
- Escanea el QR code que aparece en terminal
- La app se abrirá en Expo Go

**Opción B: Emulador Android**
- Abre Android Studio → AVD Manager → Inicia emulador
- En terminal pulsa `a` (abrir en Android)

**Opción C: Emulador iOS (solo Mac)**
- En terminal pulsa `i` (abrir en iOS Simulator)

## 🏗️ Build para producción

### Generar APK (pruebas)

```bash
# Instalar EAS CLI
npm install -g eas-cli

# Login
eas login

# Configurar
eas build:configure

# Build de preview (APK)
eas build --platform android --profile preview
```

### Generar AAB (Google Play)

```bash
eas build --platform android --profile production
```

## 📁 Estructura del proyecto

```
yo-nunca/
├── src/
│   ├── screens/          # Pantallas principales
│   ├── components/       # Componentes reutilizables
│   ├── navigation/       # Configuración de navegación
│   ├── context/          # Context API (tema)
│   ├── hooks/            # Custom hooks
│   ├── data/             # Frases predefinidas
│   ├── utils/            # Utilidades (storage, shuffle)
│   ├── constants/        # Constantes (colores)
│   ├── types/            # TypeScript interfaces
│   └── legal/            # Política de privacidad
├── assets/               # Imágenes (icono, splash)
├── docs/                 # Documentación
└── App.tsx               # Punto de entrada
```

## 🎮 Cómo jugar

1. Reúne a tus amigos en círculo
2. Abre la app y pulsa "Jugar"
3. Lee en voz alta: "Yo nunca [frase]"
4. Todos los que SÍ lo hayan hecho, beben
5. Pulsa "Siguiente" para continuar

## 🧩 Funcionalidades principales

### Pantallas

- **HomeScreen:** Inicio con botones principales
- **GameScreen:** Muestra frases aleatorias sin repetir
- **CustomPhrasesScreen:** Gestiona frases personalizadas
- **SettingsScreen:** Configuración (tema, reset, etc.)

### Lógica anti-repetición

Las frases NO se repiten hasta agotar todo el pool (predefinidas + personalizadas). Cuando se agotan, se resetea automáticamente el pool.

### Persistencia

- Frases personalizadas: AsyncStorage (`@yonunca_custom_phrases`)
- Preferencia de tema: AsyncStorage (`@yonunca_theme`)

## 🎨 Personalización

### Cambiar colores

Edita `src/constants/Colors.ts`:

```typescript
export const DarkTheme = {
  primary: '#FFD700',    // Cambiar color principal
  secondary: '#9D4EDD',  // Cambiar color secundario
  // ...
};
```

### Añadir más frases predefinidas

Edita `src/data/defaultPhrases.ts`:

```typescript
export const defaultPhrases: string[] = [
  "he mentido en mi CV",
  "tu nueva frase aquí",
  // ...
];
```

## ⚠️ Aviso legal

- App para **mayores de 18 años**
- Bebe responsablemente
- No conducir bajo los efectos del alcohol
- El contenido picante es opcional (puedes usar solo frases suaves)

## 🔒 Privacidad

Esta app NO recopila datos personales. Todo se almacena localmente en tu dispositivo. Ver [Política de Privacidad](./docs/PRIVACY_POLICY.md) completa.

## 📄 Licencia

MIT License - Uso libre

## 🤝 Contribuciones

Pull requests bienvenidas. Para cambios grandes, abre primero un issue.

## 📧 Contacto

- Email: [TU_EMAIL]
- GitHub: [TU_GITHUB]

## 🙏 Créditos

Desarrollado con ❤️ para fiestas épicas.

---

**¡Que empiece la fiesta! 🎉🍻**
```

---

### Archivo ICON_GUIDE.md (guía para crear iconos)

Crear `docs/ICON_GUIDE.md`:

```markdown
# Guía para crear iconos de Yo Nunca

## Especificaciones técnicas

### Icono principal (`assets/icon.png`)
- Tamaño: 1024 x 1024 px
- Formato: PNG con transparencia
- Forma: Cuadrado
- Peso: < 1MB

### Adaptive Icon Android (`assets/adaptive-icon.png`)
- Tamaño: 1024 x 1024 px
- Área segura: Círculo de 640px de diámetro centrado
- Debe verse bien con máscaras: circular, cuadrada, redondeada

### Splash Screen (`assets/splash.png`)
- Tamaño: 1284 x 2778 px
- Formato: PNG
- Fondo: #0F0F0F (negro)

## Diseño sugerido

### Opción 1: Emoji + Texto
```
Fondo: Degradado negro (#0F0F0F) a morado oscuro (#1E1E1E)
Centro: Emoji 🍻 tamaño grande
Abajo: Texto "YO NUNCA" en dorado (#FFD700), bold
```

### Opción 2: Solo emoji
```
Fondo: Negro sólido (#0F0F0F)
Centro: Emoji 🎉 o 🍺 muy grande (700px)
Borde: Glow dorado sutil
```

### Opción 3: Ilustración
```
Icono personalizado de copa de cerveza
Colores: Dorado (#FFD700) y morado (#9D4EDD)
Estilo: Flat design, minimalista
```

## Herramientas recomendadas

### 1. Figma (Gratis, recomendado)
1. Ir a figma.com → Crear cuenta gratis
2. Nuevo archivo → Artboard 1024x1024
3. Añadir formas/texto/emojis
4. Exportar como PNG

### 2. Canva (Gratis)
1. canva.com → "Icono de aplicación"
2. Usar plantillas prediseñadas
3. Personalizar colores y emojis
4. Descargar PNG

### 3. Icon Kitchen (Gratis, Android-specific)
1. icon.kitchen
2. Subir imagen o emoji
3. Ajustar padding y forma
4. Descargar paquete Android completo

## Tutorial paso a paso (Figma)

### Crear icono principal

1. **Crear proyecto**
   - Nuevo archivo en Figma
   - Crear frame 1024x1024px (nombre: "Icon")

2. **Añadir fondo**
   - Rectángulo 1024x1024
   - Fill: Degradado linear
     - Color 1: #0F0F0F (negro)
     - Color 2: #2D1B4E (morado oscuro)
   - Ángulo: 135°

3. **Añadir emoji**
   - Herramienta texto (T)
   - Tamaño: 600px
   - Emoji: 🍻 (copiar desde emojipedia.org)
   - Centrar vertical y horizontalmente

4. **Añadir texto (opcional)**
   - Herramienta texto
   - Texto: "YO NUNCA"
   - Font: Inter Bold o similar
   - Tamaño: 80px
   - Color: #FFD700
   - Posición: Debajo del emoji
   - Centrar

5. **Añadir efectos (opcional)**
   - Seleccionar emoji
   - Effects → Drop Shadow
     - Color: #FFD700 con 30% opacidad
     - Blur: 20px
     - Y: 10px

6. **Exportar**
   - Seleccionar frame "Icon"
   - Export → PNG → 1x → Export

### Crear adaptive icon

Repetir proceso pero:
- Dejar margen de 192px en cada lado
- Todo el contenido dentro del círculo central de 640px
- Probar con diferentes máscaras

## Validación

Antes de usar los iconos, verificar:

- [ ] Tamaño exacto (1024x1024)
- [ ] Se ve bien a tamaño pequeño (72x72)
- [ ] Colores contrastados
- [ ] No texto ilegible
- [ ] PNG con transparencia (si aplica)
- [ ] Adaptive icon se ve bien circular/cuadrado/redondeado

## Recursos adicionales

- Emojipedia: emojipedia.org (copiar emojis en alta calidad)
- Flaticon: flaticon.com (iconos gratis con atribución)
- Coolors: coolors.co (paletas de colores)
- MockUPhone: mockuphone.com (previsualizar icono en móvil)
```

---

## 🎯 Resumen de entregables

Cuando termines de ejecutar este prompt, debes tener:

### Código funcional:
1. ✅ Proyecto Expo completo con TypeScript
2. ✅ 4 pantallas implementadas (Home, Game, CustomPhrases, Settings)
3. ✅ Navegación configurada
4. ✅ 50 frases predefinidas variadas (suaves a muy picantes)
5. ✅ Lógica anti-repetición completa
6. ✅ Persistencia con AsyncStorage
7. ✅ Modo oscuro/claro funcional
8. ✅ Componentes reutilizables (Button, PhraseCard)

### Configuración de producción:
9. ✅ `app.json` configurado con `com.partyapps.yonunca`
10. ✅ `eas.json` para builds de producción
11. ✅ Política de privacidad en `docs/PRIVACY_POLICY.md`
12. ✅ Guía de iconos en `docs/ICON_GUIDE.md`

### Documentación:
13. ✅ README.md completo con instrucciones de instalación
14. ✅ Comentarios en código explicando lógica compleja
15. ✅ Checklist de verificación pre-publicación

### Assets (pendientes de crear por ti):
16. ⏳ Icono 1024x1024 (seguir `ICON_GUIDE.md`)
17. ⏳ Adaptive icon 1024x1024
18. ⏳ Splash screen 1284x2778
19. ⏳ Screenshots (capturar tras ejecutar app)

---

## ⚡ Comandos rápidos de referencia

### Durante desarrollo:
```bash
# Iniciar proyecto
npx expo start

# Limpiar cache si hay problemas
npx expo start -c

# Instalar dependencia nueva
npx expo install nombre-paquete
```

### Para build de producción:
```bash
# Login en EAS
eas login

# Build APK (pruebas)
eas build --platform android --profile preview

# Build AAB (Google Play)
eas build --platform android --profile production

# Ver builds en progreso
eas build:list
```

### Para actualizar versión:
```json
// Editar app.json:
"version": "1.0.1",        // Incrementar
"versionCode": 2,          // Incrementar (Android)
```

---

## 🚨 Troubleshooting común

### Error: "Module not found"
```bash
rm -rf node_modules
npm install
npx expo start -c
```

### Error en EAS Build
- Verificar que `eas.json` existe
- Verificar que `projectId` está en `app.json`
- Ejecutar `eas build:configure` de nuevo

### App no abre en Expo Go
- Verificar que móvil y PC están en misma WiFi
- Reiniciar Expo Go
- Ejecutar `npx expo start -c` (limpiar cache)

### Frases se repiten
- Verificar lógica en `src/hooks/usePhrases.ts`
- Verificar función `shuffle` en `src/utils/shuffle.ts`

---

## ✅ Checklist final antes de entregar

- [ ] Todos los archivos de código generados
- [ ] Sin errores de TypeScript
- [ ] Sin console.log innecesarios
- [ ] Comentarios explicativos en funciones complejas
- [ ] README.md completo
- [ ] Política de privacidad escrita
- [ ] Guía de iconos incluida
- [ ] `app.json` con bundle ID correcto (`com.partyapps.yonunca`)
- [ ] `eas.json` configurado
- [ ] Instrucciones claras para ejecutar proyecto
- [ ] Instrucciones para generar builds de producción
- [ ] Checklist de publicación en Google Play

---

## 🎓 Notas importantes finales

1. **Contenido:** Las frases picantes/sexuales deben ser para mayores de edad. Asegúrate de configurar clasificación 18+ en Google Play.

2. **Testing:** Prueba la app extensivamente antes de publicar. Una vez en Google Play, las actualizaciones tardan días en ser aprobadas.

3. **Política de privacidad:** Aunque la app es offline, Google Play puede rechazarla si no tiene URL de política de privacidad accesible.

4. **Bundle ID:** `com.partyapps.yonunca` es ÚNICO. No lo cambies después de publicar o tendrás que crear app nueva.

5. **Versiones:** Incrementa `version` (semántico: 1.0.0 → 1.1.0) y `versionCode` (entero: 1, 2, 3...) en CADA build.

6. **Costos:**
   - Google Play Developer: ~25€ una vez
   - EAS Build: Plan gratuito limitado (luego ~99$/mes)
   - Alternativa: Build local gratis pero más complejo

7. **Tiempos:**
   - Desarrollo: 1-2 sesiones de Claude Code
   - Revisión Google Play: 1-7 días
   - Total hasta publicación: ~1-2 semanas

---

## 🚀 ¿Listo para empezar?

Por favor confirma que:
- [x] Tienes Node.js 18+ instalado
- [x] Tienes VS Code o editor de código
- [x] Tienes un dispositivo Android para probar
- [ ] (Opcional) Tienes cuenta de Google Play Developer
- [ ] (Opcional) Has leído la guía completa

**Si todo está listo, genera TODOS los archivos con código funcional, comentado y listo para ejecutar.**

Incluye:
1. Todos los archivos `.tsx` y `.ts` con código completo
2. `package.json` con dependencias
3. `app.json` y `eas.json` configurados
4. README.md completo
5. Política de privacidad
6. Guía de iconos
7. Cualquier otro archivo necesario

**¡Empecemos! 🍻**
