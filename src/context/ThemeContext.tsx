/**
 * Context para gestión de tema (oscuro/claro)
 */

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Theme } from '../types';
import { DarkTheme, LightTheme } from '../constants/Colors';
import { getThemePreference, saveThemePreference } from '../utils/storage';

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

interface ThemeProviderProps {
  children: ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  // Cargar preferencia de tema al inicio
  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await getThemePreference();
      setIsDarkMode(savedTheme === 'dark');
    } catch (error) {
      console.error('Error al cargar preferencia de tema:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = isDarkMode ? 'light' : 'dark';
      setIsDarkMode(!isDarkMode);
      await saveThemePreference(newTheme);
    } catch (error) {
      console.error('Error al cambiar tema:', error);
    }
  };

  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook para consumir el contexto de tema
 * @returns ThemeContextType con theme, isDarkMode y toggleTheme
 */
export function useTheme(): ThemeContextType {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme debe usarse dentro de un ThemeProvider');
  }
  return context;
}
