import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState, useEffect, useCallback } from 'react';

export function useAsyncStorage<T>(key: string, defaultValue: T): [T, (value: T) => Promise<void>, () => Promise<void>] {
  const [value, setValue] = useState<T>(defaultValue);

  useEffect(() => {
    AsyncStorage.getItem(key).then(stored => {
      if (stored !== null) {
        try { setValue(JSON.parse(stored)); } catch { setValue(defaultValue); }
      }
    });
  }, [key]);

  const setStored = useCallback(async (newValue: T) => {
    await AsyncStorage.setItem(key, JSON.stringify(newValue));
    setValue(newValue);
  }, [key]);

  const deleteStored = useCallback(async () => {
    await AsyncStorage.removeItem(key);
    setValue(defaultValue);
  }, [key]);

  return [value, setStored, deleteStored];
}
