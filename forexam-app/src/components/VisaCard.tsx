import { View, Text } from 'react-native';
import React from 'react';

interface Props {
  balance?: string;
  cardNumber?: string;
  expiry?: string;
}

export default function VisaCard({
  balance = '$4,763.40',
  cardNumber = '******0975',
  expiry = '08/22',
}: Props) {
  return (
    <View className="rounded-[20px] overflow-hidden mx-5">
      <View className="bg-accent px-5 py-[14px] flex-row justify-between items-center">
        <Text className="text-white/80 text-xs">Current Balance</Text>
        <Text className="text-white text-base font-extrabold tracking-widest">VISA</Text>
      </View>
      <View className="bg-primary p-5">
        <Text className="text-white/60 text-xs mb-1">Current Balance</Text>
        <Text className="text-white text-base font-extrabold tracking-widest absolute top-5 right-5">
          VISA
        </Text>
        <Text className="text-white text-[28px] font-bold mb-5">{balance}</Text>
        <View className="flex-row justify-between">
          <Text className="text-white/70 text-sm">{cardNumber}</Text>
          <Text className="text-white/70 text-sm">{expiry}</Text>
        </View>
      </View>
    </View>
  );
}
