import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import { useTheme } from '@/context/DarkModeContext';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import VisaCard from '@/components/VisaCard';
import TransactionsModal from '@/components/TransactionsModal';

type ActiveTab = 'cards' | 'deposits' | 'transactions';

const PAYMENT_CATEGORIES = [
  { title: 'Shopping', date: '20 June 2024', icon: 'cart-outline' as const, amount: '$142.00' },
  { title: 'Grocery', date: '19 June 2024', icon: 'nutrition-outline' as const, amount: '$67.50' },
  { title: 'Pharmacy', date: '22 July 2024', icon: 'medical-outline' as const, amount: '$23.90' },
  { title: 'Bills', date: '25 July 2024', icon: 'receipt-outline' as const, amount: '$210.00' },
];

const DEPOSITS = [
  { title: 'Emergency Fund', progress: 0.72, target: '$10,000', saved: '$7,200', color: '#1E2460' },
  { title: 'Vacation 2025', progress: 0.38, target: '$3,000', saved: '$1,140', color: '#F97316' },
  { title: 'New Laptop', progress: 0.55, target: '$1,500', saved: '$825', color: '#059669' },
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
  const { bg, card, text, textSecondary, divider } = useTheme();
  const [balance] = useAsyncStorage<number>('balance', 4763.40);
  const [userInfo] = useSecureStorage<{ name: string; surname: string }>('userInfo');
  const holderName = userInfo ? `${userInfo.name} ${userInfo.surname}` : 'Account Holder';

  const formattedBalance = `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const bgColor = bg;
  const cardBg = card;
  const textColor = text;

  return (
    <View style={{ flex: 1, backgroundColor: bgColor }}>
      {/* Header */}
      <View
        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, paddingTop: 56, paddingBottom: 16, backgroundColor: bgColor }}
      >
        <TouchableOpacity
          onPress={() => router.back()}
          style={{
            width: 40, height: 40, borderRadius: 20,
            backgroundColor: cardBg,
            alignItems: 'center', justifyContent: 'center',
            shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 4, elevation: 2,
          }}
        >
          <Ionicons name="chevron-back" size={22} color="#1E2460" />
        </TouchableOpacity>
        <Text style={{ color: textColor, fontSize: 17, fontWeight: '700' }}>Cards</Text>
        <TouchableOpacity
          onPress={() => router.push('/addcart')}
          style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: '#1E2460', alignItems: 'center', justifyContent: 'center' }}
        >
          <Ionicons name="add" size={22} color="white" />
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={{ flexDirection: 'row', paddingHorizontal: 20, marginBottom: 8 }}>
        {(Object.keys(TAB_LABELS) as ActiveTab[]).map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            style={{ flex: 1, alignItems: 'center', paddingBottom: 10 }}
          >
            <Text style={{
              fontSize: 13,
              fontWeight: '600',
              color: activeTab === tab ? '#1E2460' : '#6B7280',
            }}>
              {TAB_LABELS[tab]}
            </Text>
            {activeTab === tab && (
              <View style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, backgroundColor: '#1E2460', borderRadius: 1 }} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Stacked cards */}
        <View style={{ height: 290, marginHorizontal: 20, marginTop: 8 }}>
          {/* Back card — rotated, secondary color */}
          <View style={{
            position: 'absolute', left: 0, right: 0, top: 0,
            transform: [{ rotate: '-6deg' }, { translateY: 4 }],
            shadowColor: '#000', shadowOpacity: 0.18, shadowRadius: 14, elevation: 6,
          }}>
            <VisaCard
              color="#2A2F6E"
              balance="$1,200.00"
              cardNumber="•••• •••• •••• 3821"
              expiry="12/26"
              holder="Savings Card"
            />
          </View>

          {/* Front card — flat, primary */}
          <View style={{
            position: 'absolute', left: 0, right: 0, top: 44,
            shadowColor: '#1E2460', shadowOpacity: 0.4, shadowRadius: 20, elevation: 14,
          }}>
            <VisaCard
              color="#1E2460"
              balance={formattedBalance}
              cardNumber="•••• •••• •••• 0975"
              fullCardNumber="4532 8841 2234 0975"
              cvv="382"
              expiry="08/27"
              holder={holderName}
            />
          </View>
        </View>

        {activeTab === 'transactions' && (
          <View style={{ paddingHorizontal: 20, marginTop: 24 }}>
            <TouchableOpacity
              style={{ backgroundColor: '#1E2460', borderRadius: 16, paddingVertical: 18, alignItems: 'center' }}
              onPress={() => setTransVisible(true)}
              activeOpacity={0.85}
            >
              <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>View Transactions</Text>
            </TouchableOpacity>
          </View>
        )}

        {activeTab === 'cards' && (
          <>
            <Text style={{ fontSize: 17, fontWeight: '700', color: textColor, marginHorizontal: 20, marginTop: 28, marginBottom: 16 }}>
              Payment Details
            </Text>
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 20, gap: 12 }}>
              {PAYMENT_CATEGORIES.map(cat => (
                <View
                  key={cat.title}
                  style={{
                    width: '47%',
                    backgroundColor: cardBg,
                    borderRadius: 16,
                    padding: 16,
                    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 6, elevation: 2,
                  }}
                >
                  <View style={{ marginBottom: 4 }}>
                    <Text style={{ fontSize: 13, fontWeight: '700', color: textColor }}>{cat.title}</Text>
                  </View>
                  <Text style={{ fontSize: 11, color: '#6B7280', marginBottom: 10 }}>{cat.date}</Text>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <Text style={{ fontSize: 15, fontWeight: '700', color: '#F97316' }}>{cat.amount}</Text>
                    <Ionicons name={cat.icon} size={20} color="#F97316" />
                  </View>
                </View>
              ))}
            </View>
          </>
        )}

        {activeTab === 'deposits' && (
          <>
            <Text style={{ fontSize: 17, fontWeight: '700', color: textColor, marginHorizontal: 20, marginTop: 28, marginBottom: 16 }}>
              Savings Goals
            </Text>
            <View style={{ paddingHorizontal: 20, gap: 12 }}>
              {DEPOSITS.map(dep => (
                <View
                  key={dep.title}
                  style={{
                    backgroundColor: cardBg,
                    borderRadius: 20,
                    padding: 18,
                    shadowColor: '#000', shadowOpacity: 0.06, shadowRadius: 8, elevation: 2,
                  }}
                >
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 12 }}>
                    <View>
                      <Text style={{ fontSize: 15, fontWeight: '700', color: textColor }}>{dep.title}</Text>
                      <Text style={{ fontSize: 12, color: '#6B7280', marginTop: 2 }}>Target: {dep.target}</Text>
                    </View>
                    <View style={{ alignItems: 'flex-end' }}>
                      <Text style={{ fontSize: 17, fontWeight: '800', color: dep.color }}>{dep.saved}</Text>
                      <Text style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>{Math.round(dep.progress * 100)}% saved</Text>
                    </View>
                  </View>
                  {/* Progress bar */}
                  <View style={{ height: 6, backgroundColor: '#E5E7EB', borderRadius: 3 }}>
                    <View style={{
                      height: 6, borderRadius: 3,
                      width: `${Math.round(dep.progress * 100)}%` as any,
                      backgroundColor: dep.color,
                    }} />
                  </View>
                </View>
              ))}

              <TouchableOpacity
                style={{ backgroundColor: '#1E2460', borderRadius: 16, paddingVertical: 16, alignItems: 'center', flexDirection: 'row', justifyContent: 'center', gap: 8, marginTop: 4 }}
                activeOpacity={0.85}
                onPress={() => Alert.alert('New Savings Goal', 'Set a name and target amount for your new goal.', [
                  { text: 'Cancel', style: 'cancel' },
                  { text: 'Create', onPress: () => Alert.alert('Goal created!') },
                ])}
              >
                <Ionicons name="add-circle-outline" size={20} color="white" />
                <Text style={{ color: 'white', fontSize: 14, fontWeight: '700' }}>New Savings Goal</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>

      <TransactionsModal visible={transVisible} onClose={() => setTransVisible(false)} />
    </View>
  );
}
