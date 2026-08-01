import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Calendar, Filter, Wallet, 
  ArrowDownLeft, ArrowUpRight, ShieldCheck, ChevronRight 
} from 'lucide-react-native';

export default function EarningsReportScreen() {
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
            <Text className="text-xl font-bold text-slate-900">Earnings Report</Text>
            <Text className="text-slate-400 text-xs">Track your earnings, fees and payouts</Text>
          </View>
        </View>

        <View className="flex-row space-x-2">
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"><Calendar size={18} color="#64748b" /></Pressable>
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"><Filter size={18} color="#64748b" /></Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 4 Primary Metric Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4 space-x-3">
          <MetricCard label="Total Earnings" value="₦986,500" trend="▲ 20.1%" icon="💼" />
          <MetricCard label="Product Sales" value="₦1,245,800" trend="▲ 18.6%" icon="🛍️" />
          <MetricCard label="Platform Fees" value="-₦186,870" trend="▲ 12.3%" icon="📉" red />
          <MetricCard label="Net Earnings" value="₦986,500" trend="▲ 20.1%" icon="🏦" />
        </ScrollView>

        {/* Net Earnings Highlight Box */}
        <View className="mx-6 bg-purple-50/80 border border-purple-100 p-5 rounded-[32px] flex-row items-center justify-between mb-6 shadow-sm">
          <View className="flex-1 pr-2">
            <Text className="text-slate-500 text-xs font-medium">Net Earnings This Month</Text>
            <Text className="text-2xl font-bold text-primary mt-1">₦986,500</Text>
            <Text className="text-slate-400 text-[10px] mt-0.5">Amount receiveable after platform fee deduction.</Text>
          </View>
          <Pressable className="bg-primary px-4 py-2.5 rounded-2xl shadow-md shadow-primary/30">
            <Text className="text-white font-bold text-xs">View Payouts</Text>
          </Pressable>
        </View>

        {/* Payout Summary Cards */}
        <View className="px-6 mb-6">
          <Text className="font-bold text-slate-900 text-base mb-3">Payout Summary</Text>
          <View className="flex-row flex-wrap justify-between gap-y-3">
            <PayoutCard label="Total Payouts" value="₦842,300" sub="3 payouts completed" icon="🏦" />
            <PayoutCard label="Pending Payouts" value="₦144,200" sub="Will be paid soon" icon="⏳" />
            <PayoutCard label="Next Payout Date" value="02 Jun 2025" sub="In 3 days" icon="📅" />
            <PayoutCard label="Payout Method" value="Bank Transfer" sub="GTBank •••• 1234" icon="💳" />
          </View>
        </View>

        {/* Recent Transactions List */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-12">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Recent Transactions</Text>
            <Text className="text-primary font-bold text-xs">View All &gt;</Text>
          </View>

          <TxItem type="Product Sale" id="Order #ORD-78291" date="31 May, 2025 • 10:24 AM" amount="+₦12,450" isPos />
          <TxItem type="Delivery Fee" id="Order #ORD-78291" date="31 May, 2025 • 10:24 AM" amount="+₦2,300" isPos />
          <TxItem type="Platform Fee" id="Order #ORD-78291" date="31 May, 2025 • 10:24 AM" amount="-₦2,490" isPos={false} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({ label, value, trend, icon, red }: any) {
  return (
    <View className="w-36 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm">
      <Text className="text-xl mb-2">{icon}</Text>
      <Text className="text-slate-400 text-[10px] font-bold uppercase">{label}</Text>
      <Text className={`text-base font-bold mt-1 ${red ? 'text-red-500' : 'text-slate-900'}`}>{value}</Text>
      <Text className="text-green-600 text-[10px] font-bold mt-1">{trend} <Text className="text-slate-400 font-normal">vs last month</Text></Text>
    </View>
  );
}

function PayoutCard({ label, value, sub, icon }: any) {
  return (
    <View className="w-[48%] bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm">
      <Text className="text-xl mb-2">{icon}</Text>
      <Text className="text-slate-400 text-[10px] font-bold uppercase">{label}</Text>
      <Text className="text-sm font-bold text-slate-900 mt-1">{value}</Text>
      <Text className="text-slate-400 text-[9px] mt-0.5">{sub}</Text>
    </View>
  );
}

function TxItem({ type, id, date, amount, isPos }: any) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
      <View className="flex-row items-center">
        <View className={`w-10 h-10 rounded-2xl items-center justify-center mr-3 ${isPos ? 'bg-green-100' : 'bg-red-100'}`}>
          {isPos ? <ArrowDownLeft size={18} color="#22c55e" /> : <ArrowUpRight size={18} color="#ef4444" />}
        </View>
        <View>
          <Text className="font-bold text-slate-900 text-xs">{type}</Text>
          <Text className="text-slate-400 text-[10px]">{id} • {date}</Text>
        </View>
      </View>
      <Text className={`font-bold text-sm ${isPos ? 'text-green-600' : 'text-red-500'}`}>{amount}</Text>
    </View>
  );
}