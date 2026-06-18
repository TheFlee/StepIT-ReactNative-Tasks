import { Feather } from '@expo/vector-icons';
import { Text, TouchableOpacity, View } from 'react-native';

import type { ActiveTab, IconName } from '../screens/types';

function TabButton({
  icon,
  label,
  active,
  isDarkMode,
  onPress,
}: {
  icon: IconName;
  label: string;
  active: boolean;
  isDarkMode: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`flex-1 rounded-lg py-3 items-center ${
        active
          ? isDarkMode
            ? 'bg-zinc-50'
            : 'bg-zinc-900'
          : isDarkMode
          ? 'bg-zinc-900'
          : 'bg-zinc-100'
      }`}
    >
      <Feather
        name={icon}
        size={20}
        color={
          active
            ? isDarkMode
              ? '#09090b'
              : '#ffffff'
            : isDarkMode
            ? '#a1a1aa'
            : '#52525b'
        }
      />
      <Text
        className={`mt-1 text-[10px] font-semibold uppercase tracking-widest ${
          active
            ? isDarkMode
              ? 'text-zinc-950'
              : 'text-white'
            : isDarkMode
            ? 'text-zinc-400'
            : 'text-zinc-600'
        }`}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}

export function AppTabBar({
  activeTab,
  isDarkMode,
  onChangeTab,
}: {
  activeTab: ActiveTab;
  isDarkMode: boolean;
  onChangeTab: (tab: ActiveTab) => void;
}) {
  return (
    <View
      className={`px-6 pt-3 pb-4 border-t ${
        isDarkMode
          ? 'border-zinc-800 bg-zinc-950'
          : 'border-zinc-100 bg-white'
      }`}
    >
      <View className="flex-row gap-3">
        <TabButton
          icon="grid"
          label="Wallet"
          active={activeTab === 'wallet'}
          isDarkMode={isDarkMode}
          onPress={() => onChangeTab('wallet')}
        />
        <TabButton
          icon="user"
          label="Profile"
          active={activeTab === 'profile'}
          isDarkMode={isDarkMode}
          onPress={() => onChangeTab('profile')}
        />
        <TabButton
          icon="camera"
          label="Scan QR"
          active={activeTab === 'scan'}
          isDarkMode={isDarkMode}
          onPress={() => onChangeTab('scan')}
        />
      </View>
    </View>
  );
}
