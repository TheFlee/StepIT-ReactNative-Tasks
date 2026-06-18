import { View, Text, TouchableOpacity, Switch } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FlashList } from '@shopify/flash-list';
import { useRouter } from 'expo-router';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import { useTheme } from '@/context/DarkModeContext';

const InfoRow = ({
  icon, label, value, text, secondary,
}: {
  icon: string; label: string; value: string; text: string; secondary: string;
}) => (
  <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 10, gap: 12 }}>
    <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' }}>
      <Ionicons name={icon as any} size={18} color="#F97316" />
    </View>
    <View style={{ flex: 1 }}>
      <Text style={{ fontSize: 11, color: secondary, marginBottom: 2 }}>{label}</Text>
      <Text style={{ fontSize: 13, fontWeight: '600', color: text }}>{value}</Text>
    </View>
  </View>
);

export default function Profile() {
  const router = useRouter();
  const [userInfo, , deleteUserInfo] = useSecureStorage<{
    name: string; surname: string; phone?: string; email?: string;
  }>('userInfo');
  const { darkmode, setDarkmode, bg, card, text, textSecondary, divider } = useTheme();

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
    <View style={{ flex: 1, backgroundColor: bg }}>
      <View style={{ backgroundColor: '#1E2460', paddingTop: 56, paddingBottom: 32, alignItems: 'center' }}>
        <View style={{ width: 72, height: 72, borderRadius: 36, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center', marginBottom: 12 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: 'white' }}>
            {(userInfo?.name?.[0] ?? 'G').toUpperCase()}
          </Text>
        </View>
        <Text style={{ fontSize: 19, fontWeight: '700', color: 'white', marginBottom: 4 }}>
          {userInfo?.name ?? 'Guest'} {userInfo?.surname ?? ''}
        </Text>
        <Text style={{ fontSize: 13, color: 'rgba(255,255,255,0.65)' }}>{userInfo?.email ?? ''}</Text>
      </View>

      <View style={{ flex: 1, backgroundColor: bg, padding: 16 }}>
        {/* Account info card */}
        <View style={{ backgroundColor: card, borderRadius: 20, padding: 16, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
          <Text style={{ fontSize: 11, fontWeight: '700', color: textSecondary, textTransform: 'uppercase', letterSpacing: 0.8, marginBottom: 8 }}>Account Info</Text>
          <FlashList
            data={rows}
            keyExtractor={item => item.label}
            renderItem={({ item }) => <InfoRow {...item} text={text} secondary={textSecondary} />}
            scrollEnabled={false}
          />
        </View>

        {/* Dark mode toggle */}
        <View style={{ backgroundColor: card, borderRadius: 20, padding: 16, marginTop: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="moon-outline" size={18} color="#F97316" />
            </View>
            <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: text }}>Dark Mode</Text>
            <Switch
              value={darkmode}
              onValueChange={setDarkmode}
              trackColor={{ false: '#E5E7EB', true: '#F97316' }}
              thumbColor="#FFFFFF"
            />
          </View>
        </View>

        {/* Actions card */}
        <View style={{ backgroundColor: card, borderRadius: 20, marginTop: 12, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}>
          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 }}
            onPress={() => router.push('/editinfo')}
            activeOpacity={0.8}
          >
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="create-outline" size={18} color="#F97316" />
            </View>
            <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: text }}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={16} color={textSecondary} />
          </TouchableOpacity>

          <View style={{ height: 1, backgroundColor: divider, marginHorizontal: 16 }} />

          <TouchableOpacity
            style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 14, gap: 12 }}
            onPress={() => router.push('/addcart')}
            activeOpacity={0.8}
          >
            <View style={{ width: 36, height: 36, borderRadius: 10, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="card-outline" size={18} color="#F97316" />
            </View>
            <Text style={{ flex: 1, fontSize: 15, fontWeight: '600', color: text }}>Add Card</Text>
            <Ionicons name="chevron-forward" size={16} color={textSecondary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, marginTop: 20, paddingVertical: 16, backgroundColor: darkmode ? '#2C1010' : '#FEF2F2', borderRadius: 14 }}
          onPress={handleLogout}
          activeOpacity={0.85}
        >
          <Ionicons name="log-out-outline" size={18} color="#EF4444" />
          <Text style={{ fontSize: 15, fontWeight: '600', color: '#EF4444' }}>Sign Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
