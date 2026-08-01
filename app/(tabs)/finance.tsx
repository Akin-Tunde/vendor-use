import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Eye, EyeOff, ArrowUp, ArrowDown, History, 
  FileText, HelpCircle, Settings, ChevronRight, 
  ArrowDownLeft, ArrowUpRight, Calendar, Wallet as WalletIcon
} from 'lucide-react-native';

export default function FinanceScreen() {
  const router = useRouter();
  const [showBalance, setShowBalance] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-slate-900">Wallet</Text>
          <Text className="text-slate-400 text-xs">Manage your balance and transactions</Text>
        </View>

        <View className="flex-row space-x-3">
          <Pressable className="items-center">
            <HelpCircle size={22} color="#64748b" />
            <Text className="text-[10px] text-slate-500 font-medium mt-0.5">Help</Text>
          </Pressable>
          <Pressable className="items-center">
            <Settings size={22} color="#64748b" />
            <Text className="text-[10px] text-slate-500 font-medium mt-0.5">Settings</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Main Purple Balance Card */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30 relative overflow-hidden">
          <View className="flex-row justify-between items-start">
            <View>
              <View className="flex-row items-center">
                <Text className="text-white/80 text-xs font-medium mr-2">Available Balance</Text>
                <Pressable onPress={() => setShowBalance(!showBalance)}>
                  {showBalance ? <Eye size={16} color="rgba(255,255,255,0.8)" /> : <EyeOff size={16} color="rgba(255,255,255,0.8)" />}
                </Pressable>
              </View>
              <Text className="text-white text-3xl font-bold mt-2">
                {showBalance ? '₦842,300.00' : '••••••••'}
              </Text>
              <Text className="text-white/70 text-xs mt-1">Total Balance: ₦984,560.00</Text>
            </View>

            {/* Wallet Illustration Graphic */}
            <View className="w-16 h-16 bg-white/10 rounded-2xl items-center justify-center border border-white/20">
              <WalletIcon size={32} color="white" />
            </View>
          </View>

          <Pressable className="flex-row items-center mt-6 bg-white/10 self-start px-3 py-1.5 rounded-full border border-white/10">
            <View className="w-2 h-2 rounded-full bg-green-400 mr-2" />
            <Text className="text-white text-xs font-medium mr-1">Auto-payout is enabled</Text>
            <ChevronRight size={14} color="white" />
          </Pressable>
        </View>

        {/* 4 Action Buttons Row */}
        <View className="mx-6 mt-4 bg-white border border-slate-100 p-4 rounded-[28px] flex-row justify-between shadow-sm">
          <ActionButton icon={ArrowUp} label="Withdraw" sub="Transfer to bank" color="bg-purple-100" iconColor="#4F26D9" onPress={() => router.push('/finance/withdraw')} />
          <ActionButton icon={ArrowDown} label="Add Money" sub="Top up wallet" color="bg-green-100" iconColor="#22c55e" onPress={() => router.push('/finance/add-money')} />
          <ActionButton icon={History} label="Payout History" sub="View payouts" color="bg-blue-100" iconColor="#3b82f6" onPress={() => router.push('/finance/payouts')} />
          <ActionButton icon={FileText} label="Transactions" sub="View all activity" color="bg-amber-100" iconColor="#f59e0b" onPress={() => router.push('/finance/transactions')} />
        </View>

        {/* Wallet Summary Grid */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-4">
          <Text className="font-bold text-slate-900 text-base">Wallet Summary</Text>
          <View className="flex-row flex-wrap justify-between gap-y-4">
            <SummaryItem label="Available Balance" value="₦842,300.00" sub="Ready to withdraw" icon="👛" />
            <SummaryItem label="Pending Balance" value="₦142,260.00" sub="Will be available soon" icon="⏰" />
            <SummaryItem label="Total Payouts" value="₦3,245,800.00" sub="This month" icon="📅" />
            <SummaryItem label="Total Earnings" value="₦4,230,360.00" sub="This month" icon="📊" />
          </View>
        </View>

        {/* Recent Transactions Section */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Recent Transactions</Text>
            <Pressable onPress={() => router.push('/finance/transactions')}>
              <Text className="text-primary font-bold text-xs">View All &gt;</Text>
            </Pressable>
          </View>

          <TxRow type="Payment Received" sub="Order #ORD-78291" date="31 May 2025, 10:24 AM" amount="+₦12,450.00" isPos />
          <TxRow type="Payment Received" sub="Order #ORD-78285" date="31 May 2025, 09:15 AM" amount="+₦8,760.00" isPos />
          <TxRow type="Platform Fee" sub="Order #ORD-78291" date="31 May 2025, 10:24 AM" amount="-₦2,490.00" isPos={false} />
          <TxRow type="Payout to GTBank •••• 1234" sub="Payout ID: POU-72821" date="30 May 2025, 03:45 PM" amount="-₦250,000.00" isPos={false} status="Completed" />
          <TxRow type="Delivery Fee" sub="Order #ORD-78285" date="30 May 2025, 09:10 AM" amount="+₦2,300.00" isPos />
        </View>

        {/* Next Payout Card */}
        <View className="mx-6 mb-12 bg-purple-50/60 border border-purple-100 p-5 rounded-[32px] flex-row items-center justify-between shadow-sm">
          <View className="flex-row items-center flex-1 pr-3">
            <View className="w-12 h-12 bg-primary rounded-2xl items-center justify-center mr-3">
              <Calendar size={24} color="white" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-900 text-sm">Next Payout</Text>
              <Text className="text-primary font-bold text-base mt-0.5">02 June 2025</Text>
              <Text className="text-slate-500 text-[10px] mt-0.5">Estimated amount: ₦150,000.00</Text>
            </View>
          </View>
          <Pressable onPress={() => router.push('/finance/payouts')} className="bg-white border border-primary/20 px-3.5 py-2.5 rounded-2xl">
            <Text className="text-primary font-bold text-xs">View Schedule</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ActionButton({ icon: Icon, label, sub, color, iconColor, onPress }: any) {
  return (
    <Pressable onPress={onPress} className="items-center flex-1">
      <View className={`w-12 h-12 ${color} rounded-2xl items-center justify-center mb-1.5`}>
        <Icon size={20} color={iconColor} />
      </View>
      <Text className="font-bold text-slate-900 text-xs text-center">{label}</Text>
      <Text className="text-slate-400 text-[8px] text-center" numberOfLines={1}>{sub}</Text>
    </Pressable>
  );
}

function SummaryItem({ label, value, sub, icon }: any) {
  return (
    <View className="w-[48%]">
      <Text className="text-lg mb-1">{icon}</Text>
      <Text className="text-slate-400 text-[10px] font-bold uppercase">{label}</Text>
      <Text className="text-base font-bold text-slate-900 mt-0.5">{value}</Text>
      <Text className="text-slate-400 text-[9px] mt-0.5">{sub}</Text>
    </View>
  );
}

function TxRow({ type, sub, date, amount, isPos, status }: any) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
      <View className="flex-row items-center">
        <View className={`w-10 h-10 rounded-2xl items-center justify-center mr-3 ${isPos ? 'bg-green-100' : 'bg-purple-100'}`}>
          {isPos ? <ArrowDownLeft size={18} color="#22c55e" /> : <ArrowUpRight size={18} color="#4F26D9" />}
        </View>
        <View>
          <Text className="font-bold text-slate-900 text-xs">{type}</Text>
          <Text className="text-slate-400 text-[10px]">{sub}</Text>
          <Text className="text-slate-400 text-[9px]">{date}</Text>
        </View>
      </View>
      <View className="items-end">
        <Text className={`font-bold text-sm ${isPos ? 'text-green-600' : 'text-red-500'}`}>{amount}</Text>
        {status && (
          <View className="bg-green-100 px-2 py-0.5 rounded-full mt-1">
            <Text className="text-green-700 text-[8px] font-bold">{status}</Text>
          </View>
        )}
      </View>
    </View>
  );
}