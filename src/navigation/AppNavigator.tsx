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
import CategorySelectionScreen from '../screens/CategorySelectionScreen';
import PlayerSetupScreen from '../screens/PlayerSetupScreen';
import GameScreenMultiplayer from '../screens/GameScreenMultiplayer';
import CustomPhrasesScreen from '../screens/CustomPhrasesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GlobalStatsScreen from '../screens/GlobalStatsScreen';

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
        headerShown: false, // Ocultar headers por defecto
        gestureEnabled: true, // Habilitar swipe-back
        // Sin animación - transición instantánea (la animación de cerveza la cubre)
        cardStyleInterpolator: () => {
          return {
            cardStyle: {
              opacity: 1,
            },
          };
        },
        transitionSpec: {
          open: { animation: 'timing', config: { duration: 0 } },
          close: { animation: 'timing', config: { duration: 0 } },
        },
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CategorySelection"
        component={CategorySelectionScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="PlayerSetup"
        component={PlayerSetupScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameMultiplayer"
        component={GameScreenMultiplayer}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Game"
        component={GameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CustomPhrases"
        component={CustomPhrasesScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GlobalStats"
        component={GlobalStatsScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
