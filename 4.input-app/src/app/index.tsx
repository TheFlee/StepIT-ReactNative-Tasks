import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { Feather } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import type { BarcodeScanningResult } from 'expo-camera';
import {
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { ThemeToggle } from '../components/ThemeToggle';
import { useAuth } from '../contexts/auth';
import { useTheme } from '../contexts/theme';
import { getUserById, type ApiUser } from '../services/users';

const LOGIN_ROUTE = '/login' as Href;
const DEMO_USER_ID = 12;

type IconName = keyof typeof Feather.glyphMap;
type ActiveTab = 'profile' | 'scan';

function fullNameFor(user: ApiUser | null) {
  if (!user) return 'DummyJSON profile';

  return `${user.firstName} ${user.lastName}`.trim() || 'DummyJSON profile';
}

function initialsFor(user: ApiUser | null) {
  if (!user) return 'DJ';

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  return initials || 'DJ';
}

function locationFor(user: ApiUser) {
  return [user.address?.city, user.address?.state, user.address?.country]
    .filter(Boolean)
    .join(', ');
}

function ProfileAvatar({
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

function Header({
  profile,
  isDarkMode,
}: {
  profile: ApiUser | null;
  isDarkMode: boolean;
}) {
  const fullName = fullNameFor(profile);

  return (
    <View className="bg-zinc-900 px-8 pt-12 pb-20 rounded-b-[44px]">
      <View className="mb-8 flex-row items-center justify-between">
        <Text className="text-[11px] font-semibold uppercase tracking-[0.25rem] text-emerald-300">
          Profile
        </Text>
        <ThemeToggle />
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

function SectionTitle({
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

function InfoRow({
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

function StatPill({
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

function LoadingProfile({ isDarkMode }: { isDarkMode: boolean }) {
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

function ErrorPanel({
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

function LogoutButton({
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

function AppTabBar({
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

function ScanQrContent({ isDarkMode }: { isDarkMode: boolean }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [scanResult, setScanResult] = useState<BarcodeScanningResult | null>(
    null
  );

  const handleOpenCamera = async () => {
    if (permission?.granted) {
      setScanResult(null);
      setIsCameraOpen(true);
      return;
    }

    const response = await requestPermission();

    if (response.granted) {
      setScanResult(null);
      setIsCameraOpen(true);
    }
  };

  const handleBarcodeScanned = (result: BarcodeScanningResult) => {
    setScanResult(result);
    setIsCameraOpen(false);
  };

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="pb-10"
      showsVerticalScrollIndicator={false}
    >
      <View className="bg-zinc-900 px-8 pt-12 pb-12 rounded-b-[44px]">
        <View className="mb-8 flex-row items-center justify-between">
          <Text className="text-[11px] font-semibold uppercase tracking-[0.25rem] text-emerald-300">
            Scan QR
          </Text>
          <ThemeToggle />
        </View>

        <Text className="text-4xl font-semibold leading-tight text-white">
          Open camera{'\n'}to scan.
        </Text>
      </View>

      <View className="px-8 pt-8">
        <View
          className={`rounded-lg border overflow-hidden ${
            isDarkMode
              ? 'border-zinc-800 bg-zinc-900'
              : 'border-zinc-100 bg-zinc-50'
          }`}
        >
          {isCameraOpen && permission?.granted ? (
            <View className="h-[360px]">
              <CameraView
                active={isCameraOpen}
                facing="back"
                onBarcodeScanned={
                  scanResult ? undefined : handleBarcodeScanned
                }
                barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                style={{ flex: 1 }}
              />
              <View
                pointerEvents="none"
                style={StyleSheet.absoluteFill}
                className="items-center justify-center"
              >
                <View className="h-56 w-56 rounded-lg border-2 border-emerald-300" />
              </View>
            </View>
          ) : (
            <View className="min-h-[280px] items-center justify-center px-6 py-10">
              <View
                className={`h-20 w-20 rounded-full items-center justify-center ${
                  isDarkMode ? 'bg-zinc-950' : 'bg-white'
                }`}
              >
                <Feather
                  name="camera"
                  size={34}
                  color={isDarkMode ? '#34d399' : '#059669'}
                />
              </View>

              <Text
                className={`mt-5 text-center text-xl font-semibold ${
                  isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
                }`}
              >
                Camera permission required
              </Text>

              <Text
                className={`mt-2 text-center text-sm leading-5 ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Tap the button below to request camera access and scan a QR
                code.
              </Text>
            </View>
          )}
        </View>

        {scanResult ? (
          <View
            className={`mt-5 rounded-lg border p-5 ${
              isDarkMode
                ? 'border-zinc-800 bg-zinc-900'
                : 'border-zinc-100 bg-zinc-50'
            }`}
          >
            <Text
              className={`text-[10px] font-semibold uppercase tracking-[0.18rem] ${
                isDarkMode ? 'text-emerald-300' : 'text-emerald-600'
              }`}
            >
              Scanned result
            </Text>
            <Text
              className={`mt-2 text-base leading-6 ${
                isDarkMode ? 'text-zinc-50' : 'text-zinc-900'
              }`}
            >
              {scanResult.data}
            </Text>
          </View>
        ) : null}

        {!permission?.granted && permission?.canAskAgain === false ? (
          <Text className="mt-4 text-sm leading-5 text-red-400">
            Camera permission was denied. Enable it from device settings to scan
            QR codes.
          </Text>
        ) : null}

        <View className="mt-6 gap-3">
          <TouchableOpacity
            activeOpacity={0.85}
            onPress={handleOpenCamera}
            className={`rounded-lg py-4 items-center ${
              isDarkMode ? 'bg-zinc-50' : 'bg-zinc-900'
            }`}
          >
            <Text
              className={`text-sm font-semibold uppercase tracking-widest ${
                isDarkMode ? 'text-zinc-950' : 'text-white'
              }`}
            >
              {scanResult ? 'Scan again' : 'Open camera'}
            </Text>
          </TouchableOpacity>

          {isCameraOpen ? (
            <TouchableOpacity
              activeOpacity={0.75}
              onPress={() => setIsCameraOpen(false)}
              className="py-3 items-center"
            >
              <Text
                className={`text-sm font-medium ${
                  isDarkMode ? 'text-zinc-400' : 'text-zinc-500'
                }`}
              >
                Close camera
              </Text>
            </TouchableOpacity>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}

function LoadingScreen({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}
    >
      <Header profile={null} isDarkMode={isDarkMode} />
    </SafeAreaView>
  );
}

export default function Home() {
  const { isDarkMode } = useTheme();
  const { user, isLoading, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<ActiveTab>('profile');
  const [profile, setProfile] = useState<ApiUser | null>(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [profileError, setProfileError] = useState('');

  useEffect(() => {
    if (!isLoading && !user) {
      router.replace(LOGIN_ROUTE);
    }
  }, [isLoading, user]);

  useEffect(() => {
    let isMounted = true;

    async function loadProfile() {
      if (!user) return;

      setIsProfileLoading(true);
      setProfileError('');

      try {
        const nextProfile = await getUserById(DEMO_USER_ID);

        if (isMounted) {
          setProfile(nextProfile);
        }
      } catch (error: unknown) {
        if (isMounted) {
          setProfileError(
            error instanceof Error
              ? error.message
              : 'Could not load the DummyJSON user.'
          );
        }
      } finally {
        if (isMounted) {
          setIsProfileLoading(false);
        }
      }
    }

    loadProfile();

    return () => {
      isMounted = false;
    };
  }, [user]);

  const handleRetry = async () => {
    setIsProfileLoading(true);
    setProfileError('');

    try {
      const nextProfile = await getUserById(DEMO_USER_ID);
      setProfile(nextProfile);
    } catch (error: unknown) {
      setProfileError(
        error instanceof Error
          ? error.message
          : 'Could not load the DummyJSON user.'
      );
    } finally {
      setIsProfileLoading(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.replace(LOGIN_ROUTE);
  };

  if (isLoading || !user) {
    return <LoadingScreen isDarkMode={isDarkMode} />;
  }

  const fullName = fullNameFor(profile);
  const initials = initialsFor(profile);
  const location = profile ? locationFor(profile) : '';

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}
    >
      <View className="flex-1">
        {activeTab === 'profile' ? (
          <ScrollView
            className="flex-1"
            contentContainerClassName="pb-10"
            showsVerticalScrollIndicator={false}
          >
            <Header profile={profile} isDarkMode={isDarkMode} />

            <View className="px-8">
              <View className="-mt-14 items-center mb-8">
                <ProfileAvatar
                  image={profile?.image}
                  initials={initials}
                  isDarkMode={isDarkMode}
                />
              </View>

              {isProfileLoading && !profile ? (
                <LoadingProfile isDarkMode={isDarkMode} />
              ) : null}

              {profileError ? (
                <ErrorPanel
                  message={profileError}
                  isDarkMode={isDarkMode}
                  onRetry={handleRetry}
                />
              ) : null}

              {profile ? (
                <>
                  <View className="mb-7">
                    <SectionTitle title="Snapshot" isDarkMode={isDarkMode} />
                    <View className="flex-row gap-3">
                      <StatPill
                        label="Age"
                        value={profile.age}
                        isDarkMode={isDarkMode}
                      />
                      <StatPill
                        label="Role"
                        value={profile.role}
                        isDarkMode={isDarkMode}
                      />
                    </View>
                  </View>

                  <View className="mb-7">
                    <SectionTitle
                      title="Basic Information"
                      isDarkMode={isDarkMode}
                    />
                    <InfoRow
                      icon="user"
                      label="Name"
                      value={fullName}
                      isDarkMode={isDarkMode}
                    />
                    <InfoRow
                      icon="at-sign"
                      label="Username"
                      value={profile.username}
                      isDarkMode={isDarkMode}
                    />
                    <InfoRow
                      icon="mail"
                      label="Email"
                      value={profile.email}
                      isDarkMode={isDarkMode}
                    />
                    <InfoRow
                      icon="phone"
                      label="Phone"
                      value={profile.phone}
                      isDarkMode={isDarkMode}
                    />
                    <InfoRow
                      icon="calendar"
                      label="Birthday"
                      value={profile.birthDate}
                      isDarkMode={isDarkMode}
                    />
                    <InfoRow
                      icon="map-pin"
                      label="Location"
                      value={location}
                      isDarkMode={isDarkMode}
                    />
                  </View>
                </>
              ) : null}

              <LogoutButton isDarkMode={isDarkMode} onPress={handleLogout} />
            </View>
          </ScrollView>
        ) : (
          <ScanQrContent isDarkMode={isDarkMode} />
        )}

        <AppTabBar
          activeTab={activeTab}
          isDarkMode={isDarkMode}
          onChangeTab={setActiveTab}
        />
      </View>
    </SafeAreaView>
  );
}
