import { View, Text, Modal, TouchableOpacity, Pressable, ScrollView, Alert } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useTheme } from '@/context/DarkModeContext';

interface Props {
  visible: boolean;
  onClose: () => void;
  balance: number;
  onPayment: (amount: number) => void;
}

const TOTAL_LOAN = 5000;
const REMAINING = 2839.20;
const MONTHLY = 235.50;
const RATE = 4.5;
const PAID = TOTAL_LOAN - REMAINING;
const PROGRESS = PAID / TOTAL_LOAN;

const SCHEDULE = [
  { date: 'Jul 30, 2024', amount: '$235.50', status: 'due' },
  { date: 'Aug 30, 2024', amount: '$235.50', status: 'upcoming' },
  { date: 'Sep 30, 2024', amount: '$235.50', status: 'upcoming' },
  { date: 'Jun 30, 2024', amount: '$235.50', status: 'paid' },
  { date: 'May 30, 2024', amount: '$235.50', status: 'paid' },
];

export default function LoanModal({ visible, onClose, balance, onPayment }: Props) {
  const { card, bg, text, textSecondary, divider } = useTheme();

  const handlePay = () => {
    if (balance < MONTHLY) {
      Alert.alert('Insufficient funds', `You need $${MONTHLY} but have $${balance.toFixed(2)}`);
      return;
    }
    Alert.alert(
      'Confirm Payment',
      `Pay $${MONTHLY} for July installment?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Pay', onPress: () => { onPayment(MONTHLY); onClose(); } },
      ]
    );
  };

  return (
    <Modal visible={visible} animationType="slide" transparent onRequestClose={onClose}>
      <Pressable style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)' }} onPress={onClose} />
      <View style={{ backgroundColor: card, borderTopLeftRadius: 28, borderTopRightRadius: 28, maxHeight: '82%' }}>
        <View style={{ width: 40, height: 4, borderRadius: 2, backgroundColor: textSecondary + '40', alignSelf: 'center', marginTop: 12, marginBottom: 20 }} />

        <ScrollView contentContainerStyle={{ paddingHorizontal: 24, paddingBottom: 36 }} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: 24 }}>
            <View style={{ width: 44, height: 44, borderRadius: 14, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' }}>
              <Ionicons name="wallet-outline" size={22} color="#F97316" />
            </View>
            <View>
              <Text style={{ fontSize: 20, fontWeight: '700', color: text }}>Loan Details</Text>
              <Text style={{ fontSize: 12, color: textSecondary }}>ABB Bank Personal Loan</Text>
            </View>
          </View>

          {/* Progress */}
          <View style={{ backgroundColor: bg, borderRadius: 18, padding: 18, marginBottom: 16 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View>
                <Text style={{ fontSize: 11, color: textSecondary, marginBottom: 3 }}>REMAINING</Text>
                <Text style={{ fontSize: 22, fontWeight: '700', color: '#EF4444' }}>${REMAINING.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
              </View>
              <View style={{ alignItems: 'flex-end' }}>
                <Text style={{ fontSize: 11, color: textSecondary, marginBottom: 3 }}>PAID</Text>
                <Text style={{ fontSize: 22, fontWeight: '700', color: '#059669' }}>${PAID.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
              </View>
            </View>
            <View style={{ height: 8, backgroundColor: textSecondary + '25', borderRadius: 4 }}>
              <View style={{ height: 8, borderRadius: 4, width: `${Math.round(PROGRESS * 100)}%` as any, backgroundColor: '#059669' }} />
            </View>
            <Text style={{ fontSize: 11, color: textSecondary, marginTop: 6, textAlign: 'right' }}>
              {Math.round(PROGRESS * 100)}% of ${TOTAL_LOAN.toLocaleString()} paid
            </Text>
          </View>

          {/* Stats row */}
          <View style={{ flexDirection: 'row', gap: 10, marginBottom: 20 }}>
            {[
              { label: 'Interest Rate', value: `${RATE}% p.a.` },
              { label: 'Monthly', value: `$${MONTHLY}` },
              { label: 'Term', value: '24 months' },
            ].map(s => (
              <View key={s.label} style={{ flex: 1, backgroundColor: bg, borderRadius: 14, padding: 14, alignItems: 'center' }}>
                <Text style={{ fontSize: 11, color: textSecondary, marginBottom: 6 }}>{s.label}</Text>
                <Text style={{ fontSize: 14, fontWeight: '700', color: text }}>{s.value}</Text>
              </View>
            ))}
          </View>

          {/* Payment schedule */}
          <Text style={{ fontSize: 15, fontWeight: '700', color: text, marginBottom: 12 }}>Payment Schedule</Text>
          <View style={{ backgroundColor: bg, borderRadius: 16, overflow: 'hidden' }}>
            {SCHEDULE.map((s, i) => (
              <View key={i} style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 12, borderBottomWidth: i < SCHEDULE.length - 1 ? 1 : 0, borderBottomColor: divider }}>
                <View style={{
                  width: 8, height: 8, borderRadius: 4, marginRight: 12,
                  backgroundColor: s.status === 'paid' ? '#059669' : s.status === 'due' ? '#F97316' : textSecondary + '60',
                }} />
                <Text style={{ flex: 1, fontSize: 13, color: text }}>{s.date}</Text>
                <Text style={{ fontSize: 13, fontWeight: '600', color: s.status === 'paid' ? '#059669' : s.status === 'due' ? '#F97316' : text }}>
                  {s.amount}
                </Text>
                {s.status === 'paid' && <Ionicons name="checkmark-circle" size={16} color="#059669" style={{ marginLeft: 8 }} />}
                {s.status === 'due' && <Text style={{ fontSize: 10, color: '#F97316', marginLeft: 8, fontWeight: '700' }}>DUE</Text>}
              </View>
            ))}
          </View>

          {/* Pay button */}
          <TouchableOpacity
            style={{ backgroundColor: '#1E2460', borderRadius: 16, paddingVertical: 18, alignItems: 'center', marginTop: 20 }}
            onPress={handlePay}
            activeOpacity={0.85}
          >
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Pay July Installment · $235.50</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
    </Modal>
  );
}
