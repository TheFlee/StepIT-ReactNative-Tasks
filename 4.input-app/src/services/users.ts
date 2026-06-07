import { api } from '../lib/api';

export type ApiUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  username?: string;
  phone?: string;
  gender?: string;
  image?: string;
  age?: number;
  birthDate?: string;
  role?: string;
  university?: string;
  address?: {
    city?: string;
    country?: string;
    state?: string;
  };
  company?: {
    department?: string;
    name?: string;
    title?: string;
  };
};

export async function getUserById(id: number) {
  const { data } = await api.get<ApiUser>(`/users/${id}`);

  return data;
}
