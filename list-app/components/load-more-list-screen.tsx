import { useCallback } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type LoadMoreListScreenProps<T> = {
  items: T[];
  total: number;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  hasMore: boolean;
  onLoadMore: () => void;
  onRetry: () => void;
  keyExtractor: (item: T) => string;
  renderItem: (item: T) => React.ReactElement;
};

export function LoadMoreListScreen<T>({
  items,
  total,
  loading,
  loadingMore,
  error,
  hasMore,
  onLoadMore,
  onRetry,
  keyExtractor,
  renderItem,
}: LoadMoreListScreenProps<T>) {
  const handleEndReached = useCallback(() => {
    if (items.length === 0 || !hasMore || loading || loadingMore) return;
    onLoadMore();
  }, [items.length, hasMore, loading, loadingMore, onLoadMore]);

  const footer = () => {
    if (loading && items.length === 0) return null;

    if (error && items.length > 0) {
      return (
        <View style={styles.footer}>
          <Text style={styles.errorInline}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      );
    }

    if (loadingMore) {
      return (
        <View style={styles.footer}>
          <ActivityIndicator />
        </View>
      );
    }

    if (!hasMore && items.length > 0) {
      return (
        <Text style={styles.endText}>
          {items.length} of {total}
        </Text>
      );
    }

    return null;
  };

  return (
    <SafeAreaView style={styles.safe} edges={["bottom"]}>
      {loading && items.length === 0 ? (
        <View style={styles.centered}>
          <ActivityIndicator />
        </View>
      ) : error && items.length === 0 ? (
        <View style={styles.centered}>
          <Text style={styles.error}>{error}</Text>
          <Pressable style={styles.retryButton} onPress={onRetry}>
            <Text style={styles.retryText}>Retry</Text>
          </Pressable>
        </View>
      ) : (
        <FlatList
          style={styles.listContainer}
          data={items}
          keyExtractor={keyExtractor}
          renderItem={({ item }) => renderItem(item)}
          contentContainerStyle={styles.list}
          onEndReached={handleEndReached}
          onEndReachedThreshold={0.3}
          ListEmptyComponent={
            <Text style={styles.empty}>No items found.</Text>
          }
          ListFooterComponent={footer}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#fafafa",
  },
  listContainer: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
  },
  list: {
    padding: 16,
    gap: 8,
    flexGrow: 1,
  },
  empty: {
    textAlign: "center",
    color: "#666",
    marginTop: 24,
  },
  error: {
    color: "#b00020",
    textAlign: "center",
    paddingHorizontal: 24,
  },
  errorInline: {
    color: "#b00020",
    textAlign: "center",
    fontSize: 13,
  },
  retryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: "#111",
  },
  retryText: {
    color: "#fff",
    fontWeight: "600",
  },
  footer: {
    alignItems: "center",
    paddingVertical: 16,
  },
  endText: {
    textAlign: "center",
    fontSize: 12,
    color: "#888",
    paddingVertical: 16,
  },
});
