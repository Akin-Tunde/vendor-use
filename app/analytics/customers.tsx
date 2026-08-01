import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Calendar, Filter, Users, UserCheck, Smartphone, MapPin } from 'lucide-react-native';

const TOP_CUSTOMERS = [
  { name: 'Tunde Adewale', email: 'tunde.adewale@email.com', orders: '18', total: '₦128,450', date: '31 May 2025' },
  { name: 'Aisha Bello', email: 'aisha.bello@email.com', orders: '15', total: '₦98,760', date: '30 May 2025' },
  { name: 'Chinedu Okafor', email: 'chinedu.okafor@email.com', orders: '12', total: '₦76,230', date: '28 May 2025' },
  { name: 'Kemi Johnson', email: 'kemi.johnson@email.com', orders: '11', total: '₦65,800', date: '27 May 2025' },
];

export default function CustomerInsightsScreen() {
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
            <Text className="text-xl font-bold text-slate-900">Customer Insights</Text>
            <Text className="text-slate-400 text-xs">Understand your customers and their behavior</Text>
          </View>
        </View>

        <View className="flex-row space-x-2">
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"><Calendar size={18} color="#64748b" /></Pressable>
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-xl items-center justify-center"><Filter size={18} color="#64748b" /></Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 4 Metric Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4 space-x-3">
          <CustMetric label="Total Customers" value="1,245" trend="▲ 15.6% vs last month" icon="👥" />
          <CustMetric label="New Customers" value="328" trend="▲ 18.3% vs last month" icon="👤" />
          <CustMetric label="Returning Customers" value="917" trend="▲ 12.8% vs last month" icon="🔄" />
          <CustMetric label="Avg. Orders / Cust." value="2.4" trend="▲ 8.7% vs last month" icon="📊" />
        </ScrollView>

        {/* Location & Device Breakdown */}
        <View className="px-6 flex-row space-x-3 mb-6">
          <View className="flex-1 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm space-y-2">
            <Text className="font-bold text-slate-900 text-xs">Customers by Location</Text>
            <LocRow city="Lagos" pct="45.1%" />
            <LocRow city="Abuja" pct="18.5%" />
            <LocRow city="Port Harcourt" pct="12.5%" />
            <LocRow city="Ibadan" pct="7.9%" />
          </View>

          <View className="flex-1 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm space-y-2">
            <Text className="font-bold text-slate-900 text-xs">Customers by Device</Text>
            <LocRow city="Android" pct="65.3%" />
            <LocRow city="iOS" pct="32.0%" />
            <LocRow city="Web" pct="2.7%" />
          </View>
        </View>

        {/* Top Customers List */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-12">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Top Customers</Text>
            <Text className="text-primary font-bold text-xs">View All &gt;</Text>
          </View>

          {TOP_CUSTOMERS.map((c, i) => (
            <View key={i} className="flex-row items-center py-3 border-b border-slate-50">
              <View className="w-10 h-10 bg-purple-100 rounded-full items-center justify-center mr-3">
                <Text className="text-primary font-bold text-xs">{c.name.split(' ').map(n=>n[0]).join('')}</Text>
              </View>
              <View className="flex-1">
                <Text className="font-bold text-slate-900 text-xs">{c.name}</Text>
                <Text className="text-slate-400 text-[10px]">{c.email}</Text>
              </View>
              <View className="items-end">
                <Text className="font-bold text-slate-900 text-xs">{c.total}</Text>
                <Text className="text-slate-400 text-[9px]">{c.orders} orders</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function CustMetric({ label, value, trend, icon }: any) {
  return (
    <View className="w-36 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm">
      <Text className="text-xl mb-2">{icon}</Text>
      <Text className="text-slate-400 text-[10px] font-bold uppercase">{label}</Text>
      <Text className="text-base font-bold text-slate-900 mt-1">{value}</Text>
      <Text className="text-green-600 text-[9px] font-bold mt-1">{trend}</Text>
    </View>
  );
}

function LocRow({ city, pct }: any) {
  return (
    <View className="flex-row justify-between items-center py-1">
      <Text className="text-slate-600 text-[10px]">{city}</Text>
      <Text className="text-slate-900 font-bold text-[10px]">{pct}</Text>
    </View>
  );
}