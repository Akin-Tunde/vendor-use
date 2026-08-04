import { useLocalSearchParams, useRouter } from 'expo-router';
import {
   ArrowLeft,
   Bike,
   Check,
   CheckCircle2,
   ChefHat,
   Clock,
   Headphones,
   Info,
   MessageSquare,
   MoreVertical,
   ShoppingBag,
   X
} from 'lucide-react-native';
import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STEPS = [
   { label: 'New', time: '09:31 AM', active: true, completed: false, icon: ShoppingBag },
   { label: 'Confirmed', active: false, completed: false, icon: Check },
   { label: 'Preparing', active: false, completed: false, icon: ChefHat },
   { label: 'Ready', active: false, completed: false, icon: ShoppingBag },
   { label: 'Picked Up', active: false, completed: false, icon: Bike },
   { label: 'Delivered', active: false, completed: false, icon: CheckCircle2 },
];

export default function OrderDetailsScreen() {
   const router = useRouter();
   const { id } = useLocalSearchParams();
   const orderId = id ? (Array.isArray(id) ? id[0] : id) : 'ORD-8921';

   return (
      <SafeAreaView className="flex-1 bg-white">
         {/* 1. Top Header */}
         <View className="px-5 py-3.5 flex-row justify-between items-center border-b border-slate-100 bg-white">
            <View className="flex-row items-center">
               <Pressable onPress={() => router.back()} className="p-1 mr-3">
                  <ArrowLeft size={22} color="#1e293b" />
               </Pressable>
               <View>
                  <Text className="text-lg font-bold text-slate-900">Order #{orderId}</Text>
                  <Text className="text-slate-400 text-xs">Placed today, 09:31 AM</Text>
               </View>
            </View>

            <View className="flex-row items-center gap-x-2.5">
               <Pressable className="flex-row items-center bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                  <Headphones size={14} color="#4F26D9" />
                  <Text className="text-primary font-bold ml-1.5 text-xs">Help</Text>
               </Pressable>
               <Pressable className="p-1">
                  <MoreVertical size={20} color="#64748b" />
               </Pressable>
            </View>
         </View>

         <ScrollView className="flex-1 bg-[#F8F9FE]" showsVerticalScrollIndicator={false}>
            {/* 2. Status Stepper */}
            <View className="px-5 py-4 bg-white border-b border-slate-100">
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row items-center pr-6">
                     {STEPS.map((step, i) => {
                        const IconComponent = step.icon;
                        return (
                           <React.Fragment key={i}>
                              <View className="items-center min-w-[56px]">
                                 <View
                                    className={`w-9 h-9 rounded-full items-center justify-center mb-1.5 ${step.active
                                       ? 'bg-primary shadow-md shadow-primary/30'
                                       : step.completed
                                          ? 'bg-primary'
                                          : 'bg-slate-100 border border-slate-200'
                                       }`}
                                 >
                                    <IconComponent
                                       size={16}
                                       color={step.active || step.completed ? 'white' : '#94a3b8'}
                                    />
                                 </View>
                                 <Text
                                    className={`text-[10px] font-bold text-center ${step.active ? 'text-primary' : 'text-slate-500'
                                       }`}
                                 >
                                    {step.label}
                                 </Text>
                                 {step.time && (
                                    <Text className="text-[9px] text-primary font-bold mt-0.5">
                                       {step.time}
                                    </Text>
                                 )}
                              </View>
                              {i < STEPS.length - 1 && (
                                 <View className="w-8 h-[1px] bg-slate-200 border-dashed mx-1 -mt-5" />
                              )}
                           </React.Fragment>
                        );
                     })}
                  </View>
               </ScrollView>
            </View>

            {/* 3. Accept Order Timer Banner */}
            <View className="mx-5 mt-4 bg-orange-50/70 border border-orange-200/80 p-3.5 rounded-2xl flex-row items-center justify-between shadow-sm">
               <View className="flex-row items-center flex-1 mr-2">
                  <View className="w-8 h-8 rounded-full bg-orange-100 items-center justify-center mr-2.5">
                     <Clock size={18} color="#f97316" />
                  </View>
                  <View className="flex-1">
                     <Text className="text-slate-900 font-bold text-xs">
                        Accept order within 1 min 45 sec
                     </Text>
                     <Text className="text-slate-500 text-[10px] mt-0.5">
                        If not accepted, the order may be reassigned.
                     </Text>
                  </View>
               </View>
               <View className="bg-white px-3 py-1.5 rounded-xl border border-orange-200">
                  <Text className="text-red-500 font-extrabold text-xs">01:45</Text>
               </View>
            </View>

            {/* 4. Order Items Card */}
            <View className="mx-4 mt-5 bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm">
               {/* Header */}
               <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                     <View className="w-8 h-8 bg-purple-100 rounded-xl items-center justify-center mr-2.5">
                        <ShoppingBag size={18} color="#4F26D9" />
                     </View>
                     <Text className="font-bold text-slate-900 text-sm">Order Items (2)</Text>
                  </View>
                  <Pressable>
                     <Text className="text-primary font-bold text-xs">See all items</Text>
                  </Pressable>
               </View>

               {/* Item 1 */}
               <View className="flex-row items-center py-3 border-b border-slate-100/60">
                  <View className="w-14 h-14 bg-amber-50/60 border border-amber-100 rounded-2xl items-center justify-center mr-3 flex-shrink-0">
                     <Text className="text-3xl">🍌</Text>
                  </View>
                  <View className="flex-1 pr-2">
                     <Text className="font-bold text-slate-900 text-sm">Banana (Bunch)</Text>
                     <Text className="text-slate-400 text-xs mt-0.5">Fresh Cavendish Banana</Text>
                     <Text className="text-slate-400 text-xs font-medium mt-1">₦6,500</Text>
                  </View>
                  <View className="items-end justify-between py-0.5 h-12">
                     <Text className="text-slate-400 text-xs font-medium">x1</Text>
                     <Text className="font-bold text-slate-900 text-sm">₦6,500</Text>
                  </View>
               </View>

               {/* Item 2 */}
               <View className="flex-row items-center py-3 border-b border-slate-100/60">
                  <View className="w-14 h-14 bg-red-50/60 border border-red-100 rounded-2xl items-center justify-center mr-3 flex-shrink-0">
                     <Text className="text-3xl">🍎</Text>
                  </View>
                  <View className="flex-1 pr-2">
                     <Text className="font-bold text-slate-900 text-sm">Red Apple</Text>
                     <Text className="text-slate-400 text-xs mt-0.5">Fresh Red Apple (1kg)</Text>
                     <Text className="text-slate-400 text-xs font-medium mt-1">₦12,150</Text>
                  </View>
                  <View className="items-end justify-between py-0.5 h-12">
                     <Text className="text-slate-400 text-xs font-medium">x1</Text>
                     <Text className="font-bold text-slate-900 text-sm">₦12,150</Text>
                  </View>
               </View>

               {/* Price Breakdown */}
               <View className="mt-4 gap-y-2.5 pt-1">
                  <View className="flex-row justify-between items-center">
                     <Text className="text-slate-500 text-xs font-medium">Subtotal</Text>
                     <Text className="font-bold text-slate-900 text-xs">₦18,650</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                     <Text className="text-slate-500 text-xs font-medium">Delivery Fee</Text>
                     <Text className="font-bold text-slate-900 text-xs">₦1,000</Text>
                  </View>
                  <View className="flex-row justify-between items-center">
                     <View className="flex-row items-center">
                        <Text className="text-slate-500 text-xs font-medium">Service Fee</Text>
                        <Info size={12} color="#94a3b8" className="ml-1" />
                     </View>
                     <Text className="font-bold text-slate-900 text-xs">₦500</Text>
                  </View>

                  <View className="flex-row justify-between items-center pt-3 border-t border-slate-100 mt-2">
                     <Text className="text-lg font-extrabold text-slate-900">Total</Text>
                     <Text className="text-xl font-extrabold text-slate-900">₦20,150</Text>
                  </View>
               </View>
            </View>

            {/* 5. Notes Section */}
            <View className="mx-5 mt-5 gap-y-3">
               <NoteBox
                  title="Additional Notes"
                  text="Please ring the bell and wait. I have a gate code: 1234 Leave it with the security."
                  bg="bg-purple-50/70"
                  border="border-purple-100"
               />
               <NoteBox
                  title="Customer Note"
                  text="Please ring the bell and wait. I have a gate code: 1234 Leave it with the security."
                  bg="bg-slate-100/70"
                  border="border-slate-200/60"
               />
            </View>

            {/* 6. Primary Actions Buttons */}
            <View className="mx-5 mt-5 mb-10 flex-row gap-x-3">
               <Pressable className="flex-1 h-12 bg-white border border-red-200 rounded-2xl flex-row items-center justify-center shadow-sm active:bg-red-50">
                  <X size={16} color="#ef4444" />
                  <Text className="text-red-500 font-bold ml-1.5 text-xs">Reject Order</Text>
               </Pressable>

               <Pressable
                  onPress={() => router.push('/orders/preparing')}
                  className="flex-1 h-12 bg-primary rounded-2xl flex-row items-center justify-center shadow-md shadow-primary/30 active:bg-primary/90"
               >
                  <Check size={16} color="white" />
                  <Text className="text-white font-bold ml-1.5 text-xs">Accept Order</Text>
               </Pressable>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}

// Subcomponents
function NoteBox({ title, text, bg, border }: any) {
   return (
      <View className={`border p-3.5 rounded-[20px] ${bg} ${border}`}>
         <View className="flex-row items-center mb-1.5">
            <MessageSquare size={13} color="#4F26D9" />
            <Text className="text-slate-900 font-bold text-[11px] ml-1.5">{title}</Text>
         </View>
         <Text className="text-slate-600 text-[10px] leading-4">{text}</Text>
      </View>
   );
}