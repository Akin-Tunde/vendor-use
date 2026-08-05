import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronDown, ChevronRight, DollarSign, Filter, Package, ShoppingCart, TrendingUp } from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TOP_PRODUCTS = [
  { rank: '1', name: 'Fresh Bananas (1kg)', sold: '212 sold', amount: '₦86,450', trend: '↑ 18.2%', emoji: '🍌' },
  { rank: '2', name: 'Mama Gold Rice 50kg', sold: '145 sold', amount: '₦72,300', trend: '↑ 12.7%', emoji: '🌾' },
  { rank: '3', name: 'Power Oil 1L', sold: '102 sold', amount: '₦45,760', trend: '↑ 9.3%', emoji: '🛢️' },
  { rank: '4', name: 'Farmfresh Eggs (30pcs)', sold: '90 sold', amount: '₦38,100', trend: '↑ 8.1%', emoji: '🥚' },
  { rank: '5', name: 'Hollandia Milk 1L', sold: '76 sold', amount: '₦28,950', trend: '↓ 2.4%', emoji: '🥛', isRed: true },
];

const LOW_PRODUCTS = [
  { rank: '1', name: 'Mineral Water 500ml', sold: '12 sold', amount: '₦3,600', trend: '↓ 32.1%', emoji: '🍾' },
  { rank: '2', name: 'Plantain Chips 100g', sold: '9 sold', amount: '₦1,620', trend: '↓ 28.7%', emoji: '🍌' },
  { rank: '3', name: 'Bath Soap 150g', sold: '7 sold', amount: '₦630', trend: '↓ 25.4%', emoji: '🧼' },
];

const STOCK_ALERTS = [
  { name: 'Mama Gold Rice 50kg', status: 'Low Stock (8 left)', color: 'text-amber-800 bg-amber-100', emoji: '🌾' },
  { name: 'Power Oil 1L', status: 'Low Stock (6 left)', color: 'text-amber-800 bg-amber-100', emoji: '🛢️' },
  { name: 'Hollandia Milk 1L', status: 'Out of Stock', color: 'text-red-700 bg-red-100', emoji: '🥛' },
];

export default function ProductPerformanceScreen() {
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
            <Text className="text-xl font-bold text-slate-900">Product Performance</Text>
            <Text className="text-slate-400 text-xs">Track how your products are performing</Text>
          </View>
        </View>

        <View className="flex-row gap-2">
          <Pressable className="bg-slate-50 border border-slate-100 px-3.5 py-2 rounded-2xl flex-row items-center">
            <Text className="text-xs font-bold text-slate-700 mr-1.5">This Month</Text>
            <ChevronDown size={14} color="#64748b" />
          </Pressable>
          <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
            <Filter size={18} color="#64748b" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 1. Primary Metric Cards in 2x2 Grid */}
        <View className="px-6 py-4 flex-row flex-wrap justify-between gap-y-3">
          <PerfCard label="Total Products" value="256" trend="▲ 12 vs last month" icon={Package} bg="bg-purple-100" iconColor="#4F26D9" />
          <PerfCard label="Total Items Sold" value="1,842" trend="▲ 15.3% vs last month" icon={ShoppingCart} bg="bg-green-100" iconColor="#22c55e" />
          <PerfCard label="Total Revenue" value="₦1,245,800" trend="▲ 18.6% vs last month" icon={DollarSign} bg="bg-orange-100" iconColor="#f59e0b" />
          <PerfCard label="Avg. Product Revenue" value="₦2,851" trend="▲ 8.7% vs last month" icon={TrendingUp} bg="bg-blue-100" iconColor="#3b82f6" />
        </View>

        {/* 2. Sales Performance Overview Line Chart */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900 text-base">Sales Performance Overview</Text>
            <View className="flex-row items-center gap-3">
              <View className="flex-row items-center">
                <View className="w-2.5 h-0.5 bg-primary mr-1" />
                <Text className="text-[9px] text-slate-500 font-bold">Revenue (₦)</Text>
              </View>
              <View className="flex-row items-center">
                <View className="w-2.5 h-0.5 bg-slate-300 mr-1" />
                <Text className="text-[9px] text-slate-400">Quantity Sold</Text>
              </View>
            </View>
          </View>

          {/* Chart Graphic Area */}
          <View className="h-44 bg-slate-50/50 rounded-2xl p-3 justify-between">
            <Text className="text-[10px] text-slate-400 font-medium">₦300K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦225K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦150K</Text>
            <Text className="text-[10px] text-slate-400 font-medium">₦75K</Text>
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

        {/* 3. Top Selling Products (Full Width Card) */}
        <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-bold text-slate-900 text-base">Top Selling Products</Text>
            <Pressable className="flex-row items-center">
              <Text className="text-primary font-bold text-xs mr-1">View All</Text>
              <ChevronRight size={14} color="#4F26D9" />
            </Pressable>
          </View>

          {TOP_PRODUCTS.map((p) => (
            <View key={p.rank} className="flex-row items-center py-2.5 border-b border-slate-50">
              <View className="w-5 h-5 bg-primary/10 rounded-full items-center justify-center mr-2">
                <Text className="text-primary font-bold text-[9px]">{p.rank}</Text>
              </View>

              <View className="w-9 h-9 bg-slate-50 rounded-xl items-center justify-center mr-3 border border-slate-100">
                <Text className="text-base">{p.emoji}</Text>
              </View>

              <View className="flex-1 pr-2">
                <Text className="font-bold text-slate-900 text-xs">{p.name}</Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">{p.sold}</Text>
              </View>

              <View className="items-end">
                <Text className="font-bold text-slate-900 text-xs">{p.amount}</Text>
                <Text className={`font-bold text-[9px] ${p.isRed ? 'text-red-500' : 'text-green-600'}`}>{p.trend}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* 4. Low Performing Products & Stock Alert Cards (Stacked Vertically Below) */}
        <View className="mx-6 gap-6 mb-6">
          {/* Low Performing Products Card */}
          <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-bold text-slate-900 text-base">Low Performing Products</Text>
              <Pressable className="flex-row items-center">
                <Text className="text-primary font-bold text-xs mr-1">View All</Text>
                <ChevronRight size={14} color="#4F26D9" />
              </Pressable>
            </View>

            {LOW_PRODUCTS.map((p) => (
              <View key={p.rank} className="flex-row items-center py-2.5 border-b border-slate-50">
                <View className="w-5 h-5 bg-purple-100 rounded-full items-center justify-center mr-2">
                  <Text className="text-primary font-bold text-[9px]">{p.rank}</Text>
                </View>

                <View className="w-9 h-9 bg-slate-50 rounded-xl items-center justify-center mr-3 border border-slate-100">
                  <Text className="text-base">{p.emoji}</Text>
                </View>

                <View className="flex-1 pr-2">
                  <Text className="font-bold text-slate-900 text-xs">{p.name}</Text>
                  <Text className="text-slate-400 text-[10px] mt-0.5">{p.sold}</Text>
                </View>

                <View className="items-end">
                  <Text className="font-bold text-slate-900 text-xs">{p.amount}</Text>
                  <Text className="font-bold text-red-500 text-[9px]">{p.trend}</Text>
                </View>
              </View>
            ))}
          </View>

          {/* Stock Alert Card (Stacked Vertically Below) */}
          <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
            <View className="flex-row justify-between items-center mb-3">
              <Text className="font-bold text-slate-900 text-base">Stock Alert</Text>
              <Pressable onPress={() => router.push('/products/inventory')} className="flex-row items-center">
                <Text className="text-primary font-bold text-xs mr-1">View All</Text>
                <ChevronRight size={14} color="#4F26D9" />
              </Pressable>
            </View>

            {STOCK_ALERTS.map((item, i) => (
              <View key={i} className="flex-row items-center justify-between py-2.5 border-b border-slate-50">
                <View className="flex-row items-center flex-1 pr-2">
                  <View className="w-9 h-9 bg-slate-50 rounded-xl items-center justify-center mr-3 border border-slate-100">
                    <Text className="text-base">{item.emoji}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-slate-900 text-xs" numberOfLines={1}>{item.name}</Text>
                    <View className={`self-start px-2 py-0.5 rounded-full mt-1 ${item.color.split(' ')[1]}`}>
                      <Text className={`text-[9px] font-bold ${item.color.split(' ')[0]}`}>{item.status}</Text>
                    </View>
                  </View>
                </View>
                <ChevronRight size={16} color="#cbd5e1" />
              </View>
            ))}
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

function PerfCard({ label, value, trend, icon: Icon, bg, iconColor }: any) {
  return (
    <View className="w-[48%] bg-white border border-slate-100 p-3.5 rounded-[28px] shadow-sm">
      <View className={`w-8 h-8 ${bg} rounded-xl items-center justify-center mb-2`}>
        <Icon size={16} color={iconColor} />
      </View>
      <Text className="text-slate-400 text-[9px] font-bold uppercase">{label}</Text>
      <Text className="text-base font-bold text-slate-900 mt-0.5" numberOfLines={1}>{value}</Text>
      <Text className="text-green-600 text-[8px] font-bold mt-0.5" numberOfLines={1}>{trend}</Text>
    </View>
  );
}