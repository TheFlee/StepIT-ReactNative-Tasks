import { Image, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
}

interface Props {
  item: Product;
}

const ProductCard = ({ item }: Props) => {
  const router = useRouter();

  return (
    <TouchableOpacity
      className="bg-white rounded-[20px] mb-3 overflow-hidden"
      style={{ shadowColor: '#000', shadowOpacity: 0.08, shadowRadius: 8, elevation: 3 }}
      activeOpacity={0.85}
      onPress={() => router.push({ pathname: '/details', params: { id: item.id } })}
    >
      <View className="bg-gray-50 h-40 items-center justify-center p-4">
        <Image source={{ uri: item.thumbnail }} className="w-full h-full" resizeMode="contain" />
      </View>
      <View className="p-[14px]">
        <Text className="text-sm font-semibold text-primary mb-1" numberOfLines={2}>{item.title}</Text>
        <Text className="text-xs text-muted mb-2 capitalize" numberOfLines={1}>{item.category}</Text>
        <Text className="text-lg font-extrabold text-accent">${item.price.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;
