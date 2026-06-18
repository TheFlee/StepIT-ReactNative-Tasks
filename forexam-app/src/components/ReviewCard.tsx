import { Text, View } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';

interface Props {
  rating: number;
  stock?: number;
}

const ReviewCard = ({ rating, stock }: Props) => {
  const stars = Math.round(rating);
  return (
    <View
      className="bg-white rounded-2xl p-[14px] mb-2.5"
      style={{ shadowColor: '#000', shadowOpacity: 0.05, shadowRadius: 6, elevation: 2 }}
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row gap-0.5">
          {Array.from({ length: 5 }, (_, i) => (
            <Ionicons key={i} name={i < stars ? 'star' : 'star-outline'} size={14} color="#F97316" />
          ))}
        </View>
        {stock != null && <Text className="text-xs text-muted">{stock} in stock</Text>}
      </View>
      <Text className="text-xs text-muted font-semibold">{rating} / 5</Text>
    </View>
  );
};

export default ReviewCard;
