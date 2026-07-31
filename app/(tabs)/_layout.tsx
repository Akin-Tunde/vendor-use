import React from 'react';
import { Tabs } from 'expo-router';
import { LayoutDashboard, ShoppingCart, Tag, Users, MoreHorizontal } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#4F26D9',
      tabBarInactiveTintColor: '#94a3b8',
      headerShown: false,
      tabBarStyle: { height: 90, paddingBottom: 30, paddingTop: 10 }
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Dashboard',
        tabBarIcon: ({ color }) => <LayoutDashboard size={24} color={color} />,
      }} />
      <Tabs.Screen name="orders" options={{
        title: 'Orders',
        tabBarIcon: ({ color }) => <ShoppingCart size={24} color={color} />,
      }} />
      <Tabs.Screen name="products" options={{
        title: 'Products',
        tabBarIcon: ({ color }) => <Tag size={24} color={color} />,
      }} />
      <Tabs.Screen name="customers" options={{
        title: 'Customers',
        tabBarIcon: ({ color }) => <Users size={24} color={color} />,
      }} />
      <Tabs.Screen name="more" options={{
        title: 'More',
        tabBarIcon: ({ color }) => <MoreHorizontal size={24} color={color} />,
      }} />
    </Tabs>
  );
}