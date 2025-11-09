/**
 * Sistema de Colores - Yo Nunca
 * Paleta profesional con escalas de 50 a 900
 */

export const colors = {
  // Paleta principal - Naranja cálido
  primary: {
    50: '#FFF4E6',
    100: '#FFE8CC',
    200: '#FFD199',
    300: '#FFBA66',
    400: '#FFA333',
    500: '#FF6B35', // Color principal actual
    600: '#E55A1F',
    700: '#B84815',
    800: '#8A360F',
    900: '#5C2409',
  },

  // Paleta secundaria - Amarillo/Dorado
  secondary: {
    50: '#FFFBEB',
    100: '#FFF7D6',
    200: '#FFEDAD',
    300: '#FFE484',
    400: '#FFDB5B',
    500: '#FDC830', // Amarillo actual
    600: '#E6B315',
    700: '#B38A0F',
    800: '#80620A',
    900: '#4D3A06',
  },

  // Paleta de fondo - Marrones
  background: {
    50: '#F5F1EE',
    100: '#EBE3DD',
    200: '#D7C7BB',
    300: '#C3AB99',
    400: '#AF8F77',
    500: '#3E2723', // Marrón oscuro principal
    600: '#2C1810', // Marrón más oscuro actual
    700: '#1F100B',
    800: '#120906',
    900: '#050302',
  },

  // Paleta de texto
  text: {
    primary: '#FFFFFF',
    secondary: '#E0E0E0',
    tertiary: '#B0B0B0',
    disabled: '#757575',
    inverse: '#2C1810',
  },

  // Paleta de estados
  success: {
    50: '#E8F5E9',
    500: '#4CAF50',
    700: '#388E3C',
  },

  warning: {
    50: '#FFF3E0',
    500: '#FF9800',
    700: '#F57C00',
  },

  error: {
    50: '#FFEBEE',
    500: '#F44336',
    700: '#D32F2F',
  },

  // Colores de categorías de juego
  categories: {
    classic: '#FF6B35',
    hot: '#F7931E',
    daring: '#E91E63',
    extreme: '#9C27B0',
    detectives: '#00BCD4',
  },

  // Grises neutros
  neutral: {
    50: '#FAFAFA',
    100: '#F5F5F5',
    200: '#EEEEEE',
    300: '#E0E0E0',
    400: '#BDBDBD',
    500: '#9E9E9E',
    600: '#757575',
    700: '#616161',
    800: '#424242',
    900: '#212121',
  },

  // Overlays y sombras
  overlay: {
    light: 'rgba(255, 255, 255, 0.1)',
    medium: 'rgba(0, 0, 0, 0.5)',
    dark: 'rgba(0, 0, 0, 0.8)',
  },
};

export type ColorToken = typeof colors;
