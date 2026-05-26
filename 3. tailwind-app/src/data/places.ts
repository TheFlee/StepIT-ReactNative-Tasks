import type { ComponentProps } from 'react';

import { Ionicons } from '@expo/vector-icons';

export type PlaceIcon = ComponentProps<typeof Ionicons>['name'];

export type Place = {
  id: string;
  name: string;
  icon: PlaceIcon;
};

export const places: Place[] = [
  { id: 'park', name: 'Riverside Park', icon: 'leaf-outline' },
  { id: 'market', name: 'Old Town Market', icon: 'storefront-outline' },
  { id: 'museum', name: 'City Museum', icon: 'images-outline' },
];

export function normalizeRouteId(id: string | string[] | undefined): string {
  if (Array.isArray(id)) {
    return id[0] ?? '';
  }
  return id ?? '';
}

export function getPlace(id: string | string[] | undefined): Place | undefined {
  const key = normalizeRouteId(id);
  if (!key) {
    return undefined;
  }
  return places.find((place) => place.id === key);
}
