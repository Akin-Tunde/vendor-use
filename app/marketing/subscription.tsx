import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Check, Sparkles } from 'lucide-react-native';

export default function PremiumSubscriptionScreen() {
  const router = useRouter();
  const [billing, setBilling] = useState('monthly');
  const [selectedTier, setSelectedTier] = useState('pro');

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Premium Subscription</Text>
            <Text className="text-slate-400 text-xs">Choose the perfect plan to grow your business.</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Billing Toggle */}
        <View className="bg-slate-100 p-1 rounded-2xl flex-row self-center mb-6 w-64">
          <Pressable 
            onPress={() => setBilling('monthly')}
            className={`flex-1 py-2 rounded-xl items-center ${billing === 'monthly' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-xs ${billing === 'monthly' ? 'text-slate-900' : 'text-slate-500'}`}>Monthly</Text>
          </Pressable>
          <Pressable 
            onPress={() => setBilling('yearly')}
            className={`flex-1 py-2 rounded-xl items-center flex-row justify-center ${billing === 'yearly' ? 'bg-white shadow-sm' : ''}`}
          >
            <Text className={`font-bold text-xs ${billing === 'yearly' ? 'text-slate-900' : 'text-slate-500'}`}>Yearly</Text>
            <View className="bg-green-100 px-1.5 py-0.5 rounded ml-1"><Text className="text-green-700 text-[8px] font-bold">Save 20%</Text></View>
          </Pressable>
        </View>

        {/* Tiers List */}
        <View className="space-y-4 mb-12">
          {/* Starter Plan */}
          <TierCard 
            title="Starter" 
            price="₦9,999" 
            period="/month" 
            features={['Verified badge', 'Basic analytics', 'Standard support', 'Up to 200 products']}
            selected={selectedTier === 'starter'}
            onSelect={() => setSelectedTier('starter')}
          />

          {/* Pro Plan (Most Popular) */}
          <TierCard 
            title="Pro" 
            badge="Most Popular"
            price="₦19,999" 
            period="/month" 
            features={['Everything in Starter', 'Higher search ranking', 'Advanced analytics', 'Lower commission (8%)', 'Priority support', 'Up to 1,000 products']}
            selected={selectedTier === 'pro'}
            onSelect={() => setSelectedTier('pro')}
            isPopular
          />

          {/* Enterprise Plan */}
          <TierCard 
            title="Enterprise" 
            price="₦39,999" 
            period="/month" 
            features={['Everything in Pro', 'Dedicated account manager', 'Custom features', 'Lowest commission (5%)', 'Unlimited products']}
            selected={selectedTier === 'enterprise'}
            onSelect={() => setSelectedTier('enterprise')}
          />
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          onPress={() => router.push('/marketing/subscription-checkout')}
          className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-lg">Upgrade Now</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function TierCard({ title, badge, price, period, features, selected, onSelect, isPopular }: any) {
  return (
    <Pressable 
      onPress={onSelect}
      className={`p-6 rounded-[32px] border-2 relative ${
        selected ? 'border-primary bg-purple-50/20 shadow-md' : 'border-slate-100 bg-white'
      }`}
    >
      {badge && (
        <View className="absolute top-4 right-4 bg-primary px-3 py-1 rounded-full">
          <Text className="text-white font-bold text-[9px]">{badge}</Text>
        </View>
      )}

      <Text className="font-bold text-slate-900 text-lg">{title}</Text>
      <View className="flex-row items-baseline mt-1 mb-4">
        <Text className="text-3xl font-bold text-slate-900">{price}</Text>
        <Text className="text-slate-400 text-xs ml-1">{period}</Text>
      </View>

      <View className="space-y-2">
        {features.map((f: string, i: number) => (
          <View key={i} className="flex-row items-center">
            <Check size={14} color="#4F26D9" className="mr-2" strokeWidth={3} />
            <Text className="text-slate-700 text-xs font-medium">{f}</Text>
          </View>
        ))}
      </View>
    </Pressable>
  );
}