import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { 
  ArrowLeft, Headphones, MoreVertical, Phone, MessageSquare, 
  MapPin, Bike, CreditCard, Wallet, ShoppingBag, 
  ChevronRight, Info, CheckCircle2, Clock, Printer, 
  User, X, Check
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const STEPS = [
  { label: 'New', time: '09:31 AM', active: true, completed: false },
  { label: 'Confirmed', active: false, completed: false },
  { label: 'Preparing', active: false, completed: false },
  { label: 'Ready', active: false, completed: false },
  { label: 'Picked Up', active: false, completed: false },
  { label: 'Delivered', active: false, completed: false },
];

export default function OrderDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* 1. Header */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <View>
            <Text className="text-lg font-bold text-slate-900">Order #{id || 'ORD-8921'}</Text>
            <Text className="text-slate-400 text-[10px]">Placed today, 09:31 AM</Text>
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
                <View className="items-center w-16">
                  <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 
                    ${step.active ? 'bg-primary shadow-lg shadow-primary/40' : step.completed ? 'bg-primary' : 'bg-slate-100'}`}>
                    {step.completed ? <Check size={14} color="white" /> : <ShoppingBag size={14} color={step.active ? 'white' : '#cbd5e1'} />}
                  </View>
                  <Text className={`text-[8px] font-bold text-center ${step.active ? 'text-primary' : 'text-slate-400'}`}>{step.label}</Text>
                  {step.time && <Text className="text-[6px] text-slate-400 mt-0.5">{step.time}</Text>}
                </View>
                {i < STEPS.length - 1 && <View className="w-10 h-[1px] bg-slate-100 mt-4 mx-1 border-dashed" />}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        {/* 3. Accept Order Banner */}
        <View className="mx-6 bg-orange-50/50 border border-orange-100 p-4 rounded-2xl flex-row items-center justify-between">
           <View className="flex-row items-center flex-1">
              <Clock size={18} color="#f97316" />
              <View className="ml-3">
                 <Text className="text-slate-900 font-bold text-xs">Accept order within 1 min 45 sec</Text>
                 <Text className="text-slate-500 text-[10px]">If not accepted, the order may be reassigned.</Text>
              </View>
           </View>
           <View className="bg-white px-3 py-1.5 rounded-xl border border-orange-200">
              <Text className="text-orange-500 font-bold text-xs">01:45</Text>
           </View>
        </View>

        {/* 4. Customer Information */}
        <View className="px-6 mt-8">
           <View className="flex-row items-center mb-4">
              <User size={16} color="#4F26D9" />
              <Text className="font-bold text-slate-900 ml-2">Customer Information</Text>
           </View>
           
           <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm flex-row items-center">
              <View className="w-16 h-16 bg-purple-100 rounded-full items-center justify-center">
                 <Text className="text-primary font-bold text-xl">JD</Text>
              </View>
              <View className="flex-1 ml-4">
                 <View className="flex-row items-center">
                    <Text className="text-lg font-bold text-slate-900 mr-2">John Doe</Text>
                    <View className="bg-primary/10 px-2 py-0.5 rounded mr-1">
                       <Text className="text-primary text-[8px] font-bold">New Customer</Text>
                    </View>
                    <View className="bg-orange-100 px-2 py-0.5 rounded">
                       <Text className="text-orange-700 text-[8px] font-bold">VIP</Text>
                    </View>
                 </View>
                 <View className="flex-row items-center mt-1">
                    <Phone size={12} color="#94a3b8" />
                    <Text className="text-slate-600 text-xs ml-2">0803 123 4567</Text>
                 </View>
                 <View className="flex-row items-start mt-1">
                    <MapPin size={12} color="#94a3b8" className="mt-0.5" />
                    <Text className="text-slate-400 text-[10px] ml-2 leading-4 flex-1">
                       123 Banana Island Road, Ikoyi, Lagos, Nigeria
                    </Text>
                 </View>
              </View>
              <View className="flex-row space-x-2">
                 <Pressable className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center"><Phone size={18} color="#4F26D9" /></Pressable>
                 <Pressable className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center"><MessageSquare size={18} color="#4F26D9" /></Pressable>
              </View>
           </View>
        </View>

        {/* 5. Logistics Grid */}
        <View className="flex-row flex-wrap px-6 mt-6 justify-between">
           <LogisticsCard icon={Bike} label="Delivery Type" value="Express Delivery" color="text-primary" />
           <LogisticsCard icon={Wallet} label="Payment" value="Paid" color="text-green-500" />
           <LogisticsCard icon={CreditCard} label="Payment Method" value="Card" subIcon />
           <LogisticsCard icon={ShoppingBag} label="Order Type" value="Delivery" />
        </View>

        {/* 6. Order Items */}
        <View className="px-6 mt-8">
           <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                 <ShoppingBag size={16} color="#4F26D9" />
                 <Text className="font-bold text-slate-900 ml-2">Order Items (2)</Text>
              </View>
              <Text className="text-primary font-bold text-xs">See all items</Text>
           </View>
           
           <View className="space-y-4">
              <OrderItem name="Banana (Bunch)" desc="Fresh Cavendish Banana" price="₦6,500" qty="x1" />
              <OrderItem name="Red Apple" desc="Fresh Red Apple (1kg)" price="₦12,150" qty="x1" />
           </View>

           {/* Price Breakdown */}
           <View className="mt-6 space-y-3 border-t border-slate-50 pt-4">
              <PriceRow label="Subtotal" value="₦18,650" />
              <PriceRow label="Delivery Fee" value="₦1,000" />
              <PriceRow label="Service Fee" value="₦500" hasInfo />
              <View className="flex-row justify-between pt-2">
                 <Text className="text-lg font-bold text-slate-900">Total</Text>
                 <Text className="text-lg font-bold text-slate-900">₦20,150</Text>
              </View>
           </View>
        </View>

        {/* 7. Timeline & Notes */}
        <View className="flex-row px-6 mt-8 space-x-4 pb-20">
           <View className="flex-1 bg-white border border-slate-100 p-4 rounded-3xl">
              <View className="flex-row items-center mb-4">
                 <Clock size={14} color="#64748b" />
                 <Text className="font-bold text-slate-900 text-xs ml-2">Order Timeline</Text>
              </View>
              <TimelineItem label="Order Placed" time="09:31 AM" completed />
              <TimelineItem label="Awaiting your confirmation" />
              <TimelineItem label="Preparing" />
           </View>
           <View className="flex-1 space-y-3">
              <NoteBox title="Additional Notes" text="Please ring the bell and wait. I have a gate code: 1234 Leave it with the security." />
              <NoteBox title="Customer Note" text="Please ring the bell and wait. I have a gate code: 1234 Leave it with the security." />
           </View>
        </View>
      </ScrollView>

      {/* 8. Footer Actions */}
      <View className="px-6 py-6 border-t border-slate-50 bg-white">
        {/* Recommended Actions Row */}
        <View className="flex-row justify-between mb-6">
           <IconAction icon={Printer} label="Print Receipt" />
           <IconAction icon={User} label="View Customer" />
           <IconAction icon={Phone} label="Call Customer" />
           <IconAction icon={MapPin} label="View on Map" />
        </View>

        <View className="flex-row space-x-3">
          <Pressable className="flex-1 h-14 border border-red-100 rounded-2xl flex-row items-center justify-center">
            <X size={18} color="#ef4444" />
            <Text className="text-red-500 font-bold ml-2">Reject Order</Text>
          </Pressable>
          <Pressable className="flex-1 h-14 border border-primary/20 rounded-2xl flex-row items-center justify-center">
            <MessageSquare size={18} color="#4F26D9" />
            <Text className="text-primary font-bold ml-2">Message Customer</Text>
          </Pressable>
          <Pressable className="flex-[2] h-14 bg-primary rounded-2xl flex-row items-center justify-center shadow-lg shadow-primary/30">
            <Check size={18} color="white" />
            <Text className="text-white font-bold ml-2">Accept Order</Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Subcomponents
function LogisticsCard({ icon: Icon, label, value, color = 'text-slate-900', subIcon }: any) {
  return (
    <View className="w-[23%] bg-slate-50/50 border border-slate-100 p-3 rounded-2xl mb-4">
       <Icon size={14} color="#4F26D9" className="mb-2" />
       <Text className="text-slate-400 text-[8px] font-bold uppercase">{label}</Text>
       <View className="flex-row items-center mt-1">
          <Text className={`${color} text-[10px] font-bold`} numberOfLines={1}>{value}</Text>
          {subIcon && <View className="w-2 h-2 bg-red-500 rounded-full ml-1" />}
       </View>
    </View>
  );
}

function OrderItem({ name, desc, price, qty }: any) {
  return (
    <View className="flex-row items-center">
       <View className="w-14 h-14 bg-slate-50 rounded-xl items-center justify-center">
          <Text className="text-2xl">🍌</Text>
       </View>
       <View className="flex-1 ml-4">
          <Text className="font-bold text-slate-900 text-sm">{name}</Text>
          <Text className="text-slate-400 text-[10px] mt-0.5">{desc}</Text>
          <Text className="text-slate-400 text-[10px] mt-1 font-bold">{price}</Text>
       </View>
       <Text className="text-slate-400 text-xs mx-4">{qty}</Text>
       <Text className="font-bold text-slate-900 text-sm">{price}</Text>
    </View>
  );
}

function PriceRow({ label, value, hasInfo }: any) {
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

function TimelineItem({ label, time, completed }: any) {
  return (
    <View className="flex-row items-start mb-4">
       <View className="items-center mr-3">
          <View className={`w-2.5 h-2.5 rounded-full ${completed ? 'bg-primary' : 'bg-slate-200'}`} />
          <View className="w-[1px] h-8 bg-slate-100" />
       </View>
       <View className="flex-1 flex-row justify-between">
          <Text className={`text-[10px] font-bold ${completed ? 'text-slate-900' : 'text-slate-400'}`}>{label}</Text>
          {time && <Text className="text-primary text-[10px] font-bold">{time}</Text>}
       </View>
    </View>
  );
}

function NoteBox({ title, text }: any) {
  return (
    <View className="bg-slate-50/50 border border-slate-100 p-3 rounded-2xl">
       <View className="flex-row items-center mb-2">
          <MessageSquare size={12} color="#64748b" />
          <Text className="text-slate-900 font-bold text-[10px] ml-1.5">{title}</Text>
       </View>
       <Text className="text-slate-500 text-[9px] leading-4">{text}</Text>
    </View>
  );
}

function IconAction({ icon: Icon, label }: any) {
  return (
    <Pressable className="bg-slate-50 border border-slate-100 px-3 py-2.5 rounded-2xl flex-row items-center w-[23%] justify-center">
       <Icon size={14} color="#4F26D9" />
       <Text className="text-slate-600 font-bold text-[8px] ml-1.5" numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}