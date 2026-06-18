import { Feather } from '@expo/vector-icons';
import {
  ActivityIndicator,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { ThemeToggle } from './ThemeToggle';
import type { ApiUser } from '../services/users';
import { fullNameFor, type IconName } from '../screens/types';

export function ProfileAvatar({
  image,
  initials,
  isDarkMode,
}: {
  image?: string;
  initials: string;
  isDarkMode: boolean;
}) {
  return (
    <View
      className={`h-28 w-28 rounded-full items-center justify-center border-4 ${
        isDarkMode
          ? 'border-zinc-950 bg-zinc-900'
          : 'border-white bg-zinc-100'
      }`}
    >
      {image ? (
        <Image source={{ uri: image }} className="h-full w-full rounded-full" />
      ) : (
        <Text
          className={`text-3xl font-semibold ${
            isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
          }`}
        >
          {initials}
        </Text>
      )}
    </View>
  );
}

export function Header({
  profile,
  isDarkMode,
  onEdit,
}: {
  profile: ApiUser | null;
  isDarkMode: boolean;
  onEdit?: () => void;
}) {
  const fullName = fullNameFor(profile);

  return (
    <View className="bg-zinc-900 px-8 pt-12 pb-20 rounded-b-[44px]">
      <View className="mb-8 flex-row items-center justify-between">
        <Text className="text-[11px] font-semibold uppercase tracking-[0.25rem] text-emerald-300">
          Profile
        </Text>
        <View className="flex-row items-center gap-3">
          {onEdit ? (
            <TouchableOpacity onPress={onEdit} activeOpacity={0.7}>
              <Feather name="edit-2" size={18} color="#a7f3d0" />
            </TouchableOpacity>
          ) : null}
          <ThemeToggle />
        </View>
      </View>

      <Text className="text-center text-4xl font-semibold leading-tight text-white">
        {fullName}
      </Text>

      {profile?.username ? (
        <Text className="mt-3 text-center text-sm font-medium text-emerald-300">
          @{profile.username}
        </Text>
      ) : null}
    </View>
  );
}

export function SectionTitle({
  title,
  isDarkMode,
}: {
  title: string;
  isDarkMode: boolean;
}) {
  return (
    <Text
      className={`mb-2 text-[10px] font-semibold uppercase tracking-[0.22rem] ${
        isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
      }`}
    >
      {title}
    </Text>
  );
}

export function InfoRow({
  icon,
  label,
  value,
  isDarkMode,
}: {
  icon: IconName;
  label: string;
  value?: string | number;
  isDarkMode: boolean;
}) {
  if (value === undefined || value === null || value === '') return null;

  return (
    <View
      className={`flex-row items-center py-4 border-b ${
        isDarkMode ? 'border-zinc-800' : 'border-zinc-100'
      }`}
    >
      <View className="w-11 items-start">
        <Feather
          name={icon}
          size={21}
          color={isDarkMode ? '#34d399' : '#059669'}
        />
      </View>

      <View className="flex-1">
        <Text
          className={`text-[10px] font-semibold uppercase tracking-[0.16rem] ${
            isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
          }`}
        >
          {label}
        </Text>
        <Text
          className={`mt-1 text-base leading-5 ${
            isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
          }`}
        >
          {String(value)}
        </Text>
      </View>
    </View>
  );
}

export function StatPill({
  label,
  value,
  isDarkMode,
}: {
  label: string;
  value?: string | number;
  isDarkMode: boolean;
}) {
  if (value === undefined || value === null || value === '') return null;

  return (
    <View
      className={`flex-1 rounded-lg border px-4 py-3 ${
        isDarkMode
          ? 'border-zinc-800 bg-zinc-900'
          : 'border-zinc-100 bg-zinc-50'
      }`}
    >
      <Text
        className={`text-[10px] font-semibold uppercase tracking-[0.16rem] ${
          isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
        }`}
      >
        {label}
      </Text>
      <Text
        className={`mt-1 text-lg font-semibold ${
          isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
        }`}
      >
        {String(value)}
      </Text>
    </View>
  );
}

export function LoadingProfile({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <View
      className={`mt-6 rounded-lg border px-5 py-6 items-center ${
        isDarkMode
          ? 'border-zinc-800 bg-zinc-900'
          : 'border-zinc-100 bg-zinc-50'
      }`}
    >
      <ActivityIndicator color={isDarkMode ? '#34d399' : '#059669'} />
      <Text
        className={`mt-3 text-sm ${
          isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
        }`}
      >
        Loading profile
      </Text>
    </View>
  );
}

export function ErrorPanel({
  message,
  isDarkMode,
  onRetry,
}: {
  message: string;
  isDarkMode: boolean;
  onRetry: () => void;
}) {
  return (
    <View
      className={`mt-6 rounded-lg border px-5 py-5 ${
        isDarkMode
          ? 'border-red-900 bg-zinc-900'
          : 'border-red-100 bg-red-50'
      }`}
    >
      <Text
        className={`text-base font-semibold ${
          isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
        }`}
      >
        Profile unavailable
      </Text>
      <Text
        className={`mt-2 text-sm leading-5 ${
          isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
        }`}
      >
        {message}
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={onRetry}
        className={`mt-4 rounded-lg py-3 items-center ${
          isDarkMode ? 'bg-zinc-50' : 'bg-zinc-900'
        }`}
      >
        <Text
          className={`text-xs font-semibold uppercase tracking-widest ${
            isDarkMode ? 'text-zinc-950' : 'text-white'
          }`}
        >
          Retry
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export function LogoutButton({
  isDarkMode,
  onPress,
}: {
  isDarkMode: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={onPress}
      className={`mt-8 rounded-lg py-4 items-center ${
        isDarkMode ? 'bg-zinc-50' : 'bg-zinc-900'
      }`}
    >
      <Text
        className={`text-sm font-semibold uppercase tracking-widest ${
          isDarkMode ? 'text-zinc-950' : 'text-white'
        }`}
      >
        Logout
      </Text>
    </TouchableOpacity>
  );
}
