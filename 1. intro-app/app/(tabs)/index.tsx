import { type Href, useRouter } from "expo-router";
import { Button, Image, ScrollView, Text, View } from "react-native";

import { styles } from "@/styles";

export default function Index() {
  const router = useRouter();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80",
        }}
        style={styles.image}
      />
      <Text selectable style={styles.title}>
        Home
      </Text>
      <Text selectable style={styles.text}>
        Welcome to this simple Expo app. This page uses a stock image from the
        internet, a longer block of readable text, and one button that moves to
        another tab. The layout is intentionally small and direct so the file
        structure and tab navigation are easy to follow. The home screen can be
        used as a place for a short introduction, a quick project summary, or a
        message that explains what the user should look at first. In a real app
        this text might describe the main goal, show a few useful notes, or give
        a friendly overview before the user opens the next section. Adding more
        content here also makes the scroll behavior visible on smaller screens,
        which is useful when testing layouts on phones, tablets, and the web.
        The image stays at the top, the title stays below it, and the button
        remains near the end of the content so the page feels simple while still
        having enough vertical space to move.
      </Text>
      <View style={styles.button}>
        <Button title="Go to Plan" onPress={() => router.push("/plan" as Href)} />
      </View>
    </ScrollView>
  );
}
