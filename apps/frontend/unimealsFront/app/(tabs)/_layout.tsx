import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
     <Tabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: '#ffffff',
          height: 60,
          borderTopWidth: 0,
          elevation: 10,
        },
        tabBarLabelStyle: {
          fontSize: 12,
        },
        tabBarActiveTintColor: '#6200ee',
        tabBarInactiveTintColor: '#999999',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="feed"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <AntDesign name="home" size={24} color="black" />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Perfil',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
