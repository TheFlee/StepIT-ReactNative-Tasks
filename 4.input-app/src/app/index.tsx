import { useEffect, useState } from 'react';
import { router } from 'expo-router';
import type { Href } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View } from 'react-native';

import { Header } from '../components/ProfileParts';
import { AppTabBar } from '../components/TabBar';
import { ProfileScreen } from '../screens/ProfileScreen';
import { ScanQrScreen } from '../screens/ScanQrScreen';
import type { ActiveTab } from '../screens/types';
import { WalletScreen } from '../screens/WalletScreen';
import { useAuth } from '../contexts/auth';
import { useTheme } from '../contexts/theme';
import { getUserById, type ApiUser } from '../services/users';

const LOGIN_ROUTE = '/login' as Href;
const DEMO_USER_ID = 12;

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
  const [activeTab, setActiveTab] = useState<ActiveTab>('wallet');
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

  const displayName = `${user.name} ${user.lastname}`.trim() || 'Guest User';

  return (
    <SafeAreaView
      className={`flex-1 ${isDarkMode ? 'bg-zinc-950' : 'bg-white'}`}
    >
      <View className="flex-1">
        {activeTab === 'wallet' ? (
          <WalletScreen displayName={displayName} isDarkMode={isDarkMode} />
        ) : activeTab === 'profile' ? (
          <ProfileScreen
            profile={profile}
            isProfileLoading={isProfileLoading}
            profileError={profileError}
            isDarkMode={isDarkMode}
            onRetry={handleRetry}
            onLogout={handleLogout}
            onEdit={() => router.push('/edit-user' as Href)}
          />
        ) : (
          <ScanQrScreen isDarkMode={isDarkMode} />
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
