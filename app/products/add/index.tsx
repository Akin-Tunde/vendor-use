import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
  ArrowRight,
  Calendar,
  Camera,
  Check,
  ChevronDown,
  Image as ImageIcon,
  Package,
  Snowflake,
  X
} from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AddProductStep1() {
  const router = useRouter();
  const [desc, setDesc] = useState('');
  const [tags, setTags] = useState('');
  const [productType, setProductType] = useState('physical');
  const [images, setImages] = useState<string[]>([]);

  // Pick Image Function
  const pickImage = async () => {
    if (images.length >= 6) {
      alert('Maximum 6 images allowed.');
      return;
    }

    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access photo library is required.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImages([...images, result.assets[0].uri]);
    }
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <View className="flex-1 bg-[#F8F9FE]">
      {/* Progress Stepper */}
      <View className="flex-row items-center justify-center px-8 py-3 bg-white border-b border-slate-100">
        <StepIcon label="Product Details" active completed={false} step={1} />
        <View className="flex-1 h-[1.5px] bg-slate-200 mx-3" />
        <StepIcon label="Pricing & Inventory" active={false} completed={false} step={2} />
        <View className="flex-1 h-[1.5px] bg-slate-200 mx-3" />
        <StepIcon label="Review" active={false} completed={false} step={3} />
      </View>

      <ScrollView className="flex-1 px-6 pt-3" showsVerticalScrollIndicator={false}>
        <Text className="text-slate-500 text-xs mb-4">Fill in the product details to add it to your store</Text>

        {/* 1. Product Images Section */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
          <View className="flex-row justify-between items-center mb-1">
            <Text className="font-bold text-slate-900 text-sm">Product Images</Text>
            <Text className="text-slate-400 text-xs font-bold">{images.length}/6</Text>
          </View>
          <Text className="text-slate-400 text-[10px] mb-4">Add up to 6 clear images</Text>

          <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row space-x-3">
            {/* Display Picked Images */}
            {images.map((uri, idx) => (
              <View key={idx} className="w-24 h-24 rounded-2xl overflow-hidden relative border border-slate-200">
                <Image source={{ uri }} className="w-full h-full" />
                <Pressable
                  onPress={() => removeImage(idx)}
                  className="absolute top-1 right-1 bg-red-500 p-1 rounded-full"
                >
                  <X size={10} color="white" />
                </Pressable>
              </View>
            ))}

            {/* Upload Button */}
            {images.length < 6 && (
              <Pressable
                onPress={pickImage}
                className="w-24 h-24 border-2 border-dashed border-primary/40 bg-purple-50/20 rounded-2xl items-center justify-center"
              >
                <Camera size={20} color="#4F26D9" />
                <Text className="text-primary font-bold text-[9px] mt-1.5">Add Main Image</Text>
                <Text className="text-slate-400 text-[7px] mt-0.5">JPG, PNG (Max 5MB)</Text>
              </Pressable>
            )}

            {/* Empty Slots */}
            {Array.from({ length: Math.max(0, 5 - images.length) }).map((_, i) => (
              <View key={i} className="w-24 h-24 border border-dashed border-slate-200 bg-slate-50/50 rounded-2xl items-center justify-center">
                <ImageIcon size={20} color="#cbd5e1" />
                <Text className="text-slate-400 font-bold text-[9px] mt-1.5">Add Image</Text>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* 2. Basic Information Section */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4 space-y-4">
          <Text className="font-bold text-slate-900 text-sm">Basic Information</Text>

          {/* Product Name */}
          <View>
            <Text className="text-slate-700 font-semibold text-xs mb-2">
              Product Name <Text className="text-red-500">*</Text>
            </Text>
            <TextInput
              placeholder="E.g. Fresh Banana"
              className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl text-slate-900 text-xs"
            />
          </View>

          {/* Category */}
          <View>
            <Text className="text-slate-700 font-semibold text-xs mb-2">
              Category <Text className="text-red-500">*</Text>
            </Text>
            <Pressable className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl flex-row items-center justify-between">
              <Text className="text-slate-400 text-xs">Select Category</Text>
              <ChevronDown size={16} color="#64748b" />
            </Pressable>
          </View>

          {/* Subcategory (Stacked Below) */}
          <View>
            <Text className="text-slate-700 font-semibold text-xs mb-2">
              Subcategory <Text className="text-slate-400 font-normal">(Optional)</Text>
            </Text>
            <Pressable className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl flex-row items-center justify-between">
              <Text className="text-slate-400 text-xs">Select Subcategory</Text>
              <ChevronDown size={16} color="#64748b" />
            </Pressable>
          </View>

          {/* Product Description */}
          <View>
            <Text className="text-slate-700 font-semibold text-xs mb-2">
              Product Description <Text className="text-red-500">*</Text>
            </Text>
            <View className="bg-slate-50/60 border border-slate-100 rounded-2xl p-3 min-h-[100px] justify-between">
              <TextInput
                placeholder="Describe your product, its features, quality, benefits, etc."
                multiline
                maxLength={500}
                onChangeText={setDesc}
                className="text-slate-900 text-xs flex-1"
                textAlignVertical="top"
              />
              <Text className="text-slate-400 text-[9px] self-end mt-2">{desc.length}/500</Text>
            </View>
          </View>
        </View>

        {/* 3. Product Tags Section */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4 space-y-2">
          <Text className="font-bold text-slate-900 text-sm">Product Tags <Text className="text-slate-400 font-normal text-xs">(Optional)</Text></Text>
          <Text className="text-slate-400 text-[10px]">Add keywords to help customers find your product</Text>

          <View className="bg-slate-50/60 border border-slate-100 h-12 px-4 rounded-2xl flex-row items-center justify-between mt-2">
            <TextInput
              placeholder="E.g. Organic, Fresh, Local"
              onChangeText={setTags}
              className="text-slate-900 text-xs flex-1 mr-2"
            />
            <Text className="text-slate-400 text-[9px]">{tags.length}/10</Text>
          </View>
        </View>

        {/* 4. Product Type Section */}
        <View className="p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
          <Text className="font-bold text-slate-900 text-sm mb-1">Product Type</Text>
          <Text className="text-slate-400 text-[10px] mb-4">What best describes this product?</Text>

          <View className="flex-row space-x-2">
            <TypeCard
              label="Physical Product"
              desc="A tangible item that requires delivery"
              icon={Package}
              iconBg="bg-purple-100"
              selected={productType === 'physical'}
              onPress={() => setProductType('physical')}
            />
            <TypeCard
              label="Perishable"
              desc="Items that have a short shelf life"
              icon={Snowflake}
              iconBg="bg-green-100"
              iconColor="#22c55e"
              selected={productType === 'perishable'}
              onPress={() => setProductType('perishable')}
            />
            <TypeCard
              label="Digital/Service"
              desc="Digital products or services"
              icon={Calendar}
              iconBg="bg-orange-100"
              iconColor="#f97316"
              selected={productType === 'digital'}
              onPress={() => setProductType('digital')}
            />
          </View>
        </View>

     
      </ScrollView>

      {/* Footer Continue Button */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable
          className="bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
          onPress={() => router.push('/products/add/pricing')}
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

function TypeCard({ label, desc, icon: Icon, iconBg, iconColor = "#4F26D9", selected, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-1 p-3 border-2 rounded-2xl justify-between min-h-[120px] ${selected ? 'border-primary bg-purple-50/30' : 'border-slate-100 bg-white'
        }`}
    >
      <View className="flex-row justify-between items-start mb-2">
        <View className={`w-8 h-8 ${iconBg} rounded-xl items-center justify-center`}>
          <Icon size={16} color={iconColor} />
        </View>
        <View className={`w-5 h-5 rounded-full border-2 items-center justify-center ${selected ? 'border-primary bg-primary' : 'border-slate-300'}`}>
          {selected && <Check size={10} color="white" strokeWidth={3} />}
        </View>
      </View>

      <View>
        <Text className="text-[11px] font-bold text-slate-900 mb-0.5">{label}</Text>
        <Text className="text-slate-400 text-[8px] leading-3" numberOfLines={2}>{desc}</Text>
      </View>
    </Pressable>
  );
}