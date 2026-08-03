import { useRouter } from 'expo-router';
import {
   ArrowLeft,
   Bell,
   Bike,
   Check,
   Clock,
   Headphones,
   Keyboard,
   MessageSquare,
   Minus,
   MoreVertical,
   Phone,
   Plus,
   ScanQrCode,
   ShieldCheck,
   ShoppingBag,
   Star,
   User
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STEPS = [
   { label: 'Confirmed', time: '09:15 AM', active: false, completed: true },
   { label: 'Preparing', time: '09:20 AM', active: false, completed: true },
   { label: 'Ready', time: '09:38 AM', active: false, completed: true },
   { label: 'Rider Arrived', time: '10:05 AM', active: true, completed: false, isRider: true },
   { label: 'Picked Up', active: false, completed: false },
   { label: 'Out for Delivery', active: false, completed: false },
];

const CHECKLIST = [
   { label: 'All items packed', sub: 'All items are packed correctly' },
   { label: 'Receipt included', sub: 'Receipt is in the package' },
   { label: 'Sealed package', sub: 'Package is sealed properly' },
   { label: 'Drinks secured', sub: "Drinks are secured and won't spill" },
];

export default function PickupConfirmationScreen() {
   const router = useRouter();
   const [bagCount, setBagCount] = useState(2);
   const [verifyTab, setVerifyTab] = useState<'qr' | 'code'>('qr');

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
            <View className="px-5 py-5 bg-white border-b border-slate-100">
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
                                 className={`w-8 h-[1px] mx-1 border-dashed -mt-5 ${step.completed ? 'bg-primary' : 'bg-slate-200'
                                    }`}
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

                           <Text className="text-slate-500 text-xs mt-1">0908 123 4567</Text>
                           <Text className="text-slate-400 text-xs">Purple Bajaj Boxer</Text>
                           <Text className="text-slate-900 font-bold text-xs mt-0.5">BKJ 123 XY</Text>
                        </View>
                     </View>

                     <View className="flex-row space-x-2">
                        <View className="items-center">
                           <Pressable className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-full items-center justify-center active:bg-purple-100">
                              <Phone size={18} color="#4F26D9" />
                           </Pressable>
                           <Text className="text-[9px] font-bold text-slate-500 mt-1">Call</Text>
                        </View>

                        <View className="items-center">
                           <Pressable className="w-10 h-10 bg-purple-50 border border-purple-100 rounded-full items-center justify-center active:bg-purple-100">
                              <MessageSquare size={18} color="#4F26D9" />
                           </Pressable>
                           <Text className="text-[9px] font-bold text-slate-500 mt-1">Message</Text>
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
               <View className="flex-row items-center mb-1">
                  <ShieldCheck size={16} color="#4F26D9" />
                  <Text className="font-bold text-slate-900 text-xs ml-1.5">Verify Rider</Text>
               </View>
               <Text className="text-slate-400 text-[10px] mb-3">
                  Scan QR code or enter the 6-digit pickup code provided by the rider.
               </Text>

               <View className="bg-white border border-slate-100 rounded-[28px] overflow-hidden shadow-sm p-3">
                  {/* Segmented Tab Bar */}
                  <View className="flex-row bg-slate-100/80 p-1 rounded-2xl mb-4">
                     <Pressable
                        onPress={() => setVerifyTab('qr')}
                        className={`flex-1 flex-row items-center justify-center py-2.5 rounded-xl ${verifyTab === 'qr' ? 'bg-primary shadow-sm' : ''
                           }`}
                     >
                        <ScanQrCode size={16} color={verifyTab === 'qr' ? 'white' : '#64748b'} />
                        <Text className={`font-bold text-xs ml-1.5 ${verifyTab === 'qr' ? 'text-white' : 'text-slate-600'}`}>
                           Scan QR Code
                        </Text>
                     </Pressable>

                     <Pressable
                        onPress={() => setVerifyTab('code')}
                        className={`flex-1 flex-row items-center justify-center py-2.5 rounded-xl ${verifyTab === 'code' ? 'bg-primary shadow-sm' : ''
                           }`}
                     >
                        <Keyboard size={16} color={verifyTab === 'code' ? 'white' : '#64748b'} />
                        <Text className={`font-bold text-xs ml-1.5 ${verifyTab === 'code' ? 'text-white' : 'text-slate-600'}`}>
                           Enter Pickup Code
                        </Text>
                     </Pressable>
                  </View>

                  {/* Inner QR & Code Container */}
                  <View className="border-2 border-dashed border-purple-200 bg-purple-50/20 rounded-2xl p-5 flex-row items-center justify-between relative">
                     {/* QR Side */}
                     <View className="items-center flex-1 pr-2">
                        <View className="w-16 h-16 border-2 border-primary rounded-2xl items-center justify-center mb-2 bg-white">
                           <ScanQrCode size={32} color="#4F26D9" />
                        </View>
                        <Text className="font-bold text-slate-900 text-xs text-center">
                           Scan the rider's QR code
                        </Text>
                        <Text className="text-slate-400 text-[9px] text-center mt-0.5">
                           Ask the rider to show the QR code in their app
                        </Text>
                     </View>

                     {/* OR Circle Divider */}
                     <View className="w-7 h-7 bg-white border border-slate-200 rounded-full items-center justify-center z-10 mx-1">
                        <Text className="text-[9px] font-bold text-slate-400">OR</Text>
                     </View>

                     {/* Pickup Code Side */}
                     <View className="items-center flex-1 pl-2">
                        <View className="flex-row space-x-1 mb-2">
                           {[1, 2, 3, 4, 5, 6].map((i) => (
                              <View
                                 key={i}
                                 className="w-5 h-7 border border-slate-300 rounded-md bg-white items-center justify-center"
                              >
                                 <View className="w-2 h-0.5 bg-slate-300 rounded-full" />
                              </View>
                           ))}
                        </View>
                        <Text className="font-bold text-slate-900 text-xs text-center">
                           Enter 6-digit pickup code
                        </Text>
                        <Text className="text-slate-400 text-[9px] text-center mt-0.5">
                           Ask the rider for the 6-digit code to confirm pickup
                        </Text>
                     </View>
                  </View>
               </View>
            </View>


            {/* 7. Package Details */}
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

         

            {/* 9. Confirm Handover Primary Button */}
            <View className="mx-5 mt-5">
               <Pressable
                  onPress={() => router.push('/orders/tracking')}
                  className="bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90 p-2"
               >
                  <ShieldCheck size={20} color="white" className="mr-2" />
                  <View className="items-center">
                     <Text className="text-white font-extrabold text-sm">
                        Confirm Handover to Rider
                     </Text>
                     <Text className="text-white/80 font-medium text-[9px] mt-0.5">
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

// Subcomponent
function ReminderBullet({ text }: { text: string }) {
   return (
      <View className="flex-row items-start space-x-1.5">
         <Text className="text-primary font-bold text-xs">•</Text>
         <Text className="text-slate-600 text-[10px] flex-1 leading-3.5 font-medium">
            {text}
         </Text>
      </View>
   );
}