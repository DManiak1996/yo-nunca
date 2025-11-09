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
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { moderateScale, verticalScale, scale } from '../utils/responsive';
import CustomButton from '../components/CustomButton';

type GameSelectionNavigationProp = StackNavigationProp<RootStackParamList, 'GameSelection'>;

interface GameSelectionScreenProps {
  navigation: GameSelectionNavigationProp;
}

type GameType = 'yo-nunca' | 'rey-copas' | 'botella';

interface GameInfo {
  title: string;
  icon: string;
  description: string;
  rules: string[];
  minPlayers: number;
  maxPlayers: number;
}

const GAME_INFO: Record<GameType, GameInfo> = {
  'yo-nunca': {
    title: 'Yo Nunca',
    icon: '🍺',
    description: 'El clásico juego de preguntas donde descubrirás secretos y anécdotas de tus amigos.',
    rules: [
      'Cada jugador lee una frase que empieza con "Yo nunca..."',
      'Quien SÍ haya hecho esa acción, bebe',
      'Puedes elegir entre modo Clásico o Detective',
      'Hay diferentes categorías disponibles',
    ],
    minPlayers: 2,
    maxPlayers: 10,
  },
  'rey-copas': {
    title: 'El Rey de Copas',
    icon: '🃏',
    description: 'Juego de cartas españolas donde cada carta tiene un efecto único y sorprendente.',
    rules: [
      'Cada jugador roba una carta en su turno',
      'Cada carta tiene un efecto especial (repartir tragos, verdad o reto, cascada, etc.)',
      'Los Jokers permiten crear reglas personalizadas',
      'El juego continúa hasta que se acabe el mazo',
    ],
    minPlayers: 2,
    maxPlayers: 10,
  },
  'botella': {
    title: 'La Botella',
    icon: '🍾',
    description: 'Gira la botella y afronta los retos que te esperan.',
    rules: [
      'Un jugador gira la botella virtual',
      'La botella señala a un jugador al azar',
      'El jugador elegido debe completar un reto o pregunta',
      'Ideal para romper el hielo en reuniones',
    ],
    minPlayers: 3,
    maxPlayers: 10,
  },
};

export default function GameSelectionScreen({ navigation }: GameSelectionScreenProps) {
  const { theme } = useTheme();
  const [fadeAnim] = useState(new Animated.Value(0));
  const [selectedGame, setSelectedGame] = useState<GameType | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // Animación de entrada
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();
  }, []);

  /**
   * Abre el modal con la info del juego
   */
  const handleGamePress = (gameType: GameType) => {
    setSelectedGame(gameType);
    setShowModal(true);
  };

  /**
   * Navega al juego seleccionado
   */
  const handlePlayGame = () => {
    setShowModal(false);

    if (selectedGame === 'yo-nunca') {
      navigation.navigate('CategorySelection');
    } else if (selectedGame === 'rey-copas') {
      navigation.navigate('PlayerSetup', { difficulty: 'medio', gameType: 'cardgame' });
    } else if (selectedGame === 'botella') {
      navigation.navigate('PlayerSetup', { difficulty: 'medio', gameType: 'bottle' });
    }
  };

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
          () => handleGamePress('yo-nunca')
        )}

        {/* El Rey de Copas */}
        {renderGameCard(
          "El Rey de Copas",
          "Juego de cartas españolas",
          "🃏",
          "#E67E22", // Naranja
          () => handleGamePress('rey-copas')
        )}

        {/* La Botella */}
        {renderGameCard(
          "La Botella",
          "Gira la botella y atrévete",
          "🍾",
          theme.danger,
          () => handleGamePress('botella')
        )}
      </View>

      {/* Footer con info */}
      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: theme.textSecondary }]}>
          Selecciona un juego para comenzar
        </Text>
      </View>

      {/* MODAL DE INFORMACIÓN DEL JUEGO */}
      <Modal
        visible={showModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
            {selectedGame && (
              <>
                {/* Header del modal */}
                <View style={styles.modalHeader}>
                  <Text style={styles.modalIcon}>{GAME_INFO[selectedGame].icon}</Text>
                  <Text style={[styles.modalTitle, { color: theme.text }]}>
                    {GAME_INFO[selectedGame].title}
                  </Text>
                </View>

                {/* Descripción */}
                <ScrollView style={styles.modalContent} showsVerticalScrollIndicator={false}>
                  <Text style={[styles.modalDescription, { color: theme.textSecondary }]}>
                    {GAME_INFO[selectedGame].description}
                  </Text>

                  {/* Reglas */}
                  <View style={styles.rulesSection}>
                    <Text style={[styles.rulesTitle, { color: theme.text }]}>
                      📋 Cómo se juega:
                    </Text>
                    {GAME_INFO[selectedGame].rules.map((rule, index) => (
                      <View key={index} style={styles.ruleItem}>
                        <Text style={[styles.ruleBullet, { color: theme.primary }]}>•</Text>
                        <Text style={[styles.ruleText, { color: theme.text }]}>
                          {rule}
                        </Text>
                      </View>
                    ))}
                  </View>

                  {/* Info de jugadores */}
                  <View style={[styles.playersInfo, { backgroundColor: theme.background }]}>
                    <Text style={[styles.playersInfoText, { color: theme.textSecondary }]}>
                      👥 {GAME_INFO[selectedGame].minPlayers}-{GAME_INFO[selectedGame].maxPlayers} jugadores
                    </Text>
                  </View>
                </ScrollView>

                {/* Botones */}
                <View style={styles.modalActions}>
                  <CustomButton
                    title="Cancelar"
                    onPress={() => setShowModal(false)}
                    variant="secondary"
                    style={styles.modalButton}
                  />
                  <CustomButton
                    title="¡Jugar!"
                    onPress={handlePlayGame}
                    variant="primary"
                    style={styles.modalButton}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Modal>
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
  // Modal styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  modalContainer: {
    width: '100%',
    maxWidth: scale(500),
    maxHeight: '80%',
    borderRadius: moderateScale(20),
    padding: scale(24),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  modalHeader: {
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  modalIcon: {
    fontSize: moderateScale(64),
    marginBottom: verticalScale(12),
  },
  modalTitle: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalContent: {
    maxHeight: verticalScale(350),
    marginBottom: verticalScale(20),
  },
  modalDescription: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    lineHeight: moderateScale(24),
    marginBottom: verticalScale(20),
  },
  rulesSection: {
    marginBottom: verticalScale(20),
  },
  rulesTitle: {
    fontSize: moderateScale(18),
    fontWeight: 'bold',
    marginBottom: verticalScale(12),
  },
  ruleItem: {
    flexDirection: 'row',
    marginBottom: verticalScale(10),
    paddingRight: scale(8),
  },
  ruleBullet: {
    fontSize: moderateScale(18),
    marginRight: scale(8),
    marginTop: verticalScale(2),
  },
  ruleText: {
    flex: 1,
    fontSize: moderateScale(14),
    lineHeight: moderateScale(20),
  },
  playersInfo: {
    padding: scale(12),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  playersInfoText: {
    fontSize: moderateScale(14),
    fontWeight: '600',
  },
  modalActions: {
    flexDirection: 'row',
    gap: scale(12),
    marginTop: verticalScale(8),
  },
  modalButton: {
    flex: 1,
  },
});
