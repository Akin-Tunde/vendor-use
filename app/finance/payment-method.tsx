import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Check,
  CreditCard,
  Info,
  Landmark,
  Layers,
  Lock,
  PhoneCall,
  ShieldCheck,
  Wallet
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const METHODS = [
  {
    id: 'paystack',
    name: 'Paystack',
    desc: 'Pay securely with Paystack',
    showCardLogos: true,
    iconBg: 'bg-cyan-50',
    iconColor: '#06b6d4'
  },
  {
    id: 'flutterwave',
    name: 'Flutterwave',
    desc: 'Pay securely with Flutterwave',
    showCardLogos: true,
    iconBg: 'bg-amber-50',
    iconColor: '#f59e0b'
  },
  {
    id: 'card',
    name: 'Card Payment',
    desc: 'Debit or Credit card',
    showCardLogos: true,
    iconBg: 'bg-purple-50',
    iconColor: '#4F26D9'
  },
  {
    id: 'transfer',
    name: 'Bank Transfer',
    desc: 'Transfer directly from your bank',
    tag: '0 Fee',
    iconBg: 'bg-green-50',
    iconColor: '#22c55e'
  },
  {
    id: 'ussd',
    name: 'USSD',
    desc: 'Pay using USSD',
    tag: '0 Fee',
    iconBg: 'bg-yellow-50',
    iconColor: '#eab308'
  },
  {
    id: 'wallet',
    name: 'Wallet Transfer',
    desc: 'From another wallet',
    tag: '0 Fee',
    iconBg: 'bg-blue-50',
    iconColor: '#3b82f6'
  },
];

export default function ChoosePaymentMethodScreen() {
  const router = useRouter();
  const [selectedMethod, setSelectedMethod] = useState('paystack');

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
            <Text className="text-xl font-bold text-slate-900">Choose Payment Method</Text>
            <Text className="text-slate-400 text-xs">Select how you want to add money to your wallet</Text>
          </View>
        </View>

        <View className="bg-green-100/80 border border-green-200 px-3 py-1.5 rounded-full flex-row items-center">
          <ShieldCheck size={14} color="#22c55e" className="mr-1" />
          <Text className="text-green-800 font-bold text-[10px]">Secure Payment</Text>
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 1. Adding Amount Banner */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30 flex-row justify-between items-center relative overflow-hidden">
          <View className="flex-1 pr-2">
            <Text className="text-white/80 text-xs font-medium">You are adding</Text>
            <Text className="text-white text-3xl font-bold mt-1">₦10,000.00</Text>

            <View className="bg-white/10 self-start px-3 py-1 rounded-full border border-white/20 mt-3">
              <Text className="text-white text-[10px] font-bold">To Wallet Balance</Text>
            </View>
          </View>

          {/* 3D Wallet Plus Graphic Placeholder */}
          <View className="w-20 h-20 bg-white/10 rounded-3xl items-center justify-center border border-white/20">
            <Text className="text-4xl">💳</Text>
          </View>
        </View>

        {/* 2. Recommended Payment Methods */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Recommended</Text>

          {METHODS.map((m) => {
            const isSelected = selectedMethod === m.id;
            return (
              <Pressable
                key={m.id}
                onPress={() => setSelectedMethod(m.id)}
                className={`p-3.5 rounded-2xl border-2 flex-row items-center justify-between ${isSelected ? 'border-primary bg-purple-50/30' : 'border-slate-100 bg-slate-50/40'
                  }`}
              >
                <View className="flex-row items-center flex-1 mr-2">
                  <View className={`w-9 h-9 ${m.iconBg} rounded-xl items-center justify-center mr-3`}>
                    {m.id === 'paystack' && <Layers size={18} color={m.iconColor} />}
                    {m.id === 'flutterwave' && <Layers size={18} color={m.iconColor} />}
                    {m.id === 'card' && <CreditCard size={18} color={m.iconColor} />}
                    {m.id === 'transfer' && <Landmark size={18} color={m.iconColor} />}
                    {m.id === 'ussd' && <PhoneCall size={18} color={m.iconColor} />}
                    {m.id === 'wallet' && <Wallet size={18} color={m.iconColor} />}
                  </View>

                  <View className="flex-1">
                    <Text className="font-bold text-slate-900 text-xs">{m.name}</Text>
                    <Text className="text-slate-400 text-[10px]">{m.desc}</Text>
                  </View>
                </View>

                {/* Card Logos or 0 Fee Badge */}
                {m.showCardLogos ? (
                  <View className="flex-row items-center space-x-1 mr-2 bg-slate-100 px-2 py-1 rounded-lg">
                    <Text className="text-[8px] font-extrabold text-blue-800">VISA</Text>
                    <Text className="text-[8px] font-extrabold text-red-500">MC</Text>
                    <Text className="text-[8px] font-extrabold text-teal-600">verve</Text>
                  </View>
                ) : m.tag ? (
                  <View className="bg-green-100 px-2 py-0.5 rounded-md mr-2">
                    <Text className="text-green-700 font-bold text-[8px]">{m.tag}</Text>
                  </View>
                ) : null}

                {/* Radio Button Indicator */}
                <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${isSelected ? 'border-primary bg-primary' : 'border-slate-300'}`}>
                  {isSelected && <View className="w-2.5 h-2.5 rounded-full bg-white" />}
                </View>
              </Pressable>
            );
          })}
        </View>

      

        {/* 4. Payment Summary Card */}
        <View className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3 mb-12">
          <Text className="font-bold text-slate-900 text-sm mb-1">Payment Summary</Text>

          <View className="flex-row justify-between items-center">
            <Text className="text-slate-500 text-xs">Amount</Text>
            <Text className="font-bold text-slate-900 text-xs">₦10,000.00</Text>
          </View>

          <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
              <Text className="text-slate-500 text-xs">Processing Fee</Text>
              <Info size={12} color="#94a3b8" className="ml-1" />
            </View>
            <Text className="font-bold text-green-600 text-xs">₦0.00</Text>
          </View>

          <View className="flex-row justify-between pt-2 border-t border-slate-100">
            <Text className="font-bold text-slate-900 text-base">Total</Text>
            <Text className="font-bold text-slate-900 text-lg">₦10,000.00</Text>
          </View>
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable
          onPress={() => router.push('/finance/add-money-success')}
          className="bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
        >
          <Lock size={18} color="white" className="mr-2" />
          <Text className="text-white font-bold text-base">Proceed to Payment</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}