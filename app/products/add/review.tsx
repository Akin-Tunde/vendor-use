import { useRouter } from 'expo-router';
import {
   Check,
   Edit3,
   Info,
   Send
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';

export default function AddProductReviewScreen() {
   const router = useRouter();

   const CHECKLIST_ITEMS = [
      "Product images added",
      "Inventory details added",
      "Product information complete",
      "All required fields completed",
      "Pricing information added"
   ];

   return (
      <View className="flex-1 bg-[#F8F9FE]">
         {/* Progress Stepper */}
         <View className="flex-row items-center justify-center px-8 py-3 bg-white border-b border-slate-100">
            <StepIcon label="Product Details" active={false} completed step={1} />
            <View className="flex-1 h-[1.5px] bg-primary mx-3" />
            <StepIcon label="Pricing & Inventory" active={false} completed step={2} />
            <View className="flex-1 h-[1.5px] bg-primary mx-3" />
            <StepIcon label="Review" active completed={false} step={3} />
         </View>

         <ScrollView className="flex-1 px-6 pt-3" showsVerticalScrollIndicator={false}>
            <Text className="text-slate-500 text-xs mb-4">Review your product details and publish</Text>

            {/* 1. Product Preview Card */}
            <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
               <View className="flex-row justify-between items-center mb-3">
                  <Text className="font-bold text-slate-900 text-sm">Product Preview</Text>
                  <Pressable className="flex-row items-center" onPress={() => router.push('/products/add')}>
                     <Edit3 size={14} color="#4F26D9" />
                     <Text className="text-primary font-bold text-xs ml-1">Edit</Text>
                  </Pressable>
               </View>

               <View className="flex-row items-center">
                  <View className="w-20 h-20 bg-slate-50 rounded-2xl items-center justify-center border border-slate-100 mr-4">
                     <Text className="text-4xl">🍌</Text>
                  </View>
                  <View className="flex-1">
                     <Text className="font-bold text-slate-900 text-lg">Fresh Banana</Text>
                     <View className="flex-row mt-1.5 space-x-2">
                        <View className="bg-green-100 px-2 py-0.5 rounded">
                           <Text className="text-green-700 text-[9px] font-bold">Fruits</Text>
                        </View>
                        <View className="bg-blue-100 px-2 py-0.5 rounded">
                           <Text className="text-blue-700 text-[9px] font-bold">Physical Product</Text>
                        </View>
                     </View>
                     <Text className="text-slate-400 text-[10px] mt-2 leading-4" numberOfLines={2}>
                        Fresh, naturally ripened bananas. Rich in potassium and vitamins.
                     </Text>
                  </View>
               </View>
            </View>

            {/* 2. Product Information Card (Full Width) */}
            <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4 space-y-3">
               <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-slate-900 text-sm">Product Information</Text>
                  <Pressable onPress={() => router.push('/products/add')}>
                     <Edit3 size={14} color="#4F26D9" />
                  </Pressable>
               </View>

               <View className="space-y-3">
                  <SummaryRow label="Category" value="Fruits" />
                  <SummaryRow label="Subcategory" value="Banana" />
                  <SummaryRow label="Product Type" value="Physical Product" />
                  <SummaryRow label="Tags" value="Fresh, Organic, Natural" />
                  <SummaryRow label="SKU" value="BANANA-001" />
                  <SummaryRow label="Unit of Measurement" value="Per kg" />
               </View>
            </View>

            {/* 3. Pricing Summary Card (Full Width) */}
            <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4 space-y-3">
               <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-slate-900 text-sm">Pricing</Text>
                  <Pressable onPress={() => router.push('/products/add/pricing')}>
                     <Edit3 size={14} color="#4F26D9" />
                  </Pressable>
               </View>

               <View className="space-y-3">
                  <SummaryRow label="Selling Price" value="₦1,200" />
                  <SummaryRow label="Compare at Price" value="₦1,500" />
                  <SummaryRow label="Cost Price" value="₦800" />
                  <SummaryRow label="Tax" value="No Tax" />
               </View>
            </View>

            {/* 4. Inventory Summary Card (Full Width) */}
            <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4 space-y-3">
               <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-slate-900 text-sm">Inventory</Text>
                  <Pressable onPress={() => router.push('/products/add/pricing')}>
                     <Edit3 size={14} color="#4F26D9" />
                  </Pressable>
               </View>

               <View className="space-y-3">
                  <SummaryRow label="Stock Quantity" value="45" />
                  <SummaryRow label="Low Stock Alert" value="10" />
                  <SummaryRow label="Unlimited Stock" value="No" />
                  <SummaryRow label="Minimum Order Qty" value="1" />
               </View>
            </View>

            {/* 5. Additional Options Summary Card (Full Width) */}
            <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4 space-y-3">
               <View className="flex-row justify-between items-center mb-2">
                  <Text className="font-bold text-slate-900 text-sm">Additional Options</Text>
                  <Pressable onPress={() => router.push('/products/add/pricing')}>
                     <Edit3 size={14} color="#4F26D9" />
                  </Pressable>
               </View>

               <View className="space-y-3">
                  <SummaryRow label="Weight" value="1 kg" />
                  <SummaryRow label="Product Variants" value="No variants added" />
               </View>
            </View>


     
         </ScrollView>

         {/* Side-by-Side Equal Navigation Buttons */}
         <View className="p-6 bg-white border-t border-slate-50 flex-row space-x-4">
            <Pressable
               className="flex-1 h-14 rounded-2xl border border-primary justify-center items-center active:bg-purple-50"
               onPress={() => router.back()}
            >
               <Text className="text-primary font-bold text-base">Back</Text>
            </Pressable>

            <Pressable
               className="flex-1 bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
               onPress={() => router.replace('/(tabs)/products')}
            >
               <Text className="text-white font-bold text-base mr-2">Publish Product</Text>
               <Send size={16} color="white" />
            </Pressable>
         </View>
      </View>
   );
}

// Helpers
function SummaryRow({ label, value }: any) {
   return (
      <View className="flex-row justify-between items-center border-b border-slate-50 pb-2.5">
         <Text className="text-slate-400 text-xs font-medium">{label}</Text>
         <Text className="text-slate-900 font-bold text-xs">{value}</Text>
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