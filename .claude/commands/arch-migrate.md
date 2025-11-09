---
description: "Propone plan de migración de stack tecnológico"
---

Activa el agente de Arquitectura de Software para proponer un plan de migración de stack tecnológico.

**Tipo de análisis:** Plan de migración de tecnologías

**Contexto:**
Usa este comando cuando:
- Necesitas migrar de un framework a otro (ej: CRA → Next.js)
- Quieres cambiar de backend (ej: Firebase → Supabase)
- Debes migrar de lenguaje (ej: JavaScript → TypeScript)
- Necesitas cambiar de arquitectura (ej: Monolito → Microservicios)

**Instrucciones:**
1. Lee el agente definido en `.claude/agents/software-architect.md`
2. Analiza el stack actual y el stack objetivo
3. Identifica incompatibilidades y puntos críticos
4. Propón estrategia de migración (big bang vs incremental)
5. Crea plan de migración por fases con estimaciones realistas
6. Calcula riesgos y plan de rollback

**Entregables esperados:**
- Análisis de stack actual vs stack objetivo
- Justificación de la migración (por qué migrar)
- Estrategia de migración:
  - Big bang (reescritura completa) vs Incremental
  - Justificación de la estrategia elegida
- Plan de migración detallado:
  - Fases específicas con tareas
  - Estimaciones de tiempo realistas
  - Dependencias entre fases
  - Criterios de éxito por fase
- Plan de rollback (qué hacer si algo falla)
- Análisis de riesgo (qué puede salir mal)
- Costo vs beneficio (tiempo, dinero, ROI)
- Testing strategy durante migración
