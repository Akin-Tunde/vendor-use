import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  CheckCircle2, 
  Building2, 
  CreditCard, 
  ShieldCheck, 
  ChevronDown, 
  Eye, 
  EyeOff,
  Lock,
  HelpCircle,
  Info,
  Save
} from 'lucide-react-native';

export default function PayoutSetupScreen() {
  const router = useRouter();
  const [accountNumber, setAccountNumber] = useState('');
  const [showBVN, setShowBVN] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* Progress Header */}
      <View className="flex-row justify-center items-center pt-2 px-6">
         <View className="flex-1" />
         <Text className="text-primary font-bold text-sm">Step 5 of 6</Text>
         <Pressable className="flex-1 flex-row justify-end items-center">
            <HelpCircle size={16} color="#4F26D9" />
            <Text className="text-primary font-bold ml-1">Help</Text>
         </Pressable>
      </View>

      {/* Progress Indicator (6 Steps) */}
      <View className="flex-row items-center justify-center px-6 mt-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <React.Fragment key={step}>
            <View 
              className={`w-7 h-7 rounded-full items-center justify-center 
                ${step < 5 ? 'bg-primary' : step === 5 ? 'border-2 border-primary bg-white' : 'border border-slate-200 bg-white'}`}
            >
              {step < 5 ? (
                <CheckCircle2 size={16} color="white" />
              ) : (
                <Text className={`text-xs ${step === 5 ? 'text-primary font-bold' : 'text-slate-400'}`}>{step}</Text>
              )}
            </View>
            {step < 6 && <View className={`flex-1 h-[2px] mx-0.5 ${step < 5 ? 'bg-primary' : 'bg-slate-100'}`} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-slate-900 leading-tight">Set Up Your Payout Account</Text>
            <Text className="text-slate-500 mt-2 leading-5">
              Add your bank details so we can send your earnings securely.
            </Text>
          </View>
          <View className="w-32 h-32 bg-slate-50 rounded-3xl items-center justify-center overflow-hidden">
             {/* Replace with Bank/Money Illustration */}
             <Building2 size={60} color="#4F26D9" opacity={0.2} />
          </View>
        </View>

        {/* Bank Form */}
        <View className="mt-8 space-y-6">
          
          {/* Bank Name */}
          <View>
            <Text className="font-semibold text-slate-700 mb-2">Bank Name</Text>
            <Pressable className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <Building2 size={18} color="#4F26D9" className="mr-3" />
              <Text className="flex-1 text-slate-400 text-base">Select your bank</Text>
              <ChevronDown size={20} color="#64748b" />
            </Pressable>
            <View className="flex-row items-center mt-2 px-1">
               <Info size={12} color="#64748b" />
               <Text className="text-slate-500 text-[10px] ml-1.5">Ensure the bank account is in your business name.</Text>
            </View>
          </View>

          {/* Account Number */}
          <View>
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-slate-700">Account Number</Text>
              <Text className="text-slate-400 text-xs">{accountNumber.length}/10</Text>
            </View>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <CreditCard size={18} color="#4F26D9" className="mr-3" />
              <TextInput 
                placeholder="Enter account number" 
                keyboardType="numeric"
                maxLength={10}
                onChangeText={setAccountNumber}
                className="flex-1 text-slate-900 text-base"
              />
            </View>
          </View>

          {/* Account Name (Fetched) */}
          <View>
            <Text className="font-semibold text-slate-700 mb-2">Account Name</Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-100/50">
              <View className="w-5 h-5 bg-slate-200 rounded-full items-center justify-center mr-3">
                 <Text className="text-[10px] text-slate-500">👤</Text>
              </View>
              <Text className="flex-1 text-slate-400 text-base italic">Account name will appear here</Text>
            </View>
            <View className="flex-row items-center mt-2 px-1">
               <Info size={12} color="#64748b" />
               <Text className="text-slate-500 text-[10px] ml-1.5">Must match the account name in your bank.</Text>
            </View>
          </View>

          {/* BVN Input */}
          <View>
            <Text className="font-semibold text-slate-700 mb-2">BVN <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <CreditCard size={18} color="#4F26D9" className="mr-3" />
              <TextInput 
                placeholder="Enter your BVN" 
                secureTextEntry={!showBVN}
                keyboardType="numeric"
                className="flex-1 text-slate-900 text-base"
              />
              <Pressable onPress={() => setShowBVN(!showBVN)}>
                {showBVN ? <EyeOff size={20} color="#64748b" /> : <Eye size={20} color="#64748b" />}
              </Pressable>
            </View>
            <View className="flex-row items-center mt-2 px-1">
               <Lock size={12} color="#64748b" />
               <Text className="text-slate-500 text-[10px] ml-1.5 font-medium">Your BVN is encrypted and secure.</Text>
            </View>
          </View>

          {/* Verification Box */}
          <View className="bg-primary/5 border border-primary/10 rounded-3xl p-4 flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 pr-4">
              <View className="w-10 h-10 bg-primary/10 rounded-full items-center justify-center mr-3">
                 <ShieldCheck size={20} color="#4F26D9" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-slate-900 text-sm">Verify Your Account</Text>
                <Text className="text-slate-500 text-[10px] leading-3 mt-1">We'll send a small deposit to verify your details.</Text>
              </View>
            </View>
            <Pressable className="bg-white border border-primary/20 px-4 py-2 rounded-xl">
               <Text className="text-primary font-bold text-xs">Verify Now</Text>
            </Pressable>
          </View>

     
        </View>

    
      </ScrollView>

      {/* Sticky Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
          onPress={() => router.push('/signup/step6')}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </Pressable>
        
        <Pressable className="mt-4 flex-row justify-center items-center py-2">
          <Save size={16} color="#4F26D9" className="mr-2" />
          <Text className="text-primary font-bold">Save & Continue Later</Text>
        </Pressable>
      </View>
    </View>
  );
}