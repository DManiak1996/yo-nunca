/**
 * Configuración de navegación de la app
 */

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';

// Importar pantallas
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import CustomPhrasesScreen from '../screens/CustomPhrasesScreen';
import SettingsScreen from '../screens/SettingsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.cardBackground,
        },
        headerTintColor: theme.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ title: 'Jugar' }}
      />
      <Stack.Screen
        name="CustomPhrases"
        component={CustomPhrasesScreen}
        options={{ title: 'Mis Frases' }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ title: 'Configuración' }}
      />
    </Stack.Navigator>
  );
}
