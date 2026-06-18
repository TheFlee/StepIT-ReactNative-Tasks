import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import { useTheme } from '@/context/DarkModeContext';
import VisaCard from '@/components/VisaCard';

interface CardInfo {
  number: string;
  expiry: string;
  cvv: string;
  holder: string;
}

const DEFAULT_CARD: CardInfo = { number: '', expiry: '', cvv: '', holder: '' };

const formatCardNumber = (val: string) =>
  val.replace(/\D/g, '').slice(0, 16).replace(/(.{4})/g, '$1 ').trim();

export default function AddCart() {
  const router = useRouter();
  const [, setCardInfo] = useAsyncStorage<CardInfo>('cardInfo', DEFAULT_CARD);
  const [form, setForm] = useState<CardInfo>(DEFAULT_CARD);
  const [errors, setErrors] = useState<Partial<CardInfo>>({});
  const { bg, card, text, inputBg, inputBorder } = useTheme();
  const bgColor = bg;
  const textColor = text;
  const borderColor = inputBorder;

  const validate = () => {
    const e: Partial<CardInfo> = {};
    if (form.number.replace(/\s/g, '').length < 16) e.number = 'Enter 16-digit card number';
    if (!/^\d{2}\/\d{2}$/.test(form.expiry)) e.expiry = 'Format: MM/YY';
    if (form.cvv.length < 3) e.cvv = '3-4 digit CVV';
    if (!form.holder.trim()) e.holder = 'Card holder name required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSave = async () => {
    if (!validate()) return;
    await setCardInfo(form);
    Alert.alert('Saved', 'Card saved successfully');
    router.back();
  };

  const maskedNumber = form.number
    ? form.number.replace(/\d(?=.{5})/g, '•')
    : '•••• •••• •••• ••••';

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      <View className="bg-primary pt-[52px] pb-4 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Add Card</Text>
      </View>

      {/* Card preview */}
      <View style={{ marginHorizontal: 20, marginTop: 20, shadowColor: '#1E2460', shadowOpacity: 0.35, shadowRadius: 20, elevation: 12 }}>
        <VisaCard
          cardNumber={maskedNumber}
          holder={form.holder || 'Card Holder'}
          expiry={form.expiry || 'MM/YY'}
          balance="New Card"
        />
      </View>

      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor, marginBottom: 6, marginTop: 14 }}>Card Number</Text>
        <TextInput
          style={{ backgroundColor: inputBg, borderWidth: 1.5, borderColor: errors.number ? '#EF4444' : borderColor, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: textColor }}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={form.number}
          onChangeText={t => setForm(p => ({ ...p, number: formatCardNumber(t) }))}
          maxLength={19}
        />
        {errors.number ? <Text className="text-xs text-danger mt-1">{errors.number}</Text> : null}

        <Text style={{ fontSize: 12, fontWeight: '600', color: textColor, marginBottom: 6, marginTop: 14 }}>Card Holder</Text>
        <TextInput
          style={{ backgroundColor: inputBg, borderWidth: 1.5, borderColor: errors.holder ? '#EF4444' : borderColor, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: textColor }}
          placeholder="Full Name"
          placeholderTextColor="#6B7280"
          value={form.holder}
          onChangeText={t => setForm(p => ({ ...p, holder: t }))}
        />
        {errors.holder ? <Text className="text-xs text-danger mt-1">{errors.holder}</Text> : null}

        <View style={{ flexDirection: 'row', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: textColor, marginBottom: 6, marginTop: 14 }}>Expiry</Text>
            <TextInput
              style={{ backgroundColor: inputBg, borderWidth: 1.5, borderColor: errors.expiry ? '#EF4444' : borderColor, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: textColor }}
              placeholder="MM/YY"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              value={form.expiry}
              onChangeText={t => {
                const cleaned = t.replace(/\D/g, '').slice(0, 4);
                const formatted = cleaned.length > 2 ? cleaned.slice(0, 2) + '/' + cleaned.slice(2) : cleaned;
                setForm(p => ({ ...p, expiry: formatted }));
              }}
              maxLength={5}
            />
            {errors.expiry ? <Text className="text-xs text-danger mt-1">{errors.expiry}</Text> : null}
          </View>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 12, fontWeight: '600', color: textColor, marginBottom: 6, marginTop: 14 }}>CVV</Text>
            <TextInput
              style={{ backgroundColor: inputBg, borderWidth: 1.5, borderColor: errors.cvv ? '#EF4444' : borderColor, borderRadius: 12, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: textColor }}
              placeholder="•••"
              placeholderTextColor="#6B7280"
              keyboardType="numeric"
              secureTextEntry
              value={form.cvv}
              onChangeText={t => setForm(p => ({ ...p, cvv: t.replace(/\D/g, '').slice(0, 4) }))}
              maxLength={4}
            />
            {errors.cvv ? <Text className="text-xs text-danger mt-1">{errors.cvv}</Text> : null}
          </View>
        </View>

        <TouchableOpacity
          className="bg-primary rounded-xl py-4 items-center mt-7"
          onPress={handleSave}
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-bold">Save Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
