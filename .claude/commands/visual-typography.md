---
description: "Análisis y propuesta de jerarquía tipográfica profesional"
---

Activa el agente de Diseño Visual de UI para realizar una revisión completa de la tipografía y proponer un sistema tipográfico profesional.

**Tipo de análisis:** Auditoría tipográfica

**Instrucciones:**
1. Lee el agente definido en `.claude/agents/visual-designer.md`
2. Analiza todas las tipografías utilizadas actualmente
3. Evalúa jerarquía, escalas, combinaciones y legibilidad
4. Identifica inconsistencias en tamaños, pesos y estilos
5. Propón una escala tipográfica modular (ratio 1.25, 1.333, o 1.414)
6. Define jerarquía clara (H1, H2, H3, Body, Caption, etc.)
7. Proporciona código específico para implementación

**Entregables esperados:**
- Análisis de tipografía actual (qué está mal y por qué)
- Propuesta de sistema tipográfico:
  - Familias tipográficas recomendadas (máximo 2-3)
  - Escala modular completa (xs, sm, base, lg, xl, 2xl, 3xl, 4xl)
  - Pesos de fuente (weights: 400, 500, 600, 700)
  - Alturas de línea (line-height: tight, normal, relaxed)
  - Letter-spacing si es necesario
- Código de implementación (CSS, Tailwind config, next/font)
- Combinaciones de tipografías bien justificadas
- Referencias de uso en headings vs body text
