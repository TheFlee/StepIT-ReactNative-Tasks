import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { useSecureStorage } from '@/hooks/useSecureStorage';
import { useAsyncStorage } from '@/hooks/useAsyncStorage';
import { useTheme } from '@/context/DarkModeContext';
import TopupModal from '@/components/TopupModal';
import SendModal from '@/components/SendModal';
import ReceiveModal from '@/components/ReceiveModal';
import LoanModal from '@/components/LoanModal';
import RequestsModal from '@/components/RequestsModal';

type ModalState = 'none' | 'topup' | 'send' | 'receive' | 'pay' | 'loan' | 'requests';

export default function Home() {
  const router = useRouter();
  const [userInfo] = useSecureStorage<{ name: string; surname: string }>('userInfo');
  const [balance, setBalance] = useAsyncStorage<number>('balance', 4763.40);
  const { bg, card, text, textSecondary } = useTheme();
  const [modal, setModal] = useState<ModalState>('none');

  const initials = `${userInfo?.name?.[0] ?? 'G'}${userInfo?.surname?.[0] ?? ''}`.toUpperCase();
  const shortName = userInfo ? `${userInfo.name} ${userInfo.surname?.[0] ?? ''}.` : 'Guest';
  const formattedBalance = `$${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  const handleTopup = (amount: number) => setBalance(balance + amount);
  const handleSend = (amount: number) => setBalance(balance - amount);
  const handleLoanPayment = (amount: number) => setBalance(balance - amount);
  const handleRequestApprove = (amount: number) => setBalance(balance + amount);

  const QUICK_ACTIONS: { label: string; icon: any; action: () => void }[] = [
    { label: 'Send', icon: 'arrow-up-outline', action: () => setModal('send') },
    { label: 'Receive', icon: 'arrow-down-outline', action: () => setModal('receive') },
    { label: 'Pay', icon: 'scan-outline', action: () => setModal('pay') },
    { label: 'History', icon: 'time-outline', action: () => router.push('/(tabs)/cards') },
  ];

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      {/* Header with rounded bottom */}
      <View style={{
        backgroundColor: '#1E2460',
        paddingHorizontal: 24,
        paddingTop: 56,
        paddingBottom: 32,
        borderBottomLeftRadius: 32,
        borderBottomRightRadius: 32,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 24 }}>
          <Ionicons name="grid" size={22} color="white" />
          <Ionicons name="ellipsis-vertical" size={22} color="white" />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 28 }}>
          <View style={{ width: 60, height: 60, borderRadius: 30, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ color: 'white', fontSize: 20, fontWeight: '700' }}>{initials}</Text>
          </View>
          <View style={{ marginLeft: 14, flex: 1 }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 13 }}>Welcome back,</Text>
            <Text style={{ color: 'white', fontSize: 15, fontWeight: '600' }}>{shortName}</Text>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={{ color: 'rgba(255,255,255,0.6)', fontSize: 11, marginBottom: 2 }}>Balance</Text>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>{formattedBalance}</Text>
          </View>
        </View>

        {/* Quick actions */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          {QUICK_ACTIONS.map(({ label, icon, action }) => (
            <TouchableOpacity
              key={label}
              style={{ alignItems: 'center', gap: 6 }}
              activeOpacity={0.75}
              onPress={action}
            >
              <View style={{ width: 52, height: 52, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name={icon} size={22} color="white" />
              </View>
              <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 11, fontWeight: '500' }}>{label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Section header */}
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 24, paddingTop: 28, marginBottom: 16 }}>
          <Text style={{ fontSize: 17, fontWeight: '700', color: text }}>Activities</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/cards')}>
            <Text style={{ fontSize: 13, fontWeight: '600', color: '#F97316' }}>Monthly Report</Text>
          </TouchableOpacity>
        </View>

        {/* Activity cards */}
        <View style={{ flexDirection: 'row', paddingHorizontal: 24, gap: 14, marginBottom: 16 }}>
          {/* Loan card */}
          <View style={{ flex: 1, backgroundColor: card, borderRadius: 20, padding: 16, shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <Text style={{ fontSize: 15, fontWeight: '700', color: text }}>Loan</Text>
              <TouchableOpacity onPress={() => setModal('loan')}>
                <Text style={{ fontSize: 12, fontWeight: '600', color: '#F97316' }}>Details</Text>
              </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', gap: 12, alignItems: 'flex-end' }}>
              <View style={{ width: 52, height: 52, borderRadius: 14, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="wallet-outline" size={28} color="white" />
              </View>
              <View style={{ marginTop: 8 }}>
                <Text style={{ fontSize: 12, color: textSecondary }}>Pending</Text>
                <Text style={{ fontSize: 15, fontWeight: '700', color: text }}>$2,839.20</Text>
              </View>
            </View>
          </View>

          {/* Requests card */}
          <TouchableOpacity onPress={() => setModal('requests')} activeOpacity={0.85} style={{ flex: 1, backgroundColor: '#1E2460', borderRadius: 20, padding: 16 }}>
            <View style={{ width: 44, height: 44, borderRadius: 12, backgroundColor: 'rgba(255,255,255,0.15)', alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Ionicons name="server-outline" size={26} color="white" />
            </View>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: '700' }}>18</Text>
            <Text style={{ color: 'rgba(255,255,255,0.8)', fontSize: 13, marginBottom: 8 }}>Requests</Text>
            <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11, marginBottom: 8 }}>Requests channel</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {['A', 'B', 'C'].map((l, i) => (
                <View key={i} style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: '#F97316', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#1E2460', marginLeft: i > 0 ? -8 : 0 }}>
                  <Text style={{ color: 'white', fontSize: 9, fontWeight: '700' }}>{l}</Text>
                </View>
              ))}
              <View style={{ width: 26, height: 26, borderRadius: 13, backgroundColor: 'rgba(255,255,255,0.2)', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#1E2460', marginLeft: -8 }}>
                <Text style={{ color: 'white', fontSize: 8, fontWeight: '700' }}>+14</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>

        {/* Topup button */}
        <TouchableOpacity
          style={{ marginHorizontal: 24, backgroundColor: '#1E2460', borderRadius: 20, paddingVertical: 24, alignItems: 'center', gap: 8, shadowColor: '#1E2460', shadowOpacity: 0.3, shadowRadius: 12, elevation: 4 }}
          onPress={() => setModal('topup')}
          activeOpacity={0.85}
        >
          <Ionicons name="arrow-up-circle-outline" size={32} color="white" />
          <Text style={{ color: 'white', fontSize: 15, fontWeight: '700' }}>Top Up Balance</Text>
        </TouchableOpacity>
      </ScrollView>

      <TopupModal
        visible={modal === 'topup'}
        onClose={() => setModal('none')}
        onTopup={handleTopup}
      />
      <SendModal
        visible={modal === 'send' || modal === 'pay'}
        onClose={() => setModal('none')}
        mode={modal === 'pay' ? 'pay' : 'send'}
        balance={balance}
        onConfirm={handleSend}
      />
      <ReceiveModal
        visible={modal === 'receive'}
        onClose={() => setModal('none')}
      />
      <LoanModal
        visible={modal === 'loan'}
        onClose={() => setModal('none')}
        balance={balance}
        onPayment={handleLoanPayment}
      />
      <RequestsModal
        visible={modal === 'requests'}
        onClose={() => setModal('none')}
        onApprove={handleRequestApprove}
      />
    </View>
  );
}
