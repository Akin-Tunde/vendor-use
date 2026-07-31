import React from 'react';
import { View, Text, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  CheckCircle2, 
  ArrowLeft, 
  Edit3, 
  Send, 
  Check, 
  Info,
  Tag,
  Package,
  Wallet,
  Layers
} from 'lucide-react-native';

export default function AddProductReviewScreen() {
  const router = useRouter();

  const CHECKLIST_ITEMS = [
    "Product images added",
    "Product information complete",
    "Pricing information added",
    "Inventory details added",
    "All required fields completed"
  ];

  return (
    <View className="flex-1 bg-white">
      {/* Progress Indicator */}
      <View className="flex-row items-center justify-center px-10 py-6 bg-white border-b border-slate-50">
        <StepIcon label="Product Details" active={false} completed step={1} />
        <View className="flex-1 h-[1.5px] bg-primary mx-2" />
        <StepIcon label="Pricing & Inventory" active={false} completed step={2} />
        <View className="flex-1 h-[1.5px] bg-primary mx-2" />
        <StepIcon label="Review" active completed={false} step={3} />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-slate-500 mt-4 text-xs">Review your product details and publish</Text>

        {/* 1. Product Preview Card */}
        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <View className="flex-row justify-between items-start mb-4">
            <Text className="font-bold text-slate-900">Product Preview</Text>
            <Pressable className="flex-row items-center" onPress={() => router.push('/products/add')}>
               <Edit3 size={14} color="#4F26D9" />
               <Text className="text-primary font-bold text-xs ml-1">Edit</Text>
            </Pressable>
          </View>
          
          <View className="flex-row items-center">
            <View className="w-24 h-24 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100">
               <Text className="text-5xl">🍌</Text>
            </View>
            <View className="flex-1 ml-4">
              <Text className="font-bold text-slate-900 text-xl">Fresh Banana</Text>
              <View className="flex-row mt-2 space-x-2">
                 <View className="bg-green-100 px-2 py-0.5 rounded">
                    <Text className="text-green-700 text-[10px] font-bold">Fruits</Text>
                 </View>
                 <View className="bg-blue-100 px-2 py-0.5 rounded">
                    <Text className="text-blue-700 text-[10px] font-bold">Physical Product</Text>
                 </View>
              </View>
              <Text className="text-slate-500 text-xs mt-3 leading-5" numberOfLines={2}>
                Fresh, naturally ripened bananas. Rich in potassium and vitamins.
              </Text>
            </View>
          </View>
        </View>

        <View className="flex-row space-x-4 mt-6">
          {/* 2. Product Information Table */}
          <View className="flex-[1.5] p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
             <View className="flex-row justify-between items-center mb-4">
                <Text className="font-bold text-slate-900">Product Information</Text>
             </View>
             <View className="space-y-4">
                <SummaryRow label="Category" value="Fruits" />
                <SummaryRow label="Subcategory" value="Banana" />
                <SummaryRow label="Product Type" value="Physical Product" />
                <SummaryRow label="Tags" value="Fresh, Organic, Natural" />
                <SummaryRow label="SKU" value="BANANA-001" />
                <SummaryRow label="Unit of Measurement" value="Per kg" />
             </View>
          </View>

          <View className="flex-1 space-y-4">
            {/* 3. Pricing Summary */}
            <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
               <View className="flex-row justify-between items-center mb-4">
                  <Text className="font-bold text-slate-900 text-xs">Pricing</Text>
                  <Edit3 size={12} color="#4F26D9" />
               </View>
               <View className="space-y-3">
                  <SummaryRow label="Selling Price" value="₦1,200" small />
                  <SummaryRow label="Compare at Price" value="₦1,500" small />
                  <SummaryRow label="Cost Price" value="₦800" small />
                  <SummaryRow label="Tax" value="No Tax" small />
               </View>
            </View>

            {/* 4. Inventory Summary */}
            <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
               <View className="flex-row justify-between items-center mb-4">
                  <Text className="font-bold text-slate-900 text-xs">Inventory</Text>
                  <Edit3 size={12} color="#4F26D9" />
               </View>
               <View className="space-y-3">
                  <SummaryRow label="Stock Quantity" value="45" small />
                  <SummaryRow label="Low Stock Alert" value="10" small />
                  <SummaryRow label="Unlimited Stock" value="No" small />
                  <SummaryRow label="Min Order Qty" value="1" small />
               </View>
            </View>
          </View>
        </View>

        {/* 5. Additional Options Summary */}
        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
           <View className="flex-row justify-between items-center mb-4">
              <Text className="font-bold text-slate-900">Additional Options</Text>
              <Edit3 size={14} color="#4F26D9" />
           </View>
           <View className="flex-row justify-between">
              <View className="flex-1">
                 <Text className="text-slate-400 text-[10px] uppercase font-bold">Weight</Text>
                 <Text className="text-slate-900 font-bold text-xs mt-1">1 kg</Text>
              </View>
              <View className="flex-1">
                 <Text className="text-slate-400 text-[10px] uppercase font-bold">Product Variants</Text>
                 <Text className="text-slate-900 font-bold text-xs mt-1">No variants added</Text>
              </View>
           </View>
        </View>

        {/* 6. Success Checklist Banner */}
        <View className="mt-6 bg-green-50/80 border border-green-100 p-6 rounded-[32px]">
           <View className="flex-row items-center mb-4">
              <View className="w-8 h-8 bg-green-500 rounded-full items-center justify-center mr-3">
                 <Check size={18} color="white" strokeWidth={4} />
              </View>
              <View>
                 <Text className="font-bold text-slate-900">Looks good! You're almost done.</Text>
                 <Text className="text-slate-500 text-[10px]">Please review the checklist below before publishing.</Text>
              </View>
           </View>

           <View className="flex-row flex-wrap">
              {CHECKLIST_ITEMS.map((item, i) => (
                <View key={i} className="flex-row items-center w-[50%] mb-3">
                   <View className="w-5 h-5 bg-green-500 rounded-full items-center justify-center mr-2">
                      <Check size={10} color="white" strokeWidth={4} />
                   </View>
                   <Text className="text-slate-700 text-[10px] font-medium">{item}</Text>
                </View>
              ))}
           </View>
        </View>

        {/* Footer Info */}
        <View className="flex-row items-center justify-center mt-6 mb-10">
           <Info size={14} color="#4F26D9" />
           <Text className="text-slate-400 text-[10px] ml-2 font-medium">Once published, your product will be visible to customers.</Text>
        </View>
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
          onPress={() => router.replace('/(tabs)/products')}
        >
          <Text className="text-white font-bold text-lg mr-2">Publish Product</Text>
          <Send size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

// Helpers
function SummaryRow({ label, value, small = false }: any) {
  return (
    <View className={`flex-row justify-between items-center ${small ? 'mb-0' : 'border-b border-slate-50 pb-3'}`}>
      <Text className="text-slate-400 text-[10px] font-medium">{label}</Text>
      <Text className={`text-slate-900 font-bold ${small ? 'text-[10px]' : 'text-xs'}`}>{value}</Text>
    </View>
  );
}

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