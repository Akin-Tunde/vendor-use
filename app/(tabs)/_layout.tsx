import { Tabs } from 'expo-router';
import { BarChart3, LayoutDashboard, Settings, ShoppingCart, Tag, Wallet } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#4F26D9',
      tabBarInactiveTintColor: '#94a3b8',
      headerShown: false,
      tabBarStyle: { height: 70, paddingBottom: 30, paddingTop: 10 }
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Dashboard',
        tabBarIcon: ({ color }) => <LayoutDashboard size={22} color={color} />,
      }} />
      <Tabs.Screen name="orders" options={{
        title: 'Orders',
        tabBarIcon: ({ color }) => <ShoppingCart size={22} color={color} />,
      }} />
      <Tabs.Screen name="products" options={{
        title: 'Products',
        tabBarIcon: ({ color }) => <Tag size={22} color={color} />,
      }} />
      <Tabs.Screen name="analytics" options={{
        title: 'Analytics',
        tabBarIcon: ({ color }) => <BarChart3 size={22} color={color} />,
      }} />
      <Tabs.Screen name="finance" options={{
        title: 'Finance',
        tabBarIcon: ({ color }) => <Wallet size={22} color={color} />,
      }} />
      <Tabs.Screen name="settings" options={{
        title: 'Settings',
        tabBarIcon: ({ color }) => <Settings size={22} color={color} />,
      }} />
    </Tabs>
  );
}