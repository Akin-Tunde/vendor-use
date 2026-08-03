import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, History, Info, ShieldCheck, Check, 
  Eye, EyeOff, Clock, ChevronDown, Plus, X
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUICK_AMOUNTS = ['10,000', '50,000', '100,000', '200,000'];

export default function WithdrawFundsScreen() {
  const router = useRouter();
  const [amount, setAmount] = useState('120,000');
  const [showBalance, setShowBalance] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable 
            onPress={() => router.back()} 
            className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center mr-3 active:bg-purple-50"
          >
            <ArrowLeft size={20} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Withdraw Funds</Text>
            <Text className="text-slate-400 text-xs">Transfer your earnings to your bank account</Text>
          </View>
        </View>

        <Pressable 
          onPress={() => router.push('/finance/transactions')} 
          className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl flex-row items-center active:bg-purple-50"
        >
          <History size={16} color="#000" className="mr-1.5" />
          <Text className="text-slate-900 font-bold text-xs">History</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 1. Available Balance Card */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30 flex-row justify-between items-center relative overflow-hidden">
          <View className="flex-1 pr-2">
            <View className="flex-row items-center">
              <Text className="text-white/80 text-xs font-medium mr-2">Available Balance</Text>
              <Pressable onPress={() => setShowBalance(!showBalance)}>
                {showBalance ? <Eye size={16} color="rgba(255,255,255,0.8)" /> : <EyeOff size={16} color="rgba(255,255,255,0.8)" />}
              </Pressable>
            </View>

            <Text className="text-white text-3xl font-bold mt-1.5">
              {showBalance ? '₦842,300.00' : '••••••••'}
            </Text>

            <View className="flex-row items-center mt-3">
              <Text className="text-white/70 text-xs">Withdrawable Balance</Text>
              <Info size={12} color="rgba(255,255,255,0.7)" className="ml-1" />
            </View>
            <Text className="text-white font-bold text-sm mt-0.5">
              {showBalance ? '₦842,300.00' : '••••••••'}
            </Text>
          </View>

          {/* 3D Wallet Graphic Placeholder */}
          <View className="w-20 h-20 bg-white/10 rounded-3xl items-center justify-center border border-white/20">
            <Text className="text-4xl">👛</Text>
          </View>
        </View>

        {/* 2. Enter Amount Card */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-4">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-slate-900 text-sm">Enter Amount</Text>
            <Pressable onPress={() => setAmount('842,300')}>
              <Text className="text-primary font-bold text-xs">Withdraw All</Text>
            </Pressable>
          </View>

          <View className="bg-purple-50/20 border-2 border-primary h-14 rounded-2xl flex-row items-center px-4 justify-between">
            <View className="flex-row items-center flex-1">
              <Text className="text-slate-900 font-bold text-xl mr-1">₦</Text>
              <TextInput 
                value={amount}
                onChangeText={setAmount}
                keyboardType="numeric"
                className="flex-1 text-slate-900 font-bold text-xl"
              />
            </View>
            {amount ? (
              <Pressable onPress={() => setAmount('')} className="bg-slate-200 p-1 rounded-full">
                <X size={12} color="#64748b" />
              </Pressable>
            ) : null}
          </View>

          {/* Quick Amount Pills */}
          <View className="flex-row justify-between gap-x-2">
            {QUICK_AMOUNTS.map((amt) => (
              <Pressable 
                key={amt} 
                onPress={() => setAmount(amt)}
                className="flex-1 bg-purple-50/50 border border-purple-100 py-2.5 rounded-2xl items-center active:bg-primary active:border-primary"
              >
                <Text className="text-primary font-bold text-xs">₦{amt}</Text>
              </Pressable>
            ))}
          </View>
        </View>

        {/* 3. Select Bank Account Card */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-900 text-sm">Select Bank Account</Text>
            <Pressable className="flex-row items-center">
              <Plus size={14} color="#4F26D9" className="mr-0.5" />
              <Text className="text-primary font-bold text-xs">Add New Account</Text>
            </Pressable>
          </View>

          {/* Selected Bank Card */}
          <View className="bg-purple-50/30 border-2 border-primary p-4 rounded-2xl flex-row items-center justify-between">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-orange-600 rounded-xl items-center justify-center mr-3 shadow-sm">
                <Text className="text-white font-bold text-[9px]">GTBank</Text>
              </View>
              <View>
                <Text className="font-bold text-slate-900 text-sm">GTBank</Text>
                <Text className="text-slate-500 text-xs">**** 1234</Text>
                <Text className="text-slate-400 text-[10px]">George Taylor</Text>
              </View>
            </View>

            {/* Radio Circle Indicator */}
            <View className="w-6 h-6 rounded-full border-2 border-primary items-center justify-center">
              <View className="w-3 h-3 rounded-full bg-primary" />
            </View>
          </View>

          {/* View All Accounts Link */}
          <Pressable className="flex-row items-center justify-center pt-2">
            <ChevronDown size={14} color="#64748b" className="mr-1" />
            <Text className="text-slate-600 font-bold text-xs">View all accounts</Text>
          </Pressable>
        </View>

        {/* 4. Withdrawal Summary Card */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Withdrawal Summary</Text>
          <SummaryRow label="Withdrawal Amount" value={`₦${amount || '0'}.00`} />
          <SummaryRow label="Processing Fee" value="₦0.00" green hasInfo />
          
          <View className="flex-row justify-between pt-3 border-t border-slate-100">
            <Text className="font-bold text-slate-900 text-base">You will receive</Text>
            <Text className="font-bold text-slate-900 text-lg">₦{amount || '0'}.00</Text>
          </View>

          {/* Clock Callout Box */}
          <View className="bg-purple-50/60 border border-purple-100 p-4 rounded-2xl flex-row items-center mt-2 shadow-sm">
            <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
              <Clock size={20} color="#4F26D9" />
            </View>
            <View className="flex-1">
              <Text className="text-primary font-bold text-xs">Estimated arrival: Within 24 hours</Text>
              <Text className="text-slate-500 text-[10px] mt-0.5">Withdrawals are processed only on business days.</Text>
            </View>
          </View>
        </View>

      
      </ScrollView>

      {/* Footer Button */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.push('/finance/withdraw-review')}
          className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
        >
          <Text className="text-white font-bold text-lg">Continue to Review</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function SummaryRow({ label, value, green, hasInfo }: any) {
  return (
    <View className="flex-row justify-between items-center">
      <View className="flex-row items-center">
        <Text className="text-slate-500 text-xs">{label}</Text>
        {hasInfo && <Info size={12} color="#94a3b8" className="ml-1" />}
      </View>
      <Text className={`font-bold text-xs ${green ? 'text-green-600' : 'text-slate-900'}`}>{value}</Text>
    </View>
  );
}