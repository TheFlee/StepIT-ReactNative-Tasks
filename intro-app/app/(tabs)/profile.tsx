import { type Href, useRouter } from "expo-router";
import { Button, Image, ScrollView, Text, View } from "react-native";

import { styles } from "@/styles";

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <ScrollView
      contentInsetAdjustmentBehavior="automatic"
      style={styles.screen}
      contentContainerStyle={styles.content}
    >
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80",
        }}
        style={styles.image}
      />
      <Text selectable style={styles.title}>
        Profile
      </Text>
      <Text selectable style={styles.text}>
        This final tab completes the small three page app. It follows the same
        structure as the other screens: a stock image, enough text to show a
        real content area, and one button for navigation. The project now uses
        the same app folder pattern as the sibling my-app project. The profile
        page can contain a longer personal description, account information, or a
        short story about the user. For this simple example, the text is expanded
        so the page needs to scroll and the layout can be tested with more than
        one or two lines of content. The image, title, paragraph, and button all
        use the same shared styles as the other pages, which keeps the app
        predictable. When the user reaches the bottom, the final button returns
        to the home tab and closes the small navigation loop.
      </Text>
      <View style={styles.button}>
        <Button title="Back to Home" onPress={() => router.push("/" as Href)} />
      </View>
    </ScrollView>
  );
}
