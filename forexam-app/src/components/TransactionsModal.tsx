import {
  View, Text, Modal, TouchableOpacity,
  FlatList, Pressable, ActivityIndicator,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface DummyUser {
  id: number;
  firstName: string;
  lastName: string;
}

interface Props {
  visible: boolean;
  onClose: () => void;
}

const MOCK_DATES = ['July 20', 'July 22', 'July 24', 'July 27', 'July 28', 'July 29', 'July 30', 'Aug 1'];

export default function TransactionsModal({ visible, onClose }: Props) {
  const [users, setUsers] = useState<DummyUser[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!visible) return;
    setLoading(true);
    axios.get('https://dummyjson.com/users?limit=8')
      .then(res => setUsers(res.data.users))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [visible]);

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable className="flex-1 bg-black/40" onPress={onClose} />
      <View className="bg-white rounded-t-[28px] p-6 pb-10 max-h-[80%]">
        <View className="w-10 h-1 rounded bg-gray-200 self-center mb-5" />

        <View className="flex-row justify-between items-center mb-1.5">
          <Text className="text-xl font-bold text-primary">Transactions</Text>
          <Text className="text-sm text-muted">July, 2024</Text>
        </View>
        <Text className="text-xs text-muted mb-5">
          History of all transactions from following clients
        </Text>

        {loading ? (
          <ActivityIndicator size="large" color="#1E2460" style={{ marginVertical: 32 }} />
        ) : (
          <FlatList
            data={users}
            keyExtractor={item => String(item.id)}
            scrollEnabled={false}
            renderItem={({ item, index }) => (
              <View className="flex-row items-center py-2.5 gap-3">
                <View className="w-11 h-11 rounded-full bg-accent items-center justify-center">
                  <Text className="text-white text-sm font-bold">
                    {item.firstName[0]}{item.lastName[0]}
                  </Text>
                </View>
                <View className="flex-1">
                  <Text className="text-sm font-bold text-primary">
                    ${item.id * 37 + 50}
                  </Text>
                  <Text className="text-xs text-muted mt-0.5">
                    Received from {item.firstName} {item.lastName}
                  </Text>
                </View>
                <Text className="text-xs text-muted">
                  {MOCK_DATES[index % MOCK_DATES.length]}
                </Text>
              </View>
            )}
            ItemSeparatorComponent={() => <View className="h-px bg-gray-100" />}
          />
        )}

        <TouchableOpacity
          className="bg-primary rounded-2xl py-[18px] items-center mt-5"
          onPress={onClose}
          activeOpacity={0.85}
        >
          <Text className="text-white text-sm font-bold">See all Transactions</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
