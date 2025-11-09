/**
 * Pantalla de selección de categoría/dificultad
 * Incluye botón troll "CAGÓN" y 3 niveles reales con nombres rotatorios
 * V2.0 - Refactorizado con Design Tokens
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, DifficultyLevel, GameMode } from '../types';
import { useTheme } from '../context/ThemeContext';
import CagonModal from '../components/CagonModal';
import BannerAdComponent from '../components/BannerAdComponent';
import { moderateScale, verticalScale, scale, isSmallDevice } from '../utils/responsive';
import { colors, spacing, typography, shadows, borderRadius } from '../design-system/tokens';

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
  const [gameMode, setGameMode] = useState<GameMode>('normal'); // V3.0 - Modo de juego

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
      // Navegar a setup de jugadores pasando gameMode
      navigation.navigate('PlayerSetup', { difficulty, gameMode }); // V3.0 - Pasar modo
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
          accessibilityLabel={`Categoría ${title}, ${icon}, ${subtitle}`}
          accessibilityHint="Toca dos veces para seleccionar esta categoría"
          accessibilityRole="button"
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

      {/* V3.0 - Toggle de modo de juego */}
      <View style={styles.modeToggleContainer}>
        <View style={styles.modeButtons}>
          <TouchableOpacity
            style={[
              styles.modeButton,
              gameMode === 'normal' && { backgroundColor: theme.primary },
              gameMode !== 'normal' && { backgroundColor: theme.cardBackground },
            ]}
            onPress={() => setGameMode('normal')}
            accessibilityLabel="Modo Normal"
            accessibilityHint="Toca dos veces para seleccionar el modo de juego normal"
            accessibilityRole="button"
            accessibilityState={{ selected: gameMode === 'normal' }}
          >
            <Text style={[styles.modeButtonText, { color: gameMode === 'normal' ? colors.text.primary : theme.text }]}>
              🍺 Normal
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.modeButton,
              gameMode === 'detectives' && { backgroundColor: theme.primary },
              gameMode !== 'detectives' && { backgroundColor: theme.cardBackground },
            ]}
            onPress={() => setGameMode('detectives')}
            accessibilityLabel="Modo Detectives"
            accessibilityHint="Toca dos veces para seleccionar el modo de juego Detectives"
            accessibilityRole="button"
            accessibilityState={{ selected: gameMode === 'detectives' }}
          >
            <Text style={[styles.modeButtonText, { color: gameMode === 'detectives' ? colors.text.primary : theme.text }]}>
              🕵️ Detectives
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Contenedor de explicación con altura fija */}
      <View style={styles.explanationContainer}>
        {gameMode === 'detectives' && (
          <Text style={[styles.explanationText, { color: theme.textSecondary }]}>
            🕵️ MODO DETECTIVES{'\n'}
            Cada pregunta que lea, los jugadores votarán quién creen que lo ha hecho.{'\n'}
            El jugador con más votos pierde una vida. ¡Descubre los secretos de tus amigos!
          </Text>
        )}
      </View>

      <ScrollView style={styles.categoriesScroll} contentContainerStyle={styles.cardsContainer}>
        {/* Botón CAGÓN (troll) */}
        {renderCategoryCard(
          "CAGÓN",
          "Para los que no se atreven",
          "🐔",
          "cagon",
          colors.neutral[500], // Gris apagado
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
          colors.categories.hot, // Naranja
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
      </ScrollView>

      {/* Banner AdMob */}
      <BannerAdComponent style={styles.adContainer} />

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
    padding: scale(spacing.base),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(typography.fontSize['2xl']),
    fontWeight: 'bold',
    marginBottom: verticalScale(spacing.xs),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(typography.fontSize.xs),
    textAlign: 'center',
  },
  categoriesScroll: {
    flex: 1,
  },
  cardsContainer: {
    padding: scale(spacing.sm),
    paddingBottom: verticalScale(spacing.lg),
    gap: verticalScale(isSmallDevice() ? spacing.sm : spacing.md),
  },
  cardWrapper: {
    width: '100%',
  },
  categoryCard: {
    padding: scale(spacing.lg), // AUMENTADO de spacing.sm a spacing.lg
    borderRadius: moderateScale(borderRadius.xl), // AUMENTADO de borderRadius.lg a borderRadius.xl
    alignItems: 'center',
    ...shadows.lg, // AUMENTADO de shadows.md a shadows.lg
    borderWidth: 2,
    borderColor: colors.overlay.light,
    minHeight: verticalScale(isSmallDevice() ? 100 : 120), // AUMENTADO de 60-70 a 100-120
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: moderateScale(typography.fontSize['3xl']), // AUMENTADO de 2xl a 3xl
    marginBottom: verticalScale(spacing.xs),
  },
  cardTitle: {
    fontSize: moderateScale(typography.fontSize.lg), // AUMENTADO de sm a lg
    fontWeight: 'bold',
    color: colors.text.primary,
    textAlign: 'center',
    marginBottom: verticalScale(4), // AUMENTADO de 2 a 4
  },
  cardSubtitle: {
    fontSize: moderateScale(typography.fontSize.sm), // AUMENTADO de xs a sm
    color: colors.text.secondary,
    textAlign: 'center',
  },
  // V3.0 - Estilos para toggle de modo
  modeToggleContainer: {
    paddingHorizontal: scale(spacing.md),
    paddingTop: verticalScale(spacing.xs),
  },
  modeButtons: {
    flexDirection: 'row',
    gap: scale(spacing.sm),
  },
  modeButton: {
    flex: 1,
    paddingVertical: verticalScale(spacing.sm),
    paddingHorizontal: scale(spacing.sm),
    borderRadius: moderateScale(borderRadius.md),
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: moderateScale(typography.fontSize.xs),
    fontWeight: typography.fontWeight.bold,
  },
  // Contenedor de explicación con altura fija para evitar desplazamiento
  explanationContainer: {
    minHeight: verticalScale(100), // Espacio fijo para el texto explicativo
    paddingHorizontal: scale(spacing.lg),
    paddingTop: verticalScale(spacing.sm),
    justifyContent: 'center',
  },
  explanationText: {
    fontSize: moderateScale(typography.fontSize.sm),
    fontFamily: typography.fontFamily.body,
    textAlign: 'center',
    lineHeight: moderateScale(typography.fontSize.sm * typography.lineHeight.relaxed),
  },
  // Banner AdMob
  adContainer: {
    marginTop: verticalScale(spacing.md),
    marginBottom: verticalScale(spacing.sm),
    opacity: 0.9,
  },
});
