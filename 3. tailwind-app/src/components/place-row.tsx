import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';
import { Text, View } from 'react-native';

import { FadeInView } from '@/components/fade-in';
import { ScalePressable } from '@/components/scale-pressable';
import type { Place } from '@/data/places';

type PlaceRowProps = {
  place: Place;
  index: number;
};

export function PlaceRow({ place, index }: PlaceRowProps) {
  return (
    <FadeInView delay={index * 70}>
      <Link href={{ pathname: '/place/[id]', params: { id: place.id } }} asChild>
        <ScalePressable className="flex-row items-center gap-4 rounded-2xl bg-white px-4 py-4 shadow-sm shadow-slate-200">
          <View className="h-11 w-11 items-center justify-center rounded-full bg-blue-50">
            <Ionicons name={place.icon} size={22} color="#2563eb" />
          </View>
          <Text className="flex-1 text-lg font-medium text-slate-800">{place.name}</Text>
          <Ionicons name="chevron-forward" size={20} color="#94a3b8" />
        </ScalePressable>
      </Link>
    </FadeInView>
  );
}
