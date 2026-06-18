import { Text, TextInput, View, TouchableOpacity, Alert, ScrollView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import { useTheme } from '@/context/DarkModeContext';

interface UserInfo {
  name: string;
  surname: string;
  phone?: string;
  email?: string;
  password?: string;
}

export default function EditInfo() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useSecureStorage<UserInfo>('userInfo');
  const [formData, setFormData] = useState<UserInfo>({ name: '', surname: '', phone: '', email: '' });
  const [errors, setErrors] = useState<Partial<UserInfo>>({});
  const { bg, card, text, inputBg, inputBorder } = useTheme();
  const bgColor = bg;
  const cardBg = card;
  const textColor = text;
  const borderColor = inputBorder;

  useEffect(() => {
    if (userInfo) setFormData(userInfo);
  }, [userInfo]);

  const validate = () => {
    const e: Partial<UserInfo> = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.surname.trim()) e.surname = 'Surname is required';
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Invalid email';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    await setUserInfo({ ...(userInfo ?? { name: '', surname: '' }), ...formData });
    Alert.alert('Saved', 'Profile updated');
    router.back();
  };

  const fields: {
    key: keyof UserInfo;
    label: string;
    placeholder: string;
    keyboard?: 'default' | 'phone-pad' | 'email-address';
    secure?: boolean;
  }[] = [
    { key: 'name', label: 'First Name', placeholder: 'First name' },
    { key: 'surname', label: 'Last Name', placeholder: 'Last name' },
    { key: 'phone', label: 'Phone', placeholder: '+1 234 567 8900', keyboard: 'phone-pad' },
    { key: 'email', label: 'Email', placeholder: 'you@example.com', keyboard: 'email-address' },
  ];

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bgColor }} keyboardShouldPersistTaps="handled">
      <View className="bg-primary pt-[52px] pb-5 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Edit Profile</Text>
      </View>

      <View
        style={{ backgroundColor: cardBg, margin: 16, borderRadius: 20, padding: 20, shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2 }}
      >
        {fields.map(f => (
          <View key={f.key} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: textColor, marginBottom: 6 }}>{f.label}</Text>
            <TextInput
              style={{
                borderWidth: 1.5,
                borderColor: errors[f.key] ? '#EF4444' : borderColor,
                borderRadius: 12,
                paddingHorizontal: 16,
                paddingVertical: 14,
                fontSize: 15,
                color: textColor,
                backgroundColor: inputBg,
              }}
              placeholder={f.placeholder}
              placeholderTextColor="#6B7280"
              keyboardType={f.keyboard ?? 'default'}
              secureTextEntry={f.secure}
              autoCapitalize={f.keyboard === 'email-address' ? 'none' : 'words'}
              value={formData[f.key] ?? ''}
              onChangeText={t => setFormData(p => ({ ...p, [f.key]: t }))}
            />
            {errors[f.key] ? (
              <Text className="text-xs text-danger mt-1">{errors[f.key]}</Text>
            ) : null}
          </View>
        ))}

        <TouchableOpacity
          className="bg-accent rounded-xl py-4 items-center mt-2"
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-bold">Save Changes</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
