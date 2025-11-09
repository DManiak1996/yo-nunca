/**
 * 🃏 PANTALLA: EL REY DE COPAS
 *
 * Juego de cartas con baraja española (50 cartas)
 * Cada carta tiene un efecto único
 *
 * CAMBIOS V4.1:
 * - Fondo blanco
 * - Layout vertical (3/4 para carta)
 * - Imagen trasera de carta como botón de revelar
 * - Animación flip lateral
 * - Resultado en modal
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Animated,
  Dimensions,
  Image,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useCardGame, getCardDisplayName, getSuitEmoji } from '../hooks/useCardGame';
import { Card, DrinkDistribution } from '../types/cardGame';
import CustomButton from '../components/CustomButton';
import DistributeDrinksModal from '../components/cardGame/DistributeDrinksModal';
import YoNuncaModal from '../components/cardGame/YoNuncaModal';
import TruthOrDareModal from '../components/cardGame/TruthOrDareModal';
import EveryoneDrinksModal from '../components/cardGame/EveryoneDrinksModal';
import CategoryGameModal from '../components/cardGame/CategoryGameModal';
import WaterfallModal from '../components/cardGame/WaterfallModal';
import JokerRuleModal from '../components/cardGame/JokerRuleModal';
import { triggerHaptic } from '../utils/haptics';
import { scale, moderateScale, verticalScale } from '../utils/responsive';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

type CardGameScreenNavigationProp = StackNavigationProp<RootStackParamList, 'CardGame'>;
type CardGameScreenRouteProp = RouteProp<RootStackParamList, 'CardGame'>;

interface Props {
  navigation: CardGameScreenNavigationProp;
  route: CardGameScreenRouteProp;
}

export default function CardGameScreen({ navigation, route }: Props) {
  const { players: initialPlayers, startingPlayerIndex = 0 } = route.params;
  const { theme } = useTheme();

  // Sistema de turnos
  const [currentPlayerIndex, setCurrentPlayerIndex] = useState(startingPlayerIndex);
  const currentPlayer = initialPlayers[currentPlayerIndex];

  // Hook del juego de cartas
  const {
    state,
    drawCard,
    resetDeck,
    getRemainingCards,
    getCurrentCardInfo,
    incrementEveryoneDrinks,
    everyoneDrinksCount,
    toggleNoEyeContact,
    activeRules,
    addJokerRule,
    removeJokerRule,
    noEyeContactPlayers,
  } = useCardGame({
    players: initialPlayers,
    includeJokers: true,
    shuffleOnStart: true,
  });

  /**
   * Pasa al siguiente jugador
   */
  const nextPlayer = useCallback(() => {
    setCurrentPlayerIndex((prev) => (prev + 1) % initialPlayers.length);
  }, [initialPlayers.length]);

  // Animación flip
  const flipAnim = useRef(new Animated.Value(0)).current;
  const [isFlipping, setIsFlipping] = useState(false);
  const [revealedCard, setRevealedCard] = useState<Card | null>(null);

  // Modal de resultado
  const [showResultModal, setShowResultModal] = useState(false);
  const [currentCardEffect, setCurrentCardEffect] = useState<Card | null>(null);

  // Estados de modales de efectos
  const [showDistributeDrinks, setShowDistributeDrinks] = useState(false);
  const [showYoNunca, setShowYoNunca] = useState(false);
  const [showTruthOrDare, setShowTruthOrDare] = useState(false);
  const [showEveryoneDrinks, setShowEveryoneDrinks] = useState(false);
  const [showCategories, setShowCategories] = useState(false);
  const [showWaterfall, setShowWaterfall] = useState(false);
  const [showJokerRule, setShowJokerRule] = useState(false);

  /**
   * Interpolación para el flip
   * 0deg = Trasera visible (PNG)
   * 180deg = Frontal visible (carta revelada)
   */
  const backInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['0deg', '180deg'],
  });

  const frontInterpolate = flipAnim.interpolate({
    inputRange: [0, 180],
    outputRange: ['180deg', '360deg'],
  });

  /**
   * Observa cambios en currentCard del hook
   */
  useEffect(() => {
    const cardInfo = getCurrentCardInfo();
    if (cardInfo && cardInfo.card !== revealedCard && !isFlipping) {
      const card = cardInfo.card;

      // Guardar la carta ANTES de iniciar animación
      setRevealedCard(card);
      setIsFlipping(true);

      // Pequeño delay para asegurar que revealedCard se actualiza
      setTimeout(() => {
        // Animación flip de trasera (0) a frontal (180)
        Animated.timing(flipAnim, {
          toValue: 180,
          duration: 600,
          useNativeDriver: true,
        }).start(() => {
          setIsFlipping(false);
          // Mostrar modal de resultado después del flip
          setTimeout(() => {
            setCurrentCardEffect(card);
            setShowResultModal(true);
          }, 200);
        });
      }, 50);
    }
  }, [state.currentCard]);

  /**
   * Forzar render inicial de la imagen al montar el componente
   */
  const [imageLoaded, setImageLoaded] = useState(false);
  useEffect(() => {
    // Forzar actualización después del montaje para asegurar render de imagen
    const timer = setTimeout(() => setImageLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  /**
   * Maneja el evento de robar una carta
   */
  const handleDrawCard = async () => {
    if (isFlipping) return;

    await triggerHaptic('medium');
    drawCard(); // La carta se actualiza en el state y el useEffect la maneja
  };

  /**
   * Cierra el modal de resultado y ejecuta el efecto
   */
  const handleContinueFromResult = () => {
    setShowResultModal(false);

    if (currentCardEffect) {
      // Ejecutar efecto después de cerrar modal
      setTimeout(() => handleCardEffect(currentCardEffect), 300);
    }
  };

  /**
   * Reinicia la carta para el siguiente turno
   */
  const handleResetForNextCard = () => {
    // Resetear animación a posición inicial (trasera visible)
    Animated.timing(flipAnim, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start(() => {
      // Pasar al siguiente jugador después de la animación
      nextPlayer();
    });
  };

  /**
   * Ejecuta el efecto de la carta
   */
  const handleCardEffect = (card: Card) => {
    const { effect } = card;

    switch (effect) {
      case 'distribute_drinks':
        setShowDistributeDrinks(true);
        break;

      case 'yo_nunca':
        setShowYoNunca(true);
        break;

      case 'truth_or_dare':
        setShowTruthOrDare(true);
        break;

      case 'you_drink':
        handleYouDrink();
        break;

      case 'everyone_drinks':
        handleEveryoneDrinksEffect();
        break;

      case 'categories':
        setShowCategories(true);
        break;

      case 'no_eye_contact':
        handleNoEyeContactEffect();
        break;

      case 'waterfall':
        setShowWaterfall(true);
        break;

      case 'joker_rule':
        setShowJokerRule(true);
        break;

      default:
        break;
    }
  };

  /**
   * Efecto Carta 8: Tú Bebes
   */
  const handleYouDrink = () => {
    Alert.alert(
      '¡Tú bebes! 🍺',
      `${currentPlayer.name}, te toca beber 1 trago.`,
      [{ text: '¡Salud!', onPress: () => { triggerHaptic('medium'); handleResetForNextCard(); } }]
    );
  };

  /**
   * Efecto Carta 9: Todos Beben (Progresivo)
   */
  const handleEveryoneDrinksEffect = () => {
    incrementEveryoneDrinks();
    setShowEveryoneDrinks(true);
  };

  /**
   * Efecto Carta Caballo: No mirar a los ojos
   */
  const handleNoEyeContactEffect = () => {
    toggleNoEyeContact(currentPlayer.id);

    Alert.alert(
      '🚫 No mirar a los ojos',
      `${currentPlayer.name}, no puedes mirar a nadie a los ojos hasta que salga otro Caballo.`,
      [{ text: 'Entendido', onPress: () => { triggerHaptic('medium'); handleResetForNextCard(); } }]
    );
  };

  /**
   * Callback de DistributeDrinksModal
   */
  const handleDistributeDrinksConfirm = (distribution: DrinkDistribution[]) => {
    console.log('Tragos distribuidos:', distribution);
    setShowDistributeDrinks(false);
    handleResetForNextCard();
  };

  /**
   * Obtiene descripción del efecto de la carta
   */
  const getCardEffectDescription = (card: Card): string => {
    switch (card.effect) {
      case 'distribute_drinks':
        return `Reparte ${card.value} trago${card.value === 1 ? '' : 's'}`;
      case 'yo_nunca':
        return 'Yo Nunca';
      case 'truth_or_dare':
        return 'Verdad o Reto';
      case 'you_drink':
        return '¡Tú bebes!';
      case 'everyone_drinks':
        return `¡Todos beben! (${everyoneDrinksCount + 1} trago${everyoneDrinksCount === 0 ? '' : 's'})`;
      case 'categories':
        return 'Categorías';
      case 'no_eye_contact':
        return 'No mirar a los ojos';
      case 'waterfall':
        return 'Cascada';
      case 'joker_rule':
        return '🤡 El Payaso hace de las suyas';
      default:
        return '';
    }
  };

  /**
   * Maneja el botón "Volver"
   */
  const handleGoBack = () => {
    Alert.alert(
      'Salir del juego',
      '¿Seguro que quieres salir? Se perderá el progreso.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Salir',
          style: 'destructive',
          onPress: () => navigation.goBack(),
        },
      ]
    );
  };

  /**
   * Reinicia el juego
   */
  const handleResetGame = () => {
    Alert.alert(
      'Reiniciar juego',
      '¿Quieres empezar de nuevo con un mazo completo?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Reiniciar',
          onPress: () => {
            resetDeck();
            setRevealedCard(null);
            flipAnim.setValue(0);
          },
        },
      ]
    );
  };

  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {/* Info jugador actual y cartas restantes */}
        <View style={styles.topInfo}>
          <TouchableOpacity onPress={handleGoBack} style={styles.backButton}>
            <Text style={[styles.backIcon, { color: theme.text }]}>←</Text>
          </TouchableOpacity>
          <View style={styles.playerTurnInfo}>
            <Text style={[styles.turnLabel, { color: theme.textSecondary }]}>Turno de:</Text>
            <Text style={[styles.currentPlayerName, { color: theme.primary }]}>
              {currentPlayer.name}
            </Text>
          </View>
          <View style={styles.cardsInfo}>
            <Text style={[styles.cardsCount, { color: theme.primary }]}>
              {getRemainingCards()}
            </Text>
            <Text style={[styles.cardsLabel, { color: theme.textSecondary }]}>cartas</Text>
          </View>
        </View>

        {/* Área de carta (mayor espacio) */}
        <View style={styles.cardArea}>
          <TouchableOpacity
            onPress={handleDrawCard}
            disabled={isFlipping}
            activeOpacity={0.9}
            style={styles.cardTouchable}
          >
            {/* Carta trasera (dorso) */}
            <Animated.View style={[styles.cardFace, styles.cardBack, backAnimatedStyle]}>
              <Image
                key={`card-back-${imageLoaded}`}
                source={require('../data/cardGame/trasera carta.png')}
                style={styles.cardImage}
                resizeMode="contain"
              />
              {!revealedCard && (
                <View style={styles.tapHint}>
                  <Text style={styles.tapHintText}>👆 Toca para revelar</Text>
                </View>
              )}
            </Animated.View>

            {/* Carta frontal (revelada) */}
            <Animated.View style={[styles.cardFace, styles.cardFront, frontAnimatedStyle]}>
              {revealedCard && (
                <View style={styles.revealedCard}>
                  <Text style={styles.cardSuitEmoji}>{getSuitEmoji(revealedCard.suit)}</Text>
                  <Text style={styles.cardName}>
                    {getCardDisplayName(revealedCard)}
                  </Text>
                  <View style={styles.divider} />
                  <Text style={styles.cardEffect}>
                    {getCardEffectDescription(revealedCard)}
                  </Text>
                </View>
              )}
            </Animated.View>
          </TouchableOpacity>
        </View>

        {/* Información adicional inferior */}
        <View style={styles.infoArea}>
          {/* Reglas activas del Joker */}
          {activeRules.length > 0 && (
            <View style={styles.activeRulesContainer}>
              <Text style={styles.activeRulesTitle}>
                ⚠️ Reglas Activas ({activeRules.length}/2):
              </Text>
              {activeRules.map((rule) => (
                <Text key={rule.id} style={styles.ruleText}>
                  • {rule.description}
                </Text>
              ))}
            </View>
          )}

          {/* No mirar a los ojos */}
          {noEyeContactPlayers.length > 0 && (
            <View style={styles.noEyeContactContainer}>
              <Text style={styles.noEyeContactTitle}>🚫 No mirar a los ojos:</Text>
              {noEyeContactPlayers.map((playerId) => {
                const player = state.players.find((p) => p.id === playerId);
                return (
                  <Text key={playerId} style={styles.noEyeContactPlayer}>
                    • {player?.name || 'Desconocido'}
                  </Text>
                );
              })}
            </View>
          )}

          {/* Botón reiniciar */}
          <TouchableOpacity
            style={[styles.resetButton, { backgroundColor: theme.cardBackground }]}
            onPress={handleResetGame}
          >
            <Text style={[styles.resetButtonText, { color: theme.text }]}>↻ Reiniciar Mazo</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MODAL DE RESULTADO DE CARTA */}
      <Modal
        visible={showResultModal}
        transparent
        animationType="fade"
        onRequestClose={handleContinueFromResult}
      >
        <View style={styles.resultModalOverlay}>
          <View style={styles.resultModalContent}>
            {currentCardEffect && (
              <>
                <Text style={styles.resultEmoji}>{getSuitEmoji(currentCardEffect.suit)}</Text>
                <Text style={styles.resultTitle}>
                  {getCardDisplayName(currentCardEffect)}
                </Text>
                <View style={styles.resultDivider} />
                <Text style={styles.resultEffect}>
                  {getCardEffectDescription(currentCardEffect)}
                </Text>
                <CustomButton
                  title="Continuar"
                  onPress={handleContinueFromResult}
                  variant="primary"
                  style={styles.resultButton}
                />
              </>
            )}
          </View>
        </View>
      </Modal>

      {/* MODALES DE EFECTOS DE CARTAS */}

      {/* Cartas 1-5: Repartir tragos */}
      {currentCardEffect && currentCardEffect.effect === 'distribute_drinks' && (
        <DistributeDrinksModal
          visible={showDistributeDrinks}
          totalDrinks={typeof currentCardEffect.value === 'number' ? currentCardEffect.value : 1}
          currentPlayer={currentPlayer}
          allPlayers={state.players}
          onConfirm={handleDistributeDrinksConfirm}
          onClose={() => {
            setShowDistributeDrinks(false);
            handleResetForNextCard();
          }}
        />
      )}

      {/* Carta 6: Yo Nunca */}
      <YoNuncaModal
        visible={showYoNunca}
        onContinue={() => {
          setShowYoNunca(false);
          handleResetForNextCard();
        }}
      />

      {/* Carta 7: Verdad o Reto */}
      <TruthOrDareModal
        visible={showTruthOrDare}
        currentPlayer={state.players[0]}
        onContinue={() => {
          setShowTruthOrDare(false);
          handleResetForNextCard();
        }}
      />

      {/* Carta 9: Todos Beben */}
      <EveryoneDrinksModal
        visible={showEveryoneDrinks}
        drinkCount={everyoneDrinksCount}
        onContinue={() => {
          setShowEveryoneDrinks(false);
          handleResetForNextCard();
        }}
      />

      {/* Carta Sota: Categorías */}
      <CategoryGameModal
        visible={showCategories}
        onContinue={() => {
          setShowCategories(false);
          handleResetForNextCard();
        }}
      />

      {/* Carta Rey: Cascada */}
      <WaterfallModal
        visible={showWaterfall}
        currentPlayer={state.players[0]}
        allPlayers={state.players}
        onContinue={() => {
          setShowWaterfall(false);
          handleResetForNextCard();
        }}
      />

      {/* Carta Joker: Regla del Payaso */}
      <JokerRuleModal
        visible={showJokerRule}
        activeRules={activeRules}
        onAddRule={addJokerRule}
        onRemoveRule={removeJokerRule}
        onClose={() => {
          setShowJokerRule(false);
          handleResetForNextCard();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF6F1', // Beige/crema claro
  },
  content: {
    flex: 1,
  },
  topInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(10),
    paddingBottom: verticalScale(16),
  },
  backButton: {
    padding: scale(8),
  },
  backIcon: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  playerTurnInfo: {
    flex: 1,
    alignItems: 'center',
  },
  turnLabel: {
    fontSize: moderateScale(12),
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  currentPlayerName: {
    fontSize: moderateScale(24),
    fontWeight: 'bold',
  },
  cardsInfo: {
    alignItems: 'center',
  },
  cardsCount: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  cardsLabel: {
    fontSize: moderateScale(12),
  },
  cardArea: {
    flex: 3, // 3/4 de la pantalla
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  cardTouchable: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardFace: {
    position: 'absolute',
    width: '90%',
    height: '95%',
    backfaceVisibility: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardBack: {
    backgroundColor: 'transparent',
  },
  cardFront: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(20),
    borderWidth: 3,
    borderColor: '#D4AF37', // Dorado
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: moderateScale(20),
  },
  tapHint: {
    position: 'absolute',
    bottom: verticalScale(20),
    backgroundColor: 'rgba(0,0,0,0.7)',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(10),
    borderRadius: moderateScale(20),
  },
  tapHintText: {
    color: '#FFF',
    fontSize: moderateScale(16),
    fontWeight: 'bold',
  },
  revealedCard: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: scale(20),
  },
  cardSuitEmoji: {
    fontSize: moderateScale(80),
    marginBottom: verticalScale(16),
  },
  cardName: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#D4AF37',
    marginBottom: verticalScale(12),
    textAlign: 'center',
  },
  divider: {
    width: '80%',
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: verticalScale(16),
  },
  cardEffect: {
    fontSize: moderateScale(22),
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
  },
  infoArea: {
    flex: 1, // 1/4 de la pantalla
    paddingHorizontal: scale(16),
    paddingBottom: verticalScale(10),
  },
  activeRulesContainer: {
    backgroundColor: '#FFF3CD',
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: '#FFC107',
    padding: scale(12),
    marginBottom: verticalScale(8),
  },
  activeRulesTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: verticalScale(6),
  },
  ruleText: {
    fontSize: moderateScale(12),
    color: '#856404',
    marginBottom: verticalScale(2),
  },
  noEyeContactContainer: {
    backgroundColor: '#F8D7DA',
    borderRadius: moderateScale(12),
    borderWidth: 2,
    borderColor: '#F5C6CB',
    padding: scale(12),
  },
  noEyeContactTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    color: '#721C24',
    marginBottom: verticalScale(6),
  },
  noEyeContactPlayer: {
    fontSize: moderateScale(12),
    color: '#721C24',
  },
  resetButton: {
    padding: scale(16),
    borderRadius: moderateScale(12),
    alignItems: 'center',
    marginTop: verticalScale(8),
  },
  resetButtonText: {
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  // Modal de resultado
  resultModalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: scale(20),
  },
  resultModalContent: {
    backgroundColor: '#FFF',
    borderRadius: moderateScale(24),
    padding: scale(32),
    width: '90%',
    maxWidth: scale(400),
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
  },
  resultEmoji: {
    fontSize: moderateScale(80),
    marginBottom: verticalScale(16),
  },
  resultTitle: {
    fontSize: moderateScale(32),
    fontWeight: 'bold',
    color: '#D4AF37',
    textAlign: 'center',
    marginBottom: verticalScale(8),
  },
  resultDivider: {
    width: '80%',
    height: 2,
    backgroundColor: '#D4AF37',
    marginVertical: verticalScale(16),
  },
  resultEffect: {
    fontSize: moderateScale(20),
    textAlign: 'center',
    fontWeight: '600',
    color: '#333',
    marginBottom: verticalScale(24),
  },
  resultButton: {
    width: '100%',
  },
});
