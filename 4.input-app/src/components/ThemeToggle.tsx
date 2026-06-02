import { Text, TouchableOpacity } from 'react-native';

import { useTheme } from '../contexts/theme';

export function ThemeToggle() {
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <TouchableOpacity
      activeOpacity={0.75}
      onPress={toggleDarkMode}
      className={`rounded-full border px-4 py-2 ${
        isDarkMode
          ? 'border-zinc-800 bg-zinc-900'
          : 'border-zinc-200 bg-zinc-100'
      }`}
    >
      <Text
        className={`text-[10px] font-semibold uppercase tracking-widest ${
          isDarkMode ? 'text-zinc-100' : 'text-zinc-700'
        }`}
      >
        {isDarkMode ? 'Light mode' : 'Dark mode'}
      </Text>
    </TouchableOpacity>
  );
}
