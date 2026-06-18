import { Feather } from '@expo/vector-icons';

import type { ApiUser } from '../services/users';

export type IconName = keyof typeof Feather.glyphMap;
export type ActiveTab = 'wallet' | 'profile' | 'scan';

export function fullNameFor(user: ApiUser | null) {
  if (!user) return 'DummyJSON profile';

  return `${user.firstName} ${user.lastName}`.trim() || 'DummyJSON profile';
}

export function initialsFor(user: ApiUser | null) {
  if (!user) return 'DJ';

  const initials = `${user.firstName.charAt(0)}${user.lastName.charAt(0)}`;
  return initials || 'DJ';
}

export function locationFor(user: ApiUser) {
  return [user.address?.city, user.address?.state, user.address?.country]
    .filter(Boolean)
    .join(', ');
}
