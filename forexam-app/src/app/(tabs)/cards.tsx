import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import VisaCard from '@/components/VisaCard';
import TransactionsModal from '@/components/TransactionsModal';

type ActiveTab = 'cards' | 'deposits' | 'transactions';

const PAYMENT_CATEGORIES = [
  { title: 'Shopping', date: '20 June 2024, 2:20 PM', icon: 'cart-outline' as const },
  { title: 'Grocery', date: '19 June 2024, 1:20 PM', icon: 'nutrition-outline' as const },
  { title: 'Pharmacy', date: '22 July 2024, 2:00 PM', icon: 'medical-outline' as const },
  { title: 'Bills', date: '25 July 2024, 2:20 PM', icon: 'receipt-outline' as const },
];

const TAB_LABELS: Record<ActiveTab, string> = {
  cards: 'My Cards',
  deposits: 'Deposits',
  transactions: 'Transactions',
};

export default function Cards() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<ActiveTab>('cards');
  const [transVisible, setTransVisible] = useState(false);

  return (
    <View className="flex-1 bg-app-bg">
      {/* Header */}
      <View className="flex-row justify-between items-center px-5 pt-14 pb-4 bg-app-bg">
        <TouchableOpacity
          onPress={() => router.back()}
          className="w-10 h-10 rounded-full bg-white items-center justify-center"
          style={{ shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2 }}
        >
          <Ionicons name="chevron-back" size={22} color="#1E2460" />
        </TouchableOpacity>
        <TouchableOpacity className="w-10 h-10 rounded-full bg-primary items-center justify-center">
          <Ionicons name="add" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View className="flex-row px-5 mb-2">
        {(Object.keys(TAB_LABELS) as ActiveTab[]).map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className="flex-1 items-center pb-2.5"
          >
            <Text
              className={`text-sm font-semibold ${activeTab === tab ? 'text-primary' : 'text-muted'}`}
            >
              {TAB_LABELS[tab]}
            </Text>
            {activeTab === tab && (
              <View className="absolute bottom-0 h-0.5 w-full bg-primary rounded" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Stacked card visual */}
        <View className="relative h-[200px] mx-5">
          <View
            className="absolute left-2.5 right-2.5 h-[155px] rounded-[20px]"
            style={{ top: 0, backgroundColor: '#8B6914', opacity: 0.5 }}
          />
          <View
            className="absolute left-2.5 right-2.5 h-[155px] rounded-[20px] bg-primary"
            style={{ top: 14, opacity: 0.7 }}
          />
          <View className="mt-7">
            <VisaCard />
          </View>
        </View>

        {activeTab === 'transactions' ? (
          <View className="px-5 mt-6">
            <TouchableOpacity
              className="bg-primary rounded-2xl py-[18px] items-center"
              onPress={() => setTransVisible(true)}
              activeOpacity={0.85}
            >
              <Text className="text-white text-sm font-bold">View Transactions</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <Text className="text-lg font-bold text-primary mx-5 mt-7 mb-4">Payment Details</Text>
            <View className="flex-row flex-wrap px-5 gap-3">
              {PAYMENT_CATEGORIES.map(cat => (
                <View
                  key={cat.title}
                  className="bg-white rounded-2xl p-4"
                  style={{
                    width: '47%',
                    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
                  }}
                >
                  <View className="flex-row justify-between items-center mb-1.5">
                    <Text className="text-sm font-bold text-primary">{cat.title}</Text>
                    <Ionicons name="ellipsis-vertical" size={16} color="#6B7280" />
                  </View>
                  <Text className="text-xs text-muted mb-4">{cat.date}</Text>
                  <View className="self-end">
                    <Ionicons name={cat.icon} size={22} color="#F97316" />
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>

      <TransactionsModal visible={transVisible} onClose={() => setTransVisible(false)} />
    </View>
  );
}
