import { useRouter } from 'expo-router';
import { ArrowDownLeft, ArrowLeft, ArrowUpRight, ChevronDown, Filter, Search, Upload } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const FILTERS = ['All', 'Money In', 'Money Out', 'Withdrawals', 'Add Money'];

export default function TransactionsScreen() {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Transactions</Text>
            <Text className="text-slate-400 text-xs">View all money in and out of your wallet</Text>
          </View>
        </View>

        <View className="flex-row gap-x-2">
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"><Filter size={18} color="#64748b" /></Pressable>
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"><Upload size={18} color="#64748b" /></Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Current Balance Purple Banner */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white/80 text-xs">Current Balance</Text>
            <Pressable className="bg-white/10 px-3 py-1 rounded-full flex-row items-center">
              <Text className="text-white text-xs font-medium mr-1">This Month</Text>
              <ChevronDown size={14} color="white" />
            </Pressable>
          </View>
          <Text className="text-white text-3xl font-bold">₦52,500.00</Text>

          <View className="flex-row border-t border-white/10 mt-4 pt-3">
            <View className="flex-1 border-r border-white/10 pr-2">
              <Text className="text-white/70 text-[10px]">Total Money In</Text>
              <Text className="text-green-400 font-bold text-sm mt-0.5">↓ ₦162,500.00</Text>
            </View>
            <View className="flex-1 pl-4">
              <Text className="text-white/70 text-[10px]">Total Money Out</Text>
              <Text className="text-amber-400 font-bold text-sm mt-0.5">↑ ₦110,000.00</Text>
            </View>
          </View>
        </View>

        {/* Search */}
        <View className="mx-6 mt-4 bg-white border border-slate-100 h-12 rounded-2xl flex-row items-center px-4 shadow-sm">
          <Search size={18} color="#94a3b8" />
          <TextInput placeholder="Search by type, amount or reference" className="flex-1 ml-2 text-xs" />
        </View>

        {/* Filter Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-6 py-4 gap-x-2"
        >
          {FILTERS.map((f) => (
            <Pressable
              key={f}
              onPress={() => setActiveFilter(f)}
              className={`px-4 py-2 rounded-2xl ${activeFilter === f ? 'bg-primary' : 'bg-white border border-slate-100'}`}
            >
              <Text className={`text-xs font-bold ${activeFilter === f ? 'text-white' : 'text-slate-600'}`}>{f}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Grouped Transactions */}
        <View className="px-6 mb-6">
          <Text className="font-bold text-slate-900 text-xs mb-3">Today</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm gap-y-3 mb-6">
            <TxItem label="Add Money" sub="Via Paystack (Card) • 10:52 AM" amount="+₦10,000.00" isPos />
            <TxItem label="Order Payment" sub="Order #ODR-98271 • 10:15 AM" amount="+₦24,500.00" isPos />
            <TxItem label="Withdrawal to Bank" sub="GTBank •••• 1234 • 09:30 AM" amount="-₦120,000.00" isPos={false} />
            <TxItem label="Referral Bonus" sub="08:45 AM • REF-829201-2134" amount="+₦5,000.00" isPos />
          </View>

          <Text className="font-bold text-slate-900 text-xs mb-3">Yesterday</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm gap-y-3">
            <TxItem label="Add Money" sub="Via Bank Transfer • 06:20 PM" amount="+₦20,000.00" isPos />
            <TxItem label="Ad Campaign Payment" sub="Campaign: Summer Promo • 04:10 PM" amount="-₦15,000.00" isPos={false} />
            <TxItem label="Order Payment" sub="Order #ODR-98260 • 02:35 PM" amount="+₦18,000.00" isPos />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function TxItem({ label, sub, amount, isPos }: any) {
  return (
    <View className="flex-row items-center justify-between py-2 border-b border-slate-50">
      <View className="flex-row items-center">
        <View className={`w-10 h-10 rounded-2xl items-center justify-center mr-3 ${isPos ? 'bg-green-100' : 'bg-red-100'}`}>
          {isPos ? <ArrowDownLeft size={18} color="#22c55e" /> : <ArrowUpRight size={18} color="#ef4444" />}
        </View>
        <View>
          <Text className="font-bold text-slate-900 text-xs">{label}</Text>
          <Text className="text-slate-400 text-[10px]">{sub}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className={`font-bold text-xs ${isPos ? 'text-green-600' : 'text-red-500'}`}>{amount}</Text>
        <View className="bg-green-100 px-2 py-0.5 rounded-full mt-0.5">
          <Text className="text-green-700 text-[9px] font-bold">Successful</Text>
        </View>
      </View>
    </View>
  );
}