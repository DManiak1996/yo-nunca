/**
 * Paleta de colores para temas oscuro y claro
 */

import { Theme } from '../types';

export const DarkTheme: Theme = {
  background: '#0F0F0F',      // Negro profundo
  cardBackground: '#1E1E1E',  // Gris muy oscuro
  primary: '#FFD700',         // Dorado brillante
  secondary: '#9D4EDD',       // Morado vibrante
  text: '#FFFFFF',            // Blanco
  textSecondary: '#B0B0B0',   // Gris claro
  danger: '#FF4444',          // Rojo para eliminar
  success: '#00C851',         // Verde para éxito
  border: '#333333',          // Bordes sutiles
};

export const LightTheme: Theme = {
  background: '#F5F5F5',      // Gris muy claro
  cardBackground: '#FFFFFF',  // Blanco
  primary: '#FFA500',         // Naranja
  secondary: '#7B2CBF',       // Morado oscuro
  text: '#1E1E1E',            // Casi negro
  textSecondary: '#666666',   // Gris medio
  danger: '#D32F2F',          // Rojo oscuro
  success: '#388E3C',         // Verde oscuro
  border: '#E0E0E0',          // Bordes grises
};
