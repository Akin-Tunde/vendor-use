import { useRouter } from 'expo-router';
import {
   ArrowLeft,
   Check,
   ChevronDown,
   Clock,
   Headphones,
   Info,
   MoreVertical,
   Package,
   Receipt,
   Timer,
   X
} from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
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
               <Pressable onPress={() => router.back()} className="mr-4 p-1">
                  <ArrowLeft size={24} color="#000" />
               </Pressable>
               <View>
                  <Text className="text-lg font-bold text-slate-900">Preparing Order</Text>
                  <Text className="text-slate-400 text-[10px]">#ORD-8920 • 4 items</Text>
               </View>
            </View>
            <View className="flex-row items-center gap-x-3">
               <Pressable className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                  <Headphones size={14} color="#4F26D9" />
                  <Text className="text-primary font-bold ml-1.5 text-xs">Help</Text>
               </Pressable>
               <Pressable onPress={() => router.push('/orders/actions')} className="p-1">
                  <MoreVertical size={24} color="#64748b" />
               </Pressable>
            </View>
         </View>

         <ScrollView className="flex-1 bg-[#F8F9FE]" showsVerticalScrollIndicator={false}>
            {/* 2. Status Stepper */}
            <View className="px-5 py-3 bg-white border-b border-slate-50">
               <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                  {STEPS.map((step, i) => (
                     <React.Fragment key={i}>
                        <View className="items-center w-16">
                           <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 
                    ${step.active ? 'bg-primary shadow-lg shadow-primary/40' : step.completed ? 'bg-primary' : 'bg-slate-100'}`}>
                              {step.completed ? <Check size={14} color="white" /> : <Clock size={14} color={step.active ? 'white' : '#cbd5e1'} />}
                           </View>
                           <Text className={`text-[9px] font-bold text-center ${step.active || step.completed ? 'text-primary' : 'text-slate-400'}`}>{step.label}</Text>
                           {step.time && <Text className="text-[9px] text-slate-400 mt-0.5">{step.time}</Text>}
                        </View>
                        {i < STEPS.length - 1 && <View className={`w-10 h-[1px] mt-4 mx-1 ${step.completed ? 'bg-primary' : 'bg-slate-100'}`} />}
                     </React.Fragment>
                  ))}
               </ScrollView>
            </View>

            {/* 3. Preparing Timer Banner */}
            <View className="mx-6 mt-4 bg-purple-50/50 border border-purple-100 p-4 rounded-2xl flex-row items-center justify-between">
               <View className="flex-row items-center flex-1">
                  <Timer size={18} color="#4F26D9" />
                  <View className="ml-3">
                     <Text className="text-slate-900 font-bold text-xs">Preparing time goal: 20 min</Text>
                     <Text className="text-slate-500 text-[10px]">Mark as ready before <Text className="text-primary font-bold">09:35 AM</Text></Text>
                  </View>
               </View>
               <View className="bg-white px-3 py-1.5 rounded-xl border border-primary/20 items-center">
                  <Text className="text-primary font-bold text-xs uppercase tracking-tighter">00:07:32</Text>
                  <Text className="text-slate-400 text-[9px] font-bold uppercase">Time elapsed</Text>
               </View>
            </View>

            {/* Order Items */}
            <View className="mx-4 mt-5 bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm">
               {/* Header */}
               <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                     <View className="w-8 h-8 bg-purple-100 rounded-xl items-center justify-center mr-2.5">
                        <Package size={18} color="#4F26D9" />
                     </View>

                     <Text className="font-bold text-slate-900 text-sm">
                        Order Items ({ORDER_ITEMS.length})
                     </Text>
                  </View>

                  <Pressable className="flex-row items-center">
                     <Text className="text-primary font-bold text-xs mr-1">
                        Expand All
                     </Text>
                     <ChevronDown size={14} color="#4F26D9" />
                  </Pressable>
               </View>

               {/* Items */}
               <View>
                  {ORDER_ITEMS.map((item, index) => (
                     <View
                        key={index}
                        className={`flex-row items-center py-3 ${index < ORDER_ITEMS.length - 1
                           ? "border-b border-slate-100/60"
                           : ""
                           }`}
                     >
                        {/* Product */}
                        <View className="w-14 h-14 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center mr-3 flex-shrink-0">
                           <Text className="text-3xl">{item.emoji}</Text>
                        </View>

                        {/* Details */}
                        <View className="flex-1 pr-3">
                           <Text
                              className="font-bold text-slate-900 text-sm"
                              numberOfLines={1}
                           >
                              {item.name}
                           </Text>

                           <Text
                              className="text-slate-400 text-xs mt-0.5"
                              numberOfLines={1}
                           >
                              {item.desc}
                           </Text>

                           <View className="flex-row items-center mt-2">
                              <View className="w-2 h-2 rounded-full bg-orange-500 mr-1.5" />
                              <Text className="text-orange-600 text-[11px] font-semibold">
                                 {item.status}
                              </Text>
                           </View>
                        </View>

                        {/* Right Side */}
                        <View className="items-end justify-between h-14 mr-2">
                           <View className="flex-row items-center">
                              <Clock size={11} color="#94a3b8" />
                              <Text className="text-slate-400 text-[10px] ml-1">
                                 {item.time}
                              </Text>
                           </View>

                           <Text className="font-bold text-slate-900 text-sm">
                              {item.price}
                           </Text>

                           <Text className="text-slate-400 text-xs">
                              {item.qty}
                           </Text>
                        </View>

                        {/* Expand */}
                        <Pressable className="w-8 h-8 items-center justify-center">
                           <ChevronDown size={16} color="#94a3b8" />
                        </Pressable>
                     </View>
                  ))}
               </View>
            </View>

            {/* 5. Update Status Action Card */}
            <View className="mx-6 mt-8 p-5 bg-slate-50/50 border border-slate-100 rounded-[32px] gap-y-4">
               <Text className="text-slate-900 font-bold text-xs">Update preparation status</Text>
               <View className="flex-row gap-x-3">
                  <Pressable className="flex-1 h-12 bg-white border border-primary/20 rounded-2xl flex-row items-center justify-center">
                     <Package size={16} color="#4F26D9" />
                     <Text className="text-primary font-bold ml-2 text-xs">Prepare All Items</Text>
                  </Pressable>

                  {/* NAVIGATES TO READY SCREEN */}
                  <Pressable
                     onPress={() => router.push('/orders/ready')}
                     className="flex-[1.2] h-12 bg-primary rounded-2xl flex-row items-center justify-center shadow-md shadow-primary/20 active:bg-primary/90"
                  >
                     <Check size={18} color="white" />
                     <View className="ml-2">
                        <Text className="text-white font-bold text-xs">Mark Order as Ready</Text>
                        <Text className="text-white/70 text-[9px] font-bold">Notify rider & customer</Text>
                     </View>
                  </Pressable>
               </View>
            </View>

            {/* 6. Order Summary */}
            <View className="mx-4 mt-5 bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm">
               {/* Header */}
               <View className="flex-row items-center mb-4">
                  <View className="w-8 h-8 bg-purple-100 rounded-xl items-center justify-center mr-2.5">
                     <Receipt size={18} color="#4F26D9" />
                  </View>

                  <Text className="font-bold text-slate-900 text-sm">
                     Order Summary
                  </Text>
               </View>

               {/* Price Breakdown */}
               <View className="gap-y-2.5">
                  <SummaryRow
                     label="Subtotal"
                     value="₦18,800"
                  />

                  <SummaryRow
                     label="Delivery Fee"
                     value="₦1,000"
                  />

                  <SummaryRow
                     label="Service Fee"
                     value="₦500"
                     hasInfo
                  />

                  <View className="flex-row justify-between items-center pt-3 mt-2 border-t border-slate-100">
                     <Text className="text-base font-extrabold text-slate-900">
                        Total
                     </Text>

                     <Text className="text-xl font-extrabold text-slate-900">
                        ₦20,300
                     </Text>
                  </View>
               </View>
            </View>
         </ScrollView>

         {/* 7. Footer Actions */}
         <View className="px-6 py-6 border-t border-slate-50 bg-white">
            <Pressable className="w-full h-14 border border-red-100 rounded-2xl flex-row items-center justify-center">
               <X size={18} color="#ef4444" />
               <Text className="text-red-500 font-bold ml-2">Cancel Order</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
}

// Helpers
function SummaryRow({
   label,
   value,
   hasInfo,
}: {
   label: string;
   value: string;
   hasInfo?: boolean;
}) {
   return (
      <View className="flex-row justify-between items-center">
         <View className="flex-row items-center">
            <Text className="text-slate-500 text-xs font-medium">
               {label}
            </Text>

            {hasInfo && (
               <View className="ml-1">
                  <Info size={12} color="#94a3b8" />
               </View>
            )}
         </View>

         <Text className="text-slate-900 font-bold text-xs">
            {value}
         </Text>
      </View>
   );
}