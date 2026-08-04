import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  Check,
  Droplet,
  GripVertical,
  HelpCircle,
  Leaf,
  Package,
  Palette,
  Plus,
  Scale,
  Shirt,
  Tag,
  Trash2
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const VARIANT_TYPES = [
  { id: 'weight', label: 'Weight', icon: Scale },
  { id: 'pack', label: 'Pack Size', icon: Package },
  { id: 'size', label: 'Size', icon: Shirt },
  { id: 'color', label: 'Color', icon: Palette },
  { id: 'volume', label: 'Volume', icon: Droplet },
  { id: 'flavor', label: 'Flavor', icon: Leaf },
  { id: 'custom', label: 'Custom', icon: Tag },
];

export default function AddVariantsScreen() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState('weight');
  const [variantList, setVariantList] = useState([
    { id: '1', value: '500g', price: '800', stock: '20', sku: 'BAN-500' },
    { id: '2', value: '1kg', price: '1,200', stock: '45', sku: 'BAN-1KG' },
    { id: '3', value: '2kg', price: '2,300', stock: '12', sku: 'BAN-2KG' },
    { id: '4', value: '5kg', price: '4,500', stock: '8', sku: 'BAN-5KG' },
  ]);

  const addVariantValue = () => {
    const newId = (variantList.length + 1).toString();
    setVariantList([...variantList, { id: newId, value: '', price: '', stock: '', sku: '' }]);
  };

  const removeVariantValue = (id: string) => {
    setVariantList(variantList.filter(item => item.id !== id));
  };

  const updateVariant = (id: string, field: string, val: string) => {
    setVariantList(variantList.map(item => item.id === id ? { ...item, [field]: val } : item));
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Custom Top Header (No duplicate "Save as Draft") */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center mr-3 active:bg-purple-50"
          >
            <ArrowLeft size={20} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Add Product Variant</Text>
            <Text className="text-slate-400 text-xs">Create variants for your product</Text>
          </View>
        </View>

        <Pressable className="flex-row items-center bg-purple-50 px-3 py-1.5 rounded-full border border-purple-100">
          <HelpCircle size={14} color="#4F26D9" />
          <Text className="text-primary font-bold ml-1.5 text-xs">Help</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6 pt-3" showsVerticalScrollIndicator={false}>

        {/* 1. Select Variant Type (Full Width Row Layout) */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
          <Text className="font-bold text-slate-900 text-sm mb-0.5">1. Select Variant Type</Text>
          <Text className="text-slate-400 text-[10px] mb-4">Choose what makes this product different</Text>

          <View className="flex-row flex-wrap gap-2 justify-between">
            {VARIANT_TYPES.map((type) => {
              const isSelected = selectedType === type.id;
              const Icon = type.icon;
              return (
                <Pressable
                  key={type.id}
                  onPress={() => setSelectedType(type.id)}
                  className={`w-[20%] min-w-[50px] aspect-square rounded-2xl border-2 items-center justify-center relative mb-1 ${isSelected ? 'border-primary bg-purple-50/40' : 'border-slate-100 bg-white'
                    }`}
                >
                  <Icon size={20} color={isSelected ? "#4F26D9" : "#64748b"} />
                  <Text className={`text-[10px] mt-1.5 font-bold ${isSelected ? 'text-primary' : 'text-slate-600'}`}>
                    {type.label}
                  </Text>
                  {isSelected && (
                    <View className="absolute top-1.5 right-1.5 w-4 h-4 bg-primary rounded-full items-center justify-center">
                      <Check size={10} color="white" strokeWidth={3} />
                    </View>
                  )}
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* 2. Add Variant Values */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
          <Text className="font-bold text-slate-900 text-sm mb-0.5">2. Add Variant Values</Text>
          <Text className="text-slate-400 text-[10px] mb-2">Add all the available options for this variant type</Text>

          <Text className="text-slate-700 font-semibold text-xs mb-2.5">
            Weight <Text className="text-slate-400 font-normal">(e.g. 500g, 1kg, 2kg)</Text>
          </Text>

          <View className="mb-3">
            {variantList.map((item, index) => (
              <View
                key={item.id}
                className={`flex-row items-center bg-slate-50/60 border border-slate-100 rounded-2xl px-3 h-12 ${index > 0 ? 'mt-2.5' : ''}`}
              >
                <GripVertical size={16} color="#cbd5e1" className="mr-2" />
                <TextInput
                  value={item.value}
                  onChangeText={(text) => updateVariant(item.id, 'value', text)}
                  placeholder="e.g. 500g"
                  className="flex-1 font-bold text-slate-900 text-xs"
                />
                <Pressable onPress={() => removeVariantValue(item.id)} className="p-1">
                  <Trash2 size={16} color="#ef4444" />
                </Pressable>
              </View>
            ))}
          </View>

          <Pressable
            onPress={addVariantValue}
            className="border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-2xl h-12 flex-row items-center justify-center active:bg-purple-50"
          >
            <Plus size={16} color="#4F26D9" />
            <Text className="text-primary font-bold text-xs ml-2">+ Add Value</Text>
          </Pressable>
        </View>

        {/* 3. Set Price, Stock & SKU Table */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-12">
          <Text className="font-bold text-slate-900 text-sm mb-0.5">3. Set Price, Stock & SKU for Each Variant</Text>
          <Text className="text-slate-400 text-[10px] mb-4">Add details for each variant</Text>

          <View className="bg-slate-50/50 border border-slate-100 rounded-2xl p-2">
            {/* Table Header */}
            <View className="flex-row px-2 py-2 border-b border-slate-100">
              <Text className="flex-1 text-[9px] font-bold text-slate-400 uppercase">Variant</Text>
              <Text className="flex-[1.5] text-[9px] font-bold text-slate-400 uppercase ml-2">Price (₦)</Text>
              <Text className="flex-1 text-[9px] font-bold text-slate-400 uppercase ml-2">Stock</Text>
              <Text className="flex-[1.5] text-[9px] font-bold text-slate-400 uppercase ml-2">SKU (Optional)</Text>
              <View className="w-6" />
            </View>

            {/* Table Rows */}
            <View className="mt-2">
              {variantList.map((item, index) => (
                <View key={item.id} className={`flex-row items-center ${index > 0 ? 'mt-2' : ''}`}>
                  <View className="flex-1 h-11 bg-white rounded-xl justify-center px-2.5 border border-slate-100">
                    <Text className="text-xs font-bold text-slate-900" numberOfLines={1}>{item.value || 'Variant'}</Text>
                  </View>
                  <TextInput
                    value={item.price}
                    onChangeText={(text) => updateVariant(item.id, 'price', text)}
                    placeholder="800"
                    className="flex-[1.5] h-11 bg-white border border-slate-100 rounded-xl px-2.5 ml-2 text-xs text-slate-900 font-bold"
                    keyboardType="numeric"
                  />
                  <TextInput
                    value={item.stock}
                    onChangeText={(text) => updateVariant(item.id, 'stock', text)}
                    placeholder="20"
                    className="flex-1 h-11 bg-white border border-slate-100 rounded-xl px-2.5 ml-2 text-xs text-slate-900"
                    keyboardType="numeric"
                  />
                  <TextInput
                    value={item.sku}
                    onChangeText={(text) => updateVariant(item.id, 'sku', text)}
                    placeholder="SKU"
                    className="flex-[1.5] h-11 bg-white border border-slate-100 rounded-xl px-2.5 ml-2 text-xs text-slate-900"
                  />
                  <Pressable onPress={() => removeVariantValue(item.id)} className="w-6 items-end">
                    <Trash2 size={14} color="#ef4444" />
                  </Pressable>
                </View>
              ))}
            </View>

            {/* Added + Add Value button directly in Section 3 */}
            <Pressable
              onPress={addVariantValue}
              className="mt-3 border-2 border-dashed border-purple-200 bg-white rounded-xl h-11 flex-row items-center justify-center active:bg-purple-50"
            >
              <Plus size={14} color="#4F26D9" />
              <Text className="text-primary font-bold text-xs ml-1.5">+ Add Value</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation Side-by-Side */}
      <View className="p-6 bg-white border-t border-slate-50 flex-row">
        <Pressable
          className="flex-1 h-14 rounded-2xl border border-primary justify-center items-center active:bg-purple-50 mr-4"
          onPress={() => router.back()}
        >
          <Text className="text-primary font-bold text-base">Cancel</Text>
        </Pressable>

        <Pressable
          className="flex-1 bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
          onPress={() => router.back()}
        >
          <Text className="text-white font-bold text-base">Save Variants</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}