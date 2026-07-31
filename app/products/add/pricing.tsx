import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Edit3, 
  Info, 
  ChevronDown, 
  Plus, 
  Lightbulb
} from 'lucide-react-native';

export default function AddProductStep2() {
  const router = useRouter();
  const [unlimitedStock, setUnlimitedStock] = useState(false);

  return (
    <View className="flex-1 bg-white">
      {/* Progress Indicator */}
      <View className="flex-row items-center justify-center px-10 py-6 bg-white border-b border-slate-50">
        <StepIcon label="Product Details" active={false} completed step={1} />
        <View className="flex-1 h-[1.5px] bg-primary mx-2" />
        <StepIcon label="Pricing & Inventory" active completed={false} step={2} />
        <View className="flex-1 h-[1px] bg-slate-200 mx-2" />
        <StepIcon label="Review" active={false} completed={false} step={3} />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-slate-500 mt-4 text-xs">Set pricing, inventory and product options</Text>

        {/* Product Preview Card */}
        <View className="mt-6 p-4 bg-slate-50/50 border border-slate-100 rounded-[32px] flex-row items-center">
          <View className="w-20 h-20 bg-white rounded-2xl items-center justify-center border border-slate-100 overflow-hidden">
             {/* Mock Image of Banana */}
             <Text className="text-4xl">🍌</Text>
          </View>
          <View className="flex-1 ml-4">
            <Text className="font-bold text-slate-900 text-lg">Fresh Banana</Text>
            <View className="flex-row mt-1 space-x-2">
               <View className="bg-green-100 px-2 py-0.5 rounded">
                  <Text className="text-green-700 text-[8px] font-bold">Fruits</Text>
               </View>
               <View className="bg-blue-100 px-2 py-0.5 rounded">
                  <Text className="text-blue-700 text-[8px] font-bold">Physical Product</Text>
               </View>
            </View>
            <Pressable className="flex-row items-center mt-2" onPress={() => router.back()}>
               <Edit3 size={12} color="#4F26D9" />
               <Text className="text-primary font-bold text-[10px] ml-1">Edit Details</Text>
            </Pressable>
          </View>
        </View>

        {/* Pricing Section */}
        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <Text className="font-bold text-slate-900 mb-4">Pricing</Text>
          
          <View className="flex-row space-x-4 mb-4">
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">Selling Price (₦) <Text className="text-red-500">*</Text></Text>
              <TextInput placeholder="1,200" className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl font-bold" keyboardType="numeric" />
            </View>
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Text className="text-slate-700 font-bold text-xs mr-1">Compare at Price (₦)</Text>
                <Info size={12} color="#94a3b8" />
              </View>
              <TextInput placeholder="1,500" className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl text-slate-400" keyboardType="numeric" />
            </View>
          </View>

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">Cost Price (₦) <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
              <TextInput placeholder="800" className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl" keyboardType="numeric" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">Tax</Text>
              <Pressable className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl flex-row items-center justify-between">
                <Text className="text-slate-900 text-sm">No Tax</Text>
                <ChevronDown size={18} color="#64748b" />
              </Pressable>
            </View>
          </View>
        </View>

        {/* Inventory Section */}
        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <Text className="font-bold text-slate-900 mb-4">Inventory</Text>
          
          <View className="flex-row space-x-4 mb-4">
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">SKU (Stock Keeping Unit)</Text>
              <TextInput placeholder="BANANA-001" className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl" />
            </View>
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">Stock Quantity <Text className="text-red-500">*</Text></Text>
              <TextInput placeholder="45" className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl" keyboardType="numeric" />
            </View>
          </View>

          <View className="flex-row items-center justify-between">
             <View className="flex-1 mr-4">
               <Text className="text-slate-700 font-bold text-xs mb-2">Low Stock Alert</Text>
               <TextInput placeholder="10" className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl" keyboardType="numeric" />
             </View>
             <View className="items-end">
               <Text className="text-slate-700 font-bold text-xs mb-2">Unlimited Stock</Text>
               <Switch 
                  value={unlimitedStock} 
                  onValueChange={setUnlimitedStock}
                  trackColor={{ false: '#e2e8f0', true: '#4F26D9' }}
               />
             </View>
          </View>
        </View>

        {/* Additional Options */}
        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm space-y-4">
          <Text className="font-bold text-slate-900 mb-2">Additional Options</Text>
          
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">Unit of Measurement</Text>
              <Pressable className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl flex-row items-center justify-between">
                <Text className="text-slate-900 text-sm">Per kg</Text>
                <ChevronDown size={18} color="#64748b" />
              </Pressable>
            </View>
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">Minimum Order Quantity</Text>
              <TextInput placeholder="1" className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl" keyboardType="numeric" />
            </View>
          </View>

          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">Weight <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
              <View className="flex-row items-center bg-slate-50 border border-slate-100 h-14 rounded-2xl px-4">
                 <TextInput placeholder="1" className="flex-1" keyboardType="numeric" />
                 <Pressable className="flex-row items-center">
                    <Text className="text-slate-900 font-bold text-xs">kg</Text>
                    <ChevronDown size={14} color="#64748b" className="ml-1" />
                 </Pressable>
              </View>
            </View>
            <View className="flex-1">
              <View className="flex-row justify-between items-center mb-2">
                 <Text className="text-slate-700 font-bold text-xs">Product Variants</Text>
                 <Pressable onPress={() => router.push('/products/add/variants')}>
                    <Text className="text-primary font-bold text-[10px]">+ Add Variant</Text>
                 </Pressable>
              </View>
              <View className="bg-slate-50 border border-dashed border-slate-200 h-14 rounded-2xl items-center justify-center">
                 <Text className="text-slate-400 text-[10px]">Add size, color, pack size, etc.</Text>
              </View>
            </View>
          </View>

          {/* Tip Box */}
          <View className="bg-purple-50 p-4 rounded-2xl flex-row items-start mt-2">
             <Lightbulb size={16} color="#4F26D9" />
             <View className="ml-3 flex-1">
                <Text className="text-primary font-bold text-[10px]">Tip</Text>
                <Text className="text-slate-500 text-[9px] leading-4">Accurate pricing and stock information helps you build customer trust and avoid order issues.</Text>
             </View>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>

      {/* Footer Navigation */}
      <View className="p-6 bg-white border-t border-slate-50 flex-row space-x-4">
        <Pressable 
          className="flex-1 h-16 rounded-2xl border border-primary justify-center items-center"
          onPress={() => router.back()}
        >
          <Text className="text-primary font-bold text-lg">Back</Text>
        </Pressable>
        <Pressable 
          className="flex-[2] bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
          onPress={() => router.push('/products/add/review')}
        >
          <Text className="text-white font-bold text-lg mr-2">Continue</Text>
          <ArrowRight size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

// Reusable Progress Step Helper
function StepIcon({ label, active, completed, step }: any) {
  return (
    <View className="items-center">
       <View className={`w-6 h-6 rounded-full items-center justify-center ${active || completed ? 'bg-primary' : 'bg-slate-200'}`}>
          {completed ? <CheckCircle2 size={16} color="white" /> : <Text className="text-white text-[10px] font-bold">{step}</Text>}
       </View>
       <Text className={`text-[8px] mt-1 font-bold ${active || completed ? 'text-primary' : 'text-slate-400'}`}>{label}</Text>
    </View>
  );
}