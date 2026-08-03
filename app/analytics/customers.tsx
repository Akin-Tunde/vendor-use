import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  BarChart3,
  Calendar,
  Filter,
  RotateCcw,
  UserCheck,
  Users
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CustomerInsightsScreen() {
  const router = useRouter();

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
            <Text className="text-xl font-bold text-slate-900">Customer Insights</Text>
            <Text className="text-slate-400 text-xs">Understand your customers and behavior</Text>
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
        {/* 1. 4 Metric Cards in 2x2 Grid */}
        <View className="px-6 py-4 flex-row flex-wrap justify-between gap-y-3">
          <CustMetric label="Total Customers" value="1,245" trend="▲ 15.6%" sub="vs last month" icon={Users} bg="bg-purple-100" iconColor="#4F26D9" />
          <CustMetric label="New Customers" value="328" trend="▲ 18.3%" sub="vs last month" icon={UserCheck} bg="bg-green-100" iconColor="#22c55e" />
          <CustMetric label="Returning Cust." value="917" trend="▲ 12.8%" sub="vs last month" icon={RotateCcw} bg="bg-orange-100" iconColor="#f59e0b" />
          <CustMetric label="Avg. Orders / Cust." value="2.4" trend="▲ 8.7%" sub="vs last month" icon={BarChart3} bg="bg-blue-100" iconColor="#3b82f6" />
        </View>

        {/* 2. Customers by Location (Full Width) */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-4 space-y-3">
          <Text className="font-bold text-slate-900 text-sm">Customers by Location</Text>
          <LocRow city="Lagos" pct="45.1%" color="bg-primary" />
          <LocRow city="Abuja" pct="18.5%" color="bg-blue-500" />
          <LocRow city="Port Harcourt" pct="12.5%" color="bg-amber-500" />
          <LocRow city="Ibadan" pct="7.9%" color="bg-green-500" />
        </View>

        {/* 3. Customers by Device (Full Width, Stacked Below) */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6 space-y-3">
          <Text className="font-bold text-slate-900 text-sm">Customers by Device</Text>
          <LocRow city="Android" pct="65.3%" color="bg-green-500" />
          <LocRow city="iOS" pct="32.0%" color="bg-primary" />
          <LocRow city="Web" pct="2.7%" color="bg-amber-500" />
        </View>


      </ScrollView>
    </SafeAreaView>
  );
}

function CustMetric({ label, value, trend, sub, icon: Icon, bg, iconColor }: any) {
  return (
    <View className="w-[48%] bg-white border border-slate-100 p-3.5 rounded-[28px] shadow-sm">
      <View className={`w-8 h-8 ${bg} rounded-xl items-center justify-center mb-2`}>
        <Icon size={16} color={iconColor} />
      </View>
      <Text className="text-slate-400 text-[9px] font-bold uppercase">{label}</Text>
      <Text className="text-base font-bold text-slate-900 mt-0.5" numberOfLines={1}>{value}</Text>
      <Text className="text-green-600 text-[9px] font-bold mt-0.5" numberOfLines={1}>
        {trend} <Text className="text-slate-400 font-normal">{sub}</Text>
      </Text>
    </View>
  );
}

function LocRow({ city, pct, color }: any) {
  return (
    <View>
      <View className="flex-row justify-between mb-1">
        <Text className="text-slate-600 text-[10px] font-medium">{city}</Text>
        <Text className="text-slate-900 font-bold text-[10px]">{pct}</Text>
      </View>
      <View className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <View className={`h-full rounded-full ${color}`} style={{ width: pct }} />
      </View>
    </View>
  );
}