import React from 'react';
import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { Mail, Lock, Eye, ArrowLeft, Globe } from 'lucide-react-native';

export default function LoginScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center py-4">
          <Pressable onPress={() => router.back()} className="p-2 border border-slate-100 rounded-full">
            <ArrowLeft size={20} color="#000" />
          </Pressable>
          <Pressable className="flex-row items-center space-x-1">
            <Text className="font-semibold text-slate-900">English</Text>
            <Globe size={14} color="#000" />
          </Pressable>
        </View>

        {/* Branding & Illustration */}
        <View className="flex-row justify-between items-center mt-6">
          <View>
             <View className="w-12 h-12 bg-primary/10 rounded-xl items-center justify-center mb-2">
                <View className="w-6 h-6 bg-primary rounded-md" />
             </View>
             <Text className="text-3xl font-bold text-slate-900">useMarket</Text>
             <Text className="text-secondary text-xl font-bold">Vendor</Text>
          </View>
          <View className="w-40 h-40 bg-slate-50 rounded-full items-center justify-center overflow-hidden">
             {/* Replace with your Illustration */}
             <View className="w-32 h-32 bg-primary/20 rounded-full" />
          </View>
        </View>

        <View className="mt-8">
          <Text className="text-3xl font-bold text-slate-900">Welcome Back!</Text>
          <Text className="text-slate-500 mt-2">Login to your useMarket Vendor account and manage your business.</Text>
        </View>

        {/* Form */}
        <View className="mt-8 space-y-5">
          <View>
            <Text className="font-semibold text-slate-700 mb-2">Email or Phone Number</Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <Mail size={20} color="#4F26D9" className="mr-3" />
              <TextInput 
                placeholder="Enter your email or phone number" 
                className="flex-1 text-slate-900 text-base"
              />
            </View>
          </View>

          <View>
            <Text className="font-semibold text-slate-700 mb-2">Password</Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <Lock size={20} color="#4F26D9" className="mr-3" />
              <TextInput 
                placeholder="Enter your password" 
                secureTextEntry
                className="flex-1 text-slate-900 text-base"
              />
              <Eye size={20} color="#64748b" />
            </View>
            <Pressable className="self-end mt-3">
              <Text className="text-primary font-bold">Forgot Password?</Text>
            </Pressable>
          </View>
        </View>

        <Pressable 
          className="bg-primary h-14 rounded-2xl justify-center items-center mt-8 shadow-lg shadow-primary/30"
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className="text-white font-bold text-lg">Log In</Text>
        </Pressable>

        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-slate-100" />
          <Text className="mx-4 text-slate-400 font-bold text-xs uppercase">or continue with</Text>
          <View className="flex-1 h-[1px] bg-slate-100" />
        </View>

        {/* Social Logins */}
        <View className="flex-row space-x-3">
          <Pressable className="flex-1 flex-row items-center justify-center border border-slate-200 h-14 rounded-2xl">
            <View className="w-6 h-6 bg-red-500 rounded-full mr-2" />
            <Text className="font-bold text-slate-700">Google</Text>
          </Pressable>
          <Pressable className="flex-1 flex-row items-center justify-center border border-slate-200 h-14 rounded-2xl">
            <View className="w-6 h-6 bg-blue-600 rounded-full mr-2" />
            <Text className="font-bold text-slate-700">Facebook</Text>
          </Pressable>
        </View>

        <Pressable className="mt-4 border border-primary h-14 rounded-2xl flex-row items-center justify-center">
          <Globe size={18} color="#4F26D9" className="mr-2" />
          <Text className="text-primary font-bold">Continue as Guest</Text>
        </Pressable>

        <View className="items-center mt-8 pb-10">
          <Text className="text-slate-500">
            Don't have an account? <Text className="text-primary font-bold" onPress={() => router.push('/signup')}>Sign Up</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}