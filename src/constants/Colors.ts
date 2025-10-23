/**
 * Paleta de colores para temas oscuro y claro
 * V2.0 - Tema Taberna/Garito
 */

import { Theme } from '../types';

/**
 * Tema oscuro - Estilo taberna/garito
 * Colores cálidos inspirados en madera, cerveza y fuego
 */
export const DarkTheme: Theme = {
  background: '#2C1810',      // Marrón oscuro taberna
  cardBackground: '#3D2817',  // Marrón madera oscuro
  primary: '#D4A574',         // Dorado cerveza
  secondary: '#8B4513',       // Marrón madera
  text: '#FFF5E1',            // Beige claro
  textSecondary: '#C9A876',   // Dorado apagado
  danger: '#FF6B35',          // Naranja terracota/fuego
  success: '#7BA05B',         // Verde oliva
  border: '#5C3A21',          // Marrón oscuro para bordes
};

/**
 * Tema claro - Estilo garito con luz de día
 * Versión cálida y acogedora
 */
export const LightTheme: Theme = {
  background: '#F4E4C1',      // Beige cálido
  cardBackground: '#FFF8E7',  // Crema claro
  primary: '#D4A574',         // Dorado cerveza (igual que dark)
  secondary: '#A0522D',       // Marrón siena
  text: '#2C1810',            // Marrón muy oscuro (texto principal)
  textSecondary: '#6B4423',   // Marrón medio
  danger: '#D35400',          // Naranja quemado
  success: '#52844C',         // Verde bosque
  border: '#D4A574',          // Dorado suave para bordes
};
