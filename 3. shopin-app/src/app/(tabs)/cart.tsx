import { Text, View } from 'react-native';

export default function CartScreen() {
  return (
    <View className="flex-1 items-center justify-center bg-[#f7f6f8]">
      <Text className="text-2xl font-bold text-neutral-900">Cart</Text>
      <Text className="mt-2 text-neutral-500">Nothing here yet.</Text>
    </View>
  );
}
