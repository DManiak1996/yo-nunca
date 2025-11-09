---
description: "Crea o mejora el sistema de diseño (design tokens)"
---

Activa el agente de Diseño Visual de UI para crear o mejorar el sistema de diseño del proyecto con design tokens completos.

**Tipo de análisis:** Propuesta de sistema de diseño

**Instrucciones:**
1. Lee el agente definido en `.claude/agents/visual-designer.md`
2. Analiza si existe un sistema de diseño actual
3. Identifica qué tokens están faltando o mal definidos
4. Propón un sistema de diseño completo y escalable
5. Considera las skills disponibles (shadcn/ui, Tailwind) para la implementación
6. Proporciona código específico y documentación

**Entregables esperados:**
- Sistema de diseño completo con:
  - **Colors**: Paleta completa con gradaciones (50-900)
  - **Spacing**: Sistema basado en múltiplos (4px o 8px)
  - **Typography**: Escalas, pesos, alturas de línea
  - **Shadows**: Elevaciones 1-5
  - **Border Radius**: Sistema consistente
  - **Breakpoints**: Para responsive design
  - **Z-index**: Capas de profundidad
  - **Transitions**: Duraciones y easings estándar
- Código de implementación:
  - CSS variables (si aplica)
  - Tailwind config (si usa Tailwind)
  - TypeScript tokens (si usa styled-components o similar)
- Documentación de uso
- Ejemplos de componentes usando el sistema
