import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { Check, ShieldCheck, ChevronRight } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function PasswordResetSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6 pt-10" showsVerticalScrollIndicator={false}>
        {/* Celebration Confetti Icon */}
        <View className="items-center justify-center py-6">
          <View className="w-28 h-28 bg-green-500 rounded-full items-center justify-center shadow-lg shadow-green-500/30">
            <Check size={50} color="white" strokeWidth={4} />
          </View>

          <Text className="text-2xl font-bold text-slate-900 text-center mt-8">Password Reset Successfully!</Text>
          <Text className="text-slate-500 text-center text-xs mt-2 px-4 leading-5">
            Your password has been reset successfully. You can now login with your new password.
          </Text>
        </View>

        {/* Security Card */}
        <View className="mx-2 my-8 bg-purple-50/60 border border-purple-100 p-5 rounded-[32px] flex-row items-center shadow-sm">
          <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
            <ShieldCheck size={20} color="#4F26D9" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-slate-900 text-xs">Your account is secure</Text>
            <Text className="text-slate-500 text-[10px] mt-0.5 leading-3.5">
              We recommend using a strong password and keeping it private.
            </Text>
          </View>
        </View>

        {/* Back to Login Button */}
        <Pressable 
          onPress={() => router.replace('/(auth)/login' as any)}
          className="bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90 mt-4"
        >
          <Text className="text-white font-bold text-base mr-2">Back to Login</Text>
          <ChevronRight size={18} color="white" />
        </Pressable>

        {/* Help Link */}
        <View className="items-center mt-8 pb-12">
          <Text className="text-slate-500 text-xs">
            Need help? <Text className="text-primary font-bold">Contact Support</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}