---
description: "Ayuda a diseñar arquitectura para proyecto nuevo"
---

Activa el agente de Arquitectura de Software para ayudarte a diseñar la arquitectura de un proyecto nuevo desde cero.

**Tipo de análisis:** Diseño de arquitectura para proyecto nuevo

**Instrucciones:**
1. Lee el agente definido en `.claude/agents/software-architect.md`
2. Haz preguntas estratégicas al usuario:
   - **Producto**: ¿Qué problema resuelve? ¿Quiénes son los usuarios? ¿Escala esperada?
   - **Equipo**: ¿Cuántos developers? ¿Qué tecnologías dominan?
   - **Requisitos técnicos**: ¿Web/móvil/ambos? ¿Offline? ¿Tiempo real? ¿AI/ML?
   - **Constraints**: ¿Timeline? ¿Presupuesto? ¿Requisitos de compliance?
3. Basándote en las respuestas, propón stack tecnológico con justificación
4. Define estructura de proyecto y arquitectura
5. Proporciona roadmap de implementación
6. Recomienda skills/commands/MCP a usar o crear

**Entregables esperados:**
- Stack recomendado completo:
  - Frontend (framework, UI, estado, styling)
  - Backend (API, base de datos, auth)
  - Infrastructure (deploy, CI/CD, monitoring)
  - Dev tools (TypeScript, linting, testing)
- Justificación de cada decisión técnica
- Comparación con alternativas (pros/cons)
- Estructura de carpetas recomendada
- Roadmap de implementación por fases
- Skills/commands/MCP a usar del ecosistema .claude
- Consideraciones importantes (riesgos, trade-offs, costos)
