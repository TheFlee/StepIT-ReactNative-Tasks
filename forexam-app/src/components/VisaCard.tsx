import { View, Text, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  balance?: string;
  cardNumber?: string;
  fullCardNumber?: string;
  expiry?: string;
  holder?: string;
  cvv?: string;
  color?: string;
}

function Chip() {
  return (
    <View style={{
      width: 42, height: 32, borderRadius: 6,
      backgroundColor: '#D4A843',
      overflow: 'hidden',
      justifyContent: 'center', alignItems: 'center',
    }}>
      <View style={{ position: 'absolute', width: '100%', height: 1, backgroundColor: 'rgba(0,0,0,0.25)' }} />
      <View style={{ position: 'absolute', width: 1, height: '100%', backgroundColor: 'rgba(0,0,0,0.25)' }} />
      <View style={{ width: 22, height: 18, borderRadius: 3, borderWidth: 1, borderColor: 'rgba(0,0,0,0.3)', backgroundColor: 'rgba(255,215,100,0.3)' }} />
    </View>
  );
}

function maskNumber(full: string): string {
  // Replace first 12 digits with * keeping spaces: "**** **** **** 0975"
  return full.replace(/\d(?=.{5})/g, '*');
}

export default function VisaCard({
  balance = '$4,763.40',
  cardNumber = '•••• •••• •••• 0975',
  fullCardNumber = '4532 8841 2234 0975',
  expiry = '08/27',
  holder = 'Account Holder',
  cvv = '382',
  color = '#1E2460',
}: Props) {
  const [showNumber, setShowNumber] = useState(false);
  const [showCvv, setShowCvv] = useState(false);

  const displayNumber = showNumber ? fullCardNumber : maskNumber(fullCardNumber);

  return (
    <View style={{
      backgroundColor: color,
      borderRadius: 22,
      paddingHorizontal: 24,
      paddingVertical: 22,
      overflow: 'hidden',
      aspectRatio: 1.586,
    }}>
      {/* Decorative circles */}
      <View style={{ position: 'absolute', right: -50, bottom: -50, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.06)' }} />
      <View style={{ position: 'absolute', right: 20, bottom: -90, width: 160, height: 160, borderRadius: 80, backgroundColor: 'rgba(255,255,255,0.04)' }} />
      <View style={{ position: 'absolute', left: -30, top: -30, width: 120, height: 120, borderRadius: 60, backgroundColor: 'rgba(255,255,255,0.04)' }} />

      {/* Top row */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View>
          <Text style={{ color: 'white', fontSize: 14, fontWeight: '900', letterSpacing: 2, opacity: 0.95 }}>ABB</Text>
          <Text style={{ color: 'rgba(255,255,255,0.55)', fontSize: 9, letterSpacing: 1.5, fontWeight: '600' }}>BANK</Text>
        </View>
        <Ionicons name="wifi-outline" size={18} color="rgba(255,255,255,0.65)" style={{ transform: [{ rotate: '90deg' }] }} />
      </View>

      {/* Chip + balance */}
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginTop: 14, marginBottom: 14 }}>
        <Chip />
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>
            Balance
          </Text>
          <Text style={{ color: 'white', fontSize: 20, fontWeight: '700', letterSpacing: -0.5 }}>
            {balance}
          </Text>
        </View>
      </View>

      {/* Card number — tappable, single line, tabular-nums keeps width stable */}
      <TouchableOpacity
        onPress={() => setShowNumber(v => !v)}
        activeOpacity={0.75}
        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 14 }}
      >
        <Text
          numberOfLines={1}
          style={{
            flex: 1,
            color: 'rgba(255,255,255,0.85)',
            fontSize: 15,
            fontWeight: '600',
            letterSpacing: 3,
            fontVariant: ['tabular-nums'],
          }}
        >
          {displayNumber}
        </Text>
        <Ionicons
          name={showNumber ? 'eye-off-outline' : 'eye-outline'}
          size={14}
          color="rgba(255,255,255,0.5)"
        />
      </TouchableOpacity>

      {/* Bottom row */}
      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>
            Card Holder
          </Text>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '600', letterSpacing: 0.5 }}>
            {holder.toUpperCase()}
          </Text>
        </View>

        {/* CVV — tappable */}
        <TouchableOpacity onPress={() => setShowCvv(v => !v)} activeOpacity={0.75} style={{ alignItems: 'center', marginRight: 16 }}>
          <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>
            CVV
          </Text>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '600', width: 36, textAlign: 'center', letterSpacing: 1 }}>
            {showCvv ? cvv : '* * *'}
          </Text>
        </TouchableOpacity>

        <View style={{ alignItems: 'center', marginRight: 16 }}>
          <Text style={{ color: 'rgba(255,255,255,0.45)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1, marginBottom: 3 }}>
            Expires
          </Text>
          <Text style={{ color: 'white', fontSize: 12, fontWeight: '600' }}>
            {expiry}
          </Text>
        </View>

        <Text style={{ color: 'white', fontSize: 24, fontWeight: '900', fontStyle: 'italic', letterSpacing: -1, opacity: 0.95 }}>
          VISA
        </Text>
      </View>
    </View>
  );
}
