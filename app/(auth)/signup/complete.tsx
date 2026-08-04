import { useRouter } from 'expo-router';
import { ArrowRight, Check, Clock } from 'lucide-react-native';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SUMMARY_ITEMS = [
  { label: "Account Created", status: "done" },
  { label: "Business Type Selected", status: "done" },
  { label: "Store Profile Completed", status: "done" },
  { label: "Business Verification", status: "pending" },
  { label: "Payout Account Set Up", status: "done" },
  { label: "Delivery & Operating Hours Set", status: "done" },
];

export default function SetupCompleteScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Success icon */}
        <View className="items-center pt-12 pb-6">
          <Image
            source={require('../../../assets/icons/complete.png')}
            className="w-28 h-28 mb-5"
            resizeMode="contain"
          />
          <Text className="text-xl font-bold text-slate-900">Setup Complete!</Text>
          <Text className="text-slate-500 text-center mt-2 leading-6 px-6">
            Your store is ready. We're finishing up a couple of checks in the background.
          </Text>
        </View>

        {/* Summary list */}
        <View className="border border-slate-100 rounded-2xl p-5 mb-6">
          {SUMMARY_ITEMS.map((item, index) => (
            <View
              key={index}
              className={`flex-row items-center justify-between ${index > 0 ? 'mt-4' : ''}`}
            >
              <View className="flex-row items-center flex-1 mr-3">
                {item.status === "done" ? (
                  <View className="w-5 h-5 bg-green-500 rounded-full items-center justify-center mr-3">
                    <Check size={12} color="white" strokeWidth={4} />
                  </View>
                ) : (
                  <View className="w-5 h-5 bg-amber-100 rounded-full items-center justify-center mr-3">
                    <Clock size={12} color="#d97706" strokeWidth={3} />
                  </View>
                )}
                <Text className="text-slate-700 text-sm font-medium flex-1">{item.label}</Text>
              </View>
              <Text
                className={`text-[11px] font-semibold ${item.status === "done" ? "text-green-600" : "text-amber-600"
                  }`}
              >
                {item.status === "done" ? "Done" : "We'll verify this"}
              </Text>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Footer CTA */}
      <View className="p-6 border-t border-slate-50">
        <Pressable
          className="bg-primary h-14 rounded-2xl flex-row justify-center items-center active:bg-primary/90"
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className="text-white font-bold text-base mr-1.5">Go to Dashboard</Text>
          <ArrowRight size={18} color="white" />
        </Pressable>
        <Text className="text-slate-400 text-[11px] text-center mt-4">
          You can start receiving orders now — we'll notify you once verification is done.
        </Text>
      </View>
    </SafeAreaView>
  );
}