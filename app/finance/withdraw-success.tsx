import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Calendar,
  Check,
  Clock,
  Copy,
  FileText,
  Home,
  Landmark,
  Share2,
  ShieldCheck,
  Tag,
  Wallet
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function WithdrawalSuccessScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.push('/(tabs)/finance')}
            className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center mr-3 active:bg-purple-50"
          >
            <ArrowLeft size={20} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Withdrawal Successful</Text>
            <Text className="text-slate-400 text-xs">Your funds have been sent to your bank account</Text>
          </View>
        </View>

        <Pressable className="bg-slate-50 border border-slate-200 px-3.5 py-2 rounded-2xl flex-row items-center active:bg-purple-50">
          <Share2 size={14} color="#64748b" className="mr-1.5" />
          <Text className="text-slate-700 font-bold text-xs">Share</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* 1. Confetti Success Banner Box */}
        <View className="mx-6 mt-4 bg-emerald-50/60 border border-emerald-100 p-6 rounded-[32px] items-center justify-center shadow-sm relative overflow-hidden">
          {/* Confetti Visual Graphics */}
          <View className="w-20 h-20 bg-green-500 rounded-full items-center justify-center mb-3 shadow-lg shadow-green-500/30">
            <Check size={40} color="white" strokeWidth={4} />
          </View>

          <Text className="text-slate-600 font-medium text-xs">You have successfully withdrawn</Text>
          <Text className="text-emerald-600 font-bold text-3xl mt-1">₦120,000.00</Text>

          {/* Estimated Arrival Pill */}
          <View className="bg-emerald-100/80 border border-emerald-200/80 px-3 py-1.5 rounded-full mt-3 flex-row items-center">
            <Clock size={12} color="#047857" className="mr-1.5" />
            <Text className="text-emerald-900 font-bold text-xs">
              Estimated arrival: <Text className="font-extrabold">Within 24 hours</Text>
            </Text>
          </View>
        </View>

        {/* 2. Withdrawal Details Card */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Withdrawal Details</Text>

          <DetailRow icon={Wallet} label="Withdrawal Amount" value="₦120,000.00" />
          <DetailRow icon={Landmark} label="Bank Account" value="GTBank **** 1234" sub="George Taylor" />
          <DetailRow icon={Calendar} label="Withdrawal Date & Time" value="31 May 2025, 10:45 AM" />

          {/* Reference ID Row */}
          <View className="flex-row items-center justify-between py-2 border-b border-slate-50">
            <View className="flex-row items-center">
              <View className="w-8 h-8 bg-green-100 rounded-xl items-center justify-center mr-3">
                <FileText size={16} color="#22c55e" />
              </View>
              <Text className="text-slate-600 text-xs font-medium">Reference ID</Text>
            </View>

            <View className="flex-row items-center">
              <Text className="font-bold text-slate-900 text-xs mr-1.5">WDL-829201-5315</Text>
              <Pressable className="p-1 active:opacity-50">
                <Copy size={14} color="#4F26D9" />
              </Pressable>
            </View>
          </View>

          <DetailRow icon={Tag} label="Processing Fee" value="₦0.00" green />
          <DetailRow icon={Clock} label="Estimated Arrival" value="Within 24 hours" sub="1 business day" green />
        </View>

      
      </ScrollView>

      {/* 4. Footer Navigation Buttons */}
      <View className="p-6 bg-white border-t border-slate-50 space-y-3">
        <Pressable
          onPress={() => router.replace('/(tabs)/finance')}
          className="bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
        >
          <Home size={18} color="white" className="mr-2" />
          <Text className="text-white font-bold text-base">Back to Wallet</Text>
        </Pressable>

        <Pressable
          onPress={() => router.push('/finance/transactions')}
          className="border border-primary bg-white h-14 rounded-2xl justify-center items-center active:bg-purple-50"
        >
          <Text className="text-primary font-bold text-base">View Transactions</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function DetailRow({ icon: Icon, label, value, sub, green }: any) {
  return (
    <View className="flex-row items-center justify-between py-2 border-b border-slate-50">
      <View className="flex-row items-center flex-1 mr-2">
        <View className="w-8 h-8 bg-green-100 rounded-xl items-center justify-center mr-3">
          <Icon size={16} color="#22c55e" />
        </View>
        <Text className="text-slate-600 text-xs font-medium">{label}</Text>
      </View>

      <View className="items-end">
        <Text className={`font-bold text-xs ${green ? 'text-green-600' : 'text-slate-900'}`}>{value}</Text>
        {sub && <Text className="text-slate-400 text-[9px] mt-0.5">{sub}</Text>}
      </View>
    </View>
  );
}