import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, History, Plus, Check } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const QUICK_AMOUNTS = ['5,000', '10,000', '20,000', '50,000', '100,000', '200,000'];

export default function AddMoneyScreen() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState('10,000');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Add Money</Text>
            <Text className="text-slate-400 text-xs">Fund your wallet to use for ads, promotions and more</Text>
          </View>
        </View>

        <Pressable onPress={() => router.push('/finance/transactions')} className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl flex-row items-center">
          <History size={16} color="#4F26D9" className="mr-1" />
          <Text className="text-primary font-bold text-xs">History</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Top Purple Banner */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30 flex-row justify-between items-center">
          <View>
            <Text className="text-white/80 text-xs">Current Balance</Text>
            <Text className="text-white text-3xl font-bold mt-1">₦42,500.00</Text>
            <Text className="text-white/70 text-[10px] mt-2">Wallet can be used for Ads, Promotions, Delivery Credits & Subscriptions</Text>
          </View>
          <View className="w-14 h-14 bg-white/10 rounded-2xl items-center justify-center border border-white/20">
            <Plus size={32} color="white" />
          </View>
        </View>

        {/* Choose Quick Amount Grid */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-4">
          <Text className="font-bold text-slate-900 text-sm">Choose Amount</Text>

          <View className="flex-row flex-wrap justify-between gap-y-3">
            {QUICK_AMOUNTS.map((amt) => {
              const isSelected = selectedAmount === amt;
              return (
                <Pressable 
                  key={amt}
                  onPress={() => setSelectedAmount(amt)}
                  className={`w-[31%] py-3.5 rounded-2xl items-center border-2 ${isSelected ? 'bg-primary border-primary' : 'bg-slate-50 border-slate-100'}`}
                >
                  <Text className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-primary'}`}>₦{amt}</Text>
                  {isSelected && (
                    <View className="absolute top-1 right-1 w-4 h-4 bg-white/20 rounded-full items-center justify-center">
                      <Check size={10} color="white" strokeWidth={3} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Custom Amount */}
          <Text className="font-bold text-slate-900 text-xs mt-2">Custom Amount</Text>
          <View className="bg-slate-50 border border-slate-200 h-12 px-4 rounded-2xl flex-row items-center">
            <Text className="text-slate-900 font-bold text-base mr-2">₦</Text>
            <TextInput 
              placeholder="Enter amount" 
              keyboardType="numeric"
              className="flex-1 text-slate-900 font-bold text-base"
            />
          </View>
        </View>

        {/* What You Can Do Checklist */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3 mb-12">
          <Text className="font-bold text-slate-900 text-sm mb-1">You will be able to</Text>
          <BenefitRow text="Run sponsored ads to boost your store" />
          <BenefitRow text="Promote products to increase visibility" />
          <BenefitRow text="Subscribe to premium vendor plans" />
          <BenefitRow text="Get delivery credits in advance" />
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.push('/finance/payment-method')}
          className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function BenefitRow({ text }: any) {
  return (
    <View className="flex-row items-center">
      <View className="w-5 h-5 bg-green-100 rounded-full items-center justify-center mr-2.5">
        <Check size={12} color="#22c55e" strokeWidth={3} />
      </View>
      <Text className="text-slate-700 text-xs font-medium">{text}</Text>
    </View>
  );
}