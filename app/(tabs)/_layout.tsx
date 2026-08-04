
import { Tabs } from 'expo-router';
import { Home, ShoppingCart, Tag, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#4F26D9',
      tabBarInactiveTintColor: '#94a3b8',
      headerShown: false,
      tabBarStyle: { height: 70, paddingBottom: 12, paddingTop: 10 }
    }}>
      <Tabs.Screen name="index" options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <Home size={22} color={color} />,
      }} />
      <Tabs.Screen name="orders" options={{
        title: 'Orders',
        tabBarIcon: ({ color }) => <ShoppingCart size={22} color={color} />,
      }} />
      <Tabs.Screen name="products" options={{
        title: 'Products',
        tabBarIcon: ({ color }) => <Tag size={22} color={color} />,
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <User size={22} color={color} />,
      }} />
      
      {/* Retain routes as hidden tabs so navigation and deep links continue to work */}
      <Tabs.Screen name="analytics" options={{ href: null }} />
      <Tabs.Screen name="finance" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}