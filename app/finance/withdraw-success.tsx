import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, Share2, Check, Copy } from 'lucide-react-native';

export default function WithdrawalSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.push('/(tabs)/finance')} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Withdrawal Successful</Text>
            <Text className="text-slate-400 text-xs">Your funds have been sent to your bank account</Text>
          </View>
        </View>

        <Pressable className="bg-slate-50 border border-slate-100 px-3 py-2 rounded-xl flex-row items-center">
          <Share2 size={16} color="#64748b" className="mr-1" />
          <Text className="text-slate-700 font-bold text-xs">Share</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Confetti Success Banner Box */}
        <View className="mx-6 mt-4 bg-green-50/80 border border-green-200/80 p-6 rounded-[32px] items-center justify-center shadow-sm">
          <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-4 shadow-md shadow-green-500/30">
            <Check size={40} color="white" strokeWidth={4} />
          </View>

          <Text className="text-slate-700 font-medium text-xs">You have successfully withdrawn</Text>
          <Text className="text-green-600 font-bold text-3xl mt-1">₦120,000.00</Text>

          <View className="bg-green-100 px-3 py-1.5 rounded-full mt-3">
            <Text className="text-green-800 font-bold text-xs">Estimated arrival: Within 24 hours</Text>
          </View>
        </View>

        {/* Withdrawal Details Card */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Withdrawal Details</Text>
          <DetailRow label="Withdrawal Amount" value="₦120,000.00" />
          <DetailRow label="Bank Account" value="GTBank •••• 1234" sub="George Taylor" />
          <DetailRow label="Withdrawal Date & Time" value="31 May 2025, 10:45 AM" />
          <View className="flex-row justify-between items-center">
            <Text className="text-slate-500 text-xs">Reference ID</Text>
            <View className="flex-row items-center">
              <Text className="font-bold text-slate-900 text-xs mr-1">WDL-829201-5315</Text>
              <Copy size={12} color="#4F26D9" />
            </View>
          </View>
          <DetailRow label="Processing Fee" value="₦0.00" green />
          <DetailRow label="Estimated Arrival" value="Within 24 hours" sub="1 business day" green />
        </View>
      </ScrollView>

      {/* Footer Navigation Buttons */}
      <View className="p-6 bg-white border-t border-slate-50 space-y-3">
        <Pressable 
          onPress={() => router.replace('/(tabs)/finance')}
          className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-lg">Back to Wallet</Text>
        </Pressable>

        <Pressable 
          onPress={() => router.push('/finance/transactions')}
          className="border border-primary h-16 rounded-2xl justify-center items-center"
        >
          <Text className="text-primary font-bold text-lg">View Transactions</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function DetailRow({ label, value, sub, green }: any) {
  return (
    <View className="flex-row justify-between items-center">
      <Text className="text-slate-500 text-xs">{label}</Text>
      <View className="items-end">
        <Text className={`font-bold text-xs ${green ? 'text-green-600' : 'text-slate-900'}`}>{value}</Text>
        {sub && <Text className="text-slate-400 text-[9px]">{sub}</Text>}
      </View>
    </View>
  );
}