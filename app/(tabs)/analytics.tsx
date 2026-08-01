import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Menu, ChevronDown, TrendingUp, ShoppingBag, 
  Wallet, Users, BarChart2, Package, 
  Sparkles, ChevronRight, ArrowUpRight
} from 'lucide-react-native';

const TOP_PRODUCTS = [
  { name: 'Fresh Bananas (1kg)', sold: '212 sold', amount: '₦86,450', trend: '+ 18.2%', emoji: '🍌' },
  { name: 'Mama Gold Rice 50kg', sold: '145 sold', amount: '₦72,300', trend: '+ 12.7%', emoji: '🌾' },
  { name: 'Power Oil 1L', sold: '102 sold', amount: '₦45,760', trend: '+ 9.3%', emoji: '🛢️' },
  { name: 'Farmfresh Eggs (30pcs)', sold: '90 sold', amount: '₦38,100', trend: '+ 8.1%', emoji: '🥚' },
];

export default function AnalyticsDashboardScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center mr-3">
            <Menu size={20} color="#64748b" />
          </View>
          <View>
            <Text className="text-xl font-bold text-slate-900">Analytics Dashboard</Text>
            <Text className="text-slate-400 text-xs">Overview of your business performance</Text>
          </View>
        </View>

        <Pressable className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-2xl flex-row items-center">
          <Text className="text-xs font-bold text-slate-700 mr-1.5">This Month</Text>
          <ChevronDown size={14} color="#64748b" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner Greeting */}
        <View className="mx-6 mt-4 bg-purple-50/60 border border-purple-100 p-5 rounded-[32px] flex-row items-center justify-between shadow-sm">
          <View className="flex-1 pr-3">
            <Text className="text-lg font-bold text-slate-900">Good morning, Store Owner! 👋</Text>
            <Text className="text-slate-500 text-xs mt-1 leading-4">
              Here's how your store is performing this month.
            </Text>
          </View>
          <View className="w-16 h-16 bg-primary/10 rounded-3xl items-center justify-center">
            <TrendingUp size={32} color="#4F26D9" />
          </View>
        </View>

        {/* 4 Primary Metric Cards */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 py-4 space-x-3">
          <MetricCard title="Total Sales" value="₦1,245,800" trend="▲ 18.6%" icon={ShoppingBag} iconBg="bg-purple-100" iconColor="#4F26D9" />
          <MetricCard title="Total Orders" value="328" trend="▲ 15.3%" icon={ShoppingBag} iconBg="bg-green-100" iconColor="#22c55e" />
          <MetricCard title="Total Earnings" value="₦986,500" trend="▲ 20.1%" icon={Wallet} iconBg="bg-orange-100" iconColor="#f59e0b" />
          <MetricCard title="Avg. Order Value" value="₦3,792" trend="▲ 8.7%" icon={Users} iconBg="bg-blue-100" iconColor="#3b82f6" />
        </ScrollView>

        {/* Sales Overview Line Chart Container */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Sales Overview</Text>
            <Pressable onPress={() => router.push('/analytics/sales')} className="flex-row items-center">
              <Text className="text-primary font-bold text-xs mr-1">View Report</Text>
              <ChevronRight size={14} color="#4F26D9" />
            </Pressable>
          </View>

          {/* Chart Graphic Area */}
          <View className="h-44 bg-slate-50/50 rounded-2xl p-3 justify-between">
            <View className="flex-row justify-between">
              <Text className="text-[10px] text-slate-400 font-medium">₦300K</Text>
              <View className="flex-row items-center space-x-3">
                <View className="flex-row items-center"><View className="w-2.5 h-0.5 bg-primary mr-1" /><Text className="text-[9px] text-slate-500 font-bold">This Month</Text></View>
                <View className="flex-row items-center"><View className="w-2.5 h-0.5 bg-slate-300 mr-1" /><Text className="text-[9px] text-slate-400">Last Month</Text></View>
              </View>
            </View>
            <Text className="text-[10px] text-slate-400 font-medium">₦225K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦150K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦75K</Text>
            <View className="flex-row justify-between pt-1 border-t border-slate-200/60">
              <Text className="text-[9px] text-slate-400">1 May</Text>
              <Text className="text-[9px] text-slate-400">8 May</Text>
              <Text className="text-[9px] text-slate-400">15 May</Text>
              <Text className="text-[9px] text-slate-400">22 May</Text>
              <Text className="text-[9px] text-slate-400">29 May</Text>
            </View>
          </View>
        </View>

        {/* Quick Reports Row */}
        <View className="px-6 mb-6">
          <Text className="font-bold text-slate-900 text-base mb-3">Quick Reports</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
            <ReportCard title="Sales Report" desc="Detailed breakdown of sales" icon={BarChart2} iconBg="bg-purple-100" color="#4F26D9" onPress={() => router.push('/analytics/sales')} />
            <ReportCard title="Earnings Report" desc="Track earnings, fees & payouts" icon={Wallet} iconBg="bg-green-100" color="#22c55e" onPress={() => router.push('/analytics/earnings')} />
            <ReportCard title="Product Performance" desc="Top products & categories" icon={Package} iconBg="bg-orange-100" color="#f59e0b" onPress={() => router.push('/analytics/products')} />
            <ReportCard title="Customer Insights" desc="Understand buyer behavior" icon={Users} iconBg="bg-blue-100" color="#3b82f6" onPress={() => router.push('/analytics/customers')} />
          </ScrollView>
        </View>

        {/* Top Selling & Order Status Section */}
        <View className="px-6 flex-row space-x-3 mb-6">
          {/* Top Selling Products List */}
          <View className="flex-1 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-bold text-slate-900 text-xs">Top Selling Products</Text>
              <Pressable onPress={() => router.push('/analytics/products')}>
                <Text className="text-primary font-bold text-[10px]">View All</Text>
              </Pressable>
            </View>

            {TOP_PRODUCTS.map((p, idx) => (
              <View key={idx} className="flex-row items-center py-2 border-b border-slate-50">
                <View className="w-8 h-8 bg-slate-50 rounded-xl items-center justify-center mr-2 border border-slate-100">
                  <Text className="text-sm">{p.emoji}</Text>
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-slate-900 text-[11px]" numberOfLines={1}>{p.name}</Text>
                  <Text className="text-slate-400 text-[9px]">{p.sold}</Text>
                </View>
                <View className="items-end">
                  <Text className="font-bold text-slate-900 text-[11px]">{p.amount}</Text>
                  <Text className="text-green-600 font-bold text-[8px]">{p.trend}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Order Status Doughnut Visual */}
          <View className="flex-1 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm">
            <Text className="font-bold text-slate-900 text-xs mb-3">Order Status</Text>
            
            <View className="items-center justify-center my-2">
              <View className="w-24 h-24 rounded-full border-8 border-green-500 border-t-primary border-r-blue-500 items-center justify-center">
                <Text className="font-bold text-slate-900 text-base">328</Text>
                <Text className="text-slate-400 text-[8px]">Total Orders</Text>
              </View>
            </View>

            <View className="space-y-1 mt-2">
              <StatusRow label="Delivered" value="176 (53.7%)" color="bg-green-500" />
              <StatusRow label="Completed" value="98 (29.9%)" color="bg-blue-500" />
              <StatusRow label="Cancelled" value="18 (5.5%)" color="bg-red-500" />
              <StatusRow label="Pending" value="22 (6.7%)" color="bg-purple-500" />
            </View>
          </View>
        </View>

        {/* Bottom Insight Banner */}
        <View className="mx-6 bg-purple-50/80 border border-purple-100 p-5 rounded-[32px] flex-row items-center mb-12 shadow-sm">
          <View className="w-12 h-12 bg-primary/10 rounded-2xl items-center justify-center mr-4">
            <Sparkles size={24} color="#4F26D9" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-slate-900 text-sm">Business Insight</Text>
            <Text className="text-slate-600 text-xs mt-0.5 leading-4">
              Great job! Your sales are up <Text className="font-bold text-green-600">18.6%</Text> compared to last month. Keep maintaining this momentum! 🚀
            </Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({ title, value, trend, icon: Icon, iconBg, iconColor }: any) {
  return (
    <View className="w-36 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm">
      <View className={`w-8 h-8 ${iconBg} rounded-xl items-center justify-center mb-3`}>
        <Icon size={18} color={iconColor} />
      </View>
      <Text className="text-slate-400 text-[10px] font-bold uppercase">{title}</Text>
      <Text className="text-base font-bold text-slate-900 mt-1">{value}</Text>
      <Text className="text-green-600 text-[10px] font-bold mt-1">{trend} <Text className="text-slate-400 font-normal">vs last month</Text></Text>
    </View>
  );
}

function ReportCard({ title, desc, icon: Icon, iconBg, color, onPress }: any) {
  return (
    <Pressable onPress={onPress} className="w-40 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm">
      <View className="flex-row justify-between items-start mb-3">
        <View className={`w-10 h-10 ${iconBg} rounded-2xl items-center justify-center`}>
          <Icon size={20} color={color} />
        </View>
        <ArrowUpRight size={16} color="#cbd5e1" />
      </View>
      <Text className="font-bold text-slate-900 text-sm">{title}</Text>
      <Text className="text-slate-400 text-[10px] mt-1 leading-3" numberOfLines={2}>{desc}</Text>
    </Pressable>
  );
}

function StatusRow({ label, value, color }: any) {
  return (
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center">
        <View className={`w-2 h-2 rounded-full mr-1.5 ${color}`} />
        <Text className="text-slate-500 text-[9px]">{label}</Text>
      </View>
      <Text className="text-slate-900 font-bold text-[9px]">{value}</Text>
    </View>
  );
}