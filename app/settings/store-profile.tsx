import React from 'react';
import { View, Text, ScrollView, Pressable, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Camera, ChevronRight, Store, ImageIcon, 
  MapPin, Phone, FileText, Edit3, Star 
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoreProfileScreen() {
  const router = useRouter();

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

        <Text className="text-xl font-bold text-slate-900">Store Profile</Text>

        <Pressable className="bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100">
          <Text className="text-primary font-bold text-xs">Preview Store</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Cover Photo Header */}
        <View className="mx-6 mt-4 h-36 bg-emerald-900 rounded-[32px] relative overflow-hidden justify-between p-4 shadow-sm">
          <View className="self-end">
            <Pressable className="bg-black/40 border border-white/20 px-3 py-1.5 rounded-full flex-row items-center">
              <Camera size={12} color="white" className="mr-1.5" />
              <Text className="text-white font-bold text-[10px]">Change Cover</Text>
            </Pressable>
          </View>
        </View>

        {/* Profile Logo & Title */}
        <View className="mx-6 -mt-12 mb-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
          <View className="flex-row justify-between items-end">
            <View className="w-20 h-20 bg-green-100 rounded-2xl items-center justify-center border-4 border-white shadow-md relative">
              <Text className="text-4xl">🧺</Text>
              <Pressable className="absolute -bottom-1 -right-1 bg-primary p-1.5 rounded-full border-2 border-white">
                <Camera size={10} color="white" />
              </Pressable>
            </View>

            <View className="bg-green-100 px-3 py-1 rounded-full flex-row items-center">
              <View className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
              <Text className="text-green-800 font-bold text-[10px]">Active</Text>
            </View>
          </View>

          <Text className="text-xl font-bold text-slate-900 mt-3">Green Basket Groceries</Text>
          <Text className="text-slate-400 text-xs">ID: ST-45872</Text>
        </View>

        {/* Profile Settings Options */}
        <View className="mx-6 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm mb-4 space-y-1">
          <ProfileRow icon={Store} label="Store Information" sub="Store name, description, category" bg="bg-purple-100" iconColor="#4F26D9" />
          <ProfileRow icon={ImageIcon} label="Store Logo & Cover" sub="Update your logo and cover image" bg="bg-orange-100" iconColor="#f97316" />
          <ProfileRow icon={MapPin} label="Store Address" sub="Lagos, Nigeria" bg="bg-blue-100" iconColor="#3b82f6" />
          <ProfileRow icon={Phone} label="Contact Information" sub="Phone, email and website" bg="bg-green-100" iconColor="#22c55e" />
          <ProfileRow icon={FileText} label="Business Documents" sub="CAC, Tax ID and other documents" bg="bg-purple-100" iconColor="#4F26D9" />
        </View>

        {/* Profile Completion Card */}
        <View className="mx-6 bg-purple-50/60 border border-purple-100 p-5 rounded-[32px] flex-row items-center justify-between mb-6 shadow-sm">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
              <Star size={20} color="#4F26D9" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-900 text-xs">Complete Your Profile</Text>
              <Text className="text-slate-500 text-[10px] mt-0.5 leading-3">A complete profile builds trust and attracts more customers.</Text>
            </View>
          </View>

          <View className="w-14 h-14 rounded-full border-4 border-primary items-center justify-center">
            <Text className="font-bold text-primary text-xs">80%</Text>
          </View>
        </View>

        {/* Edit Button */}
        <View className="px-6 mb-12">
          <Pressable className="bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90">
            <Edit3 size={18} color="white" className="mr-2" />
            <Text className="text-white font-bold text-base">Edit Store Profile</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function ProfileRow({ icon: Icon, label, sub, bg, iconColor }: any) {
  return (
    <Pressable className="flex-row items-center justify-between py-3 border-b border-slate-50 active:bg-purple-50/20 rounded-xl px-2">
      <View className="flex-row items-center flex-1 mr-2">
        <View className={`w-10 h-10 ${bg} rounded-2xl items-center justify-center mr-3`}>
          <Icon size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="font-bold text-slate-900 text-xs">{label}</Text>
          <Text className="text-slate-400 text-[10px] mt-0.5">{sub}</Text>
        </View>
      </View>
      <ChevronRight size={16} color="#cbd5e1" />
    </Pressable>
  );
}