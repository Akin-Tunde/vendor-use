import { AlertTriangle, CheckCircle, Filter, MoreVertical, Package, PauseCircle, Plus, Search } from 'lucide-react-native';
import { Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from 'react-native';

const PRODUCTS = [
    { name: 'Fresh Banana', category: 'Fruits', price: '₦1,200', stock: '45', status: 'Active', image: '🍌' },
    { name: 'Red Apple', category: 'Fruits', price: '₦1,500', stock: '32', status: 'Active', image: '🍎' },
    { name: 'Irish Potatoes', category: 'Vegetables', price: '₦1,000', stock: '5', status: 'Low Stock', image: '🥔' },
    { name: 'Power Oil (1L)', category: 'Groceries', price: '₦1,900', stock: '0', status: 'Out of Stock', image: '🛢️' },
];

export default function ProductsScreen() {
    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 py-4 flex-row justify-between items-center">
                <View>
                    <Text className="text-2xl font-bold text-slate-900">Manage Products</Text>
                    <Text className="text-slate-400 text-xs">Add, edit and manage products in your store</Text>
                </View>
                <View className="flex-row items-center space-x-2">
                    <Pressable className="w-10 h-10 bg-slate-50 rounded-xl items-center justify-center border border-slate-100">
                        <Search size={20} color="#64748b" />
                    </Pressable>
                    <Pressable className="bg-primary flex-row items-center px-4 h-10 rounded-xl">
                        <Plus size={18} color="white" />
                        <Text className="text-white font-bold text-xs ml-1">Add Product</Text>
                    </Pressable>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Stats Grid */}
                <View className="px-6 mt-4">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
                        <SummaryCard label="Total Products" value="128" icon={Package} color="text-primary" />
                        <SummaryCard label="Active" value="112" icon={CheckCircle} color="text-green-500" />
                        <SummaryCard label="Inactive" value="10" icon={PauseCircle} color="text-orange-500" />
                        <SummaryCard label="Out of Stock" value="6" icon={AlertTriangle} color="text-red-500" />
                    </ScrollView>
                </View>

                {/* Category Chips */}
                <View className="px-6 mt-6">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-2">
                        <Chip label="All" active />
                        <Chip label="Groceries" />
                        <Chip label="Fruits" />
                        <Chip label="Vegetables" />
                        <Chip label="Drinks" />
                    </ScrollView>
                </View>

                {/* Search & Filter Row */}
                <View className="px-6 mt-6 flex-row space-x-2">
                    <View className="flex-1 bg-slate-50 h-12 rounded-2xl flex-row items-center px-4 border border-slate-100">
                        <Search size={18} color="#94a3b8" />
                        <TextInput placeholder="Search products..." className="flex-1 ml-2 text-sm" />
                    </View>
                    <Pressable className="bg-white border border-slate-200 px-4 rounded-2xl flex-row items-center">
                        <Filter size={18} color="#64748b" />
                        <Text className="ml-2 font-bold text-slate-700 text-xs">Filter</Text>
                    </Pressable>
                </View>

                {/* Product List */}
                <View className="px-6 mt-6 pb-10">
                    {PRODUCTS.map((p, i) => (
                        <View key={i} className="flex-row items-center py-4 border-b border-slate-50">
                            <View className="w-16 h-16 bg-slate-50 rounded-2xl items-center justify-center mr-4">
                                <Text className="text-3xl">{p.image}</Text>
                            </View>
                            <View className="flex-1">
                                <Text className="font-bold text-slate-900 text-base">{p.name}</Text>
                                <Text className="text-slate-400 text-xs mt-0.5">{p.category}</Text>
                                <View className={`self-start px-2 py-0.5 rounded mt-2 ${p.status === 'Active' ? 'bg-green-100' : p.status === 'Low Stock' ? 'bg-orange-100' : 'bg-red-100'
                                    }`}>
                                    <Text className={`text-[8px] font-bold ${p.status === 'Active' ? 'text-green-700' : p.status === 'Low Stock' ? 'text-orange-700' : 'text-red-700'
                                        }`}>{p.status}</Text>
                                </View>
                            </View>
                            <View className="items-end">
                                <Text className="font-bold text-slate-900">{p.price}</Text>
                                <Text className="text-slate-400 text-[10px] mt-1">In Stock ({p.stock})</Text>
                                <Pressable className="mt-2">
                                    <MoreVertical size={16} color="#94a3b8" />
                                </Pressable>
                            </View>
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function SummaryCard({ label, value, icon: Icon, color }: any) {
    return (
        <View className="bg-white border border-slate-100 p-4 rounded-3xl w-32 shadow-sm">
            <Icon size={20} className={color} />
            <Text className="text-slate-400 text-[10px] font-bold mt-3 uppercase">{label}</Text>
            <Text className="text-xl font-bold text-slate-900 mt-1">{value}</Text>
        </View>
    );
}

function Chip({ label, active }: any) {
    return (
        <Pressable className={`px-4 py-2 rounded-xl border ${active ? 'bg-primary border-primary' : 'bg-white border-slate-100'}`}>
            <Text className={`text-xs font-bold ${active ? 'text-white' : 'text-slate-600'}`}>{label}</Text>
        </Pressable>
    );
}