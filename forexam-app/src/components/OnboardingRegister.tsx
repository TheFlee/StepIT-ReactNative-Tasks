import { Text, TextInput, View, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useSecureStorage } from '@/hooks/useSecureStorage';

interface Props {
  onComplete: () => void;
}

const OnboardingRegister = ({ onComplete }: Props) => {
  const [, setUserInfo] = useSecureStorage<{ name: string; surname: string }>('userInfo');
  const [formData, setFormData] = useState({ name: '', surname: '' });
  const [errors, setErrors] = useState<{ name?: string; surname?: string }>({});

  const validate = () => {
    const e: typeof errors = {};
    if (!formData.name.trim()) e.name = 'Name is required';
    if (!formData.surname.trim()) e.surname = 'Surname is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    await setUserInfo({ name: formData.name.trim(), surname: formData.surname.trim() });
    onComplete();
  };

  return (
    <View>
      <Text className="text-sm font-semibold text-primary mb-1.5">First Name</Text>
      <TextInput
        className={`border-[1.5px] ${errors.name ? 'border-danger' : 'border-gray-200'} rounded-xl px-4 py-[14px] text-base text-primary bg-white`}
        placeholder="Enter your first name"
        placeholderTextColor="#6B7280"
        value={formData.name}
        onChangeText={t => setFormData(p => ({ ...p, name: t }))}
      />
      {errors.name ? <Text className="text-xs text-danger mt-1">{errors.name}</Text> : null}

      <Text className="text-sm font-semibold text-primary mb-1.5 mt-4">Last Name</Text>
      <TextInput
        className={`border-[1.5px] ${errors.surname ? 'border-danger' : 'border-gray-200'} rounded-xl px-4 py-[14px] text-base text-primary bg-white`}
        placeholder="Enter your last name"
        placeholderTextColor="#6B7280"
        value={formData.surname}
        onChangeText={t => setFormData(p => ({ ...p, surname: t }))}
      />
      {errors.surname ? <Text className="text-xs text-danger mt-1">{errors.surname}</Text> : null}

      <TouchableOpacity
        className="mt-7 bg-accent rounded-xl py-4 items-center"
        onPress={handleSubmit}
        activeOpacity={0.85}
      >
        <Text className="text-white text-base font-bold">Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OnboardingRegister;
