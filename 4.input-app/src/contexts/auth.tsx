import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import * as SecureStore from 'expo-secure-store';

const AUTH_USER_KEY = 'auth.user';
const AUTH_TOKEN_KEY = 'auth.token';

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

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    Promise.all([
      SecureStore.getItemAsync(AUTH_TOKEN_KEY),
      SecureStore.getItemAsync(AUTH_USER_KEY),
    ])
      .then(([token, storedUser]) => {
        if (!isMounted || !token || !storedUser) return;

        setUser(toPublicUser(JSON.parse(storedUser) as StoredUser));
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

    await SecureStore.setItemAsync(AUTH_USER_KEY, storedUser);
    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, token);
    setUser(toPublicUser(input));
  };

  const login = async (email: string, password: string) => {
    const storedUser = await SecureStore.getItemAsync(AUTH_USER_KEY);

    if (!storedUser) {
      throw new Error('No account found. Create one first.');
    }

    const account = JSON.parse(storedUser) as StoredUser;

    if (
      account.email.trim().toLowerCase() !== email.trim().toLowerCase() ||
      account.password !== password
    ) {
      throw new Error('Email or password is incorrect.');
    }

    await SecureStore.setItemAsync(AUTH_TOKEN_KEY, createSessionToken(email));
    setUser(toPublicUser(account));
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync(AUTH_TOKEN_KEY);
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
