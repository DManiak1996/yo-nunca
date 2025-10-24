/**
 * Pantalla de selección de categoría/dificultad
 * Incluye botón troll "CAGÓN" y 3 niveles reales con nombres rotatorios
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
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, DifficultyLevel } from '../types';
import { useTheme } from '../context/ThemeContext';
import CagonModal from '../components/CagonModal';

type CategorySelectionScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CategorySelection'
>;

interface Props {
  navigation: CategorySelectionScreenNavigationProp;
}

// Nombres rotatorios para cada nivel
const MEDIO_NAMES = [
  "Tibio",
  "Calentando motores",
  "Mi primera vez...",
  "Empezamos suave",
  "Virgen pero desesperado",
];

const PICANTE_NAMES = [
  "Picante",
  "Ardiente",
  "Cachond@ pero no tanto",
  "Mi primer paso para la borrachera",
];

const MUY_PICANTE_NAMES = [
  "Soy un turbio",
  "Nah hoy de tranquis 😈",
  "Sin filtros",
  "A saco",
  "El que perdona murió en la cruz",
  "Si ya sabes cómo me pongo para qué me invitáis",
];

export default function CategorySelectionScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const [showCagonModal, setShowCagonModal] = useState(false);
  const [fadeAnim] = useState(new Animated.Value(0));

  // Seleccionar nombres aleatorios al montar el componente
  const [medioName] = useState(
    () => MEDIO_NAMES[Math.floor(Math.random() * MEDIO_NAMES.length)]
  );
  const [picanteName] = useState(
    () => PICANTE_NAMES[Math.floor(Math.random() * PICANTE_NAMES.length)]
  );
  const [muyPicanteName] = useState(
    () => MUY_PICANTE_NAMES[Math.floor(Math.random() * MUY_PICANTE_NAMES.length)]
  );

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  /**
   * Maneja la selección de categoría
   */
  const handleSelectCategory = (difficulty: DifficultyLevel) => {
    if (difficulty === 'cagon') {
      // Mostrar modal troll
      setShowCagonModal(true);
    } else {
      // Navegar a setup de jugadores
      navigation.navigate('PlayerSetup', { difficulty });
    }
  };

  /**
   * Renderiza una tarjeta de categoría
   */
  const renderCategoryCard = (
    title: string,
    subtitle: string,
    icon: string,
    difficulty: DifficultyLevel,
    backgroundColor: string,
    delay: number = 0
  ) => {
    return (
      <Animated.View
        style={[
          styles.cardWrapper,
          { opacity: fadeAnim, transform: [{ translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [50, 0],
          })}] },
        ]}
      >
        <TouchableOpacity
          style={[styles.categoryCard, { backgroundColor }]}
          onPress={() => handleSelectCategory(difficulty)}
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
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          ¿Qué mood tienes hoy?
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          Elige la categoria que más te guste
        </Text>
      </View>

      <View style={styles.cardsContainer}>
        {/* Botón CAGÓN (troll) */}
        {renderCategoryCard(
          "CAGÓN",
          "Para los que no se atreven",
          "🐔",
          "cagon",
          "#95a5a6", // Gris apagado
          0
        )}

        {/* Nivel Medio */}
        {renderCategoryCard(
          medioName,
          "Suave y divertido",
          "🍺",
          "medio",
          theme.success, // Verde oliva
          100
        )}

        {/* Nivel Picante */}
        {renderCategoryCard(
          picanteName,
          "Ahora la cosa se pone seria",
          "🌶️",
          "picante",
          "#E67E22", // Naranja
          200
        )}

        {/* Nivel Muy Picante */}
        {renderCategoryCard(
          muyPicanteName,
          "Solo para valientes",
          "🔥",
          "muy_picante",
          theme.danger, // Naranja terracota
          300
        )}
      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Los nombres cambian cada vez que entras 🎲
        </Text>
      </View>

      {/* Modal Cagón */}
      <CagonModal
        visible={showCagonModal}
        onClose={() => setShowCagonModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    gap: 16,
  },
  cardWrapper: {
    width: '100%',
  },
  categoryCard: {
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: 100,
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 13,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
