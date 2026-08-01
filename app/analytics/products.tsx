import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Filter, ChevronDown, Package, TrendingUp, AlertTriangle } from 'lucide-react-native';

const TOP_PRODUCTS = [
  { name: 'Fresh Bananas (1kg)', sold: '212 sold', amount: '₦86,450', trend: '+ 18.2%', emoji: '🍌' },
  { name: 'Mama Gold Rice 50kg', sold: '145 sold', amount: '₦72,300', trend: '+ 12.7%', emoji: '🌾' },
  { name: 'Power Oil 1L', sold: '102 sold', amount: '₦45,760', trend: '+ 9.3%', emoji: '🛢️' },
  { name: 'Farmfresh Eggs (30pcs)', sold: '90 sold', amount: '₦38,100', trend: '+ 8.1%', emoji: '🥚' },
];

const LOW_PRODUCTS = [
  { name: 'Mineral Water 500ml', sold: '12 sold', amount: '₦3,600', trend: '- 32.1%', emoji: '🍾' },
  { name: 'Plantain Chips 100g', sold: '9 sold', amount: '₦1,620', trend: '- 28.7%', emoji: '🍌' },
  { name: 'Bath Soap 150g', sold: '7 sold', amount: '₦630', trend: '- 25.4%', emoji: '🧼' },
];

export default function ProductPerformanceScreen() {
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
            <Text className="text-xl font-bold text-slate-900">Product Performance</Text>
            <Text className="text-slate-400 text-xs">Track how your products are performing</Text>
          </View>
        </View>

        <View className="flex-row space-x-2">
          <Pressable className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl flex-row items-center">
            <Text className="text-xs font-bold text-slate-700 mr-1">This Month</Text>
            <ChevronDown size={14} color="#64748b" />
          </Pressable>
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center">
            <Filter size={18} color="#64748b" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 4 Metric Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4 space-x-3">
          <PerfCard label="Total Products" value="256" trend="▲ 12 vs last month" icon="📦" />
          <PerfCard label="Total Items Sold" value="1,842" trend="▲ 15.3% vs last month" icon="🛒" />
          <PerfCard label="Total Revenue" value="₦1,245,800" trend="▲ 18.6% vs last month" icon="💰" />
          <PerfCard label="Avg. Product Revenue" value="₦2,851" trend="▲ 8.7% vs last month" icon="📈" />
        </ScrollView>

        {/* 2-Column Row 1: Top Selling & Low Performing */}
        <View className="px-6 flex-row space-x-3 mb-6">
          <View className="flex-1 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm">
            <Text className="font-bold text-slate-900 text-xs mb-3">Top Selling Products</Text>
            {TOP_PRODUCTS.map((p, i) => (
              <View key={i} className="flex-row items-center py-2 border-b border-slate-50">
                <Text className="mr-2 text-base">{p.emoji}</Text>
                <View className="flex-1">
                  <Text className="font-bold text-slate-900 text-[10px]" numberOfLines={1}>{p.name}</Text>
                  <Text className="text-slate-400 text-[8px]">{p.sold}</Text>
                </View>
                <Text className="font-bold text-green-600 text-[10px]">{p.amount}</Text>
              </View>
            ))}
          </View>

          <View className="flex-1 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm">
            <Text className="font-bold text-slate-900 text-xs mb-3">Low Performing Products</Text>
            {LOW_PRODUCTS.map((p, i) => (
              <View key={i} className="flex-row items-center py-2 border-b border-slate-50">
                <Text className="mr-2 text-base">{p.emoji}</Text>
                <View className="flex-1">
                  <Text className="font-bold text-slate-900 text-[10px]" numberOfLines={1}>{p.name}</Text>
                  <Text className="text-slate-400 text-[8px]">{p.sold}</Text>
                </View>
                <Text className="font-bold text-red-500 text-[10px]">{p.trend}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Product Insight Banner */}
        <View className="mx-6 bg-purple-50 border border-purple-100 p-5 rounded-[32px] flex-row items-center mb-12">
          <Text className="text-3xl mr-4">🏆</Text>
          <View className="flex-1">
            <Text className="font-bold text-slate-900 text-sm">Product Insight</Text>
            <Text className="text-slate-600 text-xs mt-0.5 leading-4">
              Your top product <Text className="font-bold text-primary">"Fresh Bananas (1kg)"</Text> is up 18.2% this month. Consider promoting low performing products.
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function PerfCard({ label, value, trend, icon }: any) {
  return (
    <View className="w-36 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm">
      <Text className="text-xl mb-2">{icon}</Text>
      <Text className="text-slate-400 text-[10px] font-bold uppercase">{label}</Text>
      <Text className="text-base font-bold text-slate-900 mt-1">{value}</Text>
      <Text className="text-green-600 text-[9px] font-bold mt-1">{trend}</Text>
    </View>
  );
}