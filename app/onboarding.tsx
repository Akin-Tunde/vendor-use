import { useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const ONBOARDING_DATA = [
  {
    id: '1',
    type: 'welcome',
    subtitle: 'Vendor',
    description: 'Manage your store.\nGrow your business.',
    buttonText: '',
    bg: 'bg-primary',
  },
  {
    id: '2',
    type: 'features',
    title: 'Welcome to useMarket',
    subtitle: 'Vendor',
    description: 'Everything you need to manage your store, \nreach more customers and \ngrow your business.',
    buttonText: 'Next',
    bg: 'bg-white',
    image: require('../assets/icons/onboarding-1.png'),
  },
  {
    id: '3',
    type: 'features',
    title: 'Manage Your Store',
    subtitle: 'All in One Place',
    description: 'Add products, track orders, manage inventory \nand view performance easily.',
    buttonText: 'Next',
    bg: 'bg-white',
    image: require('../assets/icons/onboarding-2.png'),
  },
  {
    id: '4',
    type: 'features',
    title: 'Grow Your Business',
    subtitle: 'Reach More Customers',
    description: 'Get discovered by thousands of customers \nin your area and grow every day.',
    buttonText: 'Get Started',
    bg: 'bg-white',
    image: require('../assets/icons/onboarding-3.png'),
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef<FlatList>(null);
  const router = useRouter();

  // Auto-advance from Step 1 (Welcome Screen) after 10 seconds
  useEffect(() => {
    if (currentIndex === 0) {
      const timer = setTimeout(() => {
        flatListRef.current?.scrollToIndex({ index: 1, animated: true });
      }, 5000); // 10 seconds
      return () => clearTimeout(timer);
    }
  }, [currentIndex]);

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1, animated: true });
    } else {
      router.replace('/(auth)/login');
    }
  };

  const renderItem = ({ item }: { item: any }) => {
    const isWelcome = item.type === 'welcome';

    return (
      <View style={{ width }} className={`flex-1 ${item.bg}`}>
        <SafeAreaView className="flex-1">
          {/* Header Area */}
          <View className="px-6 pt-6 flex-row justify-end items-center">
            {!isWelcome && (
              <Pressable onPress={() => router.replace('/(auth)/login')}>
                <Text className="text-primary font-bold text-lg">Skip</Text>
              </Pressable>
            )}
          </View>

          <View className="flex-1 px-2">
            {isWelcome ? (
              /* SCREEN 1: PURPLE WELCOME (Advances automatically in 10s) */
              <View className="flex-1 justify-center items-center">
                <View className="rounded-[32px] justify-center items-center">
                  <Image source={require('../assets/icons/logo-1.png')} className="w-64 h-64" />
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
                {/* Illustration - anchored to the top */}
                <View className="h-80 w-full rounded-3xl mt-2 items-center justify-center overflow-hidden">
                  <Image source={item.image} className="w-full h-full" resizeMode="contain" />
                </View>

                {/* Text - sits directly under the image */}
                <View className="items-center mt-2">
                  <Text className="text-3xl font-bold text-slate-900 text-center">{item.title}</Text>
                  <Text className="text-2xl font-bold text-primary text-center">{item.subtitle}</Text>
                  <Text className="text-muted text-center mt-3 text-base px-2">
                    {item.description}
                  </Text>
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

      {/* Footer: Pagination Dots & Next Button (Hidden on Step 1, visible on Steps 2-4) */}
      {currentIndex > 0 && (
        <View className="absolute bottom-12 left-0 right-0 px-8 items-center">
          {/* Pagination Dots */}
          <View className="flex-row mb-16">
            {ONBOARDING_DATA.map((_, i) => (
              <View
                key={i}
                className={`h-2 mx-1 rounded-full ${currentIndex === i ? 'w-2 bg-primary' : 'w-2 bg-slate-200'
                  }`}
              />
            ))}
          </View>

          {/* Action Button */}
          <Pressable
            onPress={handleNext}
            className="w-full h-16 rounded-2xl justify-center items-center shadow-lg bg-primary active:bg-primary/90"
          >
            <Text className="text-white font-bold text-xl">
              {ONBOARDING_DATA[currentIndex].buttonText}
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}