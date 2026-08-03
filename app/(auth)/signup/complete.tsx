import { useRouter } from 'expo-router';
import { ArrowLeft, ArrowRight, Check, CheckCircle2, Store } from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, Text, View, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SUMMARY_ITEMS = [
  "Account Created",
  "Business Type Selected",
  "Store Profile Completed",
  "Business Verified",
  "Payout Account Set Up",
  "Delivery & Operating Hours Set"
];

export default function SetupCompleteScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-6 ">
        <Pressable onPress={() => router.back()} className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50 active:border-purple-200">
          <ArrowLeft size={20} color="#000" />
        </Pressable>
        <Text className="flex-1 text-center text-primary font-bold text-base">Setup Complete!</Text>
        <View className="w-10" />
      </View>

      <View className="flex-row items-center justify-center px-6 mt-4 mb-8">
        {[1, 2, 3, 4, 5, 6].map((step, index) => (
          <React.Fragment key={step}>
            <View className="w-7 h-7 rounded-full items-center justify-center bg-primary">
              <CheckCircle2 size={16} color="white" />
            </View>
            {index < 5 && <View className="flex-1 h-[2.5px] mx-0.5 bg-primary" />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="items-center justify-center py-6">
          <View className="relative">
            <View className="w-48 h-48 rounded-full items-center justify-center">
             <Image source={require('../../../assets/icons/complete.png')} className="w-full h-full" />
                    </View>        
          </View>
          <Text className="text-slate-500 text-center mt-3 leading-6 px-4">Your store has been set up successfully. You're now ready to receive orders.</Text>
        </View>

        <View className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-6 mb-8">
          <Text className="font-bold text-slate-900 mb-4">Setup Summary</Text>
          <View className="space-y-3">
            {SUMMARY_ITEMS.map((item, index) => (
              <View key={index} className="flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <View className="w-5 h-5 bg-green-500 rounded-full items-center justify-center mr-3">
                    <Check size={12} color="white" strokeWidth={4} />
                  </View>
                  <Text className="text-slate-700 text-sm font-medium">{item}</Text>
                </View>
                <View className="bg-green-100 px-2 py-0.5 rounded-md"><Text className="text-green-700 text-[10px] font-bold">Completed</Text></View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View className="p-6 bg-white border-t border-slate-50">
        <View className="flex-row space-x-5">

          <Pressable className="flex-1 bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90" onPress={() => router.replace('/(tabs)')}>
            <Text className="text-white font-bold text-base mr-1.5">Dashboard</Text>
            <ArrowRight size={18} color="white" />
          </Pressable>
        </View>

        <View className="flex-row items-center justify-center mt-6">
          <CheckCircle2 size={14} color="#4CD964" />
          <Text className="text-slate-400 text-[10px] ml-1.5 font-medium">Your store is now live. Customers can find you.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}