import { useRouter } from 'expo-router';
import { ArrowLeft, Check, CheckCircle2, LayoutGrid, ShoppingBag, ShoppingBasket, UtensilsCrossed } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const BUSINESS_TYPES = [
  { id: 'grocery', title: 'Grocery & Supermarket', description: 'Sell groceries, fresh produce, household items and more.', icon: ShoppingBasket, color: 'bg-purple-100' },
  { id: 'restaurant', title: 'Restaurant & Food', description: 'Sell prepared food, meals, drinks and more.', icon: UtensilsCrossed, color: 'bg-orange-100' },
  { id: 'pharmacy', title: 'Pharmacy & Health', description: 'Sell medicines, health products and personal care items.', icon: ShoppingBag, color: 'bg-green-100' },
  { id: 'fashion', title: 'Fashion & Accessories', description: 'Sell clothing, shoes, bags, jewelry and accessories.', icon: ShoppingBag, color: 'bg-blue-100' },
  { id: 'other', title: 'Other', description: 'Other types of products or services.', icon: LayoutGrid, color: 'bg-slate-100' },
];

export default function BusinessTypeScreen() {
  const [selectedType, setSelectedType] = useState('grocery');
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-6 ">
        <Pressable onPress={() => router.back()} className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50 active:border-purple-200">
          <ArrowLeft size={20} color="#000" />
        </Pressable>
        <Text className="flex-1 text-center text-primary font-bold text-sm">Step 2 of 6</Text>
        <View className="w-10" />
      </View>

      <View className="flex-row items-center justify-center px-5 mt-4 mb-3">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <React.Fragment key={step}>
            <View className={`w-8 h-8 rounded-full items-center justify-center ${step < 2 ? 'bg-primary' : step === 2 ? 'border-2 border-primary bg-white' : 'border border-slate-200 bg-white'}`}>
              {step < 2 ? <CheckCircle2 size={18} color="white" /> : <Text className={step === 2 ? 'text-primary font-bold' : 'text-slate-400'}>{step}</Text>}
            </View>
            {step < 6 && <View className={`flex-1 h-[2px] mx-1 ${step < 2 ? 'bg-primary' : 'bg-slate-100'}`} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <Text className="text-2xl font-bold text-slate-900 leading-tight">Choose Your Business Type</Text>
            <Text className="text-slate-500 mt-2 leading-5">Select the option that best describes your business to help us tailor your experience.</Text>
          </View>
          <View className="w-32 h-32 rounded-2xl items-center justify-center">
            <Image source={require('../../../assets/icons/step-2.png')} className="w-64 h-64" />
          </View>
        </View>

        <Text className="font-bold text-slate-900 text-lg mt-7 mb-4">Select Business Type</Text>

        <View style={{ gap: 16 }} className="pb-12">
          {BUSINESS_TYPES.map((type) => (
            <Pressable
              key={type.id}
              onPress={() => setSelectedType(type.id)}
              className={`flex-row items-center p-4 rounded-3xl border-2 ${selectedType === type.id ? 'border-primary bg-primary/[0.03]' : 'border-slate-100 bg-white'}`}
            >
              <View className={`w-14 h-14 rounded-2xl items-center justify-center mr-4 ${type.color}`}>
                <type.icon size={28} color="#4F26D9" />
              </View>
              <View className="flex-1">
                <Text className="text-base font-bold text-slate-900">{type.title}</Text>
                <Text className="text-slate-500 text-xs mt-1 leading-4">{type.description}</Text>
              </View>
              <View className={`w-6 h-6 rounded-full border-2 items-center justify-center ${selectedType === type.id ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                {selectedType === type.id && <Check size={14} color="white" strokeWidth={3} />}
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <View className="p-6 bg-white border-t border-slate-50 flex-row" style={{ gap: 16 }}>
        <Pressable className="flex-1 border border-slate-200 bg-white h-16 rounded-2xl justify-center items-center active:bg-purple-50 active:border-primary" onPress={() => router.back()}>
          <Text className="text-slate-700 font-bold text-base">Previous</Text>
        </Pressable>

        <Pressable className="flex-1 bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90" onPress={() => router.push('/signup/step3')}>
          <Text className="text-white font-bold text-base">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}