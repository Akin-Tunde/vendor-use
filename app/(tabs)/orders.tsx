import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, TextInput, Image, SafeAreaView } from 'react-native';
import { 
  Search, Filter, Bell, Menu, ChevronRight, 
  Clock, Bike, CreditCard, Check, X, 
  AlertTriangle, Play, PackageCheck, ShoppingBag,
  ChevronLeft, ChevronRight as ChevronRightIcon,
  Plus
} from 'lucide-react-native';

const TABS = [
  { id: 'all', label: 'All', count: 24 },
  { id: 'new', label: 'New', count: 6 },
  { id: 'confirmed', label: 'Confirmed', count: 3 },
  { id: 'preparing', label: 'Preparing', count: 5 },
  { id: 'ready', label: 'Ready', count: 4 },
  { id: 'picked', label: 'Picked Up', count: 2 },
];

export default function ManageOrdersScreen() {
  const [activeTab, setActiveTab] = useState('all');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* 1. Header */}
      <View className="px-6 py-4 bg-white flex-row justify-between items-center border-b border-slate-50">
        <View className="flex-row items-center">
          <Menu size={24} color="#64748b" />
          <View className="ml-4">
            <Text className="text-xl font-bold text-slate-900">Manage Orders</Text>
            <Text className="text-slate-400 text-[10px]">View and manage customer orders</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-4">
          <Search size={24} color="#64748b" />
          <View className="p-2 border border-slate-100 rounded-xl">
            <Filter size={20} color="#64748b" />
          </View>
          <View className="relative">
            <Bell size={24} color="#64748b" />
            <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white items-center justify-center">
              <Text className="text-[8px] text-white font-bold">3</Text>
            </View>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 2. Top Status Tabs */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white py-3 px-6 space-x-3 border-b border-slate-50">
          {TABS.map((tab) => (
            <Pressable 
              key={tab.id}
              onPress={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl flex-row items-center ${activeTab === tab.id ? 'bg-primary' : 'bg-slate-50'}`}
            >
              <Text className={`font-bold text-xs ${activeTab === tab.id ? 'text-white' : 'text-slate-500'}`}>{tab.label}</Text>
              <View className={`ml-2 px-1.5 rounded-md ${activeTab === tab.id ? 'bg-white/20' : 'bg-slate-200'}`}>
                <Text className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-white' : 'text-slate-600'}`}>{tab.count}</Text>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* 3. Summary Stats Grid */}
        <View className="flex-row flex-wrap px-6 py-4 justify-between">
          <SummaryCard icon={ShoppingBag} label="New Orders" value="6" sub="Needs action" color="text-red-500" bg="bg-red-50" />
          <SummaryCard icon={Clock} label="Preparing" value="5" sub="In progress" color="text-primary" bg="bg-primary/5" />
          <SummaryCard icon={PackageCheck} label="Ready for Pickup" value="4" sub="Waiting rider" color="text-green-500" bg="bg-green-50" />
          <SummaryCard icon={Bike} label="Out for Delivery" value="7" sub="On the way" color="text-blue-500" bg="bg-blue-50" />
        </View>

        {/* 4. Priority Queue */}
        <View className="px-6 mb-4">
          <View className="flex-row justify-between items-center mb-3">
             <Text className="font-bold text-slate-900">🔥 Priority Queue</Text>
             <Text className="text-primary font-bold text-xs">View all (5) &gt;</Text>
          </View>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-3">
             <PriorityBadge icon={Clock} label="3 New Orders" sub="Accept within 2 min" color="border-red-100 bg-red-50/30" iconColor="#ef4444" />
             <PriorityBadge icon={Bike} label="Rider Waiting" sub="2 orders" color="border-orange-100 bg-orange-50/30" iconColor="#f59e0b" />
             <PriorityBadge icon={AlertTriangle} label="2 Orders Delayed" sub="Tap to review" color="border-amber-100 bg-amber-50/30" iconColor="#d97706" />
          </ScrollView>
        </View>

        {/* 5. Filters & Search */}
        <View className="px-6 space-y-3">
           <View className="flex-row space-x-2">
              <View className="flex-1 bg-white border border-slate-100 rounded-2xl flex-row items-center px-4 h-12 shadow-sm">
                 <Search size={18} color="#94a3b8" />
                 <TextInput placeholder="Search by order ID, customer or phone..." className="flex-1 ml-2 text-xs" />
              </View>
              <View className="bg-white border border-slate-100 rounded-2xl flex-row items-center px-4 h-12 shadow-sm">
                 <Clock size={18} color="#64748b" />
                 <Text className="ml-2 font-bold text-slate-700 text-xs">Today</Text>
                 <ChevronRight size={14} color="#94a3b8" className="rotate-90 ml-1" />
              </View>
           </View>
           <ScrollView horizontal showsHorizontalScrollIndicator={false} className="space-x-2">
              <FilterChip label="All" active />
              <FilterChip label="Pickup" icon={ShoppingBag} />
              <FilterChip label="Delivery" icon={Bike} />
              <FilterChip label="Express" icon={Plus} />
              <FilterChip label="Cash" icon={CreditCard} />
           </ScrollView>
        </View>

        {/* 6. Orders List */}
        <View className="px-6 py-6 space-y-4">
           <OrderCard 
             id="#ORD-8921" customer="John Doe" phone="0803 123 4567" 
             time="09:31 AM" amount="₦18,650" type="Express Delivery" 
             status="NEW" timer="Waiting 6 min" timerColor="text-red-500"
             items={['🍌', '🍎']}
           />
           <OrderCard 
             id="#ORD-8920" customer="Mary Johnson" phone="0807 654 3210" 
             time="09:15 AM" amount="₦32,800" type="Standard Delivery" 
             status="CONFIRMED" timer="Waiting 12 min" timerColor="text-orange-500"
             items={['🥫', '🥣', '🍼']}
           />
        </View>

        {/* Pagination Placeholder */}
        <View className="items-center py-6">
           <Text className="text-slate-400 text-xs mb-4">Showing 1 to 7 of 24 orders</Text>
           <View className="flex-row items-center space-x-2">
              <Pressable className="w-8 h-8 rounded-lg bg-slate-100 items-center justify-center"><ChevronLeft size={16} color="#64748b"/></Pressable>
              <Pressable className="w-8 h-8 rounded-lg bg-primary items-center justify-center"><Text className="text-white font-bold">1</Text></Pressable>
              <Pressable className="w-8 h-8 rounded-lg bg-slate-50 items-center justify-center"><Text className="text-slate-600">2</Text></Pressable>
              <Pressable className="w-8 h-8 rounded-lg bg-slate-100 items-center justify-center"><ChevronRightIcon size={16} color="#64748b"/></Pressable>
           </View>
        </View>

        <View className="h-20" />
      </ScrollView>

      {/* Floating Bottom Alert Banner */}
      <View className="absolute bottom-[90px] left-4 right-4 bg-white border border-slate-100 rounded-2xl shadow-xl p-4 flex-row items-center">
         <View className="bg-red-50 p-2 rounded-full mr-3">
            <Bell size={20} color="#ef4444" />
         </View>
         <View className="flex-1">
            <Text className="font-bold text-slate-900 text-xs">3 New Orders</Text>
            <Text className="text-slate-500 text-[10px]">Needs your attention</Text>
         </View>
         <View className="flex-row items-center space-x-4">
            <View className="h-8 w-[1px] bg-slate-100" />
            <Bike size={20} color="#64748b" />
            <Text className="font-bold text-slate-900 text-xs">2</Text>
            <ChevronRight size={16} color="#94a3b8" className="-rotate-90" />
         </View>
      </View>
    </SafeAreaView>
  );
}

// Subcomponents
function SummaryCard({ icon: Icon, label, value, sub, color, bg }: any) {
  return (
    <View className="w-[48%] bg-white border border-slate-100 p-4 rounded-[28px] mb-4 shadow-sm">
       <View className={`w-10 h-10 ${bg} rounded-xl items-center justify-center mb-3`}>
          <Icon size={20} color={color === 'text-primary' ? '#4F26D9' : (color === 'text-red-500' ? '#ef4444' : '#22c55e')} />
       </View>
       <Text className="text-slate-400 text-[10px] font-bold uppercase tracking-wider">{label}</Text>
       <Text className="text-2xl font-bold text-slate-900 mt-1">{value}</Text>
       <Text className={`${color} text-[10px] font-bold mt-1`}>{sub}</Text>
    </View>
  );
}

function PriorityBadge({ icon: Icon, label, sub, color, iconColor }: any) {
  return (
    <Pressable className={`border px-4 py-3 rounded-2xl flex-row items-center min-w-[180px] ${color}`}>
       <Icon size={20} color={iconColor} />
       <View className="ml-3">
          <Text className="font-bold text-slate-900 text-xs">{label}</Text>
          <Text className="text-slate-500 text-[10px]">{sub}</Text>
       </View>
       <ChevronRight size={14} color="#94a3b8" className="ml-2" />
    </Pressable>
  );
}

function FilterChip({ label, icon: Icon, active }: any) {
  return (
    <Pressable className={`flex-row items-center px-4 py-2 rounded-xl border ${active ? 'bg-primary border-primary' : 'bg-white border-slate-100'}`}>
       {Icon && <Icon size={14} color={active ? 'white' : '#64748b'} className="mr-2" />}
       <Text className={`text-xs font-bold ${active ? 'text-white' : 'text-slate-600'}`}>{label}</Text>
    </Pressable>
  );
}

function OrderCard({ id, customer, phone, time, amount, type, status, timer, timerColor, items }: any) {
  const isNew = status === 'NEW';
  return (
    <View className="bg-white border border-slate-100 rounded-[32px] p-5 shadow-sm">
       <View className="flex-row justify-between">
          <View className="flex-row items-center">
             <View className="w-5 h-5 border border-slate-200 rounded mr-3" />
             <View className={`px-2 py-0.5 rounded mr-2 ${isNew ? 'bg-red-50' : 'bg-orange-50'}`}>
                <Text className={`text-[8px] font-bold ${isNew ? 'text-red-500' : 'text-orange-500'}`}>{status}</Text>
             </View>
             <Text className="font-bold text-slate-900 text-base">{id}</Text>
          </View>
          <Text className="font-bold text-slate-900 text-lg">{amount}</Text>
       </View>

       <View className="flex-row mt-4 items-start">
          <View className="flex-1">
             <Text className="text-slate-900 font-bold text-sm">{customer}</Text>
             <Text className="text-slate-400 text-[11px] mt-0.5">{phone}</Text>
             <Text className="text-slate-400 text-[10px] mt-1">Today, {time}</Text>
          </View>
          <View className="flex-1 space-y-2">
             <View className="flex-row items-center">
                <Bike size={12} color="#4F26D9" />
                <Text className="text-primary font-bold text-[10px] ml-2">{type}</Text>
             </View>
             <View className="flex-row items-center">
                <CreditCard size={12} color="#22c55e" />
                <Text className="text-green-600 font-bold text-[10px] ml-2">Paid • Card</Text>
             </View>
             <View className="flex-row items-center">
                <Clock size={12} color="#94a3b8" />
                <Text className={`${timerColor} font-bold text-[10px] ml-2`}>{timer}</Text>
             </View>
          </View>
          <View className="flex-row items-center">
             <View className="flex-row -space-x-2 mr-2">
                {items.map((img, i) => (
                  <View key={i} className="w-10 h-10 bg-slate-50 border-2 border-white rounded-lg items-center justify-center">
                     <Text className="text-lg">{img}</Text>
                  </View>
                ))}
             </View>
             <ChevronRight size={20} color="#cbd5e1" />
          </View>
       </View>

       <View className="flex-row mt-6 space-x-3">
          {isNew ? (
            <>
              <Pressable className="flex-1 bg-red-500 h-12 rounded-2xl flex-row items-center justify-center">
                 <Check size={18} color="white" />
                 <Text className="text-white font-bold ml-2">Accept</Text>
              </Pressable>
              <Pressable className="bg-slate-50 border border-slate-100 px-6 rounded-2xl items-center justify-center">
                 <X size={18} color="#64748b" />
                 <Text className="text-slate-500 text-[10px] font-bold mt-1">Reject</Text>
              </Pressable>
            </>
          ) : (
            <Pressable className="flex-1 bg-primary/10 border border-primary/20 h-12 rounded-2xl flex-row items-center justify-center">
               <Play size={16} color="#4F26D9" />
               <Text className="text-primary font-bold ml-2">Start Preparing</Text>
            </Pressable>
          )}
       </View>
    </View>
  );
}