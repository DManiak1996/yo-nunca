/**
 * Botón personalizado con variantes de estilo
 * V5.0 - Refactorizado con Design Tokens
 */

import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { moderateScale, verticalScale, scale } from '../utils/responsive';
import { colors, spacing, typography, shadows, borderRadius } from '../design-system/tokens';

interface CustomButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'danger';
  style?: object;
  disabled?: boolean; // V3.0 - Soporte para botones deshabilitados
  accessibilityLabel?: string; // V4.0 - Soporte TalkBack
  accessibilityHint?: string; // V4.0 - Soporte TalkBack
  accessibilityRole?: 'button' | 'none' | 'link' | 'search' | 'image' | 'keyboardkey' | 'text' | 'adjustable' | 'imagebutton' | 'header' | 'summary' | 'alert' | 'checkbox' | 'combobox' | 'menu' | 'menubar' | 'menuitem' | 'progressbar' | 'radio' | 'radiogroup' | 'scrollbar' | 'spinbutton' | 'switch' | 'tab' | 'tablist' | 'timer' | 'toolbar'; // V4.0 - Soporte TalkBack
}

export default function CustomButton({
  title,
  onPress,
  variant = 'primary',
  style,
  disabled = false,
  accessibilityLabel,
  accessibilityHint,
  accessibilityRole = 'button',
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
    return variant === 'primary' ? colors.text.inverse : colors.text.primary;
  };

  return (
    <Pressable
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        disabled && styles.disabled,
        style,
      ]}
      onPress={disabled ? undefined : onPress}
      disabled={disabled}
      accessibilityLabel={accessibilityLabel || title}
      accessibilityHint={accessibilityHint}
      accessibilityRole={accessibilityRole}
      accessibilityState={{ disabled }}
    >
      <Text style={[styles.text, { color: getTextColor() }, disabled && styles.disabledText]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: moderateScale(borderRadius.xl),
    paddingVertical: verticalScale(spacing.base),
    paddingHorizontal: scale(spacing.lg),
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 48, // V4.0 - Cumplir estándar de 48dp touch target
    ...shadows.md,
  },
  text: {
    fontSize: moderateScale(typography.fontSize.lg),
    fontWeight: typography.fontWeight.bold,
    fontFamily: typography.fontFamily.bodyBold,
  },
  disabled: {
    opacity: 0.5,
  },
  disabledText: {
    opacity: 0.7,
  },
});
