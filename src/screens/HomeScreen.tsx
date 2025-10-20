/**
 * Pantalla de inicio de la app
 */

import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import { RootStackParamList } from '../types';
import { StackNavigationProp } from '@react-navigation/stack';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { theme } = useTheme();

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        {/* Header con icono de configuración */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.settingsIcon}
          >
            <Text style={[styles.settingsIconText, { color: theme.text }]}>⚙️</Text>
          </TouchableOpacity>
        </View>

        {/* Logo y título */}
        <View style={styles.titleContainer}>
          <Text style={[styles.logo, { color: theme.text }]}>🍻 Yo Nunca</Text>
          <Text style={[styles.subtitle, { color: theme.textSecondary }]}>
            El juego de beber definitivo
          </Text>
        </View>

        {/* Botones principales */}
        <View style={styles.buttonsContainer}>
          <CustomButton
            title="Jugar"
            onPress={() => navigation.navigate('Game')}
            variant="primary"
            style={styles.button}
          />
          <CustomButton
            title="Mis Frases"
            onPress={() => navigation.navigate('CustomPhrases')}
            variant="secondary"
            style={styles.button}
          />
        </View>

        {/* Footer */}
        <Text style={[styles.footer, { color: theme.textSecondary }]}>
          Para mayores de 18 años
        </Text>
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
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  settingsIcon: {
    padding: 10,
  },
  settingsIconText: {
    fontSize: 28,
  },
  titleContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 60,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonsContainer: {
    gap: 16,
    paddingBottom: 40,
  },
  button: {
    width: '100%',
  },
  footer: {
    textAlign: 'center',
    fontSize: 14,
    paddingBottom: 20,
  },
});
