import { View, Text, Modal, TouchableOpacity, TextInput, Pressable, Alert } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  visible: boolean;
  onClose: () => void;
  mode: 'send' | 'pay';
  balance: number;
  onConfirm: (amount: number) => void;
}

export default function SendModal({ visible, onClose, mode, balance, onConfirm }: Props) {
  const [amount, setAmount] = useState('');
  const [recipient, setRecipient] = useState('');

  const isSend = mode === 'send';
  const title = isSend ? 'Send Money' : 'Pay';
  const recipientLabel = isSend ? 'Recipient Name' : 'Payee / Merchant';
  const recipientPlaceholder = isSend ? 'Full name' : 'e.g. Amazon, Rent';

  const handleConfirm = () => {
    const parsed = parseFloat(amount);
    if (isNaN(parsed) || parsed <= 0) return;
    if (parsed > balance) {
      Alert.alert('Insufficient funds', `Your balance is $${balance.toFixed(2)}`);
      return;
    }
    onConfirm(parsed);
    setAmount('');
    setRecipient('');
    onClose();
  };

  const isDisabled = !amount || !recipient.trim() || parseFloat(amount) <= 0;

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} onPress={onClose} />
      <View style={{ backgroundColor: 'white', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 }}>
        <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#E5E7EB', alignSelf: 'center', marginBottom: 20 }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name={isSend ? 'arrow-up-outline' : 'scan-outline'} size={20} color="#F97316" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#1E2460' }}>{title}</Text>
        </View>
        <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>
          Available balance: ${balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
        </Text>

        <Text style={{ fontSize: 13, fontWeight: '600', color: '#1E2460', marginBottom: 6 }}>Amount</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: '#F0F2F8', borderRadius: 16, paddingHorizontal: 20, paddingVertical: 16, marginBottom: 16 }}>
          <Text style={{ fontSize: 26, fontWeight: '700', color: '#1E2460', marginRight: 6 }}>$</Text>
          <TextInput
            style={{ flex: 1, fontSize: 26, fontWeight: '700', color: '#1E2460' }}
            value={amount}
            onChangeText={setAmount}
            keyboardType="numeric"
            placeholder="0.00"
            placeholderTextColor="#6B7280"
          />
        </View>

        <Text style={{ fontSize: 13, fontWeight: '600', color: '#1E2460', marginBottom: 6 }}>{recipientLabel}</Text>
        <TextInput
          style={{ backgroundColor: '#F0F2F8', borderRadius: 14, paddingHorizontal: 16, paddingVertical: 14, fontSize: 15, color: '#1E2460', marginBottom: 28 }}
          value={recipient}
          onChangeText={setRecipient}
          placeholder={recipientPlaceholder}
          placeholderTextColor="#6B7280"
        />

        <TouchableOpacity
          style={{ backgroundColor: isDisabled ? '#1E2460' : '#1E2460', borderRadius: 16, paddingVertical: 18, alignItems: 'center', opacity: isDisabled ? 0.4 : 1 }}
          onPress={handleConfirm}
          disabled={isDisabled}
          activeOpacity={0.85}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Confirm {title}</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
