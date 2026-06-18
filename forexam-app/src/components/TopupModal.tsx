import { View, Text, Modal, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';

interface Props {
  visible: boolean;
  onClose: () => void;
}

const QUICK_AMOUNTS = ['$50', '$100', '$200', '$500'];

export default function TopupModal({ visible, onClose }: Props) {
  const [amount, setAmount] = useState('');

  const handleQuick = (val: string) => setAmount(val.replace('$', ''));
  const handleConfirm = () => { setAmount(''); onClose(); };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />
      <View className="bg-white rounded-t-[28px] p-6 pb-10">
        <View className="w-10 h-1 rounded bg-gray-200 self-center mb-5" />
        <Text className="text-[22px] font-bold text-primary mb-1.5">Top Up</Text>
        <Text className="text-sm text-muted mb-6">Enter amount to top up your balance</Text>

        <View className="flex-row items-center bg-app-bg rounded-2xl px-5 py-4 mb-5">
          <Text className="text-[28px] font-bold text-primary mr-2">$</Text>
          <TextInput
            className="flex-1 text-[28px] font-bold text-primary"
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View className="flex-row gap-2.5 mb-7">
          {QUICK_AMOUNTS.map(q => (
            <TouchableOpacity
              key={q}
              className="flex-1 bg-app-bg rounded-xl py-3 items-center"
              onPress={() => handleQuick(q)}
            >
              <Text className="text-sm font-semibold text-primary">{q}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          className={`bg-primary rounded-2xl py-[18px] items-center${!amount ? ' opacity-40' : ''}`}
          onPress={handleConfirm}
          disabled={!amount}
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-bold">Confirm Top Up</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
