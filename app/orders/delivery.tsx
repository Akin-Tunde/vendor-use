import React from 'react';
import { View, Text, ScrollView, Pressable, Image,  } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Headphones, MoreVertical, Phone, MessageSquare, 
  CheckCircle2, Bike, MapPin, Printer, Clock, 
  Navigation, Map as MapIcon, ChevronRight, Wallet, Package
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const STEPS = [
  { label: 'Confirmed', time: '09:05 AM', completed: true },
  { label: 'Preparing', time: '09:20 AM', completed: true },
  { label: 'Ready', time: '09:38 AM', completed: true },
  { label: 'Picked Up', time: '10:02 AM', completed: true },
  { label: 'Out for Delivery', time: '10:15 AM', active: true },
  { label: 'Delivered', time: '--:--', active: false },
];

export default function OutForDeliveryScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* 1. Header */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-50">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <View>
            <Text className="text-lg font-bold text-slate-900">Out for Delivery</Text>
            <Text className="text-slate-400 text-[10px]">#ORD-8917 • 2 items</Text>
          </View>
        </View>
        <View className="flex-row items-center space-x-3">
          <Pressable className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
            <Headphones size={14} color="#4F26D9" />
            <Text className="text-primary font-bold ml-1.5 text-xs">Help</Text>
          </Pressable>
          <MoreVertical size={24} color="#64748b" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 2. Status Stepper */}
        <View className="px-6 py-6 bg-white">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {STEPS.map((step, i) => (
              <React.Fragment key={i}>
                <View className="items-center w-20">
                  <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 
                    ${step.active ? 'bg-primary border-4 border-primary/20' : step.completed ? 'bg-primary' : 'bg-slate-100'}`}>
                    {step.completed || step.active ? <CheckCircle2 size={16} color="white" /> : <Clock size={14} color="#cbd5e1" />}
                  </View>
                  <Text className={`text-[7px] font-bold text-center ${step.active || step.completed ? 'text-primary' : 'text-slate-400'}`}>{step.label}</Text>
                  <Text className={`text-[6px] mt-0.5 font-bold ${step.active ? 'text-primary' : 'text-slate-400'}`}>{step.time}</Text>
                </View>
                {i < STEPS.length - 1 && <View className={`w-8 h-[1px] mt-4 mx-0.5 border-dashed ${step.completed ? 'bg-primary' : 'bg-slate-100'}`} />}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        {/* 3. Transit Banner */}
        <View className="mx-6 mt-4 bg-green-50 border border-green-100 p-4 rounded-2xl flex-row items-center justify-between">
           <View className="flex-row items-center flex-1">
              <View className="bg-green-500 rounded-full p-2">
                 <Navigation size={16} color="white" />
              </View>
              <View className="ml-3">
                 <Text className="text-slate-900 font-bold text-xs">Your order is on the way!</Text>
                 <Text className="text-slate-500 text-[10px]">Rider is 2.4 km away from the customer.</Text>
              </View>
           </View>
           <View className="items-end bg-white px-3 py-1.5 rounded-xl border border-green-100">
              <Text className="text-green-600 font-bold text-xs">10:32 AM</Text>
              <Text className="text-slate-400 text-[6px] font-bold uppercase">(17 mins)</Text>
           </View>
        </View>

        {/* 4. Rider Card */}
        <View className="px-6 mt-6">
           <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm flex-row items-center">
              <Image source={{ uri: 'https://avatar.iran.liara.run/public/33' }} className="w-14 h-14 rounded-full" />
              <View className="flex-1 ml-3">
                 <View className="flex-row items-center">
                    <Text className="font-bold text-slate-900">Michael Daniel</Text>
                    <View className="flex-row items-center ml-2">
                       <CheckCircle2 size={10} color="#f59e0b" fill="#f59e0b" />
                       <Text className="text-slate-900 text-[10px] font-bold ml-1">4.8</Text>
                    </View>
                    <View className="bg-green-100 px-2 py-0.5 rounded ml-2">
                       <Text className="text-green-700 text-[8px] font-bold">On the way</Text>
                    </View>
                 </View>
                 <Text className="text-slate-400 text-[10px] mt-0.5">0908 123 4567 • BKJ 123 XY • Purple Bajaj Boxer</Text>
              </View>
              <View className="flex-row space-x-2">
                 <Pressable className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"><Phone size={16} color="#4F26D9" /></Pressable>
                 <Pressable className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"><MessageSquare size={16} color="#4F26D9" /></Pressable>
              </View>
           </View>
        </View>

        {/* 5. Live Tracking Map View */}
        <View className="px-6 mt-6">
           <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center">
                 <MapIcon size={16} color="#4F26D9" />
                 <Text className="font-bold text-slate-900 ml-2">Live Tracking</Text>
              </View>
              <Text className="text-primary font-bold text-xs">View Full Map &gt;</Text>
           </View>
           <View className="bg-slate-200 h-48 rounded-[32px] overflow-hidden relative">
              <View className="absolute inset-0 bg-blue-50 items-center justify-center">
                 <Text className="text-slate-400 font-bold text-[10px] uppercase tracking-widest">Map Interface</Text>
              </View>
              
              <View className="absolute top-4 left-4 bg-white/95 px-3 py-2 rounded-xl border border-slate-100 flex-row items-center shadow-sm">
                 <Bike size={14} color="#4F26D9" />
                 <Text className="text-slate-900 font-bold text-[10px] ml-2">Rider <Text className="text-primary">2.4 km away</Text></Text>
              </View>
              <View className="absolute bottom-10 right-10 bg-white/95 px-3 py-2 rounded-xl border border-slate-100 flex-row items-center shadow-sm">
                 <MapPin size={14} color="#22c55e" />
                 <Text className="text-slate-900 font-bold text-[10px] ml-2">Customer</Text>
              </View>
           </View>
        </View>

        {/* 6. Order Information */}
        <View className="px-6 mt-6">
          <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm flex-row">
            <View className="flex-1 border-r border-slate-50 pr-4">
              <Text className="text-slate-400 text-[8px] font-bold uppercase mb-2">Customer</Text>
              <View className="flex-row items-center">
                <Text className="text-slate-900 font-bold text-sm">David Williams</Text>
                <View className="bg-primary/10 px-1.5 rounded ml-2"><Text className="text-primary text-[8px] font-bold">VIP</Text></View>
              </View>
              <View className="flex-row items-center mt-2">
                <Phone size={10} color="#94a3b8" />
                <Text className="text-slate-500 text-[10px] ml-2">0806 789 1234</Text>
              </View>
              <View className="flex-row items-start mt-2">
                <MapPin size={10} color="#94a3b8" className="mt-0.5" />
                <Text className="text-slate-400 text-[9px] ml-2 leading-4">23 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</Text>
              </View>
              <Pressable className="mt-3 flex-row items-center">
                <MessageSquare size={10} color="#4F26D9" />
                <Text className="text-primary font-bold text-[9px] ml-2 underline">Delivery Instructions &gt;</Text>
              </Pressable>
            </View>

            <View className="flex-1 pl-4">
              <InfoRow label="Delivery Type" value="Standard Delivery" />
              <InfoRow label="Payment" value="Paid •••• 4242" isCard />
              <InfoRow label="Order Time" value="Today, 09:05 AM" />
            </View>
          </View>
        </View>

        {/* 7. Items & Summary Grid */}
        <View className="flex-row px-6 mt-6 space-x-4 mb-10">
           <View className="flex-1 bg-white border border-slate-100 p-4 rounded-3xl">
              <View className="flex-row justify-between items-center mb-4">
                 <Text className="font-bold text-slate-900 text-xs">Order Items (2)</Text>
                 <ChevronRight size={14} color="#cbd5e1" />
              </View>
              <MiniItemRow emoji="🥤" name="Coca Cola (1.5L)" qty="x1" price="₦2,000" />
              <MiniItemRow emoji="🥔" name="Lay's Classic (145g)" qty="x1" price="₦1,500" />
              <Text className="text-primary font-bold text-[9px] text-center mt-2">View all items &gt;</Text>
           </View>

           <View className="flex-1 bg-white border border-slate-100 p-4 rounded-3xl">
              <Text className="font-bold text-slate-900 text-xs mb-4">Order Summary</Text>
              <SummaryLine label="Subtotal" value="₦24,800" />
              <SummaryLine label="Delivery Fee" value="₦1,000" />
              <SummaryLine label="Service Fee" value="₦500" />
              <View className="flex-row justify-between pt-2 border-t border-slate-50 mt-1">
                 <Text className="text-slate-900 font-bold text-sm">Total</Text>
                 <Text className="text-primary font-bold text-sm">₦26,300</Text>
              </View>
           </View>
        </View>

        {/* 8. Context Banner */}
        <View className="mx-6 mb-10 bg-blue-50/50 p-4 rounded-2xl flex-row items-center">
           <Bike size={18} color="#4F26D9" />
           <Text className="flex-1 ml-3 text-slate-600 text-[10px] leading-4">
             Rider picked up the order at 10:02 AM.{"\n"}The rider is on the way to the customer.
           </Text>
           <Pressable className="bg-white border border-primary/20 px-3 py-1.5 rounded-xl">
              <Text className="text-primary font-bold text-[10px]">View Timeline</Text>
           </Pressable>
        </View>
      </ScrollView>

      {/* 9. Footer Actions */}
      <View className="px-6 py-6 border-t border-slate-50 bg-white flex-row space-x-3">
        <FooterBtn icon={Printer} label="Print Receipt" />
        <FooterBtn icon={MessageSquare} label="Message Customer" />
        <FooterBtn icon={MoreVertical} label="More Actions" />
      </View>
    </SafeAreaView>
  );
}

// Helpers
function InfoRow({ label, value, isCard }: any) {
  return (
    <View className="mb-3">
      <Text className="text-slate-400 text-[8px] font-bold uppercase mb-1">{label}</Text>
      <View className="flex-row items-center">
        {isCard && <View className="w-4 h-2.5 bg-red-500 rounded-sm mr-1.5" />}
        <Text className="text-slate-900 font-bold text-[10px]">{value}</Text>
      </View>
    </View>
  );
}

function MiniItemRow({ emoji, name, qty, price }: any) {
  return (
    <View className="flex-row items-center mb-3">
       <View className="w-8 h-8 bg-slate-50 rounded-lg items-center justify-center mr-2">
          <Text className="text-lg">{emoji}</Text>
       </View>
       <View className="flex-1">
          <Text className="text-slate-900 font-bold text-[9px]" numberOfLines={1}>{name}</Text>
          <View className="flex-row justify-between">
             <Text className="text-slate-400 text-[8px]">{qty}</Text>
             <Text className="text-slate-900 font-bold text-[8px]">{price}</Text>
          </View>
       </View>
    </View>
  );
}

function SummaryLine({ label, value }: any) {
  return (
    <View className="flex-row justify-between mb-1.5">
       <Text className="text-slate-400 text-[9px] font-medium">{label}</Text>
       <Text className="text-slate-900 font-bold text-[9px]">{value}</Text>
    </View>
  );
}

function FooterBtn({ icon: Icon, label }: any) {
  return (
    <Pressable className="flex-1 h-14 border border-slate-200 rounded-2xl flex-row items-center justify-center bg-slate-50">
       <Icon size={16} color="#4F26D9" />
       <Text className="text-slate-600 font-bold ml-2 text-[10px]" numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}