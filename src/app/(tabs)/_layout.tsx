import React from 'react';
import { FontAwesome } from '@expo/vector-icons'
import { Tabs } from 'expo-router';

export default function TabLayout() {

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#ae00ff',
        tabBarStyle: {
          height: 60,
          backgroundColor: '#fdfdfd',
        },
      }}    
    >
      <Tabs.Screen
        name="torneio"
        options={{
          title: 'Torneios',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="soccer-ball-o" color={color} />,
        }}
      />
      <Tabs.Screen
        name="grupo"
        options={{
          title: 'Grupos',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="group" color={color} />,
        }}
      />
      <Tabs.Screen
        name="time"
        options={{
          title: 'Times',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="object-group" color={color} />,
        }}
      />
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="jogador"
        options={{
          title: 'Jogadores',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="user" color={color} />,
        }}
      />
      <Tabs.Screen
        name="jogo"
        options={{
          title: 'Jogos',
          tabBarIcon: ({ color }) => <FontAwesome size={20} name="gamepad" color={color} />,
        }}
      />
    </Tabs>
  );
}
