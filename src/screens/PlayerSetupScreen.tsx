/**
 * Pantalla de configuración de jugadores
 * Permite añadir/eliminar jugadores y editar nombres
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, DifficultyLevel } from '../types';
import { useTheme } from '../context/ThemeContext';
import { usePlayers } from '../hooks/usePlayers';
import CustomButton from '../components/CustomButton';
import BeerTransitionAnimation from '../components/BeerTransitionAnimation';
import { validatePlayerName } from '../utils/validation';
import { sanitizePlayerName } from '../utils/sanitization';

type PlayerSetupScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PlayerSetup'
>;

type PlayerSetupScreenRouteProp = RouteProp<RootStackParamList, 'PlayerSetup'>;

interface Props {
  navigation: PlayerSetupScreenNavigationProp;
  route: PlayerSetupScreenRouteProp;
}

export default function PlayerSetupScreen({ navigation, route }: Props) {
  const { difficulty } = route.params;
  const { theme } = useTheme();
  const {
    players,
    addPlayer,
    removePlayer,
    renamePlayer,
    regeneratePlayers,
  } = usePlayers(4); // Iniciar con 4 jugadores por defecto

  const [editingPlayerId, setEditingPlayerId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');
  const [showNumberPicker, setShowNumberPicker] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(players.length);
  const [showBeerAnimation, setShowBeerAnimation] = useState(false);

  /**
   * Maneja el cambio de número de jugadores
   */
  const handleChangePlayerCount = () => {
    try {
      regeneratePlayers(selectedNumber);
      setShowNumberPicker(false);
      Alert.alert(
        '¡Jugadores regenerados!',
        `Se han generado ${selectedNumber} nuevos jugadores con nombres aleatorios.`
      );
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  /**
   * Maneja la eliminación de un jugador
   */
  const handleRemovePlayer = (id: string, name: string) => {
    if (players.length <= 2) {
      Alert.alert('Error', 'Mínimo 2 jugadores requeridos');
      return;
    }

    Alert.alert(
      'Eliminar jugador',
      `¿Estás seguro de eliminar a ${name}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: () => {
            try {
              removePlayer(id);
            } catch (error: any) {
              Alert.alert('Error', error.message);
            }
          },
        },
      ]
    );
  };

  /**
   * Maneja el inicio de edición de nombre
   */
  const handleStartEdit = (id: string, currentName: string) => {
    setEditingPlayerId(id);
    setEditingName(currentName);
  };

  /**
   * Maneja el guardado de nombre editado
   */
  const handleSaveEdit = () => {
    if (!editingPlayerId) return;

    const trimmedName = editingName.trim();

    // Validar nombre
    const validation = validatePlayerName(trimmedName);
    if (!validation.valid) {
      Alert.alert('Nombre inválido', validation.error || 'Por favor, elige otro nombre');
      return;
    }

    // Sanitizar
    const sanitized = sanitizePlayerName(trimmedName);

    // Verificar que no exista ya (excepto el jugador actual)
    if (players.some(p => p.id !== editingPlayerId && p.name.toLowerCase() === sanitized.toLowerCase())) {
      Alert.alert('Nombre duplicado', 'Este nombre ya existe. Elige otro.');
      return;
    }

    try {
      renamePlayer(editingPlayerId, sanitized);
      setEditingPlayerId(null);
      setEditingName('');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  /**
   * Maneja la cancelación de edición
   */
  const handleCancelEdit = () => {
    setEditingPlayerId(null);
    setEditingName('');
  };

  /**
   * Maneja el añadido de un nuevo jugador
   */
  const handleAddPlayer = () => {
    if (players.length >= 20) {
      Alert.alert('Límite alcanzado', 'Máximo 20 jugadores permitidos');
      return;
    }

    try {
      addPlayer();
    } catch (error: any) {
      Alert.alert('Error', error.message);
    }
  };

  /**
   * Maneja el inicio del juego con animación
   */
  const handleStartGame = () => {
    setShowBeerAnimation(true);
  };

  /**
   * Callback cuando la animación termina
   */
  const handleAnimationComplete = () => {
    navigation.navigate('GameMultiplayer', {
      players,
      difficulty,
    });
    // Mantener animación visible 200ms más para cubrir el parpadeo de carga
    setTimeout(() => {
      setShowBeerAnimation(false);
    }, 200);
  };

  /**
   * Renderiza cada item de la lista de jugadores
   */
  const renderPlayerItem = ({ item, index }: { item: typeof players[0]; index: number }) => {
    const isEditing = editingPlayerId === item.id;

    return (
      <View style={[styles.playerItem, { backgroundColor: theme.cardBackground }]}>
        <View style={styles.playerInfo}>
          <Text style={styles.playerAvatar}>{item.avatar}</Text>
          {isEditing ? (
            <TextInput
              style={[
                styles.playerNameInput,
                { color: theme.text, borderColor: theme.primary },
              ]}
              value={editingName}
              onChangeText={setEditingName}
              autoFocus
              maxLength={20}
              autoCapitalize="words"
              onSubmitEditing={handleSaveEdit}
            />
          ) : (
            <View style={styles.playerNameContainer}>
              <Text style={[styles.playerName, { color: theme.text }]}>
                {item.name}
              </Text>
              <Text style={[styles.playerNumber, { color: theme.textSecondary }]}>
                Jugador {index + 1}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.playerActions}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.success }]}
                onPress={handleSaveEdit}
              >
                <Text style={styles.actionButtonText}>✓</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.danger }]}
                onPress={handleCancelEdit}
              >
                <Text style={styles.actionButtonText}>✕</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.secondary }]}
                onPress={() => handleStartEdit(item.id, item.name)}
              >
                <Text style={styles.actionButtonText}>✎</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.actionButton, { backgroundColor: theme.danger }]}
                onPress={() => handleRemovePlayer(item.id, item.name)}
              >
                <Text style={styles.actionButtonText}>🗑️</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: theme.text }]}>
          Configurar Jugadores
        </Text>
        <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
          {players.length} jugador{players.length !== 1 ? 'es' : ''}
        </Text>
      </View>

      <FlatList
        data={players}
        renderItem={renderPlayerItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <View style={styles.buttonRow}>
          <View style={styles.halfButton}>
            <CustomButton
              title="Cambiar Identidad"
              onPress={() => regeneratePlayers(players.length)}
              variant="secondary"
            />
          </View>
          <View style={styles.halfButton}>
            <CustomButton
              title="Añadir Jugador"
              onPress={handleAddPlayer}
              variant="secondary"
            />
          </View>
        </View>

        <CustomButton
          title="Comenzar Juego"
          onPress={handleStartGame}
          variant="primary"
        />
      </View>

      {/* Modal para seleccionar número de jugadores */}
      <Modal
        visible={showNumberPicker}
        transparent
        animationType="fade"
        onRequestClose={() => setShowNumberPicker(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              ¿Cuántos jugadores?
            </Text>

            <View style={styles.numberGrid}>
              {[2, 3, 4, 5, 6, 7, 8, 9, 10, 12, 15, 20].map((num) => (
                <TouchableOpacity
                  key={num}
                  style={[
                    styles.numberButton,
                    {
                      backgroundColor:
                        selectedNumber === num ? theme.primary : theme.secondary,
                    },
                  ]}
                  onPress={() => setSelectedNumber(num)}
                >
                  <Text
                    style={[
                      styles.numberButtonText,
                      { color: selectedNumber === num ? '#000' : '#FFF' },
                    ]}
                  >
                    {num}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.modalButtons}>
              <View style={styles.halfButton}>
                <CustomButton
                  title="Cancelar"
                  onPress={() => setShowNumberPicker(false)}
                  variant="secondary"
                />
              </View>
              <View style={styles.halfButton}>
                <CustomButton
                  title="Generar"
                  onPress={handleChangePlayerCount}
                  variant="primary"
                />
              </View>
            </View>
          </View>
        </View>
      </Modal>

      {/* Animación de transición de cerveza */}
      {showBeerAnimation && (
        <BeerTransitionAnimation onComplete={handleAnimationComplete} />
      )}
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
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
  },
  listContent: {
    padding: 16,
  },
  playerItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerAvatar: {
    fontSize: 32,
    marginRight: 12,
  },
  playerNameContainer: {
    flex: 1,
  },
  playerName: {
    fontSize: 18,
    fontWeight: '600',
  },
  playerNumber: {
    fontSize: 12,
    marginTop: 2,
  },
  playerNameInput: {
    flex: 1,
    fontSize: 18,
    fontWeight: '600',
    borderBottomWidth: 2,
    paddingVertical: 4,
  },
  playerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    fontSize: 18,
  },
  footer: {
    padding: 16,
    gap: 12,
  },
  buttonRow: {
    flexDirection: 'row',
    gap: 12,
  },
  halfButton: {
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: '85%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
    elevation: 8,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 24,
  },
  numberGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 24,
  },
  numberButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  numberButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
});
