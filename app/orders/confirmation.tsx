import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Image, SafeAreaView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Headphones, MoreVertical, Phone, MessageSquare, 
  CheckCircle2, Clock, ScanQrCode, Keyboard, 
  AlertTriangle, Info, Check, ShieldCheck, 
  Minus, Plus, MapPin, Bike
} from 'lucide-react-native';

const STEPS = [
  { label: 'Confirmed', active: false, completed: true },
  { label: 'Preparing', active: false, completed: true },
  { label: 'Ready', active: false, completed: true },
  { label: 'Rider Arrived', time: '10:05 AM', active: true, completed: false },
  { label: 'Picked Up', active: false, completed: false },
  { label: 'Out for Delivery', active: false, completed: false },
];

export default function PickupConfirmationScreen() {
  const router = useRouter();
  const [bagCount, setBagCount] = useState(2);
  const [verifyTab, setVerifyTab] = useState('qr');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* 1. Header */}
      <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-50">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#000" />
          </Pressable>
          <View>
            <Text className="text-lg font-bold text-slate-900">Pickup Confirmation</Text>
            <Text className="text-slate-400 text-[10px]">Order #ORD-8920 • 4 items</Text>
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
        {/* 2. Status Stepper (Detailed) */}
        <View className="px-6 py-6 bg-white">
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
            {STEPS.map((step, i) => (
              <React.Fragment key={i}>
                <View className="items-center w-20">
                  <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 
                    ${step.active ? 'bg-primary border-4 border-primary/20' : step.completed ? 'bg-primary' : 'bg-slate-100'}`}>
                    {step.completed ? <Check size={14} color="white" /> : (step.label === 'Rider Arrived' ? <Bike size={14} color="white" /> : <Clock size={14} color="#cbd5e1" />)}
                  </View>
                  <Text className={`text-[7px] font-bold text-center ${step.active || step.completed ? 'text-primary' : 'text-slate-400'}`}>{step.label}</Text>
                  {step.time && <Text className="text-[6px] text-primary font-bold mt-0.5">{step.time}</Text>}
                </View>
                {i < STEPS.length - 1 && <View className={`w-8 h-[1px] mt-4 mx-0.5 border-dashed ${step.completed ? 'bg-primary' : 'bg-slate-100'}`} />}
              </React.Fragment>
            ))}
          </ScrollView>
        </View>

        {/* 3. Rider Arrived Banner */}
        <View className="mx-6 mt-4 bg-orange-50 border border-orange-100 p-4 rounded-2xl flex-row items-center justify-between">
           <View className="flex-row items-center flex-1">
              <Clock size={18} color="#f97316" />
              <View className="ml-3">
                 <Text className="text-slate-900 font-bold text-xs">Rider has arrived</Text>
                 <Text className="text-slate-500 text-[10px]">Please verify and hand over the order.</Text>
              </View>
           </View>
           <View className="bg-white px-3 py-1.5 rounded-xl border border-orange-200 items-center">
              <Text className="text-orange-500 font-bold text-xs">04:38</Text>
              <Text className="text-slate-400 text-[6px] font-bold uppercase">Waiting time</Text>
           </View>
        </View>

        {/* 4. Assigned Rider */}
        <View className="px-6 mt-6">
           <View className="flex-row items-center mb-4">
              <CheckCircle2 size={16} color="#4F26D9" />
              <Text className="font-bold text-slate-900 ml-2">Assigned Rider</Text>
           </View>
           <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm">
              <View className="flex-row items-center mb-4">
                <Image source={{ uri: 'https://avatar.iran.liara.run/public/33' }} className="w-16 h-16 rounded-full" />
                <View className="flex-1 ml-4">
                   <View className="flex-row items-center">
                      <Text className="text-lg font-bold text-slate-900">Michael Daniel</Text>
                      <View className="flex-row items-center ml-2">
                         <CheckCircle2 size={12} color="#f59e0b" fill="#f59e0b" />
                         <Text className="text-slate-900 text-[10px] font-bold ml-1">4.8</Text>
                      </View>
                      <View className="bg-green-100 px-2 py-0.5 rounded ml-2">
                         <Text className="text-green-700 text-[8px] font-bold">Rider arrived</Text>
                      </View>
                   </View>
                   <Text className="text-slate-400 text-[10px] mt-1">0908 123 4567 • Purple Bajaj Boxer</Text>
                   <Text className="text-slate-900 font-bold text-[11px] mt-0.5">BKJ 123 XY</Text>
                </View>
                <View className="flex-row space-x-2">
                   <Pressable className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center"><Phone size={18} color="#4F26D9" /></Pressable>
                   <Pressable className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center"><MessageSquare size={18} color="#4F26D9" /></Pressable>
                </View>
              </View>
              <View className="flex-row border-t border-slate-50 pt-4">
                 <RiderStat label="Arrived at" value="10:05 AM" />
                 <RiderStat label="Distance from store" value="0.4 km" />
                 <RiderStat label="Rider status" value="Online" status />
              </View>
           </View>
        </View>

        {/* 5. Verify Rider Section */}
        <View className="px-6 mt-8">
           <View className="flex-row items-center mb-4">
              <ShieldCheck size={16} color="#4F26D9" />
              <Text className="font-bold text-slate-900 ml-2">Verify Rider</Text>
           </View>
           <Text className="text-slate-400 text-[10px] mb-4">Scan QR code or enter the 6-digit pickup code provided by the rider.</Text>
           
           <View className="bg-white border border-slate-100 rounded-[32px] overflow-hidden">
              <View className="flex-row bg-slate-50/50 p-1">
                 <Pressable onPress={() => setVerifyTab('qr')} className={`flex-1 flex-row items-center justify-center py-3 rounded-2xl ${verifyTab === 'qr' ? 'bg-primary' : ''}`}>
                    <ScanQrCode size={18} color={verifyTab === 'qr' ? 'white' : '#64748b'} />
                    <Text className={`font-bold text-xs ml-2 ${verifyTab === 'qr' ? 'text-white' : 'text-slate-500'}`}>Scan QR Code</Text>
                 </Pressable>
                 <Pressable onPress={() => setVerifyTab('code')} className={`flex-1 flex-row items-center justify-center py-3 rounded-2xl ${verifyTab === 'code' ? 'bg-primary' : ''}`}>
                    <Keyboard size={18} color={verifyTab === 'code' ? 'white' : '#64748b'} />
                    <Text className={`font-bold text-xs ml-2 ${verifyTab === 'code' ? 'text-white' : 'text-slate-500'}`}>Enter Pickup Code</Text>
                 </Pressable>
              </View>

              <View className="p-8 items-center border-b-2 border-dashed border-primary/20">
                 {verifyTab === 'qr' ? (
                   <View className="items-center">
                      <View className="w-32 h-32 border-4 border-primary rounded-3xl items-center justify-center mb-4">
                         <ScanQrCode size={60} color="#4F26D9" />
                      </View>
                      <Text className="text-slate-900 font-bold text-sm">Scan the rider's QR code</Text>
                      <Text className="text-slate-400 text-[10px] mt-1">Ask the rider to show the QR code in their app</Text>
                   </View>
                 ) : (
                    <View className="flex-row space-x-2">
                       {[1, 2, 3, 4, 5, 6].map(i => (
                         <View key={i} className="w-10 h-12 bg-slate-50 border border-slate-200 rounded-xl" />
                       ))}
                    </View>
                 )}
              </View>
           </View>
        </View>

        {/* 6. Pickup Checklist */}
        <View className="px-6 mt-8">
           <View className="flex-row justify-between items-center mb-4">
              <View className="flex-row items-center">
                 <ShoppingBag size={16} color="#4F26D9" />
                 <Text className="font-bold text-slate-900 ml-2">Pickup Checklist</Text>
              </View>
              <Text className="text-green-500 font-bold text-xs">3 of 3 completed</Text>
           </View>
           <View className="flex-row flex-wrap justify-between">
              <CheckCard label="All items packed" sub="All items are packed correctly" />
              <CheckCard label="Receipt included" sub="Receipt is in the package" />
              <CheckCard label="Sealed package" sub="Package is sealed properly" />
              <CheckCard label="Drinks secured" sub="Drinks are secured and won't spill" />
           </View>
        </View>

        {/* 7. Package Details & Reminders */}
        <View className="flex-row px-6 mt-8 space-x-4 mb-20">
           <View className="flex-1 space-y-4">
              <View className="bg-white border border-slate-100 p-4 rounded-3xl">
                 <Text className="font-bold text-slate-900 text-xs mb-4">Package Details</Text>
                 <View className="flex-row justify-between items-center mb-4">
                    <Text className="text-slate-500 text-[10px]">Number of bags</Text>
                    <View className="flex-row items-center bg-slate-50 rounded-lg px-2 py-1">
                       <Pressable onPress={() => setBagCount(Math.max(1, bagCount-1))}><Minus size={14} color="#64748b" /></Pressable>
                       <Text className="mx-3 font-bold text-slate-900">{bagCount}</Text>
                       <Pressable onPress={() => setBagCount(bagCount+1)}><Plus size={14} color="#4F26D9" /></Pressable>
                    </View>
                 </View>
                 <View className="flex-row flex-wrap gap-2 mb-4">
                    <View className="bg-red-50 px-2 py-1 rounded-md"><Text className="text-red-500 text-[8px] font-bold">Fragile items</Text></View>
                    <View className="bg-blue-50 px-2 py-1 rounded-md"><Text className="text-blue-500 text-[8px] font-bold">Keep upright</Text></View>
                 </View>
                 <SummaryLine label="Order type" value="Standard Delivery" />
                 <SummaryLine label="Total weight (approx.)" value="2.3 kg" />
              </View>
           </View>
           <View className="flex-1">
              <View className="bg-purple-50/50 border border-purple-100 p-4 rounded-3xl">
                 <View className="flex-row items-center mb-3">
                    <Bell size={14} color="#4F26D9" />
                    <Text className="font-bold text-primary text-xs ml-2">Important Reminders</Text>
                 </View>
                 <ReminderItem text="Verify the rider before handing over" />
                 <ReminderItem text="Do not share the pickup code" />
                 <ReminderItem text="Make sure items are complete" />
                 <ReminderItem text="Seal the package securely" />
                 <ReminderItem text="Hand over to the assigned rider only" />
              </View>
           </View>
        </View>
      </ScrollView>

      {/* 8. Footer */}
      <View className="px-6 py-6 border-t border-slate-50 bg-white">
        <Pressable 
          onPress={() => router.push('/orders/tracking')}
          className="bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
        >
          <ShieldCheck size={18} color="white" />
          <Text className="text-white font-bold ml-2 text-lg">Confirm Handover to Rider</Text>
        </Pressable>
        <View className="flex-row space-x-3 mt-4">
           <Pressable className="flex-1 bg-white border border-orange-100 h-12 rounded-xl flex-row items-center justify-center">
              <AlertTriangle size={14} color="#f59e0b" />
              <Text className="text-orange-500 font-bold text-[10px] ml-2">Rider Not Here</Text>
           </Pressable>
           <Pressable className="flex-1 bg-white border border-red-100 h-12 rounded-xl flex-row items-center justify-center">
              <AlertTriangle size={14} color="#ef4444" />
              <Text className="text-red-500 font-bold text-[10px] ml-2">Report Issue</Text>
           </Pressable>
           <Pressable className="flex-1 bg-white border border-slate-200 h-12 rounded-xl flex-row items-center justify-center">
              <MoreVertical size={14} color="#64748b" />
              <Text className="text-slate-600 font-bold text-[10px] ml-2">More Actions</Text>
           </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

// Helpers
function RiderStat({ label, value, status }: any) {
  return (
    <View className="flex-1">
       <Text className="text-slate-400 text-[8px] font-bold uppercase">{label}</Text>
       <View className="flex-row items-center mt-1">
          {status && <View className="w-2 h-2 bg-green-500 rounded-full mr-1.5" />}
          <Text className="text-slate-900 font-bold text-[10px]">{value}</Text>
       </View>
    </View>
  );
}

function CheckCard({ label, sub }: any) {
  return (
    <View className="w-[48%] bg-white border border-slate-100 p-3 rounded-2xl mb-3 flex-row items-center">
       <View className="w-6 h-6 bg-green-500 rounded-full items-center justify-center mr-2">
          <Check size={12} color="white" strokeWidth={4} />
       </View>
       <View className="flex-1">
          <Text className="text-slate-900 font-bold text-[9px]">{label}</Text>
          <Text className="text-slate-400 text-[7px]" numberOfLines={1}>{sub}</Text>
       </View>
    </View>
  );
}

function SummaryLine({ label, value }: any) {
  return (
    <View className="flex-row justify-between items-center mb-2">
       <Text className="text-slate-500 text-[10px]">{label}</Text>
       <Text className="text-slate-900 font-bold text-[10px]">{value}</Text>
    </View>
  );
}

function ReminderItem({ text }: any) {
  return (
    <View className="flex-row items-start mb-2">
       <View className="w-1 h-1 rounded-full bg-primary mt-1.5 mr-2" />
       <Text className="text-slate-600 text-[9px] flex-1 leading-4">{text}</Text>
    </View>
  );
}