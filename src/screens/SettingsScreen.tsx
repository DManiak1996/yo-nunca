/**
 * Pantalla de configuración
 */

import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Alert,
  Modal,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../context/ThemeContext';
import CustomButton from '../components/CustomButton';
import { clearCustomPhrases } from '../utils/storage';

const APP_VERSION = '1.0.0';

const PRIVACY_POLICY = `POLÍTICA DE PRIVACIDAD - YO NUNCA

Última actualización: Octubre 2025

Party Apps ("nosotros", "nuestro") opera la aplicación móvil Yo Nunca (en adelante, "la Aplicación").

## 1. Información que NO recopilamos

Yo Nunca es una aplicación 100% offline que NO recopila, transmite, almacena ni comparte ningún dato personal del usuario.

Específicamente, NO recopilamos:
- Nombres, correos electrónicos o información de contacto
- Datos de ubicación
- Información del dispositivo
- Datos de uso o analítica
- Cookies o identificadores de publicidad
- Ningún tipo de información personal identificable

## 2. Almacenamiento local

La Aplicación almacena la siguiente información únicamente en su dispositivo local:

- Frases personalizadas: Frases que el usuario añade voluntariamente al juego
- Preferencias de tema: Configuración de modo oscuro/claro

Esta información:
- Se almacena SOLO en su dispositivo
- NO se transmite a ningún servidor externo
- NO es accesible para nosotros ni para terceros
- Se elimina completamente al desinstalar la aplicación

## 3. Permisos

La Aplicación NO requiere ni solicita ningún permiso especial del dispositivo.

## 4. Servicios de terceros

La Aplicación NO utiliza servicios de analítica, redes publicitarias, ni ningún servicio de terceros que recopile datos.

## 5. Contenido de la aplicación

Yo Nunca es un juego de beber para mayores de 18 años.

## 6. Contacto

Si tiene preguntas sobre esta Política de Privacidad, puede contactarnos por correo electrónico.

## 7. Consentimiento

Al usar nuestra Aplicación, usted acepta esta Política de Privacidad.

Resumen: Yo Nunca no recopila, transmite ni comparte ningún dato personal. Toda la información permanece en su dispositivo.`;

const TERMS_OF_SERVICE = `TÉRMINOS DE SERVICIO - YO NUNCA

Última actualización: Octubre 2025

## Aceptación de Términos

Al usar esta aplicación, aceptas estos términos de servicio.

## Restricción de Edad

- Debes ser MAYOR DE 18 AÑOS para usar esta app
- Declaras bajo tu responsabilidad que cumples este requisito
- Los desarrolladores no son responsables del uso por menores de edad

## Uso Responsable

- Esta app es un JUEGO para entretenimiento entre amigos
- NO promovemos el consumo excesivo de alcohol
- Beber es OPCIONAL: puedes usar otras "penas" o jugar sin alcohol
- NUNCA conduzcas bajo efectos del alcohol
- Conoce tus límites y respétalos

## Exención de Responsabilidad

Los desarrolladores NO son responsables por:
- Consecuencias del consumo de alcohol
- Lesiones o daños derivados del uso del juego
- Conflictos interpersonales entre jugadores
- Contenido de frases personalizadas creadas por usuarios

## Limitación de Garantías

Esta app se proporciona "tal cual" sin garantías de ningún tipo.

## Contacto

Para preguntas: danielarmendiagiron@gmail.com

Al usar esta app, confirmas haber leído, entendido y aceptado estos términos.`;

export default function SettingsScreen() {
  const { theme, isDarkMode, toggleTheme } = useTheme();
  const [isPrivacyModalVisible, setIsPrivacyModalVisible] = useState(false);
  const [isTermsModalVisible, setIsTermsModalVisible] = useState(false);

  const handleResetPhrases = () => {
    Alert.alert(
      'Confirmar eliminación',
      '¿Estás seguro de que quieres eliminar todas las frases personalizadas? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Eliminar',
          style: 'destructive',
          onPress: async () => {
            try {
              await clearCustomPhrases();
              Alert.alert('Éxito', 'Todas las frases personalizadas han sido eliminadas');
            } catch (error) {
              Alert.alert('Error', 'No se pudieron eliminar las frases');
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <ScrollView style={styles.content}>
        {/* Sección de tema */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Apariencia</Text>
          <View style={[styles.settingItem, { backgroundColor: theme.cardBackground }]}>
            <View style={styles.settingInfo}>
              <Text style={[styles.settingLabel, { color: theme.text }]}>
                Modo oscuro
              </Text>
              <Text style={[styles.settingDescription, { color: theme.textSecondary }]}>
                {isDarkMode ? 'Activado' : 'Desactivado'}
              </Text>
            </View>
            <Switch
              value={isDarkMode}
              onValueChange={toggleTheme}
              trackColor={{ false: theme.border, true: theme.primary }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Sección de datos */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Datos</Text>
          <CustomButton
            title="Resetear frases personalizadas"
            onPress={handleResetPhrases}
            variant="danger"
            style={styles.button}
          />
        </View>

        {/* Sección Legal */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Legal</Text>

          <CustomButton
            title="📄 Política de Privacidad"
            onPress={() => setIsPrivacyModalVisible(true)}
            variant="secondary"
            style={styles.button}
          />

          <View style={{ height: 12 }} />

          <CustomButton
            title="📜 Términos de Servicio"
            onPress={() => setIsTermsModalVisible(true)}
            variant="secondary"
            style={styles.button}
          />
        </View>

        {/* Sección de información */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>Información</Text>

          <View style={[styles.infoCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.infoLabel, { color: theme.textSecondary }]}>
              Versión de la app
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>{APP_VERSION}</Text>
          </View>

          <View style={[styles.infoCard, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.infoText, { color: theme.text }]}>
              Hecho con ❤️ para fiestas épicas
            </Text>
          </View>
        </View>

        {/* Aviso legal */}
        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            ⚠️ Para mayores de 18 años
          </Text>
          <Text style={[styles.footerText, { color: theme.textSecondary }]}>
            Bebe responsablemente
          </Text>
        </View>
      </ScrollView>

      {/* Modal de política de privacidad */}
      <Modal
        visible={isPrivacyModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsPrivacyModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Política de Privacidad
            </Text>
            <ScrollView style={styles.modalScroll}>
              <Text style={[styles.modalText, { color: theme.text }]}>
                {PRIVACY_POLICY}
              </Text>
            </ScrollView>
            <CustomButton
              title="Cerrar"
              onPress={() => setIsPrivacyModalVisible(false)}
              variant="primary"
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>

      {/* Modal de términos de servicio */}
      <Modal
        visible={isTermsModalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setIsTermsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: theme.cardBackground }]}>
            <Text style={[styles.modalTitle, { color: theme.text }]}>
              Términos de Servicio
            </Text>
            <ScrollView style={styles.modalScroll}>
              <Text style={[styles.modalText, { color: theme.text }]}>
                {TERMS_OF_SERVICE}
              </Text>
            </ScrollView>
            <CustomButton
              title="Cerrar"
              onPress={() => setIsTermsModalVisible(false)}
              variant="primary"
              style={styles.modalButton}
            />
          </View>
        </View>
      </Modal>
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
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 12,
  },
  settingInfo: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
  },
  button: {
    width: '100%',
  },
  infoCard: {
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: '600',
  },
  infoText: {
    fontSize: 16,
    textAlign: 'center',
  },
  footer: {
    marginTop: 40,
    marginBottom: 40,
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    fontSize: 14,
    textAlign: 'center',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    width: '100%',
    maxWidth: 500,
    maxHeight: '80%',
    borderRadius: 20,
    padding: 24,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  modalScroll: {
    marginBottom: 16,
  },
  modalText: {
    fontSize: 14,
    lineHeight: 20,
  },
  modalButton: {
    width: '100%',
  },
});
