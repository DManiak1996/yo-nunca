/**
 * Pantalla de selección de juegos
 * Permite elegir entre los 3 juegos disponibles con diseño de tarjetas
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { moderateScale, verticalScale, scale } from '../utils/responsive';

type GameSelectionNavigationProp = StackNavigationProp<RootStackParamList, 'GameSelection'>;

interface GameSelectionScreenProps {
  navigation: GameSelectionNavigationProp;
}

export default function GameSelectionScreen({ navigation }: GameSelectionScreenProps) {
  const { theme } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  /**
   * Renderiza una tarjeta de juego
   */
  const renderGameCard = (
    title: string,
    subtitle: string,
    icon: string,
    backgroundColor: string,
    onPress: () => void
  ) => {
    return (
      <Animated.View
        style={[
          styles.cardWrapper,
          {
            opacity: fadeAnim,
            transform: [{
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              })
            }]
          },
        ]}
      >
        <TouchableOpacity
          style={[styles.gameCard, { backgroundColor }]}
          onPress={onPress}
          activeOpacity={0.8}
        >
          <Text style={styles.cardIcon}>{icon}</Text>
          <Text style={styles.cardTitle}>{title}</Text>
          <Text style={styles.cardSubtitle}>{subtitle}</Text>
        </TouchableOpacity>
      </Animated.View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={[styles.backIcon, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.title, { color: theme.text }]}>
          ¿A qué jugamos?
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Elige tu juego favorito
        </Text>
      </View>

      {/* Tarjetas de juegos */}
      <View style={styles.cardsContainer}>
        {/* Yo Nunca */}
        {renderGameCard(
          "Yo Nunca",
          "El clásico juego de preguntas",
          "🍺",
          theme.primary,
          () => navigation.navigate('CategorySelection')
        )}

        {/* El Rey de Copas */}
        {renderGameCard(
          "El Rey de Copas",
          "Juego de cartas españolas",
          "🃏",
          "#E67E22", // Naranja
          () => navigation.navigate('PlayerSetup', { difficulty: 'medio', gameType: 'cardgame' })
        )}

        {/* La Botella */}
        {renderGameCard(
          "La Botella",
          "Gira la botella y atrévete",
          "🍾",
          theme.danger,
          () => navigation.navigate('PlayerSetup', { difficulty: 'medio', gameType: 'bottle' })
        )}
      </View>

      {/* Footer con info */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Selecciona un juego para comenzar
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    marginBottom: verticalScale(20),
  },
  backButton: {
    padding: scale(8),
    alignSelf: 'flex-start',
    marginBottom: verticalScale(10),
  },
  backIcon: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  title: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  subtitle: {
    fontSize: moderateScale(16),
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    paddingHorizontal: scale(20),
    gap: verticalScale(16),
  },
  cardWrapper: {
    flex: 1,
  },
  gameCard: {
    flex: 1,
    borderRadius: 20,
    padding: scale(24),
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  cardIcon: {
    fontSize: moderateScale(64),
    marginBottom: verticalScale(12),
  },
  cardTitle: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  cardSubtitle: {
    fontSize: moderateScale(14),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  footer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(30),
    alignItems: 'center',
  },
  footerText: {
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
});
