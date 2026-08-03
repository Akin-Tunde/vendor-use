
import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Camera, 
  CheckCircle2,
  ChevronDown, 
  Edit3, 
  Info,
  Mail, 
  MapPin, 
  Phone, 
  ShoppingBasket,
  Store,
  X
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoreProfileScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
    const [logoUri, setLogoUri] = useState<string | null>(null);
// Pick Image Function
  const pickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert('Permission to access your photo library is required to upload a logo.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setLogoUri(result.assets[0].uri);
    }
  };
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-6 pt-4 pb-2">
        <Pressable onPress={() => router.back()} className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50 active:border-purple-200">
          <ArrowLeft size={20} color="#000" />
        </Pressable>
        <Text className="flex-1 text-center text-primary font-bold text-sm">Step 3 of 6</Text>
        <View className="w-10" />
      </View>

      <View className="flex-row items-center justify-center px-5 mt-2">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <React.Fragment key={step}>
            <View className={`w-8 h-8 rounded-full items-center justify-center ${step < 3 ? 'bg-primary' : step === 3 ? 'border-2 border-primary bg-white' : 'border border-slate-200 bg-white'}`}>
              {step < 3 ? <CheckCircle2 size={18} color="white" /> : <Text className={step === 3 ? 'text-primary font-bold' : 'text-slate-400'}>{step}</Text>}
            </View>
            {step < 6 && <View className={`flex-1 h-[2px] mx-1 ${step < 3 ? 'bg-primary' : 'bg-slate-100'}`} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView className="flex-1 px-6 mt-3" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-slate-900 leading-tight">Complete Your Store Profile</Text>
            <Text className="text-slate-500 mt-2 leading-5">Tell customers about your business. This information will be visible on your store page.</Text>
          </View>
          <View className="w-32 h-32 rounded-2xl items-center justify-center">
            <Image source={require('../../../assets/icons/step-3.png')} className="w-64 h-64" resizeMode="contain" />

          </View>
        </View>

         <View className="mt-8 mb-6">
          <Text className="font-bold text-slate-900 mb-3">Store Logo</Text>
          <Pressable 
            onPress={pickImage}
            className="border-2 border-dashed border-slate-200 rounded-3xl p-4 bg-slate-50/30 flex-row items-center justify-center overflow-hidden active:bg-purple-50/30"
          >
            {logoUri ? (
              <View className="flex-row items-center w-full justify-between px-2">
                <View className="flex-row items-center flex-1">
                  <Image source={{ uri: logoUri }} className="w-16 h-16 rounded-2xl mr-4" />
                  <View className="flex-1">
                    <Text className="font-bold text-slate-900">Logo Selected</Text>
                    <Text className="text-primary font-bold text-xs mt-1">Tap to change image</Text>
                  </View>
                </View>
                <Pressable 
                  onPress={(e) => {
                    e.stopPropagation();
                    setLogoUri(null);
                  }}
                  className="bg-red-50 p-2.5 rounded-full border border-red-100"
                >
                  <X size={16} color="#ef4444" />
                </Pressable>
              </View>
            ) : (
              <>
                <View className="w-14 h-14 bg-purple-100 rounded-full items-center justify-center mr-4">
                  <Camera size={24} color="#4F26D9" />
                </View>
                <View>
                  <Text className="font-bold text-slate-900">Upload Store Logo</Text>
                  <Text className="text-slate-500 text-xs mt-1">PNG, JPG up to 2MB</Text>
                  <Text className="text-slate-400 text-[10px]">Recommended size: 512x512</Text>
                </View>
              </>
            )}
          </Pressable>
        </View>

        <View className="pb-10">

          {/* Store Name */}
          <View className="mb-5">
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-slate-700">Store Name</Text>
              <Text className="text-slate-400 text-xs">{name.length}/50</Text>
            </View>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <Store size={18} color="#4F26D9" className="mr-3" />
              <TextInput
                placeholder="Enter your store name"
                maxLength={50}
                onChangeText={setName}
                className="flex-1 text-slate-900 text-base"
              />
            </View>
          </View>

          {/* Store Description */}
          <View className="mb-5">
            <View className="flex-row justify-between mb-2">
              <Text className="font-semibold text-slate-700">Store Description</Text>
              <Text className="text-slate-400 text-xs">{desc.length}/250</Text>
            </View>
            <View className="flex-row items-start border border-slate-200 rounded-2xl px-4 py-4 min-h-[100px] bg-slate-50/50">
              <Edit3 size={18} color="#4F26D9" className="mr-3 mt-1" />
              <TextInput
                placeholder="Tell customers about your store, products and services"
                multiline
                maxLength={250}
                onChangeText={setDesc}
                className="flex-1 text-slate-900 text-base"
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* 📍 Business Type (Moved Here Before Business Email) */}
          <View className="mb-5">
            <Text className="font-semibold text-slate-700 mb-2">
              Business Type <Text className="text-slate-400 font-normal">(Selected)</Text>
            </Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-primary/[0.03]">
              <ShoppingBasket size={18} color="#4F26D9" className="mr-3" />
              <Text className="flex-1 text-slate-900 text-base font-bold">Grocery & Supermarket</Text>
              <CheckCircle2 size={16} color="#4CD964" />
            </View>
          </View>

          {/* Business Email */}
          <View className="mb-5">
            <ProfileInput label="Business Email" icon={Mail} placeholder="Enter your business email address" />
          </View>

          {/* Business Phone */}
          <View className="mb-5">
            <Text className="font-semibold text-slate-700 mb-2">Business Phone</Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl h-14 bg-slate-50/50">
              <View className="flex-row items-center px-3 border-r border-slate-200">
                <Phone size={14} color="#4F26D9" />
                <Text className="text-xs font-bold ml-1.5">+234</Text>
                <ChevronDown size={12} color="#666" className="ml-1" />
              </View>
              <TextInput placeholder="Enter business phone number" className="flex-1 px-4 text-base text-slate-900" keyboardType="phone-pad" />
            </View>
          </View>

          {/* Alternative Phone */}
          <View className="mb-5">
            <Text className="font-semibold text-slate-700 mb-2">Alternative Phone <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <Phone size={18} color="#4F26D9" className="mr-3" />
              <TextInput placeholder="Enter alternative phone number" className="flex-1 text-base text-slate-900" keyboardType="phone-pad" />
            </View>
          </View>

          {/* Store Address */}
          <View className="mb-5">
            <Text className="font-semibold text-slate-700 mb-2">Store Address</Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <MapPin size={18} color="#4F26D9" className="mr-3" />
              <TextInput placeholder="Enter your store address" className="flex-1 text-slate-900 text-base" />
            </View>
          </View>

          {/* State & City Grid */}
          <View className="flex-row gap-4 mb-5">
            <DropdownInput label="State" placeholder="Select state" />
            <DropdownInput label="City" placeholder="Select city" />
          </View>

          {/* Delivery Radius (Now Full-Width at the Bottom) */}
          <View className="mb-5">
            <View className="flex-row items-center mb-2">
              <Text className="font-semibold text-slate-700 mr-1">Delivery Radius <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
              <Info size={12} color="#666" />
            </View>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <View className="w-5 h-5 bg-purple-100 rounded-md items-center justify-center mr-3">
                <MapPin size={12} color="#4F26D9" />
              </View>
              <TextInput placeholder="e.g. 5" className="flex-1 text-slate-900 text-base" keyboardType="numeric" />
              <Text className="text-slate-400 text-sm">km</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="p-6 bg-white border-t border-slate-50 flex-row space-x-5">
        <Pressable className="flex-1 border border-slate-200 bg-white h-16 rounded-2xl justify-center items-center active:bg-purple-50 active:border-primary" onPress={() => router.back()}>
          <Text className="text-slate-700 font-bold text-base">Previous</Text>
        </Pressable>

        <Pressable className="flex-1 bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90" onPress={() => router.push('/signup/step4')}>
          <Text className="text-white font-bold text-base">Continue</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function ProfileInput({ label, icon: Icon, placeholder }: any) {
  return (
    <View>
      <Text className="font-semibold text-slate-700 mb-2">{label}</Text>
      <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
        <Icon size={18} color="#4F26D9" className="mr-3" />
        <TextInput placeholder={placeholder} className="flex-1 text-slate-900 text-base" />
      </View>
    </View>
  );
}

function DropdownInput({ label, placeholder }: any) {
  return (
    <View className="flex-1">
      <Text className="font-semibold text-slate-700 mb-2">{label}</Text>
      <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
        <View className="w-5 h-5 bg-purple-100 rounded-md items-center justify-center mr-2">
          <Store size={12} color="#4F26D9" />
        </View>
        <Text className="flex-1 text-slate-400 text-xs" numberOfLines={1}>{placeholder}</Text>
        <ChevronDown size={14} color="#666" />
      </View>
    </View>
  );
}