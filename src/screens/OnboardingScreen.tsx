import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomButton from '../components/CustomButton';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';

const { width, height } = Dimensions.get('window');

const STEPS = [
  {
    id: 1,
    title: '¡Bienvenido a Yo Nunca!',
    description: 'El mejor juego de fiesta para conocer a tus amigos y pasar un buen rato',
    icon: '🍺',
    color: '#FF6B35',
  },
  {
    id: 2,
    title: 'Elige tu Modo de Juego',
    description: 'Yo Nunca clásico, Hot, Atrevido o Extremo. También modo Detectives para descubrir secretos',
    icon: '🎮',
    color: '#F7931E',
  },
  {
    id: 3,
    title: 'Configura tus Jugadores',
    description: 'Añade de 2 a 10 jugadores, personaliza nombres y avatares para cada uno',
    icon: '👥',
    color: '#FDC830',
  },
  {
    id: 4,
    title: '¡A Jugar!',
    description: 'Responde las preguntas, pierde vidas si has hecho algo, ¡y descubre secretos!',
    icon: '🎉',
    color: '#4CAF50',
  },
];

type OnboardingScreenProps = {
  navigation: StackNavigationProp<RootStackParamList, 'Onboarding'>;
};

export default function OnboardingScreen({ navigation }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = async () => {
    await handleComplete();
  };

  const handleComplete = async () => {
    try {
      await AsyncStorage.setItem('onboardingCompleted', 'true');
      navigation.replace('Home');
    } catch (error) {
      console.error('Error saving onboarding status:', error);
      navigation.replace('Home');
    }
  };

  const step = STEPS[currentStep];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#2C1810" />

      {/* Skip button */}
      {currentStep < STEPS.length - 1 && (
        <View style={styles.skipContainer}>
          <CustomButton
            onPress={handleSkip}
            title="Saltar"
            style={styles.skipButton}
            accessibilityLabel="Saltar tutorial"
            accessibilityHint="Toca dos veces para saltar el tutorial de bienvenida"
          />
        </View>
      )}

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.icon}>{step.icon}</Text>
        <Text style={[styles.title, { color: step.color }]}>{step.title}</Text>
        <Text style={styles.description}>{step.description}</Text>
      </View>

      {/* Pagination dots */}
      <View style={styles.pagination}>
        {STEPS.map((_, index) => (
          <View
            key={index}
            style={[
              styles.dot,
              index === currentStep && styles.activeDot,
              index === currentStep && { backgroundColor: step.color },
            ]}
            accessibilityLabel={`Paso ${index + 1} de ${STEPS.length}`}
          />
        ))}
      </View>

      {/* Navigation buttons */}
      <View style={styles.navigationContainer}>
        {currentStep > 0 && (
          <CustomButton
            onPress={handleBack}
            title="Atrás"
            style={styles.backButton}
            accessibilityLabel="Volver al paso anterior"
          />
        )}

        <CustomButton
          onPress={handleNext}
          title={currentStep === STEPS.length - 1 ? '¡Comenzar!' : 'Siguiente'}
          style={[
            styles.nextButton,
            currentStep === 0 && styles.nextButtonFullWidth,
          ]}
          accessibilityLabel={
            currentStep === STEPS.length - 1
              ? 'Comenzar a usar la aplicación'
              : 'Ir al siguiente paso'
          }
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2C1810',
  },
  skipContainer: {
    position: 'absolute',
    top: 20,
    right: 20,
    zIndex: 10,
  },
  skipButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    minHeight: 40,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  icon: {
    fontSize: 100,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontFamily: 'BebasNeue_400Regular',
    color: '#FF6B35',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    fontFamily: 'Nunito_400Regular',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 26,
    opacity: 0.9,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#4A4A4A',
    marginHorizontal: 6,
  },
  activeDot: {
    width: 30,
    height: 10,
    borderRadius: 5,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 30,
    gap: 12,
  },
  backButton: {
    flex: 1,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#FF6B35',
  },
  nextButton: {
    flex: 1,
  },
  nextButtonFullWidth: {
    flex: 1,
  },
});
