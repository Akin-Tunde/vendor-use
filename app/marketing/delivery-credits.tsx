import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, HelpCircle, Plus, ChevronRight } from 'lucide-react-native';

export default function DeliveryCreditsScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Delivery Credits</Text>
            <Text className="text-slate-400 text-xs">Manage your store delivery credit balance</Text>
          </View>
        </View>
        <Pressable className="p-1"><HelpCircle size={22} color="#64748b" /></Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Current Balance Card */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="text-white/80 text-xs font-medium">Current Balance</Text>
            <View className="bg-amber-400/20 border border-amber-400/40 px-2.5 py-0.5 rounded-full">
              <Text className="text-amber-300 font-bold text-[10px]">Low Balance</Text>
            </View>
          </View>
          <Text className="text-white text-3xl font-bold mt-1">₦15,750.00</Text>
          <Text className="text-white/70 text-[10px] mt-2">This credit is used for delivery fees on orders from your store.</Text>
        </View>

        {/* Usage Overview */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-900 text-sm">Usage Overview</Text>
            <Text className="text-slate-400 text-xs font-medium">This Month v</Text>
          </View>

          <View className="flex-row justify-between">
            <View><Text className="text-slate-400 text-[10px]">Used</Text><Text className="font-bold text-slate-900 text-sm">₦24,300.00</Text></View>
            <View className="items-end"><Text className="text-slate-400 text-[10px]">Remaining</Text><Text className="font-bold text-primary text-sm">₦15,750.00</Text></View>
          </View>

          <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden mt-1">
            <View className="h-full bg-primary rounded-full" style={{ width: '40%' }} />
          </View>
          <Text className="text-slate-400 text-[10px] text-right">Total Credit: ₦40,050.00</Text>
        </View>

        {/* Recent Transactions List */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-12 space-y-3">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-900 text-sm">Recent Transactions</Text>
            <Text className="text-primary font-bold text-xs">See All &gt;</Text>
          </View>

          <View className="flex-row justify-between items-center py-2 border-b border-slate-50">
            <View><Text className="font-bold text-slate-900 text-xs">Order Delivery</Text><Text className="text-slate-400 text-[10px]">31 May, 2025 • #ODR-98271</Text></View>
            <Text className="font-bold text-red-500 text-xs">-₦2,450.00</Text>
          </View>
          <View className="flex-row justify-between items-center py-2 border-b border-slate-50">
            <View><Text className="font-bold text-slate-900 text-xs">Credit Purchase</Text><Text className="text-slate-400 text-[10px]">28 May, 2025 • #CRD-33421</Text></View>
            <Text className="font-bold text-green-600 text-xs">+₦20,000.00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.push('/marketing/buy-credits')}
          className="bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
        >
          <Plus size={20} color="white" className="mr-2" />
          <Text className="text-white font-bold text-lg">Buy Credits</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}