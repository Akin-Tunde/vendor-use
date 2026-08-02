import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Lock, Plus } from 'lucide-react-native';

const PACKAGES = [
  { amount: '5,000', get: '5,250', bonus: '250' },
  { amount: '10,000', get: '10,600', bonus: '600', selected: true },
  { amount: '20,000', get: '21,500', bonus: '1,500' },
  { amount: '50,000', get: '54,000', bonus: '4,000' },
];

export default function BuyCreditsScreen() {
  const router = useRouter();
  const [selectedPkg, setSelectedPkg] = useState('10,000');
  const [payMethod, setPayMethod] = useState('wallet');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <Text className="text-xl font-bold text-slate-900">Buy Credits</Text>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="font-bold text-slate-900 text-sm mb-3">Select Credit Package</Text>

        {/* Packages Grid */}
        <View className="flex-row flex-wrap justify-between gap-y-3 mb-6">
          {PACKAGES.map((pkg) => {
            const isSelected = selectedPkg === pkg.amount;
            return (
              <Pressable
                key={pkg.amount}
                onPress={() => setSelectedPkg(pkg.amount)}
                className={`w-[48%] p-4 rounded-3xl border-2 ${
                  isSelected ? 'border-primary bg-purple-50/40' : 'border-slate-100 bg-white'
                }`}
              >
                <View className="flex-row justify-between items-center">
                  <Text className="font-bold text-slate-900 text-base">₦{pkg.amount}</Text>
                  {isSelected && (
                    <View className="w-5 h-5 rounded-full bg-primary items-center justify-center">
                      <Check size={12} color="white" strokeWidth={3} />
                    </View>
                  )}
                </View>
                <Text className="text-slate-500 text-xs mt-1">Get ₦{pkg.get}</Text>
                <Text className="text-green-600 font-bold text-[10px] mt-0.5">Bonus ₦{pkg.bonus}</Text>
              </Pressable>
            );
          })}
        </View>

        {/* Payment Method with Top Up Connection */}
        <Text className="font-bold text-slate-900 text-sm mb-3">Payment Method</Text>
        <View className="bg-white border border-slate-100 p-4 rounded-3xl mb-6 space-y-3 shadow-sm">
          {/* Wallet Balance Option */}
          <Pressable 
            onPress={() => setPayMethod('wallet')} 
            className={`p-3.5 rounded-2xl border-2 flex-row items-center justify-between ${
              payMethod === 'wallet' ? 'border-primary bg-purple-50/30' : 'border-slate-100 bg-slate-50/50'
            }`}
          >
            <View className="flex-row items-center flex-1">
              <Text className="text-2xl mr-3">👛</Text>
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="font-bold text-slate-900 text-xs mr-2">Wallet Balance</Text>
                  <Pressable 
                    onPress={() => router.push('/finance/add-money')}
                    className="bg-primary/10 px-2 py-0.5 rounded-full flex-row items-center"
                  >
                    <Plus size={10} color="#4F26D9" className="mr-0.5" />
                    <Text className="text-primary font-bold text-[9px]">Top Up</Text>
                  </Pressable>
                </View>
                <Text className="text-slate-500 text-[10px]">Available: ₦52,500.00</Text>
              </View>
            </View>
            <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${payMethod === 'wallet' ? 'border-primary bg-primary' : 'border-slate-300'}`}>
              {payMethod === 'wallet' && <Check size={10} color="white" strokeWidth={3} />}
            </View>
          </Pressable>

          {/* Paystack Card Option */}
          <Pressable 
            onPress={() => setPayMethod('card')} 
            className={`p-3.5 rounded-2xl border-2 flex-row items-center justify-between ${
              payMethod === 'card' ? 'border-primary bg-purple-50/30' : 'border-slate-100 bg-slate-50/50'
            }`}
          >
            <View className="flex-row items-center">
              <Text className="text-2xl mr-3">💳</Text>
              <View>
                <Text className="font-bold text-slate-900 text-xs">Paystack (Card)</Text>
                <Text className="text-slate-400 text-[10px]">Visa, Mastercard, Verve</Text>
              </View>
            </View>
            <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${payMethod === 'card' ? 'border-primary bg-primary' : 'border-slate-300'}`}>
              {payMethod === 'card' && <Check size={10} color="white" strokeWidth={3} />}
            </View>
          </Pressable>
        </View>

        {/* Order Summary */}
        <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3 mb-12">
          <Text className="font-bold text-slate-900 text-sm mb-1">Order Summary</Text>
          <View className="flex-row justify-between"><Text className="text-slate-500 text-xs">Amount</Text><Text className="font-bold text-slate-900 text-xs">₦10,000.00</Text></View>
          <View className="flex-row justify-between"><Text className="text-slate-500 text-xs">Bonus</Text><Text className="font-bold text-green-600 text-xs">+ ₦600.00</Text></View>
          <View className="flex-row justify-between pt-2 border-t border-slate-100">
            <Text className="font-bold text-slate-900 text-base">Total Credit</Text>
            <Text className="font-bold text-primary text-base">₦10,600.00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.back()}
          className="bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
        >
          <Lock size={18} color="white" className="mr-2" />
          <Text className="text-white font-bold text-lg">Pay ₦10,000.00</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}