import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable,  } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Headphones, MoreVertical, Phone, MessageSquare, 
  Clock, CheckCircle2, ChevronDown, Package, Info, X,
  PlayCircle, Check, Timer
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const STEPS = [
  { label: 'Confirmed', time: '09:15 AM', active: false, completed: true },
  { label: 'Preparing', time: '09:20 AM', active: true, completed: false },
  { label: 'Ready', active: false, completed: false },
  { label: 'Picked Up', active: false, completed: false },
  { label: 'Delivered', active: false, completed: false },
];

const ORDER_ITEMS = [
  { name: 'Fresh Banana (Bunch)', desc: 'Fresh Cavendish Banana', time: '8 min elapsed', status: 'Preparing', price: '₦6,500', qty: 'x1', emoji: '🍌' },
  { name: 'Vegetable Oil (1L)', desc: 'Pure Sunflower Oil', time: '7 min elapsed', status: 'Preparing', price: '₦6,000', qty: 'x2', emoji: '🛢️' },
  { name: 'Parboiled Rice (1kg)', desc: 'Long Grain Parboiled Rice', time: '7 min elapsed', status: 'Preparing', price: '₦3,800', qty: 'x1', emoji: '🌾' },
  { name: 'Fresh Milk (1L)', desc: 'Full Cream Milk', time: '6 min elapsed', status: 'Preparing', price: '₦2,500', qty: 'x1', emoji: '🥛' },
];

export default function PreparingOrderScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Header */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <View>
            <Text className="text-lg font-bold text-slate-900">Preparing Order</Text>
            <Text className="text-slate-400 text-[10px]">#ORD-8920 • 4 items</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-3">
          <Pressable className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <Headphones size={14} color="#4F26D9" />
            <Text className="text-primary font-bold ml-1.5 text-xs">Help</Text>
          </Pressable>
          <Pressable onPress={() => router.push('/orders/actions')}>
            <MoreVertical size={24} color="#64748b" />
          </Pressable>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 2. Status Stepper */}
        <View className="px-6 py-6 bg-white">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {STEPS.map((step, i) => (
              <React.Fragment key={i}>
                <View className="items-center w-16">
                  <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 
                    ${step.active ? 'bg-primary shadow-lg shadow-primary/40' : step.completed ? 'bg-primary' : 'bg-slate-100'}`}>
                    {step.completed ? <Check size={14} color="white" /> : <Clock size={14} color={step.active ? 'white' : '#cbd5e1'} />}
                  </View>
                  <Text className={`text-[8px] font-bold text-center ${step.active || step.completed ? 'text-primary' : 'text-slate-400'}`}>{step.label}</Text>
                  {step.time && <Text className="text-[6px] text-slate-400 mt-0.5">{step.time}</Text>}
                </View>
                {i < STEPS.length - 1 && <View className={`w-10 h-[1px] mt-4 mx-1 border-dashed ${step.completed ? 'bg-primary' : 'bg-slate-100'}`} />}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        {/* 3. Preparing Timer Banner */}
        <View className="mx-6 bg-purple-50/50 border border-purple-100 p-4 rounded-2xl flex-row items-center justify-between">
           <View className="flex-row items-center flex-1">
              <Timer size={18} color="#4F26D9" />
              <View className="ml-3">
                 <Text className="text-slate-900 font-bold text-xs">Preparing time goal: 20 min</Text>
                 <Text className="text-slate-500 text-[10px]">Mark as ready before <Text className="text-primary font-bold">09:35 AM</Text></Text>
              </View>
           </View>
           <View className="bg-white px-3 py-1.5 rounded-xl border border-primary/20 items-center">
              <Text className="text-primary font-bold text-xs uppercase tracking-tighter">00:07:32</Text>
              <Text className="text-slate-400 text-[6px] font-bold uppercase">Time elapsed</Text>
           </View>
        </View>

        {/* 4. Customer Info (Compact) */}
        <View className="px-6 mt-6">
           <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm flex-row items-center">
              <View className="w-12 h-12 bg-purple-100 rounded-full items-center justify-center">
                 <Text className="text-primary font-bold text-lg">MJ</Text>
              </View>
              <View className="flex-1 ml-3">
                 <View className="flex-row items-center">
                    <Text className="font-bold text-slate-900 mr-2">Mary Johnson</Text>
                    <View className="bg-orange-100 px-2 py-0.5 rounded">
                       <Text className="text-orange-700 text-[8px] font-bold">VIP</Text>
                    </View>
                 </View>
                 <Text className="text-slate-400 text-[10px] mt-0.5">0807 654 3210</Text>
              </View>
              <View className="flex-row space-x-2">
                 <Pressable className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"><Phone size={16} color="#4F26D9" /></Pressable>
                 <Pressable className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"><MessageSquare size={16} color="#4F26D9" /></Pressable>
              </View>
           </View>
        </View>

        {/* 5. Customer Note Banner */}
        <View className="mx-6 mt-4 bg-green-50/50 border border-green-100 p-3 rounded-xl flex-row items-center">
           <MessageSquare size={14} color="#22c55e" />
           <Text className="text-green-800 text-[10px] ml-2">
              <Text className="font-bold">Customer Note: </Text>Please call upon arrival. Thank you!
           </Text>
        </View>

        {/* 6. Order Items with Status */}
        <View className="px-6 mt-6">
           <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                 <Package size={16} color="#4F26D9" />
                 <Text className="font-bold text-slate-900 ml-2">Order Items (4)</Text>
              </View>
              <Text className="text-primary font-bold text-xs">Expand All <ChevronDown size={14} color="#4F26D9" /></Text>
           </View>
           
           <View className="space-y-4">
              {ORDER_ITEMS.map((item, index) => (
                <View key={index} className="flex-row items-center">
                   <View className="w-14 h-14 bg-slate-50 rounded-xl items-center justify-center">
                      <Text className="text-2xl">{item.emoji}</Text>
                   </View>
                   <View className="flex-1 ml-4">
                      <Text className="font-bold text-slate-900 text-sm">{item.name}</Text>
                      <Text className="text-slate-400 text-[10px] mt-0.5">{item.desc}</Text>
                      <View className="flex-row items-center mt-1">
                         <View className="w-2 h-2 bg-orange-500 rounded-full mr-1.5" />
                         <Text className="text-orange-600 text-[10px] font-bold">{item.status}</Text>
                      </View>
                   </View>
                   <View className="items-end">
                      <View className="flex-row items-center mb-1">
                         <Clock size={12} color="#94a3b8" />
                         <Text className="text-slate-400 text-[9px] ml-1">{item.time}</Text>
                      </View>
                      <Text className="text-slate-900 font-bold text-sm">{item.price}</Text>
                      <Text className="text-slate-400 text-xs mt-0.5">{item.qty}</Text>
                   </View>
                   <ChevronDown size={16} color="#cbd5e1" className="ml-3" />
                </View>
              ))}
           </View>
        </View>

        {/* 7. Action Card */}
        <View className="mx-6 mt-8 p-5 bg-slate-50/50 border border-slate-100 rounded-[32px] space-y-4">
           <Text className="text-slate-900 font-bold text-xs">Update preparation status</Text>
           <View className="flex-row space-x-3">
              <Pressable className="flex-1 h-12 bg-white border border-primary/20 rounded-2xl flex-row items-center justify-center">
                 <Package size={16} color="#4F26D9" />
                 <Text className="text-primary font-bold ml-2 text-xs">Prepare All Items</Text>
              </Pressable>
              <Pressable className="flex-[1.2] h-12 bg-primary rounded-2xl flex-row items-center justify-center shadow-md shadow-primary/20">
                 <Check size={18} color="white" />
                 <View className="ml-2">
                    <Text className="text-white font-bold text-xs">Mark Order as Ready</Text>
                    <Text className="text-white/70 text-[7px] font-bold">Notify rider & customer</Text>
                 </View>
              </Pressable>
           </View>
        </View>

        {/* 8. Order Summary */}
        <View className="px-6 mt-8 mb-20 space-y-3">
           <Text className="text-slate-900 font-bold text-xs mb-1">Order Summary</Text>
           <SummaryRow label="Subtotal" value="₦18,800" />
           <SummaryRow label="Delivery Fee" value="₦1,000" />
           <SummaryRow label="Service Fee" value="₦500" hasInfo />
           <View className="flex-row justify-between pt-2">
              <Text className="text-lg font-bold text-slate-900">Total</Text>
              <Text className="text-lg font-bold text-slate-900">₦20,300</Text>
           </View>
        </View>
      </ScrollView>

      {/* 9. Footer Footer Actions */}
      <View className="px-6 py-6 border-t border-slate-50 bg-white flex-row space-x-3">
        <Pressable className="flex-1 h-14 border border-red-100 rounded-2xl flex-row items-center justify-center">
          <X size={18} color="#ef4444" />
          <Text className="text-red-500 font-bold ml-2">Cancel Order</Text>
        </Pressable>
        <Pressable className="flex-1 h-14 border border-primary/20 rounded-2xl flex-row items-center justify-center">
          <MessageSquare size={18} color="#4F26D9" />
          <Text className="text-primary font-bold ml-2">Message Customer</Text>
        </Pressable>
        <Pressable 
          onPress={() => router.push('/orders/actions')}
          className="flex-1 h-14 border border-slate-200 rounded-2xl flex-row items-center justify-center bg-slate-50"
        >
          <MoreVertical size={18} color="#64748b" />
          <Text className="text-slate-600 font-bold ml-2">More Actions</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Helpers
function SummaryRow({ label, value, hasInfo }: any) {
  return (
    <View className="flex-row justify-between items-center">
       <View className="flex-row items-center">
          <Text className="text-slate-400 text-xs font-medium">{label}</Text>
          {hasInfo && <Info size={10} color="#94a3b8" className="ml-1" />}
       </View>
       <Text className="text-slate-900 font-bold text-xs">{value}</Text>
    </View>
  );
}