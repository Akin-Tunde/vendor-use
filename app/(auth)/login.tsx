import { useRouter } from 'expo-router';
import { ArrowLeft, Eye, EyeOff, Globe, Lock, Mail } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function LoginScreen() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View className="flex-row justify-between items-center pt-4">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50"
          >
            <ArrowLeft size={20} color="#000" />
          </Pressable>

          <Pressable className="flex-row items-center space-x-1 border border-slate-200 px-3 py-1.5 rounded-full bg-slate-50">
            <Text className="font-semibold text-slate-900 text-xs mr-1">English</Text>
            <Globe size={14} color="#000" />
          </Pressable>
        </View>

        {/* Branding & Illustration */}
        <View className="flex-row justify-between items-center ">
          <View className="items-center">
            <View className="w-16 h-16 bg-white rounded-2xl items-center justify-center shadow-sm">
              <Image source={require('../../assets/icons/logo-1.png')} className="w-14 h-14" resizeMode="contain" />
            </View>
            <Text className="text-2xl font-bold text-slate-900 mt-2">useMarket</Text>
            <Text className="text-secondary text-lg font-bold">Vendor</Text>
          </View>
          <View className="w-40 h-40 items-center justify-center">
            <Image source={require('../../assets/icons/login-1.png')} className="w-full h-full" resizeMode="contain" />
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

          {/* Password with Eye Toggle & Connected Link */}
          <View>
            <Text className="font-semibold text-slate-700 mb-2">Password</Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <Lock size={20} color="#4F26D9" className="mr-3" />
              <TextInput
                placeholder="Enter your password"
                secureTextEntry={!showPassword}
                className="flex-1 text-slate-900 text-base"
              />
              <Pressable onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
              </Pressable>
            </View>

            <Pressable
              className="self-end mt-3"
              onPress={() => router.push('/(auth)/forgot-password' as any)}
            >
              <Text className="text-primary font-bold">Forgot Password?</Text>
            </Pressable>
          </View>
        </View>

        <Pressable
          className="bg-primary h-14 rounded-2xl justify-center items-center mt-8 shadow-lg shadow-primary/30 active:bg-primary/90"
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className="text-white font-bold text-lg">Log In</Text>
        </Pressable>

        <View className="flex-row items-center my-8">
          <View className="flex-1 h-[1px] bg-slate-100" />
          <Text className="mx-4 text-slate-400 font-bold text-xs uppercase">or continue with</Text>
          <View className="flex-1 h-[1px] bg-slate-100" />
        </View>

        <View className="flex-row space-x-3">
          <Pressable className="flex-1 flex-row items-center justify-center border border-slate-200 h-14 rounded-2xl">
            <Image source={require('../../assets/icons/google.jpg')} className="w-6 h-6 mr-2" resizeMode="contain" />
            <Text className="font-bold text-slate-700">Google</Text>
          </Pressable>
          <Pressable className="flex-1 flex-row items-center justify-center border border-slate-200 h-14 rounded-2xl">
            <Image source={require('../../assets/icons/facebook.jpg')} className="w-6 h-6 mr-2" resizeMode="contain" />
            <Text className="font-bold text-slate-700">Facebook</Text>
          </Pressable>
        </View>

        <View className="items-center mt-8 pb-10">
          <Text className="text-slate-500">
            Don't have an account? <Text className="text-primary font-bold" onPress={() => router.push('/signup' as any)}>Sign Up</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}