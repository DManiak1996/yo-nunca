/**
 * TypeScript interfaces y tipos para la app Yo Nunca
 */

export interface Phrase {
  id: string;
  text: string;
  isCustom: boolean;
}

export interface Theme {
  background: string;
  cardBackground: string;
  primary: string;
  secondary: string;
  text: string;
  textSecondary: string;
  danger: string;
  success: string;
  border: string;
}

export type RootStackParamList = {
  Home: undefined;
  Game: undefined;
  CustomPhrases: undefined;
  Settings: undefined;
};
