# 🎯 PLAN COMPLETO: YO NUNCA 2.0 - VERSIÓN MEJORADA

## 📋 RESUMEN EJECUTIVO

Transformación completa de la app "Yo Nunca" de un juego simple a una experiencia multijugador con sistema de categorías, estadísticas, modo competitivo y UX mejorada.

**Tiempo estimado total:** 12-16 horas de desarrollo
**Complejidad:** Alta (arquitectura nueva, muchas features interdependientes)
**Enfoque:** Iterativo por fases, testing continuo

---

## 🎨 DECISIONES DE DISEÑO CLAVE

### Tema Visual: "Taberna/Garito"
```typescript
// Nueva paleta de colores
Primario: #D4A574 (Dorado cerveza)
Secundario: #8B4513 (Marrón madera)
Acento: #FF6B35 (Naranja terracota/fuego)
Fondo oscuro: #2C1810 (Marrón oscuro taberna)
Fondo claro: #F4E4C1 (Beige cálido)
Text: #FFF5E1 (Beige claro)
```

### Sistema de Categorías (4 niveles)
1. **"CAGÓN"** - Botón troll (contador de clicks global, modal gracioso)
2. **Nivel Medio** (nombres rotatorios): "Tibio", "Hoy cojo el coche (Real)", "Mi primera vez...", "Virgen pero desesperado"
3. **Nivel Picante** (nombres rotatorios): "Picante", "Ardiente", "Cachond@ pero no tanto", "Mi primer paso para la borrachera"
4. **Nivel Muy Picante** (nombres rotatorios): "Soy un turbio", "Nah hoy de tranquis 😈", "Hoy cojo el coche (Mentira)", "El que perdona murió en la cruz", "Si ya sabes cómo me pongo para qué me invitáis"

### Modo Multijugador
- Por defecto: SIEMPRE multijugador
- Límite: 2-20 jugadores
- Nombres automáticos graciosos (borrachos famosos, animales aleatorios)
- Contadores individuales de tragos
- Todos juegan la misma frase simultáneamente

---

## 📐 ARQUITECTURA TÉCNICA

### Nuevos tipos TypeScript
```typescript
// types/index.ts
export type DifficultyLevel = 'cagon' | 'medio' | 'picante' | 'muy_picante';

export interface Player {
  id: string;
  name: string;
  drinks: number;
  avatar?: string; // emoji o icono
}

export interface GameSession {
  id: string;
  players: Player[];
  difficulty: DifficultyLevel;
  phrasesPlayed: number;
  currentPhraseIndex: number;
  createdAt: number;
  lastPlayedAt: number;
}

export interface GameStats {
  winner: Player;           // más tragos
  second: Player;
  third: Player;
  mostDiablo: Player;      // más tragos
  mostBendito: Player;     // menos tragos
  totalPhrases: number;
  duration: number;
}

export interface CagonCounter {
  count: number;
  lastUpdated: number;
}
```

### Nuevas pantallas
1. **CategorySelectionScreen** - Selección de categoría
2. **PlayerSetupScreen** - Configurar jugadores
3. **GameScreenMultiplayer** - Juego multijugador (reemplazo de GameScreen)
4. **StatsModal** - Estadísticas en tiempo real
5. **FinalStatsModal** - Estadísticas finales
6. **ResumeGameModal** - Continuar partida guardada

### Nuevos hooks
- `useGameSession()` - Gestión de sesión de juego
- `usePlayers()` - Gestión de jugadores
- `useStats()` - Cálculo de estadísticas
- `useAutoSave()` - Guardado automático

---

## 🔄 FLUJO DE NAVEGACIÓN NUEVO

```
HomeScreen
    ↓
CategorySelectionScreen (4 botones)
    ↓ (si "CAGÓN" → modal troll)
    ↓ (otras categorías)
PlayerSetupScreen
    ↓
GameScreenMultiplayer
    ↓ (botón finalizar)
FinalStatsModal
```

---

## 📝 IMPLEMENTACIÓN POR FASES

### **FASE A: Refactorización Base y Nuevos Tipos** (2-3 horas)

#### A.1 - Actualizar tipos TypeScript
- Crear nuevos interfaces (Player, GameSession, GameStats, etc.)
- Actualizar RootStackParamList con nuevas pantallas
- Añadir DifficultyLevel type

#### A.2 - Reorganizar frases por categoría
- Crear archivos separados:
  - `data/phrases/medioLevel.ts` (60 frases)
  - `data/phrases/picanteLevel.ts` (80 frases)
  - `data/phrases/muyPicanteLevel.ts` (100 frases)
- Eliminar distribución antigua

#### A.3 - Actualizar storage utilities
- Añadir `saveGameSession()`
- Añadir `getGameSession()`
- Añadir `clearGameSession()`
- Añadir `getCagonCounter()` / `incrementCagonCounter()`

#### A.4 - Crear nuevos colores
- Actualizar `constants/Colors.ts` con tema taberna
- Crear variante "Garito" (opción futura)

**Criterios de éxito:**
- ✅ Compilación sin errores TypeScript
- ✅ Nuevos archivos de frases creados
- ✅ Storage functions testeadas

---

### **FASE B: Sistema de Jugadores y Nombres Graciosos** (2 horas)

#### B.1 - Generador de nombres aleatorios
Crear `utils/funnyNames.ts`:
```typescript
const DRUNK_CELEBRITIES = [
  "Amy Winehouse", "Charles Bukowski", "Ernest Hemingway",
  "Diego Maradona", "Keith Richards", "Ozzy Osbourne",
  // ... más nombres
];

const FUNNY_ANIMALS = [
  "🐻 Oso borracho", "🦊 Zorro fiestero", "🐼 Panda pachanguero",
  // ... más animales
];

export function generateRandomName(): string;
export function generatePlayerList(count: number): Player[];
```

#### B.2 - Hook usePlayers
```typescript
export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>([]);

  const addPlayer = (name?: string) => { /* auto-generate if empty */ };
  const removePlayer = (id: string) => {};
  const incrementDrinks = (playerId: string) => {};
  const resetAllDrinks = () => {};

  return { players, addPlayer, removePlayer, incrementDrinks, resetAllDrinks };
}
```

#### B.3 - PlayerSetupScreen
- Input de número de jugadores (2-20)
- Lista de jugadores con nombres autogenerados
- Botón para cambiar nombre manualmente
- Botón "Comenzar juego"

**Criterios de éxito:**
- ✅ Nombres graciosos se generan aleatoriamente
- ✅ Pantalla permite añadir/eliminar jugadores
- ✅ Navegación a GameScreen con players

---

### **FASE C: CategorySelectionScreen y Modal Cagón** (1.5 horas)

#### C.1 - CategorySelectionScreen
- 4 botones grandes estilo cards
- Botón "CAGÓN" con icono 🐔
- Otros 3 botones con nombres rotatorios (random al abrir)
- Animación fade suave al entrar

#### C.2 - Modal "CAGÓN" (troll)
```typescript
// Frases graciosas rotatorias:
const CAGON_PHRASES = [
  "¿En serio? ¿Eres tan cagón? 🐔",
  "Esta categoría es para bebés con pañales 👶",
  "Tu madre juega más fuerte que tú 😂",
  "Vuelve cuando crezcas un par 🥚🥚",
  // ... más frases
];
```
- Mostrar contador de clicks (AsyncStorage)
- Botón "Entendido, lo siento 😔" (cierra modal)

#### C.3 - Implementar rotación de nombres
- useEffect al montar CategorySelectionScreen
- Seleccionar nombres random de arrays

**Criterios de éxito:**
- ✅ Modal cagón funciona y guarda contador
- ✅ Nombres rotan aleatoriamente cada vez
- ✅ Navegación fluida a PlayerSetup

---

### **FASE D: GameScreenMultiplayer - Juego Nuevo** (3-4 horas)

#### D.1 - Nuevo componente GameScreenMultiplayer
Reemplaza completamente el GameScreen actual.

**Layout:**
```
┌─────────────────────────────┐
│ [← Atrás]     [🏆 Stats] [⚙️]│ (header integrado sin borde)
├─────────────────────────────┤
│                             │
│   [Tarjeta con frase]       │
│   "Yo nunca he..."          │
│                             │
│   Quedan X frases           │
│                             │
├─────────────────────────────┤
│ Lista de jugadores:         │
│ 🎭 Juan: 5 🍺 [+]          │
│ 🐼 María: 3 🍺 [+]         │
│ 🦊 Pedro: 7 🍺 [+]         │
├─────────────────────────────┤
│     [Siguiente Frase]       │
│     [Finalizar Partida]     │
└─────────────────────────────┘
```

#### D.2 - Sistema de mensajes graciosos cada X rondas
```typescript
const FUNNY_MESSAGES = [
  (player) => `${player.name} es un descarado, lleva ${player.drinks} tragos 😈`,
  (player) => `Cuidado con ${player.name}, esta noche folla con la almohada 🛏️`,
  (player) => `${player.name} va a despertar con resaca nivel Dios ☠️`,
  // ... más mensajes
];

// Mostrar cada 5 frases (configurable)
if (phrasesPlayed % 5 === 0) {
  showFunnyMessage(randomPlayer, 2000); // 2 segundos
}
```

#### D.3 - Botón [+] para incrementar tragos
- Cada jugador tiene botón [+] junto a su contador
- Incrementa su contador de drinks
- Animación suave al incrementar

#### D.4 - Botón "Siguiente frase"
- Avanza a siguiente frase sin repetir
- Actualiza contador de frases jugadas
- Trigger para mensaje gracioso si aplica

#### D.5 - Botón "Finalizar partida"
- Alert de confirmación
- Calcula estadísticas finales
- Navega a FinalStatsModal

**Criterios de éxito:**
- ✅ Juego multijugador funcional
- ✅ Mensajes graciosos aparecen cada 5 rondas
- ✅ Contadores se actualizan correctamente
- ✅ Header integrado sin bordes visibles

---

### **FASE E: Estadísticas en Tiempo Real** (1.5 horas)

#### E.1 - StatsModal (botón 🏆)
Modal que muestra durante la partida:
```
┌──────────────────────────┐
│  Estadísticas Actuales   │
├──────────────────────────┤
│ Frases jugadas: 12/80    │
│                          │
│ 🥇 Pedro: 7 tragos       │
│ 🥈 Juan: 5 tragos        │
│ 🥉 María: 3 tragos       │
│                          │
│ 😈 Más diablo: Pedro     │
│ 😇 Más bendito: María    │
│                          │
│     [Cerrar]             │
└──────────────────────────┘
```

#### E.2 - Hook useStats
```typescript
export function useStats(players: Player[]) {
  const getRanking = () => {
    return players.sort((a, b) => b.drinks - a.drinks);
  };

  const getMostDiablo = () => ranking[0];
  const getMostBendito = () => ranking[ranking.length - 1];

  return { ranking, getMostDiablo, getMostBendito };
}
```

**Criterios de éxito:**
- ✅ Modal se abre/cierra correctamente
- ✅ Estadísticas actualizadas en tiempo real
- ✅ Diseño limpio y legible

---

### **FASE F: Estadísticas Finales (Modal Campeonato)** (2 horas)

#### F.1 - FinalStatsModal
Modal grande estilo "podio" con animaciones:

```
┌────────────────────────────┐
│    🏆 FIN DE LA PARTIDA    │
├────────────────────────────┤
│        🥈               │
│       Juan              │
│     5 tragos            │
│                         │
│  🥇           🥉        │
│ Pedro        María      │
│ 7 tragos    3 tragos    │
├────────────────────────────┤
│ 😈 Más diablo: Pedro (7)   │
│ 😇 Más bendito: María (3)  │
│ 🎭 Más misterioso: [TBD]   │
│ 🔥 Más ardiente: [TBD]     │
├────────────────────────────┤
│ Total frases: 80           │
│ Duración: 45 min           │
├────────────────────────────┤
│  [Jugar de nuevo] [Salir]  │
└────────────────────────────┘
```

#### F.2 - Estadísticas adicionales
- "Más misterioso": jugador con menos incrementos pero tragos moderados
- "Más ardiente": jugador con más incrementos seguidos
- "Víctima del juego": más tragos en menos frases

#### F.3 - Botones finales
- "Jugar de nuevo" → resetea y vuelve a CategorySelection
- "Salir" → vuelve a HomeScreen y limpia sesión

**Criterios de éxito:**
- ✅ Modal se ve como "campeonato"
- ✅ Animaciones suaves al aparecer
- ✅ Todas las estadísticas calculadas correctamente

---

### **FASE G: Guardado Automático y Recuperación** (1.5 horas)

#### G.1 - Hook useAutoSave
```typescript
export function useAutoSave(gameSession: GameSession) {
  useEffect(() => {
    const interval = setInterval(() => {
      saveGameSession(gameSession);
    }, 10000); // cada 10 segundos

    return () => clearInterval(interval);
  }, [gameSession]);
}
```

#### G.2 - ResumeGameModal
Modal al abrir app (en HomeScreen):
```
┌────────────────────────────┐
│ Tienes una partida en curso│
├────────────────────────────┤
│ Jugadores:                 │
│ • Juan: 5 tragos           │
│ • María: 3 tragos          │
│ • Pedro: 7 tragos          │
│                            │
│ Frases jugadas: 12/80      │
│ Categoría: Descarado       │
├────────────────────────────┤
│ [Continuar] [Nueva partida]│
└────────────────────────────┘
```

#### G.3 - Lógica de recuperación
- En HomeScreen useEffect, verificar si existe gameSession guardada
- Si existe y tiene < 24h, mostrar modal
- "Continuar" → navega directo a GameScreen con estado restaurado
- "Nueva partida" → limpia AsyncStorage y continúa normal

**Criterios de éxito:**
- ✅ Partida se guarda cada 10 segundos
- ✅ Al reabrir app, detecta partida guardada
- ✅ Puede continuar desde donde lo dejó

---

### **FASE H: Animaciones y Polish Visual** (2 horas)

#### H.1 - Animaciones con react-native-reanimated
```bash
npx expo install react-native-reanimated
```

#### H.2 - Animaciones implementadas
- **Fade al cambiar frase** (GameScreen)
- **Slide in** para CategorySelectionScreen
- **Scale bounce** al incrementar tragos
- **Fade in/out** para mensajes graciosos
- **Confetti** al finalizar (opcional, librería react-native-confetti-cannon)

#### H.3 - Mejorar PhraseCard
- Gradiente de fondo según categoría
- Sombra más pronunciada
- Border animado (glow)

#### H.4 - Splash screen mejorado
- Logo "🍻 Yo Nunca" centrado
- Fondo con tema taberna
- Fade out al cargar

**Criterios de éxito:**
- ✅ Animaciones fluidas sin lag
- ✅ Transiciones suaves entre pantallas
- ✅ UX se siente "premium"

---

### **FASE I: Optimización y Testing Final** (1.5 horas)

#### I.1 - Performance
- Implementar React.memo en componentes pesados
- useCallback para funciones pasadas como props
- useMemo para cálculos complejos (stats)

#### I.2 - Manejo de errores mejorado
- Try/catch en todas las operaciones AsyncStorage
- Error boundaries para pantallas críticas
- Mensajes de error user-friendly

#### I.3 - Feedback mejorado
- Toasts para acciones exitosas
- Loading states en todos los botones
- Skeleton loaders donde aplique

#### I.4 - Testing exhaustivo
- Jugar partida completa con 10 jugadores
- Probar guardado/recuperación
- Probar con 2 jugadores y con 20
- Agotar todas las frases de una categoría
- Verificar modal cagón
- Verificar estadísticas finales

#### I.5 - Seguridad
- Sanitizar nombres de jugadores (max length, no scripts)
- Validar datos de AsyncStorage antes de parsear
- Rate limiting en incremento de tragos (anti-spam)

**Criterios de éxito:**
- ✅ App sin crashes ni bugs conocidos
- ✅ Performance fluida en emulador y dispositivo
- ✅ Todos los edge cases manejados

---

### **FASE J: Frases Adicionales** (2-3 horas)

#### J.1 - Escribir nuevas frases por categoría
**Medio (60 frases totales, faltan ~35):**
- Suaves pero graciosas
- Experiencias comunes
- Ligero toque sexual/alcohol

**Picante (80 frases totales, faltan ~40):**
- Experiencias más atrevidas
- Contenido sexual moderado
- Situaciones vergonzosas

**Muy Picante (100 frases totales, faltan ~50):**
- Contenido sexual explícito
- Situaciones extremas/turbias
- Sin filtros

#### J.2 - Validación de frases
- Revisar ortografía
- Verificar que no se repitan conceptos
- Asegurar variedad de temas

**Criterios de éxito:**
- ✅ 240 frases totales (60+80+100)
- ✅ Frases variadas y divertidas
- ✅ Sin repeticiones conceptuales

---

## 🗂️ ESTRUCTURA DE ARCHIVOS FINAL

```
yo-nunca/
├── src/
│   ├── screens/
│   │   ├── HomeScreen.tsx (modificada)
│   │   ├── CategorySelectionScreen.tsx (NUEVA)
│   │   ├── PlayerSetupScreen.tsx (NUEVA)
│   │   ├── GameScreenMultiplayer.tsx (NUEVA, reemplaza GameScreen)
│   │   ├── CustomPhrasesScreen.tsx (existente)
│   │   └── SettingsScreen.tsx (modificada)
│   ├── components/
│   │   ├── CustomButton.tsx (existente)
│   │   ├── PhraseCard.tsx (mejorada)
│   │   ├── PlayerListItem.tsx (NUEVA)
│   │   ├── StatsModal.tsx (NUEVA)
│   │   ├── FinalStatsModal.tsx (NUEVA)
│   │   ├── ResumeGameModal.tsx (NUEVA)
│   │   ├── CagonModal.tsx (NUEVA)
│   │   └── FunnyMessageToast.tsx (NUEVA)
│   ├── hooks/
│   │   ├── usePhrases.ts (modificado)
│   │   ├── usePlayers.ts (NUEVO)
│   │   ├── useGameSession.ts (NUEVO)
│   │   ├── useStats.ts (NUEVO)
│   │   └── useAutoSave.ts (NUEVO)
│   ├── data/
│   │   ├── phrases/
│   │   │   ├── medioLevel.ts (NUEVO)
│   │   │   ├── picanteLevel.ts (NUEVO)
│   │   │   └── muyPicanteLevel.ts (NUEVO)
│   │   ├── funnyNames.ts (NUEVO)
│   │   ├── funnyMessages.ts (NUEVO)
│   │   └── cagonPhrases.ts (NUEVO)
│   ├── utils/
│   │   ├── storage.ts (ampliado)
│   │   └── animations.ts (NUEVO)
│   ├── constants/
│   │   └── Colors.ts (reemplazado tema taberna)
│   └── types/
│       └── index.ts (ampliado)
```

---

## ⚠️ RIESGOS Y CONSIDERACIONES

### Riesgos técnicos:
1. **Complejidad de guardado automático** - Puede causar bugs si no se maneja bien el estado
   - Mitigación: Testing exhaustivo, validaciones estrictas
2. **Performance con 20 jugadores** - Muchos re-renders
   - Mitigación: React.memo, useCallback, useMemo
3. **Animaciones pueden causar lag** - Especialmente en dispositivos viejos
   - Mitigación: Usar nativeDriver siempre que sea posible

### Riesgos de UX:
1. **Modo multijugador obligatorio puede alienar usuarios solitarios**
   - Mitigación: Permitir 1 jugador como excepción
2. **Demasiadas pantallas puede confundir**
   - Mitigación: Flujo lineal claro, navegación intuitiva

### Dependencias nuevas:
```json
{
  "react-native-reanimated": "^3.x", // Animaciones
  "react-native-confetti-cannon": "^1.x" // Confetti (opcional)
}
```

---

## 🧪 ESTRATEGIA DE TESTING

1. **Testing por fase** - Probar cada fase antes de continuar
2. **Testing de integración** - Al terminar Fase I, probar flujo completo
3. **Testing en dispositivo real** - Fundamental para performance
4. **Edge cases a probar:**
   - 1 jugador
   - 20 jugadores
   - Agotar todas las frases
   - Cerrar app en medio de partida
   - Abrir app múltiples veces seguidas
   - Nombres muy largos
   - Spam en botón [+]

---

## 📊 ORDEN DE EJECUCIÓN RECOMENDADO

**Sesión 1 (4-5 horas):**
- Fase A: Refactorización base
- Fase B: Sistema de jugadores
- Fase C: CategorySelection

**Sesión 2 (4-5 horas):**
- Fase D: GameScreenMultiplayer (la más compleja)

**Sesión 3 (3-4 horas):**
- Fase E: Stats en tiempo real
- Fase F: Stats finales
- Fase G: Guardado automático

**Sesión 4 (3-4 horas):**
- Fase H: Animaciones y polish
- Fase I: Optimización y testing
- Fase J: Frases adicionales

---

## ✅ CHECKLIST DE COMPLETITUD

Al final, la app debe tener:
- ✅ 4 categorías funcionales (incluido troll de Cagón)
- ✅ Modo multijugador 2-20 jugadores
- ✅ Nombres automáticos graciosos
- ✅ Contador de tragos individual
- ✅ Mensajes graciosos cada 5 rondas
- ✅ Estadísticas en tiempo real (modal 🏆)
- ✅ Estadísticas finales tipo campeonato
- ✅ Guardado automático de partida
- ✅ Modal de recuperación al reabrir
- ✅ Animaciones suaves
- ✅ Tema visual taberna/garito
- ✅ 240 frases totales (60+80+100)
- ✅ Performance optimizada
- ✅ Sin bugs críticos

---

**Fecha de creación:** 2025-10-22
**Versión:** 2.0
**Estado:** Aprobado y listo para implementación
