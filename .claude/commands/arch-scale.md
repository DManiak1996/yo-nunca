---
description: "Evalúa escalabilidad del proyecto actual"
---

Activa el agente de Arquitectura de Software para evaluar la escalabilidad del proyecto y proponer mejoras.

**Tipo de análisis:** Evaluación de escalabilidad

**Contexto:**
Usa este comando cuando:
- El proyecto está creciendo rápidamente en usuarios
- Experimentas problemas de performance
- Anticipas crecimiento significativo
- Necesitas preparar el sistema para escalar

**Instrucciones:**
1. Lee el agente definido en `.claude/agents/software-architect.md`
2. Analiza la arquitectura actual desde perspectiva de escalabilidad:
   - **Base de datos**: ¿Puede manejar el volumen de datos esperado?
   - **API/Backend**: ¿Puede manejar el tráfico esperado?
   - **Frontend**: ¿Cómo escala con más features y complejidad?
   - **Infrastructure**: ¿Cuáles son los límites actuales?
   - **Costos**: ¿Cómo crecen con el uso?
3. Identifica cuellos de botella actuales y futuros
4. Propón soluciones de escalabilidad (vertical vs horizontal)
5. Calcula costos de escalado

**Entregables esperados:**
- Análisis de escalabilidad actual:
  - Límites de base de datos (conexiones, storage, queries)
  - Límites de API (requests/sec, concurrencia)
  - Límites de infrastructure (CPU, RAM, bandwidth)
  - Análisis de costos a escala (10x, 100x, 1000x usuarios)
- Identificación de cuellos de botella:
  - Actuales (ya afectan performance)
  - Futuros (afectarán pronto)
- Propuestas de mejora:
  - **Corto plazo** (1-3 meses): Quick wins de performance
  - **Medio plazo** (3-6 meses): Refactors arquitectónicos
  - **Largo plazo** (6-12 meses): Cambios estratégicos
- Estrategia de escalado:
  - Vertical (más recursos) vs Horizontal (más instancias)
  - Caché (Redis, CDN)
  - Database sharding/replication
  - Load balancing
  - Microservicios (si aplica)
- Proyección de costos por escala
- Roadmap de implementación priorizado
