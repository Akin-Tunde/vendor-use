import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Plus, Search, Filter, FolderKanban, 
  CheckCircle2, Package, EyeOff, GripVertical, 
  ChevronRight, MoreVertical, X, LayoutGrid
} from 'lucide-react-native';

const CATEGORIES = [
  { id: '1', name: 'Groceries & Staples', count: '543', status: 'Active', icon: '🛒', isHidden: false },
  { id: '2', name: 'Fruits & Vegetables', count: '312', status: 'Active', icon: '🥦', isHidden: false },
  { id: '3', name: 'Meat, Poultry & Fish', count: '198', status: 'Active', icon: '🥩', isHidden: false },
  { id: '4', name: 'Dairy & Eggs', count: '156', status: 'Active', icon: '🥛', isHidden: false },
  { id: '5', name: 'Snacks & Beverages', count: '487', status: 'Active', icon: '🍿', isHidden: false },
  { id: '6', name: 'Personal Care', count: '215', status: 'Active', icon: '🧴', isHidden: false },
  { id: '7', name: 'Home & Cleaning', count: '134', status: 'Hidden', icon: '🧹', isHidden: true },
  { id: '8', name: 'Baby Care', count: '100', status: 'Hidden', icon: '🍼', isHidden: true },
];

export default function CategoriesListScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Product Categories</Text>
            <Text className="text-slate-400 text-xs">Organize your products with categories</Text>
          </View>
        </View>

        <Pressable 
          onPress={() => router.push('/products/categories/add')}
          className="bg-primary px-4 py-2.5 rounded-2xl flex-row items-center shadow-lg shadow-primary/30"
        >
          <Plus size={16} color="white" className="mr-1" />
          <Text className="text-white font-bold text-xs">Add Category</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Banner */}
        <View className="mx-6 mt-4 bg-purple-50/60 border border-purple-100 p-4 rounded-3xl flex-row items-center justify-between">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
              <FolderKanban size={20} color="#4F26D9" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-800 text-xs leading-4">
                Well organized categories help customers find your products easily.
              </Text>
              <Text className="text-primary font-bold text-xs mt-1">Learn More &gt;</Text>
            </View>
          </View>
          <View className="w-12 h-12 bg-purple-200/50 rounded-2xl items-center justify-center">
            <Text className="text-xl">📦</Text>
          </View>
        </View>

        {/* Search & Filter */}
        <View className="px-6 mt-4 flex-row space-x-3">
          <View className="flex-1 bg-white border border-slate-100 h-12 rounded-2xl flex-row items-center px-4 shadow-sm">
            <Search size={18} color="#94a3b8" />
            <TextInput placeholder="Search categories..." className="flex-1 ml-2 text-xs text-slate-900" />
          </View>
          <Pressable className="bg-white border border-slate-100 h-12 px-4 rounded-2xl flex-row items-center shadow-sm">
            <Filter size={16} color="#64748b" className="mr-1.5" />
            <Text className="text-slate-700 font-bold text-xs">Filter</Text>
          </Pressable>
        </View>

        {/* Category Stats Grid */}
        <View className="flex-row px-6 mt-4 space-x-2">
          <StatBox icon={LayoutGrid} label="Total Categories" value="12" />
          <StatBox icon={CheckCircle2} label="Active Categories" value="10" iconColor="#22c55e" />
          <StatBox icon={Package} label="Products" value="2,145" iconColor="#f59e0b" />
          <StatBox icon={EyeOff} label="Hidden Categories" value="2" iconColor="#ef4444" />
        </View>

        {/* Categories List */}
        <View className="px-6 mt-6 pb-20 space-y-3">
          {CATEGORIES.map((cat) => (
            <View key={cat.id} className="bg-white border border-slate-100 p-4 rounded-3xl flex-row items-center shadow-sm">
              <GripVertical size={18} color="#cbd5e1" className="mr-2" />

              <View className="w-12 h-12 bg-purple-50 rounded-2xl items-center justify-center mr-3">
                <Text className="text-xl">{cat.icon}</Text>
              </View>

              <View className="flex-1">
                <Text className="font-bold text-slate-900 text-sm">{cat.name}</Text>
                <Text className="text-slate-400 text-[11px] mt-0.5">
                  {cat.count} products • <Text className={cat.isHidden ? 'text-amber-600 font-medium' : 'text-green-600 font-medium'}>{cat.status}</Text>
                </Text>
              </View>

              <View className={`px-2.5 py-1 rounded-full mr-2 ${cat.isHidden ? 'bg-amber-100' : 'bg-green-100'}`}>
                <Text className={`text-[10px] font-bold ${cat.isHidden ? 'text-amber-800' : 'text-green-700'}`}>{cat.status}</Text>
              </View>

              <ChevronRight size={18} color="#cbd5e1" className="mr-1" />
              <Pressable className="p-1">
                <MoreVertical size={18} color="#94a3b8" />
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Floating Drag & Drop Bar */}
      <View className="mx-6 mb-4 bg-purple-50 border border-purple-100 p-3 rounded-2xl flex-row items-center justify-between">
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