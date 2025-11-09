# Filosofía de Monetización User-Friendly

## Principios

1. **Experiencia de usuario PRIMERO**: La app debe ser disfrutada, no soportada.
2. **Transparencia total**: Los usuarios saben qué datos recopilamos (Privacy Policy).
3. **Anuncios discretos**: Banners al final de pantallas secundarias, nunca durante gameplay.
4. **Baja frecuencia**: Intersticiales cada 4 juegos (no cada 1-2 como otras apps).
5. **Sin trampas**: No hay anuncios de "cerrar en 30 segundos" ni fullscreen invasivos.

## Configuración Actual

- **Banners**: Solo en HomeScreen (parte inferior, discretos)
- **Intersticiales**: Cada 4 juegos completados
- **Rewarded**: No implementados (pueden agregarse para features premium opcionales)
- **Durante gameplay**: CERO anuncios

## Proyección de Ingresos

Con esta configuración user-friendly:
- 1,000 DAU → $260-600/mes
- 5,000 DAU → $1,300-3,000/mes

**Sacrificamos ~30-40% de ingresos potenciales para mantener usuarios felices.**

## Comparación con la Competencia

| App | Anuncios Intersticiales | Banners | Experiencia |
|-----|------------------------|---------|-------------|
| **Yo Nunca (esta app)** | Cada 4 juegos | 1 discreto | ⭐⭐⭐⭐⭐ |
| App Competencia A | Cada 1-2 juegos | 2-3 banners | ⭐⭐ |
| App Competencia B | Cada juego + videos | 3+ banners | ⭐ |

## Configuración Técnica

La configuración de anuncios se encuentra centralizada en:
- **Archivo**: `/src/config/adsConfig.ts`
- **Parámetros configurables**:
  - `INTERSTITIAL_FREQUENCY`: Frecuencia de intersticiales (actualmente: 4 juegos)
  - `ENABLE_BANNER_ADS`: Habilitar/deshabilitar banners
  - `ENABLE_INTERSTITIAL_ADS`: Habilitar/deshabilitar intersticiales
  - `BANNER_LOCATIONS`: Control granular de ubicaciones de banners
  - `MIN_GAMEPLAY_TIME_BEFORE_AD`: Tiempo mínimo entre anuncios (2 minutos)

## Futuras Mejoras

- Opción de "Donar" para remover anuncios (In-App Purchase)
- Anuncios con recompensa para desbloquear packs de preguntas premium
- Seguir monitoreando feedback de usuarios y ajustar frecuencia si es necesario
- Implementar sistema de métricas para medir impacto en retención

## Análisis de Costos vs Ingresos

### Costos Mensuales
- Google Play Developer: ~$3/mes (pagado anualmente)
- Expo EAS Build: $0 (plan gratuito suficiente para builds mensuales)
- **Total**: ~$3-5/mes

### Ingresos Proyectados (configuración user-friendly)
- 500 DAU: $130-300/mes ✅ Cubre costos
- 1,000 DAU: $260-600/mes ✅ Ganancia neta
- 5,000 DAU: $1,300-3,000/mes ✅ Ganancia significativa

### Conclusión
Con la configuración user-friendly actual, necesitamos aproximadamente 200-300 DAU para cubrir costos básicos. Cualquier cantidad superior genera ganancia neta mientras mantenemos usuarios felices.

## Filosofía del Desarrollador

> "Prefiero ganar menos dinero pero tener usuarios felices que dejen reseñas de 5 estrellas y recomienden la app a sus amigos. La monetización agresiva mata la retención."

Esta filosofía se refleja en cada decisión de diseño relacionada con anuncios.
