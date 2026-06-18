import { Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
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
      {/* Hero section */}
      <View className="flex-1 items-center justify-center px-8">
        {/* Icon cluster */}
        <View className="items-center mb-8">
          <View
            className="w-20 h-20 rounded-[28px] bg-accent items-center justify-center mb-4"
            style={{ shadowColor: '#F97316', shadowOpacity: 0.4, shadowRadius: 20, elevation: 12 }}
          >
            <Ionicons name="wallet-outline" size={40} color="white" />
          </View>
          {/* Floating mini-badges */}
          <View className="flex-row gap-3">
            <View className="w-10 h-10 rounded-[14px] bg-white/15 items-center justify-center">
              <Ionicons name="card-outline" size={18} color="white" />
            </View>
            <View className="w-10 h-10 rounded-[14px] bg-white/10 items-center justify-center">
              <Ionicons name="trending-up-outline" size={18} color="white" />
            </View>
            <View className="w-10 h-10 rounded-[14px] bg-white/15 items-center justify-center">
              <Ionicons name="shield-checkmark-outline" size={18} color="white" />
            </View>
          </View>
        </View>

        <Text className="text-white text-[34px] font-extrabold text-center leading-tight mb-3">
          Your money,{'\n'}your control.
        </Text>
        <Text className="text-white/60 text-base text-center leading-6">
          Track balances, manage cards,{'\n'}and move money with confidence.
        </Text>
      </View>

      {/* Form card */}
      <View className="bg-white rounded-t-[32px] p-7 pb-12">
        <Text className="text-[22px] font-bold text-primary mb-1">Get Started</Text>
        <Text className="text-sm text-muted mb-6">Tell us your name to begin</Text>
        <OnboardingRegister onComplete={() => router.push('/register')} />
      </View>
    </View>
  );
}
