import { Text, TextInput, View, TouchableOpacity, Alert } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';

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
    <View className="flex-1 bg-app-bg">
      <View className="bg-primary pt-[52px] pb-4 px-5 flex-row items-center gap-3">
        <TouchableOpacity onPress={() => router.back()} className="p-1">
          <Ionicons name="arrow-back" size={22} color="white" />
        </TouchableOpacity>
        <Text className="text-lg font-bold text-white">Add Card</Text>
      </View>

      {/* Card preview */}
      <View
        className="bg-primary mx-5 mt-5 rounded-[20px] p-6 pb-5 overflow-hidden"
        style={{ shadowColor: '#000', shadowOpacity: 0.2, shadowRadius: 12, elevation: 6 }}
      >
        <View className="absolute top-0 left-0 right-0 h-2 bg-accent rounded-t-[20px]" />
        <Text className="text-white/60 text-xs mb-2 mt-2">Current Balance</Text>
        <Text className="text-white text-xl font-bold tracking-widest mb-6">
          {maskedNumber}
        </Text>
        <View className="flex-row items-end">
          <Text className="flex-1 text-white text-sm font-semibold">
            {form.holder || 'Card Holder'}
          </Text>
          <Text className="text-white/80 text-sm mr-3">{form.expiry || 'MM/YY'}</Text>
          <Text className="text-white text-lg font-extrabold italic">VISA</Text>
        </View>
      </View>

      <View className="p-5">
        <Text className="text-xs font-semibold text-primary mb-1.5 mt-3.5">Card Number</Text>
        <TextInput
          className={`bg-white border-[1.5px] ${errors.number ? 'border-danger' : 'border-gray-200'} rounded-xl px-4 py-[14px] text-base text-primary`}
          placeholder="1234 5678 9012 3456"
          placeholderTextColor="#6B7280"
          keyboardType="numeric"
          value={form.number}
          onChangeText={t => setForm(p => ({ ...p, number: formatCardNumber(t) }))}
          maxLength={19}
        />
        {errors.number ? <Text className="text-xs text-danger mt-1">{errors.number}</Text> : null}

        <Text className="text-xs font-semibold text-primary mb-1.5 mt-3.5">Card Holder</Text>
        <TextInput
          className={`bg-white border-[1.5px] ${errors.holder ? 'border-danger' : 'border-gray-200'} rounded-xl px-4 py-[14px] text-base text-primary`}
          placeholder="Full Name"
          placeholderTextColor="#6B7280"
          value={form.holder}
          onChangeText={t => setForm(p => ({ ...p, holder: t }))}
        />
        {errors.holder ? <Text className="text-xs text-danger mt-1">{errors.holder}</Text> : null}

        <View className="flex-row gap-3">
          <View className="flex-1">
            <Text className="text-xs font-semibold text-primary mb-1.5 mt-3.5">Expiry</Text>
            <TextInput
              className={`bg-white border-[1.5px] ${errors.expiry ? 'border-danger' : 'border-gray-200'} rounded-xl px-4 py-[14px] text-base text-primary`}
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
          <View className="flex-1">
            <Text className="text-xs font-semibold text-primary mb-1.5 mt-3.5">CVV</Text>
            <TextInput
              className={`bg-white border-[1.5px] ${errors.cvv ? 'border-danger' : 'border-gray-200'} rounded-xl px-4 py-[14px] text-base text-primary`}
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
