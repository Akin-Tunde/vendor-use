import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, Eye, Lock, Mail, Store, User } from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

export default function SignupStep1() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header: Back Arrow beside Step Numbers */}
      <View className="flex-row items-center px-6 pt-4 ">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-2xl items-center justify-center mr-3"
        >
          <ArrowLeft size={20} color="#4F26D9" />
        </Pressable>

        {/* Progress Indicator */}
        <View className="flex-1 flex-row items-center justify-between">
          {[1, 2, 3, 4, 5, 6].map((step) => (
            <React.Fragment key={step}>
              <View className={`w-7 h-7 rounded-full items-center justify-center ${step === 1 ? 'bg-primary' : 'border border-slate-200 bg-white'}`}>
                <Text className={`text-xs ${step === 1 ? 'text-white font-bold' : 'text-slate-400'}`}>{step}</Text>
              </View>
              {step < 6 && <View className="flex-1 h-[2px] bg-slate-100 mx-0.5" />}
            </React.Fragment>
          ))}
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        <View className="flex-row items-center">
          <View className="flex-1 mr-4">
            <Text className="text-3xl font-bold text-slate-900">Create Your Vendor Account</Text>
            <Text className="text-slate-500 mt-2">Tell us a few details about your business to get started.</Text>
          </View>
          <Image source={require('../../../assets/icons/onboarding-1.png')} className="w-24 h-24" resizeMode="contain" />
        </View>

        <View className="mt-8 space-y-5">
          {/* Input Groups */}
          <InputGroup label="Full Name" placeholder="Enter your full name" icon={User} />
          <InputGroup label="Business Name" placeholder="Enter your business name" icon={Store} />
          <InputGroup label="Email Address" placeholder="Enter your email address" icon={Mail} />

          <View>
            <Text className="font-semibold text-slate-700 mb-2">Phone Number</Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl h-14 bg-slate-50/50">
              <Pressable className="flex-row items-center px-4 border-r border-slate-200">
                <Text className="text-slate-900 font-bold">+234</Text>
              </Pressable>
              <TextInput placeholder="Enter your phone number" className="flex-1 px-4 text-base text-slate-900" keyboardType="phone-pad" />
            </View>
          </View>

          <InputGroup label="Password" placeholder="Create a password" icon={Lock} isPassword />
          <InputGroup label="Confirm Password" placeholder="Confirm your password" icon={Lock} isPassword />
        </View>

        <Pressable className="flex-row items-center mt-6">
          <View className="w-5 h-5 rounded bg-primary items-center justify-center mr-3">
            <CheckCircle2 size={14} color="white" />
          </View>
          <Text className="text-slate-600 flex-1 text-sm">
            I agree to the <Text className="text-primary font-bold">Terms of Service</Text> and <Text className="text-primary font-bold">Privacy Policy</Text>
          </Text>
        </Pressable>

        <Pressable
          className="bg-primary h-16 rounded-2xl justify-center items-center mt-8 shadow-lg shadow-primary/30"
          onPress={() => router.push('/(auth)/signup/step2' as any)}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </Pressable>

        <View className="flex-row items-center my-6">
          <View className="flex-1 h-[1px] bg-slate-100" />
          <Text className="mx-4 text-slate-400 font-bold text-xs uppercase">or</Text>
          <View className="flex-1 h-[1px] bg-slate-100" />
        </View>

        <Pressable className="flex-row items-center justify-center border border-slate-200 h-14 rounded-2xl mb-6">
          <Image source={require('../../../assets/icons/google.jpg')} className="w-6 h-6 mr-3" resizeMode="contain" />
          <Text className="font-bold text-slate-700">Continue with Google</Text>
        </Pressable>

        <View className="items-center pb-12">
          <Text className="text-slate-500">
            Already have an account? <Text className="text-primary font-bold" onPress={() => router.push('/(auth)/login' as any)}>Log In</Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Reusable Input Component
function InputGroup({ label, placeholder, icon: Icon, isPassword = false }: any) {
  return (
    <View>
      <Text className="font-semibold text-slate-700 mb-2">{label}</Text>
      <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
        <View style={{ marginRight: 12 }}>
          <Icon size={20} color="#4F26D9" />
        </View>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={isPassword}
          className="flex-1 text-slate-900 text-base"
        />
        {isPassword && <Eye size={20} color="#64748b" />}
      </View>
    </View>
  );
}