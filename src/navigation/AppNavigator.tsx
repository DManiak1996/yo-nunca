/**
 * Configuración de navegación de la app
 */

import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import { isAgeVerified } from '../utils/storage';

// Importar pantallas
import AgeGateScreen from '../screens/AgeGateScreen';
import OnboardingScreen from '../screens/OnboardingScreen';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import GameSelectionScreen from '../screens/GameSelectionScreen'; // V4.0.1 - Selección de juegos
import CategorySelectionScreen from '../screens/CategorySelectionScreen';
import PlayerSetupScreen from '../screens/PlayerSetupScreen';
import GameScreenMultiplayer from '../screens/GameScreenMultiplayer';
import GameScreenDetectives from '../screens/GameScreenDetectives'; // V3.0 - Modo Detectives
import CardGamePlayerSelectScreen from '../screens/CardGamePlayerSelectScreen'; // V4.1 - Selección jugador inicial
import CardGameScreen from '../screens/CardGameScreen'; // V4.0 - El Rey de Copas
import BottleGameScreen from '../screens/BottleGameScreen'; // V4.0 - La Botella
import CustomPhrasesScreen from '../screens/CustomPhrasesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GlobalStatsScreen from '../screens/GlobalStatsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);
  const [onboardingCompleted, setOnboardingCompleted] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkInitialState() {
      // Cargar AMBOS estados en paralelo, siempre
      const [verified, onboardingStatus] = await Promise.all([
        isAgeVerified(),
        AsyncStorage.getItem('onboardingCompleted'),
      ]);

      setAgeVerified(verified);
      setOnboardingCompleted(onboardingStatus === 'true');
    }
    checkInitialState();
  }, []);

  // Mostrar loading mientras verifica AMBOS estados
  if (ageVerified === null || onboardingCompleted === null) {
    return null; // O un splash screen
  }

  // Determinar la ruta inicial
  const getInitialRoute = () => {
    if (!ageVerified) return 'AgeGate';
    if (!onboardingCompleted) return 'Onboarding';
    return 'Home';
  };

  return (
    <Stack.Navigator
      initialRouteName={getInitialRoute()}
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
      {!ageVerified && (
        <Stack.Screen
          name="AgeGate"
          component={AgeGateScreen}
          options={{ headerShown: false }}
        />
      )}
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameSelection"
        component={GameSelectionScreen}
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
        name="GameDetectives"
        component={GameScreenDetectives}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardGamePlayerSelect"
        component={CardGamePlayerSelectScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CardGame"
        component={CardGameScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="BottleGame"
        component={BottleGameScreen}
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
