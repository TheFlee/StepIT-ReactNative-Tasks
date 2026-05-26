import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { FadeInView } from '@/components/fade-in';
import { PlaceRow } from '@/components/place-row';
import { places } from '@/data/places';

export default function PlacesScreen() {
  return (
    <SafeAreaView className="flex-1 bg-slate-50">
      <View className="gap-4 px-5 pt-4 pb-6">
        <FadeInView>
          <Text className="text-2xl font-bold text-slate-900">Places</Text>
        </FadeInView>
        <View className="gap-3">
          {places.map((place, index) => (
            <PlaceRow key={place.id} place={place} index={index + 1} />
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}
