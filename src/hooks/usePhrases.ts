/**
 * Hook personalizado para gestión de frases con sistema anti-repetición
 */

import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import { defaultPhrases } from '../data/defaultPhrases';
import { getCustomPhrases } from '../utils/storage';
import { shuffle } from '../utils/shuffle';

export function usePhrases() {
  const [allPhrases, setAllPhrases] = useState<string[]>([]);
  const [unusedPhrases, setUnusedPhrases] = useState<string[]>([]);
  const [currentPhrase, setCurrentPhrase] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Cargar frases al montar el componente
  useEffect(() => {
    loadPhrases();
  }, []);

  /**
   * Carga frases predefinidas + personalizadas y las baraja
   */
  const loadPhrases = async () => {
    try {
      setIsLoading(true);
      const customPhrases = await getCustomPhrases();
      const combined = [...defaultPhrases, ...customPhrases];

      if (combined.length === 0) {
        Alert.alert(
          'Sin frases',
          'No hay frases disponibles. Añade frases personalizadas para jugar.'
        );
        setIsLoading(false);
        return;
      }

      const shuffled = shuffle(combined);
      setAllPhrases(combined);
      setUnusedPhrases(shuffled);
      setCurrentPhrase(shuffled[0]);
      setIsLoading(false);
    } catch (error) {
      console.error('Error al cargar frases:', error);
      Alert.alert('Error', 'No se pudieron cargar las frases');
      setIsLoading(false);
    }
  };

  /**
   * Muestra la siguiente frase sin repetir
   * Al agotar frases, muestra alert y resetea el pool
   */
  const nextPhrase = () => {
    if (unusedPhrases.length === 0) {
      Alert.alert(
        '¡Se acabaron las frases!',
        'Reiniciando el juego...',
        [{ text: 'OK', onPress: resetPool }]
      );
      return;
    }

    if (unusedPhrases.length === 1) {
      // Última frase, mostrar alert y resetear
      Alert.alert(
        '¡Se acabaron las frases!',
        'Esta es la última frase. El juego se reiniciará.',
        [
          {
            text: 'OK',
            onPress: () => {
              resetPool();
            },
          },
        ]
      );
    } else {
      // Mostrar siguiente frase
      const remaining = unusedPhrases.slice(1);
      setUnusedPhrases(remaining);
      setCurrentPhrase(remaining[0]);
    }
  };

  /**
   * Resetea el pool de frases y vuelve a barajar
   */
  const resetPool = () => {
    if (allPhrases.length === 0) {
      Alert.alert(
        'Sin frases',
        'No hay frases disponibles para reiniciar.'
      );
      return;
    }

    const shuffled = shuffle(allPhrases);
    setUnusedPhrases(shuffled);
    setCurrentPhrase(shuffled[0]);
  };

  /**
   * Recarga frases (útil cuando se añaden/eliminan frases personalizadas)
   */
  const reloadPhrases = async () => {
    await loadPhrases();
  };

  return {
    currentPhrase,
    phrasesCount: unusedPhrases.length,
    totalPhrases: allPhrases.length,
    nextPhrase,
    resetPool,
    reloadPhrases,
    isLoading,
  };
}
