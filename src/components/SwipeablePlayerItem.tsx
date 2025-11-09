/**
 * Componente de jugador con swipe para editar/eliminar
 * Inspirado en iOS swipe actions
 */

import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  PanResponder,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { Player } from '../types';
import { colors } from '../design-system/tokens';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const SWIPE_THRESHOLD = -80; // Umbral para mostrar botones
const ACTION_BUTTON_WIDTH = 70;

interface Props {
  player: Player;
  index: number;
  isEditing: boolean;
  editingText: string;
  onStartEdit: (id: string, name: string) => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onEditTextChange: (text: string) => void;
  onRemove: (id: string, name: string) => void;
}

export default function SwipeablePlayerItem({
  player,
  index,
  isEditing,
  editingText,
  onStartEdit,
  onSaveEdit,
  onCancelEdit,
  onEditTextChange,
  onRemove,
}: Props) {
  const { theme } = useTheme();
  const translateX = useRef(new Animated.Value(0)).current;
  const [isOpen, setIsOpen] = useState(false);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => !isEditing,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return !isEditing && Math.abs(gestureState.dx) > 10;
      },
      onPanResponderMove: (_, gestureState) => {
        // Solo permitir swipe hacia la izquierda
        if (gestureState.dx < 0) {
          translateX.setValue(gestureState.dx);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dx < SWIPE_THRESHOLD) {
          // Abrir acciones
          Animated.spring(translateX, {
            toValue: -ACTION_BUTTON_WIDTH * 2,
            useNativeDriver: true,
            tension: 40,
            friction: 8,
          }).start();
          setIsOpen(true);
        } else {
          // Cerrar
          closeActions();
        }
      },
    })
  ).current;

  const closeActions = () => {
    Animated.spring(translateX, {
      toValue: 0,
      useNativeDriver: true,
      tension: 40,
      friction: 8,
    }).start();
    setIsOpen(false);
  };

  const handleEdit = () => {
    closeActions();
    setTimeout(() => onStartEdit(player.id, player.name), 200);
  };

  const handleDelete = () => {
    closeActions();
    setTimeout(() => onRemove(player.id, player.name), 200);
  };

  return (
    <View style={styles.container}>
      {/* Botones de acción (detrás) */}
      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.categories.detectives }]}
          onPress={handleEdit}
          activeOpacity={0.8}
        >
          <Text style={styles.actionIcon}>✎</Text>
          <Text style={styles.actionLabel}>Editar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.actionButton, { backgroundColor: colors.warning[500] }]}
          onPress={handleDelete}
          activeOpacity={0.8}
        >
          <Text style={styles.actionIcon}>🗑️</Text>
          <Text style={styles.actionLabel}>Borrar</Text>
        </TouchableOpacity>
      </View>

      {/* Card principal (encima) */}
      <Animated.View
        style={[
          styles.cardContainer,
          {
            backgroundColor: theme.cardBackground,
            transform: [{ translateX }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        <View style={styles.avatarContainer}>
          <Text style={styles.avatar}>{player.avatar}</Text>
        </View>

        <View style={styles.infoContainer}>
          {isEditing ? (
            <View style={styles.editingContainer}>
              <TextInput
                style={[styles.editInput, {
                  color: theme.text,
                  backgroundColor: theme.background,
                  borderColor: theme.primary,
                }]}
                value={editingText}
                onChangeText={onEditTextChange}
                autoFocus
                selectTextOnFocus
                maxLength={20}
                placeholder="Nombre del jugador"
                placeholderTextColor={theme.textSecondary}
              />
              <View style={styles.editActions}>
                <TouchableOpacity
                  style={[styles.editActionButton, { backgroundColor: theme.success }]}
                  onPress={onSaveEdit}
                >
                  <Text style={styles.editActionIcon}>✓</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={[styles.editActionButton, { backgroundColor: theme.danger }]}
                  onPress={onCancelEdit}
                >
                  <Text style={styles.editActionIcon}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          ) : (
            <>
              <Text
                style={[styles.playerName, { color: theme.text }]}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {player.name}
              </Text>
              <Text style={[styles.playerNumber, { color: theme.textSecondary }]}>
                Jugador {index + 1}
              </Text>
            </>
          )}
        </View>

        {!isEditing && (
          <View style={styles.swipeIndicator}>
            <Text style={[styles.swipeHint, { color: theme.textSecondary }]}>
              ⟨
            </Text>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
    height: 80,
  },
  actionsContainer: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: ACTION_BUTTON_WIDTH,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 8,
  },
  actionIcon: {
    fontSize: 24,
    marginBottom: 4,
  },
  actionLabel: {
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: '600',
  },
  cardContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 107, 53, 0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    fontSize: 28,
  },
  infoContainer: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 2,
  },
  playerNumber: {
    fontSize: 13,
  },
  swipeIndicator: {
    marginLeft: 8,
    opacity: 0.3,
  },
  swipeHint: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  editingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  editInput: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 2,
    fontSize: 16,
    fontWeight: '600',
  },
  editActions: {
    flexDirection: 'row',
    gap: 6,
  },
  editActionButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  editActionIcon: {
    fontSize: 20,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});
