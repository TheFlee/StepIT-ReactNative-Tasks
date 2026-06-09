import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FormField } from '../../components/FormField';
import { ThemeToggle } from '../../components/ThemeToggle';
import { useAuth } from '../../contexts/auth';
import { useTheme } from '../../contexts/theme';

type LoginErrors = {
  email: string;
  password: string;
  form: string;
};

const initialErrors: LoginErrors = {
  email: '',
  password: '',
  form: '',
};

const HOME_ROUTE = '/' as Href;
const REGISTER_ROUTE = '/register' as Href;

export default function Login() {
  const { isDarkMode } = useTheme();
  const { user, isLoading, login, skipAuthorization } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<LoginErrors>(initialErrors);

  useEffect(() => {
    if (!isLoading && user) {
      router.replace(HOME_ROUTE);
    }
  }, [isLoading, user]);

  const handleLogin = async () => {
    const nextErrors: LoginErrors = { ...initialErrors };

    if (!email.trim()) {
      nextErrors.email = 'Required';
    } else if (!email.includes('@')) {
      nextErrors.email = 'Invalid email address';
    }

    if (!password) {
      nextErrors.password = 'Required';
    }

    setErrors(nextErrors);
    if (nextErrors.email || nextErrors.password) return;

    try {
      await login(email, password);
      router.replace(HOME_ROUTE);
    } catch (error: unknown) {
      setErrors((current) => ({
        ...current,
        form: error instanceof Error ? error.message : 'Could not sign in.',
      }));
    }
  };

  const handleSkip = async () => {
    await skipAuthorization();
    router.replace(HOME_ROUTE);
  };

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 24}
        className="flex-1"
      >
        <ScrollView
          contentContainerClassName="flex-grow px-8 pt-12 pb-28"
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode={Platform.OS === 'ios' ? 'interactive' : 'on-drag'}
          showsVerticalScrollIndicator={false}
        >
          <View className="mb-10">
            <View className="mb-3 flex-row items-center justify-between">
              <Text
                className={`text-[11px] font-semibold uppercase tracking-[0.25rem] ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                }`}
              >
                Login
              </Text>
              <ThemeToggle />
            </View>

            <Text
              className={`text-4xl font-semibold leading-tight ${
                isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
              }`}
            >
              Welcome{'\n'}back.
            </Text>
          </View>

          <FormField
            label="Email"
            placeholder="john@example.com"
            value={email}
            error={errors.email}
            isDarkMode={isDarkMode}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(value) => {
              setEmail(value);
              setErrors((current) => ({ ...current, email: '', form: '' }));
            }}
          />

          <FormField
            label="Password"
            placeholder="8+ characters"
            value={password}
            error={errors.password}
            isDarkMode={isDarkMode}
            secureTextEntry
            onChangeText={(value) => {
              setPassword(value);
              setErrors((current) => ({ ...current, password: '', form: '' }));
            }}
          />

          {errors.form ? (
            <Text className="mt-1 text-sm text-red-400">{errors.form}</Text>
          ) : null}

          <View className="flex-1 min-h-[40px]" />

          <View className="gap-3 mt-8">
            <TouchableOpacity
              activeOpacity={0.85}
              onPress={handleLogin}
              className={`rounded-full py-4 items-center ${
                isDarkMode ? 'bg-zinc-50' : 'bg-zinc-900'
              }`}
            >
              <Text
                className={`text-sm font-semibold uppercase tracking-widest ${
                  isDarkMode ? 'text-zinc-950' : 'text-white'
                }`}
              >
                Login
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => router.push(REGISTER_ROUTE)}
              className="py-3 items-center"
            >
              <Text
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Create account
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.7}
              onPress={handleSkip}
              className="py-3 items-center"
            >
              <Text
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
                }`}
              >
                Skip authorization
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
