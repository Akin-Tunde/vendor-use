// app/(tabs)/index.tsx
import React from 'react';
import { View, Text, ScrollView, Pressable, Image, SafeAreaView } from 'react-native';
// ADD 'Users' TO THIS LIST BELOW:
import { 
  Menu, Bell, Store, ExternalLink, ChevronRight, 
  PlusCircle, Package, ReceiptText, Percent, Wallet, Users 
} from 'lucide-react-native';

export default function Dashboard() {
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Top Header */}
      <View className="px-6 py-4 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Menu size={24} color="#4F26D9" />
          <View className="ml-4">
            <Text className="text-xl font-bold text-primary">useMarket</Text>
            <View className="bg-primary/10 px-2 py-0.5 rounded self-start">
               <Text className="text-[10px] font-bold text-primary">Vendor</Text>
            </View>
          </View>
        </View>
        <View className="flex-row items-center space-x-4">
          <View className="relative">
            <Bell size={24} color="#4F26D9" />
            <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full items-center justify-center">
              <Text className="text-[10px] text-white font-bold">3</Text>
            </View>
          </View>
          <View className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-green-500">
             <Image source={{ uri: 'https://avatar.iran.liara.run/public/31' }} className="w-full h-full" />
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Store Header Card */}
        <View className="px-6 py-4">
          <View className="flex-row items-center">
            <View className="w-16 h-16 bg-green-800 rounded-xl items-center justify-center mr-4">
               <Store color="white" size={32} />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center">
                <Text className="text-lg font-bold text-slate-900 mr-1">GreenMart Supermarket</Text>
                <View className="bg-primary rounded-full p-0.5">
                   <Text className="text-[8px] text-white">✓</Text>
                </View>
              </View>
              <View className="flex-row items-center mt-1">
                 <View className="bg-green-100 px-2 py-0.5 rounded-md mr-2">
                    <Text className="text-green-700 text-[10px] font-bold">Open</Text>
                 </View>
                 <Text className="text-slate-400 text-xs">Closes at 10:00 PM</Text>
              </View>
              <View className="flex-row items-center mt-1">
                 <ExternalLink size={12} color="#94a3b8" />
                 <Text className="text-slate-400 text-xs ml-1">Ikeja, Lagos State</Text>
              </View>
            </View>
            <Pressable className="border border-slate-200 px-3 py-2 rounded-xl">
               <Text className="text-primary font-bold text-xs">View Store</Text>
            </Pressable>
          </View>
        </View>

        {/* Overview Stats */}
        <View className="px-6 mt-4">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="text-lg font-bold text-slate-900">Overview</Text>
            <Pressable className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-100">
               <Text className="text-xs text-slate-600 mr-2">Today</Text>
               <ChevronRight size={14} color="#94a3b8" className="rotate-90" />
            </Pressable>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-4">
            <StatCard title="Total Orders" value="24" trend="+ 20%" icon={Package} color="bg-purple-50" />
            <StatCard title="Total Sales" value="₦158,450" trend="+ 18%" icon={Wallet} color="bg-green-50" />
            <StatCard title="New Customers" value="12" trend="+ 9%" icon={Users} color="bg-orange-50" />
          </ScrollView>
        </View>

        {/* Quick Actions */}
        <View className="px-6 mt-8">
          <Text className="text-lg font-bold text-slate-900 mb-4">Quick Actions</Text>
          <View className="flex-row justify-between">
            <ActionItem label="Add Product" icon={PlusCircle} />
            <ActionItem label="Manage Products" icon={Package} />
            <ActionItem label="Manage Orders" icon={ReceiptText} />
            <ActionItem label="Promotions" icon={Percent} />
            <ActionItem label="Payouts" icon={Wallet} />
          </View>
        </View>

        {/* Recent Orders */}
        <View className="px-6 mt-8">
           <View className="flex-row justify-between items-center mb-4">
              <Text className="text-lg font-bold text-slate-900">Recent Orders</Text>
              <Pressable>
                 <Text className="text-primary text-xs font-bold">View All Orders</Text>
              </Pressable>
           </View>
           
           <OrderItem id="#ORD-8921" name="John Doe" price="₦18,650" status="Pending" color="bg-purple-100" />
           <OrderItem id="#ORD-8920" name="Mary Johnson" price="₦32,800" status="Preparing" color="bg-orange-100" />
           <OrderItem id="#ORD-8919" name="Alex Brown" price="₦22,500" status="Out for Delivery" color="bg-green-100" />
        </View>

        {/* Promotion Banner */}
        <View className="px-6 mt-8 pb-10">
           <View className="bg-primary rounded-[32px] p-6 flex-row items-center overflow-hidden">
              <View className="flex-1">
                 <Text className="text-xl font-bold text-white leading-7">Boost Your Sales 🚀</Text>
                 <Text className="text-white/80 text-xs mt-2 mb-4 leading-5">Create a promotion and attract more customers to your store.</Text>
                 <Pressable className="bg-white self-start px-6 py-2.5 rounded-xl">
                    <Text className="text-primary font-bold">Create Promotion</Text>
                 </Pressable>
              </View>
              <View className="w-24 h-24 bg-white/20 rounded-full" />
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Helpers
function StatCard({ title, value, trend, icon: Icon, color }: any) {
  return (
    <View className="w-40 bg-white border border-slate-100 p-4 rounded-3xl shadow-sm">
       <View className={`w-10 h-10 ${color} rounded-xl items-center justify-center mb-4`}>
          <Icon size={20} color="#4F26D9" />
       </View>
       <Text className="text-slate-400 text-[10px] font-bold uppercase">{title}</Text>
       <Text className="text-xl font-bold text-slate-900 mt-1">{value}</Text>
       <Text className="text-green-500 text-[10px] font-bold mt-1">{trend} <Text className="text-slate-400 font-normal">vs yesterday</Text></Text>
    </View>
  );
}

function ActionItem({ label, icon: Icon }: any) {
  return (
    <Pressable className="items-center w-[18%]">
       <View className="w-12 h-12 bg-white border border-slate-100 rounded-2xl items-center justify-center mb-2 shadow-sm">
          <Icon size={20} color="#4F26D9" />
       </View>
       <Text className="text-slate-600 text-[8px] font-bold text-center uppercase" numberOfLines={2}>{label}</Text>
    </Pressable>
  );
}

function OrderItem({ id, name, price, status, color }: any) {
  return (
    <View className="flex-row items-center py-4 border-b border-slate-50">
       <View className={`w-12 h-12 ${color} rounded-2xl items-center justify-center mr-4`}>
          <Package size={20} color="#4F26D9" />
       </View>
       <View className="flex-1">
          <View className="flex-row items-center">
             <Text className="font-bold text-slate-900 mr-2">{id}</Text>
             <View className="bg-primary/10 px-2 rounded">
                <Text className="text-primary text-[8px] font-bold">New</Text>
             </View>
          </View>
          <Text className="text-slate-400 text-[10px] mt-0.5">{name} • 2 items</Text>
       </View>
       <View className="items-end">
          <Text className="font-bold text-slate-900">{price}</Text>
          <View className="bg-green-100 px-2 py-0.5 rounded-full mt-1">
             <Text className="text-green-700 text-[8px] font-bold">{status}</Text>
          </View>
       </View>
       <ChevronRight size={16} color="#94a3b8" className="ml-2" />
    </View>
  );
}