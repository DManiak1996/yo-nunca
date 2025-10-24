/**
 * Pantalla de estadísticas globales del usuario
 * Muestra métricas acumuladas de todas las partidas
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { useTheme } from '../context/ThemeContext';
import { useGlobalStats } from '../hooks/useGlobalStats';
import CustomButton from '../components/CustomButton';

type GlobalStatsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'GlobalStats'
>;

interface Props {
  navigation: GlobalStatsScreenNavigationProp;
}

export default function GlobalStatsScreen({ navigation }: Props) {
  const { theme } = useTheme();
  const {
    stats,
    loading,
    handleResetStats,
    getFavoriteCategory,
    getAveragePlayers,
    getFormattedDuration,
  } = useGlobalStats();

  const [resetting, setResetting] = useState(false);

  /**
   * Maneja el reseteo de estadísticas con confirmación
   */
  const confirmReset = () => {
    Alert.alert(
      'Resetear Estadísticas',
      '¿Estás seguro? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Resetear',
          style: 'destructive',
          onPress: async () => {
            try {
              setResetting(true);
              await handleResetStats();
              Alert.alert('¡Listo!', 'Estadísticas reseteadas correctamente');
            } catch (error) {
              Alert.alert('Error', 'No se pudieron resetear las estadísticas');
            } finally {
              setResetting(false);
            }
          },
        },
      ]
    );
  };

  if (loading) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.primary} />
          <Text style={[styles.loadingText, { color: theme.textSecondary }]}>
            Cargando estadísticas...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!stats) {
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
        <View style={styles.emptyContainer}>
          <Text style={[styles.emptyText, { color: theme.text }]}>
            No hay estadísticas disponibles
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={[styles.backButtonText, { color: theme.text }]}>←</Text>
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>Tus Estadísticas</Text>
        <View style={styles.backButton} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Stats Cards */}
        <View style={styles.statsGrid}>
          {/* Partidas Jugadas */}
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.statIcon}>🎮</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {stats.gamesPlayed}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Partidas Jugadas
            </Text>
          </View>

          {/* Categoría Favorita */}
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {getFavoriteCategory()}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Categoría Favorita
            </Text>
          </View>

          {/* Promedio Jugadores */}
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.statIcon}>👥</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {getAveragePlayers()}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Jugadores Promedio
            </Text>
          </View>

          {/* Tiempo Total */}
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.statIcon}>⏱️</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {getFormattedDuration()}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Tiempo Total
            </Text>
          </View>

          {/* Tragos Totales */}
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.statIcon}>🍺</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {stats.totalDrinks}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Tragos Totales
            </Text>
          </View>

          {/* Racha Actual */}
          <View style={[styles.statCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={styles.statIcon}>🔥</Text>
            <Text style={[styles.statValue, { color: theme.primary }]}>
              {stats.currentStreak}
            </Text>
            <Text style={[styles.statLabel, { color: theme.textSecondary }]}>
              Días Consecutivos
            </Text>
          </View>
        </View>

        {/* Récord de Tragos */}
        {stats.maxDrinksRecord && (
          <View style={[styles.recordCard, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.recordHeader}>
              <Text style={styles.recordIcon}>🏆</Text>
              <Text style={[styles.recordTitle, { color: theme.text }]}>
                Récord de Tragos
              </Text>
            </View>
            <View style={styles.recordContent}>
              <Text style={[styles.recordPlayer, { color: theme.primary }]}>
                {stats.maxDrinksRecord.playerName}
              </Text>
              <Text style={[styles.recordDrinks, { color: theme.text }]}>
                {stats.maxDrinksRecord.drinks} tragos
              </Text>
              <Text style={[styles.recordDate, { color: theme.textSecondary }]}>
                {new Date(stats.maxDrinksRecord.date).toLocaleDateString('es-ES', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
              </Text>
            </View>
          </View>
        )}

        {/* Botón Resetear */}
        <View style={styles.resetContainer}>
          <CustomButton
            title={resetting ? 'Reseteando...' : 'Resetear Estadísticas'}
            onPress={resetting ? () => {} : confirmReset}
            variant="danger"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 18,
    textAlign: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backButtonText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  statCard: {
    width: '48%',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statIcon: {
    fontSize: 36,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  recordCard: {
    padding: 20,
    borderRadius: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  recordHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  recordIcon: {
    fontSize: 32,
    marginRight: 12,
  },
  recordTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  recordContent: {
    alignItems: 'center',
  },
  recordPlayer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  recordDrinks: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  recordDate: {
    fontSize: 14,
  },
  resetContainer: {
    marginBottom: 20,
  },
});
