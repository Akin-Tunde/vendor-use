import React, { useState } from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable, TextInput, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, Upload, ChevronDown, Check, 
  ShoppingBasket, Carrot, Beef, Milk, Home, 
  Heart, Baby, Sparkles, Smartphone, MoreHorizontal, Plus, Minus
} from 'lucide-react-native';

const ICONS = [
  { id: 'basket', icon: ShoppingBasket },
  { id: 'veg', icon: Carrot },
  { id: 'meat', icon: Beef },
  { id: 'milk', icon: Milk },
  { id: 'home', icon: Home },
  { id: 'health', icon: Heart },
  { id: 'baby', icon: Baby },
  { id: 'beauty', icon: Sparkles },
  { id: 'tech', icon: Smartphone },
  { id: 'more', icon: MoreHorizontal, label: 'More' },
];

export default function CreateCategoryScreen() {
  const router = useRouter();
  const [selectedIcon, setSelectedIcon] = useState('basket');
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [sortOrder, setSortOrder] = useState(1);

  // Checkboxes State
  const [showStorefront, setShowStorefront] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);
  const [allowBrowse, setAllowBrowse] = useState(true);
  const [isHidden, setIsHidden] = useState(false);

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center flex-1">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Create Category</Text>
            <Text className="text-slate-400 text-xs">Add a new category to organize your products</Text>
          </View>
        </View>

        <Pressable 
          onPress={() => router.back()}
          className="bg-primary px-5 py-2.5 rounded-2xl shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-xs">Save</Text>
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        {/* Card 1: Category Information */}
        <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-4 space-y-4">
          <Text className="font-bold text-slate-900 text-sm">Category Information</Text>

          {/* Category Name */}
          <View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-slate-700 font-bold text-xs">Category Name <Text className="text-red-500">*</Text></Text>
              <Text className="text-slate-400 text-[10px]">{name.length}/50</Text>
            </View>
            <TextInput 
              placeholder="Enter category name"
              maxLength={50}
              onChangeText={setName}
              className="bg-slate-50 border border-slate-100 h-12 px-4 rounded-2xl text-slate-900 text-sm"
            />
          </View>

          {/* Category Icon & Image Upload Row */}
          <View className="flex-row space-x-3">
            {/* Category Icon Grid */}
            <View className="flex-[1.2]">
              <Text className="text-slate-700 font-bold text-xs mb-2">Category Icon <Text className="text-red-500">*</Text></Text>
              <View className="flex-row flex-wrap gap-2">
                {ICONS.slice(0, 9).map((item) => {
                  const isSelected = selectedIcon === item.id;
                  const Icon = item.icon;
                  return (
                    <Pressable 
                      key={item.id}
                      onPress={() => setSelectedIcon(item.id)}
                      className={`w-10 h-10 rounded-2xl items-center justify-center border-2 ${isSelected ? 'border-primary bg-primary/5' : 'border-slate-100 bg-slate-50'}`}
                    >
                      <Icon size={18} color={isSelected ? "#4F26D9" : "#64748b"} />
                      {isSelected && (
                        <View className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-primary rounded-full items-center justify-center">
                          <Check size={8} color="white" strokeWidth={4} />
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* Category Image Upload */}
            <View className="flex-1">
              <Text className="text-slate-700 font-bold text-xs mb-2">Category Image <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
              <Pressable className="border-2 border-dashed border-purple-200 bg-purple-50/30 rounded-2xl p-3 items-center justify-center h-28">
                <Upload size={20} color="#4F26D9" />
                <Text className="text-primary font-bold text-[10px] mt-1">Upload image</Text>
                <Text className="text-slate-400 text-[7px] text-center mt-0.5">Recommended size 600x400px</Text>
              </Pressable>
            </View>
          </View>

          {/* Parent Category */}
          <View>
            <Text className="text-slate-700 font-bold text-xs mb-1">Parent Category</Text>
            <Pressable className="bg-slate-50 border border-slate-100 h-12 px-4 rounded-2xl flex-row items-center justify-between">
              <Text className="text-slate-900 text-xs">None (Top Level)</Text>
              <ChevronDown size={18} color="#64748b" />
            </Pressable>
            <Text className="text-slate-400 text-[10px] mt-1">Select a parent category if this is a sub-category</Text>
          </View>

          {/* Description */}
          <View>
            <View className="flex-row justify-between mb-1">
              <Text className="text-slate-700 font-bold text-xs">Category Description <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
              <Text className="text-slate-400 text-[10px]">{desc.length}/200</Text>
            </View>
            <TextInput 
              placeholder="Describe this category for your customers..."
              multiline
              maxLength={200}
              onChangeText={setDesc}
              className="bg-slate-50 border border-slate-100 min-h-[80px] p-3 rounded-2xl text-slate-900 text-xs"
              textAlignVertical="top"
            />
          </View>
        </View>

        {/* Card 2: Display Settings */}
        <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-4">
          <Text className="font-bold text-slate-900 text-sm mb-3">Display Settings</Text>

          <View className="flex-row flex-wrap justify-between gap-y-4">
            <CheckboxOption 
              label="Show on storefront" 
              sub="Display this category in your store" 
              value={showStorefront} 
              onToggle={() => setShowStorefront(!showStorefront)} 
            />
            <CheckboxOption 
              label="Featured Category" 
              sub="Show this category in featured section" 
              value={isFeatured} 
              onToggle={() => setIsFeatured(!isFeatured)} 
            />
            <CheckboxOption 
              label="Allow customers to browse" 
              sub="Customers can view products in this category" 
              value={allowBrowse} 
              onToggle={() => setAllowBrowse(!allowBrowse)} 
            />
            <CheckboxOption 
              label="Hidden" 
              sub="Hide this category from customers" 
              value={isHidden} 
              onToggle={() => setIsHidden(!isHidden)} 
            />
          </View>
        </View>

        {/* Card 3: Sort Order */}
        <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-4 flex-row justify-between items-center">
          <View>
            <Text className="font-bold text-slate-900 text-sm">Sort Order</Text>
            <Text className="text-slate-400 text-[10px] mt-0.5">Set the display order for this category</Text>
          </View>

          <View className="flex-row items-center border border-slate-200 rounded-2xl bg-slate-50 p-1">
            <Pressable onPress={() => setSortOrder(Math.max(1, sortOrder - 1))} className="w-8 h-8 items-center justify-center">
              <Minus size={14} color="#64748b" />
            </Pressable>
            <Text className="px-3 font-bold text-slate-900 text-sm">{sortOrder}</Text>
            <Pressable onPress={() => setSortOrder(sortOrder + 1)} className="w-8 h-8 items-center justify-center">
              <Plus size={14} color="#4F26D9" />
            </Pressable>
          </View>
        </View>

        {/* Card 4: SEO Settings (Optional) */}
        <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-8 space-y-3">
          <Text className="font-bold text-slate-900 text-sm">SEO Settings <Text className="text-slate-400 font-normal text-xs">(Optional)</Text></Text>

          <View className="flex-row space-x-3">
            <View className="flex-1">
              <View className="flex-row justify-between mb-1">
                <Text className="text-slate-700 font-bold text-xs">Meta Title</Text>
                <Text className="text-slate-400 text-[9px]">0/60</Text>
              </View>
              <TextInput placeholder="Enter meta title" className="bg-slate-50 border border-slate-100 h-11 px-3 rounded-xl text-xs" />
            </View>

            <View className="flex-1">
              <View className="flex-row justify-between mb-1">
                <Text className="text-slate-700 font-bold text-xs">Meta Description</Text>
                <Text className="text-slate-400 text-[9px]">0/160</Text>
              </View>
              <TextInput placeholder="Enter meta description" className="bg-slate-50 border border-slate-100 h-11 px-3 rounded-xl text-xs" />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer Navigation */}
      <View className="p-6 bg-white border-t border-slate-50 flex-row space-x-3">
        <Pressable 
          onPress={() => router.back()}
          className="flex-1 border border-primary h-14 rounded-2xl justify-center items-center"
        >
          <Text className="text-primary font-bold text-base">Cancel</Text>
        </Pressable>

        <Pressable 
          onPress={() => router.back()}
          className="flex-[2] bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
        >
          <Text className="text-white font-bold text-base">Create Category</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function CheckboxOption({ label, sub, value, onToggle }: any) {
  return (
    <Pressable onPress={onToggle} className="w-[48%] flex-row items-start">
      <View className={`w-5 h-5 rounded-md border items-center justify-center mr-2.5 mt-0.5 ${value ? 'bg-primary border-primary' : 'border-slate-300'}`}>
        {value && <Check size={12} color="white" strokeWidth={3} />}
      </View>
      <View className="flex-1">
        <Text className="font-bold text-slate-900 text-xs">{label}</Text>
        <Text className="text-slate-400 text-[9px] mt-0.5 leading-3">{sub}</Text>
      </View>
    </Pressable>
  );
}