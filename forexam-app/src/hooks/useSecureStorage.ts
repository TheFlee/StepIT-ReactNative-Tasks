import * as SecureStore from 'expo-secure-store';
import { useState, useEffect, useCallback } from 'react';

export function useSecureStorage<T>(key: string): [T | null, (value: T) => Promise<void>, () => Promise<void>] {
  const [value, setValue] = useState<T | null>(null);

  useEffect(() => {
    SecureStore.getItemAsync(key).then(stored => {
      if (stored) {
        try { setValue(JSON.parse(stored)); } catch { setValue(null); }
      }
    });
  }, [key]);

  const setStored = useCallback(async (newValue: T) => {
    await SecureStore.setItemAsync(key, JSON.stringify(newValue));
    setValue(newValue);
  }, [key]);

  const deleteStored = useCallback(async () => {
    await SecureStore.deleteItemAsync(key);
    setValue(null);
  }, [key]);

  return [value, setStored, deleteStored];
}
