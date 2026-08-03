import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Headphones, MessageSquare, ShoppingBag, 
  Store, Wallet, Bike, ShieldCheck, ChevronRight, HelpCircle 
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HelpSupportScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <Pressable 
          onPress={() => router.back()} 
          className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50"
        >
          <ArrowLeft size={20} color="#000" />
        </Pressable>

        <Text className="text-xl font-bold text-slate-900">Help & Support</Text>

        <View className="w-10 h-10 bg-purple-50 rounded-2xl items-center justify-center border border-purple-100">
          <Headphones size={20} color="#4F26D9" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Support Banner Box */}
        <View className="mx-6 mt-4 bg-purple-50/60 border border-purple-100 p-5 rounded-[32px] flex-row items-center justify-between shadow-sm">
          <View className="flex-1 pr-3">
            <Text className="text-lg font-bold text-slate-900">We're here to help!</Text>
            <Text className="text-slate-500 text-xs mt-1 leading-4">
              Get support for your store, orders and account.
            </Text>
            <Pressable className="bg-primary px-4 py-2 rounded-xl self-start mt-3 shadow-md shadow-primary/30">
              <Text className="text-white font-bold text-xs">💬 Chat with Us</Text>
            </Pressable>
            <Text className="text-green-600 font-bold text-[9px] mt-1.5">We usually reply in a few minutes</Text>
          </View>
          
          <View className="w-20 h-20 bg-primary/10 rounded-3xl items-center justify-center">
            <Text className="text-4xl">👨‍💻</Text>
          </View>
        </View>

        {/* Popular Topics Section */}
        <View className="px-6 mt-6">
          <Text className="font-bold text-slate-900 text-base mb-3">Popular Topics</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm space-y-1">
            <TopicRow icon={ShoppingBag} label="Managing Orders" sub="Learn about orders and delivery" bg="bg-green-50" iconColor="#22c55e" />
            <TopicRow icon={Store} label="Store Management" sub="Update store info, products and more" bg="bg-orange-50" iconColor="#f97316" />
            <TopicRow icon={Wallet} label="Payments & Payouts" sub="Wallet, payouts and transactions" bg="bg-blue-50" iconColor="#3b82f6" />
            <TopicRow icon={Bike} label="Delivery & Fees" sub="Delivery settings and fee information" bg="bg-purple-50" iconColor="#4F26D9" />
            <TopicRow icon={ShieldCheck} label="Account & Verification" sub="Verify your account and documents" bg="bg-pink-50" iconColor="#ec4899" />
          </View>
        </View>

        {/* More Support Options Grid */}
        <View className="px-6 mt-6 mb-12">
          <Text className="font-bold text-slate-900 text-base mb-3">More Support Options</Text>
          <View className="flex-row space-x-3 mb-3">
            <Pressable className="flex-1 bg-green-50/60 border border-green-200/80 p-4 rounded-3xl flex-row items-center">
              <Text className="text-2xl mr-3">💬</Text>
              <View className="flex-1">
                <Text className="font-bold text-green-900 text-xs">WhatsApp Support</Text>
                <Text className="text-green-700/80 text-[9px] mt-0.5">Chat with us on WhatsApp</Text>
              </View>
            </Pressable>

            <Pressable className="flex-1 bg-blue-50/60 border border-blue-200/80 p-4 rounded-3xl flex-row items-center">
              <Text className="text-2xl mr-3">✉️</Text>
              <View className="flex-1">
                <Text className="font-bold text-blue-900 text-xs">Email Support</Text>
                <Text className="text-blue-700/80 text-[9px] mt-0.5">Send us an email</Text>
              </View>
            </Pressable>
          </View>

          <Pressable className="bg-amber-50/60 border border-amber-200/80 p-4 rounded-3xl flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-9 h-9 bg-amber-500 rounded-2xl items-center justify-center mr-3">
                <HelpCircle size={18} color="white" />
              </View>
              <View>
                <Text className="font-bold text-amber-900 text-xs">Still need help?</Text>
                <Text className="text-amber-800/80 text-[9px] mt-0.5">Contact our support team 24/7</Text>
              </View>
            </View>
            <ChevronRight size={16} color="#78350f" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TopicRow({ icon: Icon, label, sub, bg, iconColor }: any) {
  return (
    <Pressable className="flex-row items-center justify-between py-3 border-b border-slate-50 active:bg-purple-50/20 rounded-xl px-2">
      <View className="flex-row items-center flex-1 mr-2">
        <View className={`w-10 h-10 ${bg} rounded-2xl items-center justify-center mr-3`}>
          <Icon size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="font-bold text-slate-900 text-xs">{label}</Text>
          <Text className="text-slate-400 text-[10px] mt-0.5">{sub}</Text>
        </View>
      </View>
      <ChevronRight size={16} color="#cbd5e1" />
    </Pressable>
  );
}