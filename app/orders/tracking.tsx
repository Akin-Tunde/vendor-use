import React from 'react';
import { View, Text, ScrollView, Pressable, Image,  } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Headphones, MoreVertical, Phone, MessageSquare, 
  CheckCircle2, Bike, MapPin, Printer, ArrowRight,
  Info, Clock, Navigation, Map as MapIcon, ChevronRight, ShoppingBag , Wallet, Bell, Package
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const STEPS = [
  { label: 'Confirmed', time: '09:15 AM', completed: true },
  { label: 'Preparing', time: '09:20 AM', completed: true },
  { label: 'Ready', time: '09:38 AM', completed: true },
  { label: 'Picked Up', time: '10:12 AM', active: true },
  { label: 'Out for Delivery', time: '--:--', active: false },
];

export default function OrderTrackingScreen() {
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
            <Text className="text-lg font-bold text-slate-900">Order Picked Up</Text>
            <Text className="text-slate-400 text-[10px]">#ORD-8920 • 4 items</Text>
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
                  <Text className={`text-[6px] mt-0.5 font-bold ${step.active ? 'text-green-500' : 'text-slate-400'}`}>{step.time}</Text>
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
              <Text className="text-slate-400 text-[6px] font-bold uppercase">Picked up at</Text>
              <Text className="text-green-600 font-bold text-xs">10:12 AM</Text>
           </View>
        </View>

        {/* 4. Rider Info */}
        <View className="px-6 mt-6">
           <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm">
              <View className="flex-row items-center mb-4">
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
                   <Text className="text-slate-400 text-[10px] mt-0.5">0908 123 4567 • Purple Bajaj Boxer • BKJ 123 XY</Text>
                </View>
                <View className="flex-row space-x-2">
                   <Pressable className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"><Phone size={16} color="#4F26D9" /></Pressable>
                   <Pressable className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"><MessageSquare size={16} color="#4F26D9" /></Pressable>
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
              <Text className="text-primary font-bold text-xs">View Full Map &gt;</Text>
           </View>
           <View className="bg-slate-200 h-44 rounded-[32px] overflow-hidden relative">
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
           </View>
        </View>

        {/* 6. Info Grid (Delivery & Summary) */}
        <View className="flex-row px-6 mt-6 space-x-4">
           <View className="flex-1 bg-white border border-slate-100 p-4 rounded-3xl">
              <View className="flex-row items-center mb-3">
                 <ShoppingBag size={14} color="#4F26D9" />
                 <Text className="font-bold text-slate-900 text-xs ml-2">Delivery Details</Text>
              </View>
              <Text className="text-slate-400 text-[10px] uppercase font-bold">Customer</Text>
              <View className="flex-row items-center mt-1">
                 <Text className="text-slate-900 font-bold text-sm">Mary Johnson</Text>
                 <View className="bg-primary/10 px-1.5 rounded ml-2"><Text className="text-primary text-[8px] font-bold">VIP</Text></View>
              </View>
              <Text className="text-slate-500 text-[11px] mt-1">0807 654 3210</Text>
              <Text className="text-slate-400 text-[10px] mt-1 leading-4" numberOfLines={2}>123 Banana Island Road, Ikoyi, Lagos, Nigeria</Text>
           </View>
           <View className="flex-1 bg-white border border-slate-100 p-4 rounded-3xl">
              <View className="flex-row items-center mb-3">
                 <Wallet size={14} color="#4F26D9" />
                 <Text className="font-bold text-slate-900 text-xs ml-2">Order Summary</Text>
              </View>
              <SummaryLine label="Subtotal" value="₦32,800" />
              <SummaryLine label="Delivery Fee" value="₦1,000" />
              <SummaryLine label="Service Fee" value="₦500" />
              <View className="flex-row justify-between pt-2 border-t border-slate-50 mt-1">
                 <Text className="text-slate-900 font-bold text-sm">Total</Text>
                 <Text className="text-primary font-bold text-sm">₦34,300</Text>
              </View>
           </View>
        </View>

        {/* 7. Items Preview */}
        <View className="px-6 mt-6">
           <View className="flex-row justify-between items-center mb-3">
              <View className="flex-row items-center">
                 <Package size={16} color="#4F26D9" />
                 <Text className="font-bold text-slate-900 ml-2">Items (4)</Text>
              </View>
              <Text className="text-primary font-bold text-xs">View all items &gt;</Text>
           </View>
           <View className="flex-row space-x-3">
              <MiniItem emoji="🍌" label="Banana" qty="x2" />
              <MiniItem emoji="🌾" label="Rice" qty="x1" />
              <MiniItem emoji="🛢️" label="Oil" qty="x1" />
              <MiniItem emoji="🥛" label="Milk" qty="x1" />
           </View>
        </View>

        {/* 8. Vertical Timeline & Next Steps */}
        <View className="flex-row px-6 mt-8 space-x-4 mb-20">
           <View className="flex-1">
              <View className="space-y-4">
                 <TimelineRow label="Order Confirmed" time="09:15 AM" completed />
                 <TimelineRow label="Preparing" time="09:20 AM" completed />
                 <TimelineRow label="Ready for Pickup" time="09:38 AM" completed />
                 <TimelineRow label="Picked Up by Rider" time="10:12 AM" active />
                 <TimelineRow label="Out for Delivery" time="--:--" />
              </View>
           </View>
           <View className="flex-1">
              <View className="bg-purple-50/50 border border-purple-100 p-4 rounded-3xl">
                 <View className="flex-row items-center mb-3">
                    <Bell size={14} color="#4F26D9" />
                    <Text className="font-bold text-primary text-xs ml-2">What happens next?</Text>
                 </View>
                 <Text className="text-slate-500 text-[9px] leading-4 mb-3">
                    The rider is responsible for safe delivery to the customer.
                 </Text>
                 <Reminder label="You will be notified when delivered" />
                 <Reminder label="Track the rider in real-time" />
                 <Reminder label="Customer will receive updates" />
              </View>
           </View>
        </View>
      </ScrollView>

      {/* 9. Footer Footer */}
      <View className="px-6 py-6 border-t border-slate-50 bg-white flex-row space-x-3">
        <FooterBtn icon={Printer} label="Print Receipt" />
        <FooterBtn icon={MessageSquare} label="Message Customer" />
        <Pressable className="flex-[1.5] h-14 bg-primary rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30">
          <ArrowRight size={18} color="white" />
          <Text className="text-white font-bold ml-2 text-sm">View Delivery Tracking</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

// Helpers
function RiderTrackingStat({ label, value, status }: any) {
  return (
    <View className="flex-1">
       <Text className="text-slate-400 text-[7px] font-bold uppercase">{label}</Text>
       <View className="flex-row items-center mt-1">
          {status && <View className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1" />}
          <Text className={`font-bold text-[9px] ${status ? 'text-green-600' : 'text-slate-900'}`}>{value}</Text>
       </View>
    </View>
  );
}

function SummaryLine({ label, value }: any) {
  return (
    <View className="flex-row justify-between mb-1">
       <Text className="text-slate-400 text-[9px] font-medium">{label}</Text>
       <Text className="text-slate-900 font-bold text-[9px]">{value}</Text>
    </View>
  );
}

function MiniItem({ emoji, label, qty }: any) {
  return (
    <View className="bg-white border border-slate-100 rounded-2xl p-2 items-center flex-1">
       <Text className="text-xl">{emoji}</Text>
       <Text className="text-slate-400 text-[8px] font-bold mt-1 uppercase">{label}</Text>
       <Text className="text-slate-900 font-bold text-[9px]">{qty}</Text>
    </View>
  );
}

function TimelineRow({ label, time, completed, active }: any) {
  return (
    <View className="flex-row items-start">
       <View className="items-center mr-3">
          <View className={`w-2.5 h-2.5 rounded-full ${completed || active ? 'bg-primary' : 'bg-slate-200'}`} />
          <View className="w-[0.5px] h-8 bg-slate-100" />
       </View>
       <View className="flex-1 flex-row justify-between">
          <Text className={`text-[9px] font-bold ${active || completed ? 'text-slate-900' : 'text-slate-400'}`}>{label}</Text>
          <Text className={`text-[9px] font-bold ${active ? 'text-primary' : 'text-slate-400'}`}>{time}</Text>
       </View>
    </View>
  );
}

function Reminder({ label }: any) {
  return (
    <View className="flex-row items-center mb-2">
       <CheckCircle2 size={12} color="#22c55e" />
       <Text className="text-slate-600 text-[9px] ml-2 font-medium">{label}</Text>
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