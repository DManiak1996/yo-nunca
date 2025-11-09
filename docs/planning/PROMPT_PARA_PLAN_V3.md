# 📋 PROMPT PARA CREAR PLAN V3.0

**Copia y pega este texto exacto a Claude Code en modo plan:**

---

Hola Claude, necesito que crees un plan de implementación detallado para YO NUNCA V3.0.

## Contexto:
- **Proyecto:** App móvil "Yo Nunca" (juego de beber) en React Native + Expo + TypeScript
- **Estado actual:** V2.1 completada con multijugador, categorías, 240 frases, estadísticas
- **Ubicación:** `C:\Users\danie\APPS\yo-nunca`

## Tu tarea:
Crear un plan de implementación estructurado (YO_NUNCA_PLAN_V3.md) siguiendo el formato del plan V2.0.

## Documentos que DEBES leer primero:

1. **YO_NUNCA_DEVLOG.md** - Para entender qué se ha hecho hasta ahora
2. **YO_NUNCA_PLAN_V2.md** - Para seguir el mismo formato y estructura
3. **IDEAS_SELECCIONADAS_V3.md** - Features que hay que implementar (ESTE ES EL PRINCIPAL)
4. **README.md** - Para entender la estructura del proyecto

## Formato del plan que debes crear:

El plan debe incluir:

### 1. Resumen ejecutivo
- Tiempo estimado total
- Complejidad
- Objetivos principales

### 2. Decisiones de diseño
- Arquitectura técnica
- Nuevos tipos TypeScript necesarios
- Dependencias a instalar
- Permisos requeridos

### 3. Implementación por fases
Organiza las 6 features en fases lógicas, similar a como está en el plan V2.0:

**FASE A: Quick Wins + Legal (prioritario)**
- Seguridad y legal (age gate, términos, privacidad)
- Vibración
- Contador de rachas
- Límite de alcohol

**FASE B: Modo Detectives**
- Implementación completa del modo alternativo

**FASE C: Multiplayer Local (opcional, puede ser fase separada)**
- Bluetooth/WiFi Direct
- Pantallas de host/cliente
- Protocolo de comunicación

### 4. Para cada fase incluye:
- **Objetivo claro**
- **Tareas específicas** (subtareas implementables)
- **Archivos a crear** (lista completa)
- **Archivos a modificar** (lista completa con qué cambiar)
- **Ejemplos de código** donde sea relevante
- **Criterios de éxito** (cómo saber que la fase está completa)
- **Duración estimada**
- **Dependencias** (qué fases deben completarse antes)

### 5. Estructura de archivos final
- Árbol completo mostrando nuevos archivos
- Organización clara

### 6. Testing checklist
- Qué testear en cada fase
- Edge cases a considerar
- Testing requerido (dispositivos, escenarios)

### 7. Riesgos y consideraciones
- Bloqueadores potenciales
- Compatibilidad con V2.1
- Migración de datos si necesaria

### 8. Orden de ejecución recomendado
- Sesión 1: X horas, Fases A-B
- Sesión 2: X horas, Fase C
- etc.

## Importante:

1. **Sigue el formato del YO_NUNCA_PLAN_V2.md** - Usa el mismo estilo, estructura y nivel de detalle
2. **Sé específico** - No digas "implementar X", di "crear archivo Y con función Z que hace..."
3. **Prioriza correctamente** - Legal y seguridad son MUST-HAVE antes de producción
4. **Considera compatibilidad** - V2.1 ya existe, no romper funcionalidad existente
5. **Separa claramente** - Multiplayer Local es una feature grande, puede ser fase opcional
6. **Incluye código** - Ejemplos de tipos, funciones, componentes donde sea útil
7. **Sé realista** - Estimaciones de tiempo basadas en complejidad real

## Multiplayer Local - Consideraciones especiales:

Esta es la feature más compleja. En el plan debes:
- Explicar claramente la arquitectura P2P
- Detallar el protocolo de comunicación
- Incluir manejo de errores/desconexiones
- Separar en subfases (infraestructura, UI, sincronización, testing)
- Mencionar limitaciones de plataforma (iOS vs Android)

## Legal y Seguridad - Consideraciones:

Incluir:
- Age gate obligatorio al abrir app primera vez
- Disclaimers de consumo responsable
- Política de privacidad actualizada (GDPR, CCPA)
- Términos de servicio
- Validación y sanitización de todos los inputs
- Rate limiting en acciones críticas

## Output esperado:

Un archivo markdown `YO_NUNCA_PLAN_V3.md` con:
- ~4000-6000 palabras
- Estructura clara por fases
- Accionable (que otra instancia de Claude pueda implementarlo directamente)
- Completo (no dejar nada a la interpretación)

## Preguntas que el plan debe responder:

1. ¿En qué orden implemento las features?
2. ¿Qué archivos creo/modifico exactamente?
3. ¿Qué código necesito escribir? (ejemplos)
4. ¿Cómo testeteo cada fase?
5. ¿Cuánto tiempo me tomará cada fase?
6. ¿Qué dependencias instalo y cuándo?
7. ¿Cómo manejo la retrocompatibilidad?
8. ¿Qué permisos necesito solicitar?

---

**Cuando termines el plan, responde con:**
"Plan V3.0 completado. He creado YO_NUNCA_PLAN_V3.md con X fases que suman aproximadamente Y horas de trabajo. ¿Quieres que revise alguna sección específica o está listo para implementación?"

---

**¿Listo para crear el plan?**
