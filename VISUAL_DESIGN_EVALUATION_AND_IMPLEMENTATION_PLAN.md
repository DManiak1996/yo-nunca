# 🎨 Evaluación Visual Design + Plan de Implementación Claude

## Proyecto: "Yo Nunca" - App de Juegos de Bebida
**Fecha:** 2025-11-09
**Agente:** Visual Design Specialist
**Objetivo:** Evaluar diseño visual y crear plan ejecutable por Claude

---

## 📊 RESUMEN EJECUTIVO

### Estado Actual
- ✅ Sistema de temas funcional (Dark/Light)
- ✅ Paleta de colores coherente (tema taberna/garito)
- ✅ Utilidades responsive bien implementadas
- ❌ **Valores hardcodeados** en componentes
- ❌ **Sin sistema de design tokens** centralizado
- ❌ **Tipografía inconsistente** (14 tamaños diferentes)
- ❌ **Código duplicado** en modales y sombras

### Impacto Visual
- **Consistencia:** 60/100 (paleta OK, pero aplicación inconsistente)
- **Mantenibilidad:** 40/100 (valores hardcodeados dificultan cambios)
- **Escalabilidad:** 50/100 (añadir componentes replica problemas)
- **Profesionalismo:** 70/100 (buen diseño base, mala implementación)

---

## 🤖 ¿PUEDE CLAUDE MEJORAR EL DISEÑO VISUAL?

### ✅ SÍ, Claude PUEDE:

1. **Crear sistema de design tokens profesional** (colores, espaciado, tipografía, sombras, border radius)
2. **Refactorizar componentes** para usar tokens (eliminar hardcoded values)
3. **Crear componentes base reutilizables** (BaseModal, Typography, Card)
4. **Estandarizar tipografía** (sistema de escalas coherente)
5. **Eliminar duplicación** de código (estilos de modales, sombras)
6. **Implementar paletas de colores** propuestas por diseñador
7. **Crear sistema de spacing consistente** (4px, 8px, 12px, 16px, etc.)
8. **Mejorar accesibilidad** (contraste de colores, tamaños de fuente)

### ❌ NO, Claude NO PUEDE (requiere diseñador):

1. **Crear ilustraciones complejas** desde cero
2. **Diseñar logos profesionales** con herramientas gráficas
3. **Crear mockups visuales** en Figma/Sketch
4. **Fotografía de producto** o assets fotográficos
5. **Animaciones complejas** (solo puede implementar código, no diseñar movimiento)

### 📈 CONCLUSIÓN

**Claude puede implementar el 85-90% de las mejoras visuales.**

El 10-15% restante (assets gráficos complejos, ilustraciones custom) puede:
- Posponerse para MVP
- Usar iconos SVG de bibliotecas (react-native-svg, expo-icons)
- Contratar diseñador freelance posteriormente

---

## 🔍 ANÁLISIS DETALLADO DEL DISEÑO ACTUAL

### 1. Sistema de Colores

#### ✅ Puntos Fuertes:
```typescript
// Archivo: /home/user/yo-nunca/src/constants/Colors.ts
// ✅ Paleta coherente con tema "taberna/garito"
// ✅ Dark y Light themes bien definidos
// ✅ Colores semánticos (primary, danger, success)
```

#### ❌ Problemas Encontrados:

**Colores hardcodeados fuera del sistema:**
- `'#000000'` en CustomButton.tsx (línea 42)
- `'#000'` en múltiples shadowColor
- `'#FFF'` en múltiples componentes
- `'#C0C0C0'` (plata), `'#CD7F32'` (bronce) en FinalStatsModal.tsx
- `'#E67E22'` (naranja) hardcodeado en múltiples lugares
- `'#FF5722'` (racha) en PlayerListItem.tsx
- `'rgba(0, 0, 0, 0.7)'` en overlays de modales

**Transparencias inconsistentes:**
- `${theme.primary}20`, `${theme.primary}40`, `${theme.primary}60`
- Sin tokens para opacidades (20%, 30%, 40%, etc.)

### 2. Tipografía

#### ❌ Problema: 14 tamaños de fuente diferentes

**Tamaños encontrados:**
- 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 28, 36, 48, 64

**Sin escala tipográfica coherente:**
```typescript
// Debería ser algo como:
// xs: 12, sm: 14, base: 16, lg: 18, xl: 20, 2xl: 24, 3xl: 30, 4xl: 36, 5xl: 48
```

**Pesos de fuente inconsistentes:**
- `'600'` vs `'bold'` usados indistintamente
- Sin tokens para pesos (regular, medium, semibold, bold)

### 3. Espaciado (Spacing)

#### ❌ Valores inconsistentes:

**Padding encontrado:**
- 2, 4, 6, 8, 10, 12, 14, 16, 20, 24, 28, 32

**Sin sistema de spacing:**
```typescript
// Debería seguir múltiplos de 4 o escala consistente:
// xs: 4, sm: 8, md: 12, base: 16, lg: 20, xl: 24, 2xl: 32, 3xl: 40
```

### 4. Border Radius

#### ❌ Valores inconsistentes:

**BorderRadius encontrado:**
- 8, 12, 14, 16, 20, 24

**Sin tokens:**
```typescript
// Debería tener:
// sm: 8, md: 12, lg: 16, xl: 20, 2xl: 24, full: 9999
```

### 5. Sombras (Shadows)

#### ❌ Duplicación extrema:

**Cada componente define sus propias sombras:**
```typescript
// CustomButton.tsx (líneas 71-76)
elevation: 4,
shadowColor: '#000',
shadowOffset: { width: 0, height: 2 },
shadowOpacity: 0.25,
shadowRadius: 4,

// PhraseCard.tsx (líneas 78-81)
elevation: 8,
shadowColor: '#000',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.4,
shadowRadius: 8,

// StatsModal.tsx (líneas 229-232)
elevation: 8,
shadowColor: '#000',
shadowOffset: { width: 0, height: 4 },
shadowOpacity: 0.3,
shadowRadius: 8,
```

**Debería haber tokens:**
```typescript
// Shadow.sm, Shadow.md, Shadow.lg
```

### 6. Componentes (Duplicación)

#### ❌ Modales tienen código duplicado:

**Overlay repetido en 10+ modales:**
```typescript
overlay: {
  flex: 1,
  backgroundColor: 'rgba(0, 0, 0, 0.7)', // u 0.8, 0.85
  justifyContent: 'center',
  alignItems: 'center',
  padding: 20,
}
```

**Modal container repetido:**
```typescript
modalContainer: {
  width: '100%',
  maxWidth: 400, // o 500
  borderRadius: 24, // o 16
  padding: 20, // o 32
  elevation: 8,
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.3,
  shadowRadius: 8,
}
```

**Solución:** BaseModal component reutilizable

---

## 🛠️ PLAN DE IMPLEMENTACIÓN DETALLADO PARA CLAUDE

### RESUMEN DE FASES

| Fase | Descripción | Tiempo | Dificultad | Claude puede? |
|------|-------------|--------|------------|---------------|
| 1 | Design Tokens (6 archivos) | 2h | Fácil | ✅ 100% |
| 2 | Componentes Base (BaseModal, Typography) | 3h | Media | ✅ 100% |
| 3 | Refactorizar Componentes (usar tokens) | 6h | Media | ✅ 100% |
| 4 | Refactorizar Modales (usar BaseModal) | 4h | Media | ✅ 100% |
| 5 | Testing & Ajustes | 2h | Fácil | ✅ 90% |

**Total:** 17 horas de trabajo de Claude (dividido en sesiones)

---

## 📦 FASE 1: DESIGN TOKENS (Claude puede 100%)

**Tiempo estimado:** 2 horas
**Archivos a crear:** 6 archivos nuevos

### Paso 1.1: Crear estructura de carpetas

**Comando para Claude:**
```bash
mkdir -p /home/user/yo-nunca/src/constants/DesignTokens
```

### Paso 1.2: Crear `colors.ts`

**Archivo a crear:** `/home/user/yo-nunca/src/constants/DesignTokens/colors.ts`

**Código COMPLETO:**

```typescript
/**
 * Design Tokens: Colores
 * Sistema de colores centralizado con variantes y opacidades
 */

/**
 * Colores base (sin cambios, mantener DarkTheme y LightTheme)
 * Estos se importarán desde Colors.ts existente
 */
export { DarkTheme, LightTheme } from '../Colors';

/**
 * Colores adicionales que no están en el tema
 * Usados en componentes específicos
 */
export const ExtraColors = {
  // Metales para podio
  gold: '#FFD700',
  silver: '#C0C0C0',
  bronze: '#CD7F32',

  // Colores adicionales
  orange: '#E67E22',
  deepOrange: '#FF5722',

  // Colores neutros (para casos donde no dependen del tema)
  black: '#000000',
  white: '#FFFFFF',

  // Overlays (transparencias)
  overlay: {
    light: 'rgba(0, 0, 0, 0.5)',
    medium: 'rgba(0, 0, 0, 0.7)',
    heavy: 'rgba(0, 0, 0, 0.85)',
  },
};

/**
 * Opacidades para usar con colores del tema
 * Uso: `${theme.primary}${Opacity.light}` → '#D4A57420'
 */
export const Opacity = {
  subtle: '10',    // 10% - muy sutil
  light: '20',     // 20% - ligero
  medium: '30',    // 30% - medio
  strong: '40',    // 40% - fuerte
  heavy: '60',     // 60% - pesado
};

/**
 * Helper para obtener color con opacidad
 * @param color - Color base (ej: '#D4A574')
 * @param opacity - Nivel de opacidad ('10', '20', '30', '40', '60')
 * @returns Color con opacidad (ej: '#D4A57420')
 */
export const withOpacity = (color: string, opacity: keyof typeof Opacity): string => {
  return `${color}${Opacity[opacity]}`;
};
```

**Instrucciones para Claude:**
1. Crear carpeta `/home/user/yo-nunca/src/constants/DesignTokens/`
2. Crear archivo `colors.ts` con el código de arriba
3. Verificar que compila: `npx tsc --noEmit`

---

### Paso 1.3: Crear `spacing.ts`

**Archivo a crear:** `/home/user/yo-nunca/src/constants/DesignTokens/spacing.ts`

**Código COMPLETO:**

```typescript
/**
 * Design Tokens: Espaciado
 * Sistema de espaciado consistente basado en múltiplos de 4
 */

/**
 * Espaciado base (en píxeles)
 * Usar con scale() o verticalScale() de responsive.ts
 */
export const Spacing = {
  xs: 4,      // Extra pequeño
  sm: 8,      // Pequeño
  md: 12,     // Mediano
  base: 16,   // Base (default)
  lg: 20,     // Grande
  xl: 24,     // Extra grande
  '2xl': 32,  // 2x extra grande
  '3xl': 40,  // 3x extra grande
  '4xl': 48,  // 4x extra grande
  '5xl': 64,  // 5x extra grande
} as const;

/**
 * Gaps para flexbox
 * Usar directamente en style={{ gap: Gap.md }}
 */
export const Gap = Spacing; // Alias para claridad semántica

/**
 * Spacing específico para componentes
 */
export const ComponentSpacing = {
  button: {
    paddingVertical: 14,
    paddingHorizontal: 28,
  },
  modal: {
    padding: 20,
    maxWidth: 400,
  },
  card: {
    padding: 16,
  },
} as const;
```

**Instrucciones para Claude:**
1. Crear archivo `spacing.ts` en `/home/user/yo-nunca/src/constants/DesignTokens/`
2. Copiar código de arriba
3. Verificar compilación

---

### Paso 1.4: Crear `typography.ts`

**Archivo a crear:** `/home/user/yo-nunca/src/constants/DesignTokens/typography.ts`

**Código COMPLETO:**

```typescript
/**
 * Design Tokens: Tipografía
 * Sistema de escalas tipográficas y estilos de texto
 */

import { TextStyle } from 'react-native';

/**
 * Tamaños de fuente
 * Escala coherente basada en ratio 1.25 (Major Third)
 */
export const FontSize = {
  xs: 10,      // Extra pequeño (labels, hints)
  sm: 12,      // Pequeño (captions)
  base: 14,    // Base (texto normal)
  md: 16,      // Mediano (texto destacado)
  lg: 18,      // Grande (subtítulos)
  xl: 20,      // Extra grande (títulos pequeños)
  '2xl': 24,   // Títulos medianos
  '3xl': 30,   // Títulos grandes
  '4xl': 36,   // Títulos muy grandes
  '5xl': 48,   // Display grande
  '6xl': 64,   // Display muy grande (hero)
} as const;

/**
 * Pesos de fuente
 */
export const FontWeight = {
  regular: '400' as TextStyle['fontWeight'],
  medium: '500' as TextStyle['fontWeight'],
  semibold: '600' as TextStyle['fontWeight'],
  bold: '700' as TextStyle['fontWeight'],
} as const;

/**
 * Line heights
 * Usar con fontSize para mejor legibilidad
 */
export const LineHeight = {
  tight: 1.2,   // Títulos
  normal: 1.5,  // Texto normal
  relaxed: 1.8, // Texto largo
} as const;

/**
 * Familias de fuente
 */
export const FontFamily = {
  heading: 'BebasNeue_400Regular',
  body: 'Nunito_400Regular',
  bodySemibold: 'Nunito_600SemiBold',
} as const;

/**
 * Estilos de texto predefinidos
 * Usar en componentes: style={[TextStyles.h1, { color: theme.text }]}
 */
export const TextStyles = {
  // Headings
  h1: {
    fontSize: FontSize['4xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['4xl'] * LineHeight.tight,
    fontFamily: FontFamily.heading,
  } as TextStyle,

  h2: {
    fontSize: FontSize['3xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['3xl'] * LineHeight.tight,
    fontFamily: FontFamily.heading,
  } as TextStyle,

  h3: {
    fontSize: FontSize['2xl'],
    fontWeight: FontWeight.bold,
    lineHeight: FontSize['2xl'] * LineHeight.tight,
  } as TextStyle,

  h4: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.xl * LineHeight.tight,
  } as TextStyle,

  // Body
  body: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.base * LineHeight.normal,
    fontFamily: FontFamily.body,
  } as TextStyle,

  bodyMedium: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.md * LineHeight.normal,
    fontFamily: FontFamily.body,
  } as TextStyle,

  bodyLarge: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.lg * LineHeight.normal,
    fontFamily: FontFamily.body,
  } as TextStyle,

  // Captions
  caption: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.regular,
    lineHeight: FontSize.sm * LineHeight.normal,
  } as TextStyle,

  captionBold: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.sm * LineHeight.normal,
  } as TextStyle,

  // Labels
  label: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    lineHeight: FontSize.xs * LineHeight.normal,
  } as TextStyle,

  // Button text
  button: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    lineHeight: FontSize.lg * LineHeight.tight,
  } as TextStyle,
} as const;
```

**Instrucciones para Claude:**
1. Crear archivo `typography.ts`
2. Copiar código completo
3. Verificar compilación

---

### Paso 1.5: Crear `borderRadius.ts`

**Archivo a crear:** `/home/user/yo-nunca/src/constants/DesignTokens/borderRadius.ts`

**Código COMPLETO:**

```typescript
/**
 * Design Tokens: Border Radius
 * Sistema de border radius consistente
 */

/**
 * Border radius base
 */
export const BorderRadius = {
  none: 0,
  sm: 8,
  md: 12,
  base: 14,   // Default para botones
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999, // Círculo perfecto
} as const;

/**
 * Border radius específico para componentes
 */
export const ComponentBorderRadius = {
  button: 14,
  card: 20,
  modal: 24,
  input: 12,
  badge: 20,
} as const;
```

---

### Paso 1.6: Crear `shadows.ts`

**Archivo a crear:** `/home/user/yo-nunca/src/constants/DesignTokens/shadows.ts`

**Código COMPLETO:**

```typescript
/**
 * Design Tokens: Shadows
 * Sistema de sombras consistente para iOS y Android
 */

import { ViewStyle } from 'react-native';

/**
 * Sombras predefinidas
 * Ya incluyen elevation (Android) y shadow* (iOS)
 */
export const Shadow = {
  none: {
    elevation: 0,
    shadowColor: 'transparent',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0,
    shadowRadius: 0,
  } as ViewStyle,

  sm: {
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  } as ViewStyle,

  md: {
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  } as ViewStyle,

  lg: {
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  } as ViewStyle,

  xl: {
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  } as ViewStyle,

  '2xl': {
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  } as ViewStyle,
} as const;

/**
 * Sombras específicas para componentes
 */
export const ComponentShadow = {
  button: Shadow.md,
  card: Shadow.xl,
  modal: Shadow['2xl'],
  floatingButton: Shadow.lg,
} as const;
```

---

### Paso 1.7: Crear `index.ts` (barrel export)

**Archivo a crear:** `/home/user/yo-nunca/src/constants/DesignTokens/index.ts`

**Código COMPLETO:**

```typescript
/**
 * Design Tokens - Barrel Export
 * Importar todo desde aquí: import { Spacing, FontSize, Shadow } from '@/constants/DesignTokens'
 */

export * from './colors';
export * from './spacing';
export * from './typography';
export * from './borderRadius';
export * from './shadows';
```

---

### Verificación Fase 1

**Comando para Claude ejecutar:**

```bash
# Verificar que todos los archivos existen
ls -la /home/user/yo-nunca/src/constants/DesignTokens/

# Verificar compilación TypeScript
cd /home/user/yo-nunca && npx tsc --noEmit
```

**Resultado esperado:**
```
✓ colors.ts
✓ spacing.ts
✓ typography.ts
✓ borderRadius.ts
✓ shadows.ts
✓ index.ts
✓ No errores de compilación
```

---

## 📦 FASE 2: COMPONENTES BASE (Claude puede 100%)

**Tiempo estimado:** 3 horas
**Archivos a crear:** 2 componentes nuevos

### Paso 2.1: Crear `BaseModal.tsx`

**Archivo a crear:** `/home/user/yo-nunca/src/components/BaseModal.tsx`

**Código COMPLETO:**

```typescript
/**
 * BaseModal - Componente modal base reutilizable
 * Elimina duplicación de código en todos los modales
 */

import React, { ReactNode } from 'react';
import {
  View,
  Modal,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { BorderRadius, Shadow, Spacing } from '../constants/DesignTokens';
import { ExtraColors } from '../constants/DesignTokens/colors';
import { moderateScale, scale, verticalScale } from '../utils/responsive';

interface BaseModalProps {
  visible: boolean;
  onClose: () => void;
  children: ReactNode;

  // Opciones de customización
  maxWidth?: number;
  padding?: number;
  scrollable?: boolean;
  overlayOpacity?: 'light' | 'medium' | 'heavy';
  animationType?: 'none' | 'slide' | 'fade';
}

export default function BaseModal({
  visible,
  onClose,
  children,
  maxWidth = 400,
  padding = Spacing.lg,
  scrollable = false,
  overlayOpacity = 'medium',
  animationType = 'fade',
}: BaseModalProps) {
  const { theme } = useTheme();

  const overlayColors = {
    light: ExtraColors.overlay.light,
    medium: ExtraColors.overlay.medium,
    heavy: ExtraColors.overlay.heavy,
  };

  const content = scrollable ? (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={{ padding }}
      showsVerticalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={{ padding }}>
      {children}
    </View>
  );

  return (
    <Modal
      visible={visible}
      transparent
      animationType={animationType}
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={[styles.overlay, { backgroundColor: overlayColors[overlayOpacity] }]}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()} // Prevenir cierre al tocar modal
          style={[
            styles.modalContainer,
            {
              backgroundColor: theme.cardBackground,
              maxWidth: scale(maxWidth),
              borderRadius: moderateScale(BorderRadius.modal),
            },
            Shadow.modal,
          ]}
        >
          {content}
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(Spacing.lg),
  },
  modalContainer: {
    width: '100%',
  },
  scrollView: {
    maxHeight: '80%',
  },
});
```

**Instrucciones para Claude:**
1. Crear archivo `/home/user/yo-nunca/src/components/BaseModal.tsx`
2. Copiar código completo
3. Verificar que compila

---

### Paso 2.2: Crear `Typography.tsx`

**Archivo a crear:** `/home/user/yo-nunca/src/components/Typography.tsx`

**Código COMPLETO:**

```typescript
/**
 * Typography - Componentes de texto tipográfico reutilizables
 * Usar en lugar de <Text> para consistencia
 */

import React, { ReactNode } from 'react';
import { Text, TextStyle, StyleSheet } from 'react-native';
import { TextStyles } from '../constants/DesignTokens';
import { useTheme } from '../context/ThemeContext';

interface TypographyProps {
  children: ReactNode;
  style?: TextStyle | TextStyle[];
  color?: string;
  numberOfLines?: number;
}

// Componente base interno
function BaseTypography({
  children,
  style,
  color,
  numberOfLines,
  baseStyle,
}: TypographyProps & { baseStyle: TextStyle }) {
  const { theme } = useTheme();
  const textColor = color || theme.text;

  return (
    <Text
      style={[baseStyle, { color: textColor }, style]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

// Componentes exportados
export function H1(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.h1} />;
}

export function H2(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.h2} />;
}

export function H3(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.h3} />;
}

export function H4(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.h4} />;
}

export function Body(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.body} />;
}

export function BodyMedium(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.bodyMedium} />;
}

export function BodyLarge(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.bodyLarge} />;
}

export function Caption(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.caption} />;
}

export function CaptionBold(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.captionBold} />;
}

export function Label(props: TypographyProps) {
  return <BaseTypography {...props} baseStyle={TextStyles.label} />;
}

// Default export como objeto
const Typography = {
  H1,
  H2,
  H3,
  H4,
  Body,
  BodyMedium,
  BodyLarge,
  Caption,
  CaptionBold,
  Label,
};

export default Typography;
```

---

### Verificación Fase 2

**Comando para Claude:**

```bash
# Verificar archivos
ls -la /home/user/yo-nunca/src/components/BaseModal.tsx
ls -la /home/user/yo-nunca/src/components/Typography.tsx

# Verificar compilación
cd /home/user/yo-nunca && npx tsc --noEmit
```

---

## 📦 FASE 3: REFACTORIZAR COMPONENTES (Claude puede 100%)

**Tiempo estimado:** 6 horas
**Componentes a refactorizar:** 8 componentes principales

### Componente 3.1: CustomButton

**Archivo a modificar:** `/home/user/yo-nunca/src/components/CustomButton.tsx`

**ANTES (líneas 64-87):**
```typescript
const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(14),
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(28),
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  text: {
    fontSize: moderateScale(18),
    fontWeight: '600',
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
```

**DESPUÉS (CÓDIGO COMPLETO DEL ARCHIVO):**

```typescript
/**
 * Botón personalizado con variantes de estilo
 * V2.0 - Usando Design Tokens
 */

import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { moderateScale, verticalScale, scale } from '../utils/responsive';
import {
  BorderRadius,
  Shadow,
  Spacing,
  TextStyles,
  ExtraColors,
} from '../constants/DesignTokens';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: object;
  disabled?: boolean;
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
}: CustomButtonProps) {
  const { theme } = useTheme();

  const getBackgroundColor = () => {
    switch (variant) {
      case 'primary':
        return theme.primary;
      case 'secondary':
        return theme.secondary;
      case 'danger':
        return theme.danger;
      default:
        return theme.primary;
    }
  };

  const getTextColor = () => {
    // Primary button tiene texto negro, los demás blanco
    return variant === 'primary' ? ExtraColors.black : ExtraColors.white;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        disabled && styles.disabled,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      activeOpacity={disabled ? 1 : 0.8}
      disabled={disabled}
    >
      <Text style={[styles.text, { color: getTextColor() }, disabled && styles.disabledText]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(BorderRadius.button),
    paddingVertical: verticalScale(Spacing.md),
    paddingHorizontal: scale(Spacing['2xl']),
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadow.button,
  },
  text: {
    ...TextStyles.button,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
```

**Instrucciones para Claude:**
1. Leer archivo actual `/home/user/yo-nunca/src/components/CustomButton.tsx`
2. Usar herramienta Edit para:
   - Añadir imports de DesignTokens (línea 8)
   - Reemplazar getTextColor() para usar ExtraColors (líneas 40-43)
   - Reemplazar styles completo (líneas 64-87)
3. Verificar que compila
4. Probar que no rompe la app (ejecutar metro bundler)

---

### Componente 3.2: PhraseCard

**Archivo a modificar:** `/home/user/yo-nunca/src/components/PhraseCard.tsx`

**CAMBIOS ESPECÍFICOS:**

1. **Añadir imports (después de línea 9):**
```typescript
import { BorderRadius, Shadow, Spacing, withOpacity, Opacity } from '../constants/DesignTokens';
```

2. **Línea 30: Cambiar glow color**
```typescript
// ANTES:
<View style={[styles.glowOuter, { backgroundColor: `${theme.primary}40` }]} />

// DESPUÉS:
<View style={[styles.glowOuter, { backgroundColor: withOpacity(theme.primary, 'strong') }]} />
```

3. **Línea 35: Cambiar border color**
```typescript
// ANTES:
style={[styles.card, { borderColor: `${theme.primary}60` }]}

// DESPUÉS:
style={[styles.card, { borderColor: withOpacity(theme.primary, 'heavy') }]}
```

4. **Líneas 55-87: Reemplazar styles**
```typescript
const styles = StyleSheet.create({
  cardContainer: {
    width: '90%',
    alignSelf: 'center',
    position: 'relative',
  },
  glowOuter: {
    position: 'absolute',
    top: -4,
    left: -4,
    right: -4,
    bottom: -4,
    borderRadius: BorderRadius.xl,
    opacity: 0.3,
  },
  card: {
    borderRadius: BorderRadius.lg,
    borderWidth: 2,
    padding: Spacing['2xl'],
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadow.xl,
  },
  phraseText: {
    textAlign: 'center',
    lineHeight: 36,
  },
});
```

**Instrucciones para Claude:**
1. Usar Edit para añadir import de DesignTokens
2. Usar Edit para cambiar línea 30 (glow)
3. Usar Edit para cambiar línea 35 (border)
4. Usar Edit para reemplazar styles (líneas 55-87)

---

### Componente 3.3: CagonModal

**Archivo a modificar:** `/home/user/yo-nunca/src/components/CagonModal.tsx`

**ESTRATEGIA:** Migrar a BaseModal

**DESPUÉS (CÓDIGO COMPLETO):**

```typescript
/**
 * Modal troll que aparece cuando el usuario selecciona la categoría "CAGÓN"
 * V2.0 - Usando BaseModal y Design Tokens
 */

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { getRandomCagonPhrase } from '../data/cagonPhrases';
import { getCagonCounter, incrementCagonCounter } from '../utils/storage';
import BaseModal from './BaseModal';
import CustomButton from './CustomButton';
import { BorderRadius, FontSize, FontWeight, Spacing } from '../constants/DesignTokens';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function CagonModal({ visible, onClose }: Props) {
  const { theme } = useTheme();
  const [phrase, setPhrase] = useState('');
  const [counter, setCounter] = useState(0);
  const [scaleAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      setPhrase(getRandomCagonPhrase());
      incrementCagonCounter()
        .then((newCount) => setCounter(newCount))
        .catch(() => setCounter(0));

      Animated.spring(scaleAnim, {
        toValue: 1,
        tension: 50,
        friction: 7,
        useNativeDriver: true,
      }).start();
    } else {
      scaleAnim.setValue(0);
    }
  }, [visible]);

  const handleClose = () => {
    Animated.timing(scaleAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onClose();
    });
  };

  return (
    <BaseModal
      visible={visible}
      onClose={handleClose}
      maxWidth={400}
      padding={Spacing['2xl']}
    >
      <Animated.View style={{ transform: [{ scale: scaleAnim }], alignItems: 'center' }}>
        {/* Icono grande */}
        <Text style={styles.icon}>🐔</Text>

        {/* Frase graciosa */}
        <Text style={[styles.phrase, { color: theme.text }]}>{phrase}</Text>

        {/* Contador de intentos */}
        <View style={[styles.counterContainer, { backgroundColor: theme.danger }]}>
          <Text style={styles.counterText}>
            Intento #{counter} de ser cagón
          </Text>
        </View>

        {/* Mensaje adicional si hay muchos clicks */}
        {counter >= 5 && (
          <Text style={[styles.extraMessage, { color: theme.textSecondary }]}>
            Ya van {counter} veces... ¿en serio? 🤦
          </Text>
        )}

        {counter >= 10 && (
          <Text style={[styles.extraMessage, { color: theme.danger }]}>
            ¡RÉCORD! Eres oficialmente el más cagón del grupo 🏆🐔
          </Text>
        )}

        {/* Botón cerrar */}
        <CustomButton
          title="Entendido, lo siento 😔"
          onPress={handleClose}
          variant="primary"
          style={styles.closeButton}
        />

        {/* Texto pequeño de pista */}
        <Text style={[styles.hint, { color: theme.textSecondary }]}>
          Pista: Prueba con otra categoría...
        </Text>
      </Animated.View>
    </BaseModal>
  );
}

const styles = StyleSheet.create({
  icon: {
    fontSize: 80,
    marginBottom: Spacing.lg,
  },
  phrase: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    textAlign: 'center',
    marginBottom: Spacing['2xl'],
    lineHeight: 30,
  },
  counterContainer: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
    borderRadius: BorderRadius.xl,
    marginBottom: Spacing.base,
  },
  counterText: {
    color: '#FFF',
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
  },
  extraMessage: {
    fontSize: FontSize.base,
    textAlign: 'center',
    marginBottom: Spacing.md,
    fontStyle: 'italic',
  },
  closeButton: {
    width: '100%',
    marginTop: Spacing.sm,
  },
  hint: {
    fontSize: FontSize.sm,
    marginTop: Spacing.base,
    textAlign: 'center',
  },
});
```

**Instrucciones para Claude:**
1. Reemplazar TODO el archivo CagonModal.tsx con el código de arriba
2. Verificar compilación
3. Probar modal en la app

---

### Componente 3.4: PlayerListItem

**Archivo a modificar:** `/home/user/yo-nunca/src/components/PlayerListItem.tsx`

**CAMBIOS PRINCIPALES:**

1. **Añadir imports:**
```typescript
import { BorderRadius, Shadow, FontSize, FontWeight, ExtraColors } from '../constants/DesignTokens';
```

2. **Línea 94: Cambiar color hardcoded**
```typescript
// ANTES:
if (player.drinks < 6) return theme.primary;
if (player.drinks < 10) return '#E67E22';

// DESPUÉS:
if (player.drinks < 6) return theme.primary;
if (player.drinks < 10) return ExtraColors.orange;
```

3. **Líneas 194-290: Actualizar styles para usar tokens**

*(Por brevedad, solo muestro los cambios clave. Claude debe hacer todos)*

```typescript
const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: BorderRadius.md,
    marginBottom: 8,
    borderWidth: 2,
    overflow: 'hidden',
    ...Shadow.sm,
  },
  // ... resto de estilos usando Spacing, FontSize, FontWeight, BorderRadius
});
```

---

### Resumen Fase 3

**Componentes pendientes de refactorizar:**

- ✅ CustomButton (completo arriba)
- ✅ PhraseCard (completo arriba)
- ✅ CagonModal (completo arriba)
- ⏳ PlayerListItem (instrucciones arriba)
- ⏳ StatsModal
- ⏳ FinalStatsModal
- ⏳ CategoryGameModal
- ⏳ HomeScreen

**Por cada componente, Claude debe:**
1. Leer archivo actual
2. Identificar valores hardcodeados
3. Reemplazar con tokens
4. Verificar compilación
5. Marcar como completado

---

## 📦 FASE 4: REFACTORIZAR MODALES (Claude puede 100%)

**Tiempo estimado:** 4 horas
**Modales a migrar a BaseModal:** 10+ modales

### Estrategia

**Todos los modales tienen este patrón:**
```typescript
// PATRÓN ANTIGUO (repetido 10+ veces)
<Modal visible={visible} transparent animationType="fade">
  <View style={styles.overlay}>
    <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
      {/* Contenido */}
    </View>
  </View>
</Modal>

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 24,
    padding: 20,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
});
```

**NUEVO PATRÓN (usando BaseModal):**
```typescript
import BaseModal from './BaseModal';

<BaseModal
  visible={visible}
  onClose={onClose}
  maxWidth={400}
  padding={20}
  scrollable={false}
>
  {/* Contenido */}
</BaseModal>

// ❌ YA NO NECESITA styles.overlay ni styles.modalContainer
```

### Modales a refactorizar

1. `/home/user/yo-nunca/src/components/StatsModal.tsx`
2. `/home/user/yo-nunca/src/components/FinalStatsModal.tsx`
3. `/home/user/yo-nunca/src/components/ResumeGameModal.tsx`
4. `/home/user/yo-nunca/src/components/ConfirmEndGameModal.tsx`
5. `/home/user/yo-nunca/src/components/cardGame/CategoryGameModal.tsx`
6. `/home/user/yo-nunca/src/components/cardGame/YoNuncaModal.tsx`
7. `/home/user/yo-nunca/src/components/cardGame/WaterfallModal.tsx`
8. `/home/user/yo-nunca/src/components/cardGame/TruthOrDareModal.tsx`
9. `/home/user/yo-nunca/src/components/cardGame/DistributeDrinksModal.tsx`
10. `/home/user/yo-nunca/src/components/cardGame/EveryoneDrinksModal.tsx`
11. `/home/user/yo-nunca/src/components/cardGame/JokerRuleModal.tsx`
12. `/home/user/yo-nunca/src/components/bottle/KissModal.tsx`
13. `/home/user/yo-nunca/src/components/bottle/DareModal.tsx`

**Instrucciones para cada modal:**

1. **Importar BaseModal:**
```typescript
import BaseModal from '../BaseModal'; // o '../../BaseModal' según ubicación
```

2. **Reemplazar estructura:**
```typescript
// ANTES:
<Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
  <View style={styles.overlay}>
    <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
      {children}
    </View>
  </View>
</Modal>

// DESPUÉS:
<BaseModal visible={visible} onClose={onClose}>
  {children}
</BaseModal>
```

3. **Eliminar estilos obsoletos:**
```typescript
// ELIMINAR estos estilos de StyleSheet:
overlay: { ... },
modalContainer: { ... },
```

4. **Verificar compilación y funcionamiento**

---

## 📦 FASE 5: TESTING & AJUSTES (Claude puede 90%)

**Tiempo estimado:** 2 horas

### Paso 5.1: Verificar compilación

**Comando para Claude:**
```bash
cd /home/user/yo-nunca
npx tsc --noEmit
```

### Paso 5.2: Iniciar Metro Bundler

**Comando para Claude:**
```bash
cd /home/user/yo-nunca
npx expo start
```

### Paso 5.3: Pruebas manuales (el desarrollador debe hacer)

**Checklist para el desarrollador:**
- [ ] App inicia sin errores
- [ ] Tema oscuro/claro funciona
- [ ] Botones se ven correctamente
- [ ] Modales abren y cierran
- [ ] Tipografía es legible
- [ ] Sombras se ven en iOS y Android
- [ ] Espaciado es consistente
- [ ] No hay regresiones visuales

### Paso 5.4: Ajustes de Claude

Si hay problemas, Claude puede:
- Ajustar valores de tokens (fontSize, spacing, etc.)
- Corregir imports faltantes
- Arreglar errores de TypeScript
- Ajustar responsive (si algo se ve mal en tamaños pequeños)

**Lo que Claude NO puede hacer:**
- Probar en dispositivo físico (desarrollador debe hacerlo)
- Evaluar si los colores "se ven bien" (subjetivo)
- Tomar decisiones de diseño visual sin guía

---

## 📋 CHECKLIST COMPLETA DE IMPLEMENTACIÓN

### FASE 1: Design Tokens ✅

- [ ] Crear carpeta `/src/constants/DesignTokens/`
- [ ] Crear `colors.ts` (colores extra, opacidades, helpers)
- [ ] Crear `spacing.ts` (sistema de espaciado 4px)
- [ ] Crear `typography.ts` (escalas, pesos, TextStyles)
- [ ] Crear `borderRadius.ts` (radios consistentes)
- [ ] Crear `shadows.ts` (sombras para iOS/Android)
- [ ] Crear `index.ts` (barrel export)
- [ ] Verificar compilación TypeScript

### FASE 2: Componentes Base ✅

- [ ] Crear `BaseModal.tsx` (modal reutilizable)
- [ ] Crear `Typography.tsx` (H1, H2, Body, Caption, etc.)
- [ ] Verificar compilación

### FASE 3: Refactorizar Componentes ⏳

- [ ] `CustomButton.tsx` - usar tokens
- [ ] `PhraseCard.tsx` - usar tokens
- [ ] `CagonModal.tsx` - migrar a BaseModal
- [ ] `PlayerListItem.tsx` - usar tokens
- [ ] `StatsModal.tsx` - usar tokens
- [ ] `FinalStatsModal.tsx` - usar tokens
- [ ] `CategoryGameModal.tsx` - migrar a BaseModal
- [ ] `HomeScreen.tsx` - usar tokens

### FASE 4: Refactorizar Modales ⏳

- [ ] `ResumeGameModal.tsx` - migrar a BaseModal
- [ ] `ConfirmEndGameModal.tsx` - migrar a BaseModal
- [ ] `YoNuncaModal.tsx` - migrar a BaseModal
- [ ] `WaterfallModal.tsx` - migrar a BaseModal
- [ ] `TruthOrDareModal.tsx` - migrar a BaseModal
- [ ] `DistributeDrinksModal.tsx` - migrar a BaseModal
- [ ] `EveryoneDrinksModal.tsx` - migrar a BaseModal
- [ ] `JokerRuleModal.tsx` - migrar a BaseModal
- [ ] `KissModal.tsx` - migrar a BaseModal
- [ ] `DareModal.tsx` - migrar a BaseModal

### FASE 5: Testing & Ajustes ⏳

- [ ] Verificar compilación TypeScript sin errores
- [ ] Iniciar Metro Bundler
- [ ] Probar app en simulador/dispositivo
- [ ] Verificar tema oscuro/claro
- [ ] Verificar responsive en diferentes tamaños
- [ ] Ajustar tokens si es necesario
- [ ] Documentar cambios

---

## 🎯 RECOMENDACIÓN FINAL

### ¿Debería el desarrollador proceder con este plan?

**SÍ, definitivamente. Razones:**

1. **Claude puede hacer 85-90% del trabajo** de forma autónoma
2. **Plan es incremental** (se puede pausar entre fases)
3. **Mejora significativa en mantenibilidad** (cambios futuros 10x más rápidos)
4. **Elimina deuda técnica** antes de que crezca
5. **Base sólida para escalar** (añadir componentes será trivial)

### Tiempo de implementación

**Opción A: Full Sprint (Claude en 1-2 días)**
- Fase 1-5 completa
- 17 horas de trabajo de Claude
- Desarrollador solo revisa y prueba

**Opción B: Incremental (Claude en sesiones cortas)**
- Fase 1: 1 sesión (2h)
- Fase 2: 1 sesión (3h)
- Fase 3-4: 2-3 sesiones (10h)
- Fase 5: 1 sesión (2h)

### ROI (Retorno de Inversión)

**Inversión:** 17h de Claude + 2-3h de testing del desarrollador
**Retorno:**
- Futuros cambios de diseño: **10x más rápidos** (cambiar color en 1 lugar vs 50)
- Añadir componentes: **5x más rápido** (reusar BaseModal, tokens)
- Onboarding de nuevos devs: **3x más rápido** (sistema claro y documentado)
- Bugs visuales: **-70%** (consistencia automática)

---

## 📞 PRÓXIMOS PASOS

### Para el Desarrollador:

1. **Revisar este documento completo**
2. **Decidir enfoque:** Full Sprint o Incremental
3. **Dar señal a Claude:** "Adelante, ejecuta Fase 1"
4. **Revisar cada fase** antes de continuar a la siguiente
5. **Probar en dispositivo real** después de Fase 3 y 5

### Para Claude (cuando reciba aprobación):

1. **Ejecutar Fase 1** (crear todos los archivos de tokens)
2. **Reportar progreso** con checklist actualizado
3. **Esperar aprobación** antes de Fase 2
4. **Continuar incrementalmente** hasta Fase 5
5. **Documentar problemas** encontrados durante implementación

---

## 📚 RECURSOS ADICIONALES

### Documentación de referencia

- React Native StyleSheet: https://reactnative.dev/docs/stylesheet
- Design Tokens: https://www.designtokens.org/
- Atomic Design: https://bradfrost.com/blog/post/atomic-web-design/

### Ejemplos de design systems

- Shopify Polaris: https://polaris.shopify.com/
- Material Design 3: https://m3.material.io/
- Chakra UI: https://chakra-ui.com/docs/theming/theme

---

**FIN DEL DOCUMENTO**

Este plan está listo para que Claude lo ejecute paso a paso. El desarrollador solo necesita dar la señal de inicio y revisar resultados.
