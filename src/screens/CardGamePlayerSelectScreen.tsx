/**
 * Pantalla de selección de jugador inicial para El Rey de Copas
 * Permite elegir quién empieza a revelar cartas
 */

import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList, Player } from '../types';
import { useTheme } from '../context/ThemeContext';
import { scale, moderateScale, verticalScale } from '../utils/responsive';

type CardGamePlayerSelectNavigationProp = StackNavigationProp<RootStackParamList, 'CardGamePlayerSelect'>;
type CardGamePlayerSelectRouteProp = RouteProp<RootStackParamList, 'CardGamePlayerSelect'>;

interface Props {
  navigation: CardGamePlayerSelectNavigationProp;
  route: CardGamePlayerSelectRouteProp;
}

export default function CardGamePlayerSelectScreen({ navigation, route }: Props) {
  const { players } = route.params;
  const { theme } = useTheme();

  const handleSelectPlayer = (playerIndex: number) => {
    // Navegar al juego con el índice del jugador inicial
    navigation.navigate('CardGame', { players, startingPlayerIndex: playerIndex });
  };

  const renderPlayerItem = ({ item, index }: { item: Player; index: number }) => (
    <TouchableOpacity
      style={[styles.playerCard, { backgroundColor: theme.cardBackground }]}
      onPress={() => handleSelectPlayer(index)}
      activeOpacity={0.7}
    >
      <View style={styles.playerInfo}>
        <Text style={[styles.playerNumber, { color: theme.primary }]}>
          #{index + 1}
        </Text>
        <Text style={[styles.playerName, { color: theme.text }]}>
          {item.name}
        </Text>
      </View>
      <Text style={[styles.selectIcon, { color: theme.primary }]}>→</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <Text style={[styles.backIcon, { color: theme.text }]}>←</Text>
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={[styles.title, { color: theme.text }]}>
              🃏 El Rey de Copas
            </Text>
            <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
              ¿Quién empieza a revelar cartas?
            </Text>
          </View>
        </View>

        {/* Lista de jugadores */}
        <FlatList
          data={players}
          renderItem={renderPlayerItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />

        {/* Info adicional */}
        <View style={[styles.infoBox, { backgroundColor: theme.cardBackground }]}>
          <Text style={[styles.infoText, { color: theme.textSecondary }]}>
            💡 El turno rotará automáticamente después de cada carta
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(20),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: verticalScale(20),
    marginBottom: verticalScale(30),
  },
  backButton: {
    padding: scale(8),
    marginRight: scale(10),
  },
  backIcon: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  headerContent: {
    flex: 1,
  },
  title: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
    marginBottom: verticalScale(4),
  },
  subtitle: {
    fontSize: moderateScale(16),
  },
  listContent: {
    paddingBottom: verticalScale(20),
  },
  playerCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: scale(20),
    borderRadius: moderateScale(16),
    marginBottom: verticalScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  playerNumber: {
    fontSize: moderateScale(20),
    fontWeight: 'bold',
    marginRight: scale(12),
  },
  playerName: {
    fontSize: moderateScale(20),
    fontWeight: '600',
  },
  selectIcon: {
    fontSize: moderateScale(28),
    fontWeight: 'bold',
  },
  infoBox: {
    padding: scale(16),
    borderRadius: moderateScale(12),
    marginBottom: verticalScale(20),
  },
  infoText: {
    fontSize: moderateScale(14),
    textAlign: 'center',
    lineHeight: moderateScale(20),
  },
});
