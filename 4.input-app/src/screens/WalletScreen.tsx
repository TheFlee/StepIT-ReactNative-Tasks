import { Feather } from '@expo/vector-icons';
import { ScrollView, Text, View } from 'react-native';

import { ThemeToggle } from '../components/ThemeToggle';

function MiniMetric({
  label,
  value,
  isDarkMode,
}: {
  label: string;
  value: string;
  isDarkMode: boolean;
}) {
  return (
    <View
      className={`flex-1 rounded-lg px-4 py-4 ${
        isDarkMode ? 'bg-zinc-900' : 'bg-zinc-50'
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
        className={`mt-2 text-xl font-semibold ${
          isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
        }`}
      >
        {value}
      </Text>
    </View>
  );
}

function ActivityTile({
  title,
  value,
  accent,
  isDarkMode,
}: {
  title: string;
  value: string;
  accent: 'emerald' | 'amber';
  isDarkMode: boolean;
}) {
  const accentClass =
    accent === 'emerald'
      ? isDarkMode
        ? 'bg-emerald-400'
        : 'bg-emerald-500'
      : 'bg-amber-400';

  return (
    <View
      className={`flex-1 min-h-[138px] rounded-[28px] p-5 justify-between ${
        isDarkMode ? 'bg-zinc-900' : 'bg-zinc-50'
      }`}
    >
      <View className="flex-row items-center justify-between">
        <Text
          className={`text-sm font-semibold ${
            isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
          }`}
        >
          {title}
        </Text>
        <View
          className={`h-10 w-10 rounded-full items-center justify-center ${accentClass}`}
        >
          <Feather
            name={accent === 'emerald' ? 'trending-up' : 'clock'}
            size={19}
            color="#09090b"
          />
        </View>
      </View>

      <Text
        className={`text-3xl font-semibold ${
          isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
        }`}
      >
        {value}
      </Text>
    </View>
  );
}

export function WalletScreen({
  displayName,
  isDarkMode,
}: {
  displayName: string;
  isDarkMode: boolean;
}) {
  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="pb-10"
      showsVerticalScrollIndicator={false}
    >
      <View className="px-8 pt-12">
        <View className="rounded-[36px] bg-zinc-900 px-7 pt-7 pb-9">
          <View className="mb-8 flex-row items-center justify-between">
            <Feather name="grid" size={24} color="#a7f3d0" />
            <ThemeToggle />
          </View>

          <Text className="text-base font-medium text-zinc-300">
            Welcome back
          </Text>

          <View className="mt-9 flex-row items-end justify-between">
            <View
              className={`h-28 w-28 rounded-[26px] items-center justify-center ${
                isDarkMode ? 'bg-zinc-950' : 'bg-white'
              }`}
            >
              <Feather
                name="user"
                size={54}
                color={isDarkMode ? '#34d399' : '#059669'}
              />
            </View>

            <View className="flex-1 pl-6">
              <Text className="text-lg font-semibold text-white">
                {displayName}
              </Text>
              <Text className="mt-2 text-3xl font-semibold text-white">
                AZN 2,184.72
              </Text>
              <Text className="mt-2 text-xs font-medium uppercase tracking-[0.16rem] text-emerald-300">
                Available balance
              </Text>
            </View>
          </View>
        </View>

        <View className="mt-9 flex-row items-center justify-between">
          <Text
            className={`text-2xl font-semibold ${
              isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
            }`}
          >
            Activities
          </Text>
          <Text
            className={`text-sm font-medium ${
              isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
            }`}
          >
            Monthly view
          </Text>
        </View>

        <View className="mt-5 flex-row gap-3">
          <ActivityTile
            title="Income"
            value="AZN 936"
            accent="emerald"
            isDarkMode={isDarkMode}
          />
          <ActivityTile
            title="Pending"
            value="14"
            accent="amber"
            isDarkMode={isDarkMode}
          />
        </View>

        <View className="mt-3 flex-row gap-3">
          <MiniMetric label="Saved" value="AZN 410" isDarkMode={isDarkMode} />
          <MiniMetric label="Requests" value="7" isDarkMode={isDarkMode} />
        </View>

        <View
          className={`mt-6 rounded-[28px] border p-5 ${
            isDarkMode
              ? 'border-zinc-800 bg-zinc-900'
              : 'border-zinc-100 bg-zinc-50'
          }`}
        >
          <View className="flex-row items-center justify-between">
            <View>
              <Text
                className={`text-[10px] font-semibold uppercase tracking-[0.18rem] ${
                  isDarkMode ? 'text-zinc-500' : 'text-zinc-400'
                }`}
              >
                Quick action
              </Text>
              <Text
                className={`mt-2 text-lg font-semibold ${
                  isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
                }`}
              >
                Scan a QR receipt
              </Text>
            </View>
            <View className="h-12 w-12 rounded-full bg-emerald-400 items-center justify-center">
              <Feather name="plus" size={24} color="#09090b" />
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
