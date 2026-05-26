import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import type { ColorValue } from 'react-native';

function TabIcon({ name, color }: { name: keyof typeof Ionicons.glyphMap; color: ColorValue }) {
  return <Ionicons color={color} name={name} size={24} />;
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#8245ff',
        tabBarInactiveTintColor: '#8c8c94',
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
        tabBarStyle: {
          borderTopWidth: 0,
          borderRadius: 28,
          bottom: 12,
          elevation: 0,
          height: 76,
          left: 16,
          paddingBottom: 10,
          paddingTop: 10,
          position: 'absolute',
          right: 16,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabIcon color={color} name="home-outline" />,
        }}
      />
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Feed',
          tabBarIcon: ({ color }) => <TabIcon color={color} name="radio-outline" />,
        }}
      />
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color }) => <TabIcon color={color} name="bag-outline" />,
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          title: 'Message',
          tabBarIcon: ({ color }) => <TabIcon color={color} name="chatbubble-ellipses-outline" />,
        }}
      />
      <Tabs.Screen
        name="user"
        options={{
          title: 'User',
          tabBarIcon: ({ color }) => <TabIcon color={color} name="person-outline" />,
        }}
      />
    </Tabs>
  );
}
