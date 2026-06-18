import { View, Text, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';

const InfoRow = ({ icon, label, value }: { icon: string; label: string; value: string }) => (
  <View className="flex-row items-center py-2.5 gap-3">
    <View className="w-9 h-9 rounded-[10px] bg-orange-50 items-center justify-center">
      <Ionicons name={icon as any} size={18} color="#F97316" />
    </View>
    <View className="flex-1">
      <Text className="text-xs text-muted mb-0.5">{label}</Text>
      <Text className="text-sm font-semibold text-primary">{value}</Text>
    </View>
  </View>
);

export default function Profile() {
  const router = useRouter();
  const [userInfo, , deleteUserInfo] = useSecureStorage<{
    name: string; surname: string; phone?: string; email?: string;
  }>('userInfo');
  const [darkmode, setDarkmode] = useAsyncStorage<boolean>('darkmode', false);

  const rows = [
    { icon: 'person-outline', label: 'Full Name', value: `${userInfo?.name ?? ''} ${userInfo?.surname ?? ''}`.trim() },
    { icon: 'call-outline', label: 'Phone', value: userInfo?.phone ?? '—' },
    { icon: 'mail-outline', label: 'Email', value: userInfo?.email ?? '—' },
  ];

  const handleLogout = async () => {
    await deleteUserInfo();
    router.replace('/');
  };

  return (
    <View className="flex-1">
      <View className="bg-primary pt-14 pb-8 items-center">
        <View className="w-[72px] h-[72px] rounded-full bg-accent items-center justify-center mb-3">
          <Text className="text-[28px] font-bold text-white">
            {(userInfo?.name?.[0] ?? 'G').toUpperCase()}
          </Text>
        </View>
        <Text className="text-xl font-bold text-white mb-1">
          {userInfo?.name ?? 'Guest'} {userInfo?.surname ?? ''}
        </Text>
        <Text className="text-sm text-white/70">{userInfo?.email ?? ''}</Text>
      </View>

      <View className="flex-1 bg-app-bg p-4">
        <View
          className="bg-white rounded-[20px] p-4"
          style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
        >
          <Text className="text-xs font-bold text-muted uppercase tracking-wide mb-3">Account Info</Text>
          <FlashList
            data={rows}
            keyExtractor={item => item.label}
            renderItem={({ item }) => <InfoRow {...item} />}
            scrollEnabled={false}
          />
        </View>

        <View
          className="bg-white rounded-[20px] p-4 mt-3"
          style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
        >
          <View className="flex-row items-center py-3 gap-3">
            <View className="w-9 h-9 rounded-[10px] bg-orange-50 items-center justify-center">
              <Ionicons name="moon-outline" size={18} color="#F97316" />
            </View>
            <Text className="flex-1 text-base font-semibold text-primary">Dark Mode</Text>
            <Switch
              value={darkmode}
              onValueChange={setDarkmode}
              trackColor={{ false: '#E5E7EB', true: '#1E2460' }}
              thumbColor={darkmode ? '#F97316' : '#FFFFFF'}
            />
          </View>
        </View>

        <View
          className="bg-white rounded-[20px] mt-3"
          style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
        >
          <TouchableOpacity
            className="flex-row items-center px-4 py-3 gap-3"
            onPress={() => router.push('/editinfo')}
            activeOpacity={0.8}
          >
            <View className="w-9 h-9 rounded-[10px] bg-orange-50 items-center justify-center">
              <Ionicons name="create-outline" size={18} color="#F97316" />
            </View>
            <Text className="flex-1 text-base font-semibold text-primary">Edit Profile</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-row items-center px-4 py-3 gap-3 border-t border-gray-100"
            onPress={() => router.push('/addcart')}
            activeOpacity={0.8}
          >
            <View className="w-9 h-9 rounded-[10px] bg-orange-50 items-center justify-center">
              <Ionicons name="card-outline" size={18} color="#F97316" />
            </View>
            <Text className="flex-1 text-base font-semibold text-primary">Add Card</Text>
            <Ionicons name="chevron-forward" size={16} color="#6B7280" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          className="flex-row items-center justify-center gap-2 mt-5 py-4 bg-red-50 rounded-xl"
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text className="text-base font-semibold text-danger">Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
