import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

function canUseWebStorage() {
  return Platform.OS === 'web' && typeof localStorage !== 'undefined';
}

export async function getAuthStorageItem(key: string) {
  if (canUseWebStorage()) {
    return localStorage.getItem(key);
  }

  return SecureStore.getItemAsync(key);
}

export async function setAuthStorageItem(key: string, value: string) {
  if (canUseWebStorage()) {
    localStorage.setItem(key, value);
    return;
  }

  await SecureStore.setItemAsync(key, value);
}

export async function deleteAuthStorageItem(key: string) {
  if (canUseWebStorage()) {
    localStorage.removeItem(key);
    return;
  }

  await SecureStore.deleteItemAsync(key);
}
