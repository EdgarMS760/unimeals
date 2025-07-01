import {Tabs} from 'expo-router';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import CustomTabBar from '@components/ui/CustomTabBar';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import Header from '@ui/Header';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <Header /> {/* 👈 Este es tu header común para todas las tabs */}

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
            tabBarButton: () => null,
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
});
