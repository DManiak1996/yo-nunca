/**
 * Componente: Círculo dividido por jugadores para el juego de la botella
 * Divide un círculo en N segmentos iguales, uno por jugador
 */

import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import Svg, { Path, Circle, G } from 'react-native-svg';
import { Player } from '../../types';
import { colors } from '../../design-system/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CIRCLE_SIZE = Math.min(SCREEN_WIDTH * 0.85, 400);
const RADIUS = CIRCLE_SIZE / 2;

interface Props {
  players: Player[];
}

export default function PlayerCircle({ players }: Props) {
  const numPlayers = players.length;
  const anglePerPlayer = (2 * Math.PI) / numPlayers;

  /**
   * Calcula la posición de un segmento
   */
  const getSegmentPath = (index: number) => {
    const startAngle = index * anglePerPlayer - Math.PI / 2; // Empezar desde arriba
    const endAngle = (index + 1) * anglePerPlayer - Math.PI / 2;

    const x1 = RADIUS + RADIUS * Math.cos(startAngle);
    const y1 = RADIUS + RADIUS * Math.sin(startAngle);
    const x2 = RADIUS + RADIUS * Math.cos(endAngle);
    const y2 = RADIUS + RADIUS * Math.sin(endAngle);

    const largeArcFlag = anglePerPlayer > Math.PI ? 1 : 0;

    return `M ${RADIUS} ${RADIUS} L ${x1} ${y1} A ${RADIUS} ${RADIUS} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  /**
   * Calcula la posición del label del jugador
   */
  const getLabelPosition = (index: number) => {
    const angle = (index + 0.5) * anglePerPlayer - Math.PI / 2;
    const labelRadius = RADIUS * 0.75; // 75% del radio para posicionar el label

    const x = RADIUS + labelRadius * Math.cos(angle);
    const y = RADIUS + labelRadius * Math.sin(angle);

    return { x, y };
  };

  /**
   * Genera un color único para cada jugador
   */
  const getPlayerColor = (index: number) => {
    const hue = (index * 360) / numPlayers;
    return `hsl(${hue}, 70%, 60%)`;
  };

  return (
    <View style={styles.container}>
      <Svg width={CIRCLE_SIZE} height={CIRCLE_SIZE} style={styles.svg}>
        {/* Dibujar segmentos */}
        {players.map((player, index) => (
          <G key={player.id}>
            {/* Segmento de color */}
            <Path
              d={getSegmentPath(index)}
              fill={getPlayerColor(index)}
              opacity={0.3}
              stroke="#FFFFFF"
              strokeWidth={2}
            />
          </G>
        ))}

        {/* Círculo central (donde irá la botella) */}
        <Circle
          cx={RADIUS}
          cy={RADIUS}
          r={RADIUS * 0.15}
          fill="rgba(255, 255, 255, 0.9)"
          stroke={colors.primary[500]}
          strokeWidth={3}
        />
      </Svg>

      {/* Labels de jugadores (posicionados absolutamente sobre el SVG) */}
      {players.map((player, index) => {
        const pos = getLabelPosition(index);
        return (
          <View
            key={`label-${player.id}`}
            style={[
              styles.playerLabel,
              {
                left: pos.x - 35, // Centrar el label (ancho aprox 70)
                top: pos.y - 35,  // Centrar el label (alto aprox 70)
                backgroundColor: getPlayerColor(index),
              },
            ]}
          >
            <Text style={styles.playerAvatar}>{player.avatar}</Text>
            <Text style={styles.playerName} numberOfLines={1}>
              {player.name}
            </Text>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: CIRCLE_SIZE,
    height: CIRCLE_SIZE,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  svg: {
    position: 'absolute',
  },
  playerLabel: {
    position: 'absolute',
    width: 70,
    height: 70,
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  playerAvatar: {
    fontSize: 24,
    marginBottom: 2,
  },
  playerName: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    paddingHorizontal: 4,
  },
});
