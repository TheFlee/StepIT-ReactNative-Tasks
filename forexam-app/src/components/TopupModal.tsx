import { View, Text, Modal, TouchableOpacity, TextInput, Pressable } from 'react-native';
import React, { useState } from 'react';
import { useTheme } from '@/context/DarkModeContext';

interface Props {
  visible: boolean;
  onClose: () => void;
  onTopup?: (amount: number) => void;
}

const QUICK_AMOUNTS = ['$50', '$100', '$200', '$500'];

export default function TopupModal({ visible, onClose, onTopup }: Props) {
  const [amount, setAmount] = useState('');
  const { card, bg, text, inputBorder } = useTheme();

  const handleQuick = (val: string) => setAmount(val.replace('$', ''));
  const handleConfirm = () => {
    const parsed = parseFloat(amount);
    if (!isNaN(parsed) && parsed > 0) onTopup?.(parsed);
    setAmount('');
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} onPress={onClose} />
      <View style={{ backgroundColor: card, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 }}>
        <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: inputBorder, alignSelf: 'center', marginBottom: 20 }} />
        <Text style={{ fontSize: 22, fontWeight: '700', color: text, marginBottom: 4 }}>Top Up</Text>
        <Text style={{ fontSize: 13, color: '#8E8E93', marginBottom: 24 }}>Enter amount to add to your balance</Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: bg, borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, marginBottom: 20 }}>
          <Text style={{ fontSize: 28, fontWeight: '700', color: text, marginRight: 6 }}>$</Text>
          <TextInput
            style={{ flex: 1, fontSize: 28, fontWeight: '700', color: text }}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#6B7280"
          />
        </View>

        <View style={{ flexDirection: 'row', gap: 10, marginBottom: 28 }}>
          {QUICK_AMOUNTS.map(q => (
            <TouchableOpacity
              key={q}
              style={{ flex: 1, backgroundColor: bg, borderRadius: 12, paddingVertical: 12, alignItems: 'center' }}
              onPress={() => handleQuick(q)}
            >
              <Text style={{ fontSize: 13, fontWeight: '600', color: text }}>{q}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#1E2460', borderRadius: 16, paddingVertical: 18, alignItems: 'center', opacity: !amount ? 0.4 : 1 }}
          onPress={handleConfirm}
          disabled={!amount}
          activeOpacity={0.85}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Confirm Top Up</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
