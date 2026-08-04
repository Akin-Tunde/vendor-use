import { useRouter } from 'expo-router';
import {
    ArrowUpDown,
    Boxes,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Filter,
    FolderKanban,
    MoreVertical,
    Package,
    PauseCircle,
    Plus,
    Search,
    Tag
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PRODUCTS = [
    { name: 'Fresh Banana', category: 'Fruits', price: '₦1,200', stock: 'In Stock (45)', status: 'Active', image: '🍌' },
    { name: 'Red Apple', category: 'Fruits', price: '₦1,500', stock: 'In Stock (32)', status: 'Active', image: '🍎' },
    { name: 'Orange', category: 'Fruits', price: '₦800', stock: 'In Stock (50)', status: 'Active', image: '🍊' },
    { name: 'Green Grapes', category: 'Fruits', price: '₦2,500', stock: 'In Stock (20)', status: 'Active', image: '🍇' },
    { name: 'Irish Potatoes', category: 'Vegetables', price: '₦1,000', stock: 'In Stock (5)', status: 'Low Stock', image: '🥔' },
    { name: "Mama's Pride Rice (10kg)", category: 'Groceries', price: '₦8,500', stock: 'In Stock (18)', status: 'Active', image: '🌾' },
    { name: 'Power Oil (1L)', category: 'Groceries', price: '₦1,900', stock: 'Out of Stock', status: 'Out of Stock', image: '🛢️' },
];

export default function ProductsScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FE]">
            {/* Top Header */}
            <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50">
                <View>
                    <Text className="text-2xl font-bold text-slate-900">Manage Products</Text>
                    <Text className="text-slate-400 text-xs">Add, edit and manage products in your store</Text>
                </View>

                <Pressable
                    onPress={() => router.push('/products/add')}
                    className="bg-primary flex-row items-center px-4 h-10 rounded-2xl shadow-md shadow-primary/30"
                >
                    <Plus size={18} color="white" />
                    <Text className="text-white font-bold text-xs ml-1">Add Product</Text>
                </Pressable>
            </View>
            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* 1. Quick Management Shortcuts (Inventory & Categories) */}
                <View className="px-6 mt-4 flex-row">
                    <Pressable
                        onPress={() => router.push('/products/inventory')}
                        className="flex-1 bg-purple-50 border border-purple-100 p-3.5 rounded-3xl flex-row items-center shadow-sm mr-3"
                    >
                        <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
                            <Boxes size={20} color="#4F26D9" />
                        </View>
                        <View>
                            <Text className="font-bold text-slate-900 text-xs">Inventory</Text>
                            <Text className="text-slate-400 text-[9px] mt-0.5">Stock & alerts</Text>
                        </View>
                    </Pressable>

                    <Pressable
                        onPress={() => router.push('../products/categories')}
                        className="flex-1 bg-blue-50 border border-blue-100 p-3.5 rounded-3xl flex-row items-center shadow-sm"
                    >
                        <View className="w-10 h-10 bg-blue-500/10 rounded-2xl items-center justify-center mr-3">
                            <FolderKanban size={20} color="#3b82f6" />
                        </View>
                        <View>
                            <Text className="font-bold text-slate-900 text-xs">Categories</Text>
                            <Text className="text-slate-400 text-[9px] mt-0.5">Manage groups</Text>
                        </View>
                    </Pressable>
                </View>

                {/* 2x2 Summary Grid */}
                <View className="px-6 mt-4">
                    <View className="flex-row flex-wrap justify-between gap-y-3">
                        <SummaryCard label="Total Products" value="128" sub="All products" icon={Package} bg="bg-purple-100" iconColor="#4F26D9" />
                        <SummaryCard label="Active" value="112" sub="Published" icon={CheckCircle} bg="bg-green-100" iconColor="#22c55e" />
                        <SummaryCard label="Inactive" value="10" sub="Not published" icon={PauseCircle} bg="bg-amber-100" iconColor="#f59e0b" />
                        <SummaryCard label="Out of Stock" value="6" sub="Unavailable" icon={Tag} bg="bg-blue-100" iconColor="#3b82f6" />
                    </View>
                </View>

                {/* 2. Search, Filter & Sort Action Row */}
                <View className="px-6 mt-4 flex-row">
                    <View className="flex-1 bg-white border border-slate-100 h-11 rounded-2xl flex-row items-center px-3 shadow-sm mr-2">
                        <Search size={16} color="#94a3b8" />
                        <TextInput placeholder="Search products..." className="flex-1 ml-2 text-xs text-slate-900" />
                    </View>

                    <Pressable className="bg-white border border-slate-100 px-3.5 h-11 rounded-2xl flex-row items-center shadow-sm mr-2">
                        <Filter size={14} color="#64748b" className="mr-1.5" />
                        <Text className="font-bold text-slate-700 text-xs">Filter</Text>
                    </Pressable>

                    <Pressable className="bg-white border border-slate-100 px-3.5 h-11 rounded-2xl flex-row items-center shadow-sm">
                        <ArrowUpDown size={14} color="#64748b" className="mr-1.5" />
                        <Text className="font-bold text-slate-700 text-xs">Sort</Text>
                    </Pressable>
                </View>

                {/* 3. Product List Card */}
                <View className="mx-3 mt-4 bg-white border border-slate-100 rounded-[32px] p-4 shadow-sm">
                    {PRODUCTS.map((p, i) => (
                        <View key={i} className="flex-row items-center py-3 border-b border-slate-50">
                            <View className="w-14 h-14 bg-slate-50 rounded-2xl items-center justify-center mr-3 border border-slate-100">
                                <Text className="text-2xl">{p.image}</Text>
                            </View>

                            <View className="flex-1 pr-2">
                                <Text className="font-bold text-slate-900 text-sm">{p.name}</Text>
                                <Text className="text-slate-400 text-[11px] mt-0.5">{p.category}</Text>
                                <View className={`self-start px-2 py-0.5 rounded-md mt-1 ${p.status === 'Active' ? 'bg-green-100' : p.status === 'Low Stock' ? 'bg-amber-100' : 'bg-red-100'
                                    }`}>
                                    <Text className={`text-[9px] font-bold ${p.status === 'Active' ? 'text-green-700' : p.status === 'Low Stock' ? 'text-amber-800' : 'text-red-700'
                                        }`}>{p.status}</Text>
                                </View>
                            </View>

                            <View className="items-end mr-2">
                                <Text className="font-bold text-slate-900 text-sm">{p.price}</Text>
                                <Text className={`text-[10px] mt-0.5 font-medium ${p.status === 'Out of Stock' ? 'text-red-500 font-bold' : 'text-slate-400'}`}>
                                    {p.stock}
                                </Text>
                            </View>

                            <Pressable className="p-1">
                                <MoreVertical size={16} color="#94a3b8" />
                            </Pressable>
                        </View>
                    ))}

                    {/* Pagination Bar */}
                    <View className="flex-row justify-between items-center pt-4 mt-2 border-t border-slate-50">
                        <Text className="text-slate-400 text-[10px] font-medium">Showing 1 to 10 of 128 products</Text>

                        <View className="flex-row items-center">
                            <Pressable className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 items-center justify-center mr-1">
                                <ChevronLeft size={14} color="#64748b" />
                            </Pressable>
                            <Pressable className="w-7 h-7 rounded-lg bg-primary items-center justify-center mr-1">
                                <Text className="text-white font-bold text-xs">1</Text>
                            </Pressable>
                            <Pressable className="w-7 h-7 rounded-lg bg-slate-50 items-center justify-center mr-1">
                                <Text className="text-slate-600 text-xs font-bold">2</Text>
                            </Pressable>
                            <Pressable className="w-7 h-7 rounded-lg bg-slate-50 items-center justify-center mr-1">
                                <Text className="text-slate-600 text-xs font-bold">3</Text>
                            </Pressable>
                            <Text className="text-slate-400 text-xs mr-1">...</Text>
                            <Pressable className="w-7 h-7 rounded-lg bg-slate-50 items-center justify-center mr-1">
                                <Text className="text-slate-600 text-xs font-bold">13</Text>
                            </Pressable>
                            <Pressable className="w-7 h-7 rounded-lg bg-slate-50 border border-slate-100 items-center justify-center">
                                <ChevronRight size={14} color="#64748b" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                <View className="h-12" />
            </ScrollView>
        </SafeAreaView>
    );
}

function SummaryCard({ label, value, sub, icon: Icon, bg, iconColor }: any) {
    return (
        <View className="bg-white border border-slate-100 p-3.5 rounded-3xl w-[48%] shadow-sm">
            <View className={`w-8 h-8 ${bg} rounded-xl items-center justify-center mb-2`}>
                <Icon size={16} color={iconColor} />
            </View>
            <Text className="text-slate-400 text-[9px] font-bold uppercase">{label}</Text>
            <Text className="text-lg font-bold text-slate-900 mt-0.5">{value}</Text>
            <Text className="text-slate-400 text-[9px] mt-0.5">{sub}</Text>
        </View>
    );
}