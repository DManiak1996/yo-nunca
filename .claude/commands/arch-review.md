---
description: "Evaluación completa de arquitectura del proyecto existente"
---

Activa el agente de Arquitectura de Software para realizar una evaluación completa de la arquitectura actual del proyecto.

**Tipo de análisis:** Evaluación de proyecto existente

**Instrucciones:**
1. Lee el agente definido en `.claude/agents/software-architect.md`
2. Analiza el stack actual del proyecto:
   - Revisa `package.json`, `requirements.txt`, o equivalente
   - Examina estructura de carpetas y organización
   - Identifica frameworks, librerías, y dependencias principales
   - Revisa configuración de build, deploy, y CI/CD
3. Evalúa si el stack es adecuado para el proyecto
4. Identifica problemas críticos, deuda técnica, y oportunidades de mejora
5. Decide: SEGUIR / REFACTORIZAR / RESETEAR
6. Proporciona plan de acción específico

**Entregables esperados:**
- Resumen ejecutivo del stack actual
- Diagnóstico: SEGUIR / REFACTORIZAR / RESETEAR
- Análisis detallado:
  - ✅ Decisiones correctas a mantener
  - 🔴 Problemas críticos
  - 🟠 Deuda técnica alta
  - 🟡 Oportunidades de mejora
- Plan de acción específico según diagnóstico
- Recomendaciones de skills/commands/MCP a usar o crear
- Análisis costo vs. beneficio (tiempo, dinero, riesgo)
