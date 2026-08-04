import { useRouter } from 'expo-router';
import {
  ChevronRight
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Dimensions, FlatList, Image, Pressable, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const { width } = Dimensions.get('window');

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

  const handleNext = () => {
    if (currentIndex < ONBOARDING_DATA.length - 1) {
      flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
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
              /* SCREEN 1: PURPLE WELCOME */
              <View className="flex-1 justify-center items-center">
                <View className="rounded-[32px]  justify-center items-center">
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

                {/* Text - now sits directly under the image */}
                <View className="items-center mt-2">
                  <Text className="text-3xl font-bold text-slate-900 text-center">{item.title}</Text>
                  <Text className="text-2xl font-bold text-primary text-center">{item.subtitle}</Text>
                  <Text className="text-muted  text-center mt-3 text-base px-2">
                    {item.description}
                  </Text>
                </View>

                {/* Feature Cards */}
                {item.id !== '2' && (
                  <View className="space-y-3 mt-8">
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
                )}
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
        {/* Pagination Dots - moved further up, away from the button */}
        <View className="flex-row mb-16">
          {ONBOARDING_DATA.map((_, i) => (
            <View key={i}
              className={`h-2 mx-1 rounded-full ${currentIndex === i ? 'w-2 bg-primary' : 'w-2 bg-slate-200'}`}
              style={currentIndex === 0 ? { backgroundColor: currentIndex === i ? 'white' : 'rgba(255,255,255,0.3)' } : null}
            />
          ))}
        </View>

        {/* Action Button */}
        <Pressable
          onPress={handleNext}
          className={`w-full h-16 rounded-2xl justify-center items-center shadow-lg ${currentIndex === 0 ? 'bg-transparent border-2 border-white/30' : 'bg-primary'
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