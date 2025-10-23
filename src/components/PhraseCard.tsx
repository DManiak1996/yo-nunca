/**
 * Tarjeta para mostrar frases del juego
 * Con animaciones y efectos visuales mejorados
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

interface PhraseCardProps {
  phrase: string;
}

const PhraseCard = React.memo(function PhraseCard({ phrase }: PhraseCardProps) {
  const { theme } = useTheme();

  // Ajustar tamaño de fuente según longitud de frase (responsive)
  const getFontSize = () => {
    const length = phrase.length;
    if (length < 30) return 28;
    if (length < 60) return 24;
    if (length < 100) return 22;
    return 20;
  };

  return (
    <View style={styles.cardContainer}>
      {/* Glow effect */}
      <View style={[styles.glowOuter, { backgroundColor: `${theme.primary}40` }]} />

      {/* Card con gradiente sutil */}
      <LinearGradient
        colors={[theme.cardBackground, `${theme.cardBackground}DD`]}
        style={[styles.card, { borderColor: `${theme.primary}60` }]}
      >
        <Text
          style={[
            styles.phraseText,
            { color: theme.text, fontSize: getFontSize() },
          ]}
        >
          Yo nunca{' '}
          <Text style={{ color: theme.primary, fontWeight: 'bold' }}>
            {phrase}
          </Text>
        </Text>
      </LinearGradient>
    </View>
  );
});

export default PhraseCard;

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
    borderRadius: 24,
    opacity: 0.3,
  },
  card: {
    borderRadius: 20,
    borderWidth: 2,
    padding: 32,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
  },
  phraseText: {
    textAlign: 'center',
    lineHeight: 36,
  },
});
