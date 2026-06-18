import { View, TextInput, TouchableOpacity, Text, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import { useTheme } from '@/context/DarkModeContext';

const STEPS = ['Phone', 'Email', 'Password'];

export default function Register() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useSecureStorage<{
    name: string; surname: string; phone?: string; email?: string; password?: string;
  }>('userInfo');

  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({ phone: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { bg, card, text, inputBg, inputBorder } = useTheme();

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 1 && !formData.phone.trim()) e.phone = 'Phone is required';
    if (step === 2 && !/\S+@\S+\.\S+/.test(formData.email)) e.email = 'Valid email required';
    if (step === 3) {
      if (formData.password.length < 6) e.password = 'Min 6 characters';
      if (formData.password !== formData.confirmPassword) e.confirmPassword = 'Passwords do not match';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;
    if (step < 3) { setStep(s => s + 1); return; }
    if (!userInfo) return;
    await setUserInfo({ ...userInfo, phone: formData.phone, email: formData.email, password: formData.password });
    router.replace('/(tabs)');
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: bg }} contentContainerStyle={{ flexGrow: 1, padding: 24 }} keyboardShouldPersistTaps="handled">
      <View className="flex-row items-center mb-8 mt-2">
        <TouchableOpacity
          onPress={() => step > 1 ? setStep(s => s - 1) : router.back()}
          className="p-2 mr-3"
        >
          <Text className="text-[22px] text-primary font-semibold">←</Text>
        </TouchableOpacity>
        <Text className="text-xl font-bold text-primary">Create Account</Text>
      </View>

      <View className="flex-row justify-center gap-6 mb-8">
        {STEPS.map((label, i) => (
          <View key={label} className="items-center gap-1.5">
            <View className={`w-3 h-3 rounded-full ${i + 1 <= step ? 'bg-accent' : 'bg-gray-200'}`} />
            <Text className={`text-xs ${i + 1 <= step ? 'text-accent font-semibold' : 'text-muted'}`}>
              {label}
            </Text>
          </View>
        ))}
      </View>

      <View style={{ backgroundColor: card, borderRadius: 20, padding: 24, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}>
        {step === 1 && (
          <>
            <Text style={{ fontSize: 13, fontWeight: '600', color: text, marginBottom: 6 }}>Phone Number</Text>
            <TextInput
              style={{ borderWidth: 1.5, borderColor: errors.phone ? '#EF4444' : inputBorder, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: text, backgroundColor: inputBg }}
              placeholder="+1 234 567 8900"
              placeholderTextColor="#6B7280"
              keyboardType="phone-pad"
              value={formData.phone}
              onChangeText={t => setFormData(p => ({ ...p, phone: t }))}
            />
            {errors.phone ? <Text className="text-xs text-danger mt-1">{errors.phone}</Text> : null}
          </>
        )}

        {step === 2 && (
          <>
            <Text style={{ fontSize: 13, fontWeight: '600', color: text, marginBottom: 6 }}>Email Address</Text>
            <TextInput
              style={{ borderWidth: 1.5, borderColor: errors.email ? '#EF4444' : inputBorder, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: text, backgroundColor: inputBg }}
              placeholder="you@example.com"
              placeholderTextColor="#6B7280"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={t => setFormData(p => ({ ...p, email: t }))}
            />
            {errors.email ? <Text className="text-xs text-danger mt-1">{errors.email}</Text> : null}
          </>
        )}

        {step === 3 && (
          <>
            <Text style={{ fontSize: 13, fontWeight: '600', color: text, marginBottom: 6 }}>Password</Text>
            <TextInput
              style={{ borderWidth: 1.5, borderColor: errors.password ? '#EF4444' : inputBorder, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: text, backgroundColor: inputBg }}
              placeholder="Min 6 characters"
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={formData.password}
              onChangeText={t => setFormData(p => ({ ...p, password: t }))}
            />
            {errors.password ? <Text className="text-xs text-danger mt-1">{errors.password}</Text> : null}

            <Text style={{ fontSize: 13, fontWeight: '600', color: text, marginBottom: 6, marginTop: 16 }}>Confirm Password</Text>
            <TextInput
              style={{ borderWidth: 1.5, borderColor: errors.confirmPassword ? '#EF4444' : inputBorder, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: text, backgroundColor: inputBg }}
              placeholder="Repeat password"
              placeholderTextColor="#6B7280"
              secureTextEntry
              value={formData.confirmPassword}
              onChangeText={t => setFormData(p => ({ ...p, confirmPassword: t }))}
            />
            {errors.confirmPassword ? <Text className="text-xs text-danger mt-1">{errors.confirmPassword}</Text> : null}
          </>
        )}

        <TouchableOpacity
          style={{ marginTop: 28, backgroundColor: '#1E2460', borderRadius: 12, paddingVertical: 16, alignItems: 'center' }}
          onPress={handleNext}
          activeOpacity={0.85}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>{step === 3 ? 'Finish' : 'Next'}</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
