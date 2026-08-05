import { useRouter } from 'expo-router';
import { ArrowLeft, RotateCw } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyOTPScreen() {
  const router = useRouter();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Back Button */}
      <View className="px-6 pt-4 pb-2 flex-row items-center">
        <Pressable
          onPress={() => router.back()}
          className="p-2 -ml-2 active:opacity-60"
        >
          <ArrowLeft size={24} color="#000" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Large Page Title & Subtitle */}
        <View className="mt-2 mb-4">
          <Text className="text-3xl font-bold text-slate-900">Verify OTP</Text>
          <Text className="text-slate-500 text-xs mt-2 leading-5">
            Enter the 6-digit verification code we sent to{"\n"}
            <Text className="font-bold text-primary">john.doe@greenbasket.com</Text>
          </Text>
        </View>

        {/* Top Graphic Illustration */}
        <View className="items-center justify-center my-4">
          <View className="w-48 h-40 items-center justify-center">
            <Image
              source={require('../../../assets/icons/verify-otp.png')}
              className="w-full h-full"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* Enter Code Label */}
        <Text className="font-bold text-slate-900 text-xs mb-3">Enter 6-digit code</Text>

        {/* 6 Code Input Boxes */}
        <View className="flex-row justify-between mb-4">
          {otp.map((digit, idx) => {
            const isActive = idx === 0;
            return (
              <View
                key={idx}
                className={
                  isActive
                    ? "w-12 h-16 rounded-2xl border-2 border-primary bg-white items-center justify-center shadow-sm"
                    : "w-12 h-16 rounded-2xl border border-slate-200 bg-white items-center justify-center"
                }
              >
                {isActive ? (
                  <View className="w-0.5 h-6 bg-primary" />
                ) : (
                  <Text className="text-xl font-bold text-slate-900">{digit}</Text>
                )}
              </View>
            );
          })}
        </View>

        {/* Expiration Timer */}
        <Text className="text-center text-slate-400 text-xs mb-6">
          Code expires in <Text className="text-primary font-bold">02:45</Text>
        </Text>

        {/* Resend Code Button */}
        <Pressable className="border border-slate-200 bg-white h-14 rounded-2xl flex-row justify-center items-center mb-8 active:bg-purple-50">
          <RotateCw size={18} color="#4F26D9" className="mr-2" />
          <Text className="text-primary font-bold text-sm mr-1">Resend Code</Text>
          <Text className="text-slate-400 text-xs font-medium">(00:25)</Text>
        </Pressable>

        {/* Verify Code Button */}
        <Pressable
          onPress={() => router.push('/(auth)/forgot-password/new-password' as any)}
          className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90 mb-12"
        >
          <Text className="text-white font-bold text-base">Verify Code</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}