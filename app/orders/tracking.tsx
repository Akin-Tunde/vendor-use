import { useRouter } from 'expo-router';
import {
   ArrowLeft,
   ArrowRight,
   Bike,
   CheckCircle2,
   Clock,
   Map as MapIcon,
   MapPin,
   MoreVertical,
   Navigation,
   Package,
   Phone,
   Printer,
   ShoppingBag,
   Wallet
} from 'lucide-react-native';
import React from 'react';
import { Alert, Image, Linking, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STEPS = [
   { label: 'Confirmed', time: '09:15 AM', completed: true },
   { label: 'Preparing', time: '09:20 AM', completed: true },
   { label: 'Ready', time: '09:38 AM', completed: true },
   { label: 'Picked Up', time: '10:12 AM', active: true },
   { label: 'Out for Delivery', time: '--:--', active: false },
];

const RIDER_PHONE = '09081234567';

export default function OrderTrackingScreen() {
   const router = useRouter();

   const handleCallRider = () => {
      Linking.openURL(`tel:${RIDER_PHONE}`).catch(() =>
         Alert.alert('Unable to place call', 'Please try again or contact support.')
      );
   };


   const handleMoreOptions = () => {
      // Wire up to an action sheet / menu as needed
      Alert.alert('Order options', 'More actions coming soon.');
   };

   const handleViewFullMap = () => {
      router.push('/orders/8920/map');
   };

   const handleViewAllItems = () => {
      router.push('/orders/8920/items');
   };

   const handlePrintReceipt = () => {
      router.push('/orders/8920/receipt');
   };

   return (
      <SafeAreaView className="flex-1 bg-[#F8F9FE]">
         {/* 1. Header */}
         <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-50">
            <View className="flex-row items-center">
               <Pressable
                  onPress={() => router.back()}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="Go back"
                  className="mr-4 p-1"
               >
                  <ArrowLeft size={24} color="#000" />
               </Pressable>
               <View>
                  <Text className="text-lg font-bold text-slate-900">Order Picked Up</Text>
                  <Text className="text-slate-400 text-xs">#ORD-8920 • 4 items</Text>
               </View>
            </View>
            <View className="flex-row items-center gap-3">

               <Pressable
                  onPress={handleMoreOptions}
                  hitSlop={8}
                  accessibilityRole="button"
                  accessibilityLabel="More options"
                  className="p-1"
               >
                  <MoreVertical size={24} color="#64748b" />
               </Pressable>
            </View>
         </View>

         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* 2. Status Stepper */}
            <View
               className="px-5 py-3.5 bg-white border-b border-slate-50"
               accessibilityRole="progressbar"
               accessibilityLabel="Order status: Picked Up, step 4 of 5"
            >
               <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                  {STEPS.map((step, i) => (
                     <React.Fragment key={i}>
                        <View className="items-center w-20">
                           <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 
                    ${step.active ? 'bg-primary border-4 border-primary/20' : step.completed ? 'bg-primary' : 'bg-slate-100'}`}>
                              {step.completed || step.active ? <CheckCircle2 size={16} color="white" /> : <Clock size={14} color="#cbd5e1" />}
                           </View>
                           <Text className={`text-[10px] font-bold text-center ${step.active || step.completed ? 'text-primary' : 'text-slate-400'}`}>{step.label}</Text>
                           <Text className={`text-[9px] mt-0.5 font-bold ${step.active ? 'text-green-500' : 'text-slate-400'}`}>{step.time}</Text>
                        </View>
                        {i < STEPS.length - 1 && <View className={`w-8 h-[1px] mt-4 mx-0.5 border-dashed ${step.completed ? 'bg-primary' : 'bg-slate-100'}`} />}
                     </React.Fragment>
                  ))}
               </ScrollView>
            </View>

            {/* 3. Success Banner */}
            <View className="mx-6 mt-4 bg-green-50 border border-green-100 p-4 rounded-2xl flex-row items-center justify-between">
               <View className="flex-row items-center flex-1">
                  <View className="bg-green-500 rounded-full p-1">
                     <CheckCircle2 size={14} color="white" />
                  </View>
                  <View className="ml-3">
                     <Text className="text-slate-900 font-bold text-xs">Order successfully picked up!</Text>
                     <Text className="text-slate-500 text-[10px]">The rider is now on the way to the customer.</Text>
                  </View>
               </View>
               <View className="items-end">
                  <Text className="text-slate-400 text-[9px] font-bold uppercase">Picked up at</Text>
                  <Text className="text-green-600 font-bold text-xs">10:12 AM</Text>
               </View>
            </View>

            {/* 4. Rider Info */}
            <View className="px-6 mt-6">
               <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm">
                  <View className="flex-row items-center mb-4">
                     <Image
                        source={{ uri: 'https://avatar.iran.liara.run/public/33' }}
                        className="w-14 h-14 rounded-full bg-slate-100"
                        accessibilityLabel="Photo of rider Michael Daniel"
                     />
                     <View className="flex-1 ml-3">
                        <View className="flex-row items-center flex-wrap">
                           <Text className="font-bold text-slate-900">Michael Daniel</Text>
                           <View className="flex-row items-center ml-2">
                              <CheckCircle2 size={10} color="#f59e0b" fill="#f59e0b" />
                              <Text className="text-slate-900 text-[10px] font-bold ml-1">4.8</Text>
                           </View>
                           <View className="bg-green-100 px-2 py-0.5 rounded ml-2">
                              <Text className="text-green-700 text-[9px] font-bold">On the way</Text>
                           </View>
                        </View>
                        <Text className="text-slate-400 text-[10px] mt-0.5"> Purple Bajaj Boxer • BKJ 123 XY</Text>
                     </View>
                     <View className="flex-row gap-2">
                        
                     </View>
                  </View>
                  <View className="flex-row border-t border-slate-50 pt-4">
                     <RiderTrackingStat label="Picked up at" value="10:12 AM" />
                     <RiderTrackingStat label="Distance to customer" value="3.2 km" />
                     <RiderTrackingStat label="Estimated arrival" value="10:38 AM" />
                     <RiderTrackingStat label="Rider Status" value="On the way" status />
                  </View>
               </View>
            </View>

            {/* 5. Live Tracking Map View */}
            <View className="px-6 mt-6">
               <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                     <Navigation size={16} color="#4F26D9" />
                     <Text className="font-bold text-slate-900 ml-2">Live Delivery Tracking</Text>
                  </View>
                  <Pressable
                     onPress={handleViewFullMap}
                     hitSlop={8}
                     accessibilityRole="button"
                     accessibilityLabel="View full map"
                  >
                     <Text className="text-primary font-bold text-xs">View Full Map &gt;</Text>
                  </Pressable>
               </View>
               <Pressable
                  onPress={handleViewFullMap}
                  accessibilityRole="button"
                  accessibilityLabel="Open live delivery map"
                  className="bg-slate-200 h-44 rounded-[32px] overflow-hidden relative"
               >
                  {/* Mock Map Image */}
                  <View className="absolute inset-0 bg-blue-50 items-center justify-center">
                     <MapIcon size={40} color="#cbd5e1" />
                     <Text className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-widest">Live Map View</Text>
                  </View>

                  {/* Map Overlays */}
                  <View className="absolute top-4 left-4 bg-white/90 px-3 py-2 rounded-xl border border-slate-100 flex-row items-center">
                     <Bike size={14} color="#4F26D9" />
                     <Text className="text-slate-900 font-bold text-[10px] ml-2">Rider <Text className="text-primary">3.2 km away</Text></Text>
                  </View>
                  <View className="absolute bottom-4 right-4 bg-white/90 px-3 py-2 rounded-xl border border-slate-100 flex-row items-center">
                     <MapPin size={14} color="#22c55e" />
                     <Text className="text-slate-900 font-bold text-[10px] ml-2">Customer</Text>
                  </View>
               </Pressable>
            </View>

          

            {/* 7. Order Summary (Full Width - Stacked Below Delivery Details) */}
            <View className="px-6 mt-3">
               <View className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm">
                  <View className="flex-row items-center mb-3">
                     <Wallet size={14} color="#4F26D9" />
                     <Text className="font-bold text-slate-900 text-xs ml-2">Order Summary</Text>
                  </View>
                  <SummaryLine label="Subtotal" value="₦32,800" />
                  <SummaryLine label="Delivery Fee" value="₦1,000" />
                  <SummaryLine label="Service Fee" value="₦500" />
                  <View className="flex-row justify-between pt-2 border-t border-slate-100 mt-2">
                     <Text className="text-slate-900 font-bold text-sm">Total</Text>
                     <Text className="text-primary font-bold text-sm">₦34,300</Text>
                  </View>
               </View>
            </View>

            {/* 8. Items Preview */}
            <View className="px-6 mt-6">
               <View className="flex-row justify-between items-center mb-3">
                  <View className="flex-row items-center">
                     <Package size={16} color="#4F26D9" />
                     <Text className="font-bold text-slate-900 ml-2">Items (4)</Text>
                  </View>
                  <Pressable
                     onPress={handleViewAllItems}
                     hitSlop={8}
                     accessibilityRole="button"
                     accessibilityLabel="View all items in this order"
                  >
                     <Text className="text-primary font-bold text-xs">View all items &gt;</Text>
                  </Pressable>
               </View>
               <View className="flex-row gap-3">
                  <MiniItem emoji="🍌" label="Banana" qty="x2" />
                  <MiniItem emoji="🌾" label="Rice" qty="x1" />
                  <MiniItem emoji="🛢️" label="Oil" qty="x1" />
                  <MiniItem emoji="🥛" label="Milk" qty="x1" />
               </View>
            </View>

            <View className="h-4" />
         </ScrollView>

         {/* 9. Footer Actions */}
         <View className="px-6 py-6 border-t border-slate-50 bg-white flex-row gap-3">
            <FooterBtn icon={Printer} label="Print Receipt" onPress={handlePrintReceipt} />
            <Pressable
               onPress={() => router.push('/orders/delivered')}
               accessibilityRole="button"
               accessibilityLabel="Track live delivery"
               className="flex-[2] h-14 bg-primary rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
            >
               <ArrowRight size={18} color="white" />
               <Text className="text-white font-bold ml-2 text-sm">Track Live Delivery</Text>
            </Pressable>
         </View>
      </SafeAreaView>
   );
}

// Helpers
function RiderTrackingStat({ label, value, status }: any) {
   return (
      <View className="flex-1">
         <Text className="text-slate-400 text-[9px] font-bold uppercase">{label}</Text>
         <View className="flex-row items-center mt-1">
            {status && <View className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />}
            <Text className={`font-bold text-[11px] ${status ? 'text-green-600' : 'text-slate-900'}`}>{value}</Text>
         </View>
      </View>
   );
}

function SummaryLine({ label, value }: any) {
   return (
      <View className="flex-row justify-between mb-1.5">
         <Text className="text-slate-400 text-[10px] font-medium">{label}</Text>
         <Text className="text-slate-900 font-bold text-[10px]">{value}</Text>
      </View>
   );
}

function MiniItem({ emoji, label, qty }: any) {
   return (
      <View
         className="bg-white border border-slate-100 rounded-2xl p-2 items-center flex-1"
         accessibilityLabel={`${label}, quantity ${qty.replace('x', '')}`}
      >
         <Text className="text-xl">{emoji}</Text>
         <Text className="text-slate-400 text-[9px] font-bold mt-1 uppercase">{label}</Text>
         <Text className="text-slate-900 font-bold text-[10px]">{qty}</Text>
      </View>
   );
}

function FooterBtn({ icon: Icon, label, onPress }: any) {
   return (
      <Pressable
         onPress={onPress}
         accessibilityRole="button"
         accessibilityLabel={label}
         className="flex-1 h-14 border border-slate-200 rounded-2xl flex-row items-center justify-center bg-slate-50 active:bg-slate-100"
      >
         <Icon size={16} color="#4F26D9" />
         <Text className="text-slate-600 font-bold ml-2 text-[10px]" numberOfLines={1}>{label}</Text>
      </Pressable>
   );
}