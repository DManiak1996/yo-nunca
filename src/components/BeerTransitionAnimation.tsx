import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

interface BeerTransitionAnimationProps {
  onComplete: () => void;
}

const BeerTransitionAnimation: React.FC<BeerTransitionAnimationProps> = ({ onComplete }) => {
  // Animación del líquido (cerveza subiendo) usando Animated API nativa
  const beerHeight = useRef(new Animated.Value(0)).current;

  // Posición de la espuma (translateY desde abajo, empieza en SCREEN_HEIGHT)
  const foamTranslateY = useRef(new Animated.Value(SCREEN_HEIGHT)).current;

  // Animación de la espuma (respiración)
  const foamScale = useRef(new Animated.Value(1)).current;

  // Burbujas (80 burbujas con delays aleatorios)
  const bubbles = useRef(
    Array.from({ length: 80 }, (_, i) => ({
      id: i,
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(1),
      // Posiciones aleatorias en X
      x: Math.random() * (SCREEN_WIDTH - 15) + 5,
      // Tamaños aleatorios (más variedad)
      size: Math.random() * 12 + 3,
      // Delays muy pequeños para que empiecen casi inmediatamente
      delay: Math.random() * 200,
    }))
  ).current;

  useEffect(() => {
    // 1. Animar el líquido subiendo (0 → 100% en 1.2s)
    Animated.parallel([
      Animated.timing(beerHeight, {
        toValue: SCREEN_HEIGHT,
        duration: 1200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Ease-in-out suave
        useNativeDriver: false, // height no soporta native driver
      }),
      Animated.timing(foamTranslateY, {
        toValue: 0, // Sube desde SCREEN_HEIGHT (abajo) hasta 0 (arriba)
        duration: 1200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1), // Mismo easing que la cerveza
        useNativeDriver: true, // translateY SÍ soporta native driver
      }),
    ]).start(({ finished }) => {
      if (finished) {
        // Llamar al callback de navegación
        onComplete();
      }
    });

    // 2. Animar la espuma "respirando" (efecto sutil de expansión)
    Animated.loop(
      Animated.sequence([
        Animated.timing(foamScale, {
          toValue: 1.03,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(foamScale, {
          toValue: 1,
          duration: 800,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    // 3. Animar burbujas ascendentes (más rápido)
    bubbles.forEach((bubble) => {
      setTimeout(() => {
        // Animación de subida (más rápida: 1000-1800ms en lugar de 2000-3000ms)
        Animated.loop(
          Animated.timing(bubble.translateY, {
            toValue: -SCREEN_HEIGHT * 0.6,
            duration: 1000 + Math.random() * 800, // Más rápido
            easing: Easing.linear,
            useNativeDriver: true,
          })
        ).start();

        // Animación de fade out (más rápida también)
        Animated.loop(
          Animated.sequence([
            Animated.timing(bubble.opacity, {
              toValue: 0.8,
              duration: 300, // Más rápido
              useNativeDriver: true,
            }),
            Animated.timing(bubble.opacity, {
              toValue: 0,
              duration: 1000, // Más rápido
              useNativeDriver: true,
            }),
          ])
        ).start();
      }, bubble.delay);
    });
  }, []);

  return (
    <View style={styles.container}>
      {/* Fondo marrón oscuro (#2C1810) */}
      <View style={styles.background} />

      {/* Líquido de cerveza (#D4A574) */}
      <Animated.View style={[styles.beer, { height: beerHeight }]}>
        {/* Burbujas dentro de la cerveza */}
        {bubbles.map((bubble) => {
          return (
            <Animated.View
              key={bubble.id}
              style={[
                styles.bubble,
                {
                  left: bubble.x,
                  width: bubble.size,
                  height: bubble.size,
                  borderRadius: bubble.size / 2,
                  transform: [{ translateY: bubble.translateY }],
                  opacity: bubble.opacity,
                },
              ]}
            />
          );
        })}
      </Animated.View>

      {/* Espuma (#FFF5E1) con bordes irregulares - DEBE IR DESPUÉS para estar encima */}
      <Animated.View
        style={[
          styles.foamContainer,
          {
            transform: [
              { translateY: foamTranslateY },
              { scale: foamScale },
            ],
          },
        ]}
      >
        <Svg
          height="120"
          width={SCREEN_WIDTH}
          style={styles.foamSvg}
          viewBox={`0 0 ${SCREEN_WIDTH} 120`}
        >
          {/* Path con borde inferior ondulado y superior plano */}
          <Path
            d={`
              M 0 0
              L ${SCREEN_WIDTH} 0
              L ${SCREEN_WIDTH} 80
              Q ${SCREEN_WIDTH * 0.9} 90, ${SCREEN_WIDTH * 0.8} 85
              Q ${SCREEN_WIDTH * 0.7} 82, ${SCREEN_WIDTH * 0.6} 88
              Q ${SCREEN_WIDTH * 0.5} 95, ${SCREEN_WIDTH * 0.4} 85
              Q ${SCREEN_WIDTH * 0.3} 78, ${SCREEN_WIDTH * 0.2} 82
              Q ${SCREEN_WIDTH * 0.1} 88, 0 80
              Z
            `}
            fill="#FFF5E1"
            opacity={0.95}
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 9999,
    overflow: 'hidden',
  },
  background: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#2C1810',
  },
  beer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#D4A574',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    zIndex: 5, // Debajo de la espuma pero encima del fondo
    elevation: 5, // Para Android
  },
  bubble: {
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.4)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  foamContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: 10, // Asegurar que esté encima de la cerveza
    elevation: 10, // Para Android
  },
  foamSvg: {
    position: 'absolute',
    top: 0,
  },
});

export default BeerTransitionAnimation;
