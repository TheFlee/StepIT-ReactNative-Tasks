import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import TopupModal from '@/components/TopupModal';

export default function Home() {
  const router = useRouter();
  const [userInfo] = useSecureStorage<{ name: string; surname: string }>('userInfo');
  const [topupVisible, setTopupVisible] = useState(false);

  const initials = `${userInfo?.name?.[0] ?? 'G'}${userInfo?.surname?.[0] ?? ''}`.toUpperCase();
  const shortName = userInfo
    ? `${userInfo.name} ${userInfo.surname?.[0] ?? ''}.`
    : 'Guest';

  return (
    <View className="flex-1 bg-app-bg">
      {/* Navy header */}
      <View className="bg-primary px-6 pt-14 pb-9">
        <View className="flex-row justify-between mb-5">
          <Ionicons name="grid" size={22} color="white" />
          <Ionicons name="ellipsis-vertical" size={22} color="white" />
        </View>
        <Text className="text-white/75 text-base mb-4">Welcome Back!</Text>
        <View className="flex-row items-center">
          <View className="w-[72px] h-[72px] rounded-full bg-accent items-center justify-center">
            <Text className="text-white text-2xl font-bold">{initials}</Text>
          </View>
          <View className="ml-4">
            <Text className="text-white text-lg font-bold">{shortName}</Text>
            <Text className="text-white text-[26px] font-bold mt-1">$4,763.40</Text>
            <Text className="text-white/65 text-sm">Available Balance</Text>
          </View>
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Section header */}
        <View className="flex-row justify-between items-center px-6 pt-7 mb-4">
          <Text className="text-lg font-bold text-primary">Activities</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/cards')}>
            <Text className="text-sm font-semibold text-accent">Monthly Report</Text>
          </TouchableOpacity>
        </View>

        {/* Activity cards */}
        <View className="flex-row px-6 gap-4 mb-4">
          {/* Loan card */}
          <View
            className="flex-1 bg-white rounded-[20px] p-4"
            style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}
          >
            <View className="flex-row justify-between items-center mb-3">
              <Text className="text-base font-bold text-primary">Loan</Text>
              <Text className="text-xs font-semibold text-accent">Details</Text>
            </View>
            <View className="flex-row gap-3 items-end">
              <View className="w-[52px] h-[52px] rounded-[14px] bg-accent items-center justify-center">
                <Ionicons name="wallet-outline" size={28} color="white" />
              </View>
              <View className="mt-2">
                <Text className="text-xs text-muted">Pending</Text>
                <Text className="text-base font-bold text-primary">$2,839.2</Text>
              </View>
            </View>
          </View>

          {/* Requests card */}
          <View className="flex-1 bg-primary rounded-[20px] p-4">
            <View className="w-11 h-11 rounded-xl bg-white/15 items-center justify-center mb-2">
              <Ionicons name="server-outline" size={26} color="white" />
            </View>
            <Text className="text-white text-2xl font-bold">18</Text>
            <Text className="text-white/80 text-sm mb-2">Requests</Text>
            <Text className="text-white/60 text-xs mb-2">Requests channel</Text>
            <View className="flex-row items-center">
              {['A', 'B', 'C'].map((l, i) => (
                <View
                  key={i}
                  className="w-[26px] h-[26px] rounded-full bg-accent items-center justify-center border-2 border-primary"
                  style={i > 0 ? { marginLeft: -8 } : undefined}
                >
                  <Text className="text-white text-[9px] font-bold">{l}</Text>
                </View>
              ))}
              <View
                className="w-[26px] h-[26px] rounded-full bg-white/20 items-center justify-center border-2 border-primary"
                style={{ marginLeft: -8 }}
              >
                <Text className="text-white text-[8px] font-bold">+14</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Topup button */}
        <TouchableOpacity
          className="mx-6 bg-primary rounded-[20px] py-7 items-center gap-2"
          onPress={() => setTopupVisible(true)}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-up-circle-outline" size={32} color="white" />
          <Text className="text-white text-base font-bold">Topup</Text>
        </TouchableOpacity>
      </ScrollView>

      <TopupModal visible={topupVisible} onClose={() => setTopupVisible(false)} />
    </View>
  );
}
