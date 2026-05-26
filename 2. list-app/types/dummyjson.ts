export type PaginatedResponse<TKey extends string, TItem> = {
  total: number;
  skip: number;
  limit: number;
} & Record<TKey, TItem[]>;

export type Product = {
  id: number;
  title: string;
  price: number;
};

export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
};
