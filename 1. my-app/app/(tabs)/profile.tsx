import { ScrollView, StyleSheet, Text, View } from "react-native";

export default function ProfileScreen() {
  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <View style={styles.header}>
        <Text style={styles.eyebrow}>Account</Text>
        <Text selectable style={styles.title}>
          Simple Profile
        </Text>
      </View>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text selectable style={styles.avatarText}>
            ST
          </Text>
        </View>
        <Text selectable style={styles.name}>
          Student
        </Text>
        <Text selectable style={styles.bio}>
          A small profile screen with calm spacing and readable content.
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: "center",
    backgroundColor: "#DDEBFF",
    borderRadius: 36,
    height: 72,
    justifyContent: "center",
    width: 72,
  },
  avatarText: {
    color: "#245EA8",
    fontSize: 28,
    fontWeight: "800",
  },
  bio: {
    color: "#536377",
    fontSize: 16,
    lineHeight: 23,
    textAlign: "center",
  },
  card: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderColor: "#DCE4EF",
    borderRadius: 8,
    borderWidth: 1,
    gap: 12,
    padding: 22,
  },
  content: {
    gap: 18,
    padding: 24,
    paddingTop: 64,
  },
  eyebrow: {
    color: "#536377",
    fontSize: 15,
  },
  header: {
    gap: 8,
  },
  name: {
    color: "#111C2B",
    fontSize: 20,
    fontWeight: "700",
  },
  screen: {
    backgroundColor: "#F4F7FB",
    flex: 1,
  },
  title: {
    color: "#111C2B",
    fontSize: 34,
    fontWeight: "800",
  },
});
