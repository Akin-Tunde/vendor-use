import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Filter, Calendar, ShoppingBag, 
  TrendingUp, ChevronRight, Sparkles 
} from 'lucide-react-native';

const TIME_PILLS = ['Today', 'Yesterday', 'This Week', 'This Month', 'Custom'];

export default function SalesReportScreen() {
  const router = useRouter();
  const [selectedPeriod, setSelectedPeriod] = useState('This Month');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Sales Report</Text>
            <Text className="text-slate-400 text-xs">Detailed overview of your sales performance</Text>
          </View>
        </View>

        <View className="flex-row space-x-2">
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center">
            <Filter size={18} color="#64748b" />
          </Pressable>
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center">
            <Calendar size={18} color="#64748b" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Time Period Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4 space-x-2 bg-white border-b border-slate-50">
          {TIME_PILLS.map((p) => (
            <Pressable 
              key={p} 
              onPress={() => setSelectedPeriod(p)}
              className={`px-4 py-2 rounded-2xl ${selectedPeriod === p ? 'bg-primary' : 'bg-slate-50'}`}
            >
              <Text className={`text-xs font-bold ${selectedPeriod === p ? 'text-white' : 'text-slate-600'}`}>{p}</Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* 4 Metric Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4 space-x-3">
          <SalesMetric label="Total Sales" value="₦1,245,800" trend="▲ 18.6%" icon="🛍️" />
          <SalesMetric label="Total Orders" value="328" trend="▲ 15.3%" icon="🛒" />
          <SalesMetric label="Total Items Sold" value="1,842" trend="▲ 12.7%" icon="📦" />
          <SalesMetric label="Average Order Value" value="₦3,792" trend="▲ 8.7%" icon="💳" />
        </ScrollView>

        {/* Sales Overview Chart */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <Text className="font-bold text-slate-900 text-base mb-4">Sales Overview</Text>
          <View className="h-44 bg-slate-50/50 rounded-2xl p-3 justify-between">
            <Text className="text-[10px] text-slate-400">₦300K</Text>
            <Text className="text-[10px] text-slate-400">₦225K</Text>
            <Text className="text-[10px] text-slate-400">₦150K</Text>
            <Text className="text-[10px] text-slate-400">₦75K</Text>
            <View className="flex-row justify-between pt-1 border-t border-slate-200">
              <Text className="text-[9px] text-slate-400">1 May</Text>
              <Text className="text-[9px] text-slate-400">8 May</Text>
              <Text className="text-[9px] text-slate-400">15 May</Text>
              <Text className="text-[9px] text-slate-400">22 May</Text>
              <Text className="text-[9px] text-slate-400">29 May</Text>
            </View>
          </View>
        </View>

        {/* Sales by Category Donut Section */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Sales by Category</Text>
            <Text className="text-primary font-bold text-xs">View All &gt;</Text>
          </View>

          <View className="flex-row items-center">
            {/* Donut Chart visual */}
            <View className="w-32 h-32 rounded-full border-[12px] border-primary border-l-blue-500 border-t-amber-500 border-r-pink-500 items-center justify-center mr-4">
              <Text className="font-bold text-slate-900 text-xs">₦1,245,800</Text>
              <Text className="text-slate-400 text-[8px]">Total Sales</Text>
            </View>

            {/* Category Legend */}
            <View className="flex-1 space-y-1.5">
              <CategoryLegend color="bg-primary" label="Groceries & Staples" value="₦542,300" pct="43.6%" />
              <CategoryLegend color="bg-blue-500" label="Fruits & Vegetables" value="₦241,500" pct="19.4%" />
              <CategoryLegend color="bg-amber-500" label="Meat, Poultry & Fish" value="₦152,800" pct="12.3%" />
              <CategoryLegend color="bg-pink-500" label="Dairy & Eggs" value="₦98,700" pct="7.9%" />
              <CategoryLegend color="bg-red-500" label="Snacks & Beverages" value="₦78,600" pct="6.3%" />
            </View>
          </View>
        </View>

        {/* 2-Column Row: Payment Method & Time of Day */}
        <View className="px-6 flex-row space-x-3 mb-8">
          {/* Payment Method */}
          <View className="flex-1 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm space-y-3">
            <Text className="font-bold text-slate-900 text-xs">Sales by Payment Method</Text>
            <PaymentBar label="Online Payment" value="₦842,100" pct="67.6%" color="bg-primary" />
            <PaymentBar label="Cash on Delivery" value="₦356,200" pct="28.6%" color="bg-green-500" />
            <PaymentBar label="Wallet Payment" value="₦47,500" pct="3.8%" color="bg-amber-500" />
          </View>

          {/* Time of Day */}
          <View className="flex-1 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm space-y-3">
            <View className="flex-row justify-between items-center">
              <Text className="font-bold text-slate-900 text-xs">Sales by Time</Text>
              <Text className="text-primary font-bold text-[10px]">View All</Text>
            </View>
            <PaymentBar label="12AM - 6AM" value="₦28,600" pct="2.3%" color="bg-slate-300" />
            <PaymentBar label="6AM - 12PM" value="₦265,400" pct="21.3%" color="bg-blue-400" />
            <PaymentBar label="12PM - 6PM" value="₦612,700" pct="49.2%" color="bg-primary" />
            <PaymentBar label="6PM - 12AM" value="₦339,100" pct="27.2%" color="bg-purple-300" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SalesMetric({ label, value, trend, icon }: any) {
  return (
    <View className="w-36 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm">
      <Text className="text-xl mb-2">{icon}</Text>
      <Text className="text-slate-400 text-[10px] font-bold uppercase">{label}</Text>
      <Text className="text-base font-bold text-slate-900 mt-1">{value}</Text>
      <Text className="text-green-600 text-[10px] font-bold mt-1">{trend} <Text className="text-slate-400 font-normal">vs last month</Text></Text>
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
        <Text className="text-slate-600 text-[9px] font-medium">{label}</Text>
        <Text className="text-slate-900 font-bold text-[9px]">{pct}</Text>
      </View>
      <View className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
        <View className={`h-full rounded-full ${color}`} style={{ width: pct }} />
      </View>
    </View>
  );
}