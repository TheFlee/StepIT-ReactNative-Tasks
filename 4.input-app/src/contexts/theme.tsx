import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DARK_MODE_STORAGE_KEY = 'settings.darkMode';

type ThemeContextValue = {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    let isMounted = true;

    AsyncStorage.getItem(DARK_MODE_STORAGE_KEY)
      .then((storedValue) => {
        if (!isMounted || storedValue === null) return;

        setIsDarkMode(storedValue === 'true');
      })
      .catch((error: unknown) => {
        console.warn('Failed to load dark mode setting:', error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode((current) => {
      const nextValue = !current;

      AsyncStorage.setItem(DARK_MODE_STORAGE_KEY, String(nextValue)).catch(
        (error: unknown) => {
          console.warn('Failed to save dark mode setting:', error);
        }
      );

      return nextValue;
    });
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const value = useContext(ThemeContext);

  if (!value) {
    throw new Error('useTheme must be used inside ThemeProvider');
  }

  return value;
}
