import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';

type FormFieldProps = {
  label: string;
  placeholder: string;
  value: string;
  error?: string;
  isDarkMode: boolean;
  keyboardType?: 'default' | 'email-address' | 'phone-pad';
  secureTextEntry?: boolean;
  autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
  onChangeText: (value: string) => void;
};

export function FormField({
  label,
  placeholder,
  value,
  error,
  isDarkMode,
  keyboardType = 'default',
  secureTextEntry,
  autoCapitalize,
  onChangeText,
}: FormFieldProps) {
  const [focused, setFocused] = useState(false);

  return (
    <View className="mb-5">
      <Text
        className={`text-[10px] font-semibold uppercase tracking-[0.2rem] mb-2 ${
          isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </Text>

      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={isDarkMode ? '#71717a' : '#a1a1aa'}
        selectionColor="#34d399"
        keyboardType={keyboardType}
        secureTextEntry={secureTextEntry}
        autoCapitalize={autoCapitalize}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`py-3.5 px-0 text-base border-b ${
          error
            ? 'border-red-400'
            : focused
            ? 'border-emerald-400'
            : isDarkMode
            ? 'border-zinc-800'
            : 'border-zinc-200'
        } ${isDarkMode ? 'text-zinc-50' : 'text-zinc-900'} bg-transparent`}
      />

      {error ? (
        <Text className="mt-1.5 text-xs text-red-400">{error}</Text>
      ) : null}
    </View>
  );
}
