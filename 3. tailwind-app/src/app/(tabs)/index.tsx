import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FadeInView } from '@/components/fade-in';
import { ScalePressable } from '@/components/scale-pressable';

export default function HomeScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="flex-1 items-center justify-center gap-8 px-8">
        <FadeInView className="items-center gap-3">
          <View className="h-20 w-20 items-center justify-center rounded-full bg-blue-100">
            <Ionicons name="footsteps-outline" size={40} color="#2563eb" />
          </View>
          <Text className="text-3xl font-bold text-slate-900">Wander</Text>
          <Text className="text-center text-slate-500">Pick a place and go.</Text>
        </FadeInView>

        <FadeInView delay={120} className="w-full">
          <Link href="/(tabs)/places" asChild>
            <ScalePressable className="flex-row items-center justify-center gap-2 rounded-2xl bg-blue-600 py-4">
              <Ionicons name="map-outline" size={22} color="#fff" />
              <Text className="text-lg font-semibold text-white">See places</Text>
            </ScalePressable>
          </Link>
        </FadeInView>
      </View>
    </SafeAreaView>
  );
}
