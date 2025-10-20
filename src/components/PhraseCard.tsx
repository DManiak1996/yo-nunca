/**
 * Tarjeta para mostrar frases del juego
 */

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface PhraseCardProps {
  phrase: string;
}

export default function PhraseCard({ phrase }: PhraseCardProps) {
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
    <View style={[styles.card, { backgroundColor: theme.cardBackground }]}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    padding: 32,
    minHeight: 200,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    width: '90%',
    alignSelf: 'center',
  },
  phraseText: {
    textAlign: 'center',
    lineHeight: 36,
  },
});
