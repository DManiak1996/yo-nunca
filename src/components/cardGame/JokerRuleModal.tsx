/**
 * 🤡 MODAL: REGLA DEL JOKER
 *
 * Activa una regla especial del Payaso
 * Las reglas se ACUMULAN (máximo 2 simultáneas)
 * Si ya hay 2, debe eliminarse una antes de agregar otra
 */

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { JokerRule } from '../../types/cardGame';
import { getRandomJokerRuleExcluding } from '../../data/cardGame/jokerRules';
import CustomButton from '../CustomButton';
import { moderateScale, scale } from '../../utils/responsive';
import { triggerHaptic } from '../../utils/haptics';

interface Props {
  visible: boolean;
  activeRules: JokerRule[]; // Reglas ya activas
  onAddRule: (rule: JokerRule) => void;
  onRemoveRule: (ruleId: string) => void;
  onClose: () => void;
}

export default function JokerRuleModal({
  visible,
  activeRules,
  onAddRule,
  onRemoveRule,
  onClose,
}: Props) {
  const { theme } = useTheme();
  const [newRule, setNewRule] = useState<JokerRule | null>(null);
  const [selectedToRemove, setSelectedToRemove] = useState<string | null>(null);

  /**
   * Obtiene regla aleatoria al abrir (que no esté activa)
   */
  useEffect(() => {
    if (visible) {
      const activeIds = activeRules.map((r) => r.id);
      const randomRule = getRandomJokerRuleExcluding(activeIds);

      if (randomRule) {
        setNewRule(randomRule);
      } else {
        // No quedan reglas disponibles
        Alert.alert(
          '¡Todas las reglas activas!',
          'Ya se han usado todas las reglas del Joker. ¡Increíble!'
        );
        onClose();
      }

      triggerHaptic('heavy');
    }
  }, [visible, activeRules]);

  /**
   * Confirma agregar la regla
   */
  const handleAddRule = async () => {
    if (!newRule) return;

    // Si ya hay 2 reglas, debe eliminar una primero
    if (activeRules.length >= 2) {
      Alert.alert(
        'Máximo de reglas alcanzado',
        'Ya hay 2 reglas activas. Debes eliminar una antes de agregar otra.',
        [{ text: 'OK' }]
      );
      return;
    }

    await triggerHaptic('success');
    onAddRule(newRule);
    setNewRule(null);
    onClose();
  };

  /**
   * Elimina una regla y agrega la nueva
   */
  const handleReplaceRule = async () => {
    if (!selectedToRemove || !newRule) return;

    await triggerHaptic('success');
    onRemoveRule(selectedToRemove);
    onAddRule(newRule);
    setSelectedToRemove(null);
    setNewRule(null);
    onClose();
  };

  const getCategoryEmoji = (category: string): string => {
    switch (category) {
      case 'verbal':
        return '💬';
      case 'gesture':
        return '👋';
      case 'interaction':
        return '🤝';
      case 'absurd':
        return '🎭';
      default:
        return '🤡';
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          showsVerticalScrollIndicator={false}
        >
          <View style={[styles.modalContainer, { backgroundColor: theme.cardBg }]}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.emoji}>🤡</Text>
              <Text style={[styles.title, { color: theme.primary }]}>
                ¡El Payaso hace de las suyas!
              </Text>
            </View>

            {/* Nueva regla */}
            {newRule && (
              <View style={[styles.ruleContainer, { backgroundColor: theme.background }]}>
                <View style={styles.ruleHeader}>
                  <Text style={styles.categoryEmoji}>
                    {getCategoryEmoji(newRule.category)}
                  </Text>
                  <Text style={[styles.ruleDescription, { color: theme.text }]}>
                    {newRule.description}
                  </Text>
                </View>
                <Text style={[styles.rulePenalty, { color: theme.warning }]}>
                  ⚠️ {newRule.penalty}
                </Text>
              </View>
            )}

            {/* Reglas activas actuales */}
            {activeRules.length > 0 && (
              <View style={styles.activeRulesSection}>
                <Text style={[styles.sectionTitle, { color: theme.text }]}>
                  Reglas activas ({activeRules.length}/2):
                </Text>
                {activeRules.map((rule) => (
                  <TouchableOpacity
                    key={rule.id}
                    style={[
                      styles.activeRuleItem,
                      {
                        backgroundColor: theme.background,
                        borderColor: selectedToRemove === rule.id ? theme.error : theme.border,
                      },
                    ]}
                    onPress={() => {
                      if (activeRules.length >= 2) {
                        setSelectedToRemove(rule.id);
                        triggerHaptic('light');
                      }
                    }}
                    disabled={activeRules.length < 2}
                  >
                    <Text style={[styles.activeRuleText, { color: theme.text }]}>
                      {getCategoryEmoji(rule.category)} {rule.description}
                    </Text>
                    {selectedToRemove === rule.id && (
                      <Text style={[styles.removeLabel, { color: theme.error }]}>
                        ✓ Eliminar esta
                      </Text>
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}

            {/* Botones */}
            {activeRules.length < 2 ? (
              <CustomButton
                title="Activar Regla"
                onPress={handleAddRule}
                variant="primary"
              />
            ) : (
              <View style={styles.actions}>
                <CustomButton
                  title="Cancelar"
                  onPress={onClose}
                  variant="secondary"
                  style={styles.actionButton}
                />
                <CustomButton
                  title="Reemplazar"
                  onPress={handleReplaceRule}
                  variant="primary"
                  style={styles.actionButton}
                  disabled={!selectedToRemove}
                />
              </View>
            )}
          </View>
        </ScrollView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: moderateScale(20),
  },
  modalContainer: {
    width: '100%',
    maxWidth: scale(400),
    borderRadius: moderateScale(16),
    padding: moderateScale(20),
  },
  header: {
    alignItems: 'center',
    marginBottom: moderateScale(20),
  },
  emoji: {
    fontSize: moderateScale(64),
    marginBottom: moderateScale(8),
  },
  title: {
    fontSize: moderateScale(22),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ruleContainer: {
    padding: moderateScale(16),
    borderRadius: moderateScale(12),
    marginBottom: moderateScale(20),
  },
  ruleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: moderateScale(12),
  },
  categoryEmoji: {
    fontSize: moderateScale(24),
    marginRight: moderateScale(12),
  },
  ruleDescription: {
    flex: 1,
    fontSize: moderateScale(16),
    fontWeight: '600',
  },
  rulePenalty: {
    fontSize: moderateScale(13),
    fontStyle: 'italic',
    paddingLeft: moderateScale(36),
  },
  activeRulesSection: {
    marginBottom: moderateScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(14),
    fontWeight: 'bold',
    marginBottom: moderateScale(12),
  },
  activeRuleItem: {
    padding: moderateScale(12),
    borderRadius: moderateScale(8),
    marginBottom: moderateScale(8),
    borderWidth: 2,
  },
  activeRuleText: {
    fontSize: moderateScale(13),
    marginBottom: moderateScale(4),
  },
  removeLabel: {
    fontSize: moderateScale(12),
    fontWeight: 'bold',
    marginTop: moderateScale(4),
  },
  actions: {
    flexDirection: 'row',
    gap: moderateScale(12),
  },
  actionButton: {
    flex: 1,
  },
});
