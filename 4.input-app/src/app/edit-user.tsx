import { useState } from 'react';
import { Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import { FormField } from '../components/FormField';
import { useTheme } from '../contexts/theme';

export default function EditUser() {
  const { isDarkMode } = useTheme();
  const [name, setName] = useState('Ilkin');
  const [surname, setSurname] = useState('I');

  return (
    <SafeAreaView className={`flex-1 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}>
      <View className="flex-row items-center px-5 py-4 border-b border-zinc-100">
        <Pressable onPress={() => router.back()} className="mr-3">
          <Ionicons
            name="arrow-back"
            size={22}
            color={isDarkMode ? '#f4f4f5' : '#18181b'}
          />
        </Pressable>
        <Text className={`text-base font-semibold ${isDarkMode ? 'text-zinc-50' : 'text-zinc-900'}`}>
          Edit User
        </Text>
      </View>

      <View className="flex-1 px-6 pt-16">
        <Text className={`text-2xl font-bold mb-8 ${isDarkMode ? 'text-zinc-50' : 'text-zinc-900'}`}>
          Edit your info
        </Text>

        <FormField
          label="Name:"
          placeholder="Name"
          value={name}
          isDarkMode={isDarkMode}
          onChangeText={setName}
        />

        <FormField
          label="Surname:"
          placeholder="Surname"
          value={surname}
          isDarkMode={isDarkMode}
          onChangeText={setSurname}
        />

        <TouchableOpacity
          className="mt-4 bg-[#1e1b4b] rounded-xl py-4 items-center"
          activeOpacity={0.85}
        >
          <Text className="text-white text-base font-semibold">Save</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
