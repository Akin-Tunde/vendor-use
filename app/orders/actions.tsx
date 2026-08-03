import React from 'react';
import { View, Text, ScrollView, Pressable,  } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Headphones, MoreVertical, 
  CheckCircle2, Bike, Calendar, Edit3, Printer, 
  MessageSquare, Phone, MapPin, AlertCircle, 
  XCircle, RotateCcw, Ban, Flag, 
  Copy, History, Archive, ShieldAlert,
  ChevronRight, ShoppingBag
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function MoreActionsScreen() {
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
            <Text className="text-xl font-bold text-slate-900">More Actions</Text>
            <Text className="text-slate-400 text-[10px]">Order #ORD-8920</Text>
          </View>
        </View>
        <Pressable className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
          <Headphones size={14} color="#4F26D9" />
          <Text className="text-primary font-bold ml-1.5 text-xs">Help</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 2. Order Summary Header */}
        <View className="px-6 py-6 border-b border-slate-50 flex-row items-center justify-between">
           <View className="flex-row items-center">
              <View className="w-12 h-12 bg-primary/10 rounded-2xl items-center justify-center mr-4">
                 <ShoppingBag size={24} color="#4F26D9" />
              </View>
              <View>
                 <View className="flex-row items-center">
                    <Text className="font-bold text-slate-900 mr-2">Order #ORD-8920</Text>
                    <View className="bg-purple-100 px-2 py-0.5 rounded">
                       <Text className="text-primary text-[8px] font-bold">Preparing</Text>
                    </View>
                 </View>
                 <Text className="text-slate-400 text-[10px] mt-1">Mary Johnson • 4 items</Text>
                 <Text className="text-slate-400 text-[10px]">Today, 09:15 AM</Text>
              </View>
           </View>
           <View className="flex-row items-center">
              <Text className="text-lg font-bold text-slate-900 mr-2">₦32,800</Text>
              <ChevronRight size={20} color="#cbd5e1" />
           </View>
        </View>

        {/* 3. Action Sections */}
        <View className="pb-10">
           <ActionSection title="Order Actions">
              <ActionRow icon={CheckCircle2} label="Mark as Ready" sub="Order is ready for pickup by rider" color="text-green-500" iconBg="bg-green-50" />
              <ActionRow icon={Bike} label="Assign / Change Rider" sub="Assign a rider or change the current rider" color="text-blue-500" iconBg="bg-blue-50" />
              <ActionRow icon={Calendar} label="Reschedule Order" sub="Change the scheduled time for this order" color="text-orange-500" iconBg="bg-orange-50" />
              <ActionRow icon={MessageSquare} label="Add Note" sub="Add internal note visible only to your team" color="text-primary" iconBg="bg-primary/5" />
              <ActionRow icon={Printer} label="Print Receipt / Invoice" sub="Print order receipt or invoice" color="text-blue-500" iconBg="bg-blue-50" />
           </ActionSection>

           <ActionSection title="Customer Actions">
              <ActionRow icon={MessageSquare} label="Message Customer" sub="Send a message to the customer" color="text-green-500" iconBg="bg-green-50" />
              <ActionRow icon={Phone} label="Call Customer" sub="Call the customer directly" color="text-blue-500" iconBg="bg-blue-50" />
              <ActionRow icon={MapPin} label="View Customer on Map" sub="Open customer location in map" color="text-orange-500" iconBg="bg-orange-50" />
              <ActionRow icon={AlertCircle} label="Report an Issue" sub="Report problem with this order or customer" color="text-red-500" iconBg="bg-red-50" />
           </ActionSection>

           <ActionSection title="Order Management">
              <ActionRow icon={XCircle} label="Cancel Order" sub="Cancel this order" color="text-red-500" iconBg="bg-red-50" />
              <ActionRow icon={RotateCcw} label="Refund Order" sub="Process full or partial refund" color="text-orange-500" iconBg="bg-orange-50" />
              <ActionRow icon={Ban} label="Mark as Failed Delivery" sub="Mark order as failed delivery" color="text-purple-500" iconBg="bg-purple-50" />
              <ActionRow icon={ShieldAlert} label="Flag Order" sub="Flag this order for review" color="text-green-500" iconBg="bg-green-50" />
           </ActionSection>

           <ActionSection title="Other">
              <ActionRow icon={Copy} label="Duplicate Order" sub="Create a duplicate of this order" />
              <ActionRow icon={History} label="View Order Timeline" sub="View full timeline and history" />
              <ActionRow icon={Archive} label="Archive Order" sub="Move order to archive" />
           </ActionSection>
        </View>

        {/* 4. Permissions Footer */}
        <View className="mx-6 mb-10 bg-slate-50 border border-slate-100 p-4 rounded-2xl flex-row items-center">
           <View className="bg-white p-2 rounded-xl border border-slate-100">
              <ShieldAlert size={16} color="#4F26D9" />
           </View>
           <View className="flex-1 ml-3">
              <Text className="text-slate-500 text-[10px] leading-4">
                 Some actions may require additional permissions.{"\n"}
                 Contact your administrator if you cannot perform an action.
              </Text>
           </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

// Subcomponents
function ActionSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <View className="mt-6">
       <Text className="px-6 font-bold text-slate-900 mb-2">{title}</Text>
       <View className="bg-white border-y border-slate-50">
          {children}
       </View>
    </View>
  );
}

function ActionRow({ icon: Icon, label, sub, color = 'text-slate-600', iconBg = 'bg-slate-50' }: any) {
  return (
    <Pressable className="flex-row items-center py-4 px-6 border-b border-slate-50 active:bg-slate-50">
       <View className={`w-10 h-10 ${iconBg} rounded-xl items-center justify-center mr-4`}>
          <Icon size={20} className={color} />
       </View>
       <View className="flex-1">
          <Text className="font-bold text-slate-900 text-sm">{label}</Text>
          <Text className="text-slate-400 text-[10px] mt-0.5">{sub}</Text>
       </View>
       <ChevronRight size={18} color="#cbd5e1" />
    </Pressable>
  );
}