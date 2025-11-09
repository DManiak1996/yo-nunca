# 🚀 Quick Start - Agentes de Diseño

Esta guía te ayudará a empezar a usar los agentes de diseño en menos de 2 minutos.

## 🎯 ¿Qué hacen estos agentes?

Tienes **DOS agentes de diseño complementarios**:

### 🎨 UX/UI Designer
Te ayuda a mejorar la **experiencia de usuario (UX)** y **usabilidad**:
- Auditorías completas de usabilidad
- Análisis de flujos de usuario
- Recomendaciones de accesibilidad (A11y)
- Identificación de mejoras rápidas de UX

### 🎨 Visual Designer
Te ayuda a mejorar el **diseño visual** y **estética**:
- Auditorías de diseño visual (colores, tipografía, espaciado)
- Sistemas de diseño (design tokens)
- Paletas de colores profesionales
- Consistencia visual y branding

## ⚠️ Importante: Estos agentes tienen personalidad fuerte

**Estos NO son agentes complacientes que aprueban todo.**

- Te dirán directamente si algo está mal diseñado (UX o visualmente)
- Rechazarán propuestas que violen principios de diseño
- Usarán lenguaje directo: "Esto está mal" en lugar de "quizás podrías considerar..."
- SIEMPRE justificarán sus críticas con principios, estudios o estándares
- SIEMPRE propondrán soluciones concretas después de criticar

**¿Por qué?** Porque su lealtad es con la calidad del producto, no con tus sentimientos. Un diseñador complaciente es un diseñador inútil.

## ⚡ Uso Rápido

### 👤 Agente UX/UI Designer

#### 1️⃣ Auditoría completa de UX/UI
```
/ux-review
```
**Qué hace:** Analiza toda tu aplicación y te da un informe completo con mejoras priorizadas.

**Cuándo usarlo:** Cada 2-3 meses, o antes de lanzar una versión importante.

---

### 2️⃣ Mejoras rápidas (Quick Wins)
```
/ux-quickwins
```
**Qué hace:** Te da 5-10 mejoras fáciles de implementar (menos de 1-2h cada una) pero con alto impacto.

**Cuándo usarlo:** Cuando tengas un par de horas libres para mejorar la UX.

---

### 3️⃣ Análisis de un flujo específico
```
/ux-flow
```
Luego especifica qué flujo: _"Analiza el flujo de importación de transacciones"_

**Qué hace:** Revisa en detalle un user journey concreto y propone optimizaciones.

**Cuándo usarlo:** Cuando estés diseñando un nuevo feature o cuando usuarios reporten dificultad en una tarea.

---

#### 4️⃣ Auditoría de Accesibilidad
```
/ux-accessibility
```
**Qué hace:** Revisa si tu app cumple con WCAG 2.1 (estándares de accesibilidad).

**Cuándo usarlo:** Antes de lanzar a producción, o para hacer tu app accesible para personas con discapacidades.

---

### 🎨 Agente Visual Designer

#### 1️⃣ Auditoría completa de diseño visual
```
/visual-review
```
**Qué hace:** Analiza toda la estética de tu app (colores, tipografía, espaciado, consistencia).

**Cuándo usarlo:** Cuando el diseño se vea inconsistente, amateur, o antes de lanzar a producción.

---

#### 2️⃣ Revisión de paleta de colores
```
/visual-colors
```
**Qué hace:** Analiza tus colores actuales y propone una paleta profesional con gradaciones (50-900).

**Cuándo usarlo:** Los colores se ven mal, no hay sistema de colores, problemas de contraste.

---

#### 3️⃣ Análisis tipográfico
```
/visual-typography
```
**Qué hace:** Revisa tu tipografía y propone un sistema tipográfico profesional con escalas modulares.

**Cuándo usarlo:** Hay muchos tamaños arbitrarios, la jerarquía no es clara, se usan demasiadas fuentes.

---

#### 4️⃣ Mejoras visuales rápidas
```
/visual-quickwins
```
**Qué hace:** Te da 5-10 mejoras visuales fáciles de implementar (menos de 1-2h cada una) con alto impacto.

**Cuándo usarlo:** Antes de una demo, cuando tengas poco tiempo pero quieras mejorar el aspecto.

---

#### 5️⃣ Crear sistema de diseño
```
/visual-system
```
**Qué hace:** Crea o mejora tu sistema de diseño completo (design tokens: colores, espaciado, tipografía, etc.).

**Cuándo usarlo:** No tienes un sistema de diseño, o el proyecto está creciendo y se vuelve inconsistente.

---

## 📋 Ejemplo Práctico

Imagina que acabas de terminar un nuevo feature:

### 🔄 Workflow recomendado:

1. **Primero - UX:** `/ux-flow` para revisar el flujo de usuario específico
2. **Si hay problemas de UX:** Implementa las mejoras sugeridas
3. **Luego - Visual:** `/visual-review` para revisar la estética
4. **Si hay problemas visuales:** Implementa las mejoras de diseño visual
5. **Regularmente:**
   - `/ux-quickwins` y `/visual-quickwins` para mejorar continuamente
   - `/ux-review` cada trimestre para auditoría de UX
   - `/visual-system` cuando el proyecto crece

### 🎯 Estrategia recomendada:

**Fase 1: Fundamentos visuales**
- `/visual-system` → Establece sistema de diseño
- `/visual-colors` → Define paleta profesional
- `/visual-typography` → Define jerarquía tipográfica

**Fase 2: Usabilidad y flujos**
- `/ux-review` → Auditoría de usabilidad
- `/ux-flow` → Optimiza flujos críticos
- `/ux-accessibility` → Asegura accesibilidad

**Fase 3: Mantenimiento continuo**
- `/visual-quickwins` cada sprint
- `/ux-quickwins` cada sprint
- Auditorías completas cada trimestre

## 🎨 ¿Qué tipo de mejoras proponen?

### UX/UI Designer sugiere:
- ✅ **Usabilidad:** "El botón de 'Guardar' debería ser más visible"
- ✅ **Accesibilidad:** "Este texto tiene poco contraste, cambia de #999 a #666"
- ✅ **Flujo:** "Este formulario tiene 5 pasos, puedes reducirlo a 2"
- ✅ **Feedback:** "Falta un mensaje de éxito al guardar"
- ✅ **Errores:** "Los mensajes de error no son claros para el usuario"

### Visual Designer sugiere:
- ✅ **Colores:** "Usa paleta profesional: #3B82F6 en lugar de #00F"
- ✅ **Tipografía:** "Implementa escala modular 1.25 en lugar de tamaños arbitrarios"
- ✅ **Espaciado:** "Usa múltiplos de 4px: 8px, 12px, 16px, 24px"
- ✅ **Consistencia:** "Unifica border-radius a 8px en todos los componentes"
- ✅ **Sistema:** "Crea tokens de diseño para colores, espaciado, sombras"

## 💡 Tips para Obtener el Mejor Resultado

1. **Proporciona contexto:**
   - "Mis usuarios son personas mayores de 60 años"
   - "La app se usa principalmente en móvil"

2. **Comparte problemas reales:**
   - "Los usuarios no encuentran el botón de exportar"
   - "La gente se confunde en el paso 3"

3. **Pregunta por alternativas:**
   - "Dame 3 formas diferentes de mejorar este formulario"

4. **Pide ejemplos:**
   - "Muéstrame apps que hacen esto bien"

## 📚 ¿Quieres más detalles?

Lee la documentación completa en:
- [README de agentes](./.claude/agents/README.md)
- [Definición del agente UX/UI](./.claude/agents/ux-designer.md)

## 🔥 Empieza AHORA

El mejor momento para mejorar tu diseño es **ahora**.

### Si tu app ya funciona pero se ve mal:
```
/visual-review
```
En 10-15 minutos tendrás un diagnóstico completo de qué está mal visualmente.

### Si necesitas mejoras rápidas antes de una demo:
```
/visual-quickwins
/ux-quickwins
```
En 10 minutos tendrás listas de mejoras concretas que implementar.

### Si estás empezando un proyecto nuevo:
```
/visual-system
```
Establece un sistema de diseño sólido desde el principio.

---

**¿Necesitas ayuda?** Simplemente pregunta en el chat:
```
Explícame cómo usar los agentes de diseño
```

O lee la documentación completa:
- [Agente UX/UI Designer](./ux-designer.md)
- [Agente Visual Designer](./visual-designer.md)
- [README de agentes](./README.md)
