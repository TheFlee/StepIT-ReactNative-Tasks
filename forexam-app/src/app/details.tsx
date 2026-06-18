import { Image, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import axios from 'axios';
import { useTheme } from '@/context/DarkModeContext';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  thumbnail: string;
  rating: number;
  stock: number;
  brand: string;
}

export default function Details() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const [item, setItem] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { bg, card, text, textSecondary } = useTheme();

  useEffect(() => {
    axios.get(`https://dummyjson.com/products/${id}`)
      .then(res => setItem(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bg }}>
        <ActivityIndicator size="large" color="#1E2460" />
      </View>
    );
  }

  if (!item) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: bg }}>
        <Text className="text-muted">Product not found</Text>
      </View>
    );
  }

  const stars = Math.round(item.rating);

  return (
    <View style={{ flex: 1, backgroundColor: bg }}>
      <TouchableOpacity
        onPress={() => router.back()}
        className="absolute top-[52px] left-4 z-10 bg-white w-10 h-10 rounded-full items-center justify-center"
        style={{ shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 6, elevation: 3 }}
      >
        <Ionicons name="arrow-back" size={22} color="#1E2460" />
      </TouchableOpacity>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-white h-[280px] items-center justify-center p-8">
          <Image source={{ uri: item.thumbnail }} className="w-full h-full" resizeMode="contain" />
        </View>

        <View style={{ backgroundColor: bg, borderTopLeftRadius: 24, borderTopRightRadius: 24, marginTop: -16, padding: 24, paddingBottom: 40 }}>
          <Text className="text-xs text-accent font-semibold uppercase tracking-wider mb-1.5">
            {item.category}
          </Text>
          <Text className="text-lg font-bold text-primary mb-3 leading-6">{item.title}</Text>

          <View className="flex-row items-center gap-2 mb-3">
            <View className="flex-row gap-0.5">
              {Array.from({ length: 5 }, (_, i) => (
                <Ionicons
                  key={i}
                  name={i < stars ? 'star' : 'star-outline'}
                  size={16}
                  color="#F97316"
                />
              ))}
            </View>
            <Text className="text-sm text-muted">{item.rating} · {item.stock} in stock</Text>
          </View>

          <Text className="text-[28px] font-extrabold text-primary mb-5">
            ${item.price.toFixed(2)}
          </Text>

          <Text className="text-sm font-bold text-primary mb-2">Description</Text>
          <Text className="text-sm text-muted leading-[21px] mb-4">{item.description}</Text>

          {item.brand ? (
            <>
              <Text className="text-sm font-bold text-primary mb-2">Brand</Text>
              <Text className="text-sm text-muted mb-5">{item.brand}</Text>
            </>
          ) : null}

          <TouchableOpacity
            className="bg-primary rounded-xl py-4 flex-row items-center justify-center gap-2 mt-2"
            activeOpacity={0.85}
            onPress={() => Alert.alert('Added to Cart', `${item?.title} has been added to your cart.`)}
          >
            <Ionicons name="cart-outline" size={20} color="white" />
            <Text className="text-white text-base font-bold">Add to Cart</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
