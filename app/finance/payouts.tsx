import { useRouter } from 'expo-router';
import { ArrowLeft, Filter, Search, ShieldCheck, Upload } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const STATUS_FILTERS = ['All', 'Completed', 'Processing', 'Failed'];

export default function PayoutHistoryScreen() {
  const router = useRouter();
  const [activeStatus, setActiveStatus] = useState('All');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Payout History</Text>
            <Text className="text-slate-400 text-xs">Track all payouts sent to your bank accounts</Text>
          </View>
        </View>

        <Pressable className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl flex-row items-center">
          <Upload size={16} color="#4F26D9" className="mr-1" />
          <Text className="text-primary font-bold text-xs">Export</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Hero Card */}
        <View className="mx-6 mt-4 bg-purple-50/60 border border-purple-100 p-6 rounded-[32px] shadow-sm">
          <Text className="text-slate-500 text-xs">Total Payouts</Text>
          <Text className="text-primary text-3xl font-bold mt-1">₦1,245,000.00</Text>
          <Text className="text-slate-400 text-[10px] mt-0.5">In 25 transactions</Text>

          <View className="flex-row justify-between border-t border-purple-100 mt-4 pt-3">
            <View><Text className="text-green-600 font-bold text-xs">● Completed</Text><Text className="text-slate-900 font-bold text-sm mt-0.5">₦1,200,000.00</Text></View>
            <View><Text className="text-amber-600 font-bold text-xs">● Processing</Text><Text className="text-slate-900 font-bold text-sm mt-0.5">₦45,000.00</Text></View>
            <View><Text className="text-red-500 font-bold text-xs">● Failed</Text><Text className="text-slate-900 font-bold text-sm mt-0.5">₦0.00</Text></View>
          </View>
        </View>

        {/* Search & Filters */}
        <View className="px-6 mt-4 flex-row gap-x-2">
          <View className="flex-1 bg-white border border-slate-100 h-12 rounded-2xl flex-row items-center px-4 shadow-sm">
            <Search size={18} color="#94a3b8" />
            <TextInput placeholder="Search by amount, bank or reference" className="flex-1 ml-2 text-xs" />
          </View>
          <Pressable className="bg-white border border-slate-100 px-4 h-12 rounded-2xl flex-row items-center shadow-sm">
            <Filter size={18} color="#64748b" />
          </Pressable>
        </View>

        {/* Status Pills */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerClassName="px-6 py-4 gap-x-2"
        >
          {STATUS_FILTERS.map((s) => (
            <Pressable
              key={s}
              onPress={() => setActiveStatus(s)}
              className={`px-4 py-2 rounded-2xl ${activeStatus === s ? 'bg-primary' : 'bg-white border border-slate-100'}`}
            >
              <Text className={`text-xs font-bold ${activeStatus === s ? 'text-white' : 'text-slate-600'}`}>{s}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Payout List Grouped */}
        <View className="px-6 mb-6">
          <Text className="font-bold text-slate-900 text-xs mb-3">Today</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm gap-y-3 mb-6">
            <PayoutRow bank="GTBank •••• 1234" amount="₦120,000.00" date="31 May 2025, 10:45 AM" status="Completed" statusColor="bg-green-100 text-green-700" />
            <PayoutRow bank="Access Bank •••• 4567" amount="₦85,000.00" date="31 May 2025, 09:15 AM" status="Processing" statusColor="bg-amber-100 text-amber-800" />
            <PayoutRow bank="GTBank •••• 1234" amount="₦150,000.00" date="30 May 2025, 04:20 PM" status="Completed" statusColor="bg-green-100 text-green-700" />
          </View>

          <Text className="font-bold text-slate-900 text-xs mb-3">Yesterday</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm gap-y-3">
            <PayoutRow bank="Zenith Bank •••• 7890" amount="₦200,000.00" date="30 May 2025, 11:30 AM" status="Completed" statusColor="bg-green-100 text-green-700" />
            <PayoutRow bank="UBA •••• 1122" amount="₦95,000.00" date="29 May 2025, 03:10 PM" status="Completed" statusColor="bg-green-100 text-green-700" />
            <PayoutRow bank="GTBank •••• 1234" amount="₦50,000.00" date="29 May 2025, 09:40 AM" status="Failed" statusColor="bg-red-100 text-red-700" />
          </View>
        </View>

        {/* Security Footer Banner */}
        <View className="mx-6 mb-6 bg-purple-50/60 p-4 rounded-2xl flex-row items-center border border-purple-100">
          <ShieldCheck size={18} color="#4F26D9" className="mr-3" />
          <Text className="text-slate-600 text-[10px] flex-1 leading-4">
            All payouts are encrypted and processed securely. You will receive a notification for every payout.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PayoutRow({ bank, amount, date, status, statusColor }: any) {
  return (
    <View className="flex-row items-center justify-between py-2 border-b border-slate-50">
      <View className="flex-row items-center">
        <View className="w-10 h-10 bg-purple-50 rounded-2xl items-center justify-center mr-3">
          <Text className="text-base">🏦</Text>
        </View>
        <View>
          <Text className="font-bold text-slate-900 text-xs">{amount}</Text>
          <Text className="text-slate-400 text-[10px]">{bank}</Text>
          <Text className="text-slate-400 text-[9px]">{date}</Text>
        </View>
      </View>
      <View className={`px-2.5 py-1 rounded-full ${statusColor}`}>
        <Text className="text-[9px] font-bold">{status}</Text>
      </View>
    </View>
  );
}