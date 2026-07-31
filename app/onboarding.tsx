import React, { useState, useRef } from 'react';
import { View, Text, FlatList, Dimensions, Pressable, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ShoppingBag, TrendingUp, Bell, Package, 
  ClipboardList, BarChart3, Megaphone, MapPin, Star, ChevronRight 
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

// Define the data for all 4 screens based on your images
const ONBOARDING_DATA = [
  {
    id: '1',
    type: 'welcome',
    subtitle: 'Vendor',
    description: 'Manage your store.\nGrow your business.',
    buttonText: 'Next',
    bg: 'bg-primary',
  },
  {
    id: '2',
    type: 'features',
    title: 'Welcome to useMarket',
    subtitle: 'Vendor',
    description: 'Everything you need to manage your store, reach more customers and grow your business.',
    buttonText: 'Next',
    bg: 'bg-white',
    features: [
      { icon: ShoppingBag, title: 'Manage Easily', desc: 'Add products, manage inventory and track orders.', color: 'bg-green-100' },
      { icon: TrendingUp, title: 'Boost Sales', desc: 'Reach more customers and increase your earnings.', color: 'bg-purple-100' },
      { icon: Bell, title: 'Stay Updated', desc: 'Get real-time updates on orders and payments.', color: 'bg-orange-100' },
    ],
  },
  {
    id: '3',
    type: 'features',
    title: 'Manage Your Store',
    subtitle: 'All in One Place',
    description: 'Add products, track orders, manage inventory and view performance easily.',
    buttonText: 'Next',
    bg: 'bg-white',
    features: [
      { icon: Package, title: 'Product Management', desc: 'Add, edit and organize your products with ease.', color: 'bg-purple-100' },
      { icon: ClipboardList, title: 'Order Management', desc: 'Receive and manage orders in real-time.', color: 'bg-blue-100' },
      { icon: BarChart3, title: 'Business Insights', desc: 'Track your sales and growth with analytics.', color: 'bg-green-100' },
    ],
  },
  {
    id: '4',
    type: 'features',
    title: 'Grow Your Business',
    subtitle: 'Reach More Customers',
    description: 'Get discovered by thousands of customers in your area and grow every day.',
    buttonText: 'Get Started',
    bg: 'bg-white',
    features: [
      { icon: Megaphone, title: 'Promote Your Store', desc: 'Run promotions and discounts to attract customers.', color: 'bg-purple-100' },
      { icon: MapPin, title: 'Reach Local Customers', desc: 'Get discovered by nearby customers looking for you.', color: 'bg-green-100' },
      { icon: Star, title: 'Build Your Brand', desc: 'Grow your reputation and keep customers coming back.', color: 'bg-orange-100' },
    ],
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
    } else {
      router.replace('/(tabs)'); // Go to main app
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const isWelcome = item.type === 'welcome';

    return (
      <View style={{ width }} className={`flex-1 ${item.bg}`}>
        <SafeAreaView className="flex-1">
          {/* Header Area */}
          <View className="px-6 h-12 flex-row justify-end items-center">
            {!isWelcome && (
              <Pressable onPress={() => router.replace('/(tabs)')}>
                <Text className="text-primary font-bold text-lg">Skip</Text>
              </Pressable>
            )}
          </View>

          <View className="flex-1 px-6">
            {isWelcome ? (
              /* SCREEN 1: PURPLE WELCOME */
              <View className="flex-1 justify-center items-center">
                <View className="w-32 h-32 bg-white rounded-[32px] mb-8 shadow-2xl justify-center items-center">
                  {/* Logo Placeholder */}
                  <ShoppingBag size={60} color="#4F26D9" />
                </View>
                <Text className="text-white text-5xl font-bold tracking-tight">useMarket</Text>
                <Text className="text-secondary text-3xl font-bold mt-1">{item.subtitle}</Text>
                <View className="w-12 h-1.5 bg-white/20 rounded-full my-8" />
                <Text className="text-white text-center text-xl leading-8 opacity-90">
                  {item.description}
                </Text>
              </View>
            ) : (
              /* SCREEN 2-4: WHITE FEATURES */
              <View className="flex-1">
                {/* Illustration Placeholder */}
                <View className="h-60 w-full bg-slate-50 rounded-3xl mb-8 items-center justify-center overflow-hidden">
                   <View className="absolute w-full h-full opacity-10 bg-primary" />
                   <Package size={100} color="#4F26D9" opacity={0.2} />
                </View>

                <View className="items-center mb-8">
                  <Text className="text-2xl font-bold text-slate-900 text-center">{item.title}</Text>
                  <Text className="text-2xl font-bold text-primary text-center">{item.subtitle}</Text>
                  <Text className="text-muted text-center mt-3 text-base px-2">
                    {item.description}
                  </Text>
                </View>

                {/* Feature Cards */}
                <View className="space-y-3">
                  {item.features?.map((f: any, i: number) => (
                    <View key={i} className="flex-row items-center bg-white p-4 rounded-3xl border border-slate-100 shadow-sm">
                      <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-4 ${f.color}`}>
                        <f.icon size={24} color="#4F26D9" />
                      </View>
                      <View className="flex-1">
                        <Text className="font-bold text-slate-900 text-base">{f.title}</Text>
                        <Text className="text-slate-500 text-xs mt-1 leading-4">{f.desc}</Text>
                      </View>
                      <ChevronRight size={20} color="#4F26D9" />
                    </View>
                  ))}
                </View>
              </View>
            )}
          </View>
        </SafeAreaView>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-white">
      <FlatList
        ref={flatListRef}
        data={ONBOARDING_DATA}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={(e) => {
          const x = e.nativeEvent.contentOffset.x;
          setCurrentIndex(Math.round(x / width));
        }}
        keyExtractor={(item) => item.id}
      />
      
      {/* Footer: Pagination & Button */}
      <View className="absolute bottom-12 left-0 right-0 px-8 items-center">
        {/* Pagination Dots */}
        <View className="flex-row mb-8">
          {ONBOARDING_DATA.map((_, i) => (
            <View key={i} 
              className={`h-2 mx-1 rounded-full ${currentIndex === i ? 'w-8 bg-primary' : 'w-4 bg-slate-200'}`} 
              style={currentIndex === 0 ? { backgroundColor: currentIndex === i ? 'white' : 'rgba(255,255,255,0.3)' } : null}
            />
          ))}
        </View>

        {/* Action Button */}
        <Pressable 
          onPress={handleNext}
          className={`w-full h-16 rounded-2xl justify-center items-center shadow-lg ${
            currentIndex === 0 ? 'bg-transparent border-2 border-white/30' : 'bg-primary'
          }`}
        >
          <Text className="text-white font-bold text-xl">
            {ONBOARDING_DATA[currentIndex].buttonText}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}