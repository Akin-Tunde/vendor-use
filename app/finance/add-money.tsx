import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Bike,
  Briefcase,
  Calculator,
  Check,
  ChevronRight,
  Eye, EyeOff,
  History,
  Megaphone,
  MoreHorizontal,
  Store
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const QUICK_AMOUNTS = [
  { label: '5,000', value: '5,000' },
  { label: '10,000', value: '10,000', selected: true },
  { label: '20,000', value: '20,000' },
  { label: '50,000', value: '50,000' },
  { label: '100,000', value: '100,000' },
  { label: '200,000', value: '200,000' },
];

export default function AddMoneyScreen() {
  const router = useRouter();
  const [selectedAmount, setSelectedAmount] = useState('10,000');
  const [customAmount, setCustomAmount] = useState('');
  const [showBalance, setShowBalance] = useState(true);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center mr-3 active:bg-purple-50"
          >
            <ArrowLeft size={20} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Add Money</Text>
            <Text className="text-slate-400 text-xs">Fund your wallet to use for ads,  promotions and more</Text>
          </View>
        </View>

        <Pressable
          onPress={() => router.push('/finance/transactions')}
          className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl flex-row items-center active:bg-purple-50"
        >
          <History size={16} color="#000" className="mr-1.5" />
          <Text className="text-slate-900 font-bold text-xs">History</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 1. Top Purple Balance Card with Feature Shortcuts */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30 relative overflow-hidden">
          <View className="flex-row justify-between items-start mb-2">
            <View>
              <View className="flex-row items-center">
                <Text className="text-white/80 text-xs font-medium mr-1.5">Current Balance</Text>
                <Pressable onPress={() => setShowBalance(!showBalance)}>
                  {showBalance ? <Eye size={14} color="rgba(255,255,255,0.8)" /> : <EyeOff size={14} color="rgba(255,255,255,0.8)" />}
                </Pressable>
              </View>

              <Text className="text-white text-3xl font-bold mt-1">
                {showBalance ? '₦42,500.00' : '••••••••'}
              </Text>
            </View>

            {/* 3D Wallet Placeholder */}
            <View className="w-16 h-16 bg-white/10 rounded-2xl items-center justify-center border border-white/20">
              <Text className="text-3xl">👛</Text>
            </View>
          </View>

          <Text className="text-white/70 text-[10px] font-medium mt-2 mb-3">Wallet can be used for</Text>

          {/* Wallet Usage Icon Bar */}
          <View className="flex-row justify-between pt-2 border-t border-white/10">
            <UsageItem icon={Megaphone} label="Ads" onPress={() => router.push('/marketing/create-campaign')} />
            <UsageItem icon={Store} label="Promotions" onPress={() => router.push('/marketing/business-services')} />
            <UsageItem icon={Briefcase} label="Subscriptions" onPress={() => router.push('/marketing/subscription')} />
            <UsageItem icon={Bike} label="Delivery Credits" onPress={() => router.push('/marketing/delivery-credits')} />
            <UsageItem icon={MoreHorizontal} label="More" onPress={() => router.push('/marketing')} />
          </View>
        </View>

        {/* 2. Choose Amount Section */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-4">
          <View>
            <Text className="font-bold text-slate-900 text-sm">Choose Amount</Text>
            <Text className="text-slate-400 text-[10px] mt-0.5">Select a quick amount or enter a custom amount</Text>
          </View>

          {/* Quick Amount Grid */}
          <View className="flex-row flex-wrap justify-between gap-y-3">
            {QUICK_AMOUNTS.map((amt) => {
              const isSelected = selectedAmount === amt.value && !customAmount;
              return (
                <Pressable
                  key={amt.value}
                  onPress={() => {
                    setSelectedAmount(amt.value);
                    setCustomAmount('');
                  }}
                  className={`w-[31%] py-3.5 rounded-2xl items-center justify-center relative border-2 ${isSelected ? 'bg-primary border-primary' : 'bg-purple-50/20 border-slate-100'
                    }`}
                >
                  <Text className={`font-bold text-sm ${isSelected ? 'text-white' : 'text-primary'}`}>
                    ₦{amt.label}
                  </Text>

                  {isSelected && (
                    <View className="absolute top-1.5 right-1.5 w-4 h-4 bg-white/20 rounded-full items-center justify-center">
                      <Check size={10} color="white" strokeWidth={3} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>

          {/* Custom Amount */}
          <View>
            <Text className="font-bold text-slate-900 text-xs mb-2">Custom Amount</Text>
            <View className="bg-slate-50/60 border border-slate-200 h-12 px-4 rounded-2xl flex-row items-center">
              <Text className="text-slate-900 font-bold text-base mr-2">₦</Text>
              <TextInput
                placeholder="Enter amount"
                value={customAmount}
                onChangeText={(val) => {
                  setCustomAmount(val);
                  setSelectedAmount('');
                }}
                keyboardType="numeric"
                className="flex-1 text-slate-900 font-bold text-base"
              />
            </View>
          </View>
        </View>

        {/* 3. Why Add Money Callout Card */}
        <Pressable className="mx-6 mt-4 bg-purple-50/60 border border-purple-100 p-4 rounded-3xl flex-row items-center justify-between shadow-sm active:bg-purple-50">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
              <Calculator size={20} color="#4F26D9" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-900 text-xs">Why add money?</Text>
              <Text className="text-slate-500 text-[10px] mt-0.5 leading-3">
                Add funds to run ads, promote products, upgrade subscription or pay for delivery credits.
              </Text>
            </View>
          </View>
          <ChevronRight size={16} color="#64748b" />
        </Pressable>

        {/* 4. What You Can Do Checklist Card */}
        <View className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-12 space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">You will be able to</Text>
          <BenefitRow text="Run sponsored ads to boost your store" />
          <BenefitRow text="Promote products to increase visibility" />
          <BenefitRow text="Subscribe to premium plans" />
          <BenefitRow text="Get delivery credits in advance" />
          <BenefitRow text="Cover negative balance if any" />

          {/* Continue Button inside card */}
          <Pressable
            onPress={() => router.push('/finance/payment-method')}
            className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90 mt-4"
          >
            <Text className="text-white font-bold text-base">Continue</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function UsageItem({ icon: Icon, label, onPress }: any) {
  return (
    <Pressable onPress={onPress} className="items-center">
      <View className="w-7 h-7 bg-white/10 rounded-lg items-center justify-center mb-1">
        <Icon size={14} color="white" />
      </View>
      <Text className="text-white/80 text-[8px] font-bold">{label}</Text>
    </Pressable>
  );
}

function BenefitRow({ text }: any) {
  return (
    <View className="flex-row items-center py-1">
      <View className="w-5 h-5 bg-green-100 rounded-full items-center justify-center mr-2.5">
        <Check size={12} color="#22c55e" strokeWidth={3} />
      </View>
      <Text className="text-slate-700 text-xs font-medium">{text}</Text>
    </View>
  );
}