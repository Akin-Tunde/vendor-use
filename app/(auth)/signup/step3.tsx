import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, ScrollView, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, 
  Camera, 
  Store, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  ChevronDown, 
  CheckCircle2,
  Info,
  Save,
  ShieldCheck,
  ShoppingBasket
} from 'lucide-react-native';

export default function StoreProfileScreen() {
  const router = useRouter();
  
  // Local state for character counts
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');

  return (
    <View className="flex-1 bg-white">
      {/* Progress Header */}
      <View className="items-center pt-2">
         <Text className="text-primary font-bold text-sm">Step 3 of 4</Text>
      </View>

      {/* Progress Indicator */}
      <View className="flex-row items-center justify-center px-10 mt-4 mb-6">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <View 
              className={`w-8 h-8 rounded-full items-center justify-center 
                ${step < 3 ? 'bg-primary' : step === 3 ? 'border-2 border-primary bg-white' : 'border border-slate-200 bg-white'}`}
            >
              {step < 3 ? (
                <CheckCircle2 size={18} color="white" />
              ) : (
                <Text className={step === 3 ? 'text-primary font-bold' : 'text-slate-400'}>{step}</Text>
              )}
            </View>
            {step < 4 && <View className={`flex-1 h-[2px] mx-1 ${step < 3 ? 'bg-primary' : 'bg-slate-100'}`} />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-slate-900 leading-tight">Complete Your Store Profile</Text>
            <Text className="text-slate-500 mt-2 leading-5">
              Tell customers about your business. This information will be visible on your store page.
            </Text>
          </View>
          <View className="w-24 h-24 bg-slate-50 rounded-full items-center justify-center">
             <Store size={48} color="#4F26D9" opacity={0.2} />
          </View>
        </View>

        {/* Logo Upload Section */}
        <View className="mt-8">
          <Text className="font-bold text-slate-900 mb-3">Store Logo</Text>
          <Pressable className="border-2 border-dashed border-slate-200 rounded-3xl p-6 bg-slate-50/30 flex-row items-center justify-center">
            <View className="w-14 h-14 bg-purple-100 rounded-full items-center justify-center mr-4">
              <Camera size={24} color="#4F26D9" />
            </View>
            <View>
              <Text className="font-bold text-slate-900">Upload Store Logo</Text>
              <Text className="text-slate-500 text-xs mt-1">PNG, JPG up to 2MB</Text>
              <Text className="text-slate-400 text-[10px]">Recommended size: 512x512</Text>
            </View>
          </Pressable>
        </View>

        {/* Form Fields */}
        <View className="mt-8 space-y-6">
          
          {/* Store Name */}
          <View>
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
          <View>
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

          {/* Business Email */}
          <ProfileInput label="Business Email" icon={Mail} placeholder="Enter your business email address" />

          {/* Phone Numbers Grid */}
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <Text className="font-semibold text-slate-700 mb-2">Business Phone</Text>
              <View className="flex-row items-center border border-slate-200 rounded-2xl h-14 bg-slate-50/50">
                <View className="flex-row items-center px-2 border-r border-slate-200">
                  <Phone size={14} color="#4F26D9" />
                  <Text className="text-xs font-bold ml-1">+234</Text>
                  <ChevronDown size={12} color="#666" />
                </View>
                <TextInput placeholder="Number" className="flex-1 px-3 text-sm" keyboardType="phone-pad" />
              </View>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-slate-700 mb-2">Alternative Phone <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
              <View className="flex-row items-center border border-slate-200 rounded-2xl px-3 h-14 bg-slate-50/50">
                <Phone size={14} color="#4F26D9" />
                <TextInput placeholder="Enter phone" className="flex-1 ml-2 text-sm" keyboardType="phone-pad" />
              </View>
            </View>
          </View>

          {/* Address */}
          <View>
            <Text className="font-semibold text-slate-700 mb-2">Store Address</Text>
            <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
              <MapPin size={18} color="#4F26D9" className="mr-3" />
              <TextInput placeholder="Enter your store address" className="flex-1 text-slate-900 text-base" />
              <Pressable>
                <View className="w-6 h-6 items-center justify-center">
                  <View className="w-4 h-4 border-2 border-slate-400 rounded-full items-center justify-center">
                    <View className="w-1 h-1 bg-slate-400 rounded-full" />
                  </View>
                </View>
              </Pressable>
            </View>
          </View>

          {/* State & City Grid */}
          <View className="flex-row space-x-4">
            <DropdownInput label="State" placeholder="Select state" />
            <DropdownInput label="City" placeholder="Select city" />
          </View>

          {/* Delivery Radius & Selected Business Type */}
          <View className="flex-row space-x-4">
            <View className="flex-1">
              <View className="flex-row items-center mb-2">
                <Text className="font-semibold text-slate-700 mr-1">Delivery Radius <Text className="text-slate-400 font-normal">(Optional)</Text></Text>
                <Info size={12} color="#666" />
              </View>
              <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
                <View className="w-5 h-5 bg-purple-100 rounded-md items-center justify-center mr-2">
                  <MapPin size={12} color="#4F26D9" />
                </View>
                <TextInput placeholder="e.g. 5 km" className="flex-1 text-slate-900 text-sm" keyboardType="numeric" />
                <Text className="text-slate-400 text-xs">km</Text>
              </View>
            </View>
            <View className="flex-1">
              <Text className="font-semibold text-slate-700 mb-2">Business Type <Text className="text-slate-400 font-normal">(Selected)</Text></Text>
              <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-primary/[0.03]">
                <ShoppingBasket size={14} color="#4F26D9" className="mr-2" />
                <Text className="flex-1 text-slate-900 text-xs font-bold" numberOfLines={1}>Grocery & Supermarket</Text>
                <CheckCircle2 size={12} color="#4CD964" />
              </View>
            </View>
          </View>
        </View>

        {/* Security Note */}
        <View className="flex-row items-center justify-center my-10 bg-slate-50 py-3 rounded-2xl">
           <ShieldCheck size={14} color="#64748b" className="mr-2" />
           <Text className="text-slate-500 text-[10px]">Your information is secure and will never be shared.</Text>
        </View>
      </ScrollView>

      {/* Footer */}
      <View className="p-6 bg-white border-t border-slate-50">
        <Pressable 
          className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
          onPress={() => router.push('/signup/step4')}
        >
          <Text className="text-white font-bold text-lg">Continue</Text>
        </Pressable>
        
        <Pressable className="mt-4 flex-row justify-center items-center">
          <Save size={16} color="#4F26D9" className="mr-2" />
          <Text className="text-primary font-bold">Save & Continue Later</Text>
        </Pressable>
      </View>
    </View>
  );
}

// Helpers
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
        <Text className="flex-1 text-slate-400 text-xs">{placeholder}</Text>
        <ChevronDown size={14} color="#666" />
      </View>
    </View>
  );
}