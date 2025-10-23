/**
 * Pantalla para gestionar frases personalizadas
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
  TextInput,
  Modal,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import {
  getCustomPhrases,
  addCustomPhrase,
  deleteCustomPhrase,
  clearCustomPhrases,
  saveCustomPhrases,
} from '../utils/storage';

export default function CustomPhrasesScreen() {
  const navigation = useNavigation();
  const { theme } = useTheme();
  const [phrases, setPhrases] = useState<string[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPhrase, setNewPhrase] = useState('');
  const [editingIndex, setEditingIndex] = useState<number | null>(null);

  useEffect(() => {
    loadPhrases();
  }, []);

  const loadPhrases = async () => {
    try {
      const customPhrases = await getCustomPhrases();
      setPhrases(customPhrases);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar las frases');
    }
  };

  const handleAddPhrase = async () => {
    try {
      if (editingIndex !== null) {
        // Editar frase existente
        const updatedPhrases = [...phrases];
        // Aplicar la misma limpieza que addCustomPhrase
        let trimmedPhrase = newPhrase.trim();
        const yoNuncaRegex = /^(yo nunca|yo\s+nunca)\s+/i;
        trimmedPhrase = trimmedPhrase.replace(yoNuncaRegex, '');

        if (!trimmedPhrase || trimmedPhrase.length < 10 || trimmedPhrase.length > 200) {
          throw new Error('La frase debe tener entre 10 y 200 caracteres');
        }

        updatedPhrases[editingIndex] = trimmedPhrase;
        await saveCustomPhrases(updatedPhrases);
        setNewPhrase('');
        setEditingIndex(null);
        setIsModalVisible(false);
        await loadPhrases();
        Alert.alert('¡Éxito!', 'Frase editada correctamente');
      } else {
        // Añadir nueva frase
        await addCustomPhrase(newPhrase);
        setNewPhrase('');
        setIsModalVisible(false);
        await loadPhrases();
        Alert.alert('¡Éxito!', 'Frase añadida correctamente');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message || 'No se pudo guardar la frase');
    }
  };

  const handleEditPhrase = (index: number) => {
    setEditingIndex(index);
    setNewPhrase(phrases[index]);
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
    setNewPhrase('');
    setEditingIndex(null);
  };

  const handleDeletePhrase = (index: number) => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar esta frase?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await deleteCustomPhrase(index);
              await loadPhrases();
            } catch (error) {
              Alert.alert('Error', 'No se pudo eliminar la frase');
            }
          },
        },
      ]
    );
  };

  const handleClearAll = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar TODAS las frases personalizadas?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar todas',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearCustomPhrases();
              await loadPhrases();
              Alert.alert('Éxito', 'Todas las frases han sido eliminadas');
            } catch (error) {
              Alert.alert('Error', 'No se pudieron eliminar las frases');
            }
          },
        },
      ]
    );
  };

  const renderItem = ({ item, index }: { item: string; index: number }) => (
    <View style={[styles.phraseItem, { backgroundColor: theme.cardBackground }]}>
      <Text style={[styles.phraseText, { color: theme.text }]} numberOfLines={2}>
        {item}
      </Text>
      <View style={styles.phraseActions}>
        <TouchableOpacity
          onPress={() => handleEditPhrase(index)}
          style={styles.actionButton}
        >
          <Text style={styles.actionIcon}>✏️</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDeletePhrase(index)}
          style={styles.actionButton}
        >
          <Text style={styles.actionIcon}>🗑️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Header con botón volver */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={[styles.backIcon, { color: theme.text }]}>←</Text>
          </TouchableOpacity>
          <Text style={[styles.title, { color: theme.text }]}>
            Mis Frases
          </Text>
          <View style={styles.placeholder} />
        </View>

        {/* Botón añadir */}
        <CustomButton
          title="+ Añadir Nueva Frase"
          onPress={() => {
            setEditingIndex(null);
            setNewPhrase('');
            setIsModalVisible(true);
          }}
          variant="primary"
          style={styles.addButton}
        />

        {/* Lista de frases */}
        {phrases.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={[styles.emptyText, { color: theme.text }]}>
              No tienes frases personalizadas
            </Text>
            <Text style={[styles.emptySubtext, { color: theme.textSecondary }]}>
              Añade tus propias frases para hacer el juego más divertido
            </Text>
          </View>
        ) : (
          <>
            <FlatList
              data={phrases}
              renderItem={renderItem}
              keyExtractor={(item, index) => `${index}`}
              contentContainerStyle={styles.listContent}
            />
            <CustomButton
              title="Eliminar Todas"
              onPress={handleClearAll}
              variant="danger"
              style={styles.clearButton}
            />
          </>
        )}
      </View>

      {/* Modal para añadir frase */}
      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={handleCloseModal}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              {editingIndex !== null ? 'Editar Frase' : 'Nueva Frase'}
            </Text>
            <Text style={[styles.modalSubtitle, { color: theme.textSecondary }]}>
              No incluyas "Yo nunca" al inicio, se añadirá automáticamente
            </Text>
            <TextInput
              style={[
                styles.input,
                {
                  backgroundColor: theme.background,
                  color: theme.text,
                  borderColor: theme.border,
                },
              ]}
              placeholder="Ejemplo: he bailado bajo la lluvia"
              placeholderTextColor={theme.textSecondary}
              value={newPhrase}
              onChangeText={setNewPhrase}
              multiline
              maxLength={200}
              autoCapitalize="none"
              autoCorrect={false}
            />
            <Text style={[styles.charCount, { color: theme.textSecondary }]}>
              {newPhrase.length}/200 caracteres
            </Text>
            <View style={styles.modalButtons}>
              <CustomButton
                title="Cancelar"
                onPress={handleCloseModal}
                variant="secondary"
                style={styles.modalButton}
              />
              <CustomButton
                title={editingIndex !== null ? 'Guardar' : 'Añadir'}
                onPress={handleAddPhrase}
                variant="primary"
                style={styles.modalButton}
              />
            </View>
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
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 20,
    paddingBottom: 16,
  },
  backButton: {
    padding: 8,
    width: 40,
  },
  backIcon: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  placeholder: {
    width: 40,
  },
  addButton: {
    width: '100%',
    marginBottom: 12,
  },
  listContent: {
    paddingBottom: 20,
  },
  phraseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
  },
  phraseText: {
    flex: 1,
    fontSize: 16,
    marginRight: 12,
  },
  phraseActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionButton: {
    padding: 8,
  },
  actionIcon: {
    fontSize: 22,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  emptySubtext: {
    fontSize: 16,
    textAlign: 'center',
  },
  clearButton: {
    width: '100%',
    marginBottom: 20,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 400,
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    textAlign: 'center',
  },
  modalSubtitle: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    minHeight: 100,
    textAlignVertical: 'top',
  },
  charCount: {
    fontSize: 14,
    textAlign: 'right',
    marginTop: 8,
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
  },
});
