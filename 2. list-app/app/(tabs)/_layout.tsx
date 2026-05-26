import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: { backgroundColor: "#fff" },
        headerTitleStyle: { fontWeight: "600" },
        tabBarActiveTintColor: "#111",
        tabBarInactiveTintColor: "#aaa",
        tabBarStyle: { backgroundColor: "#fff" },
        tabBarShowLabel: true,
      }}
    >
      <Tabs.Screen
        name="products"
        options={{
          title: "Products",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bag-outline" size={size ?? 22} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="users"
        options={{
          title: "Users",
          tabBarIcon: ({ color, size }) => (
            <Ionicons
              name="person-outline"
              size={size ?? 22}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
