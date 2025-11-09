import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, CommonActions } from '@react-navigation/native';
import CustomButton from '../components/CustomButton';
import { setAgeVerified } from '../utils/storage';
import { useTheme } from '../context/ThemeContext';

export default function AgeGateScreen() {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const handleAgeConfirm = async () => {
    await setAgeVerified(true);
    // Mostrar disclaimer de responsabilidad
    Alert.alert(
      "Consumo Responsable",
      "Recuerda beber con responsabilidad.\n\nNunca conduzcas bajo los efectos del alcohol.\n\nSi eliges jugar sin alcohol, puedes usar otras 'penas'.",
      [{ text: "Entendido", onPress: () => {
        // Navegar a Onboarding después de verificar edad
        navigation.dispatch(
          CommonActions.reset({
            index: 0,
            routes: [{ name: 'Onboarding' }],
          })
        );
      }}]
    );
  };

  const handleAgeDeny = () => {
    Alert.alert(
      "Acceso Denegado",
      "Esta aplicación es solo para mayores de 18 años.",
      [{ text: "Salir", onPress: () => {
        // En producción, cerrar la app
        // En desarrollo, no podemos cerrar, solo mostrar el alert
      }}]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={styles.content}>
        <Text style={[styles.icon, { color: theme.text }]}>🍺</Text>
        <Text style={[styles.title, { color: theme.text }]}>
          Verificación de Edad
        </Text>

        <View style={styles.warningBox}>
          <Text style={[styles.warningText, { color: theme.text }]}>
            Esta aplicación contiene:
          </Text>
          <Text style={[styles.warningItem, { color: theme.textSecondary }]}>
            • Referencias a consumo de alcohol
          </Text>
          <Text style={[styles.warningItem, { color: theme.textSecondary }]}>
            • Contenido sexual/adulto en algunas frases
          </Text>
          <Text style={[styles.warningItem, { color: theme.textSecondary }]}>
            • Lenguaje explícito
          </Text>
        </View>

        <Text style={[styles.question, { color: theme.text }]}>
          ¿Eres mayor de 18 años?
        </Text>

        <View style={styles.buttons}>
          <CustomButton
            title="NO, soy menor"
            onPress={handleAgeDeny}
            variant="danger"
          />
          <CustomButton
            title="SÍ, soy mayor"
            onPress={handleAgeConfirm}
            variant="primary"
          />
        </View>

        <Text style={[styles.disclaimer, { color: theme.textSecondary }]}>
          Al continuar, declaras bajo tu responsabilidad que eres mayor de edad
          y aceptas los términos de uso.
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
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 80,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  warningBox: {
    backgroundColor: 'rgba(255, 107, 53, 0.1)',
    borderWidth: 2,
    borderColor: '#FF6B35',
    borderRadius: 12,
    padding: 20,
    marginBottom: 32,
    width: '100%',
  },
  warningText: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  warningItem: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 6,
  },
  question: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 32,
    textAlign: 'center',
  },
  buttons: {
    width: '100%',
    gap: 16,
  },
  disclaimer: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 24,
    fontStyle: 'italic',
  },
});
