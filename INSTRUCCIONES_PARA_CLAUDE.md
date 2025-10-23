# 📋 INSTRUCCIONES PARA CLAUDE CODE - YO NUNCA V2.0

## 🎯 CONTEXTO DEL PROYECTO

Estás trabajando en **"Yo Nunca"**, una app de juego de beber (drinking game) tipo "Never Have I Ever" para Android/iOS.

### Estado actual del proyecto:
- **Ubicación:** `C:\Users\danie\APPS\yo-nunca`
- **Versión actual:** v1.0 - Completada (Fases 1-8)
- **Framework:** React Native + Expo SDK 54
- **Lenguaje:** TypeScript (strict mode)
- **Estado:** Funcional, testeada en emulador Android

### Lo que YA EXISTE y funciona:
1. ✅ Proyecto base con Expo + TypeScript configurado
2. ✅ 4 pantallas básicas: Home, Game, CustomPhrases, Settings
3. ✅ Sistema de navegación con React Navigation
4. ✅ 50 frases predefinidas
5. ✅ Frases personalizadas (añadir/eliminar)
6. ✅ Modo oscuro/claro funcional
7. ✅ Sistema anti-repetición de frases
8. ✅ AsyncStorage para persistencia
9. ✅ SafeAreaView actualizado (react-native-safe-area-context)
10. ✅ Limpieza automática de "Yo nunca" en frases personalizadas

### Documentación clave:
- **DevLog completo:** `YO_NUNCA_DEVLOG.md` (historial de todo lo hecho)
- **Plan V2.0:** `YO_NUNCA_PLAN_V2.md` (lo que hay que hacer AHORA)
- **Prompt original:** `YO_NUNCA_PROMPT_COMPLETO.md` (especificaciones iniciales)

---

## 🚀 TU MISIÓN

Implementar **YO NUNCA V2.0** siguiendo el plan en `YO_NUNCA_PLAN_V2.md`.

### Objetivo:
Transformar la app de un juego simple a un **juego multijugador completo** con:
- Sistema de categorías con nombres rotatorios
- Modo multijugador (2-20 jugadores)
- Estadísticas en tiempo real y finales
- Guardado automático de partidas
- Tema visual "taberna/garito"
- 240 frases totales organizadas por dificultad

---

## 📖 CÓMO EMPEZAR

### Paso 1: Leer documentación (OBLIGATORIO)
**Antes de escribir código, lee estos 3 archivos:**
1. `YO_NUNCA_DEVLOG.md` - Para entender qué se ha hecho
2. `YO_NUNCA_PLAN_V2.md` - Para saber qué hacer ahora
3. `README.md` - Para entender la estructura del proyecto

### Paso 2: Verificar estado actual
```bash
cd C:\Users\danie\APPS\yo-nunca
npx tsc --noEmit  # Verificar que no hay errores TypeScript
```

### Paso 3: Ejecutar fase por fase
Sigue **EXACTAMENTE** el orden del plan:
- Fase A → Fase B → Fase C → ... → Fase J

**IMPORTANTE:**
- NO te saltes fases
- NO combines múltiples fases sin aprobación
- TESTEA cada fase antes de continuar

---

## 🛠️ FILOSOFÍA DE DESARROLLO

### Principios a seguir:
1. **TypeScript strict** - No usar `any` excepto justificado
2. **Testing continuo** - Probar después de cada cambio significativo
3. **Commits frecuentes** - Al terminar cada fase
4. **Código limpio** - Comentar lógica compleja, no obviedades
5. **Performance** - Usar React.memo, useCallback, useMemo donde tenga sentido

### Herramientas disponibles:
- `npx tsc --noEmit` - Verificar TypeScript
- `npx expo start` - Iniciar app en emulador
- `npx expo start --web` - Iniciar en navegador (testing rápido)

---

## 📝 FORMATO DE TRABAJO

### Al empezar una fase:
1. **Actualiza el TodoList** con las subtareas de esa fase
2. **Lee la descripción completa** de la fase en el plan
3. **Identifica archivos a modificar/crear**
4. **Ejecuta paso a paso** marcando tareas como completadas

### Al terminar una fase:
1. **Verifica criterios de éxito** listados en el plan
2. **Testea la funcionalidad** (npx expo start)
3. **Documenta cambios** si es necesario
4. **Pregunta al usuario** si todo está bien antes de continuar

### Durante el desarrollo:
- **Comunica proactivamente** si encuentras problemas
- **Sugiere mejoras** si ves algo que se puede optimizar
- **Pide clarificación** si algo del plan no está claro

---

## 🎨 CONVENCIONES DE CÓDIGO

### Estructura de archivos:
```typescript
// Orden de imports:
1. React y hooks
2. React Native components
3. Librerías externas
4. Tipos locales
5. Componentes locales
6. Hooks locales
7. Utils y constants
8. Estilos (StyleSheet al final del archivo)
```

### Nombres:
- **Componentes:** PascalCase (`PlayerListItem.tsx`)
- **Hooks:** camelCase con 'use' (`usePlayers.ts`)
- **Utils:** camelCase (`funnyNames.ts`)
- **Constantes:** UPPER_SNAKE_CASE (`const MAX_PLAYERS = 20;`)

### Comentarios:
```typescript
/**
 * Descripción de función/componente complejo
 * @param x - descripción del parámetro
 * @returns descripción del return
 */
```

---

## ⚠️ ADVERTENCIAS IMPORTANTES

### NO HAGAS ESTO:
❌ Modificar `app.json` (eso es para Fase 9 de producción)
❌ Instalar dependencias sin preguntar primero
❌ Eliminar código existente sin verificar que no se usa
❌ Cambiar la estructura de carpetas sin consultar
❌ Usar librerías que no están en el plan

### SÍ HAGAS ESTO:
✅ Preservar funcionalidad existente (frases personalizadas, settings, etc.)
✅ Reutilizar componentes existentes donde sea posible
✅ Seguir patrones de código ya establecidos
✅ Actualizar el DevLog cuando termines una fase importante
✅ Preguntar si algo no está claro

---

## 🧪 TESTING CHECKLIST

Después de cada fase, verifica:
- [ ] Compilación sin errores TypeScript (`npx tsc --noEmit`)
- [ ] App inicia sin crashes (`npx expo start`)
- [ ] Funcionalidad nueva funciona según especificaciones
- [ ] Funcionalidad antigua sigue funcionando (no rompiste nada)
- [ ] No hay warnings críticos en consola

---

## 📊 PROGRESO Y COMUNICACIÓN

### Actualiza el TodoList:
Usa `TodoWrite` tool para mantener al usuario informado:
```typescript
// Ejemplo al empezar Fase A:
[
  {content: "Actualizar tipos TypeScript", status: "in_progress", activeForm: "Actualizando tipos"},
  {content: "Reorganizar frases por categoría", status: "pending", activeForm: "Reorganizando frases"},
  {content: "Actualizar storage utilities", status: "pending", activeForm: "Actualizando storage"},
  {content: "Crear nuevos colores", status: "pending", activeForm: "Creando colores"}
]
```

### Reporta problemas:
Si encuentras un bloqueador:
1. **Describe el problema claramente**
2. **Explica qué intentaste**
3. **Propón soluciones alternativas**
4. **Espera aprobación del usuario** antes de cambios grandes

---

## 🔄 FLUJO DE TRABAJO RECOMENDADO

```
1. Leer documentación
   ↓
2. Leer Fase X completa del plan
   ↓
3. Crear TodoList para Fase X
   ↓
4. Implementar paso a paso
   ↓
5. Testear continuamente
   ↓
6. Verificar criterios de éxito
   ↓
7. Reportar al usuario
   ↓
8. Usuario aprueba → Siguiente fase
```

---

## 💡 TIPS ÚTILES

### Si el usuario dice "continúa" o "sigue":
- Continúa con la siguiente subtarea de la fase actual
- O si terminaste la fase, pregunta si puedes empezar la siguiente

### Si encuentras código legacy:
- No lo elimines inmediatamente
- Pregunta al usuario primero
- O coméntalo con `// TODO: Revisar si esto se sigue usando`

### Si algo del plan no tiene sentido:
- **NO improvises**
- Pregunta al usuario para clarificar
- Propón alternativas si las tienes

### Para decisiones de diseño:
- Sigue el plan lo más fielmente posible
- Si hay ambigüedad, usa tu mejor juicio pero **comunícalo**
- Prioriza UX y claridad sobre complejidad

---

## 📞 CONTACTO CON EL USUARIO

El usuario (danielfvera) es:
- **Desarrollador con experiencia** - No necesitas sobre-explicar conceptos básicos
- **Pragmático** - Valora soluciones que funcionan sobre perfección teórica
- **Abierto a sugerencias** - Puedes proponer mejoras al plan
- **Colaborativo** - Pregunta si tienes dudas, no asumas

---

## 🎯 OBJETIVO FINAL

Al terminar todas las fases (A-J), la app debe:
1. ✅ Tener modo multijugador funcional (2-20 jugadores)
2. ✅ Sistema de categorías con botón troll "Cagón"
3. ✅ Estadísticas en tiempo real y finales
4. ✅ Guardado automático de partidas
5. ✅ 240 frases organizadas por dificultad
6. ✅ Tema visual taberna/garito
7. ✅ Animaciones suaves
8. ✅ Performance optimizada
9. ✅ Sin bugs críticos
10. ✅ Funcionalidad antigua preservada

---

## 🚦 SEÑALES DE ALERTA

### Detente y consulta al usuario si:
🚨 Necesitas instalar una dependencia no listada en el plan
🚨 Encuentras un bug en el código existente que bloquea tu trabajo
🚨 El plan requiere algo técnicamente imposible o muy complejo
🚨 Necesitas más de 1 hora para una subtarea pequeña
🚨 No estás seguro de cómo implementar algo del plan

### Está OK si:
✅ Reorganizas código interno de un componente (sin cambiar su API)
✅ Añades helpers/utilidades pequeñas no listadas explícitamente
✅ Mejoras tipos TypeScript para mayor precisión
✅ Añades validaciones extra para robustez
✅ Optimizas performance sin cambiar funcionalidad

---

## 📚 RECURSOS ADICIONALES

### Documentación oficial:
- Expo: https://docs.expo.dev/
- React Navigation: https://reactnavigation.org/
- TypeScript: https://www.typescriptlang.org/

### Dentro del proyecto:
- `README.md` - Guía de instalación y uso
- `YO_NUNCA_DEVLOG.md` - Historial completo
- `docs/PRIVACY_POLICY.md` - Política de privacidad
- `src/` - Todo el código fuente

---

## ✅ CHECKLIST ANTES DE EMPEZAR

Antes de escribir la primera línea de código, asegúrate:
- [ ] He leído `YO_NUNCA_DEVLOG.md` completo
- [ ] He leído `YO_NUNCA_PLAN_V2.md` completo
- [ ] Entiendo el estado actual del proyecto
- [ ] Sé qué fase voy a implementar primero
- [ ] Tengo claro cómo testear mis cambios
- [ ] He verificado que el proyecto compila (`npx tsc --noEmit`)

---

## 🎬 MENSAJE INICIAL SUGERIDO

Cuando el usuario te pase estos documentos, responde algo así:

```
¡Perfecto! He leído toda la documentación:

✅ YO_NUNCA_DEVLOG.md - Entiendo el estado actual (Fase 8 completada)
✅ YO_NUNCA_PLAN_V2.md - Tengo el plan completo de implementación
✅ Estructura del proyecto - Ubicación: C:\Users\danie\APPS\yo-nunca

Estoy listo para empezar con la **Fase A: Refactorización Base y Nuevos Tipos**.

Esta fase incluye:
1. Actualizar tipos TypeScript (Player, GameSession, GameStats, etc.)
2. Reorganizar frases en 3 archivos por categoría
3. Ampliar storage utilities
4. Actualizar colores con tema taberna

¿Quieres que empiece con la Fase A o prefieres que primero verifique el estado actual del código?
```

---

**Fecha de creación:** 2025-10-22
**Versión del plan:** 2.0
**Usuario:** danielfvera
**Proyecto:** Yo Nunca - Drinking Game App

---

**¡Buena suerte y a programar! 🚀🍻**
