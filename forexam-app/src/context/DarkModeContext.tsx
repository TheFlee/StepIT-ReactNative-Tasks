import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface DarkModeContextValue {
  darkmode: boolean;
  setDarkmode: (value: boolean) => Promise<void>;
}

const DarkModeContext = createContext<DarkModeContextValue>({
  darkmode: false,
  setDarkmode: async () => {},
});

export function DarkModeProvider({ children }: { children: React.ReactNode }) {
  const [darkmode, setDarkmodeState] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem('darkmode').then(stored => {
      if (stored !== null) {
        try { setDarkmodeState(JSON.parse(stored)); } catch {}
      }
    });
  }, []);

  const setDarkmode = useCallback(async (value: boolean) => {
    await AsyncStorage.setItem('darkmode', JSON.stringify(value));
    setDarkmodeState(value);
  }, []);

  return (
    <DarkModeContext.Provider value={{ darkmode, setDarkmode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export function useDarkMode() {
  return useContext(DarkModeContext);
}

export function useTheme() {
  const { darkmode, setDarkmode } = useContext(DarkModeContext);
  return {
    darkmode,
    setDarkmode,
    bg: darkmode ? '#111111' : '#F0F2F8',
    card: darkmode ? '#1C1C1E' : '#FFFFFF',
    cardElevated: darkmode ? '#2C2C2E' : '#F5F5F5',
    text: darkmode ? '#F5F5F5' : '#1E2460',
    textSecondary: darkmode ? '#8E8E93' : '#6B7280',
    divider: darkmode ? '#3A3A3C' : '#F3F4F6',
    inputBg: darkmode ? '#2C2C2E' : '#FFFFFF',
    inputBorder: darkmode ? '#3A3A3C' : '#E5E7EB',
    tabBar: darkmode ? '#1C1C1E' : '#FFFFFF',
    tabActive: darkmode ? '#F97316' : '#1E2460',
    tabInactive: darkmode ? '#636366' : '#6B7280',
  };
}
