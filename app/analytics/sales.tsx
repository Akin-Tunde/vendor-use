import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  ChevronRight,
  Filter
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TIME_PILLS = ['Today', 'Yesterday', 'This Week', 'This Month', 'Custom'];

export default function SalesReportScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

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
            <Text className="text-xl font-bold text-slate-900">Sales Report</Text>
            <Text className="text-slate-400 text-xs">Detailed overview of your sales performance</Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
            <Filter size={18} color="#64748b" />
          </Pressable>
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
            <Calendar size={18} color="#64748b" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>

        {/* 1. 4 Metric Cards in 2x2 Grid */}
        <View className="px-6 py-4 flex-row flex-wrap justify-between gap-y-3">
          <SalesMetric label="Total Sales" value="₦1,245,800" trend="▲ 18.6%" icon="🛍️" />
          <SalesMetric label="Total Orders" value="328" trend="▲ 15.3%" icon="🛒" />
          <SalesMetric label="Total Items Sold" value="1,842" trend="▲ 12.7%" icon="📦" />
          <SalesMetric label="Avg. Order Value" value="₦3,792" trend="▲ 8.7%" icon="💳" />
        </View>

        {/* 2. Sales Overview Chart */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Sales Overview</Text>
            <View className="flex-row items-center gap-2">
              <View className="w-2.5 h-0.5 bg-primary" />
              <Text className="text-[9px] text-slate-500 font-bold">This Month</Text>
            </View>
          </View>

          <View className="h-44 bg-slate-50/50 rounded-2xl p-3 justify-between">
            <Text className="text-[10px] text-slate-400 font-medium">₦300K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦225K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦150K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦75K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦0</Text>
            <View className="flex-row justify-between pt-1 border-t border-slate-200">
              <Text className="text-[9px] text-slate-400">1 May</Text>
              <Text className="text-[9px] text-slate-400">8 May</Text>
              <Text className="text-[9px] text-slate-400">15 May</Text>
              <Text className="text-[9px] text-slate-400">22 May</Text>
              <Text className="text-[9px] text-slate-400">29 May</Text>
            </View>
          </View>
        </View>

        {/* 3. Sales by Category Donut Section */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Sales by Category</Text>
            <Pressable className="flex-row items-center">
              <Text className="text-primary font-bold text-xs mr-1">View All</Text>
              <ChevronRight size={14} color="#4F26D9" />
            </Pressable>
          </View>

          <View className="flex-row items-center">
            {/* Donut Chart Visual */}
            <View className="w-32 h-32 rounded-full border-[12px] border-primary border-l-blue-500 border-t-amber-500 border-r-pink-500 items-center justify-center mr-4">
              <Text className="font-bold text-slate-900 text-xs">₦1,245,800</Text>
              <Text className="text-slate-400 text-[8px]">Total Sales</Text>
            </View>

            {/* Category Legend */}
            <View className="flex-1 gap-1.5">
              <CategoryLegend color="bg-primary" label="Groceries & Staples" value="₦542,300" pct="43.6%" />
              <CategoryLegend color="bg-blue-500" label="Fruits & Vegetables" value="₦241,500" pct="19.4%" />
              <CategoryLegend color="bg-amber-500" label="Meat, Poultry & Fish" value="₦152,800" pct="12.3%" />
              <CategoryLegend color="bg-pink-500" label="Dairy & Eggs" value="₦98,700" pct="7.9%" />
              <CategoryLegend color="bg-red-500" label="Snacks & Beverages" value="₦78,600" pct="6.3%" />
            </View>
          </View>
        </View>

        {/* 4. Sales by Payment Method (Full Width Card) */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm gap-3 mb-6">
          <Text className="font-bold text-slate-900 text-sm">Sales by Payment Method</Text>
          <PaymentBar label="Online Payment" value="₦842,100" pct="67.6%" color="bg-primary" />
          <PaymentBar label="Cash on Delivery" value="₦356,200" pct="28.6%" color="bg-green-500" />
          <PaymentBar label="Wallet Payment" value="₦47,500" pct="3.8%" color="bg-amber-500" />
        </View>

        {/* 5. Sales by Time (Stacked Vertically Below, Full Width Card) */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm gap-3 mb-12">
          <View className="flex-row justify-between items-center">
            <Text className="font-bold text-slate-900 text-sm">Sales by Time</Text>
            <Pressable className="flex-row items-center">
              <Text className="text-primary font-bold text-xs mr-1">View All</Text>
              <ChevronRight size={14} color="#4F26D9" />
            </Pressable>
          </View>
          <PaymentBar label="12AM - 6AM" value="₦28,600" pct="2.3%" color="bg-slate-300" />
          <PaymentBar label="6AM - 12PM" value="₦265,400" pct="21.3%" color="bg-blue-400" />
          <PaymentBar label="12PM - 6PM" value="₦612,700" pct="49.2%" color="bg-primary" />
          <PaymentBar label="6PM - 12AM" value="₦339,100" pct="27.2%" color="bg-purple-300" />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SalesMetric({ label, value, trend, icon }: any) {
  return (
    <View className="w-[48%] bg-white border border-slate-100 p-3.5 rounded-[28px] shadow-sm">
      <Text className="text-xl mb-1">{icon}</Text>
      <Text className="text-slate-400 text-[9px] font-bold uppercase">{label}</Text>
      <Text className="text-base font-bold text-slate-900 mt-0.5" numberOfLines={1}>{value}</Text>
      <Text className="text-green-600 text-[9px] font-bold mt-0.5" numberOfLines={1}>
        {trend} <Text className="text-slate-400 font-normal">vs last month</Text>
      </Text>
    </View>
  );
}

function CategoryLegend({ color, label, value, pct }: any) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center flex-1 mr-1">
        <View className={`w-2 h-2 rounded-full mr-1.5 ${color}`} />
        <Text className="text-slate-600 text-[9px] font-medium" numberOfLines={1}>{label}</Text>
      </View>
      <Text className="text-slate-900 font-bold text-[9px] mr-1">{value}</Text>
      <Text className="text-slate-400 text-[8px]">{pct}</Text>
    </View>
  );
}

function PaymentBar({ label, value, pct, color }: any) {
  return (
    <View>
      <View className="flex-row justify-between mb-1">
        <Text className="text-slate-600 text-[10px] font-medium">{label}</Text>
        <View className="flex-row items-center">
          <Text className="text-slate-900 font-bold text-[10px] mr-2">{value}</Text>
          <Text className="text-slate-400 text-[9px] font-bold">{pct}</Text>
        </View>
      </View>
      <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <View className={`h-full rounded-full ${color}`} style={{ width: pct }} />
      </View>
    </View>
  );
}