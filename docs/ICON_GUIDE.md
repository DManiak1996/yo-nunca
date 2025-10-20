# Guía para crear iconos de Yo Nunca

## Especificaciones técnicas

### Icono principal (`assets/icon.png`)
- Tamaño: 1024 x 1024 px
- Formato: PNG con transparencia
- Forma: Cuadrado
- Peso: < 1MB

### Adaptive Icon Android (`assets/adaptive-icon.png`)
- Tamaño: 1024 x 1024 px
- Área segura: Círculo de 640px de diámetro centrado
- Debe verse bien con máscaras: circular, cuadrada, redondeada

### Splash Screen (`assets/splash.png`)
- Tamaño: 1284 x 2778 px
- Formato: PNG
- Fondo: #0F0F0F (negro)

## Diseño sugerido

### Opción 1: Emoji + Texto
```
Fondo: Degradado negro (#0F0F0F) a morado oscuro (#1E1E1E)
Centro: Emoji 🍻 tamaño grande
Abajo: Texto "YO NUNCA" en dorado (#FFD700), bold
```

### Opción 2: Solo emoji
```
Fondo: Negro sólido (#0F0F0F)
Centro: Emoji 🎉 o 🍺 muy grande (700px)
Borde: Glow dorado sutil
```

### Opción 3: Ilustración
```
Icono personalizado de copa de cerveza
Colores: Dorado (#FFD700) y morado (#9D4EDD)
Estilo: Flat design, minimalista
```

## Herramientas recomendadas

### 1. Figma (Gratis, recomendado)
1. Ir a figma.com → Crear cuenta gratis
2. Nuevo archivo → Artboard 1024x1024
3. Añadir formas/texto/emojis
4. Exportar como PNG

### 2. Canva (Gratis)
1. canva.com → "Icono de aplicación"
2. Usar plantillas prediseñadas
3. Personalizar colores y emojis
4. Descargar PNG

### 3. Icon Kitchen (Gratis, Android-specific)
1. icon.kitchen
2. Subir imagen o emoji
3. Ajustar padding y forma
4. Descargar paquete Android completo

## Tutorial paso a paso (Figma)

### Crear icono principal

1. **Crear proyecto**
   - Nuevo archivo en Figma
   - Crear frame 1024x1024px (nombre: "Icon")

2. **Añadir fondo**
   - Rectángulo 1024x1024
   - Fill: Degradado linear
     - Color 1: #0F0F0F (negro)
     - Color 2: #2D1B4E (morado oscuro)
   - Ángulo: 135°

3. **Añadir emoji**
   - Herramienta texto (T)
   - Tamaño: 600px
   - Emoji: 🍻 (copiar desde emojipedia.org)
   - Centrar vertical y horizontalmente

4. **Añadir texto (opcional)**
   - Herramienta texto
   - Texto: "YO NUNCA"
   - Font: Inter Bold o similar
   - Tamaño: 80px
   - Color: #FFD700
   - Posición: Debajo del emoji
   - Centrar

5. **Añadir efectos (opcional)**
   - Seleccionar emoji
   - Effects → Drop Shadow
     - Color: #FFD700 con 30% opacidad
     - Blur: 20px
     - Y: 10px

6. **Exportar**
   - Seleccionar frame "Icon"
   - Export → PNG → 1x → Export

### Crear adaptive icon

Repetir proceso pero:
- Dejar margen de 192px en cada lado
- Todo el contenido dentro del círculo central de 640px
- Probar con diferentes máscaras

## Validación

Antes de usar los iconos, verificar:

- [ ] Tamaño exacto (1024x1024)
- [ ] Se ve bien a tamaño pequeño (72x72)
- [ ] Colores contrastados
- [ ] No texto ilegible
- [ ] PNG con transparencia (si aplica)
- [ ] Adaptive icon se ve bien circular/cuadrado/redondeado

## Recursos adicionales

- Emojipedia: emojipedia.org (copiar emojis en alta calidad)
- Flaticon: flaticon.com (iconos gratis con atribución)
- Coolors: coolors.co (paletas de colores)
- MockUPhone: mockuphone.com (previsualizar icono en móvil)
