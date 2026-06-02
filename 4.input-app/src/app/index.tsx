import { useEffect } from 'react';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../contexts/auth';
import { useTheme } from '../contexts/theme';

const LOGIN_ROUTE = '/login' as Href;

export default function Home() {
  const { isDarkMode } = useTheme();
  const { user, isLoading, logout } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(LOGIN_ROUTE);
    }
  }, [isLoading, user]);

  const handleLogout = async () => {
    await logout();
    router.replace(LOGIN_ROUTE);
  };

  if (isLoading || !user) {
    return (
      <SafeAreaView
        className={`flex-1 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}
      >
        <View className="flex-1 px-8 pt-12">
          <View className="mb-10 flex-row items-center justify-between">
            <Text
              className={`text-[11px] font-semibold uppercase tracking-[0.25rem] ${
                isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
              }`}
            >
              Account
            </Text>
            <ThemeToggle />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}
    >
      <View className="flex-1 px-8 pt-12 pb-10">
        <View className="mb-10 flex-row items-center justify-between">
          <Text
            className={`text-[11px] font-semibold uppercase tracking-[0.25rem] ${
              isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
            }`}
          >
            Account
          </Text>
          <ThemeToggle />
        </View>

        <View className="flex-1 justify-center">
          <Text
            className={`text-4xl font-semibold leading-tight ${
              isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
            }`}
          >
            Welcome,{'\n'}
            {user.name}.
          </Text>

          <Text
            className={`mt-4 text-base leading-6 ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          >
            You are signed in as {user.email}.
          </Text>
        </View>

        <TouchableOpacity
          activeOpacity={0.85}
          onPress={handleLogout}
          className={`rounded-full py-4 items-center ${
            isDarkMode ? 'bg-zinc-50' : 'bg-zinc-900'
          }`}
        >
          <Text
            className={`text-sm font-semibold uppercase tracking-widest ${
              isDarkMode ? 'text-zinc-950' : 'text-white'
            }`}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
