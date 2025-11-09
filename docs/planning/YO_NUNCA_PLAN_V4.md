# 🎮 YO NUNCA - PLAN V4.0
## NUEVOS JUEGOS: "EL REY DE COPAS" 🃏 Y "LA BOTELLA" 🍾

**Fecha de creación:** 2025-10-26
**Versión:** 4.0
**Estado base:** V3.0 Production-Ready

---

## 📊 ESTADO ACTUAL DEL PROYECTO

### ✅ **V3.0 Completado:**
- ✅ Modo Normal (clásico Yo Nunca)
- ✅ Modo Detectives (con votación)
- ✅ Multiplayer Local TCP (WiFi - Development Build)
- ✅ **377 frases refactorizadas:**
  - Medio: 110 frases
  - Picante: 111 frases
  - Muy Picante: 156 frases
- ✅ Frases personalizadas con filtro
- ✅ Sistema de rachas 🔥 (alertas + badges visuales)
- ✅ Vibración háptica (con toggle en Settings)
- ✅ Age Gate (18+)
- ✅ Políticas legales V3.0
- ✅ Rate limiting anti-spam
- ✅ Estadísticas globales
- ✅ Responsive design
- ✅ Dual environment (Dev Build + Expo Go)

### 📝 **Cambios Recientes:**
- ❌ **Límite de tragos:** Implementado pero eliminado por decisión de diseño
  - Razón: "No tiene sentido limitar algo que ocurre fuera de la app"

---mantiene)

---

## 🃏 JUEGO 1: "EL REY DE COPAS" (Prioridad 1)

### 📋 **Descripción:**
Juego de cartas basado en la baraja española donde cada carta tiene un efecto único. Similar a "Kings Cup" pero con mecánicas propias.

### 🎴 **Baraja:**
- **Total:** 50 cartas
  - 48 cartas de baraja española (12 cartas × 4 palos)
  - 2 Jokers/Comodines

### 📊 **Distribución de Efectos:**

| Carta | Cantidad | Efecto | Descripción |
|-------|----------|--------|-------------|
| **1** | 4 cartas | Repartir 1 trago | El jugador reparte 1 trago a quien quiera |
| **2** | 4 cartas | Repartir 2 tragos | El jugador reparte 2 tragos (puede dividir) |
| **3** | 4 cartas | Repartir 3 tragos | El jugador reparte 3 tragos (puede dividir) |
| **4** | 4 cartas | Repartir 4 tragos | El jugador reparte 4 tragos (puede dividir) |
| **5** | 4 cartas | Repartir 5 tragos | El jugador reparte 5 tragos (puede dividir) |
| **6** | 4 cartas | Yo Nunca | Se muestra frase aleatoria del banco |
| **7** | 4 cartas | Verdad o Reto | El jugador elige, se muestra pregunta/reto aleatorio |
| **8** | 4 cartas | Tú bebes | El jugador que sacó la carta bebe 1 trago |
| **9** | 4 cartas | Todos beben | **PROGRESIVO:** 1er 9 = 1 trago, 2do = 2, 3er = 3, 4to = 4 |
| **Sota** | 4 cartas | Categorías | Se elige categoría, todos dicen ejemplos, quien falla bebe |
| **Caballo** | 4 cartas | No mirar a los ojos | No puedes mirar a nadie a los ojos hasta próximo Caballo |
| **Rey** | 4 cartas | Cascada | Bebida en cadena - el primero puede parar cuando quiera |
| **Joker** | 2 cartas | El Payaso hace de las suyas | Se activa regla especial - **SE ACUMULAN** |

### 🎭 **Palos (Oros, Copas, Espadas, Bastos):**
- Solo efecto **estético/visual**
- No modifican la mecánica de las cartas

### 🤡 **Reglas del Joker (30 reglas totales):**

#### **REGLAS VERBALES (10):**
1. "Prohibido decir nombres propios" - Quien diga un nombre, bebe
2. "Prohibido decir números" - Quien diga un número, bebe
3. "Prohibido usar determinantes (el, la, los, las, un, una...)" - Bebe si lo dices
4. "Prohibido decir 'yo'" - Sustituir por "este servidor" o tu nombre
5. "Prohibido decir palabras que empiecen por 'S'" - Bebe si fallas
6. "Prohibido decir 'sí' o 'no'" - Solo asentir/negar con la cabeza
7. "Prohibido decir palabrotas" - Quien maldiga, bebe
8. "Hablar en tercera persona" - "Pepito quiere agua" en vez de "Quiero agua"
9. "Prohibido hacer preguntas" - Solo afirmaciones, beber si preguntas
10. "Terminar cada frase con 'en la cama'" - Bebe si olvidas

#### **REGLAS DE GESTOS (8):**
11. "Mano en la cabeza al beber" - Quien olvide, bebe doble
12. "Aplaudir antes de beber" - Quien olvide, bebe doble
13. "Beber con la mano no dominante" - (zurdos con derecha, diestros con izquierda)
14. "Guiñar un ojo al terminar de hablar" - Bebe si olvidas
15. "Hacer un saludo militar antes de beber" - Quien olvide, trago extra
16. "Levantarse al beber" - Beber sentado = 2 tragos
17. "Pulgar en la frente al hablar" - Como un saludo indio
18. "Brindar antes de cada trago" - Aunque bebas solo

#### **REGLAS DE INTERACCIÓN (7):**
19. "Mirar hacia arriba al reírte" - Bebe si te ríes mirando adelante
20. "Señalar a alguien antes de hablar" - Bebe si hablas sin señalar
21. "Pedir permiso al Payaso para ir al baño" - Bebe si vas sin permiso
22. "Último en tocar la mesa cuando alguien dice 'suelo'" - Último bebe
23. "Copiar el gesto del anterior" - Si alguien se rasca, tú también
24. "Prohibido cruzar las piernas" - Quien cruce, bebe
25. "Hablar solo al jugador de tu derecha" - Ignorar al resto

#### **REGLAS ABSURDAS/DIVERTIDAS (5):**
26. "Hablar como pirata" - "¡Arrr! Este marinero quiere ron"
27. "Usar acento extranjero al hablar" - Francés, italiano, ruso...
28. "Cantar en vez de hablar" - Todas tus frases cantadas
29. "Hablar en susurros" - Quien hable alto, bebe
30. "Inventar un apodo para cada persona" - Usar solo apodos, nada de nombres

**IMPORTANTE:** Las reglas se **ACUMULAN**. Pueden haber hasta 2 reglas activas simultáneamente.

### 📚 **Categorías (Sota) - 40 categorías:**

#### **Cultura General (10):**
1. Países de Europa
2. Capitales del mundo
3. Ríos de España
4. Islas famosas
5. Monumentos históricos
6. Premios Nobel
7. Planetas del sistema solar
8. Mares y océanos
9. Montañas famosas
10. Continentes y subcontinentes

#### **Entretenimiento (10):**
11. Películas de Disney
12. Series de Netflix
13. Personajes de Marvel
14. Películas de terror
15. Actores españoles
16. Cantantes latinos
17. Grupos de música rock
18. Películas ganadoras de Oscar
19. Videojuegos famosos
20. Programas de TV españoles

#### **Marcas y Productos (10):**
21. Marcas de coches
22. Marcas de ropa deportiva
23. Redes sociales
24. Marcas de refrescos
25. Compañías de tecnología
26. Marcas de cerveza
27. Cadenas de comida rápida
28. Aerolíneas
29. Marcas de móviles
30. Tiendas de ropa

#### **Comida y Bebida (5):**
31. Frutas tropicales
32. Tipos de queso
33. Platos italianos
34. Cócteles con alcohol
35. Tipos de pasta

#### **Miscelánea (5):**
36. Deportes olímpicos
37. Instrumentos musicales
38. Profesiones
39. Animales marinos
40. Colores en inglés

### 🎲 **Verdades y Retos (carta 7):**
**Formato:** Todas mezcladas aleatoriamente (sin niveles de intensidad)

**Cantidad sugerida:**
- 30 Verdades (variadas en intensidad)
- 30 Retos (variados en intensidad)
- **Total:** 60 preguntas/retos

**Nota:** Reutilizar parte del banco existente de "Modo Detectives" y añadir nuevas.

---

## 🍾 JUEGO 2: "LA BOTELLA" (Prioridad 2)

### 📋 **Descripción:**
Versión digital del clásico juego de la botella con dos características únicas:
1. Elección entre **Beso** o **Prueba**
2. **Sistema de escalado** - Si toca la misma pareja múltiples veces, aumenta la intensidad

### 🎯 **Mecánica:**

#### **Flujo del juego:**
1. Jugadores se colocan en círculo virtual (lista de jugadores)
2. Se pulsa "Girar botella" → Animación 2D de botella rotando
3. La botella apunta a 2 jugadores (quien giró + víctima aleatoria)
4. Se muestra: **Nivel actual** + opción de elegir **"Beso"** o **"Prueba"**
5. Se ejecuta la acción elegida
6. Se registra la pareja + nivel alcanzado

#### **Tracking de parejas:**
- La app recuerda qué parejas han salido juntas
- Cada vez que sale la misma pareja → **sube 1 nivel**
- Cada pareja tiene su propio nivel independiente

### 💋 **Niveles de Besos (5 niveles):**

| Nivel | Nombre | Descripción |
|-------|--------|-------------|
| 1 | Beso en la mejilla | Suave y amigable |
| 2 | Beso en la comisura | Un poco más atrevido |
| 3 | Pico | Beso rápido en los labios |
| 4 | Morreo | Beso más largo |
| 5 | Lío | Beso intenso y prolongado |

### 🎭 **Niveles de Pruebas (5 niveles):**

**Nivel 1 - Suave:**
- Dar un cumplido sincero
- Bailar juntos 10 segundos
- Hacer 5 flexiones
- Contar un chiste
- Cantar 10 segundos

**Nivel 2 - Media:**
- Hablar en acento extranjero durante 1 minuto
- Hacer 10 abdominales
- Imitar a alguien del grupo
- Contar una anécdota vergonzosa
- Intercambiar una prenda de ropa (bufanda, gorra...)

**Nivel 3 - Picante:**
- Masaje de hombros 30 segundos
- Baile sensual 20 segundos
- Confesar tu crush del grupo
- Sentarte en el regazo del otro 30 segundos
- Dar de comer algo a la otra persona

**Nivel 4 - Muy Picante:**
- Quitarte una prenda de ropa (calcetines, camiseta...)
- Bailar pegados 30 segundos
- Masaje en las piernas
- Decir 3 cosas que te gustan físicamente del otro
- Chupito del ombligo del otro

**Nivel 5 - Extremo:**
- Minuto en el armario/habitación a solas
- Striptease de 30 segundos
- Body shot (chupito del cuerpo)
- 7 minutos en el cielo
- Ducha juntos (broma, pero se puede incluir para risas)

**Nota:** Banco total de ~25-30 pruebas mezcladas por nivel.

### 🎨 **Animación de la Botella:**
- **Tipo:** Animación 2D simple
- **Mecánica:** Rotación suave con easing
- **Duración:** 2-3 segundos de giro
- **Resultado:** Apunta a un jugador aleatorio (excluye al que giró)

---

## 📅 PLAN DE IMPLEMENTACIÓN DETALLADO

### **FASE A: El Rey de Copas - Estructura Base (3 horas)**

#### **A.1 - Tipos TypeScript (45 min)**
**Archivo:** `src/types/cardGame.ts`

```typescript
export type CardValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 'sota' | 'caballo' | 'rey' | 'joker';
export type CardSuit = 'oros' | 'copas' | 'espadas' | 'bastos' | 'joker';

export interface Card {
  id: string;
  value: CardValue;
  suit: CardSuit;
  effect: CardEffect;
}

export type CardEffect =
  | 'distribute_drinks'
  | 'yo_nunca'
  | 'truth_or_dare'
  | 'you_drink'
  | 'everyone_drinks'
  | 'categories'
  | 'no_eye_contact'
  | 'waterfall'
  | 'joker_rule';

export interface JokerRule {
  id: string;
  description: string;
  penalty: string;
  category: 'verbal' | 'gesture' | 'interaction' | 'absurd';
}

export interface CardGameState {
  deck: Card[];
  usedCards: Card[];
  currentCard: Card | null;
  activeRules: JokerRule[];
  everyoneDrinksCount: number; // Contador para el 9 progresivo (0-3)
  noEyeContactActive: boolean;
  players: Player[]; // Reutilizar de tipos existentes
}

export interface Category {
  id: string;
  name: string;
  examples: string[];
}
```

#### **A.2 - Lógica del Mazo (1h)**
**Archivo:** `src/hooks/useCardGame.ts`

Funciones a implementar:
- `createDeck()` - Genera las 50 cartas
- `shuffleDeck()` - Baraja aleatoriamente
- `drawCard()` - Roba una carta del mazo
- `resetDeck()` - Reinicia el mazo cuando se acaba
- `applyCardEffect()` - Ejecuta el efecto de cada carta
- `addJokerRule()` - Añade regla del Joker (acumulable)
- `removeJokerRule()` - Elimina regla cuando sale otro Joker (si hay 2)
- `incrementEveryoneDrinks()` - Incrementa contador del 9

#### **A.3 - Pantalla Base (1h 15min)**
**Archivo:** `src/screens/CardGameScreen.tsx`

Estructura:
```
┌─────────────────────────────────────┐
│      🃏 EL REY DE COPAS 🍺         │
├─────────────────────────────────────┤
│                                     │
│   Quedan: 42 cartas                 │
│                                     │
│   ┌─────────────────┐               │
│   │                 │               │
│   │   [CARTA 5♦]    │               │
│   │                 │               │
│   │  Reparte 5      │               │
│   │   tragos        │               │
│   │                 │               │
│   └─────────────────┘               │
│                                     │
│   [Robar Carta]                     │
│                                     │
├─────────────────────────────────────┤
│ ⚠️ Reglas Activas:                  │
│ • Prohibido decir "yo"              │
│ • Mano en la cabeza al beber        │
├─────────────────────────────────────┤
│ 🚫 No mirar a los ojos a:           │
│ • Juan                              │
│ • María                             │
└─────────────────────────────────────┘
```

---

### **FASE B: Bancos de Contenido (2 horas)**

#### **B.1 - Categorías (30 min)**
**Archivo:** `src/data/cardGame/categories.ts`

- Crear 40 categorías completas
- Cada categoría con 15-20 ejemplos (para validación opcional)
- Exportar como array de objetos `Category[]`

#### **B.2 - Reglas del Joker (45 min)**
**Archivo:** `src/data/cardGame/jokerRules.ts`

- Crear las 30 reglas especificadas
- Organizadas por categoría (verbal, gesture, interaction, absurd)
- Exportar como array de objetos `JokerRule[]`

#### **B.3 - Verdades y Retos (45 min)**
**Archivo:** `src/data/cardGame/truthsAndDares.ts`

- Crear 30 verdades variadas
- Crear 30 retos variados
- Mezclar intensidades (suave, medio, picante)
- Exportar como dos arrays: `truths[]` y `dares[]`

---

### **FASE C: Efectos de Cartas (3 horas)**

#### **C.1 - Cartas 1-5: Repartir Tragos (20 min)**
**Componente:** `src/components/cardGame/DistributeDrinksModal.tsx`

- Modal que muestra: "Reparte X tragos"
- Lista de jugadores con botones +/- para asignar tragos
- Validación: total de tragos = valor de carta
- Botón "Confirmar" para cerrar

#### **C.2 - Carta 6: Yo Nunca (15 min)**
**Reutilizar:** Lógica existente de `GameScreenMultiplayer`

- Mostrar frase aleatoria del banco actual
- Jugadores se marcan si lo han hecho (manual)
- Botón "Continuar"

#### **C.3 - Carta 7: Verdad o Reto (25 min)**
**Componente:** `src/components/cardGame/TruthOrDareModal.tsx`

- Botones "Verdad" o "Reto"
- Mostrar pregunta/reto aleatorio del banco
- Checkbox "¿Lo cumplió?" (opcional)
- Botón "Continuar"

#### **C.4 - Carta 8: Tú Bebes (10 min)**
**Simple:** Alert o modal breve

- "¡Tú bebes! 🍺"
- Nombre del jugador que sacó la carta
- Auto-cierra después de 2 segundos

#### **C.5 - Carta 9: Todos Beben (Progresivo) (25 min)**
**Componente:** `src/components/cardGame/EveryoneDrinksModal.tsx`

- Detectar cuántos 9 han salido (everyoneDrinksCount)
- Mostrar: "¡TODOS BEBEN! 🍻"
- Subtítulo: "Este es el 9 número X - Todos beben X tragos"
- Animación especial si es el 4to (último)
- Botón "¡Salud!"

#### **C.6 - Carta Sota: Categorías (30 min)**
**Componente:** `src/components/cardGame/CategoryGameModal.tsx`

- Mostrar categoría aleatoria
- Instrucciones: "Por turnos, decid ejemplos. Quien repita o no sepa, bebe"
- Lista de jugadores para marcar quién falló (opcional)
- Botón "Finalizar ronda"

#### **C.7 - Carta Caballo: No Mirar a los Ojos (20 min)**
**Estado global:** `noEyeContactActive` + lista de jugadores afectados

- Si no hay ninguno activo: Activar para el jugador que sacó la carta
- Si ya hay activo: Liberar al jugador anterior, activar para el nuevo
- Mostrar permanentemente en pantalla: "🚫 No mirar a los ojos a: [Nombre]"
- Alert: "¡No puedes mirar a nadie a los ojos hasta que salga otro Caballo!"

#### **C.8 - Carta Rey: Cascada (30 min)**
**Componente:** `src/components/cardGame/WaterfallModal.tsx`

- Instrucciones claras: "El jugador que sacó la carta empieza a beber"
- Lista de jugadores en orden (sentido agujas del reloj)
- Indicador visual: "Jugador X está bebiendo..."
- Cada jugador se activa cuando el anterior empieza
- El primero puede parar cuando quiera
- Los demás solo pueden parar cuando pare el anterior
- Botón "Finalizar cascada"

#### **C.9 - Carta Joker: Regla del Payaso (35 min)**
**Componente:** `src/components/cardGame/JokerRuleModal.tsx`

- Mostrar regla aleatoria del banco
- Descripción completa + penalización
- Si ya hay 2 reglas activas: Mostrar las 2 actuales y preguntar cuál eliminar
- Agregar a `activeRules[]` (máximo 2)
- Mostrar permanentemente en sección "Reglas Activas"
- Animación especial de "payaso" o emoji 🤡

---

### **FASE D: La Botella - Completa (5 horas)**

#### **D.1 - Pantalla y Animación (1h 30min)**
**Archivo:** `src/screens/BottleGameScreen.tsx`
**Componente:** `src/components/bottle/BottleSpinner.tsx`

Estructura:
```
┌─────────────────────────────────────┐
│       🍾 LA BOTELLA 🔥             │
├─────────────────────────────────────┤
│                                     │
│   Turno de: Ana                     │
│                                     │
│      ┌───────────┐                  │
│      │           │                  │
│      │  [BOTELLA]│ ← Animación 2D   │
│      │  girando  │                  │
│      │           │                  │
│      └───────────┘                  │
│                                     │
│   👤 Ana  →  Luis 👤               │
│                                     │
│   Veces juntos: 3                   │
│   Nivel actual: PICO 💋             │
│                                     │
│   ┌─────────┐  ┌─────────┐         │
│   │  BESO   │  │ PRUEBA  │         │
│   └─────────┘  └─────────┘         │
│                                     │
│   [Siguiente]                       │
└─────────────────────────────────────┘
```

**Animación:**
- Imagen/SVG de botella en el centro
- Rotación animada con `Animated.timing()`
- Easing suave (2-3 segundos)
- Al finalizar, apunta a jugador aleatorio

#### **D.2 - Lógica del Juego (1h)**
**Archivo:** `src/hooks/useBottleGame.ts`

Funciones:
- `spinBottle()` - Anima botella y elige jugador aleatorio
- `getPairHistory()` - Obtiene historial de pareja específica
- `incrementPairLevel()` - Sube nivel de pareja
- `getCurrentLevel()` - Obtiene nivel actual de pareja
- `resetGame()` - Reinicia todos los niveles

**Estado:**
```typescript
interface BottleGameState {
  players: Player[];
  currentSpinner: string; // ID del jugador que gira
  targetPlayer: string | null; // ID del jugador objetivo
  isSpinning: boolean;
  pairHistory: Map<string, PairData>; // Key: "player1_player2"
}

interface PairData {
  player1Id: string;
  player2Id: string;
  level: number; // 1-5
  timesMatched: number;
}
```

#### **D.3 - Banco de Pruebas (1h)**
**Archivo:** `src/data/bottle/dares.ts`

**Estructura:**
```typescript
interface BottleDare {
  id: string;
  level: 1 | 2 | 3 | 4 | 5;
  description: string;
  type: 'physical' | 'verbal' | 'intimate';
}
```

**Cantidad por nivel:**
- Nivel 1: 8 pruebas suaves
- Nivel 2: 8 pruebas medias
- Nivel 3: 8 pruebas picantes
- Nivel 4: 8 pruebas muy picantes
- Nivel 5: 8 pruebas extremas

**Total:** 40 pruebas

**Tipos:**
- **Physical:** Flexiones, abdominales, bailar, etc.
- **Verbal:** Contar anécdota, chiste, confesar, etc.
- **Intimate:** Masajes, sentarse juntos, intercambiar ropa, etc.

#### **D.4 - Modales de Beso/Prueba (1h)**
**Componentes:**
- `src/components/bottle/KissModal.tsx`
- `src/components/bottle/DareModal.tsx`

**KissModal:**
- Muestra nombre del beso según nivel
- Descripción breve
- Emoji visual 💋
- Botón "¡Hecho!"

**DareModal:**
- Muestra prueba aleatoria del nivel actual
- Descripción completa
- Timer opcional (para pruebas con tiempo)
- Checkbox "¿Lo cumplió?" (opcional)
- Botón "Continuar"

#### **D.5 - UI de Escalado (30 min)**
**Componente:** `src/components/bottle/LevelIndicator.tsx`

- Barra de progreso visual (5 niveles)
- Indicador del nivel actual
- Nombres de los niveles:
  1. Mejilla
  2. Comisura
  3. Pico
  4. Morreo
  5. Lío
- Emoji que cambia según nivel: 😊 → 😘 → 💋 → 🔥 → 🌶️

---

### **FASE E: Integración y Polish (2 horas)**

#### **E.1 - Navegación desde HomeScreen (30 min)**
**Modificar:** `src/screens/HomeScreen.tsx`

Agregar dos botones nuevos:
```
┌─────────────────────────────────────┐
│     🍻 YO NUNCA - INICIO            │
├─────────────────────────────────────┤
│                                     │
│   [Jugar Yo Nunca]                  │
│   [Modo Detectives]                 │
│   [Multiplayer Local]               │
│                                     │
│   🎮 NUEVOS JUEGOS:                 │
│   [🃏 El Rey de Copas]              │
│   [🍾 La Botella]                   │
│                                     │
│   [Frases Personalizadas]           │
│   [Estadísticas]                    │
│   [Configuración]                   │
└─────────────────────────────────────┘
```

#### **E.2 - Navegación en AppNavigator (15 min)**
**Modificar:** `src/navigation/AppNavigator.tsx`

Agregar rutas:
```typescript
<Stack.Screen
  name="CardGame"
  component={CardGameScreen}
  options={{ headerShown: false }}
/>
<Stack.Screen
  name="BottleGame"
  component={BottleGameScreen}
  options={{ headerShown: false }}
/>
```

Actualizar tipos en `src/types/index.ts`:
```typescript
export type RootStackParamList = {
  // ... rutas existentes
  CardGame: { players: Player[] };
  BottleGame: { players: Player[] };
};
```

#### **E.3 - PlayerSetup para nuevos juegos (30 min)**

**Opción A:** Reutilizar `PlayerSetupScreen` existente
- Agregar parámetro `gameType: 'yonunca' | 'detectives' | 'cardgame' | 'bottle'`
- Condicionar la navegación según `gameType`

**Opción B:** Crear setup específico para cada juego
- Menos flexible pero más específico

**Recomendación:** Opción A (reutilizar)

#### **E.4 - Testing Completo (30 min)**

Checklist:
- [ ] Todas las 50 cartas funcionan correctamente
- [ ] Progresión del 9 (1→2→3→4) funciona
- [ ] Reglas del Joker se acumulan (máx 2)
- [ ] Cascada funciona correctamente
- [ ] No mirar a los ojos se activa/desactiva bien
- [ ] Categorías cargan aleatoriamente
- [ ] Verdad o Reto mezcla bien
- [ ] Botella anima correctamente
- [ ] Niveles de escalado aumentan bien
- [ ] Pruebas se asignan según nivel
- [ ] Navegación fluida desde Home
- [ ] No hay crashes ni bugs visuales

#### **E.5 - Ajustes de UX (15 min)**

- Vibración háptica en eventos clave (sacar carta, girar botella)
- Animaciones suaves en transiciones
- Sonidos opcionales (opcional, no prioritario)
- Mensajes de ayuda ("¿Cómo jugar?")
- Confirmaciones antes de resetear juego

---

## 📁 RESUMEN DE ARCHIVOS A CREAR/MODIFICAR

### **Archivos NUEVOS (12 archivos):**

#### Tipos:
1. `src/types/cardGame.ts`

#### Datos:
2. `src/data/cardGame/categories.ts`
3. `src/data/cardGame/jokerRules.ts`
4. `src/data/cardGame/truthsAndDares.ts`
5. `src/data/bottle/dares.ts`

#### Pantallas:
6. `src/screens/CardGameScreen.tsx`
7. `src/screens/BottleGameScreen.tsx`

#### Componentes:
8. `src/components/cardGame/CardDisplay.tsx`
9. `src/components/cardGame/ActiveRulesDisplay.tsx`
10. `src/components/bottle/BottleSpinner.tsx`

#### Hooks:
11. `src/hooks/useCardGame.ts`
12. `src/hooks/useBottleGame.ts`

### **Archivos MODIFICADOS (3 archivos):**

1. `src/types/index.ts` - Agregar rutas CardGame y BottleGame
2. `src/navigation/AppNavigator.tsx` - Agregar screens
3. `src/screens/HomeScreen.tsx` - Agregar botones de nuevos juegos

---

## ⏱️ ESTIMACIÓN DE TIEMPOS

| Fase | Tarea | Tiempo |
|------|-------|--------|
| **A** | El Rey de Copas - Base | 3h |
| **B** | Bancos de Contenido | 2h |
| **C** | Efectos de Cartas | 3h |
| **D** | La Botella - Completa | 5h |
| **E** | Integración y Polish | 2h |
| **TOTAL** | | **15h** |

**Desglose:**
- El Rey de Copas: ~8-10 horas
- La Botella: ~5 horas
- Integración: ~2 horas

---

## ✅ CRITERIOS DE ÉXITO

### **Funcionales:**
- [ ] 50 cartas implementadas con efectos correctos
- [ ] Progresión del 9 funciona (1→2→3→4 tragos)
- [ ] Reglas del Joker se acumulan correctamente (máx 2)
- [ ] Cascada implementada (primero para cuando quiera)
- [ ] No mirar a los ojos se activa/desactiva bien
- [ ] 40 categorías diferentes disponibles
- [ ] 60 verdades y retos mezclados
- [ ] Botella gira y elige jugador aleatorio
- [ ] Sistema de escalado funciona (5 niveles)
- [ ] Tracking de parejas correcto
- [ ] 40 pruebas distribuidas en 5 niveles

### **UX:**
- [ ] Animaciones suaves y sin lag
- [ ] Vibración háptica en eventos clave
- [ ] UI clara y fácil de entender
- [ ] Reglas activas visibles todo el tiempo
- [ ] Navegación fluida desde Home
- [ ] Responsive en diferentes tamaños de pantalla

### **Técnicos:**
- [ ] Sin errores de TypeScript
- [ ] Sin crashes ni bugs críticos
- [ ] Código limpio y comentado
- [ ] Performance optimizado
- [ ] Backwards compatible con V3.0

---

## 🚀 SIGUIENTE SESIÓN - QUICK START

Para la próxima sesión, empezar por:

1. **Leer este plan completo** ✅
2. **Crear estructura de carpetas:**
   ```
   src/
   ├── data/
   │   ├── cardGame/
   │   │   ├── categories.ts
   │   │   ├── jokerRules.ts
   │   │   └── truthsAndDares.ts
   │   └── bottle/
   │       └── dares.ts
   ├── components/
   │   ├── cardGame/
   │   └── bottle/
   ```
3. **Empezar con FASE A.1** - Crear tipos TypeScript
4. **Continuar secuencialmente** por las fases

---

## 📝 NOTAS IMPORTANTES

### **Decisiones de Diseño Confirmadas:**
- ✅ Joker: Reglas se **acumulan** (máx 2 simultáneas)
- ✅ Verdad o Reto: Todas **mezcladas** (sin niveles)
- ✅ Categorías: **40 categorías** variadas
- ✅ Palos: Solo **estético** (sin efectos especiales)
- ✅ Cascada: Primero **para cuando quiera**, resto para con anterior
- ✅ Animación Botella: **2D simple** con rotación suave
- ✅ Niveles de besos: Mejilla → Comisura → Pico → Morreo → Lío
- ✅ Pruebas: **Retos + físicas** (opción C)
- ✅ Orden: Primero **Baraja**, luego **Botella**
- ✅ Nombres: "**El Rey de Copas**" y "**La Botella**"

### **Compatibilidad:**
- Toda la funcionalidad V3.0 se mantiene intacta
- Los nuevos juegos son **adicionales**, no reemplazan nada
- Reutilizar componentes y lógica existente donde sea posible

### **Performance:**
- Baraja de 50 cartas → no debería haber lag
- Animación de botella → usar `Animated` nativo de React Native
- Evitar re-renders innecesarios con `React.memo` y `useCallback`

---

## 🎯 OBJETIVO FINAL

Al completar V4.0, la app **"Yo Nunca"** tendrá:

1. **5 modos de juego diferentes:**
   - Modo Normal (Yo Nunca clásico)
   - Modo Detectives (con votación)
   - Multiplayer Local TCP (WiFi)
   - **El Rey de Copas** 🃏 (NUEVO)
   - **La Botella** 🍾 (NUEVO)

2. **377 frases refactorizadas** + interacción social mejorada

3. **Experiencia completa de fiesta** con variedad de mecánicas

4. **Production-ready** con toda la infraestructura V3.0 (age gate, políticas, rachas, vibración, etc.)

---

**¡Que empiece la fiesta! 🎉🃏🍾🍻**

---

**Autor:** Claude Code
**Fecha:** 2025-10-26
**Versión del plan:** 4.0
**Tiempo total estimado:** 15 horas
