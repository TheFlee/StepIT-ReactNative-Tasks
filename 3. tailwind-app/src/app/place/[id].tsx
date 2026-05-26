import { Ionicons } from '@expo/vector-icons';
import { Link, Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';
import Animated, { FadeIn, ZoomIn } from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ScalePressable } from '@/components/scale-pressable';
import { getPlace } from '@/data/places';

export default function PlaceScreen() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();
  const place = getPlace(id);

  if (!place) {
    return (
      <>
        <Stack.Screen options={{ title: 'Oops' }} />
        <SafeAreaView className="flex-1 items-center justify-center gap-4 bg-slate-50 px-6">
          <Ionicons name="alert-circle-outline" size={48} color="#94a3b8" />
          <Text className="text-lg text-slate-600">Not found</Text>
          <Link href="/(tabs)/places" asChild>
            <ScalePressable className="rounded-xl bg-blue-600 px-6 py-3">
              <Text className="font-semibold text-white">Back to list</Text>
            </ScalePressable>
          </Link>
        </SafeAreaView>
      </>
    );
  }

  return (
    <>
      <Stack.Screen options={{ title: place.name }} />
      <SafeAreaView className="flex-1 bg-slate-50" edges={['bottom']}>
        <View className="flex-1 items-center justify-center gap-6 px-8">
          <Animated.View entering={ZoomIn.duration(500).springify().damping(18)}>
            <View className="h-28 w-28 items-center justify-center rounded-full bg-blue-100">
              <Ionicons name={place.icon} size={56} color="#2563eb" />
            </View>
          </Animated.View>
          <Animated.View entering={FadeIn.delay(150).duration(400)} className="items-center gap-2">
            <Text className="text-2xl font-bold text-slate-900">{place.name}</Text>
            <Text className="text-slate-500">Tap back when you are done.</Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
}
