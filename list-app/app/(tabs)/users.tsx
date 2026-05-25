import { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";

import { LoadMoreListScreen } from "@/components/load-more-list-screen";
import { useLoadMoreFetch } from "@/hooks/use-load-more-fetch";
import type { PaginatedResponse, User } from "@/types/dummyjson";

export default function UsersScreen() {
  const buildUrl = useCallback(
    (limit: number, skip: number) =>
      `https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=firstName,lastName,email`,
    [],
  );

  const pickItems = useCallback((body: unknown) => {
    const data = body as PaginatedResponse<"users", User>;
    return { items: data.users, total: data.total };
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
          <Text style={styles.name}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={styles.email} numberOfLines={1}>
            {item.email}
          </Text>
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
  name: {
    fontSize: 15,
    color: "#111",
  },
  email: {
    fontSize: 13,
    color: "#666",
  },
});
