import { useRouter } from 'expo-router';
import { ArrowLeft, Lock, ShieldCheck, X } from 'lucide-react-native';
import { useRef, useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const PIN_LENGTH = 6;

export default function ReviewWithdrawalScreen() {
  const router = useRouter();
  const [pin, setPin] = useState('');
  const pinInputRef = useRef<TextInput>(null);

  const isPinComplete = pin.length === PIN_LENGTH;

  const handleConfirm = () => {
    if (!isPinComplete) {
      pinInputRef.current?.focus();
      return;
    }
    router.push('/finance/withdraw-success');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Review Withdrawal</Text>
            <Text className="text-slate-400 text-xs">Please review your withdrawal details</Text>
          </View>
        </View>
        <Pressable onPress={() => router.push('/(tabs)/finance')} className="p-1">
          <X size={22} color="#64748b" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Withdrawal Amount Purple Banner */}
        <View className="mx-6 mt-4 bg-primary p-6 rounded-[32px] shadow-lg shadow-primary/30 flex-row justify-between items-center">
          <View>
            <Text className="text-white/80 text-xs">Available Balance: ₦842,300.00</Text>
            <Text className="text-white/80 text-xs mt-2">You are withdrawing</Text>
            <Text className="text-white text-3xl font-bold mt-1">₦120,000.00</Text>
          </View>
          <View className="w-14 h-14 bg-white/10 rounded-2xl items-center justify-center border border-white/20">
            <ShieldCheck size={32} color="white" />
          </View>
        </View>

        {/* Withdrawal Details Card */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm gap-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Withdrawal Details</Text>
          <ReviewRow label="Withdrawal Amount" value="₦120,000.00" />
          <ReviewRow label="Bank Account" value="GTBank •••• 1234" sub="George Taylor" />
          <ReviewRow label="Account Name" value="George Taylor" />
          <ReviewRow label="Processing Fee" value="₦0.00" green />
          <View className="flex-row justify-between pt-2 border-t border-slate-100">
            <Text className="font-bold text-slate-900 text-base">You will receive</Text>
            <Text className="font-bold text-primary text-base">₦120,000.00</Text>
          </View>
        </View>

        {/* Additional Info */}
        <View className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm gap-3">
          <Text className="font-bold text-slate-900 text-sm mb-1">Additional Information</Text>
          <ReviewRow label="Estimated Arrival" value="Within 24 hours" sub="1 business day" green />
          <ReviewRow label="Withdrawal Date" value="31 May 2025, 10:45 AM" />
        </View>

        {/* PIN Input Section */}
        <View className="mx-6 mt-6 bg-white border border-slate-100 p-6 rounded-[32px] shadow-sm items-center">
          <Text className="font-bold text-slate-900 text-sm mb-4">Confirm with your PIN</Text>

          <Pressable onPress={() => pinInputRef.current?.focus()} className="flex-row gap-2 mb-3">
            {Array.from({ length: PIN_LENGTH }).map((_, idx) => {
              const filled = idx < pin.length;
              return (
                <View
                  key={idx}
                  className={`w-10 h-12 rounded-xl items-center justify-center border ${filled ? 'bg-purple-50/40 border-primary' : 'bg-slate-50 border-slate-200'
                    }`}
                >
                  {filled && <Text className="text-xl font-bold text-primary">•</Text>}
                </View>
              );
            })}
          </Pressable>

          {/* Hidden input driving the PIN dots above */}
          <TextInput
            ref={pinInputRef}
            value={pin}
            onChangeText={(text) => setPin(text.replace(/[^0-9]/g, '').slice(0, PIN_LENGTH))}
            keyboardType="number-pad"
            secureTextEntry
            maxLength={PIN_LENGTH}
            autoFocus
            className="absolute w-px h-px opacity-0"
          />

          <Pressable>
            <Text className="text-primary font-bold text-xs">Forgot PIN?</Text>
          </Pressable>
        </View>
      </ScrollView>

      {/* Footer Actions */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable
          onPress={handleConfirm}
          disabled={!isPinComplete}
          className={`h-16 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg shadow-primary/30 ${isPinComplete ? 'bg-primary' : 'bg-primary/40'
            }`}
        >
          <Lock size={18} color="white" />
          <Text className="text-white font-bold text-lg">Confirm Withdrawal</Text>
        </Pressable>
        <Text className="text-center text-slate-400 text-[10px] mt-3">
          By continuing, you agree to our <Text className="text-primary font-bold">Terms of Service</Text> and <Text className="text-primary font-bold">Privacy Policy</Text>.
        </Text>
      </View>
    </SafeAreaView>
  );
}

function ReviewRow({ label, value, sub, green }: any) {
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