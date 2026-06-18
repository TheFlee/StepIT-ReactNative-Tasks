import '../../global.css';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import React from 'react';
import { DarkModeProvider } from '@/context/DarkModeContext';

export default function RootLayout() {
  return (
    <DarkModeProvider>
      <SafeAreaProvider>
        <Stack screenOptions={{ headerShown: false }} />
      </SafeAreaProvider>
    </DarkModeProvider>
  );
}
