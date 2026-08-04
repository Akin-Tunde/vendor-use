import { useRouter } from 'expo-router';
import {
  ArrowRight,
  ChevronDown,
  Edit3,
  Info
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';

export default function AddProductStep2() {
  const router = useRouter();
  const [unlimitedStock, setUnlimitedStock] = useState(false);

  return (
    <View className="flex-1 bg-[#F8F9FE]">
      {/* Progress Stepper */}
      <View className="flex-row items-center justify-center px-8 py-3 bg-white border-b border-slate-100">
        <StepIcon label="Product Details" active={false} completed step={1} />
        <View className="flex-1 h-[1.5px] bg-primary mx-3" />
        <StepIcon label="Pricing & Inventory" active completed={false} step={2} />
        <View className="flex-1 h-[1.5px] bg-slate-200 mx-3" />
        <StepIcon label="Review" active={false} completed={false} step={3} />
      </View>

      <ScrollView className="flex-1 px-6 pt-3" showsVerticalScrollIndicator={false}>
        <Text className="text-slate-500 text-xs mb-4">Set pricing, inventory and product options</Text>

        {/* 1. Product Preview Card */}
        <View className="p-4 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
          <Text className="font-bold text-slate-900 text-sm mb-3">Product Preview</Text>

          <View className="flex-row items-start">
            <View className="w-20 h-20 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 mr-4">
              <Text className="text-4xl">🍌</Text>
            </View>

            <View className="flex-1">
              <Text className="font-bold text-slate-900 text-base">Fresh Banana</Text>

              <View className="flex-row mt-1.5">
                <View className="bg-green-100 px-2 py-0.5 rounded mr-2">
                  <Text className="text-green-700 text-[9px] font-bold">Fruits</Text>
                </View>
                <View className="bg-blue-100 px-2 py-0.5 rounded">
                  <Text className="text-blue-700 text-[9px] font-bold">Physical Product</Text>
                </View>
              </View>

              <Text className="text-slate-400 text-[10px] mt-2 leading-4" numberOfLines={2}>
                Fresh, naturally ripened bananas. Rich in potassium and vitamins.
              </Text>

              <Pressable className="flex-row items-center mt-2.5" onPress={() => router.back()}>
                <Edit3 size={12} color="#4F26D9" />
                <Text className="text-primary font-bold text-[10px] ml-1">Edit Details</Text>
              </Pressable>
            </View>
          </View>
        </View>

        {/* 2. Pricing Section */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
          <Text className="font-bold text-slate-900 text-sm mb-4">Pricing</Text>

          <View className="flex-row mb-4">
            <View className="flex-1 mr-3">
              <Text className="text-slate-700 font-semibold text-xs mb-2">
                Selling Price (₦) <Text className="text-red-500">*</Text>
              </Text>
              <TextInput defaultValue="1,200" className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl font-bold text-slate-900 text-xs" keyboardType="numeric" />
            </View>

            <View className="flex-1">
              <View className="flex-row items-center justify-between mb-2">
                <Text className="text-slate-700 font-semibold text-xs">
                  Compare at Price (₦) <Text className="text-slate-400 font-normal">(Optional)</Text>
                </Text>
                <Info size={12} color="#94a3b8" />
              </View>
              <TextInput defaultValue="1,500" className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl text-slate-900 text-xs" keyboardType="numeric" />
              <Text className="text-slate-400 text-[8px] mt-1">Used to show discount to customers</Text>
            </View>
          </View>

          <View className="flex-row">
            <View className="flex-1 mr-3">
              <Text className="text-slate-700 font-semibold text-xs mb-2">
                Cost Price (₦) <Text className="text-slate-400 font-normal">(Optional)</Text>
              </Text>
              <TextInput defaultValue="800" className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl text-slate-900 text-xs" keyboardType="numeric" />
              <Text className="text-slate-400 text-[8px] mt-1">For your internal reference</Text>
            </View>

            <View className="flex-1">
              <Text className="text-slate-700 font-semibold text-xs mb-2">Tax</Text>
              <Pressable className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl flex-row items-center justify-between">
                <Text className="text-slate-900 text-xs font-medium">No Tax</Text>
                <ChevronDown size={16} color="#64748b" />
              </Pressable>
              <Text className="text-slate-400 text-[8px] mt-1">Tax will be added to the product</Text>
            </View>
          </View>
        </View>

        {/* 3. Inventory Section */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
          <Text className="font-bold text-slate-900 text-sm mb-4">Inventory</Text>

          <View className="flex-row mb-4">
            <View className="flex-1 mr-3">
              <Text className="text-slate-700 font-semibold text-xs mb-2">SKU (Stock Keeping Unit)</Text>
              <TextInput defaultValue="BANANA-001" className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl text-slate-900 text-xs" />
              <Text className="text-slate-400 text-[8px] mt-1">Unique code to identify your product</Text>
            </View>

            <View className="flex-1">
              <Text className="text-slate-700 font-semibold text-xs mb-2">
                Stock Quantity <Text className="text-red-500">*</Text>
              </Text>
              <TextInput defaultValue="45" className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl text-slate-900 text-xs" keyboardType="numeric" />
              <Text className="text-slate-400 text-[8px] mt-1">Total available quantity</Text>
            </View>
          </View>

          <View className="flex-row items-start">
            <View className="flex-1 mr-3">
              <Text className="text-slate-700 font-semibold text-xs mb-2">Low Stock Alert</Text>
              <TextInput defaultValue="10" className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl text-slate-900 text-xs" keyboardType="numeric" />
              <Text className="text-slate-400 text-[8px] mt-1">Get notified when stock reaches this level</Text>
            </View>

            <View className="flex-1">
              <Text className="text-slate-700 font-semibold text-xs mb-2">Unlimited Stock</Text>
              <View className="flex-row items-center justify-between h-12 pt-1">
                <Switch
                  value={unlimitedStock}
                  onValueChange={setUnlimitedStock}
                  trackColor={{ false: '#e2e8f0', true: '#4F26D9' }}
                />
              </View>
              <Text className="text-slate-400 text-[8px] mt-1">Enable if this product has unlimited stock</Text>
            </View>
          </View>
        </View>

        {/* 4. Additional Options Section (Stacked Vertically) */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
          <Text className="font-bold text-slate-900 text-sm mb-4">Additional Options</Text>

          {/* Unit of Measurement */}
          <View className="mb-4">
            <Text className="text-slate-700 font-semibold text-xs mb-2">Unit of Measurement</Text>
            <Pressable className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl flex-row items-center justify-between">
              <Text className="text-slate-900 text-xs font-medium">Per kg</Text>
              <ChevronDown size={16} color="#64748b" />
            </Pressable>
            <Text className="text-slate-400 text-[8px] mt-1">How this product is measured/sold</Text>
          </View>

          {/* Minimum Order Quantity */}
          <View className="mb-4">
            <Text className="text-slate-700 font-semibold text-xs mb-2">Minimum Order Quantity</Text>
            <TextInput defaultValue="1" className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl text-slate-900 text-xs" keyboardType="numeric" />
            <Text className="text-slate-400 text-[8px] mt-1">Minimum quantity a customer can order</Text>
          </View>

          {/* Weight */}
          <View className="mb-4">
            <Text className="text-slate-700 font-semibold text-xs mb-2">
              Weight <Text className="text-slate-400 font-normal">(Optional)</Text>
            </Text>
            <View className="flex-row items-center bg-slate-50/60 border border-slate-100 h-12 rounded-2xl px-3">
              <TextInput defaultValue="1" className="flex-1 text-slate-900 text-xs" keyboardType="numeric" />
              <Pressable className="flex-row items-center border-l border-slate-200 pl-2">
                <Text className="text-slate-900 font-bold text-xs">kg</Text>
                <ChevronDown size={14} color="#64748b" className="ml-1" />
              </Pressable>
            </View>
            <Text className="text-slate-400 text-[8px] mt-1">For delivery fee calculation</Text>
          </View>

          {/* Product Variants */}
          <View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-700 font-semibold text-xs">
                Product Variants <Text className="text-slate-400 font-normal">(Optional)</Text>
              </Text>
              <Pressable onPress={() => router.push('/products/add/variants')}>
                <Text className="text-primary font-bold text-[10px]">+ Add Variant</Text>
              </Pressable>
            </View>
            <Pressable
              onPress={() => router.push('/products/add/variants')}
              className="bg-slate-50/60 border border-dashed border-slate-200 h-12 rounded-2xl items-center justify-center"
            >
              <Text className="text-slate-400 text-[9px]">Add size, color, pack size, etc.</Text>
            </Pressable>
          </View>
        </View>

        <View className="h-10" />
      </ScrollView>

      {/* Footer Navigation */}
      <View className="p-6 bg-white border-t border-slate-50 flex-row">
        <Pressable
          className="flex-1 h-14 rounded-2xl border border-primary justify-center items-center active:bg-purple-50 mr-4"
          onPress={() => router.back()}
        >
          <Text className="text-primary font-bold text-base">Back</Text>
        </Pressable>

        <Pressable
          className="flex-1 bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
          onPress={() => router.push('/products/add/review')}
        >
          <Text className="text-white font-bold text-base mr-2">Continue</Text>
          <ArrowRight size={18} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

function StepIcon({ label, active, completed, step }: any) {
  return (
    <View className="items-center">
      <View className={`w-6 h-6 rounded-full items-center justify-center ${active ? 'bg-primary' : 'bg-slate-200'}`}>
        <Text className="text-white text-[10px] font-bold">{step}</Text>
      </View>
      <Text className={`text-[8px] mt-1 font-bold ${active ? 'text-primary' : 'text-slate-400'}`}>{label}</Text>
    </View>
  );
}