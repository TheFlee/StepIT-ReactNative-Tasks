import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import OnboardingRegister from '@/components/OnboardingRegister';
import { useSecureStorage } from '@/hooks/useSecureStorage';

export default function Onboarding() {
  const router = useRouter();
  const [userInfo] = useSecureStorage<{ name: string; surname: string; email?: string }>('userInfo');

  useEffect(() => {
    if (userInfo?.email) router.replace('/(tabs)');
  }, [userInfo]);

  return (
    <View className="flex-1 bg-primary">
      <View className="flex-1 items-center justify-center px-6">
        <Text className="text-white text-[36px] font-extrabold text-center mb-2">Welcome!</Text>
        <Text className="text-white/70 text-base text-center">Your personal finance companion</Text>
      </View>
      <View className="bg-white rounded-t-[32px] p-7 pb-12">
        <Text className="text-[22px] font-bold text-primary mb-1">Get Started</Text>
        <Text className="text-sm text-muted mb-6">Tell us your name to begin</Text>
        <OnboardingRegister onComplete={() => router.push('/register')} />
      </View>
    </View>
  );
}
