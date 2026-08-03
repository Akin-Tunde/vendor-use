import { useRouter } from 'expo-router';
import { Check, ChevronRight, ShieldCheck } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PasswordResetSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" contentContainerClassName="flex-1 justify-center" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center py-6">
          <View className="w-32 h-32 bg-emerald-50 rounded-full items-center justify-center border border-emerald-100 shadow-sm relative">
            <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center shadow-lg shadow-green-500/30">
              <Check size={40} color="white" strokeWidth={4} />
            </View>
          </View>

          <Text className="text-2xl font-bold text-slate-900 text-center mt-8">Password Reset Successfully!</Text>
          <Text className="text-slate-500 text-center text-xs mt-2 px-4 leading-5">
            Your password has been reset successfully. You can now login with your new password.
          </Text>
        </View>
      </ScrollView>

      <View className="px-6 pb-6">
        <Pressable
          onPress={() => router.replace('/(auth)/login' as any)}
          className="bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
        >
          <Text className="text-white font-bold text-base mr-2">Back to Login</Text>
          <ChevronRight size={18} color="white" />
        </Pressable>

        <Pressable
          onPress={() => router.replace('/(tabs)' as any)}
          className="border-2 border-primary/20 bg-white h-14 rounded-2xl flex-row justify-center items-center active:bg-purple-50 mt-3"
        >
          <ShieldCheck size={18} color="#4F26D9" className="mr-2" />
          <Text className="text-primary font-bold text-base">Go to Dashboard</Text>
        </Pressable>

        <View className="items-center mt-6">
          <Text className="text-slate-500 text-xs">
            Need help? <Text className="text-primary font-bold">Contact Support</Text>
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
}
