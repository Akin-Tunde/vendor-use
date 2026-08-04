import { useRouter } from 'expo-router';
import {
  AlertTriangle,
  ArrowLeft,
  ArrowUpDown,
  Bell,
  CheckCircle2,
  ChevronRight,
  Edit3,
  Filter,
  Grid,
  MoreVertical,
  Package,
  Scan,
  Search,
  Tag,
  Upload,
  XCircle
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const INVENTORY_ITEMS = [
  {
    id: '1',
    name: 'Mama Gold Parboiled Rice 50kg',
    sku: 'RICE-001',
    category: 'Food & Groceries',
    status: 'In Stock',
    quantity: '120',
    unit: 'bags',
    min: '20',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    qtyColor: 'text-green-600',
    emoji: '🌾'
  },
  {
    id: '2',
    name: 'Power Oil 1L',
    sku: 'OIL-001',
    category: 'Food & Groceries',
    status: 'In Stock',
    quantity: '35',
    unit: 'units',
    min: '10',
    badgeBg: 'bg-green-100',
    badgeText: 'text-green-700',
    qtyColor: 'text-green-600',
    emoji: '🛢️'
  },
  {
    id: '3',
    name: 'Farmfresh Eggs (30pcs)',
    sku: 'EGG-001',
    category: 'Food & Groceries',
    status: 'Low Stock',
    quantity: '8',
    unit: 'trays',
    min: '15',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    qtyColor: 'text-amber-600',
    emoji: '🥚'
  },
  {
    id: '4',
    name: 'Indomie Instant Noodles 70g',
    sku: 'IND-001',
    category: 'Food & Groceries',
    status: 'Out of Stock',
    quantity: '0',
    unit: 'pcs',
    min: '20',
    badgeBg: 'bg-red-100',
    badgeText: 'text-red-700',
    qtyColor: 'text-red-600',
    emoji: '🍜'
  },
  {
    id: '5',
    name: 'Coca Cola 50cl',
    sku: 'COKE-001',
    category: 'Drinks & Beverages',
    status: 'Low Stock',
    quantity: '5',
    unit: 'bottles',
    min: '12',
    badgeBg: 'bg-amber-100',
    badgeText: 'text-amber-800',
    qtyColor: 'text-amber-600',
    emoji: '🥤'
  }
];

export default function InventoryManagementScreen() {
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
            <Text className="text-xl font-bold text-slate-900">Inventory Management</Text>
            <Text className="text-slate-400 text-xs">Manage your stock levels and availability</Text>
          </View>
        </View>

        <View className="flex-row items-center">
          <Pressable className="items-center mr-3">
            <View className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
              <Scan size={18} color="#000" />
            </View>
            <Text className="text-[10px] text-slate-500 mt-1 font-medium">Scan</Text>
          </Pressable>
          <Pressable className="items-center">
            <View className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
              <Filter size={18} color="#000" />
            </View>
            <Text className="text-[10px] text-slate-500 mt-1 font-medium">Filter</Text>
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Metric Summary Cards Bar */}
        <View className="px-6 mt-4">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <MetricCard
              icon={Package}
              value="256"
              label="Total Products"
              sub="All products"
              iconBg="bg-purple-100"
              iconColor="#4F26D9"
              style="mr-3"
            />
            <MetricCard
              icon={CheckCircle2}
              value="186"
              label="In Stock"
              sub="Well stocked"
              color="text-green-600"
              iconBg="bg-green-100"
              iconColor="#22c55e"
              style="mr-3"
            />
            <MetricCard
              icon={AlertTriangle}
              value="42"
              label="Low Stock"
              sub="Reorder soon"
              color="text-amber-600"
              iconBg="bg-amber-100"
              iconColor="#f59e0b"
              style="mr-3"
            />
            <MetricCard
              icon={XCircle}
              value="28"
              label="Out of Stock"
              sub="Restock now"
              color="text-red-600"
              iconBg="bg-red-100"
              iconColor="#ef4444"
            />
          </ScrollView>
        </View>

        {/* Low Stock Alert Banner */}
        <View className="mx-6 mt-4 bg-amber-50/80 border border-amber-200/60 p-4 rounded-3xl flex-row items-center justify-between shadow-sm">
          <View className="flex-row items-center flex-1 pr-2">
            <View className="w-10 h-10 bg-amber-500 rounded-2xl items-center justify-center mr-3 shadow-sm">
              <Bell size={20} color="white" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-amber-900 text-sm">Low Stock Alert</Text>
              <Text className="text-amber-800/80 text-xs mt-0.5">You have 42 products that are running low on stock.</Text>
            </View>
          </View>
          <Pressable className="bg-amber-100/80 border border-amber-200/80 px-3 py-1.5 rounded-xl flex-row items-center">
            <Text className="text-amber-900 font-bold text-xs mr-1">View All</Text>
            <ChevronRight size={14} color="#78350f" />
          </Pressable>
        </View>

        {/* Search & Sort Action Row */}
        <View className="px-6 mt-4 flex-row">
          <View className="flex-1 bg-white border border-slate-100 h-11 rounded-2xl flex-row items-center px-4 shadow-sm mr-3">
            <Search size={16} color="#94a3b8" />
            <TextInput placeholder="Search products..." className="flex-1 ml-2 text-xs text-slate-900" />
          </View>
          <Pressable className="bg-white border border-slate-100 h-11 px-4 rounded-2xl flex-row items-center shadow-sm">
            <ArrowUpDown size={14} color="#4F26D9" className="mr-1.5" />
            <Text className="text-primary font-bold text-xs">Sort</Text>
          </Pressable>
        </View>

        {/* Filter Pills */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-6 mt-4">
          <ActionPill icon={Edit3} label="Update Stock" style="mr-2" />
          <ActionPill icon={Grid} label="Bulk Update" style="mr-2" />
          <ActionPill icon={AlertTriangle} label="Low Stock" active iconColor="#f59e0b" style="mr-2" />
          <ActionPill icon={Upload} label="Export" />
        </ScrollView>

        {/* Product Inventory List Card */}
        <View className="mx-6 mt-5 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm mb-12">
          <View className="flex-row justify-between items-center mb-3 px-1">
            <Text className="font-bold text-slate-900 text-base">Product Inventory</Text>
            <Text className="text-slate-400 text-xs font-medium">256 products</Text>
          </View>

          <View>
            {INVENTORY_ITEMS.map((item) => (
              <View key={item.id} className="py-3 border-b border-slate-50 flex-row items-center">
                <View className="w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center mr-3 border border-slate-100">
                  <Text className="text-2xl">{item.emoji}</Text>
                </View>

                <View className="flex-1 pr-2">
                  <Text className="font-bold text-slate-900 text-sm" numberOfLines={1}>{item.name}</Text>
                  <Text className="text-slate-400 text-[11px] mt-0.5">SKU: {item.sku}</Text>
                  <View className="flex-row items-center mt-1">
                    <Tag size={10} color="#94a3b8" className="mr-1" />
                    <Text className="text-slate-400 text-[10px] font-medium">{item.category}</Text>
                  </View>
                </View>

                <View className="items-end mr-3">
                  <View className={`px-2 py-0.5 rounded-full mb-1 ${item.badgeBg}`}>
                    <Text className={`text-[9px] font-bold ${item.badgeText}`}>{item.status}</Text>
                  </View>
                  <Text className={`font-bold text-base ${item.qtyColor}`}>
                    {item.quantity} <Text className="text-slate-400 text-xs font-normal">{item.unit}</Text>
                  </Text>
                  <Text className="text-slate-400 text-[10px] mt-0.5">Min: {item.min}</Text>
                </View>

                <Pressable className="p-1">
                  <MoreVertical size={16} color="#94a3b8" />
                </Pressable>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MetricCard({ icon: Icon, value, label, sub, color = "text-slate-900", iconBg, iconColor, style = "" }: any) {
  return (
    <View className={`w-32 bg-white border border-slate-100 p-3.5 rounded-3xl shadow-sm ${style}`}>
      <View className={`w-8 h-8 ${iconBg} rounded-xl items-center justify-center mb-2`}>
        <Icon size={16} color={iconColor} />
      </View>
      <Text className="text-2xl font-bold text-slate-900">{value}</Text>
      <Text className={`text-[11px] font-bold mt-0.5 ${color}`}>{label}</Text>
      <Text className="text-slate-400 text-[9px] mt-0.5">{sub}</Text>
    </View>
  );
}

function ActionPill({ icon: Icon, label, active, iconColor = "#4F26D9", style = "" }: any) {
  return (
    <Pressable className={`flex-row items-center px-4 py-2 rounded-2xl border ${active ? 'bg-amber-50 border-amber-200' : 'bg-white border-slate-100 shadow-sm'} ${style}`}>
      <Icon size={14} color={iconColor} className="mr-2" />
      <Text className={`text-xs font-bold ${active ? 'text-amber-900' : 'text-slate-700'}`}>{label}</Text>
    </Pressable>
  );
}