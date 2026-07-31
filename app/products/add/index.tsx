import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  Camera, 
  ChevronDown, 
  Package, 
  Snowflake, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Image as ImageIcon
} from 'lucide-react-native';

export default function AddProductStep1() {
  const router = useRouter();
  const [desc, setDesc] = useState('');
  const [productType, setProductType] = useState('physical');

  return (
    <View className="flex-1 bg-white">
      {/* Progress Indicator */}
      <View className="flex-row items-center justify-center px-10 py-6 bg-white border-b border-slate-50">
        <StepIcon label="Product Details" active completed={false} step={1} />
        <View className="flex-1 h-[1px] bg-slate-200 mx-2" />
        <StepIcon label="Pricing & Inventory" active={false} completed={false} step={2} />
        <View className="flex-1 h-[1px] bg-slate-200 mx-2" />
        <StepIcon label="Review" active={false} completed={false} step={3} />
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <Text className="text-slate-500 mt-4 text-xs">Fill in the product details to add it to your store</Text>

        {/* Image Upload Section */}
        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-slate-900">Product Images</Text>
            <Text className="text-slate-400 text-xs">0/6</Text>
          </View>
          
          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row space-x-3">
            {/* Main Image Upload */}
            <Pressable className="w-28 h-28 border-2 border-dashed border-primary/30 bg-primary/5 rounded-2xl items-center justify-center">
              <Camera size={24} color="#4F26D9" />
              <Text className="text-primary font-bold text-[8px] mt-2">Add Main Image</Text>
              <Text className="text-slate-400 text-[6px] mt-0.5">JPG, PNG (Max 5MB)</Text>
            </Pressable>

            {/* Other Image Placeholders */}
            {[1, 2, 3, 4, 5].map((i) => (
              <Pressable key={i} className="w-28 h-28 border border-dashed border-slate-200 bg-slate-50 rounded-2xl items-center justify-center">
                <ImageIcon size={24} color="#cbd5e1" />
                <Text className="text-slate-400 font-bold text-[8px] mt-2">Add Image</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>

        {/* Basic Information */}
        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm space-y-5">
          <Text className="font-bold text-slate-900 mb-2">Basic Information</Text>
          
          <View>
            <Text className="text-slate-700 font-bold text-xs mb-2">Product Name <Text className="text-red-500">*</Text></Text>
            <TextInput 
              placeholder="e.g. Fresh Banana" 
              className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl text-slate-900"
            />
          </View>

          <View className="flex-row space-x-4">
             <View className="flex-1">
                <Text className="text-slate-700 font-bold text-xs mb-2">Category <Text className="text-red-500">*</Text></Text>
                <Pressable className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl flex-row items-center justify-between">
                   <Text className="text-slate-400 text-sm">Select Category</Text>
                   <ChevronDown size={18} color="#64748b" />
                </Pressable>
             </View>
             <View className="flex-1">
                <Text className="text-slate-700 font-bold text-xs mb-2">Subcategory <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
                <Pressable className="bg-slate-50 border border-slate-100 h-14 px-4 rounded-2xl flex-row items-center justify-between">
                   <Text className="text-slate-400 text-sm">Select Subcategory</Text>
                   <ChevronDown size={18} color="#64748b" />
                </Pressable>
             </View>
          </View>

          <View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-slate-700 font-bold text-xs">Product Description <Text className="text-red-500">*</Text></Text>
              <Text className="text-slate-400 text-[10px]">{desc.length}/500</Text>
            </View>
            <TextInput 
              placeholder="Describe your product, its features, quality, benefits, etc." 
              multiline
              onChangeText={setDesc}
              className="bg-slate-50 border border-slate-100 min-h-[120px] p-4 rounded-2xl text-slate-900"
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Product Type */}
        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <Text className="font-bold text-slate-900 mb-1">Product Type</Text>
          <Text className="text-slate-400 text-[10px] mb-4">What best describes this product?</Text>
          
          <View className="flex-row space-x-3">
             <TypeCard 
               label="Physical Product" 
               desc="A tangible item that requires delivery" 
               icon={Package} 
               selected={productType === 'physical'}
               onPress={() => setProductType('physical')}
             />
             <TypeCard 
               label="Perishable" 
               desc="Items that have a short shelf life" 
               icon={Snowflake} 
               selected={productType === 'perishable'}
               onPress={() => setProductType('perishable')}
             />
             <TypeCard 
               label="Digital/Service" 
               desc="Digital products or services" 
               icon={Zap} 
               selected={productType === 'digital'}
               onPress={() => setProductType('digital')}
             />
          </View>
        </View>

        {/* Tip Banner */}
        <View className="mt-6 bg-blue-50 border border-blue-100 p-4 rounded-2xl flex-row items-center mb-10">
           <CheckCircle2 size={18} color="#4F26D9" />
           <View className="ml-3 flex-1">
              <Text className="text-primary font-bold text-[10px]">Quality products get more orders!</Text>
              <Text className="text-slate-500 text-[9px] mt-0.5">Use clear images and accurate information to build customer trust.</Text>
           </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          className="bg-primary h-16 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30"
          onPress={() => router.push('/products/add/pricing')}
        >
          <Text className="text-white font-bold text-lg mr-2">Continue</Text>
          <ArrowRight size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
}

// Helpers
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

function TypeCard({ label, desc, icon: Icon, selected, onPress }: any) {
  return (
    <Pressable 
      onPress={onPress}
      className={`flex-1 p-3 border-2 rounded-2xl items-center text-center ${selected ? 'border-primary bg-primary/5' : 'border-slate-100'}`}
    >
       <View className={`w-8 h-8 rounded-lg items-center justify-center mb-2 ${selected ? 'bg-primary/10' : 'bg-slate-50'}`}>
          <Icon size={18} color="#4F26D9" />
       </View>
       <Text className="text-[9px] font-bold text-slate-900">{label}</Text>
       <Text className="text-slate-400 text-[7px] mt-1 text-center leading-3" numberOfLines={2}>{desc}</Text>
       
       <View className={`absolute top-2 right-2 w-4 h-4 rounded-full border items-center justify-center ${selected ? 'bg-primary border-primary' : 'border-slate-200'}`}>
          {selected && <View className="w-1.5 h-1.5 bg-white rounded-full" />}
       </View>
    </Pressable>
  );
}