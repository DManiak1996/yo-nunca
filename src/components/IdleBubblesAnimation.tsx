import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Dimensions, Animated, Easing } from 'react-native';

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const IdleBubblesAnimation: React.FC = () => {
  // Burbujas idle (15 burbujas más visibles y espaciadas)
  const bubbles = useRef(
    Array.from({ length: 15 }, (_, i) => ({
      id: i,
      translateY: new Animated.Value(0),
      opacity: new Animated.Value(0),
      // Posiciones aleatorias en X distribuidas por toda la pantalla
      x: Math.random() * SCREEN_WIDTH,
      // Posiciones iniciales en Y (distribuidas por toda la altura)
      startY: Math.random() * SCREEN_HEIGHT,
      // Tamaños más grandes para mejor visibilidad
      size: Math.random() * 12 + 8,
      // Delays escalonados para efecto continuo
      delay: i * 800, // Cada burbuja empieza con 800ms de diferencia
    }))
  ).current;

  useEffect(() => {
    // Animar cada burbuja en loop infinito
    bubbles.forEach((bubble) => {
      setTimeout(() => {
        // Loop infinito de subida
        Animated.loop(
          Animated.parallel([
            // Subida desde su posición inicial
            Animated.timing(bubble.translateY, {
              toValue: -SCREEN_HEIGHT * 0.4, // Sube 40% de la pantalla
              duration: 6000 + Math.random() * 3000, // 6-9 segundos (lento y relajado)
              easing: Easing.linear,
              useNativeDriver: true,
            }),
            // Fade in + fade out (más visible)
            Animated.sequence([
              Animated.timing(bubble.opacity, {
                toValue: 0.7, // Más visible (antes 0.4)
                duration: 1000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
              Animated.delay(3000), // Mantener visible
              Animated.timing(bubble.opacity, {
                toValue: 0,
                duration: 2000,
                easing: Easing.inOut(Easing.ease),
                useNativeDriver: true,
              }),
            ]),
          ])
        ).start();
      }, bubble.delay);
    });
  }, []);

  return (
    <View style={styles.container} pointerEvents="none">
      {bubbles.map((bubble) => (
        <Animated.View
          key={bubble.id}
          style={[
            styles.bubble,
            {
              left: bubble.x,
              top: bubble.startY,
              width: bubble.size,
              height: bubble.size,
              borderRadius: bubble.size / 2,
              transform: [{ translateY: bubble.translateY }],
              opacity: bubble.opacity,
            },
          ]}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1, // Detrás del contenido pero encima del fondo
  },
  bubble: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.85)', // Mucho más opaco (antes 0.5)
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.95)', // Casi completamente opaco
    shadowColor: '#FFF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
  },
});

export default IdleBubblesAnimation;
