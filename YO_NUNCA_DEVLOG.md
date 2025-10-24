# DevLog - Yo Nunca App

## 📊 Estado del Proyecto

**Fase actual:** YO NUNCA V2.1 + BUGFIXES - COMPLETADA ✅
**Última actualización:** 2025-10-24
**Próximo paso:** Preparación para producción (Fase 9)

**Documentación de referencia:**
📄 [Prompt completo](./YO_NUNCA_PROMPT_COMPLETO.md) - Especificaciones técnicas V1.0
📄 [Plan V2.0](./YO_NUNCA_PLAN_V2.md) - Plan detallado de mejoras (multijugador, categorías, estadísticas)
📄 [Instrucciones para Claude](./INSTRUCCIONES_PARA_CLAUDE.md) - Guía para nueva instancia de Claude Code

---

## 🎯 Contexto del Proyecto

### ¿Qué estamos construyendo?

App móvil **"Yo Nunca"** - Juego de beber tipo party game para Android/iOS

**Stack tecnológico:**
- React Native + Expo SDK 51+
- TypeScript (strict mode)
- React Navigation
- AsyncStorage para persistencia local
- 100% offline (sin conexión a internet)

**Características principales:**
- 50 frases predefinidas (suaves a muy picantes/sexuales)
- Sistema anti-repetición inteligente
- Frases personalizadas ilimitadas
- Modo oscuro/claro con persistencia
- 4 pantallas: Home, Game, CustomPhrases, Settings

**Objetivo final:**
Publicar en **Google Play Store** (inicialmente solo Android, luego iOS)

---

## 🔑 Decisiones Clave Tomadas

| Decisión | Opción Elegida | Razón |
|----------|----------------|-------|
| Lenguaje | TypeScript | Mejor prevención de errores y mantenibilidad |
| Framework | Expo (no React Native CLI) | Facilita builds y desarrollo multiplataforma |
| Bundle ID | `com.partyapps.yonunca` | Único e identificable |
| Clasificación | 18+ / Mature | Contenido adulto (alcohol + frases sexuales) |
| Publicación inicial | Solo Google Play | Más barato (25€ vs 99€/año) y rápido |
| Build tool | EAS Build | Más fácil que build local, compila en la nube |
| Gestión de estado | Hooks + Context API | No necesitamos Redux, mantener simplicidad |
| Persistencia | AsyncStorage | Adecuado para datos no sensibles y pequeños |

---

## 📅 Fases de Desarrollo

### FASE 0: Planificación ✅ COMPLETADA

**Fecha de inicio:** 2025-10-20
**Fecha de finalización:** 2025-10-20
**Duración:** ~2 horas

#### Tareas completadas:
- [x] Análisis de requerimientos
- [x] Definición de stack tecnológico (TypeScript elegido)
- [x] Diseño de arquitectura (4 pantallas + hooks + context)
- [x] Creación de prompt completo
- [x] Definición de bundle ID: `com.partyapps.yonunca`
- [x] Redacción de política de privacidad template
- [x] Estructura de carpetas definida
- [x] Paleta de colores diseñada (tema oscuro + claro)
- [x] Plan de ejecución en 15 fases

#### Notas:
- Prompt inicial mejorado significativamente
- Añadido TypeScript por recomendación vs JavaScript
- Preparado para Google Play desde inicio (no iOS inicialmente)
- 50 frases predefinidas con ejemplos por categorías de intensidad

---

### FASE 1: Setup Inicial ✅ COMPLETADA

**Fecha de inicio:** 2025-10-20 18:12
**Fecha de finalización:** 2025-10-20 18:15
**Duración real:** ~3 minutos
**Responsable:** Claude Code

#### Objetivo:
Crear el proyecto Expo base con TypeScript y toda la estructura de carpetas necesaria.

#### Tareas:
- [x] Navegar a `C:\Users\danie\APPS`
- [x] Crear proyecto: `npx create-expo-app yo-nunca --template expo-template-blank-typescript`
- [x] Navegar a `cd yo-nunca`
- [x] Instalar dependencias de navegación
- [x] Instalar AsyncStorage
- [x] Crear estructura completa de carpetas (src/screens, components, navigation, context, hooks, data, utils, constants, types, legal, docs)
- [x] Verificar instalación con `npm install`

#### Resultado:
✅ Proyecto creado exitosamente con Expo SDK 54
✅ Todas las dependencias instaladas sin errores
✅ Estructura de carpetas completa creada

---

### FASE 2: Tipos y Configuración Base ✅ COMPLETADA

**Fecha:** 2025-10-20 18:16-18:18
**Duración:** ~2 minutos

#### Tareas completadas:
- [x] Verificar tsconfig.json con strict mode (ya estaba configurado)
- [x] Crear src/types/index.ts con interfaces (Phrase, Theme, RootStackParamList)
- [x] Crear src/constants/Colors.ts con DarkTheme y LightTheme
- [x] Crear src/data/defaultPhrases.ts con 50 frases variadas
- [x] Crear src/utils/storage.ts con funciones AsyncStorage
- [x] Crear src/utils/shuffle.ts con algoritmo Fisher-Yates

#### Resultado:
✅ Todos los archivos base creados
✅ TypeScript strict mode activado
✅ 50 frases predefinidas en 4 categorías de intensidad

---

### FASE 3: Context y Hooks ✅ COMPLETADA

**Fecha:** 2025-10-20 18:19-18:21
**Duración:** ~2 minutos

#### Tareas completadas:
- [x] Crear src/context/ThemeContext.tsx con Provider y hook useTheme
- [x] Crear src/hooks/usePhrases.ts con lógica anti-repetición completa

#### Resultado:
✅ ThemeContext funcional con persistencia en AsyncStorage
✅ Hook usePhrases con sistema anti-repetición implementado
✅ Alert automático al agotar frases y reseteo del pool

---

### FASE 4: Componentes Reutilizables ✅ COMPLETADA

**Fecha:** 2025-10-20 18:22-18:23
**Duración:** ~1 minuto

#### Tareas completadas:
- [x] Crear src/components/CustomButton.tsx con 3 variantes (primary, secondary, danger)
- [x] Crear src/components/PhraseCard.tsx con ajuste responsivo de fuente

#### Resultado:
✅ Botones estilizados según tema con elevation y shadows
✅ PhraseCard con tamaño de fuente adaptativo según longitud

---

### FASE 5: Pantallas Principales ✅ COMPLETADA

**Fecha:** 2025-10-20 18:24-18:28
**Duración:** ~4 minutos

#### Tareas completadas:
- [x] Crear src/screens/HomeScreen.tsx (logo, botones, navegación)
- [x] Crear src/screens/GameScreen.tsx (tarjeta de frase, botón siguiente, contador)
- [x] Crear src/screens/CustomPhrasesScreen.tsx (FlatList, añadir/eliminar frases, modal)
- [x] Crear src/screens/SettingsScreen.tsx (toggle tema, reset frases, política privacidad)

#### Resultado:
✅ 4 pantallas completas con toda la funcionalidad especificada
✅ Modal personalizado para añadir frases
✅ Estados vacíos con mensajes amigables
✅ Alerts de confirmación antes de acciones destructivas

---

### FASE 6: Navegación ✅ COMPLETADA

**Fecha:** 2025-10-20 18:29
**Duración:** ~1 minuto

#### Tareas completadas:
- [x] Crear src/navigation/AppNavigator.tsx con Stack Navigator
- [x] Configurar headers personalizados con colores del tema
- [x] Corregir error de TypeScript (headerBackTitleVisible removido)

#### Resultado:
✅ Navegación entre 4 pantallas configurada
✅ Headers estilizados según tema activo

---

### FASE 7: Integración y Documentación ✅ COMPLETADA

**Fecha:** 2025-10-20 18:30-18:32
**Duración:** ~2 minutos

#### Tareas completadas:
- [x] Configurar App.tsx con ThemeProvider y NavigationContainer
- [x] Verificar compilación TypeScript sin errores (npx tsc --noEmit)
- [x] Crear README.md completo
- [x] Crear docs/PRIVACY_POLICY.md
- [x] Crear docs/ICON_GUIDE.md

#### Comandos exactos a ejecutar:
```bash
cd C:\Users\danie\APPS
npx create-expo-app yo-nunca --template expo-template-blank-typescript
cd yo-nunca
npx expo install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
npx expo install @react-native-async-storage/async-storage
npx expo start
```

#### Criterios de éxito:
- ✅ Proyecto creado sin errores
- ✅ `npm install` ejecutado correctamente
- ✅ `npx expo start` inicia sin problemas
- ✅ Estructura de carpetas completa visible
- ✅ Se puede ver la pantalla de inicio de Expo en navegador/terminal

#### Bloqueadores conocidos:
- Ninguno esperado en esta fase

#### Notas para Claude Code:
- Si falla la creación, verificar versión de Node.js (debe ser 18+)
- Si falla expo install, intentar con npm: `npm install @react-navigation/native`

---

### FASE 8: Testing Manual y Correcciones ✅ COMPLETADA

**Fecha:** 2025-10-22 (tarde)
**Duración:** ~2 horas
**Responsable:** Claude Code + Usuario

#### Objetivo:
Realizar testing manual completo de la app en emulador Android y corregir bugs/issues encontrados.

#### Tareas completadas:
- [x] Instalar dependencias web (react-dom, react-native-web) para soporte opcional
- [x] Actualizar paquetes de Expo a versiones compatibles (54.0.17, react-native 0.81.5)
- [x] Configurar emulador Android en Android Studio
- [x] Iniciar app en emulador Android exitosamente
- [x] **CORRECCIÓN 1:** Eliminar warning de SafeAreaView deprecated
  - Reemplazar `SafeAreaView` de `react-native` por el de `react-native-safe-area-context`
  - Actualizado en las 4 pantallas: HomeScreen, GameScreen, CustomPhrasesScreen, SettingsScreen
- [x] **CORRECCIÓN 2:** Deshabilitar autocapitalización en campo de texto
  - Añadido `autoCapitalize="none"` y `autoCorrect={false}` al TextInput
  - Soluciona problema de mayúsculas automáticas en palabras como "el", "la"
- [x] **CORRECCIÓN 3:** Problema de "Yo nunca" duplicado en frases personalizadas
  - Implementada detección automática con regex para eliminar "yo nunca" del inicio
  - Actualizada validación de longitud mínima (10 caracteres sin contar "yo nunca")
  - Mejorado placeholder: "Ejemplo: he bailado bajo la lluvia"
  - Añadida instrucción visible: "No incluyas 'Yo nunca' al inicio, se añadirá automáticamente"
- [x] Testing manual de todas las funcionalidades principales

#### Archivos modificados:
1. `src/screens/HomeScreen.tsx` - SafeAreaView corregido
2. `src/screens/GameScreen.tsx` - SafeAreaView corregido, eliminado import innecesario
3. `src/screens/CustomPhrasesScreen.tsx` - SafeAreaView + autoCapitalize + placeholder + instrucción
4. `src/screens/SettingsScreen.tsx` - SafeAreaView corregido
5. `src/utils/storage.ts` - Lógica de limpieza de "yo nunca" en addCustomPhrase()

#### Bugs corregidos:
| Bug | Descripción | Solución | Archivo |
|-----|-------------|----------|---------|
| SafeAreaView deprecated | Warning en consola sobre SafeAreaView obsoleto | Usar SafeAreaView de react-native-safe-area-context | 4 screens |
| Autocapitalización | Mayúsculas automáticas en medio de frases personalizadas | autoCapitalize="none" y autoCorrect={false} | CustomPhrasesScreen.tsx |
| "Yo nunca" duplicado | Si usuario escribe "yo nunca..." se mostraba "Yo nunca yo nunca..." | Regex para detectar y eliminar al guardar | storage.ts:49-50 |

#### Proceso de setup del emulador:
```bash
# 1. Instalar dependencias web (opcional)
npx expo install react-dom react-native-web

# 2. Actualizar paquetes a versiones compatibles
npx expo install expo@54.0.17 react-native@0.81.5

# 3. Configurar emulador en Android Studio
# - Abrir Android Studio > Device Manager
# - Create Device > Pixel 5 > Android 13/14
# - Iniciar emulador

# 4. Iniciar app
npx expo start
# Presionar 'a' para abrir en Android
# Introducir URL manualmente en Expo Go si es necesario
```

#### Testing realizado:
- ✅ Navegación entre todas las pantallas funciona
- ✅ Frases se muestran correctamente sin repetir
- ✅ Sistema anti-repetición funciona correctamente
- ✅ Frases personalizadas se añaden, editan y eliminan correctamente
- ✅ "Yo nunca" se elimina automáticamente del inicio si usuario lo escribe
- ✅ Toggle de modo oscuro/claro funciona y persiste
- ✅ Todos los colores cambian correctamente con el tema
- ✅ No hay warnings en la consola
- ✅ App funciona fluidamente en emulador Android

#### Resultado:
✅ App totalmente funcional y lista para testing extensivo
✅ Todos los bugs críticos corregidos
✅ UX mejorada significativamente
✅ Código limpio sin warnings

#### Próximos pasos sugeridos:
- Testing extensivo (agotar todas las frases para probar reset automático)
- Añadir más frases personalizadas y probar con > 50 frases
- Probar en dispositivo Android real con Expo Go
- Considerar añadir más frases predefinidas (actualmente 50)
- Preparar para build de producción (Fase 9)

---

### YO NUNCA V2.0 - IMPLEMENTACIÓN COMPLETA ✅ COMPLETADA

**Fecha de inicio:** 2025-10-23
**Fecha de finalización:** 2025-10-23
**Duración:** ~8 horas de desarrollo continuo
**Responsable:** Claude Code

#### Objetivo:
Transformar la app de juego single-player a experiencia multijugador completa con categorías, estadísticas, auto-guardado y mejoras visuales.

#### FASE A: Refactorización Base ✅
- [x] Actualizar interfaces TypeScript (Player, GameSession, GameStats, DifficultyLevel, CagonCounter)
- [x] Crear 3 archivos de frases por dificultad:
  - `medioLevel.ts` - 60 frases
  - `picanteLevel.ts` - 80 frases
  - `muyPicanteLevel.ts` - 100 frases
  - **TOTAL: 240 frases**
- [x] Expandir storage.ts con funciones de sesión y contador cagón
- [x] Actualizar paleta de colores a tema "taberna/garito" (marrones cálidos, dorado cerveza)

#### FASE B: Sistema de Jugadores ✅
- [x] Crear `funnyNames.ts` con 65+ nombres random (borrachos famosos, animales fiesteros, apodos españoles)
- [x] Crear hook `usePlayers` con gestión completa de jugadores (2-20)
- [x] Crear `PlayerSetupScreen` con UI para añadir/editar/eliminar jugadores

#### FASE C: CategorySelectionScreen y Modal Cagón ✅
- [x] Crear `cagonPhrases.ts` con 30 frases troll
- [x] Crear `CagonModal` con contador persistente y mensajes especiales
- [x] Crear `CategorySelectionScreen` con 4 categorías y animaciones

#### FASE D: GameScreenMultiplayer ✅
- [x] Crear `funnyMessages.ts` con 30 mensajes personalizados cada 5 rondas
- [x] Crear `PlayerListItem` component con diseño gamificado
- [x] Crear hook `useGameSession` para gestión de sesión multijugador
- [x] Crear `GameScreenMultiplayer` (pantalla principal de juego)

#### FASE E: Estadísticas en Tiempo Real ✅
- [x] Crear hook `useStats` con cálculos memoizados
- [x] Crear `StatsModal` con ranking y métricas actuales

#### FASE F: Estadísticas Finales ✅
- [x] Crear `FinalStatsModal` con diseño de podio estilo campeonato
- [x] Añadir estadísticas adicionales (más misterioso, más ardiente)
- [x] Implementar animaciones de aparición

#### FASE G: Guardado Automático ✅
- [x] Crear hook `useAutoSave` (guarda cada 10 segundos)
- [x] Crear `ResumeGameModal` para recuperar sesiones
- [x] Integrar auto-save en GameScreenMultiplayer
- [x] Validación de sesiones antiguas (>24h)

#### FASE H: Animaciones y Polish Visual ✅
- [x] Instalar `react-native-reanimated` y `expo-linear-gradient`
- [x] Mejorar `PhraseCard` con gradientes y efecto glow
- [x] Añadir animaciones bounce a `PlayerListItem` al incrementar tragos
- [x] Mejorar splash screen y App.tsx con loading state
- [x] Actualizar app.json con tema oscuro y colores taberna

#### FASE I: Optimización y Testing Final ✅
- [x] Implementar React.memo en 4 componentes pesados:
  - PlayerListItem
  - PhraseCard
  - StatsModal
  - FinalStatsModal
- [x] useStats hook ya usa useMemo para optimización
- [x] Añadir sanitización de nombres de jugadores (función `sanitizeName()`)
  - Elimina HTML/scripts
  - Filtra caracteres de control
  - Máximo 30 caracteres
- [x] Crear hook `useRateLimit` para anti-spam
- [x] Integrar rate limiting en PlayerListItem (máx 10 clicks/segundo)
- [x] Error handling completo con try/catch en AsyncStorage (ya existente)
- [x] Verificación TypeScript sin errores

#### FASE J: Frases Adicionales ✅
- [x] Completar frases faltantes en picanteLevel (76→80)
- [x] Verificar no hay duplicados exactos
- [x] Contar frases totales: **240 frases** (60+80+100) ✅
- [x] Review de ortografía y conceptos

#### Archivos creados/modificados (V2.0):
**Nuevos archivos (29):**
1. `src/types/index.ts` - Extendido con tipos V2.0
2. `src/data/phrases/medioLevel.ts` - 60 frases
3. `src/data/phrases/picanteLevel.ts` - 80 frases
4. `src/data/phrases/muyPicanteLevel.ts` - 100 frases
5. `src/utils/funnyNames.ts` - Generador nombres random
6. `src/utils/storage.ts` - Extendido con nuevas funciones
7. `src/hooks/usePlayers.ts` - Gestión jugadores
8. `src/hooks/useGameSession.ts` - Gestión sesión de juego
9. `src/hooks/useStats.ts` - Cálculos estadísticas
10. `src/hooks/useAutoSave.ts` - Auto-guardado cada 10s
11. `src/hooks/useRateLimit.ts` - Anti-spam
12. `src/screens/PlayerSetupScreen.tsx` - Setup 2-20 jugadores
13. `src/screens/CategorySelectionScreen.tsx` - 4 categorías
14. `src/screens/GameScreenMultiplayer.tsx` - Juego multijugador
15. `src/components/PlayerListItem.tsx` - Item jugador con animaciones
16. `src/components/StatsModal.tsx` - Stats en tiempo real
17. `src/components/FinalStatsModal.tsx` - Stats finales con podio
18. `src/components/ResumeGameModal.tsx` - Recuperar sesión
19. `src/components/CagonModal.tsx` - Modal botón cagón
20. `src/data/cagonPhrases.ts` - 30 frases troll
21. `src/data/funnyMessages.ts` - 30 mensajes personalizados
22. `src/constants/Colors.ts` - Actualizado tema taberna

**Archivos modificados:**
1. `src/navigation/AppNavigator.tsx` - 3 screens nuevas añadidas
2. `src/screens/HomeScreen.tsx` - Navegación a CategorySelection + ResumeGameModal
3. `src/components/PhraseCard.tsx` - Gradientes y glow effect
4. `App.tsx` - Loading state y StatusBar light
5. `app.json` - userInterfaceStyle dark, splash colors

#### Características implementadas:
- ✅ **Multijugador 2-20 jugadores** con nombres random generados
- ✅ **4 categorías de dificultad** (Cagón, Medio, Picante, Muy Picante)
- ✅ **240 frases totales** organizadas por nivel
- ✅ **Sistema de tragos** con contador y ranking en vivo
- ✅ **Estadísticas en tiempo real** con modal dedicado
- ✅ **Estadísticas finales** con podio de ganadores
- ✅ **Auto-guardado cada 10 segundos** con recuperación de sesiones
- ✅ **Mensajes personalizados** cada 5 frases
- ✅ **Botón "Cagón"** con contador persistente y frases troll
- ✅ **Animaciones bounce** al incrementar tragos
- ✅ **Gradientes y efectos visuales** en tarjetas
- ✅ **Rate limiting anti-spam** (máx 10 clicks/seg)
- ✅ **Sanitización de inputs** contra inyección código
- ✅ **React.memo optimizations** en componentes pesados
- ✅ **Tema taberna/garito** con colores cálidos

#### Mejoras de performance:
- React.memo en 4 componentes críticos
- useMemo en cálculos de stats
- Rate limiting para prevenir spam
- useCallback implícito en hooks custom

#### Mejoras de seguridad:
- Sanitización nombres jugadores (HTML, scripts, caracteres peligrosos)
- Validación AsyncStorage con try/catch
- Timeout sesiones antiguas (24h)
- Límites de caracteres (30 max nombres)

#### Testing realizado:
- ✅ TypeScript compilation sin errores
- ✅ Todas las dependencias instaladas correctamente
- ✅ Navegación completa funciona
- ✅ Sistema multijugador operativo
- ✅ Auto-save y recuperación de sesiones
- ✅ Animaciones fluidas
- ✅ No hay duplicados en 240 frases

#### Próximos pasos sugeridos:
- Testing extensivo con usuario real
- Probar con 2, 10 y 20 jugadores
- Agotar todas las frases de una categoría
- Verificar auto-save funciona correctamente
- Testing en dispositivo físico Android

#### Estadísticas finales V2.0:
- **Líneas de código añadidas:** ~4000+
- **Archivos creados:** 22 nuevos
- **Frases totales:** 240 (vs 50 en V1.0)
- **Pantallas totales:** 7 (vs 4 en V1.0)
- **Componentes totales:** 10 (vs 2 en V1.0)
- **Hooks custom:** 6 (vs 1 en V1.0)
- **Jugadores soportados:** 2-20 (vs 1 en V1.0)

---

### FASE 2: Tipos y Configuración Base ⏳ PENDIENTE

**Duración estimada:** 30 minutos
**Depende de:** Fase 1
**Responsable:** Claude Code

#### Objetivo:
Configurar TypeScript estrictamente y crear todas las interfaces, constantes y datos base necesarios.

#### Tareas:
- [ ] Verificar `tsconfig.json` tiene strict mode activado
- [ ] Crear `src/types/index.ts` con todas las interfaces:
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
- [ ] Crear `src/constants/Colors.ts` con DarkTheme y LightTheme
- [ ] Crear `src/data/defaultPhrases.ts` con exactamente 50 frases variadas:
  - 10 suaves
  - 15 medias
  - 15 picantes
  - 10 muy picantes/cerdas
- [ ] Crear `src/utils/storage.ts` con funciones tipadas para AsyncStorage
- [ ] Crear `src/utils/shuffle.ts` con algoritmo Fisher-Yates

#### Archivos a crear:
1. `src/types/index.ts`
2. `src/constants/Colors.ts`
3. `src/data/defaultPhrases.ts`
4. `src/utils/storage.ts`
5. `src/utils/shuffle.ts`

#### Criterios de éxito:
- ✅ Sin errores de TypeScript al compilar
- ✅ 50 frases predefinidas variadas (verificar contenido)
- ✅ Funciones de storage correctamente tipadas
- ✅ Algoritmo shuffle implementado correctamente
- ✅ Constantes de colores para ambos temas

#### Notas:
- Las frases NO deben incluir "Yo nunca" al inicio (se añade dinámicamente)
- Frases deben ser variadas: algunas muy suaves, otras muy picantes
- Storage functions deben manejar errores con try/catch

---

### FASE 3: Context y Hooks ⏳ PENDIENTE

**Duración estimada:** 45 minutos
**Depende de:** Fase 2
**Responsable:** Claude Code

#### Objetivo:
Implementar la lógica de negocio principal: gestión de tema y gestión de frases con anti-repetición.

#### Tareas:
- [ ] Crear `src/context/ThemeContext.tsx`:
  - Provider con estado dark/light
  - Hook `useTheme()` para consumir
  - Cargar preferencia desde AsyncStorage al inicio
  - Guardar preferencia cuando cambia
- [ ] Crear `src/hooks/usePhrases.ts`:
  - Estado: `allPhrases`, `unusedPhrases`, `currentPhrase`, `phrasesCount`
  - Función `loadPhrases()`: Carga defaultPhrases + customPhrases desde AsyncStorage
  - Función `nextPhrase()`: Muestra siguiente frase sin repetir
  - Función `resetPool()`: Resetea el pool y baraja de nuevo
  - Lógica: Cuando `unusedPhrases.length === 1`, mostrar alert y resetear
  - Usar `shuffle()` de utils al cargar y resetear

#### Archivos a crear:
1. `src/context/ThemeContext.tsx`
2. `src/hooks/usePhrases.ts`

#### Criterios de éxito:
- ✅ ThemeContext funciona (puede cambiar entre oscuro/claro)
- ✅ usePhrases devuelve frases sin repetir
- ✅ Pool se resetea automáticamente al agotarse
- ✅ Persistencia funciona (tema persiste tras cerrar/abrir app)
- ✅ Frases personalizadas se integran con predefinidas correctamente

#### Lógica anti-repetición esperada:
```typescript
// Pseudocódigo del hook
const [allPhrases, setAllPhrases] = useState<string[]>([]);
const [unusedPhrases, setUnusedPhrases] = useState<string[]>([]);
const [currentPhrase, setCurrentPhrase] = useState<string>('');

const loadPhrases = async () => {
  const custom = await getCustomPhrases();
  const combined = [...defaultPhrases, ...custom];
  const shuffled = shuffle(combined);
  setAllPhrases(combined);
  setUnusedPhrases(shuffled);
  setCurrentPhrase(shuffled[0]);
};

const nextPhrase = () => {
  if (unusedPhrases.length === 1) {
    // Última frase
    Alert.alert('¡Se acabaron las frases!', 'Reiniciando el juego...');
    resetPool();
  } else {
    const remaining = unusedPhrases.slice(1);
    setUnusedPhrases(remaining);
    setCurrentPhrase(remaining[0]);
  }
};

const resetPool = () => {
  const shuffled = shuffle(allPhrases);
  setUnusedPhrases(shuffled);
  setCurrentPhrase(shuffled[0]);
};
```

---

### FASE 4: Componentes Reutilizables ⏳ PENDIENTE

**Duración estimada:** 30 minutos
**Depende de:** Fase 3
**Responsable:** Claude Code

#### Objetivo:
Crear componentes de UI reutilizables estilizados según el diseño.

#### Tareas:
- [ ] Crear `src/components/CustomButton.tsx`:
  - Props: `title: string`, `onPress: () => void`, `variant: 'primary' | 'secondary' | 'danger'`
  - Estilos diferentes según variant
  - Usar colores del tema actual (useTheme)
  - Border radius 16px, padding 16/32, elevation 4
- [ ] Crear `src/components/PhraseCard.tsx`:
  - Props: `phrase: string`
  - Tarjeta centrada con diseño del prompt
  - Ajustar tamaño de fuente según longitud de frase (responsive)
  - Border radius 20px, padding 32px, elevation 6
  - Formato: "Yo nunca {phrase}"

#### Archivos a crear:
1. `src/components/CustomButton.tsx`
2. `src/components/PhraseCard.tsx`

#### Criterios de éxito:
- ✅ Botones funcionan con 3 variants (primary/secondary/danger)
- ✅ Botones respetan colores del tema actual
- ✅ PhraseCard ajusta font size si frase es muy larga
- ✅ PhraseCard muestra "Yo nunca" + frase correctamente
- ✅ Estilos match el diseño especificado (border radius, padding, etc.)

#### Notas de diseño:
- Primary button: fondo `theme.primary` (dorado), texto negro
- Secondary button: fondo `theme.secondary` (morado), texto blanco
- Danger button: fondo `theme.danger` (rojo), texto blanco
- PhraseCard: fondo `theme.cardBackground`, texto `theme.text`

---

### FASE 5: Pantallas Principales ⏳ PENDIENTE

**Duración estimada:** 2-3 horas
**Depende de:** Fase 4
**Responsable:** Claude Code

#### Objetivo:
Implementar las 4 pantallas principales de la app con funcionalidad completa.

#### Tareas:

**1. HomeScreen (`src/screens/HomeScreen.tsx`):**
- [ ] Layout centrado con SafeAreaView
- [ ] Logo/título: "🍻 Yo Nunca" (36px, bold)
- [ ] Subtítulo: "El juego de beber definitivo" (16px)
- [ ] Botón principal: "Jugar" (navigate a Game)
- [ ] Botón secundario: "Mis Frases" (navigate a CustomPhrases)
- [ ] Icono ⚙️ en header derecho (navigate a Settings)
- [ ] Usar CustomButton component
- [ ] Fondo según tema actual

**2. GameScreen (`src/screens/GameScreen.tsx`):**
- [ ] Usar hook `usePhrases`
- [ ] PhraseCard centrada mostrando `currentPhrase`
- [ ] Botón grande "Siguiente" → `nextPhrase()`
- [ ] Botón pequeño "↻ Reiniciar" arriba → `resetPool()`
- [ ] Contador abajo: "Quedan X frases" (`unusedPhrases.length`)
- [ ] SafeAreaView
- [ ] Manejo de estado vacío (si no hay frases)

**3. CustomPhrasesScreen (`src/screens/CustomPhrasesScreen.tsx`):**
- [ ] Header: "Mis Frases Personalizadas"
- [ ] Botón superior: "+ Añadir Nueva Frase"
- [ ] FlatList de frases personalizadas
- [ ] Cada item:
  - Texto de la frase
  - Botón eliminar (🗑️) → elimina esa frase específica
- [ ] Botón inferior: "Eliminar Todas" (con Alert de confirmación)
- [ ] Estado vacío: Mensaje si no hay frases personalizadas
- [ ] Al añadir frase: Alert.prompt o Modal con TextInput
- [ ] Validación:
  - Mínimo 10 caracteres
  - Máximo 200 caracteres
  - No vacío (trim)
- [ ] Persistir en AsyncStorage inmediatamente

**4. SettingsScreen (`src/screens/SettingsScreen.tsx`):**
- [ ] Toggle "Modo oscuro" (Switch component)
- [ ] Al cambiar: actualizar ThemeContext y guardar en AsyncStorage
- [ ] Botón "Resetear frases personalizadas" (con Alert de confirmación)
- [ ] Sección informativa:
  - Versión de app (leer de app.json o hardcoded "1.0.0")
  - "Hecho con ❤️ para fiestas épicas"
- [ ] Botón "Política de Privacidad" → Modal con texto completo
- [ ] SafeAreaView

#### Archivos a crear:
1. `src/screens/HomeScreen.tsx`
2. `src/screens/GameScreen.tsx`
3. `src/screens/CustomPhrasesScreen.tsx`
4. `src/screens/SettingsScreen.tsx`

#### Criterios de éxito:
- ✅ Todas las pantallas renderizan sin errores
- ✅ Navegación funciona entre pantallas (placeholder por ahora)
- ✅ GameScreen muestra frases sin repetir correctamente
- ✅ CustomPhrasesScreen añade/elimina frases y persiste
- ✅ SettingsScreen cambia tema y se ve reflejado inmediatamente
- ✅ Todas usan SafeAreaView y colores del tema

#### Notas importantes:
- En CustomPhrasesScreen, usar FlatList (no ScrollView) para performance
- GameScreen debe llamar `loadPhrases()` en useEffect al montar
- Alert de confirmación antes de eliminar todas las frases
- Modal de política de privacidad debe ser scrolleable

---

### FASE 6: Navegación ⏳ PENDIENTE

**Duración estimada:** 30 minutos
**Depende de:** Fase 5
**Responsable:** Claude Code

#### Objetivo:
Configurar Stack Navigator y conectar todas las pantallas con navegación funcional.

#### Tareas:
- [ ] Crear `src/navigation/AppNavigator.tsx`
- [ ] Importar todas las screens
- [ ] Configurar Stack Navigator con 4 pantallas:
  - Home (initial)
  - Game
  - CustomPhrases
  - Settings
- [ ] Personalizar headers:
  - Colores según tema actual
  - HomeScreen: sin header
  - Otras: con header y back button
- [ ] Configurar tipos TypeScript correctos (RootStackParamList)
- [ ] Habilitar gesture handling nativo

#### Archivo a crear:
1. `src/navigation/AppNavigator.tsx`

#### Ejemplo de estructura:
```typescript
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import HomeScreen from '../screens/HomeScreen';
// ... imports

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: theme.cardBackground },
        headerTintColor: theme.text,
      }}
    >
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Game" component={GameScreen} options={{ title: 'Jugar' }} />
      <Stack.Screen name="CustomPhrases" component={CustomPhrasesScreen} options={{ title: 'Mis Frases' }} />
      <Stack.Screen name="Settings" component={SettingsScreen} options={{ title: 'Configuración' }} />
    </Stack.Navigator>
  );
}
```

#### Criterios de éxito:
- ✅ Navegación fluida entre todas las pantallas
- ✅ Headers personalizados con colores del tema
- ✅ Sin errores de tipos TypeScript en navigation
- ✅ Gesture handling funciona (swipe back en iOS)
- ✅ Back button visible y funcional en Android

---

### FASE 7: Integración y Testing ⏳ PENDIENTE

**Duración estimada:** 1-2 horas
**Depende de:** Fase 6
**Responsable:** Claude Code

#### Objetivo:
Integrar todo en App.tsx, aplicar polish final y hacer testing completo en Expo Go.

#### Tareas:
- [ ] Configurar `App.tsx`:
  ```typescript
  import { NavigationContainer } from '@react-navigation/native';
  import { ThemeProvider } from './src/context/ThemeContext';
  import AppNavigator from './src/navigation/AppNavigator';
  import { StatusBar } from 'expo-status-bar';

  export default function App() {
    return (
      <ThemeProvider>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AppNavigator />
        </NavigationContainer>
      </ThemeProvider>
    );
  }
  ```
- [ ] Verificar SafeAreaView en todas las pantallas
- [ ] Configurar StatusBar según tema (light/dark)
- [ ] Testing manual completo:
  - [ ] Probar navegación completa (Home → Game → CustomPhrases → Settings)
  - [ ] Añadir 3 frases personalizadas
  - [ ] Jugar hasta agotar frases (verificar no se repiten)
  - [ ] Verificar alert de "se acabaron las frases"
  - [ ] Cambiar a modo claro, verificar que todos los colores cambian
  - [ ] Cerrar app y reabrir, verificar que frases personalizadas persisten
  - [ ] Verificar que preferencia de tema persiste
  - [ ] Eliminar una frase personalizada específica
  - [ ] Eliminar todas las frases personalizadas
  - [ ] Resetear pool manualmente con botón ↻
- [ ] Probar en Expo Go en dispositivo Android real
- [ ] Verificar responsive en diferentes tamaños de pantalla
- [ ] Eliminar todos los console.log innecesarios

#### Criterios de éxito:
- ✅ App funciona en Expo Go sin crashes
- ✅ Frases no se repiten en misma sesión
- ✅ Frases personalizadas persisten tras cerrar app
- ✅ Cambio de tema funciona y persiste
- ✅ SafeArea funciona en dispositivos con notch
- ✅ Navegación fluida sin lag
- ✅ Sin warnings importantes en consola
- ✅ Alert de confirmación funciona antes de eliminar

#### Bloqueadores posibles:
- AsyncStorage no funciona en iOS Simulator → Solución: usar dispositivo real o Android emulator
- Fonts no cargan → Verificar que no usamos custom fonts

---

### FASE 8: Documentación ⏳ PENDIENTE

**Duración estimada:** 1 hora
**Depende de:** Fase 7
**Responsable:** Claude Code

#### Objetivo:
Crear documentación completa para que cualquiera pueda ejecutar y entender el proyecto.

#### Tareas:
- [ ] Crear `README.md` en raíz del proyecto (usar template del prompt)
- [ ] Crear `docs/PRIVACY_POLICY.md` (usar template del prompt)
- [ ] Crear `docs/ICON_GUIDE.md` (usar template del prompt)
- [ ] Crear `.gitignore` apropiado:
  ```
  node_modules/
  .expo/
  dist/
  npm-debug.*
  *.jks
  *.p8
  *.p12
  *.key
  *.mobileprovision
  *.orig.*
  web-build/
  .DS_Store
  ```
- [ ] Añadir comentarios JSDoc en funciones complejas:
  - `usePhrases.ts`: nextPhrase, resetPool, loadPhrases
  - `storage.ts`: todas las funciones
  - `shuffle.ts`: algoritmo shuffle
- [ ] Verificar que todos los TODOs en código están resueltos

#### Archivos a crear:
1. `README.md`
2. `docs/PRIVACY_POLICY.md`
3. `docs/ICON_GUIDE.md`
4. `.gitignore`

#### Criterios de éxito:
- ✅ README con instrucciones claras de instalación
- ✅ README con sección de troubleshooting
- ✅ Política de privacidad completa y lista para publicar
- ✅ Guía de iconos con herramientas y tutorial
- ✅ Código importante comentado (no sobre-comentar)
- ✅ .gitignore cubre todos los archivos sensibles

---

### FASE 9: Preparación para Producción ⏳ PENDIENTE

**Duración estimada:** 1-2 horas
**Depende de:** Fase 8
**Responsable:** Claude Code + Humano

#### Objetivo:
Configurar el proyecto para generar builds de producción.

#### Tareas:
- [ ] Actualizar `app.json` con configuración completa de producción (usar template del prompt):
  - name: "Yo Nunca"
  - slug: "yo-nunca"
  - version: "1.0.0"
  - android.package: "com.partyapps.yonunca"
  - android.versionCode: 1
  - ios.bundleIdentifier: "com.partyapps.yonunca"
  - permissions: [] (vacío)
- [ ] Crear `eas.json` (usar template del prompt):
  - Profile preview: genera APK
  - Profile production: genera AAB
- [ ] Instalar EAS CLI:
  ```bash
  npm install -g eas-cli
  ```
- [ ] Login en EAS:
  ```bash
  eas login
  ```
- [ ] Configurar proyecto:
  ```bash
  eas build:configure
  ```
  - Esto añade projectId a app.json
- [ ] Generar build de preview (APK):
  ```bash
  eas build --platform android --profile preview
  ```
- [ ] Esperar ~10-15 minutos a que compile
- [ ] Descargar APK generado
- [ ] Instalar APK en dispositivo Android real
- [ ] Verificar que funciona igual que en Expo Go
- [ ] Probar que funciona completamente offline (modo avión)

#### Comandos exactos:
```bash
npm install -g eas-cli
eas login
cd C:\Users\danie\APPS\yo-nunca
eas build:configure
eas build --platform android --profile preview
```

#### Criterios de éxito:
- ✅ Build de preview completa sin errores
- ✅ APK descargado e instalado en Android
- ✅ App funciona exactamente igual que en Expo Go
- ✅ Todas las features funcionan offline
- ✅ app.json tiene bundle ID correcto
- ✅ eas.json configurado correctamente

#### Bloqueadores posibles:
- Error de autenticación EAS → Re-login con `eas login`
- Build falla por dependencias → Verificar package.json
- APK no instala → Habilitar "Orígenes desconocidos" en Android

---

### FASE 10: Assets de Producción ⏳ PENDIENTE

**Duración estimada:** 2-3 horas (trabajo manual del humano)
**Depende de:** Fase 9
**Responsable:** HUMANO (con guía de Claude)

#### Objetivo:
Crear todos los assets gráficos necesarios para Google Play Store.

#### Tareas (HUMANO):
- [ ] Crear icono 1024x1024 px (seguir `docs/ICON_GUIDE.md`):
  - Herramienta recomendada: Figma o Canva
  - Diseño: Emoji 🍻 + texto "YO NUNCA" en dorado
  - Guardar como `assets/icon.png`
- [ ] Crear adaptive icon 1024x1024 px:
  - Mismo diseño pero respetando área segura (círculo de 640px)
  - Guardar como `assets/adaptive-icon.png`
- [ ] Crear splash screen 1284x2778 px:
  - Fondo negro #0F0F0F
  - Logo/icono centrado
  - Texto "Yo Nunca" en dorado
  - Guardar como `assets/splash.png`
- [ ] Capturar screenshots (mínimo 4):
  - Abrir app en dispositivo Android
  - Captura HomeScreen
  - Captura GameScreen con frase picante visible
  - Captura CustomPhrasesScreen con lista de frases
  - Captura SettingsScreen
  - Guardar en `assets/screenshots/`
- [ ] (Opcional) Crear banner 1024x500 px para Google Play

#### Herramientas recomendadas:
- **Figma:** figma.com (gratis, mejor opción)
- **Canva:** canva.com (gratis, plantillas pre-hechas)
- **Icon Kitchen:** icon.kitchen (Android-specific, gratis)
- **MockUPhone:** mockuphone.com (para screenshots con frame de móvil)

#### Criterios de éxito:
- ✅ Icono 1024x1024 creado y se ve bien a pequeño tamaño
- ✅ Adaptive icon funciona con máscaras circular/cuadrada
- ✅ Splash screen en resolución correcta
- ✅ Mínimo 4 screenshots de calidad (1080x1920 o similar)
- ✅ Todos los assets en carpeta `assets/`

#### Notas:
- Esta fase es principalmente trabajo manual del humano
- Claude Code puede dar feedback sobre los assets si se suben para revisión
- Seguir guía en `docs/ICON_GUIDE.md` paso a paso

---

### FASE 11: Build de Producción ⏳ PENDIENTE

**Duración estimada:** 1 hora (+ 10-15 min de compilación en nube)
**Depende de:** Fase 10
**Responsable:** Claude Code + Humano

#### Objetivo:
Generar el archivo .aab (Android App Bundle) final para subir a Google Play.

#### Tareas:
- [ ] Verificar que todos los assets están en `assets/`:
  - icon.png
  - adaptive-icon.png
  - splash.png
- [ ] Verificar versión en `app.json`:
  - version: "1.0.0"
  - android.versionCode: 1
- [ ] Verificar bundle ID: "com.partyapps.yonunca"
- [ ] Eliminar todos los console.log del código
- [ ] Verificar que no hay TODOs pendientes
- [ ] Generar build de producción:
  ```bash
  eas build --platform android --profile production
  ```
- [ ] Esperar ~10-15 minutos a que compile
- [ ] Descargar archivo .aab generado
- [ ] Verificar tamaño del bundle (debería ser < 50MB)
- [ ] Guardar .aab en carpeta segura para subir a Google Play

#### Comandos exactos:
```bash
cd C:\Users\danie\APPS\yo-nunca
eas build --platform android --profile production
```

#### Criterios de éxito:
- ✅ Build completa sin errores ni warnings
- ✅ Archivo .aab generado y descargado
- ✅ Tamaño razonable (esperado: 20-40MB)
- ✅ Versión 1.0.0 correcta
- ✅ Bundle ID correcto en .aab

#### Bloqueadores posibles:
- Build falla por assets faltantes → Verificar que icon.png existe
- Build falla por errores de código → Verificar que app funciona en Expo Go
- Tamaño excesivo → Revisar dependencias innecesarias

---

### FASE 12: Google Play Console Setup ⏳ PENDIENTE

**Duración estimada:** 2-3 horas (+ 24-48h de aprobación de cuenta)
**Depende de:** Fase 11
**Responsable:** HUMANO

#### Objetivo:
Crear cuenta de Google Play Developer y configurar la aplicación.

#### Tareas (HUMANO):
- [ ] Ir a play.google.com/console
- [ ] Crear cuenta de Google Play Developer
- [ ] Pagar tarifa única de ~25€
- [ ] Esperar aprobación de cuenta (24-48 horas normalmente)
- [ ] Una vez aprobada, crear nueva aplicación:
  - Nombre: "Yo Nunca"
  - Idioma predeterminado: Español
  - Tipo: Juego o Aplicación
  - Categoría: Casual
- [ ] Completar cuestionario de clasificación de contenido (IARC):
  - ¿Violencia? NO
  - ¿Contenido sexual? SÍ (referencias sexuales)
  - ¿Drogas/alcohol? SÍ (juego de beber)
  - ¿Para niños? NO
  - Resultado esperado: 18+ / Mature
- [ ] Subir política de privacidad:
  - Copiar contenido de `docs/PRIVACY_POLICY.md`
  - Subir a GitHub Pages (username.github.io/yo-nunca-privacy)
  - O usar Google Sites (gratis)
  - Pegar URL en Google Play Console

#### Requisitos:
- Cuenta de Google
- Tarjeta de crédito/débito para pago
- URL pública para política de privacidad

#### Criterios de éxito:
- ✅ Cuenta de desarrollador activada
- ✅ App creada en console
- ✅ Clasificación 18+ configurada correctamente
- ✅ Política de privacidad accesible en URL pública
- ✅ Cuestionario IARC completado

#### Notas:
- La aprobación puede tardar 24-48h, planificar con tiempo
- Guardar credenciales de la cuenta de forma segura
- URL de política de privacidad debe ser permanente

---

### FASE 13: Ficha de Google Play ⏳ PENDIENTE

**Duración estimada:** 1-2 horas
**Depende de:** Fase 12
**Responsable:** HUMANO (con texto del prompt)

#### Objetivo:
Completar toda la ficha de la app en Google Play Store.

#### Tareas (HUMANO):
- [ ] Título: "Yo Nunca - Juego de Beber"
- [ ] Descripción corta (usar texto del prompt):
  ```
  El juego de beber definitivo para fiestas épicas 🍻
  ```
- [ ] Descripción larga (copiar del prompt, sección "Ficha de Play Store")
- [ ] Subir icono 512x512px:
  - Redimensionar `assets/icon.png` a 512x512
  - Subir en sección "Gráficos"
- [ ] Subir screenshots (mínimo 2, recomendado 4-8):
  - Desde carpeta `assets/screenshots/`
  - Orden sugerido: Home → Game → CustomPhrases → Settings
- [ ] Subir banner 1024x500px (opcional pero recomendado)
- [ ] Configurar precios:
  - Seleccionar "Gratis"
  - Distribución: Todos los países (o seleccionar manualmente)
- [ ] Añadir URL de política de privacidad (del paso anterior)
- [ ] Categoría: Casual o Entretenimiento
- [ ] Etiquetas: juego, fiesta, beber, amigos, diversión
- [ ] Información de contacto:
  - Email de soporte (crear uno específico si es necesario)
  - Sitio web (opcional)

#### Criterios de éxito:
- ✅ Ficha completa al 100%
- ✅ Todas las imágenes cumplen especificaciones de Google
- ✅ Descripciones sin errores ortográficos
- ✅ Clasificación 18+ visible
- ✅ Política de privacidad enlazada
- ✅ Mínimo 2 screenshots (recomendado 4)

#### Texto recomendado para descripción:
Ver sección "Ficha de Play Store" en `YO_NUNCA_PROMPT_COMPLETO.md`

---

### FASE 14: Subida y Publicación ⏳ PENDIENTE

**Duración estimada:** 30 minutos (+ 1-7 días de revisión de Google)
**Depende de:** Fase 13
**Responsable:** HUMANO

#### Objetivo:
Subir el .aab a Google Play y enviar a revisión.

#### Tareas (HUMANO):
- [ ] En Google Play Console, ir a "Producción" → "Crear nueva versión"
- [ ] Subir archivo .aab (del Fase 11)
- [ ] Nombre de versión: 1.0.0 (debe coincidir con app.json)
- [ ] Notas de la versión (usar texto del prompt):
  ```
  Primera versión de Yo Nunca:
  • 50 frases predefinidas variadas (suaves a muy picantes)
  • Añade frases personalizadas ilimitadas
  • Sin repeticiones en misma sesión
  • Modo oscuro/claro
  • Sin anuncios
  • 100% offline
  ```
- [ ] Revisar toda la configuración una última vez:
  - Ficha completa
  - Screenshots subidos
  - Clasificación 18+ configurada
  - Política de privacidad accesible
- [ ] Pulsar "Revisar versión"
- [ ] Pulsar "Iniciar lanzamiento en producción"
- [ ] Confirmar y enviar a revisión
- [ ] Esperar notificación de Google (1-7 días):
  - Aprobada → Publicar
  - Rechazada → Leer motivos y corregir

#### Criterios de éxito:
- ✅ .aab subido correctamente sin errores
- ✅ Release enviado a revisión
- ✅ Confirmación de envío recibida
- ✅ (Eventual) App aprobada por Google
- ✅ (Eventual) App publicada y visible en Play Store

#### Posibles motivos de rechazo:
- Contenido adulto mal clasificado → Verificar que está en 18+
- Política de privacidad no accesible → Verificar URL funciona
- Descripción engañosa → Asegurar que describe correctamente la app
- Contenido inapropiado → Revisar frases predefinidas

#### Qué hacer si es rechazada:
1. Leer cuidadosamente el email de Google
2. Corregir el problema indicado
3. Generar nuevo build si es necesario (incrementar versionCode a 2)
4. Volver a subir y enviar a revisión

---

### FASE 15: Post-Lanzamiento ⏳ PENDIENTE

**Duración estimada:** Continuo
**Depende de:** Fase 14 (app publicada)
**Responsable:** HUMANO

#### Objetivo:
Mantener y mejorar la app tras el lanzamiento.

#### Tareas continuas:
- [ ] Monitorear reviews y comentarios en Google Play
- [ ] Responder a reviews (especialmente negativos)
- [ ] Recopilar feedback de usuarios
- [ ] Anotar bugs reportados
- [ ] Anotar features solicitadas
- [ ] Planear actualizaciones futuras:
  - Más frases predefinidas
  - Nuevas categorías de frases
  - Mejoras de UI/UX
  - Optimizaciones de performance
- [ ] Considerar lanzamiento en iOS:
  - Requiere cuenta Apple Developer (99€/año)
  - Mismo código base, build diferente
  - Proceso similar con App Store Connect

#### Mejoras futuras consideradas:
- Sistema de categorías (suave, medio, picante, muy picante)
- Filtros para elegir qué categorías incluir
- Modo multijugador con Bluetooth
- Estadísticas de juego (cuántas frases jugadas, etc.)
- Compartir frases con amigos
- Traducción a inglés u otros idiomas
- Temas personalizables (más colores)
- Sonidos y vibración al cambiar frase

#### KPIs a monitorear:
- Número de descargas
- Rating promedio (objetivo: > 4.0 estrellas)
- Retención (cuántos usuarios vuelven a usar la app)
- Crashes (objetivo: < 1%)
- Reviews (leer y responder)

---

## 📝 Notas de Desarrollo

### Decisiones técnicas

**2025-10-22 - SafeAreaView migration:**
- **Decisión:** Migrar de SafeAreaView deprecated a react-native-safe-area-context
- **Razón:** El SafeAreaView de react-native está deprecated y será eliminado en futuras versiones
- **Impacto:** Mejor compatibilidad con dispositivos con notch/island dinámico

**2025-10-22 - Limpieza automática de "Yo nunca":**
- **Decisión:** Implementar regex para detectar y eliminar "yo nunca" del inicio de frases personalizadas
- **Razón:** UX - usuarios naturalmente escriben "yo nunca..." al crear frases, causando duplicación
- **Implementación:** Regex case-insensitive `/^(yo nunca|yo\s+nunca)\s+/i` en storage.ts
- **Beneficio:** Usuario puede escribir como quiera, la app lo normaliza automáticamente

---

### Problemas encontrados y soluciones

**2025-10-22 - SafeAreaView deprecated warning:**
- **Problema:** Warning en consola: "SafeAreaView has been deprecated and will be removed in a future release"
- **Solución:** Cambiar imports en las 4 pantallas de `import { SafeAreaView } from 'react-native'` a `import { SafeAreaView } from 'react-native-safe-area-context'`
- **Archivos afectados:** HomeScreen, GameScreen, CustomPhrasesScreen, SettingsScreen

**2025-10-22 - Autocapitalización no deseada:**
- **Problema:** Al escribir frases personalizadas, el teclado ponía mayúsculas automáticas en palabras como "el", "la"
- **Solución:** Añadir `autoCapitalize="none"` y `autoCorrect={false}` al TextInput en CustomPhrasesScreen
- **Resultado:** Usuario tiene control total sobre mayúsculas/minúsculas

**2025-10-22 - "Yo nunca" duplicado:**
- **Problema:** Si usuario escribe "Yo nunca he bailado..." se mostraba como "Yo nunca yo nunca he bailado..."
- **Causa:** PhraseCard siempre añade "Yo nunca" al inicio, pero usuario lo incluía al crear la frase
- **Solución:** Implementar detección automática con regex en `addCustomPhrase()` para eliminar "yo nunca" del inicio
- **Mejora adicional:** Añadir instrucción visible y mejorar placeholder para guiar al usuario

---

### Cambios respecto al plan original
*(Documentar desviaciones del prompt inicial)*

**Ejemplo:**
- **Fecha:** 2025-10-24
- **Cambio:** Aumentadas frases predefinidas de 50 a 75
- **Razón:** Feedback de testers indicó que 50 era poco

---

## 🎯 Para la próxima sesión de Claude Code

### Instrucciones para otra instancia:

**¿Qué hacer al leer este documento?**

1. **Primero, leer:** `YO_NUNCA_PROMPT_COMPLETO.md` para entender TODAS las especificaciones técnicas
2. **Segundo, verificar:** ¿Cuál es la "Fase actual" arriba? (debería ser Fase 1)
3. **Tercero, ejecutar:** Todas las tareas de la fase actual marcadas como pendientes [ ]
4. **Cuarto, actualizar este devlog:**
   - Marcar tareas completadas con [x]
   - Añadir notas en sección "Notas de Desarrollo" si hay problemas o decisiones
   - Cambiar "Fase actual" cuando termines la fase
5. **Quinto, continuar:** Pasar a la siguiente fase automáticamente

### Contexto importante:
- Este es un proyecto NUEVO, todavía no existe carpeta `yo-nunca/`
- La ubicación base es: `C:\Users\danie\APPS`
- El primer paso es crear el proyecto con `npx create-expo-app`
- Leer el prompt completo para entender arquitectura y requerimientos

### Comando para empezar (Fase 1):
```bash
cd C:\Users\danie\APPS
npx create-expo-app yo-nunca --template expo-template-blank-typescript
```

### Filosofía de desarrollo:
- **TypeScript strict:** No usar `any` excepto casos justificados
- **Comentarios útiles:** Documentar lógica compleja, no obviedades
- **Performance:** Usar FlatList, React.memo donde tenga sentido
- **Testing continuo:** Verificar en Expo Go tras cada fase
- **Git commits:** Hacer commit al final de cada fase completada

---

## ✅ Checklist Global de Progreso

### Desarrollo (Fases 1-8)
- [x] FASE 1: Setup inicial
- [x] FASE 2: Tipos y configuración base
- [x] FASE 3: Context y hooks
- [x] FASE 4: Componentes reutilizables
- [x] FASE 5: Pantallas principales
- [x] FASE 6: Navegación
- [x] FASE 7: Integración y documentación
- [x] FASE 8: Testing manual y correcciones

### Producción (Fases 9-11)
- [ ] FASE 9: Preparación para producción
- [ ] FASE 10: Assets de producción
- [ ] FASE 11: Build de producción

### Google Play (Fases 12-14)
- [ ] FASE 12: Google Play Console setup
- [ ] FASE 13: Ficha de Google Play
- [ ] FASE 14: Subida y publicación

### Post-Lanzamiento (Fase 15)
- [ ] FASE 15: Monitoreo y mejoras continuas

---

## 📊 Métricas del Proyecto

### Tiempo estimado total:
- **Desarrollo (Fases 1-8):** ~8-12 horas
- **Producción (Fases 9-11):** ~4-6 horas
- **Google Play (Fases 12-14):** ~4-6 horas + 1-7 días de revisión
- **TOTAL:** ~16-24 horas de trabajo activo + tiempo de espera

### Costos:
- **Google Play Developer:** ~25€ (pago único)
- **EAS Build:** Gratis (plan free tier, limitado)
- **Assets (Figma/Canva):** Gratis
- **TOTAL MÍNIMO:** ~25€

### Complejidad:
- **Nivel técnico requerido:** Intermedio
- **Experiencia con React Native:** Útil pero no esencial (siguiendo prompt)
- **Experiencia con TypeScript:** Básica suficiente

---

## 🔗 Enlaces Útiles

### Documentación:
- [Expo Docs](https://docs.expo.dev/)
- [React Navigation](https://reactnavigation.org/)
- [AsyncStorage](https://react-native-async-storage.github.io/async-storage/)
- [EAS Build](https://docs.expo.dev/build/introduction/)

### Herramientas:
- [Figma](https://figma.com) - Diseño de iconos
- [Canva](https://canva.com) - Alternativa a Figma
- [Icon Kitchen](https://icon.kitchen) - Generador de iconos Android
- [Google Play Console](https://play.google.com/console)

### Comunidad:
- [Expo Discord](https://chat.expo.dev/)
- [React Native Reddit](https://reddit.com/r/reactnative)
- [Stack Overflow - React Native](https://stackoverflow.com/questions/tagged/react-native)

---

---

### MEJORAS UI/UX - Sesión 24/10/2025 ✅ COMPLETADA

**Fecha:** 2025-10-24
**Duración:** ~2 horas
**Responsable:** Claude Code

#### Objetivo:
Pulir la experiencia visual y las transiciones de la app con animaciones personalizadas y mejoras de diseño.

#### Funcionalidades implementadas:

1. **Animación de Transición de Cerveza** 🍺
   - Componente `BeerTransitionAnimation.tsx` creado
   - Animación de líquido de cerveza (#D4A574) subiendo desde abajo
   - Capa de espuma (#FFF5E1) con borde inferior ondulado
   - 80 burbujas animadas con delays aleatorios
   - Duración: 1.2s con timing suave
   - Integrada en 4 puntos de navegación:
     * HomeScreen → "Jugar", "Mis Frases", "Tus Estadísticas"
     * PlayerSetupScreen → "Comenzar Juego"
   - Z-index optimizado para cubrir transiciones
   - Delay de desmontaje (200ms) para eliminar parpadeo

2. **Animación Idle de Burbujas** 🫧
   - Componente `IdleBubblesAnimation.tsx` creado
   - 15 burbujas blancas flotando en HomeScreen
   - Movimiento lento y continuo (6-9s por ciclo)
   - Opacidad: 0.7 máx para visibilidad
   - `pointerEvents="none"` para no bloquear interacción
   - Z-index: 1 (detrás del contenido, delante del fondo)

3. **Fuentes Personalizadas** ✨
   - Instaladas: `@expo-google-fonts/bebas-neue` y `@expo-google-fonts/nunito`
   - Título "Yo Nunca": **Bebas Neue** (56px, letter-spacing: 2)
   - Subtítulo: **Nunito SemiBold** (18px)
   - Hook `useFonts()` integrado correctamente en HomeScreen
   - Sin emojis de cerveza en el título (diseño más limpio)

4. **Imagen del Logo de Fondo** 🖼️
   - Archivo: `fondo.png` (antes `nano-banana-*.png`)
   - Posicionada detrás de burbujas y texto
   - Z-index: 0 (nivel más bajo)
   - Tamaño ajustable (100% ancho, altura personalizada)
   - Opacidad: 0.9

5. **Transiciones de Navegación Optimizadas** 🔄
   - Transición instantánea (0ms) en lugar de slide
   - Eliminado parpadeo visual post-animación
   - Flujo: Animación cerveza → Navega → Delay 200ms → Oculta animación
   - Nueva pantalla carga mientras animación cubre la transición

#### Dependencias añadidas:
```json
{
  "expo-font": "^latest",
  "@expo-google-fonts/bebas-neue": "^latest",
  "@expo-google-fonts/nunito": "^latest",
  "react-native-svg": "^15.12.1"
}
```

#### Archivos creados:
- `src/components/BeerTransitionAnimation.tsx`
- `src/components/IdleBubblesAnimation.tsx`
- `fondo.png` (raíz del proyecto)

#### Archivos modificados:
- `src/screens/HomeScreen.tsx` (fuentes, animaciones, imagen fondo)
- `src/screens/PlayerSetupScreen.tsx` (animación cerveza)
- `src/navigation/AppNavigator.tsx` (transiciones instantáneas)
- `package.json` (nuevas dependencias)

#### Resultados:
- ✅ Animación de cerveza fluida y profesional
- ✅ Transiciones sin parpadeo visible
- ✅ Diseño visual mejorado con fuentes personalizadas
- ✅ Efecto idle sutil que da vida a la pantalla de inicio
- ✅ Performance óptimo (80 burbujas en transición, 15 en idle)
- ✅ Sin errores de TypeScript
- ✅ Sin warnings críticos

#### Notas técnicas:
- Usada Animated API nativa en lugar de Reanimated para evitar problemas de Worklets
- Z-index cuidadosamente configurado: fondo (0) → burbujas idle (1) → contenido (10) → animación cerveza (9999)
- Hooks ordenados correctamente para evitar errores de React
- Delay estratégico de 200ms para cubrir micro-parpadeo de carga de React Navigation

---

### FEEDBACK V2.1 - Ajustes Finales ✅ COMPLETADA

**Fecha:** 2025-10-24
**Duración:** ~3 horas
**Responsable:** Claude Code

#### Objetivo:
Pulir últimos detalles de UX y añadir sistema de estadísticas globales antes de producción.

#### Tareas completadas:

1. **Orden de nombres corregido** ✅
   - Archivo: `src/utils/funnyNames.ts`
   - Cambio: `${adj} ${noun}` → `${noun} ${adj}`
   - Resultado: "Rey Intrépido" en vez de "Intrépido Rey"

2. **60 nombres fiesteros añadidos** ✅
   - Pool expandido con 60 nombres creativos y picantes
   - Categorías: Fiesteros, Humor/doble sentido, Energía sexual
   - Ejemplos: "El Padrino del Perreo", "La CEO del Vacile", "El Vampiro del Vodka"

3. **Botones PlayerSetup igualados** ✅
   - Archivo: `src/screens/PlayerSetupScreen.tsx`
   - Botones "Añadir" y "Cambiar identidad" ahora tienen mismo tamaño

4. **Layout PlayerListItem ajustado** ✅
   - Archivo: `src/components/PlayerListItem.tsx`
   - Nombre del jugador ahora se muestra completo
   - Contador de tragos mejor posicionado

5. **Botón estadísticas restaurado** ✅
   - Archivo: `src/screens/GameScreenMultiplayer.tsx`
   - Header con 2 botones: ✕ (Finalizar) y 🏆 (Stats)
   - StatsModal funcional en tiempo real

6. **Pantalla estadísticas globales** ✅
   - Nuevos archivos:
     * `src/screens/GlobalStatsScreen.tsx`
     * `src/hooks/useGlobalStats.ts`
   - Métricas implementadas:
     * Partidas jugadas
     * Categoría favorita (gráfico de barras)
     * Promedio de jugadores
     * Tiempo total jugado
     * Tragos totales acumulados
     * Racha actual de días consecutivos
     * Récord de tragos en una partida
   - Botón "Resetear Estadísticas" con confirmación
   - Integración completa con sistema de guardado

#### Archivos creados:
1. `src/screens/GlobalStatsScreen.tsx` (208 líneas)
2. `src/hooks/useGlobalStats.ts` (45 líneas)

#### Archivos modificados:
1. `src/utils/funnyNames.ts` - Orden corregido + 60 nombres nuevos
2. `src/screens/PlayerSetupScreen.tsx` - Botones igualados
3. `src/components/PlayerListItem.tsx` - Layout mejorado
4. `src/screens/GameScreenMultiplayer.tsx` - Botón stats restaurado + integración GlobalStats
5. `src/utils/storage.ts` - Funciones `getGlobalStats()` y `updateGlobalStats()`
6. `src/screens/HomeScreen.tsx` - Botón "Tus Estadísticas"
7. `src/navigation/AppNavigator.tsx` - Nueva ruta GlobalStats
8. `src/types/index.ts` - Interfaz `GlobalStats`

#### Resultados:
- ✅ UX mejorada con nombres más naturales
- ✅ Pool de nombres expandido (120+ combinaciones generadas + 60 fiesteros)
- ✅ Layout más limpio y profesional
- ✅ Sistema de estadísticas globales completo y persistente
- ✅ Todas las funcionalidades V2.0 preservadas
- ✅ Sin errores de TypeScript
- ✅ Testing manual exitoso

#### Próximos pasos:
- Testing extensivo con usuario real
- Preparación para producción (Fase 9 del plan original)
- Build de APK para pruebas

---

### BUGFIXES POST-V2.1 ✅ COMPLETADA

**Fecha:** 2025-10-24
**Duración:** ~2 horas
**Responsable:** Claude Code

#### Objetivo:
Resolver 2 bugs críticos antes de pasar a producción:
1. Modal de estadísticas finales no se mostraba visualmente
2. Prompt "tienes una partida en curso" aparecía después de finalizar manualmente

#### Bug 1: Modal de estadísticas finales no renderizaba ✅

**Problema identificado:**
- El modal se abría correctamente (logs confirmaban `visible: true`)
- Las animaciones iniciaban
- Pero el contenido NO se veía en pantalla
- Después de debug visual (fondos de colores), se descubrió que el `ScrollView` no se renderizaba

**Causa raíz:**
- `modalContainer` tenía `maxHeight: '90%'` pero sin estructura flexbox interna
- `ScrollView` con `flex: 1` no sabía cuánto espacio ocupar
- El contenedor no establecía una altura definida para sus hijos

**Solución aplicada:**
1. **[FinalStatsModal.tsx:29](src/components/FinalStatsModal.tsx#L29)** - Removido `React.memo` que bloqueaba re-renders
2. **[FinalStatsModal.tsx:324](src/components/FinalStatsModal.tsx#L324)** - Cambiado `maxHeight: '90%'` a `height: '90%'`
3. **[FinalStatsModal.tsx:331](src/components/FinalStatsModal.tsx#L331)** - Añadido `flexDirection: 'column'` al container
4. **Avatares por defecto** - Añadido emoji 🎭 cuando `player.avatar` es undefined

**Resultado:**
- ✅ Modal se renderiza completamente
- ✅ Podio con 3 jugadores visible
- ✅ Destacados y resumen visibles
- ✅ ScrollView funcional

#### Bug 2: "Tienes una partida en curso" aparecía tras finalizar ✅

**Problema identificado:**
- Al hacer clic en "Finalizar Partida", se marcaba `gameEnded: true`
- Pero al cerrar el modal, `useAutoSave` se reactivaba
- Al reactivarse, guardaba la sesión SIN el campo `gameEnded: true`
- HomeScreen detectaba sesión activa y mostraba el prompt

**Causa raíz:**
1. `useAutoSave` estaba vinculado a `!showFinalStatsModal`
2. Al cerrar el modal, `showFinalStatsModal` volvía a `false`
3. Esto reactivaba `useAutoSave` que sobrescribía la sesión
4. Además, `getSessionData()` no incluía el campo `gameEnded` en la interfaz

**Solución aplicada:**
1. **[useGameSession.ts:195](src/hooks/useGameSession.ts#L195)** - Añadido `gameEnded: false` por defecto en `getSessionData()`
2. **[GameScreenMultiplayer.tsx:75](src/screens/GameScreenMultiplayer.tsx#L75)** - Añadido estado `gameHasEnded` permanente
3. **[GameScreenMultiplayer.tsx:82](src/screens/GameScreenMultiplayer.tsx#L82)** - `useAutoSave` ahora usa `!gameHasEnded` en vez de `!showFinalStatsModal`
4. **[GameScreenMultiplayer.tsx:161](src/screens/GameScreenMultiplayer.tsx#L161)** - `handleFinishGame` marca `gameHasEnded = true` inmediatamente
5. Esta flag **NUNCA** vuelve a `false`, deshabilitando `useAutoSave` permanentemente

**Resultado:**
- ✅ Al finalizar partida, `useAutoSave` se deshabilita permanentemente
- ✅ La sesión se marca con `gameEnded: true` y NO se sobrescribe
- ✅ HomeScreen detecta `gameEnded: true` y NO muestra prompt
- ✅ Sesión finalizada se limpia automáticamente en HomeScreen

#### Archivos modificados:
1. `src/components/FinalStatsModal.tsx` - Fix de renderizado + limpieza de logs
2. `src/screens/GameScreenMultiplayer.tsx` - Fix de useAutoSave + limpieza de logs
3. `src/hooks/useGameSession.ts` - Añadido campo `gameEnded` a sesión

#### Proceso de debug:
- Añadidos logs de consola para rastrear flujo
- Debug visual con colores (rojo, verde, amarillo, magenta)
- Identificación de problema de flexbox en modalContainer
- Identificación de problema de reactivación de useAutoSave

#### Logs eliminados:
- ✅ Todos los `console.log` de debug removidos
- ✅ Colores de debug removidos
- ✅ Código limpio y listo para producción

#### Testing realizado:
- ✅ Modal de estadísticas finales se muestra correctamente
- ✅ Podio con 3 jugadores visible
- ✅ ScrollView funcional (destacados y resumen)
- ✅ Botones "Jugar de nuevo" y "Salir" funcionales
- ✅ NO aparece prompt "continuar partida" después de finalizar
- ✅ Flujo completo sin errores

#### Próximos pasos:
- Testing extensivo final
- Preparación para producción (Fase 9)

---

**Última actualización:** 2025-10-24
**Actualizado por:** Claude Code
**Próxima actualización:** Preparación para producción
