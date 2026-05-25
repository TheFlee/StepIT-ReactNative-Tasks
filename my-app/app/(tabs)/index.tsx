import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function Index() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Good morning</Text>
        <Text selectable style={styles.title}>
          Simple Home
        </Text>
      </View>

      <View style={styles.card}>
        <Text selectable style={styles.cardTitle}>
          Today&apos;s focus
        </Text>
        <Text selectable style={styles.bodyText}>
          Keep the app clean, quick, and easy to scan.
        </Text>
      </View>

      <View style={styles.tileRow}>
        <InfoTile label="Tasks" value="3" />
        <InfoTile label="Done" value="1" />
      </View>
    </ScrollView>
  );
}

function InfoTile({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.tile}>
      <Text selectable style={styles.tileValue}>
        {value}
      </Text>
      <Text selectable style={styles.tileLabel}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  bodyText: {
    color: "#49605A",
    fontSize: 16,
    lineHeight: 23,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DDE7E1",
    borderRadius: 8,
    borderWidth: 1,
    gap: 14,
    padding: 18,
  },
  cardTitle: {
    color: "#10231E",
    fontSize: 20,
    fontWeight: "700",
  },
  content: {
    gap: 18,
    padding: 24,
    paddingTop: 64,
  },
  eyebrow: {
    color: "#49605A",
    fontSize: 15,
  },
  header: {
    gap: 8,
  },
  screen: {
    backgroundColor: "#F6FAF7",
    flex: 1,
  },
  tile: {
    backgroundColor: "#E8F3EE",
    borderRadius: 8,
    flex: 1,
    gap: 4,
    padding: 16,
  },
  tileLabel: {
    color: "#49605A",
    fontSize: 14,
  },
  tileRow: {
    flexDirection: "row",
    gap: 12,
  },
  tileValue: {
    color: "#146C5A",
    fontSize: 28,
    fontWeight: "800",
  },
  title: {
    color: "#10231E",
    fontSize: 34,
    fontWeight: "800",
  },
});
