import { useCallback, useEffect, useState } from "react";

const PAGE_SIZE = 10;

type FetchResult<T> = {
  items: T[];
  total: number;
};

export function useLoadMoreFetch<T>(
  buildUrl: (limit: number, skip: number) => string,
  pickItems: (body: unknown) => FetchResult<T>,
) {
  const [items, setItems] = useState<T[]>([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const hasMore = items.length < total;

  const fetchPage = useCallback(
    async (skip: number, append: boolean) => {
      const response = await fetch(buildUrl(PAGE_SIZE, skip));
      if (!response.ok) {
        throw new Error(`Request failed (${response.status})`);
      }
      const body = await response.json();
      const result = pickItems(body);
      setTotal(result.total);
      setItems((prev) =>
        append ? [...prev, ...result.items] : result.items,
      );
    },
    [buildUrl, pickItems],
  );

  const loadInitial = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      await fetchPage(0, false);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setItems([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [fetchPage]);

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || items.length >= total) return;

    setLoadingMore(true);
    setError(null);
    try {
      await fetchPage(items.length, true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setLoadingMore(false);
    }
  }, [fetchPage, items.length, total, loading, loadingMore]);

  useEffect(() => {
    loadInitial();
  }, [loadInitial]);

  return {
    items,
    total,
    loading,
    loadingMore,
    error,
    hasMore,
    loadMore,
    retry: loadInitial,
  };
}
