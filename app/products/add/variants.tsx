import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  HelpCircle, 
  Scale, 
  Package, 
  Shirt, 
  Palette, 
  Droplet, 
  Leaf, 
  Settings, 
  Plus, 
  Trash2, 
  GripVertical,
  Info
} from 'lucide-react-native';

const VARIANT_TYPES = [
  { id: 'weight', label: 'Weight', icon: Scale },
  { id: 'pack', label: 'Pack Size', icon: Package },
  { id: 'size', label: 'Size', icon: Shirt },
  { id: 'color', label: 'Color', icon: Palette },
  { id: 'volume', label: 'Volume', icon: Droplet },
  { id: 'flavor', label: 'Flavor', icon: Leaf },
  { id: 'custom', label: 'Custom', icon: Settings },
];

export default function AddVariantsScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('weight');
  const [values, setValues] = useState(['500g', '1kg', '2kg', '5kg']);

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Header */}
      <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#4F26D9" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Add Product Variant</Text>
            <Text className="text-slate-400 text-xs">Create variants for your product</Text>
          </View>
        </View>
        <Pressable className="flex-row items-center">
          <HelpCircle size={18} color="#4F26D9" />
          <Text className="text-primary font-bold ml-1 text-xs">Help</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        
        {/* 1. Select Variant Type */}
        <View className="mt-6">
          <Text className="font-bold text-slate-900 mb-1">1. Select Variant Type</Text>
          <Text className="text-slate-400 text-[10px] mb-4">Choose what makes this product different</Text>
          
          <View className="flex-row flex-wrap">
            {VARIANT_TYPES.map((type) => (
              <Pressable 
                key={type.id}
                onPress={() => setSelectedType(type.id)}
                className={`w-[23%] aspect-square rounded-2xl border-2 items-center justify-center mb-3 mr-[2%]
                  ${selectedType === type.id ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white'}`}
              >
                <type.icon size={20} color={selectedType === type.id ? "#4F26D9" : "#64748b"} />
                <Text className={`text-[10px] mt-2 font-bold ${selectedType === type.id ? 'text-primary' : 'text-slate-600'}`}>
                  {type.label}
                </Text>
                {selectedType === type.id && (
                  <View className="absolute top-1 right-1 w-3 h-3 bg-primary rounded-full items-center justify-center">
                    <Text className="text-[8px] text-white">✓</Text>
                  </View>
                )}
              </Pressable>
            ))}
          </View>
        </View>

        {/* 2. Add Variant Values */}
        <View className="mt-6">
          <Text className="font-bold text-slate-900 mb-1">2. Add Variant Values</Text>
          <Text className="text-slate-400 text-[10px] mb-4">Add all the available options for this variant type</Text>
          
          <Text className="text-slate-700 font-bold text-xs mb-2">Weight <Text className="text-slate-400 font-normal">(e.g. 500g, 1kg, 2kg)</Text></Text>
          
          <View className="space-y-3">
            {values.map((val, index) => (
              <View key={index} className="flex-row items-center bg-slate-50 border border-slate-100 rounded-2xl px-4 h-12">
                <GripVertical size={16} color="#cbd5e1" />
                <TextInput 
                  value={val} 
                  className="flex-1 ml-3 font-bold text-slate-900"
                />
                <Pressable>
                  <Trash2 size={18} color="#ef4444" opacity={0.6} />
                </Pressable>
              </View>
            ))}
          </View>

          <Pressable className="mt-4 border-2 border-dashed border-primary/30 rounded-2xl h-12 flex-row items-center justify-center bg-primary/5">
            <Plus size={18} color="#4F26D9" />
            <Text className="text-primary font-bold ml-2">Add Value</Text>
          </Pressable>
        </View>

        {/* 3. Set Price, Stock & SKU */}
        <View className="mt-8 mb-10">
          <Text className="font-bold text-slate-900 mb-1">3. Set Price, Stock & SKU for Each Variant</Text>
          <Text className="text-slate-400 text-[10px] mb-4">Add details for each variant</Text>

          {/* Table Header */}
          <View className="flex-row px-2 mb-2">
            <Text className="flex-1 text-[10px] font-bold text-slate-400 uppercase">Variant</Text>
            <Text className="flex-[1.5] text-[10px] font-bold text-slate-400 uppercase ml-2">Price (₦)</Text>
            <Text className="flex-1 text-[10px] font-bold text-slate-400 uppercase ml-2">Stock</Text>
            <Text className="flex-[1.5] text-[10px] font-bold text-slate-400 uppercase ml-2">SKU (Optional)</Text>
            <View className="w-8" />
          </View>

          {/* Table Rows */}
          <View className="space-y-3">
            {values.map((val, index) => (
              <View key={index} className="flex-row items-center">
                <View className="flex-1 h-12 bg-slate-50 rounded-xl justify-center px-3 border border-slate-100">
                  <Text className="text-xs font-bold text-slate-900">{val}</Text>
                </View>
                <TextInput 
                  placeholder="800" 
                  className="flex-[1.5] h-12 bg-white border border-slate-200 rounded-xl px-3 ml-2 text-xs"
                  keyboardType="numeric"
                />
                <TextInput 
                  placeholder="20" 
                  className="flex-1 h-12 bg-white border border-slate-200 rounded-xl px-3 ml-2 text-xs"
                  keyboardType="numeric"
                />
                <TextInput 
                  placeholder="BAN-500" 
                  className="flex-[1.5] h-12 bg-white border border-slate-200 rounded-xl px-3 ml-2 text-xs"
                />
                <Pressable className="w-8 items-end">
                   <Trash2 size={16} color="#ef4444" opacity={0.5} />
                </Pressable>
              </View>
            ))}
          </View>

          {/* Note Box */}
          <View className="bg-purple-50 p-4 rounded-2xl flex-row items-center mt-6">
            <Info size={16} color="#4F26D9" />
            <View className="ml-3">
              <Text className="text-primary font-bold text-[10px]">Note</Text>
              <Text className="text-slate-500 text-[9px]">Price and stock are specific to each variant.</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50 flex-row space-x-4">
        <Pressable 
          className="flex-1 h-14 rounded-2xl border border-primary justify-center items-center"
          onPress={() => router.back()}
        >
          <Text className="text-primary font-bold text-lg">Cancel</Text>
        </Pressable>
        <Pressable 
          className="flex-[2] bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold text-lg">Save Variants</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}