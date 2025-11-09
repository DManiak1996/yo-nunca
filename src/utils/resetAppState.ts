/**
 * Utilidad de desarrollo para resetear el estado de la app
 * SOLO PARA TESTING - No usar en producción
 */

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Resetea el estado de AgeGate y Onboarding
 * Útil para testing durante desarrollo
 */
export const resetAppState = async () => {
  try {
    await AsyncStorage.multiRemove(['ageVerified', 'onboardingCompleted']);
    console.log('✅ Estado de la app reseteado exitosamente');
    console.log('⚠️ Reinicia la app para ver los cambios');
    return true;
  } catch (error) {
    console.error('❌ Error reseteando estado de la app:', error);
    return false;
  }
};

/**
 * Muestra el estado actual de la app
 */
export const showAppState = async () => {
  try {
    const [ageVerified, onboardingCompleted] = await Promise.all([
      AsyncStorage.getItem('ageVerified'),
      AsyncStorage.getItem('onboardingCompleted'),
    ]);

    console.log('📊 Estado actual de la app:');
    console.log(`  - ageVerified: ${ageVerified}`);
    console.log(`  - onboardingCompleted: ${onboardingCompleted}`);

    return {
      ageVerified: ageVerified === 'true',
      onboardingCompleted: onboardingCompleted === 'true',
    };
  } catch (error) {
    console.error('❌ Error obteniendo estado de la app:', error);
    return null;
  }
};

/**
 * Simula primera instalación (resetea todo)
 */
export const simulateFirstInstall = async () => {
  console.log('🔄 Simulando primera instalación...');
  await resetAppState();
  console.log('✅ Listo. Reinicia la app para ver el flujo completo:');
  console.log('   AgeGate → Onboarding → Home');
};

/**
 * Simula usuario que ya verificó edad pero no vio onboarding
 */
export const simulateAgeVerifiedOnly = async () => {
  console.log('🔄 Simulando usuario con edad verificada pero sin onboarding...');
  try {
    await AsyncStorage.setItem('ageVerified', 'true');
    await AsyncStorage.removeItem('onboardingCompleted');
    console.log('✅ Listo. Reinicia la app para ver el flujo:');
    console.log('   Onboarding → Home');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};

/**
 * Simula usuario que completó todo
 */
export const simulateCompletedUser = async () => {
  console.log('🔄 Simulando usuario que completó todo...');
  try {
    await AsyncStorage.setItem('ageVerified', 'true');
    await AsyncStorage.setItem('onboardingCompleted', 'true');
    console.log('✅ Listo. Reinicia la app para ver el flujo:');
    console.log('   Home directo');
  } catch (error) {
    console.error('❌ Error:', error);
  }
};
