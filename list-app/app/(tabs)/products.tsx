import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { LoadMoreListScreen } from "@/components/load-more-list-screen";
import { useLoadMoreFetch } from "@/hooks/use-load-more-fetch";
import type { PaginatedResponse, Product } from "@/types/dummyjson";

export default function ProductsScreen() {
  const buildUrl = useCallback(
    (limit: number, skip: number) =>
      `https://dummyjson.com/products?limit=${limit}&skip=${skip}&select=title,price`,
    [],
  );

  const pickItems = useCallback((body: unknown) => {
    const data = body as PaginatedResponse<"products", Product>;
    return { items: data.products, total: data.total };
  }, []);

  const list = useLoadMoreFetch(buildUrl, pickItems);

  return (
    <LoadMoreListScreen
      items={list.items}
      total={list.total}
      loading={list.loading}
      loadingMore={list.loadingMore}
      error={list.error}
      hasMore={list.hasMore}
      onLoadMore={list.loadMore}
      onRetry={list.retry}
      keyExtractor={(item) => String(item.id)}
      renderItem={(item) => (
        <View style={styles.row}>
          <Text style={styles.title} numberOfLines={2}>
            {item.title}
          </Text>
          <Text style={styles.meta}>${item.price}</Text>
        </View>
      )}
    />
  );
}

const styles = StyleSheet.create({
  row: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: "#e5e5e5",
    gap: 4,
  },
  title: {
    fontSize: 15,
    color: "#111",
  },
  meta: {
    fontSize: 13,
    color: "#666",
  },
});
