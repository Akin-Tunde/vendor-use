import React, { useState } from 'react';
import { View, Text,  ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Sparkles } from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const CAMPAIGN_TYPES = [
  { id: 'product', title: 'Sponsored Product', desc: 'Promote specific products to increase visibility and sales.', emoji: '📦' },
  { id: 'store', title: 'Sponsored Store', desc: 'Boost your store visibility to attract more customers.', emoji: '🏪' },
  { id: 'flash', title: 'Flash Sale', desc: 'Run a time-limited sale to create excitement.', emoji: '⚡' },
  { id: 'discount', title: 'Discount Campaign', desc: 'Offer discounts on products or categories.', emoji: '🏷️' },
  { id: 'freedel', title: 'Free Delivery', desc: 'Promote free delivery to increase conversions.', emoji: '🚚' },
  { id: 'buyxgety', title: 'Buy X Get Y', desc: 'Offer "Buy X Get Y" deals to boost sales.', emoji: '🎁' },
];

export default function CreateCampaignScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('product');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Create Campaign</Text>
            <Text className="text-slate-400 text-xs">Step 1 of 3: Choose Type</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="font-bold text-slate-900 text-base mb-1">Choose Campaign Type</Text>
        <Text className="text-slate-400 text-xs mb-4">Select the type of campaign you want to create.</Text>

        <View className="space-y-3 mb-12">
          {CAMPAIGN_TYPES.map((c) => {
            const isSelected = selectedType === c.id;
            return (
              <Pressable
                key={c.id}
                onPress={() => setSelectedType(c.id)}
                className={`p-4 rounded-3xl border-2 flex-row items-center justify-between ${
                  isSelected ? 'border-primary bg-purple-50/40' : 'border-slate-100 bg-white'
                }`}
              >
                <View className="flex-row items-center flex-1 mr-3">
                  <View className="w-12 h-12 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center mr-3">
                    <Text className="text-2xl">{c.emoji}</Text>
                  </View>
                  <View className="flex-1">
                    <Text className="font-bold text-slate-900 text-sm">{c.title}</Text>
                    <Text className="text-slate-400 text-xs mt-0.5 leading-4">{c.desc}</Text>
                  </View>
                </View>

                <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                  {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.back()}
          className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}