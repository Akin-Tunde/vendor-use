import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  CheckCircle2, 
  Store, 
  ShoppingBasket, 
  TrendingUp, 
  ChevronRight, 
  Headphones, 
  ArrowLeft,
  Check,
  Star,
  ArrowRight
} from 'lucide-react-native';

const SUMMARY_ITEMS = [
  "Account Created",
  "Business Type Selected",
  "Store Profile Completed",
  "Business Verified",
  "Payout Account Set Up",
  "Delivery & Operating Hours Set"
];

export default function SetupCompleteScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="flex-row justify-between items-center px-6 py-4">
        <Pressable onPress={() => router.back()} className="p-2">
          <ArrowLeft size={24} color="#4F26D9" />
        </Pressable>
        <Text className="text-primary font-bold text-lg">Setup Complete!</Text>
        <Pressable className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-full">
          <Headphones size={16} color="#4F26D9" />
          <Text className="text-primary font-bold ml-1.5 text-xs">Support</Text>
        </Pressable>
      </View>

      {/* Final Progress Indicator (All Checked) */}
      <View className="flex-row items-center justify-center px-6 mt-2 mb-8">
        {[1, 2, 3, 4, 5, 6].map((step, index) => (
          <React.Fragment key={step}>
            <View className="w-7 h-7 rounded-full items-center justify-center bg-primary">
              <CheckCircle2 size={16} color="white" />
            </View>
            {index < 5 && <View className="flex-1 h-[2.5px] mx-0.5 bg-primary" />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        {/* Celebration Illustration */}
        <View className="items-center justify-center py-6">
          <View className="relative">
            <View className="w-48 h-48 bg-slate-50 rounded-full items-center justify-center">
              <Store size={100} color="#4F26D9" opacity={0.3} />
            </View>
            {/* Success Checkmark Badge */}
            <View className="absolute top-0 right-4 w-12 h-12 bg-green-500 rounded-full border-4 border-white items-center justify-center shadow-lg">
               <Check size={24} color="white" strokeWidth={4} />
            </View>
            {/* Confetti Mockups */}
            <View className="absolute -top-4 -left-4 w-3 h-3 bg-yellow-400 rounded-full" />
            <View className="absolute top-10 -right-8 w-2 h-2 bg-blue-400 rotate-45" />
            <View className="absolute -bottom-2 left-10 w-2.5 h-2.5 bg-red-400 rounded-sm" />
          </View>
          
          <Text className="text-4xl font-bold text-slate-900 mt-6">Congratulations! 🎉</Text>
          <Text className="text-slate-500 text-center mt-3 leading-6 px-4">
            Your store has been set up successfully. You're now ready to receive orders.
          </Text>
        </View>

        {/* Setup Summary Card */}
        <View className="bg-slate-50/50 border border-slate-100 rounded-[32px] p-6 mb-8">
           <Text className="font-bold text-slate-900 mb-4">Setup Summary</Text>
           <View className="space-y-3">
              {SUMMARY_ITEMS.map((item, index) => (
                <View key={index} className="flex-row items-center justify-between">
                   <View className="flex-row items-center">
                      <View className="w-5 h-5 bg-green-500 rounded-full items-center justify-center mr-3">
                         <Check size={12} color="white" strokeWidth={4} />
                      </View>
                      <Text className="text-slate-700 text-sm font-medium">{item}</Text>
                   </View>
                   <View className="bg-green-100 px-2 py-0.5 rounded-md">
                      <Text className="text-green-700 text-[10px] font-bold">Completed</Text>
                   </View>
                </View>
              ))}
           </View>
        </View>

        {/* What's Next Section */}
        <View className="mb-10">
           <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-green-100 rounded-full items-center justify-center mr-2">
                 <Star size={16} color="#4CD964" />
              </View>
              <View>
                 <Text className="font-bold text-slate-900">What's Next?</Text>
                 <Text className="text-slate-400 text-[10px]">Start managing your business now.</Text>
              </View>
           </View>

           <View className="flex-row space-x-3">
              <NextStepCard 
                icon={ShoppingBasket} 
                label="Add Products" 
                desc="List your items and services" 
              />
              <NextStepCard 
                icon={Store} 
                label="Manage Orders" 
                desc="Receive and manage orders" 
              />
              <NextStepCard 
                icon={TrendingUp} 
                label="Grow Business" 
                desc="Track performance and sales" 
              />
           </View>
        </View>
      </ScrollView>

      {/* Primary Actions */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          className="bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
          onPress={() => router.replace('/(tabs)')}
        >
          <Text className="text-white font-bold text-lg mr-2">Go to Dashboard</Text>
          <ArrowRight size={20} color="white" />
        </Pressable>
        
        <Pressable 
          className="mt-4 border-2 border-primary h-16 rounded-2xl flex-row justify-center items-center"
          onPress={() => router.push('/products/add')}
        >
          <Text className="text-primary font-bold text-lg mr-2">Add Products Now</Text>
          <ArrowRight size={20} color="#4F26D9" />
        </Pressable>

        <View className="flex-row items-center justify-center mt-6">
           <CheckCircle2 size={14} color="#4CD964" />
           <Text className="text-slate-400 text-[10px] ml-1.5 font-medium">Your store is now live. Customers can find you.</Text>
        </View>
      </View>
    </SafeAreaView>
  );
}

function NextStepCard({ icon: Icon, label, desc }: any) {
  return (
    <View className="flex-1 bg-white border border-slate-100 p-3 rounded-2xl shadow-sm items-center text-center">
       <View className="w-10 h-10 bg-purple-50 rounded-xl items-center justify-center mb-2">
          <Icon size={20} color="#4F26D9" />
       </View>
       <Text className="text-slate-900 font-bold text-[10px] mb-1">{label}</Text>
       <Text className="text-slate-400 text-[8px] text-center" numberOfLines={2}>{desc}</Text>
    </View>
  );
}