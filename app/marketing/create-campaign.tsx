import { useRouter } from 'expo-router';
import {
  ArrowLeft, Check,
  ChevronRight,
  Rocket
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const CAMPAIGN_TYPES = [
  { id: 'product', title: 'Sponsored Product', desc: 'Promote specific products to increase visibility and sales.', emoji: '📦' },
  { id: 'store', title: 'Sponsored Store', desc: 'Boost your store visibility to attract more customers.', emoji: '🏪' },
  { id: 'flash', title: 'Flash Sale', desc: 'Run a time-limited sale to create excitement.', emoji: '⚡' },
  { id: 'discount', title: 'Discount Campaign', desc: 'Offer discounts on products or categories.', emoji: '🏷️' },
  { id: 'freedel', title: 'Free Delivery', desc: 'Promote free delivery to increase conversions.', emoji: '🚚' },
  { id: 'buyxgety', title: 'Buy X Get Y', desc: 'Offer "Buy X Get Y" deals to boost sales.', emoji: '🎁' },
];

const BUDGET_OPTIONS = [
  { label: '₦1,000 / day', value: '1000' },
  { label: '₦2,500 / day', value: '2500', recommended: true },
  { label: '₦5,000 / day', value: '5000' },
  { label: '₦10,000 / day', value: '10000' },
];

const DURATION_OPTIONS = [
  { label: '3 Days', value: '3' },
  { label: '7 Days', value: '7', selected: true },
  { label: '14 Days', value: '14' },
  { label: '30 Days', value: '30' },
];

export default function CreateCampaignScreen() {
  const router = useRouter();
  const [step, setStep] = useState(1); // 1: Type, 2: Budget & Target, 3: Review & Pay
  const [selectedType, setSelectedType] = useState('product');
  const [selectedBudget, setSelectedBudget] = useState('2500');
  const [selectedDuration, setSelectedDuration] = useState('7');
  const [payMethod, setPayMethod] = useState('wallet');

  const selectedCampaign = CAMPAIGN_TYPES.find((c) => c.id === selectedType);
  const totalCost = parseInt(selectedBudget) * parseInt(selectedDuration);

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Step 3 Launch -> Return to Marketing Hub
      router.replace('/marketing');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={handleBack} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Create Campaign</Text>
            <Text className="text-slate-400 text-xs">
              Step {step} of 3: {step === 1 ? 'Choose Type' : step === 2 ? 'Details & Budget' : 'Review & Launch'}
            </Text>
          </View>
        </View>
      </View>

      {/* Progress Dots Bar */}
      <View className="flex-row px-6 pt-3 pb-1 bg-white border-b border-slate-100 justify-between items-center">
        {[1, 2, 3].map((s) => (
          <React.Fragment key={s}>
            <View className={`flex-row items-center gap-1.5`}>
              <View
                className={`w-6 h-6 rounded-full items-center justify-center ${step >= s ? 'bg-primary' : 'bg-slate-200'
                  }`}
              >
                <Text className="text-white font-bold text-xs">{s}</Text>
              </View>
              <Text
                className={`text-xs font-bold ${step === s ? 'text-primary' : 'text-slate-400'
                  }`}
              >
                {s === 1 ? 'Type' : s === 2 ? 'Budget' : 'Review'}
              </Text>
            </View>
            {s < 3 && <View className={`flex-1 h-0.5 mx-3 ${step > s ? 'bg-primary' : 'bg-slate-200'}`} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* ================= STEP 1: CHOOSE TYPE ================= */}
        {step === 1 && (
          <View className="pb-12">
            <Text className="font-bold text-slate-900 text-base mb-1">Choose Campaign Type</Text>
            <Text className="text-slate-400 text-xs mb-4">Select the type of campaign you want to run.</Text>

            <View className="gap-3">
              {CAMPAIGN_TYPES.map((c) => {
                const isSelected = selectedType === c.id;
                return (
                  <Pressable
                    key={c.id}
                    onPress={() => setSelectedType(c.id)}
                    className={`p-4 rounded-3xl border-2 flex-row items-center justify-between ${isSelected ? 'border-primary bg-purple-50/40' : 'border-slate-100 bg-white'
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

                    <View
                      className={`w-6 h-6 rounded-full border-2 items-center justify-center ${isSelected ? 'border-primary bg-primary' : 'border-slate-300'
                        }`}
                    >
                      {isSelected && <Check size={14} color="white" strokeWidth={3} />}
                    </View>
                  </Pressable>
                );
              })}
            </View>
          </View>
        )}

        {/* ================= STEP 2: DETAILS & BUDGET ================= */}
        {step === 2 && (
          <View className="pb-12 gap-5">
            {/* Target Selection Card */}
            <View className="bg-white border border-slate-100 p-5 rounded-[28px] shadow-sm">
              <Text className="font-bold text-slate-900 text-sm mb-1">Select Target Product</Text>
              <Text className="text-slate-400 text-xs mb-3">Choose the product to promote with this campaign</Text>

              <Pressable className="bg-slate-50 border border-slate-200 p-3.5 rounded-2xl flex-row items-center justify-between">
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">🍌</Text>
                  <View>
                    <Text className="font-bold text-slate-900 text-xs">Fresh Banana (1kg)</Text>
                    <Text className="text-slate-400 text-[10px]">In Stock • ₦1,200</Text>
                  </View>
                </View>
                <ChevronRight size={16} color="#64748b" />
              </Pressable>
            </View>

            {/* Daily Budget Selection */}
            <View className="bg-white border border-slate-100 p-5 rounded-[28px] shadow-sm">
              <Text className="font-bold text-slate-900 text-sm mb-1">Daily Budget</Text>
              <Text className="text-slate-400 text-xs mb-3">Higher daily budgets reach more potential buyers</Text>

              <View className="flex-row flex-wrap justify-between gap-y-2.5">
                {BUDGET_OPTIONS.map((b) => {
                  const isSelected = selectedBudget === b.value;
                  return (
                    <Pressable
                      key={b.value}
                      onPress={() => setSelectedBudget(b.value)}
                      className={`w-[48%] p-3.5 rounded-2xl border-2 items-center justify-center ${isSelected ? 'border-primary bg-purple-50/40' : 'border-slate-100 bg-slate-50/50'
                        }`}
                    >
                      <Text className={`font-bold text-xs ${isSelected ? 'text-primary' : 'text-slate-900'}`}>
                        {b.label}
                      </Text>
                      {b.recommended && (
                        <Text className="text-primary font-bold text-[8px] mt-0.5">Recommended</Text>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Campaign Duration */}
            <View className="bg-white border border-slate-100 p-5 rounded-[28px] shadow-sm">
              <Text className="font-bold text-slate-900 text-sm mb-1">Duration</Text>
              <Text className="text-slate-400 text-xs mb-3">How long should this campaign run?</Text>

              <View className="flex-row justify-between gap-x-2">
                {DURATION_OPTIONS.map((d) => {
                  const isSelected = selectedDuration === d.value;
                  return (
                    <Pressable
                      key={d.value}
                      onPress={() => setSelectedDuration(d.value)}
                      className={`flex-1 py-3 rounded-2xl border-2 items-center ${isSelected ? 'border-primary bg-primary' : 'border-slate-100 bg-slate-50/50'
                        }`}
                    >
                      <Text className={`font-bold text-xs ${isSelected ? 'text-white' : 'text-slate-900'}`}>
                        {d.label}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          </View>
        )}

        {/* ================= STEP 3: REVIEW & LAUNCH ================= */}
        {step === 3 && (
          <View className="pb-12 gap-5">
            {/* Campaign Summary Card */}
            <View className="bg-white border border-slate-100 p-5 rounded-[28px] shadow-sm">
              <Text className="font-bold text-slate-900 text-sm mb-3">Campaign Summary</Text>

              <View className="flex-row items-center justify-between pb-3 border-b border-slate-50">
                <Text className="text-slate-500 text-xs">Campaign Type</Text>
                <Text className="font-bold text-slate-900 text-xs">
                  {selectedCampaign?.emoji} {selectedCampaign?.title}
                </Text>
              </View>

              <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
                <Text className="text-slate-500 text-xs">Promoted Item</Text>
                <Text className="font-bold text-slate-900 text-xs">Fresh Banana (1kg)</Text>
              </View>

              <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
                <Text className="text-slate-500 text-xs">Duration</Text>
                <Text className="font-bold text-slate-900 text-xs">{selectedDuration} Days</Text>
              </View>

              <View className="flex-row items-center justify-between py-3 border-b border-slate-50">
                <Text className="text-slate-500 text-xs">Daily Budget</Text>
                <Text className="font-bold text-slate-900 text-xs">₦{parseInt(selectedBudget).toLocaleString()} / day</Text>
              </View>

              <View className="flex-row items-center justify-between pt-3">
                <Text className="font-bold text-slate-900 text-base">Total Cost</Text>
                <Text className="font-bold text-primary text-xl">₦{totalCost.toLocaleString()}.00</Text>
              </View>
            </View>

            {/* Payment Method */}
            <View className="bg-white border border-slate-100 p-5 rounded-[28px] shadow-sm">
              <Text className="font-bold text-slate-900 text-sm mb-3">Payment Source</Text>

              <Pressable
                onPress={() => setPayMethod('wallet')}
                className={`p-3.5 rounded-2xl border-2 flex-row items-center justify-between mb-2.5 ${payMethod === 'wallet' ? 'border-primary bg-purple-50/30' : 'border-slate-100 bg-slate-50/50'
                  }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">👛</Text>
                  <View>
                    <Text className="font-bold text-slate-900 text-xs">Wallet Balance</Text>
                    <Text className="text-slate-500 text-[10px]">Available: ₦842,300.00</Text>
                  </View>
                </View>
                <View
                  className={`w-5 h-5 rounded-full border-2 items-center justify-center ${payMethod === 'wallet' ? 'border-primary bg-primary' : 'border-slate-300'
                    }`}
                >
                  {payMethod === 'wallet' && <Check size={10} color="white" strokeWidth={3} />}
                </View>
              </Pressable>

              <Pressable
                onPress={() => setPayMethod('card')}
                className={`p-3.5 rounded-2xl border-2 flex-row items-center justify-between ${payMethod === 'card' ? 'border-primary bg-purple-50/30' : 'border-slate-100 bg-slate-50/50'
                  }`}
              >
                <View className="flex-row items-center">
                  <Text className="text-2xl mr-3">💳</Text>
                  <View>
                    <Text className="font-bold text-slate-900 text-xs">Paystack (Card)</Text>
                    <Text className="text-slate-400 text-[10px]">Visa, Mastercard, Verve</Text>
                  </View>
                </View>
                <View
                  className={`w-5 h-5 rounded-full border-2 items-center justify-center ${payMethod === 'card' ? 'border-primary bg-primary' : 'border-slate-300'
                    }`}
                >
                  {payMethod === 'card' && <Check size={10} color="white" strokeWidth={3} />}
                </View>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Footer Navigation Action */}
      <View className="p-6 bg-white border-t border-slate-50 flex-row gap-x-3">
        {step > 1 && (
          <Pressable
            onPress={handleBack}
            className="flex-1 h-16 rounded-2xl border border-slate-200 justify-center items-center active:bg-slate-50"
          >
            <Text className="text-slate-700 font-bold text-base">Back</Text>
          </Pressable>
        )}

        <Pressable
          onPress={handleNext}
          className="flex-[2] bg-primary h-16 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg shadow-primary/30 active:bg-primary/90"
        >
          {step === 3 ? (
            <>
              <Rocket size={20} color="white" />
              <Text className="text-white font-bold text-lg">Launch Campaign (₦{totalCost.toLocaleString()})</Text>
            </>
          ) : (
            <Text className="text-white font-bold text-lg">Continue</Text>
          )}
        </Pressable>
      </View>
    </SafeAreaView>
  );
}