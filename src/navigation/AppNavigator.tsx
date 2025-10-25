/**
 * Configuración de navegación de la app
 */

import React, { useState, useEffect } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useTheme } from '../context/ThemeContext';
import { RootStackParamList } from '../types';
import { isAgeVerified } from '../utils/storage';

// Importar pantallas
import AgeGateScreen from '../screens/AgeGateScreen';
import HomeScreen from '../screens/HomeScreen';
import GameScreen from '../screens/GameScreen';
import CategorySelectionScreen from '../screens/CategorySelectionScreen';
import PlayerSetupScreen from '../screens/PlayerSetupScreen';
import GameScreenMultiplayer from '../screens/GameScreenMultiplayer';
import GameScreenDetectives from '../screens/GameScreenDetectives'; // V3.0 - Modo Detectives
// TODO PRODUCCIÓN: Descomentar cuando se cree Development Build
// import LocalHostScreen from '../screens/LocalHostScreen'; // V3.0 - FASE D - Host
// import LocalJoinScreen from '../screens/LocalJoinScreen'; // V3.0 - FASE D - Cliente
import CustomPhrasesScreen from '../screens/CustomPhrasesScreen';
import SettingsScreen from '../screens/SettingsScreen';
import GlobalStatsScreen from '../screens/GlobalStatsScreen';

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const { theme } = useTheme();
  const [ageVerified, setAgeVerified] = useState<boolean | null>(null);

  useEffect(() => {
    async function checkAge() {
      const verified = await isAgeVerified();
      setAgeVerified(verified);
    }
    checkAge();
  }, []);

  // Mostrar loading mientras verifica
  if (ageVerified === null) {
    return null; // O un splash screen
  }

  return (
    <Stack.Navigator
      initialRouteName={ageVerified ? "Home" : "AgeGate"}
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
        name="GameDetectives"
        component={GameScreenDetectives}
        options={{ headerShown: false }}
      />
      {/* TODO PRODUCCIÓN: Descomentar cuando se cree Development Build */}
      {/* <Stack.Screen
        name="LocalHost"
        component={LocalHostScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="LocalJoin"
        component={LocalJoinScreen}
        options={{ headerShown: false }}
      /> */}
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
