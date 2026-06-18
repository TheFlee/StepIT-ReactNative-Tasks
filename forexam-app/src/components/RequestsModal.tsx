import { View, Text, Modal, TouchableOpacity, Pressable, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useTheme } from '@/context/DarkModeContext';

interface Request {
  id: number;
  firstName: string;
  lastName: string;
  amount: number;
  status: 'pending' | 'approved' | 'declined';
}

interface Props {
  visible: boolean;
  onClose: () => void;
  onApprove: (amount: number) => void;
}

export default function RequestsModal({ visible, onClose, onApprove }: Props) {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(false);
  const { card, bg, text, textSecondary, divider } = useTheme();

  useEffect(() => {
    if (!visible || requests.length > 0) return;
    setLoading(true);
    axios.get('https://dummyjson.com/users?limit=18')
      .then(res => {
        const users = res.data.users;
        setRequests(users.map((u: any) => ({
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          amount: (u.id * 43 + 25),
          status: 'pending' as const,
        })));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [visible]);

  const pending = requests.filter(r => r.status === 'pending');
  const processed = requests.filter(r => r.status !== 'pending');

  const handleApprove = (id: number, amount: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'approved' } : r));
    onApprove(amount);
  };

  const handleDecline = (id: number) => {
    setRequests(prev => prev.map(r => r.id === id ? { ...r, status: 'declined' } : r));
  };

  const renderItem = ({ item }: { item: Request }) => {
    const initials = `${item.firstName[0]}${item.lastName[0]}`;
    const isPending = item.status === 'pending';

    return (
      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: divider }}>
        <View style={{ width: 42, height: 42, borderRadius: 21, backgroundColor: '#1E2460', alignItems: 'center', justifyContent: 'center', marginRight: 12 }}>
          <Text style={{ color: 'white', fontSize: 13, fontWeight: '700' }}>{initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={{ fontSize: 14, fontWeight: '600', color: text }}>{item.firstName} {item.lastName}</Text>
          <Text style={{ fontSize: 12, color: '#059669', fontWeight: '600', marginTop: 1 }}>+${item.amount}</Text>
        </View>
        {isPending ? (
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity
              style={{ paddingHorizontal: 14, paddingVertical: 7, backgroundColor: '#059669', borderRadius: 10 }}
              onPress={() => handleApprove(item.id, item.amount)}
              activeOpacity={0.8}
            >
              <Text style={{ color: 'white', fontSize: 12, fontWeight: '700' }}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{ paddingHorizontal: 14, paddingVertical: 7, backgroundColor: bg, borderRadius: 10 }}
              onPress={() => handleDecline(item.id)}
              activeOpacity={0.8}
            >
              <Text style={{ color: '#EF4444', fontSize: 12, fontWeight: '700' }}>Decline</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons
              name={item.status === 'approved' ? 'checkmark-circle' : 'close-circle'}
              size={18}
              color={item.status === 'approved' ? '#059669' : '#EF4444'}
            />
            <Text style={{ fontSize: 12, color: item.status === 'approved' ? '#059669' : '#EF4444', fontWeight: '600' }}>
              {item.status === 'approved' ? 'Accepted' : 'Declined'}
            </Text>
          </View>
        )}
      </View>
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' }} onPress={onClose} />
      <View style={{ backgroundColor: card, borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '80%' }}>
        <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: textSecondary + '40', alignSelf: 'center', marginTop: 12, marginBottom: 20 }} />

        <View style={{ paddingHorizontal: 24, marginBottom: 16 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: '700', color: text }}>Requests</Text>
            <View style={{ backgroundColor: '#1E2460', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 4 }}>
              <Text style={{ color: 'white', fontSize: 13, fontWeight: '700' }}>{pending.length} pending</Text>
            </View>
          </View>
          <Text style={{ fontSize: 12, color: textSecondary, marginTop: 4 }}>
            Accept to receive funds into your balance
          </Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#1E2460" style={{ marginVertical: 40 }} />
        ) : (
          <FlatList
            data={requests}
            keyExtractor={item => String(item.id)}
            renderItem={renderItem}
            contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 36 }}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </Modal>
  );
}
