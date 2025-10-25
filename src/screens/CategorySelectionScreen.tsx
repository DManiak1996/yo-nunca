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
  Alert,
  TextInput,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList, DifficultyLevel, GameMode } from '../types';
import { useTheme } from '../context/ThemeContext';
import CagonModal from '../components/CagonModal';
import { moderateScale, verticalScale, scale, isSmallDevice } from '../utils/responsive';

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
   * FASE D - Multiplayer Local
   * Crear sala como host
   */
  const handleCreateRoom = () => {
    Alert.prompt(
      '🎮 Crear Sala Local',
      'Introduce tu nombre de jugador',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Crear',
          onPress: (hostName?: string) => {
            if (hostName && hostName.trim()) {
              navigation.navigate('LocalHost', { hostName: hostName.trim() });
            } else {
              Alert.alert('Error', 'El nombre no puede estar vacío');
            }
          },
        },
      ],
      'plain-text',
      '',
      'default'
    );
  };

  /**
   * FASE D - Multiplayer Local
   * Unirse a sala como cliente
   */
  const handleJoinRoom = () => {
    Alert.prompt(
      '🔗 Unirse a Sala',
      'Introduce tu nombre de jugador',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Continuar',
          onPress: (playerName?: string) => {
            if (playerName && playerName.trim()) {
              navigation.navigate('LocalJoin', { playerName: playerName.trim() });
            } else {
              Alert.alert('Error', 'El nombre no puede estar vacío');
            }
          },
        },
      ],
      'plain-text',
      '',
      'default'
    );
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
          >
            <Text style={[styles.modeButtonText, { color: gameMode === 'normal' ? '#FFF' : theme.text }]}>
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
          >
            <Text style={[styles.modeButtonText, { color: gameMode === 'detectives' ? '#FFF' : theme.text }]}>
              🕵️ Detectives
            </Text>
          </TouchableOpacity>
        </View>

        {gameMode === 'detectives' && (
          <Text style={[styles.modeDescription, { color: theme.textSecondary }]}>
            Vota quién crees que lo ha hecho. Los que fallen sus predicciones beben. Ideal para conocerse.
          </Text>
        )}
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

      {/* FASE D - Botones Multiplayer Local */}
      {/* TODO PRODUCCIÓN: Descomentar cuando se cree Development Build
          El multiplayer requiere react-native-tcp-socket que NO funciona en Expo Go
      */}
      {/* <View style={styles.multiplayerSection}>
        <Text style={[styles.multiplayerTitle, { color: theme.text }]}>
          🌐 Modo Multijugador Local
        </Text>
        <View style={styles.multiplayerButtons}>
          <TouchableOpacity
            style={[styles.multiplayerButton, { backgroundColor: theme.primary }]}
            onPress={handleCreateRoom}
            activeOpacity={0.8}
          >
            <Text style={styles.multiplayerButtonIcon}>🎮</Text>
            <Text style={styles.multiplayerButtonText}>Crear Sala</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.multiplayerButton, { backgroundColor: theme.secondary }]}
            onPress={handleJoinRoom}
            activeOpacity={0.8}
          >
            <Text style={styles.multiplayerButtonIcon}>🔗</Text>
            <Text style={styles.multiplayerButtonText}>Unirse a Sala</Text>
          </TouchableOpacity>
        </View>
      </View> */}

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
    padding: scale(16),
    alignItems: 'center',
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginBottom: verticalScale(6),
    textAlign: 'center',
  },
  subtitle: {
    fontSize: moderateScale(14),
    textAlign: 'center',
  },
  cardsContainer: {
    flex: 1,
    padding: scale(12),
    justifyContent: 'center',
    gap: verticalScale(isSmallDevice() ? 10 : 14),
  },
  cardWrapper: {
    width: '100%',
  },
  categoryCard: {
    padding: scale(14),
    borderRadius: moderateScale(14),
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    minHeight: verticalScale(isSmallDevice() ? 75 : 90),
    justifyContent: 'center',
  },
  cardIcon: {
    fontSize: moderateScale(32),
    marginBottom: verticalScale(6),
  },
  cardTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    color: '#FFF',
    textAlign: 'center',
    marginBottom: verticalScale(3),
  },
  cardSubtitle: {
    fontSize: moderateScale(12),
    color: 'rgba(255, 255, 255, 0.9)',
    textAlign: 'center',
  },
  footer: {
    padding: scale(16),
    alignItems: 'center',
  },
  footerText: {
    fontSize: moderateScale(11),
    textAlign: 'center',
    fontStyle: 'italic',
  },
  // V3.0 - Estilos para toggle de modo
  modeToggleContainer: {
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(12),
  },
  modeButtons: {
    flexDirection: 'row',
    gap: scale(10),
    marginBottom: verticalScale(10),
  },
  modeButton: {
    flex: 1,
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(12),
    borderRadius: moderateScale(10),
    alignItems: 'center',
  },
  modeButtonText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  modeDescription: {
    fontSize: moderateScale(11),
    textAlign: 'center',
    lineHeight: moderateScale(16),
  },
  // FASE D - Estilos multiplayer
  multiplayerSection: {
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
  },
  multiplayerTitle: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: verticalScale(12),
  },
  multiplayerButtons: {
    flexDirection: 'row',
    gap: scale(12),
  },
  multiplayerButton: {
    flex: 1,
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  multiplayerButtonIcon: {
    fontSize: moderateScale(20),
    marginBottom: verticalScale(4),
  },
  multiplayerButtonText: {
    color: '#FFF',
    fontSize: moderateScale(12),
    fontWeight: '600',
  },
});
