/**
 * Componente: Botella giratoria para el juego
 * Gira y apunta a un jugador específico
 */

import React, { useEffect, useRef } from 'react';
import { Animated, Easing, StyleSheet } from 'react-native';
import Svg, { Path, G } from 'react-native-svg';

const AnimatedG = Animated.createAnimatedComponent(G);

interface Props {
  targetAngle: number; // Ángulo hacia el que debe apuntar (en grados)
  isSpinning: boolean;
  onSpinComplete?: () => void;
}

export default function SpinningBottle({ targetAngle, isSpinning, onSpinComplete }: Props) {
  const rotationAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isSpinning) {
      // Rotación completa: dar varias vueltas antes de llegar al ángulo final
      const fullRotations = 3 + Math.random() * 2; // 3-5 vueltas completas
      const totalDegrees = fullRotations * 360 + targetAngle;

      rotationAnim.setValue(0);
      Animated.timing(rotationAnim, {
        toValue: totalDegrees,
        duration: 3000,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start(() => {
        onSpinComplete?.();
      });
    }
  }, [isSpinning, targetAngle]);

  const rotation = rotationAnim.interpolate({
    inputRange: [0, 360],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <Svg width={80} height={80} viewBox="0 0 100 100" style={styles.svg}>
      <AnimatedG
        origin="50, 50"
        rotation={rotation}
      >
        {/* Cuerpo de la botella */}
        <Path
          d="M45 10 L55 10 L55 30 L60 35 L60 80 L60 90 L40 90 L40 80 L40 35 L45 30 Z"
          fill="#2E8B57"
          stroke="#1a5c3a"
          strokeWidth={2}
        />

        {/* Cuello de la botella */}
        <Path
          d="M47 5 L53 5 L55 10 L45 10 Z"
          fill="#2E8B57"
          stroke="#1a5c3a"
          strokeWidth={2}
        />

        {/* Punta (indica la dirección) */}
        <Path
          d="M50 0 L55 5 L45 5 Z"
          fill="#FF4444"
          stroke="#CC0000"
          strokeWidth={1.5}
        />

        {/* Brillo en la botella */}
        <Path
          d="M48 15 L50 15 L50 75 L48 75 Z"
          fill="rgba(255, 255, 255, 0.3)"
        />
      </AnimatedG>
    </Svg>
  );
}

const styles = StyleSheet.create({
  svg: {
    position: 'absolute',
  },
});
