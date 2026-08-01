import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, History, Info, ShieldCheck, Check } from 'lucide-react-native';

const QUICK_AMOUNTS = ['10,000', '50,000', '100,000', '200,000'];

export default function WithdrawFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('120,000');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Withdraw Funds</Text>
            <Text className="text-slate-400 text-xs">Transfer your earnings to your bank account</Text>
          </View>
        </View>

        <Pressable onPress={() => router.push('/finance/transactions')} className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl flex-row items-center">
          <History size={16} color="#4F26D9" className="mr-1" />
          <Text className="text-primary font-bold text-xs">History</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Available Balance Card */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30 flex-row justify-between items-center">
          <View>
            <Text className="text-white/80 text-xs font-medium">Available Balance</Text>
            <Text className="text-white text-3xl font-bold mt-1">₦842,300.00</Text>
            <Text className="text-white/70 text-xs mt-1">Withdrawable Balance: ₦842,300.00</Text>
          </View>
          <View className="w-14 h-14 bg-white/10 rounded-2xl items-center justify-center border border-white/20">
            <Text className="text-2xl">🏦</Text>
          </View>
        </View>

        {/* Enter Amount Box */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-4">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-slate-900 text-sm">Enter Amount</Text>
            <Pressable onPress={() => setAmount('842,300')}>
              <Text className="text-primary font-bold text-xs">Withdraw All</Text>
            </Pressable>
          </View>

          <View className="bg-slate-50 border border-primary h-14 rounded-2xl flex-row items-center px-4">
            <Text className="text-slate-900 font-bold text-xl mr-1">₦</Text>
            <TextInput 
              value={amount}
              onChangeText={setAmount}
              keyboardType="numeric"
              className="flex-1 text-slate-900 font-bold text-xl"
            />
          </View>

          {/* Quick Amount Pills */}
          <View className="flex-row justify-between gap-x-2">
            {QUICK_AMOUNTS.map((amt) => (
              <Pressable 
                key={amt} 
                onPress={() => setAmount(amt)}
                className="flex-1 bg-purple-50/60 border border-purple-100 py-2.5 rounded-2xl items-center"
              >
                <Text className="text-primary font-bold text-xs">₦{amt}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* Bank Selection */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-900 text-sm">Select Bank Account</Text>
            <Text className="text-primary font-bold text-xs">+ Add New Account</Text>
          </View>

          <View className="bg-purple-50/30 border-2 border-primary p-4 rounded-2xl flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-orange-600 rounded-xl items-center justify-center mr-3">
                <Text className="text-white font-bold text-[10px]">GTBank</Text>
              </View>
              <View>
                <Text className="font-bold text-slate-900 text-sm">GTBank</Text>
                <Text className="text-slate-400 text-xs">•••• 1234 • George Taylor</Text>
              </View>
            </View>

            <View className="w-6 h-6 rounded-full bg-primary items-center justify-center">
              <Check size={14} color="white" strokeWidth={3} />
            </View>
          </View>
        </View>

        {/* Summary Box */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Withdrawal Summary</Text>
          <SummaryRow label="Withdrawal Amount" value={`₦${amount}.00`} />
          <SummaryRow label="Processing Fee" value="₦0.00" green />
          <View className="flex-row justify-between pt-2 border-t border-slate-100">
            <Text className="font-bold text-slate-900 text-base">You will receive</Text>
            <Text className="font-bold text-slate-900 text-base">₦{amount}.00</Text>
          </View>

          <View className="bg-purple-50 p-3 rounded-2xl flex-row items-center mt-2">
            <Info size={16} color="#4F26D9" className="mr-2" />
            <Text className="text-primary font-bold text-xs">Estimated arrival: Within 24 hours</Text>
          </View>
        </View>

        {/* Security Badge Banner */}
        <View className="mx-6 my-6 bg-slate-50 border border-slate-100 p-4 rounded-2xl flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-2">
            <ShieldCheck size={20} color="#4F26D9" className="mr-2" />
            <Text className="text-slate-600 text-[10px]">Your funds are protected with bank-level security and encryption.</Text>
          </View>
          <View className="bg-green-100 px-2 py-1 rounded">
            <Text className="text-green-800 font-bold text-[8px]">PCI DSS COMPLIANT</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.push('/finance/withdraw-review')}
          className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-lg">Continue to Review</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, green }: any) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-slate-500 text-xs">{label}</Text>
      <Text className={`font-bold text-xs ${green ? 'text-green-600' : 'text-slate-900'}`}>{value}</Text>
    </View>
  );
}