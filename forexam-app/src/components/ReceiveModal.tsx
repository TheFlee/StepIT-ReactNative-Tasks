import { View, Text, Modal, TouchableOpacity, Pressable } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useSecureStorage } from '@/hooks/useSecureStorage';

interface Props {
  visible: boolean;
  onClose: () => void;
}

export default function ReceiveModal({ visible, onClose }: Props) {
  const [userInfo] = useSecureStorage<{ name: string; surname: string }>('userInfo');
  const accountNumber = '4210 8837 0042 9975';
  const iban = 'AZ21 NABZ 0000 0000 1370 1000 1944';
  const fullName = userInfo ? `${userInfo.name} ${userInfo.surname}` : 'Account Holder';

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.4)' }} onPress={onClose} />
      <View style={{ backgroundColor: 'white', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 40 }}>
        <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: '#E5E7EB', alignSelf: 'center', marginBottom: 20 }} />

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10, marginBottom: 4 }}>
          <View style={{ width: 38, height: 38, borderRadius: 12, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name="arrow-down-outline" size={20} color="#F97316" />
          </View>
          <Text style={{ fontSize: 20, fontWeight: '700', color: '#1E2460' }}>Receive Money</Text>
        </View>
        <Text style={{ fontSize: 13, color: '#6B7280', marginBottom: 24 }}>Share your details to receive a transfer</Text>

        <View style={{ backgroundColor: '#F0F2F8', borderRadius: 20, padding: 20, marginBottom: 16 }}>
          <Text style={{ fontSize: 11, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Account Holder</Text>
          <Text style={{ fontSize: 16, fontWeight: '700', color: '#1E2460', marginBottom: 20 }}>{fullName}</Text>

          <Text style={{ fontSize: 11, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>Account Number</Text>
          <Text style={{ fontSize: 18, fontWeight: '700', color: '#1E2460', letterSpacing: 2, marginBottom: 20 }}>{accountNumber}</Text>

          <Text style={{ fontSize: 11, color: '#6B7280', marginBottom: 4, textTransform: 'uppercase', letterSpacing: 1 }}>IBAN</Text>
          <Text style={{ fontSize: 13, fontWeight: '600', color: '#1E2460', letterSpacing: 1 }}>{iban}</Text>
        </View>

        <TouchableOpacity
          style={{ backgroundColor: '#1E2460', borderRadius: 16, paddingVertical: 18, alignItems: 'center' }}
          onPress={onClose}
          activeOpacity={0.85}
        >
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Done</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
