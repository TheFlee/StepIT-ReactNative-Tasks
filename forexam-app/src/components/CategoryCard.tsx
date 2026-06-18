import { TouchableOpacity, Text, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import React from 'react';

interface Props {
  title: string;
  lastDate: string;
  hour: string;
  iconName: keyof typeof Ionicons.glyphMap;
}

const CategoryCard = ({ title, lastDate, hour, iconName }: Props) => {
  return (
    <TouchableOpacity
      className="bg-white rounded-[20px] p-4 w-[48%]"
      style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}
      activeOpacity={0.85}
    >
      <View className="w-11 h-11 rounded-xl bg-accent items-center justify-center mb-3">
        <Ionicons name={iconName} size={22} color="white" />
      </View>
      <Text className="text-sm font-bold text-primary mb-1" numberOfLines={1}>{title}</Text>
      <Text className="text-xs text-muted">{lastDate}</Text>
      <Text className="text-xs text-muted">{hour}</Text>
    </TouchableOpacity>
  );
};

export default CategoryCard;
