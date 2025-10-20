/**
 * Pantalla principal del juego
 */

import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { usePhrases } from '../hooks/usePhrases';
import PhraseCard from '../components/PhraseCard';
import CustomButton from '../components/CustomButton';

export default function GameScreen() {
  const { theme } = useTheme();
  const {
    currentPhrase,
    phrasesCount,
    totalPhrases,
    nextPhrase,
    resetPool,
    isLoading,
  } = usePhrases();

  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.text }]}>
            Cargando frases...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!currentPhrase) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No hay frases disponibles
          </Text>
          <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
            Añade frases personalizadas desde "Mis Frases"
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Botón reiniciar arriba */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={resetPool} style={styles.resetButton}>
            <Text style={[styles.resetButtonText, { color: theme.primary }]}>
              ↻ Reiniciar
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tarjeta con frase actual */}
        <View style={styles.cardContainer}>
          <PhraseCard phrase={currentPhrase} />
        </View>

        {/* Botón siguiente */}
        <View style={styles.bottomContainer}>
          <CustomButton
            title="Siguiente"
            onPress={nextPhrase}
            variant="primary"
            style={styles.nextButton}
          />

          {/* Contador de frases */}
          <Text style={[styles.counter, { color: theme.textSecondary }]}>
            Quedan {phrasesCount} de {totalPhrases} frases
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingVertical: 12,
  },
  resetButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  resetButtonText: {
    fontSize: 18,
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomContainer: {
    paddingBottom: 30,
    gap: 12,
  },
  nextButton: {
    width: '100%',
  },
  counter: {
    textAlign: 'center',
    fontSize: 14,
  },
});
