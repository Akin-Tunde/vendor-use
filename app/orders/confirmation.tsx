import { useRouter } from 'expo-router';
import {
   ArrowLeft,
   Bike,
   Check,
   CheckCircle2,
   Clock,
   Headphones,
   MessageSquare,
   Minus,
   MoreVertical,
   Phone,
   Plus,
   ShieldCheck,
   ShoppingBag,
   Star,
   User
} from 'lucide-react-native';
import React, { useRef, useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STEPS = [
   { label: 'Confirmed', time: '09:15 AM', active: false, completed: true },
   { label: 'Preparing', time: '09:20 AM', active: false, completed: true },
   { label: 'Ready', time: '09:38 AM', active: false, completed: true },
   { label: 'Rider Arrived', time: '10:05 AM', active: true, completed: false, isRider: true },
   { label: 'Picked Up', active: false, completed: false },
   { label: 'Out for Delivery', active: false, completed: false },
];

export default function PickupConfirmationScreen() {
   const router = useRouter();
   const [bagCount, setBagCount] = useState(2);
   const [pickupCode, setPickupCode] = useState(['', '', '', '', '', '']);
   const inputRefs = useRef<Array<TextInput | null>>([]);

   const isVerified = pickupCode.every((d) => d.length === 1);

   function handleCodeChange(text: string, index: number) {
      const digit = text.replace(/[^0-9]/g, '').slice(-1);
      const next = [...pickupCode];
      next[index] = digit;
      setPickupCode(next);
      if (digit && index < 5) {
         inputRefs.current[index + 1]?.focus();
      }
   }

   function handleKeyPress(e: any, index: number) {
      if (e.nativeEvent.key === 'Backspace' && !pickupCode[index] && index > 0) {
         inputRefs.current[index - 1]?.focus();
      }
   }

   return (
      <SafeAreaView className="flex-1 bg-white">
         {/* 1. Top Header */}
         <View className="px-5 py-3.5 flex-row justify-between items-center border-b border-slate-100 bg-white">
            <View className="flex-row items-center">
               <Pressable onPress={() => router.back()} className="mr-3 p-1">
                  <ArrowLeft size={22} color="#1e293b" />
               </Pressable>
               <View>
                  <Text className="text-lg font-bold text-slate-900">Pickup Confirmation</Text>
                  <Text className="text-slate-400 text-xs">Order #ORD-8920 • 4 items</Text>
               </View>
            </View>

            <View className="flex-row items-center space-x-2.5">
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
            <View className="px-5 py-3.5 bg-white border-b border-slate-100">
               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <View className="flex-row items-center pr-6">
                     {STEPS.map((step, i) => (
                        <React.Fragment key={i}>
                           <View className="items-center min-w-[64px]">
                              <View
                                 className={`w-9 h-9 rounded-full items-center justify-center mb-1.5 ${step.active
                                    ? 'bg-primary shadow-md shadow-primary/30'
                                    : step.completed
                                       ? 'bg-primary'
                                       : 'bg-slate-100 border border-slate-200'
                                    }`}
                              >
                                 {step.completed ? (
                                    <Check size={16} color="white" />
                                 ) : step.isRider ? (
                                    <Bike size={16} color="white" />
                                 ) : (
                                    <Clock size={16} color="#94a3b8" />
                                 )}
                              </View>
                              <Text
                                 className={`text-[10px] font-bold text-center ${step.active ? 'text-primary font-extrabold' : step.completed ? 'text-slate-900' : 'text-slate-400'
                                    }`}
                              >
                                 {step.label}
                              </Text>
                              {step.time && (
                                 <Text
                                    className={`text-[9px] font-bold mt-0.5 ${step.active ? 'text-primary' : 'text-slate-400'
                                       }`}
                                 >
                                    {step.time}
                                 </Text>
                              )}
                           </View>
                           {i < STEPS.length - 1 && (
                              <View
                                 className={`w-8 mx-1 -mt-5 ${step.completed ? 'border-primary' : 'border-slate-200'
                                    }`}
                                 style={{ borderTopWidth: 1, borderStyle: 'dashed' }}
                              />
                           )}
                        </React.Fragment>
                     ))}
                  </View>
               </ScrollView>
            </View>

            {/* 3. Rider Arrived Banner */}
            <View className="mx-5 mt-4 bg-amber-50/70 border border-amber-200/80 p-3.5 rounded-2xl flex-row items-center justify-between shadow-sm">
               <View className="flex-row items-center flex-1 mr-2">
                  <View className="w-8 h-8 rounded-full bg-amber-100 items-center justify-center mr-2.5">
                     <Clock size={18} color="#d97706" />
                  </View>
                  <View className="flex-1">
                     <Text className="text-slate-900 font-bold text-xs">Rider has arrived</Text>
                     <Text className="text-slate-500 text-[10px] mt-0.5">
                        Please verify and hand over the order.
                     </Text>
                  </View>
               </View>
               <View className="bg-white px-3 py-1.5 rounded-xl border border-amber-200 items-center">
                  <Text className="text-slate-400 text-[8px] font-bold uppercase">Waiting time</Text>
                  <Text className="text-amber-600 font-extrabold text-xs">04:38 <Text className="text-[9px] font-normal text-slate-500">min</Text></Text>
               </View>
            </View>

            {/* 4. Assigned Rider Card */}
            <View className="mx-5 mt-4">
               <View className="flex-row items-center mb-2">
                  <User size={16} color="#4F26D9" />
                  <Text className="font-bold text-slate-900 text-xs ml-1.5">Assigned Rider</Text>
               </View>

               <View className="bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm space-y-3">
                  <View className="flex-row items-center justify-between">
                     <View className="flex-row items-center flex-1 mr-2">
                        <Image
                           source={{ uri: 'https://avatar.iran.liara.run/public/33' }}
                           className="w-16 h-16 rounded-full bg-slate-100 mr-3"
                        />
                        <View className="flex-1">
                           <View className="flex-row items-center flex-wrap gap-1">
                              <Text className="font-bold text-slate-900 text-base">Michael Daniel</Text>
                              <View className="flex-row items-center">
                                 <Star size={12} color="#f59e0b" fill="#f59e0b" />
                                 <Text className="text-slate-900 font-bold text-xs ml-0.5">4.8</Text>
                              </View>
                              <View className="bg-emerald-100 px-2 py-0.5 rounded-md ml-1">
                                 <Text className="text-emerald-700 text-[9px] font-bold">Rider arrived</Text>
                              </View>
                           </View>

    
                           <Text className="text-slate-400 text-xs">Purple Bajaj Boxer</Text>
                           <Text className="text-slate-900 font-bold text-xs mt-0.5">BKJ 123 XY</Text>
                        </View>
                     </View>

                  
                  </View>

                  {/* Bottom Rider Stats */}
                  <View className="flex-row justify-between pt-3 border-t border-slate-100 px-1">
                     <View>
                        <Text className="text-slate-400 text-[9px] font-bold uppercase">Arrived at</Text>
                        <Text className="text-slate-900 font-bold text-xs mt-0.5">10:05 AM</Text>
                     </View>

                     <View className="items-center">
                        <Text className="text-slate-400 text-[9px] font-bold uppercase">Distance from store</Text>
                        <Text className="text-slate-900 font-bold text-xs mt-0.5">0.4 km</Text>
                     </View>

                     <View className="items-end">
                        <Text className="text-slate-400 text-[9px] font-bold uppercase">Rider status</Text>
                        <View className="flex-row items-center mt-0.5">
                           <View className="w-2 h-2 rounded-full bg-emerald-500 mr-1" />
                           <Text className="text-emerald-600 font-bold text-xs">Online</Text>
                        </View>
                     </View>
                  </View>
               </View>
            </View>

            {/* 5. Verify Rider Section */}
            <View className="mx-5 mt-5">
               <View className="flex-row items-center justify-between mb-1">
                  <View className="flex-row items-center">
                     <ShieldCheck size={16} color="#4F26D9" />
                     <Text className="font-bold text-slate-900 text-xs ml-1.5">Verify Rider</Text>
                  </View>
                  {isVerified && (
                     <View className="flex-row items-center bg-emerald-50 px-2 py-0.5 rounded-full">
                        <CheckCircle2 size={11} color="#10b981" />
                        <Text className="text-emerald-600 font-bold text-[9px] ml-1">Verified</Text>
                     </View>
                  )}
               </View>
               <Text className="text-slate-400 text-[10px] mb-3">
                  Enter the 6-digit pickup code provided by the rider.
               </Text>

               <View className="bg-white border border-slate-100 rounded-[28px] overflow-hidden shadow-sm p-3">
                  <View className="border-2 border-dashed border-purple-200 bg-purple-50/20 rounded-2xl p-5 items-center">
                     <View className="flex-row space-x-1.5 mb-2">
                        {pickupCode.map((digit, i) => (
                           <TextInput
                              key={i}
                              ref={(ref) => { inputRefs.current[i] = ref; }}
                              value={digit}
                              onChangeText={(text) => handleCodeChange(text, i)}
                              onKeyPress={(e) => handleKeyPress(e, i)}
                              keyboardType="number-pad"
                              maxLength={1}
                              className={`w-9 h-11 border rounded-md bg-white text-center font-bold text-slate-900 text-base ${digit ? 'border-primary' : 'border-slate-300'
                                 }`}
                           />
                        ))}
                     </View>
                     <Text className="font-bold text-slate-900 text-xs text-center">
                        Enter 6-digit pickup code
                     </Text>
                     <Text className="text-slate-400 text-[9px] text-center mt-0.5">
                        Ask the rider for the code to confirm pickup
                     </Text>
                  </View>
               </View>
            </View>

            {/* 6. Package Details */}
            <View className="mx-5 mt-5 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm space-y-2.5">
               <View className="flex-row items-center mb-0.5">
                  <ShoppingBag size={14} color="#4F26D9" />
                  <Text className="font-bold text-slate-900 text-xs ml-1.5">Package Details</Text>
               </View>

               <View className="flex-row justify-between items-center py-1">
                  <Text className="text-slate-500 text-[10px]">Number of bags</Text>
                  <View className="flex-row items-center bg-slate-100 rounded-xl px-2 py-1">
                     <Pressable
                        onPress={() => setBagCount(Math.max(1, bagCount - 1))}
                        className="p-1"
                     >
                        <Minus size={12} color="#64748b" />
                     </Pressable>
                     <Text className="mx-2.5 font-bold text-slate-900 text-xs">{bagCount}</Text>
                     <Pressable onPress={() => setBagCount(bagCount + 1)} className="p-1">
                        <Plus size={12} color="#4F26D9" />
                     </Pressable>
                  </View>
               </View>

               <View className="py-1">
                  <Text className="text-slate-500 text-[10px] mb-1.5">Special instructions</Text>
                  <View className="flex-row flex-wrap gap-1.5">
                     <View className="bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
                        <Text className="text-red-500 font-bold text-[8px]">Fragile items</Text>
                     </View>
                     <View className="bg-blue-50 border border-blue-100 px-2 py-0.5 rounded-md">
                        <Text className="text-blue-500 font-bold text-[8px]">Keep upright</Text>
                     </View>
                  </View>
               </View>

               <View className="flex-row justify-between items-center py-1 border-t border-slate-50">
                  <Text className="text-slate-500 text-[10px]">Order type</Text>
                  <Text className="font-bold text-slate-900 text-[10px]">Standard Delivery</Text>
               </View>

               <View className="flex-row justify-between items-center py-1 border-t border-slate-50">
                  <Text className="text-slate-500 text-[10px]">Total weight (approx.)</Text>
                  <Text className="font-bold text-slate-900 text-[10px]">2.3 kg</Text>
               </View>
            </View>

            {/* 7. Confirm Handover Primary Button */}
            <View className="mx-5 mt-5">
               <Pressable
                  onPress={() => router.push('/orders/tracking')}
                  className="h-14 rounded-2xl flex-row justify-center items-center p-2 bg-primary shadow-lg shadow-primary/30 active:bg-primary/90"
               >
                  <View style={{ marginRight: 8 }}>
                     <ShieldCheck size={20} color="white" />
                  </View>
                  <View className="items-center">
                     <Text className="font-extrabold text-sm text-white">
                        Confirm Handover to Rider
                     </Text>
                     <Text className="font-medium text-[9px] mt-0.5 text-white/80">
                        Order will be marked as Picked Up
                     </Text>
                  </View>
               </Pressable>
            </View>

            <View className="h-10" />
         </ScrollView>
      </SafeAreaView>
   );
}