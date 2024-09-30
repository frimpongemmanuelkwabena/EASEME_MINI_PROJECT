import { Tabs } from 'expo-router';
import React from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import WelcomeScreen from '../welcomeScreen';

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const [isWelcomePageVisible, setIsWelcomePageVisible] = useState<boolean>(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleWelcomeContinue = () => {
    setIsWelcomePageVisible(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isWelcomePageVisible) {
    return <WelcomeScreen onContinue={handleWelcomeContinue} />;
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors[colorScheme ?? 'light'].background,
          borderTopWidth: 0,
          elevation: 10, // Add shadow to tab bar
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Expenses',
          tabBarIcon: ({ color }) => (
            <AntDesign name="shoppingcart" size={24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="explore"
        options={{
          title: 'Reports',
          tabBarIcon: ({ color }) => (
            <AntDesign name="barschart" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => (
            <AntDesign name="setting" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
