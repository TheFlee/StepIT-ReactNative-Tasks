import 'react-native-gesture-handler';

import '../global.css';

import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'slide_from_right',
          animationDuration: 280,
        }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen
          name="place/[id]"
          options={{
            headerShown: true,
            headerBackTitle: 'Back',
            headerTintColor: '#2563eb',
            animation: 'fade_from_bottom',
            animationDuration: 320,
          }}
        />
      </Stack>
    </>
  );
}
