import { type Href, useRouter } from "expo-router";
import { Button, Image, ScrollView, Text, View } from "react-native";

import { styles } from "@/styles";

export default function PlanScreen() {
  const router = useRouter();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80",
        }}
        style={styles.image}
      />
      <Text selectable style={styles.title}>
        Plan
      </Text>
      <Text selectable style={styles.text}>
        This second tab keeps the same simple pattern as the first page. It has
        one image, one longer paragraph, and one navigation button. Shared styles
        keep the spacing, image size, and typography consistent across every
        screen without repeating a StyleSheet in each file. The plan page can
        hold more detailed information about what should happen next, what the
        user should review, and how the app is organized. A longer paragraph is
        helpful here because it shows how the ScrollView behaves when the text
        grows beyond the visible area. The content is still plain and easy to
        read, but there is enough of it to make vertical scrolling natural. This
        is the kind of screen where a student might write lesson notes, small
        goals, reminders, or a checklist explanation before moving to the profile
        tab. The button remains the only action so the page stays intentionally
        simple.
      </Text>
      <View style={styles.button}>
        <Button
          title="Go to Profile"
          onPress={() => router.push("/profile" as Href)}
        />
      </View>
    </ScrollView>
  );
}
