import React, { useState } from 'react';
import { View, Text, ScrollView, Pressable, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, HelpCircle, Clock, Calendar, Plus, 
  Bike, Timer, ShoppingBag, DollarSign, Lightbulb, ChevronRight, X 
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BusinessHoursScreen() {
  const router = useRouter();
  const [monSunOpen, setMonSunOpen] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <Pressable 
          onPress={() => router.back()} 
          className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50"
        >
          <ArrowLeft size={20} color="#000" />
        </Pressable>

        <Text className="text-lg font-bold text-slate-900">Business Hours & Delivery Settings</Text>

        <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
          <HelpCircle size={18} color="#64748b" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
  

        {/* Section 1: Business Hours */}
        <View className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Business Hours</Text>

          <View className="flex-row items-center justify-between py-2 border-b border-slate-50">
            <View className="flex-row items-center flex-1 mr-2">
              <View className="w-10 h-10 bg-purple-100 rounded-2xl items-center justify-center mr-3">
                <Calendar size={18} color="#4F26D9" />
              </View>
              <View>
                <Text className="font-bold text-slate-900 text-xs">Monday - Sunday</Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">Open 07:00 AM - 10:00 PM</Text>
              </View>
            </View>
            <Switch value={monSunOpen} onValueChange={setMonSunOpen} trackColor={{ false: '#e2e8f0', true: '#4F26D9' }} />
          </View>

          <View className="flex-row items-center justify-between py-2 border-b border-slate-50">
            <View className="flex-row items-center flex-1 mr-2">
              <View className="w-10 h-10 bg-orange-100 rounded-2xl items-center justify-center mr-3">
                <Calendar size={18} color="#f97316" />
              </View>
              <View>
                <Text className="font-bold text-slate-900 text-xs">Sunday</Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">Open 08:00 AM - 09:00 PM</Text>
              </View>
            </View>
            <ChevronRight size={16} color="#cbd5e1" />
          </View>

          <Pressable className="flex-row items-center justify-between py-2">
            <View className="flex-row items-center">
              <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
                <Plus size={18} color="#4F26D9" />
              </View>
              <View>
                <Text className="font-bold text-primary text-xs">Add Special Hours</Text>
                <Text className="text-slate-400 text-[10px] mt-0.5">Set different hours for holidays or special days</Text>
              </View>
            </View>
            <ChevronRight size={16} color="#cbd5e1" />
          </Pressable>
        </View>

        {/* Section 2: Delivery Settings */}
        <View className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Delivery Settings</Text>

          <SettingRow icon={Bike} label="Delivery Radius" value="Within 12 km from your store" bg="bg-green-50" iconColor="#22c55e" />
          <SettingRow icon={Timer} label="Preparation Time" value="20 - 30 minutes" bg="bg-blue-50" iconColor="#3b82f6" />
          <SettingRow icon={ShoppingBag} label="Minimum Order Amount" value="₦2,000.00" bg="bg-purple-50" iconColor="#4F26D9" />
          <SettingRow icon={DollarSign} label="Delivery Fee" value="₦500.00" bg="bg-orange-50" iconColor="#f97316" />
        </View>

        {/* Tip Box */}
        <View className="mx-6 mt-4 bg-purple-50/60 border border-purple-100 p-4 rounded-3xl flex-row items-center mb-6 shadow-sm">
          <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
            <Lightbulb size={20} color="#4F26D9" />
          </View>
          <View className="flex-1">
            <Text className="font-bold text-primary text-xs">Tips</Text>
            <Text className="text-slate-500 text-[10px] mt-0.5 leading-3.5">Keep your business hours updated to avoid order cancellations and customer disappointment.</Text>
          </View>
        </View>

        {/* Save Button */}
        <View className="px-6 mb-12">
          <Pressable className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90">
            <Text className="text-white font-bold text-base">Save Changes</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ icon: Icon, label, value, bg, iconColor }: any) {
  return (
    <View className="flex-row items-center justify-between py-2 border-b border-slate-50">
      <View className="flex-row items-center flex-1 mr-2">
        <View className={`w-10 h-10 ${bg} rounded-2xl items-center justify-center mr-3`}>
          <Icon size={18} color={iconColor} />
        </View>
        <View>
          <Text className="font-bold text-slate-900 text-xs">{label}</Text>
          <Text className="text-slate-400 text-[10px] mt-0.5">{value}</Text>
        </View>
      </View>
      <Pressable>
        <Text className="text-primary font-bold text-xs">Edit</Text>
      </Pressable>
    </View>
  );
}