# Filosofía de Monetización User-Friendly

## Principios

1. **Experiencia de usuario PRIMERO**: La app debe ser disfrutada, no soportada.
2. **Transparencia total**: Los usuarios saben qué datos recopilamos (Privacy Policy).
3. **Anuncios discretos**: Banners al final de pantallas secundarias, nunca durante gameplay.
4. **Frecuencia moderada**: Intersticiales cada 2 juegos (balanceado entre monetización y experiencia de usuario).
5. **Sin trampas**: No hay anuncios de "cerrar en 30 segundos" ni fullscreen invasivos.

## Configuración Actual

- **Banners**: Solo en HomeScreen (parte inferior, discretos)
- **Intersticiales**: Cada 2 juegos completados
- **Rewarded**: No implementados (pueden agregarse para features premium opcionales)
- **Durante gameplay**: CERO anuncios

## Proyección de Ingresos

Con esta configuración balanceada (intersticiales cada 2 juegos):
- 1,000 DAU → $380-840/mes (+30-40% vs configuración anterior)
- 5,000 DAU → $1,900-4,200/mes (+30-40% vs configuración anterior)

**Mayor monetización manteniendo una experiencia de usuario aceptable.**

## Comparación con la Competencia

| App | Anuncios Intersticiales | Banners | Experiencia |
|-----|------------------------|---------|-------------|
| **Yo Nunca (esta app)** | Cada 2 juegos | 1 discreto | ⭐⭐⭐⭐ |
| App Competencia A | Cada 1-2 juegos | 2-3 banners | ⭐⭐ |
| App Competencia B | Cada juego + videos | 3+ banners | ⭐ |

## Configuración Técnica

La configuración de anuncios se encuentra centralizada en:
- **Archivo**: `/src/config/adsConfig.ts`
- **Parámetros configurables**:
  - `INTERSTITIAL_FREQUENCY`: Frecuencia de intersticiales (actualmente: 2 juegos)
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

### Ingresos Proyectados (configuración actual - intersticiales cada 2 juegos)
- 500 DAU: $190-420/mes ✅ Cubre costos con margen
- 1,000 DAU: $380-840/mes ✅ Ganancia neta significativa
- 5,000 DAU: $1,900-4,200/mes ✅ Ganancia sustancial

### Conclusión
Con la configuración actual (intersticiales cada 2 juegos), necesitamos aproximadamente 100 DAU para cubrir costos básicos. La mayoría de usuarios encontrarán esta frecuencia aceptable manteniendo buena retención.

## Filosofía del Desarrollador

> "Prefiero ganar menos dinero pero tener usuarios felices que dejen reseñas de 5 estrellas y recomienden la app a sus amigos. La monetización agresiva mata la retención."

Esta filosofía se refleja en cada decisión de diseño relacionada con anuncios.
