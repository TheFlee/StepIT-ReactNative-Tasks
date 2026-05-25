import { ScrollView, StyleSheet, Text, View } from "react-native";

const items = [
  "Review lessons",
  "Build one small screen",
  "Run the app on Expo Go",
];

export default function PlanScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Study list</Text>
        <Text selectable style={styles.title}>
          Simple Plan
        </Text>
      </View>

      <View style={styles.list}>
        {items.map((item, index) => (
          <View key={item} style={styles.item}>
            <View style={styles.itemNumber}>
              <Text selectable style={styles.itemNumberText}>
                {index + 1}
              </Text>
            </View>
            <Text selectable style={styles.itemText}>
              {item}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    gap: 18,
    padding: 24,
    paddingTop: 64,
  },
  eyebrow: {
    color: "#6B5B45",
    fontSize: 15,
  },
  header: {
    gap: 8,
  },
  item: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#E5D9C8",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    padding: 16,
  },
  itemNumber: {
    alignItems: "center",
    backgroundColor: "#F1E4D2",
    borderRadius: 8,
    height: 34,
    justifyContent: "center",
    width: 34,
  },
  itemNumberText: {
    color: "#8A5B20",
    fontSize: 16,
    fontWeight: "800",
  },
  itemText: {
    color: "#3D3022",
    flex: 1,
    fontSize: 16,
    lineHeight: 22,
  },
  list: {
    gap: 12,
  },
  screen: {
    backgroundColor: "#FAF7F2",
    flex: 1,
  },
  title: {
    color: "#241B11",
    fontSize: 34,
    fontWeight: "800",
  },
});
