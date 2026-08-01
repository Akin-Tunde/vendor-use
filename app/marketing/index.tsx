import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, HelpCircle, ChevronDown, Plus, 
  Sparkles, Megaphone, Zap, Tag, Gift, ShoppingBag, 
  ChevronRight, ArrowUpRight
} from 'lucide-react-native';

export default function MarketingHubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Marketing Hub</Text>
            <Text className="text-slate-400 text-xs">Grow your store and boost sales with powerful tools</Text>
          </View>
        </View>

        <Pressable className="p-1">
          <HelpCircle size={22} color="#64748b" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Total Spent Purple Hero Banner */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30">
          <View className="flex-row justify-between items-center mb-2">
            <Text className="text-white/80 text-xs font-medium">Total Spent</Text>
            <Pressable className="bg-white/10 px-3 py-1 rounded-full flex-row items-center">
              <Text className="text-white text-xs font-medium mr-1">This Month</Text>
              <ChevronDown size={14} color="white" />
            </Pressable>
          </View>
          <Text className="text-white text-3xl font-bold">₦45,600.00</Text>

          <View className="flex-row border-t border-white/10 mt-4 pt-3">
            <View className="flex-1 border-r border-white/10 pr-2">
              <Text className="text-white/70 text-[10px]">Impressions</Text>
              <Text className="text-white font-bold text-base mt-0.5">👁 128,540</Text>
            </View>
            <View className="flex-1 pl-4">
              <Text className="text-white/70 text-[10px]">Clicks</Text>
              <Text className="text-white font-bold text-base mt-0.5">🖱 8,532</Text>
            </View>
          </View>
        </View>

        {/* Quick Access Services Row */}
        <View className="mx-6 mt-4 flex-row space-x-2">
          <QuickServiceCard label="Subscription" icon="⭐" color="bg-amber-50 border-amber-100" onPress={() => router.push('/marketing/subscription')} />
          <QuickServiceCard label="Delivery Credits" icon="🚚" color="bg-blue-50 border-blue-100" onPress={() => router.push('/marketing/delivery-credits')} />
          <QuickServiceCard label="Business Services" icon="💼" color="bg-purple-50 border-purple-100" onPress={() => router.push('/marketing/business-services')} />
        </View>

        {/* Active Campaigns Section */}
        <View className="px-6 mt-6">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-bold text-slate-900 text-base">Active Campaigns</Text>
            <Pressable><Text className="text-primary font-bold text-xs">See All</Text></Pressable>
          </View>

          <View className="space-y-3">
            <CampaignCard 
              type="Sponsored Product" 
              status="Active" 
              budget="₦15,000" 
              ends="2 days" 
              pct={65} 
              emoji="🍌" 
            />
            <CampaignCard 
              type="Flash Sale" 
              status="Active" 
              budget="₦20,000" 
              ends="5 days" 
              pct={40} 
              emoji="🍓" 
            />
          </View>
        </View>

        {/* Past Campaigns Section */}
        <View className="px-6 mt-6 mb-12">
          <View className="flex-row justify-between items-center mb-3">
            <Text className="font-bold text-slate-900 text-base">Past Campaigns</Text>
            <Pressable><Text className="text-primary font-bold text-xs">See All</Text></Pressable>
          </View>

          <View className="bg-white border border-slate-100 p-4 rounded-3xl flex-row items-center justify-between shadow-sm">
            <View className="flex-row items-center flex-1">
              <View className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center mr-3">
                <Text className="text-2xl">🍿</Text>
              </View>
              <View>
                <Text className="font-bold text-slate-900 text-sm">Discount Campaign</Text>
                <Text className="text-slate-400 text-xs">Budget: ₦10,600</Text>
              </View>
            </View>

            <View className="items-end">
              <View className="bg-slate-100 px-2.5 py-0.5 rounded-full mb-1">
                <Text className="text-slate-600 font-bold text-[9px]">Completed</Text>
              </View>
              <Text className="text-slate-400 text-[10px]">12 May, 2025</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Floating Create Campaign Button */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.push('/marketing/create-campaign')}
          className="bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
        >
          <Plus size={20} color="white" className="mr-2" />
          <Text className="text-white font-bold text-lg">Create Campaign</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function QuickServiceCard({ label, icon, color, onPress }: any) {
  return (
    <Pressable onPress={onPress} className={`flex-1 border p-3 rounded-2xl items-center ${color}`}>
      <Text className="text-xl mb-1">{icon}</Text>
      <Text className="text-slate-900 font-bold text-[10px] text-center" numberOfLines={1}>{label}</Text>
    </Pressable>
  );
}

function CampaignCard({ type, status, budget, ends, pct, emoji }: any) {
  return (
    <View className="bg-white border border-slate-100 p-4 rounded-3xl shadow-sm space-y-3">
      <View className="flex-row justify-between items-center">
        <View className="flex-row items-center">
          <View className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center mr-3">
            <Text className="text-xl">{emoji}</Text>
          </View>
          <View>
            <Text className="font-bold text-slate-900 text-sm">{type}</Text>
            <Text className="text-slate-400 text-[10px]">Budget: {budget}</Text>
          </View>
        </View>

        <View className="items-end">
          <View className="bg-green-100 px-2.5 py-0.5 rounded-full mb-1">
            <Text className="text-green-700 font-bold text-[9px]">{status}</Text>
          </View>
          <Text className="text-slate-400 text-[10px]">Ends in {ends}</Text>
        </View>
      </View>

      <View>
        <View className="flex-row justify-between mb-1">
          <Text className="text-slate-400 text-[9px]">Budget Spent</Text>
          <Text className="text-slate-900 font-bold text-[9px]">{pct}% spent</Text>
        </View>
        <View className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <View className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
        </View>
      </View>
    </View>
  );
}