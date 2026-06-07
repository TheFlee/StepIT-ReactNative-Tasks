import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';

import { AUTH_TOKEN_KEY, AUTH_USER_KEY } from '../constants/storage';
import {
  deleteAuthStorageItem,
  getAuthStorageItem,
  setAuthStorageItem,
} from '../lib/authStorage';

export type User = {
  name: string;
  lastname: string;
  phone: string;
  email: string;
};

type StoredUser = User & {
  password: string;
};

type RegisterInput = StoredUser;

type AuthContextValue = {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (input: RegisterInput) => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function toPublicUser(user: StoredUser): User {
  return {
    name: user.name,
    lastname: user.lastname,
    phone: user.phone,
    email: user.email,
  };
}

function createSessionToken(email: string) {
  return `${email}:${Date.now()}`;
}

function isStoredUser(value: unknown): value is StoredUser {
  if (!value || typeof value !== 'object') return false;

  const user = value as Partial<StoredUser>;

  return Boolean(
    user.name &&
      user.lastname &&
      user.phone &&
      user.email &&
      user.password
  );
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      getAuthStorageItem(AUTH_TOKEN_KEY),
      getAuthStorageItem(AUTH_USER_KEY),
    ])
      .then(async ([token, storedUser]) => {
        if (!isMounted || !token || !storedUser) return;

        const parsedUser = JSON.parse(storedUser) as unknown;

        if (!isStoredUser(parsedUser)) {
          await deleteAuthStorageItem(AUTH_TOKEN_KEY);
          await deleteAuthStorageItem(AUTH_USER_KEY);
          return;
        }

        setUser(toPublicUser(parsedUser));
      })
      .catch((error: unknown) => {
        console.warn('Failed to load auth session:', error);
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const register = async (input: RegisterInput) => {
    const storedUser = JSON.stringify(input);
    const token = createSessionToken(input.email);

    await setAuthStorageItem(AUTH_USER_KEY, storedUser);
    await setAuthStorageItem(AUTH_TOKEN_KEY, token);
    setUser(toPublicUser(input));
  };

  const login = async (email: string, password: string) => {
    const storedUser = await getAuthStorageItem(AUTH_USER_KEY);

    if (!storedUser) {
      throw new Error('No account found. Create one first.');
    }

    const parsedUser = JSON.parse(storedUser) as unknown;

    if (!isStoredUser(parsedUser)) {
      await deleteAuthStorageItem(AUTH_TOKEN_KEY);
      await deleteAuthStorageItem(AUTH_USER_KEY);
      throw new Error('No account found. Create one first.');
    }

    const account = parsedUser;

    if (
      account.email.trim().toLowerCase() !== email.trim().toLowerCase() ||
      account.password !== password
    ) {
      throw new Error('Email or password is incorrect.');
    }

    await setAuthStorageItem(AUTH_TOKEN_KEY, createSessionToken(email));
    setUser(toPublicUser(account));
  };

  const logout = async () => {
    await deleteAuthStorageItem(AUTH_TOKEN_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, isLoading, login, logout, register }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const value = useContext(AuthContext);

  if (!value) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return value;
}
