import { useRouter } from 'expo-router';
import {
  ArrowDownLeft,
  ArrowLeft,
  Building2,
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  Filter,
  Gift,
  Landmark,
  Percent,
  Wallet
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TIME_FILTERS = ['Today', 'Yesterday', 'This Week', 'This Month', 'Custom'];

export default function EarningsReportScreen() {
  const router = useRouter();
  const [selectedFilter, setSelectedFilter] = useState('This Month');

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
            <Text className="text-xl font-bold text-slate-900">Earnings Report</Text>
            <Text className="text-slate-400 text-xs">Track your earnings, fees and payouts</Text>
          </View>
        </View>

        <View className="flex-row space-x-2">
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
            <Calendar size={18} color="#64748b" />
          </Pressable>
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
            <Filter size={18} color="#64748b" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Time Period Filter Pills Bar */}
   

        {/* 1. Primary 4 Metric Cards */}
        <View className="px-6 py-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
            <MetricCard label="Total Earnings" value="₦986,500" trend="▲ 20.1%" sub="vs last month" icon={Wallet} bg="bg-purple-100" iconColor="#4F26D9" />
            <MetricCard label="Product Sales" value="₦1,245,800" trend="▲ 18.6%" sub="vs last month" icon={FileText} bg="bg-green-100" iconColor="#22c55e" />
            <MetricCard label="Platform Fees" value="-₦186,870" trend="▲ 12.3%" sub="vs last month" icon={Percent} bg="bg-orange-100" iconColor="#f97316" />
            <MetricCard label="Net Earnings" value="₦986,500" trend="▲ 20.1%" sub="vs last month" icon={Gift} bg="bg-blue-100" iconColor="#3b82f6" />
          </ScrollView>
        </View>

        {/* 2. Earnings Overview Line Chart Container */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Earnings Overview</Text>
            <View className="flex-row items-center space-x-3">
              <View className="flex-row items-center">
                <View className="w-2.5 h-0.5 bg-primary mr-1" />
                <Text className="text-[9px] text-slate-500 font-bold">Net Earnings</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2.5 h-0.5 bg-slate-300 mr-1" />
                <Text className="text-[9px] text-slate-400">Platform Fees</Text>
              </View>
            </View>
          </View>

          {/* Chart Graphic Area */}
          <View className="h-44 bg-slate-50/50 rounded-2xl p-3 justify-between">
            <Text className="text-[10px] text-slate-400 font-medium">₦250K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦200K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦150K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦100K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦50K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦0</Text>
            <View className="flex-row justify-between pt-1 border-t border-slate-200/60">
              <Text className="text-[9px] text-slate-400">1 May</Text>
              <Text className="text-[9px] text-slate-400">8 May</Text>
              <Text className="text-[9px] text-slate-400">15 May</Text>
              <Text className="text-[9px] text-slate-400">22 May</Text>
              <Text className="text-[9px] text-slate-400">29 May</Text>
            </View>
          </View>
        </View>

        {/* 3. Earnings Breakdown Donut Section */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <Text className="font-bold text-slate-900 text-base mb-4">Earnings Breakdown</Text>

          <View className="flex-row items-center">
            {/* Donut Chart Visual */}
            <View className="w-32 h-32 rounded-full border-[12px] border-primary border-l-green-500 border-t-amber-500 border-r-blue-500 items-center justify-center mr-4">
              <Text className="font-bold text-slate-900 text-xs">₦986,500</Text>
              <Text className="text-slate-400 text-[8px] text-center">Net Earnings{"\n"}This Month</Text>
            </View>

            {/* Breakdown Legend */}
            <View className="flex-1 space-y-2">
              <BreakdownRow color="bg-primary" label="Product Sales" amount="₦1,245,800" pct="75.8%" />
              <BreakdownRow color="bg-green-500" label="Delivery Fees" amount="₦356,200" pct="21.6%" />
              <BreakdownRow color="bg-amber-500" label="Tips" amount="₦84,700" pct="5.1%" />
              <BreakdownRow color="bg-blue-500" label="Other Income" amount="₦23,200" pct="1.5%" />
            </View>
          </View>
        </View>

        {/* 4. Net Earnings Highlight Box */}
        <View className="mx-6 bg-purple-50/80 border border-purple-100 p-5 rounded-[32px] flex-row items-center justify-between mb-6 shadow-sm">
          <View className="flex-row items-center flex-1 pr-2">
            <View className="w-12 h-12 bg-primary/10 rounded-2xl items-center justify-center mr-3">
              <Text className="text-2xl">💰</Text>
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-900 text-sm">Net Earnings</Text>
              <Text className="text-slate-500 text-[10px] leading-3 mt-0.5">This is the amount you will receive after deducting all platform fees.</Text>
            </View>
          </View>
          <View className="items-end">
            <Text className="text-xl font-bold text-slate-900 mb-1">₦986,500</Text>
            <Pressable
              onPress={() => router.push('/finance/payouts')}
              className="bg-primary px-3.5 py-2 rounded-xl shadow-md shadow-primary/30 active:bg-primary/90"
            >
              <Text className="text-white font-bold text-xs">View Payout History</Text>
            </Pressable>
          </View>
        </View>

        {/* 5. Payout Summary Section */}
        <View className="px-6 mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-bold text-slate-900 text-base">Payout Summary</Text>
            <Pressable onPress={() => router.push('/finance/payouts')} className="flex-row items-center">
              <Text className="text-primary font-bold text-xs mr-1">View All</Text>
              <ChevronRight size={14} color="#4F26D9" />
            </Pressable>
          </View>

          <View className="flex-row flex-wrap justify-between gap-y-3">
            <PayoutCard label="Total Payouts" value="₦842,300" sub="3 payouts" icon={Landmark} bg="bg-green-100" iconColor="#22c55e" />
            <PayoutCard label="Pending Payouts" value="₦144,200" sub="Will be paid soon" icon={Clock} bg="bg-blue-100" iconColor="#3b82f6" />
            <PayoutCard label="Next Payout Date" value="02 Jun 2025" sub="In 3 days" icon={Calendar} bg="bg-orange-100" iconColor="#f59e0b" />
            <PayoutCard label="Payout Method" value="Bank Transfer" sub="GTBank •••• 1234" icon={Building2} bg="bg-purple-100" iconColor="#4F26D9" />
          </View>
        </View>

        {/* 6. Recent Transactions Section */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-12">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Recent Transactions</Text>
            <Pressable onPress={() => router.push('/finance/transactions')} className="flex-row items-center">
              <Text className="text-primary font-bold text-xs mr-1">View All</Text>
              <ChevronRight size={14} color="#4F26D9" />
            </Pressable>
          </View>

          <TxItem type="Product Sale" id="Order #ORD-78291" date="31 May, 2025 • 10:24 AM" amount="+₦12,450" isPos />
          <TxItem type="Delivery Fee" id="Order #ORD-78291" date="31 May, 2025 • 10:24 AM" amount="+₦2,300" isPos />
          <TxItem type="Platform Fee" id="Order #ORD-78291" date="31 May, 2025 • 10:24 AM" amount="-₦2,490" isPos={false} />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({ label, value, trend, sub, icon: Icon, bg, iconColor }: any) {
  return (
    <View className="w-36 bg-white border border-slate-100 p-3.5 rounded-3xl shadow-sm">
      <View className={`w-8 h-8 ${bg} rounded-xl items-center justify-center mb-2`}>
        <Icon size={16} color={iconColor} />
      </View>
      <Text className="text-slate-400 text-[9px] font-bold uppercase">{label}</Text>
      <Text className="text-base font-bold text-slate-900 mt-0.5" numberOfLines={1}>{value}</Text>
      <Text className="text-green-600 text-[8px] font-bold mt-0.5">{trend} <Text className="text-slate-400 font-normal">{sub}</Text></Text>
    </View>
  );
}

function BreakdownRow({ color, label, amount, pct }: any) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center flex-1 mr-1">
        <View className={`w-2 h-2 rounded-full mr-1.5 ${color}`} />
        <Text className="text-slate-600 text-[9px] font-medium" numberOfLines={1}>{label}</Text>
      </View>
      <Text className="text-slate-900 font-bold text-[9px] mr-2">{amount}</Text>
      <Text className="text-slate-400 text-[8px] font-bold">{pct}</Text>
    </View>
  );
}

function PayoutCard({ label, value, sub, icon: Icon, bg, iconColor }: any) {
  return (
    <View className="w-[48%] bg-white border border-slate-100 p-3.5 rounded-3xl shadow-sm">
      <View className={`w-8 h-8 ${bg} rounded-xl items-center justify-center mb-2`}>
        <Icon size={16} color={iconColor} />
      </View>
      <Text className="text-slate-400 text-[8px] font-bold uppercase">{label}</Text>
      <Text className="text-xs font-bold text-slate-900 mt-0.5" numberOfLines={1}>{value}</Text>
      <Text className="text-slate-400 text-[8px] mt-0.5" numberOfLines={1}>{sub}</Text>
    </View>
  );
}

function TxItem({ type, id, date, amount, isPos }: any) {
  return (
    <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
      <View className="flex-row items-center">
        <View className={`w-9 h-9 rounded-2xl items-center justify-center mr-3 ${isPos ? 'bg-green-100' : 'bg-orange-100'}`}>
          {isPos ? <ArrowDownLeft size={16} color="#22c55e" /> : <Percent size={16} color="#f97316" />}
        </View>
        <View>
          <Text className="font-bold text-slate-900 text-xs">{type}</Text>
          <Text className="text-slate-400 text-[9px]">{id} • {date}</Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Text className={`font-bold text-xs mr-2 ${isPos ? 'text-green-600' : 'text-red-500'}`}>{amount}</Text>
        <ChevronRight size={14} color="#cbd5e1" />
      </View>
    </View>
  );
}