import { Ionicons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

type Product = {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  discountPercentage: number;
};

const shortcuts = [
  { title: 'Category', icon: 'apps-outline' as const, color: '#8245ff', background: 'bg-[#eee7ff]' },
  {
    title: 'Compare',
    icon: 'swap-horizontal-outline' as const,
    color: '#8245ff',
    background: 'bg-[#eee7ff]',
  },
  {
    title: 'Sales event',
    icon: 'pricetag-outline' as const,
    color: '#ca43de',
    background: 'bg-[#f6e5f8]',
  },
  { title: 'Offers', icon: 'ribbon-outline' as const, color: '#ff725b', background: 'bg-[#ffe9e4]' },
];

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<number[]>([]);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=4&select=id,title,price,thumbnail,discountPercentage')
      .then((response) => response.json())
      .then((data: { products: Product[] }) => setProducts(data.products));
  }, []);

  function toggle(id: number, values: number[], update: (next: number[]) => void) {
    update(values.includes(id) ? values.filter((value) => value !== id) : [...values, id]);
  }

  const featured = products[0];

  return (
    <SafeAreaView className="flex-1 bg-[#f7f6f8]">
      <ScrollView contentContainerClassName="pb-28" showsVerticalScrollIndicator={false}>
        <View className="mx-auto w-full max-w-[430px] px-5">
          <View className="absolute -top-10 left-0 right-0 h-60 rounded-b-[32px] bg-[#8245ff]" />

          <View className="mb-7 mt-5 flex-row items-center justify-between">
            <Text className="text-2xl font-extrabold text-white">SHOPIN</Text>
            <View className="flex-row gap-2">
              <View className="h-12 w-40 flex-row items-center rounded-xl bg-white px-3">
                <Ionicons color="#71727b" name="search-outline" size={21} />
                <TextInput
                  className="ml-2 flex-1 text-sm text-neutral-700"
                  placeholder="Search"
                  placeholderTextColor="#71727b"
                />
              </View>
              <View className="h-12 w-12 items-center justify-center rounded-xl bg-white">
                <Ionicons color="#71727b" name="camera-outline" size={23} />
              </View>
            </View>
          </View>

          <View className="mb-8 min-h-[176px] flex-row rounded-[26px] bg-white p-4 pb-8">
            {featured ? (
              <>
                <View className="h-28 w-[52%] items-center justify-center rounded-2xl bg-neutral-100">
                  <Image className="h-full w-full" resizeMode="contain" source={{ uri: featured.thumbnail }} />
                </View>
                <View className="ml-4 flex-1 justify-center">
                  <Text className="mb-1 text-xs font-semibold text-neutral-500">Introducing</Text>
                  <Text className="mb-4 text-lg font-extrabold text-neutral-900" numberOfLines={2}>
                    {featured.title}
                  </Text>
                  <View className="self-start rounded-xl bg-neutral-900 px-4 py-3">
                    <Text className="font-semibold text-white">Buy Now</Text>
                  </View>
                </View>
              </>
            ) : (
              <View className="flex-1 items-center justify-center">
                <ActivityIndicator color="#8245ff" />
              </View>
            )}
            <View className="absolute bottom-3 left-0 right-0 flex-row justify-center gap-2">
              <View className="h-2 w-2 rounded-full bg-neutral-500" />
              <View className="h-2 w-2 rounded-full bg-neutral-300" />
              <View className="h-2 w-2 rounded-full bg-neutral-300" />
              <View className="h-2 w-2 rounded-full bg-neutral-300" />
            </View>
          </View>

          <View className="mb-8 flex-row justify-between">
            {shortcuts.map((item) => (
              <View className="items-center gap-2" key={item.title}>
                <View className={`h-14 w-14 items-center justify-center rounded-2xl ${item.background}`}>
                  <Ionicons color={item.color} name={item.icon} size={24} />
                </View>
                <Text className="text-xs font-medium text-neutral-700">{item.title}</Text>
              </View>
            ))}
          </View>

          <View className="rounded-[28px] bg-[#f0eff1] pb-5 pt-5">
            <View className="mb-5 flex-row items-center justify-between px-5">
              <Text className="text-xl font-extrabold text-neutral-900">New Arrivals</Text>
              <View className="rounded-xl bg-[#8245ff] px-4 py-3">
                <Text className="text-xs font-bold text-white">View All</Text>
              </View>
            </View>

            {products.length === 0 ? (
              <ActivityIndicator className="my-16" color="#8245ff" />
            ) : (
              <ScrollView contentContainerClassName="gap-3 px-5" horizontal showsHorizontalScrollIndicator={false}>
                {products.map((product) => {
                const favorite = favoriteIds.includes(product.id);
                const selected = selectedIds.includes(product.id);

                return (
                  <View className="w-40 rounded-2xl bg-white p-2" key={product.id}>
                    <View className="relative h-36 rounded-xl bg-neutral-100">
                      <Image className="h-full w-full" resizeMode="contain" source={{ uri: product.thumbnail }} />
                      <Pressable
                        accessibilityLabel={`Favorite ${product.title}`}
                        onPress={() => toggle(product.id, favoriteIds, setFavoriteIds)}
                        className="absolute right-2 top-2">
                        <Ionicons
                          color={favorite ? '#8245ff' : '#878891'}
                          name={favorite ? 'heart' : 'heart-outline'}
                          size={23}
                        />
                      </Pressable>
                    </View>
                    <Text className="mb-2 mt-3 text-sm font-semibold text-neutral-700" numberOfLines={1}>
                      {product.title}
                    </Text>
                    <Text className="mb-2 self-start rounded bg-neutral-100 px-2 py-1 text-xs text-neutral-500">
                      {Math.round(product.discountPercentage)}% Off
                    </Text>
                    <View className="flex-row items-center justify-between">
                      <Text className="text-lg font-bold text-neutral-900">${product.price}</Text>
                      <Pressable
                        accessibilityLabel={`Select ${product.title}`}
                        onPress={() => toggle(product.id, selectedIds, setSelectedIds)}
                        className={`h-9 w-9 items-center justify-center rounded-lg border ${
                          selected ? 'border-[#8245ff] bg-[#8245ff]' : 'border-neutral-200'
                        }`}>
                        <Ionicons color={selected ? '#ffffff' : '#55565f'} name={selected ? 'checkmark' : 'add'} size={22} />
                      </Pressable>
                    </View>
                  </View>
                );
              })}
              </ScrollView>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
