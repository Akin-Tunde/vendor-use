import { Tabs, usePathname } from 'expo-router';
import { Image } from 'react-native';

export default function TabLayout() {
  const pathname = usePathname();

  // Check if current route is Profile or any sub-route opened from Profile
  const isProfileTabActive =
    pathname.includes('/profile') ||
    pathname.includes('/analytics') ||
    pathname.includes('/finance') ||
    pathname.includes('/settings') ||
    pathname.includes('/marketing');

  return (
    <Tabs
      backBehavior="history"
      screenOptions={{
        tabBarActiveTintColor: '#4F26D9',
        tabBarInactiveTintColor: '#94a3b8',
        headerShown: false,
        tabBarStyle: { height: 70, paddingBottom: 12, paddingTop: 10 },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/dashboard.png')}
              style={{ width: 22, height: 22, }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/orders.png')}
              style={{ width: 22, height: 22, }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="products"
        options={{
          title: 'Products',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/products.png')}
              style={{ width: 22, height: 22, }}
              resizeMode="contain"
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Image
              source={require('../../assets/icons/profile.png')}
              style={{
                width: 22,
                height: 22,

              }}
              resizeMode="contain"
            />
          ),
          tabBarLabelStyle: {
            color: isProfileTabActive ? '#4F26D9' : '#94a3b8',
            fontSize: 10,
            fontWeight: '600',
          },
        }}
      />

      {/* Retain routes as hidden tabs so navigation and deep links continue to work */}
      <Tabs.Screen name="analytics" options={{ href: null }} />
      <Tabs.Screen name="finance" options={{ href: null }} />
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}