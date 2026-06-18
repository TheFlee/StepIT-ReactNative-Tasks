import { ScrollView, View } from 'react-native';

import type { ApiUser } from '../services/users';
import {
  ErrorPanel,
  Header,
  InfoRow,
  LoadingProfile,
  LogoutButton,
  ProfileAvatar,
  SectionTitle,
  StatPill,
} from '../components/ProfileParts';
import { fullNameFor, initialsFor, locationFor } from './types';

export function ProfileScreen({
  profile,
  isProfileLoading,
  profileError,
  isDarkMode,
  onRetry,
  onLogout,
  onEdit,
}: {
  profile: ApiUser | null;
  isProfileLoading: boolean;
  profileError: string;
  isDarkMode: boolean;
  onRetry: () => void;
  onLogout: () => void;
  onEdit: () => void;
}) {
  const fullName = fullNameFor(profile);
  const initials = initialsFor(profile);
  const location = profile ? locationFor(profile) : '';

  return (
    <ScrollView
      className="flex-1"
      contentContainerClassName="pb-10"
      showsVerticalScrollIndicator={false}
    >
      <Header profile={profile} isDarkMode={isDarkMode} onEdit={onEdit} />

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
            onRetry={onRetry}
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

        <LogoutButton isDarkMode={isDarkMode} onPress={onLogout} />
      </View>
    </ScrollView>
  );
}
