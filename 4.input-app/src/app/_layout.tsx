import 'react-native-gesture-handler';

import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

import { AuthProvider } from '../contexts/auth';
import { ThemeProvider, useTheme } from '../contexts/theme';

function AppStack() {
  const { isDarkMode } = useTheme();

  return (
    <>
      <StatusBar style={isDarkMode ? 'light' : 'dark'} />
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="edit-user" />
        <Stack.Screen name="(auth)" />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppStack />
      </AuthProvider>
    </ThemeProvider>
  );
}
