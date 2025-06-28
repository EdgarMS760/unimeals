import { Tabs } from 'expo-router';
import React from 'react';
import { useColorScheme } from '@hooks/useColorScheme';
import CustomTabBar from '@components/ui/CustomTabBar';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';


export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <AntDesign name="home" size={24} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="plus"
        options={{
          title: '',
          tabBarButton: () => null, // Oculta el tab nativo
        }}
      />
      <Tabs.Screen
        name="chats"
        options={{
          title: 'Chats',
          tabBarIcon: ({ color }) => (
            <AntDesign name="message1" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
