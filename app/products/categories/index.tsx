import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  EyeOff,
  Filter, FolderKanban,
  GripVertical,
  LayoutGrid,
  MoreVertical,
  Package,
  Plus, Search,
  X
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CATEGORIES = [
  { id: '1', name: 'Groceries & Staples', count: '543', status: 'Active', icon: '🧺', isHidden: false, iconBg: 'bg-purple-100' },
  { id: '2', name: 'Fruits & Vegetables', count: '312', status: 'Active', icon: '🥕', isHidden: false, iconBg: 'bg-green-100' },
  { id: '3', name: 'Meat, Poultry & Fish', count: '198', status: 'Active', icon: '🥩', isHidden: false, iconBg: 'bg-red-100' },
  { id: '4', name: 'Dairy & Eggs', count: '156', status: 'Active', icon: '🥛', isHidden: false, iconBg: 'bg-blue-100' },
  { id: '5', name: 'Snacks & Beverages', count: '487', status: 'Active', icon: '🍿', isHidden: false, iconBg: 'bg-orange-100' },
  { id: '6', name: 'Personal Care', count: '215', status: 'Active', icon: '🧴', isHidden: false, iconBg: 'bg-pink-100' },
  { id: '7', name: 'Home & Cleaning', count: '134', status: 'Hidden', icon: '🧹', isHidden: true, iconBg: 'bg-amber-100' },
  { id: '8', name: 'Baby Care', count: '100', status: 'Hidden', icon: '🍼', isHidden: true, iconBg: 'bg-teal-100' },
];

export default function CategoriesListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center mr-3 active:bg-purple-50"
          >
            <ArrowLeft size={20} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Product Categories</Text>
            <Text className="text-slate-400 text-xs">Organize your products with categories</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/products/categories/add')}
          className="bg-primary px-4 py-2.5 rounded-xl flex-row items-center shadow-md shadow-primary/30 active:bg-primary/90"
        >
          <Plus size={16} color="white" className="mr-1" />
          <Text className="text-white font-bold text-xs">Add Category</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Helper Banner Card */}
       

        {/* Search & Filter Bar */}
        <View className="px-6 mt-4 flex-row space-x-3">
          <View className="flex-1 bg-white border border-slate-100 h-11 rounded-2xl flex-row items-center px-4 shadow-sm">
            <Search size={16} color="#94a3b8" />
            <TextInput placeholder="Search categories..." className="flex-1 ml-2 text-xs text-slate-900" />
          </View>
          <Pressable className="bg-white border border-slate-100 h-11 px-4 rounded-2xl flex-row items-center shadow-sm">
            <Filter size={14} color="#64748b" className="mr-1.5" />
            <Text className="text-slate-700 font-bold text-xs">Filter</Text>
          </Pressable>
        </View>

        {/* Category Metric Grid */}
        <View className="flex-row px-6 mt-4 space-x-2">
          <StatBox icon={LayoutGrid} label="Total Categories" value="12" />
          <StatBox icon={CheckCircle2} label="Active Categories" value="10" iconColor="#22c55e" />
          <StatBox icon={Package} label="Products" value="2,145" iconColor="#f59e0b" />
          <StatBox icon={EyeOff} label="Hidden Categories" value="2" iconColor="#ef4444" />
        </View>

        {/* Categories List */}
        <View className="px-6 mt-5 pb-20 space-y-2.5">
          {CATEGORIES.map((cat) => (
            <View key={cat.id} className="bg-white border border-slate-100 p-3.5 rounded-2xl flex-row items-center shadow-sm">
              <GripVertical size={16} color="#cbd5e1" className="mr-2" />

              <View className={`w-11 h-11 ${cat.iconBg} rounded-2xl items-center justify-center mr-3`}>
                <Text className="text-lg">{cat.icon}</Text>
              </View>

              <View className="flex-1">
                <Text className="font-bold text-slate-900 text-sm">{cat.name}</Text>
                <Text className="text-slate-400 text-[11px] mt-0.5">
                  {cat.count} products • <Text className={cat.isHidden ? 'text-amber-600 font-medium' : 'text-green-600 font-medium'}>{cat.status}</Text>
                </Text>
              </View>

              <View className={`px-2.5 py-0.5 rounded-full mr-2 ${cat.isHidden ? 'bg-amber-100' : 'bg-green-100'}`}>
                <Text className={`text-[9px] font-bold ${cat.isHidden ? 'text-amber-800' : 'text-green-700'}`}>{cat.status}</Text>
              </View>

              <ChevronRight size={16} color="#cbd5e1" className="mr-1" />
              <Pressable className="p-1">
                <MoreVertical size={16} color="#94a3b8" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Drag & Drop Bottom Bar */}
      <View className="mx-6 mb-4 bg-purple-50 border border-purple-100 p-3 rounded-2xl flex-row items-center justify-between shadow-sm">
        <View className="flex-row items-center">
          <GripVertical size={16} color="#4F26D9" className="mr-2" />
          <Text className="text-slate-700 text-xs font-medium">
            <Text className="font-bold">Drag and drop</Text> categories to change the order
          </Text>
        </View>
        <Pressable className="p-1">
          <X size={16} color="#64748b" />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function StatBox({ icon: Icon, label, value, iconColor = "#4F26D9" }: any) {
  return (
    <View className="flex-1 bg-white border border-slate-100 p-2.5 rounded-2xl items-start shadow-sm">
      <Icon size={16} color={iconColor} className="mb-1" />
      <Text className="text-slate-900 font-bold text-sm">{value}</Text>
      <Text className="text-slate-400 text-[8px] font-bold mt-0.5 uppercase" numberOfLines={1}>{label}</Text>
    </View>
  );
}