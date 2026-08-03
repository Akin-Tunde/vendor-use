import React, { useState } from 'react';
import { View, Text,  ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ShieldCheck, Lock, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const METHODS = [
  { id: 'paystack', name: 'Paystack', desc: 'Pay securely with Paystack', badge: 'VISA / Mastercard / Verve' },
  { id: 'flutterwave', name: 'Flutterwave', desc: 'Pay securely with Flutterwave', badge: 'VISA / Mastercard / Verve' },
  { id: 'card', name: 'Card Payment', desc: 'Debit or Credit card', badge: 'VISA / Mastercard / Verve' },
  { id: 'transfer', name: 'Bank Transfer', desc: 'Transfer directly from your bank', tag: '0 Fee' },
  { id: 'ussd', name: 'USSD', desc: 'Pay using USSD code', tag: '0 Fee' },
];

export default function ChoosePaymentMethodScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('paystack');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Choose Payment Method</Text>
            <Text className="text-slate-400 text-xs">Select how you want to add money</Text>
          </View>
        </View>

        <View className="bg-green-100 px-3 py-1.5 rounded-full flex-row items-center">
          <ShieldCheck size={14} color="#22c55e" className="mr-1" />
          <Text className="text-green-800 font-bold text-[10px]">Secure Payment</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Adding Amount Banner */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30 flex-row justify-between items-center">
          <View>
            <Text className="text-white/80 text-xs">You are adding</Text>
            <Text className="text-white text-3xl font-bold mt-1">₦10,000.00</Text>
            <Text className="text-white/70 text-xs mt-1">To Wallet Balance</Text>
          </View>
          <View className="w-14 h-14 bg-white/10 rounded-2xl items-center justify-center border border-white/20">
            <Text className="text-2xl">💳</Text>
          </View>
        </View>

        {/* Recommended Payment Methods */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Recommended</Text>

          {METHODS.map((m) => {
            const isSelected = selectedMethod === m.id;
            return (
              <Pressable
                key={m.id}
                onPress={() => setSelectedMethod(m.id)}
                className={`p-4 rounded-2xl border-2 flex-row items-center justify-between ${
                  isSelected ? 'border-primary bg-purple-50/30' : 'border-slate-100 bg-slate-50/50'
                }`}
              >
                <View className="flex-row items-center flex-1 mr-2">
                  <View className="w-10 h-10 bg-white border border-slate-200 rounded-xl items-center justify-center mr-3">
                    <Text className="text-base">💳</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-slate-900 text-sm">{m.name}</Text>
                    <Text className="text-slate-400 text-[10px]">{m.desc}</Text>
                  </View>
                </View>

                {m.tag ? (
                  <View className="bg-green-100 px-2 py-0.5 rounded mr-2">
                    <Text className="text-green-700 font-bold text-[8px]">{m.tag}</Text>
                  </View>
                ) : null}

                <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${isSelected ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                  {isSelected && <Check size={10} color="white" strokeWidth={3} />}
                </View>
              </Pressable>
            );
          })}
        </View>

        {/* Payment Summary */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3 mb-12">
          <Text className="font-bold text-slate-900 text-sm mb-1">Payment Summary</Text>
          <View className="flex-row justify-between"><Text className="text-slate-500 text-xs">Amount</Text><Text className="font-bold text-slate-900 text-xs">₦10,000.00</Text></View>
          <View className="flex-row justify-between"><Text className="text-slate-500 text-xs">Processing Fee</Text><Text className="font-bold text-green-600 text-xs">₦0.00</Text></View>
          <View className="flex-row justify-between pt-2 border-t border-slate-100">
            <Text className="font-bold text-slate-900 text-base">Total</Text>
            <Text className="font-bold text-slate-900 text-base">₦10,000.00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.push('/finance/add-money-success')}
          className="bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
        >
          <Lock size={18} color="white" className="mr-2" />
          <Text className="text-white font-bold text-lg">Proceed to Payment</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}