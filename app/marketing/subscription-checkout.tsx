import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Lock, ShieldCheck } from 'lucide-react-native';

export default function SubscriptionCheckoutScreen() {
  const router = useRouter();
  const [method, setMethod] = useState('wallet');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <Text className="text-xl font-bold text-slate-900">Checkout</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Selected Plan Summary Box */}
        <Text className="font-bold text-slate-900 text-sm mb-2">Selected Plan</Text>
        <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-start mb-2">
            <Text className="font-bold text-slate-900 text-lg">Pro Plan</Text>
            <View className="bg-primary px-3 py-1 rounded-full"><Text className="text-white font-bold text-[9px]">Most Popular</Text></View>
          </View>
          <Text className="text-2xl font-bold text-primary">₦19,999 <Text className="text-slate-400 text-xs font-normal">/month</Text></Text>
          <Text className="text-slate-400 text-[10px] mt-1">Billed monthly. Cancel anytime.</Text>
        </View>

        {/* Payment Method */}
        <Text className="font-bold text-slate-900 text-sm mb-2">Payment Method</Text>
        <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3 mb-6">
          <PayOption id="wallet" label="Wallet Balance" sub="₦52,500.00" selected={method === 'wallet'} onSelect={() => setMethod('wallet')} emoji="👛" />
          <PayOption id="card" label="Paystack (Card)" sub="Visa, Mastercard, Verve" selected={method === 'card'} onSelect={() => setMethod('card')} emoji="💳" />
          <PayOption id="bank" label="Bank Transfer" selected={method === 'bank'} onSelect={() => setMethod('bank')} emoji="🏦" />
        </View>

        {/* Order Breakdown */}
        <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3 mb-12">
          <Text className="font-bold text-slate-900 text-sm mb-1">Order Summary</Text>
          <View className="flex-row justify-between"><Text className="text-slate-500 text-xs">Pro Plan (Monthly)</Text><Text className="font-bold text-slate-900 text-xs">₦19,999.00</Text></View>
          <View className="flex-row justify-between"><Text className="text-slate-500 text-xs">VAT (7.5%)</Text><Text className="font-bold text-slate-900 text-xs">₦1,499.93</Text></View>
          <View className="flex-row justify-between pt-2 border-t border-slate-100">
            <Text className="font-bold text-slate-900 text-base">Total</Text>
            <Text className="font-bold text-primary text-base">₦21,498.93</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.replace('/marketing')}
          className="bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
        >
          <Lock size={18} color="white" className="mr-2" />
          <Text className="text-white font-bold text-lg">Pay ₦21,498.93</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function PayOption({ id, label, sub, selected, onSelect, emoji }: any) {
  return (
    <Pressable onPress={onSelect} className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${selected ? 'border-primary bg-purple-50/30' : 'border-slate-100 bg-slate-50/50'}`}>
      <View className="flex-row items-center flex-1">
        <Text className="text-xl mr-3">{emoji}</Text>
        <View>
          <Text className="font-bold text-slate-900 text-xs">{label}</Text>
          {sub && <Text className="text-slate-400 text-[10px]">{sub}</Text>}
        </View>
      </View>
      <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${selected ? 'border-primary bg-primary' : 'border-slate-300'}`}>
        {selected && <Check size={10} color="white" strokeWidth={3} />}
      </View>
    </Pressable>
  );
}