import { create } from 'axios';
import type {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { AUTH_TOKEN_KEY } from '../constants/storage';
import { getAuthStorageItem } from './authStorage';

const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? 'https://dummyjson.com';
const API_TIMEOUT = 10000;

export const api: AxiosInstance = create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    const token = await getAuthStorageItem(AUTH_TOKEN_KEY);

    if (token) {
      config.headers.set('Authorization', `Bearer ${token}`);
    }

    return config;
  }
);

api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => Promise.reject(error)
);

export default api;
