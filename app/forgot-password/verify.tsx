import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function VerifyOTPScreen() {
  const router = useRouter();
  const [code, setCode] = useState(['2', '4', '6', '8', '1', '3']);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
        <Pressable 
          onPress={() => router.back()} 
          className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50"
        >
          <ArrowLeft size={20} color="#000" />
        </Pressable>

        <Text className="text-lg font-bold text-slate-900">Verify OTP</Text>

        <View className="w-10" />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Top Illustration */}
        <View className="items-center justify-center my-6">
          <View className="w-28 h-28 bg-purple-50 rounded-full items-center justify-center border border-purple-100">
            <Text className="text-5xl">✉️</Text>
          </View>
        </View>

        {/* Heading */}
        <View className="items-center mb-6">
          <Text className="text-2xl font-bold text-slate-900 text-center">Enter the verification code</Text>
          <Text className="text-slate-500 text-xs text-center mt-2 leading-5">
            We've sent a 6-digit code to{"\n"}
            <Text className="font-bold text-primary">john.doe@greenbasket.com</Text>
          </Text>
        </View>

        {/* 6 Code Input Boxes */}
        <View className="flex-row justify-between mb-4 px-2">
          {code.map((digit, idx) => (
            <View 
              key={idx}
              className={`w-12 h-14 rounded-2xl border-2 items-center justify-center bg-slate-50/50 ${
                idx === 5 ? 'border-primary bg-purple-50/20' : 'border-slate-200'
              }`}
            >
              <Text className="text-xl font-bold text-slate-900">{digit}</Text>
            </View>
          ))}
        </View>

        {/* Expiration Timer */}
        <Text className="text-center text-slate-400 text-xs mb-6">
          Code expires in <Text className="text-primary font-bold">02:45</Text>
        </Text>

        {/* Spam Callout */}
        <View className="bg-purple-50/60 border border-purple-100 p-4 rounded-2xl flex-row items-center mb-8">
          <ShieldCheck size={18} color="#4F26D9" className="mr-3" />
          <Text className="text-slate-600 text-xs flex-1 leading-4">
            If you didn't receive the code, please check your spam folder.
          </Text>
        </View>

        {/* Verify Button */}
        <Pressable 
          onPress={() => router.push('/(auth)/forgot-password/new-password' as any)}
          className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
        >
          <Text className="text-white font-bold text-base">Verify Code</Text>
        </Pressable>

        {/* Resend Link */}
        <View className="items-center mt-6 pb-12">
          <Text className="text-slate-500 text-xs">
            Didn't receive the code? <Text className="text-primary font-bold">Resend Code</Text> <Text className="text-slate-400">(00:25)</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}