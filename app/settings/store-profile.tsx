import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
  ArrowLeft, Camera,
  Check,
  ChevronRight,
  Edit3,
  FileText,
  IdCard,
  Lock,
  Mail,
  MapPin, Phone,
  ShieldCheck,
  Star,
  Store,
  X
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function StoreProfileScreen() {
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [showDocsModal, setShowDocsModal] = useState(false);

  // Store Editable States
  const [storeName, setStoreName] = useState('Green Basket Groceries');
  const [storeDesc, setDesc] = useState('Fresh produce, organic groceries, household items, and everyday essentials delivered fast.');
  const [phone, setPhone] = useState('0803 123 4567');
  const [email, setEmail] = useState('contact@greenbasket.com');
  const [address, setAddress] = useState('23 Admiralty Way, Lekki Phase 1, Lagos');
  const [city, setCity] = useState('Lekki');
  const [stateName, setStateName] = useState('Lagos State');
  const [logoUri, setLogoUri] = useState<string | null>(null);
  const [coverUri, setCoverUri] = useState<string | null>(null);

  // Document Upload States
  const [cacDoc, setCacDoc] = useState<string | null>('uploaded');
  const [govtIdDoc, setGovtIdDoc] = useState<string | null>('uploaded');
  const [ninNumber, setNinNumber] = useState('23490182736');

  // Pick Logo
  const pickLogo = async () => {
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
      setLogoUri(result.assets[0].uri);
    }
  };

  // Pick Cover
  const pickCover = async () => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access photo library is required.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });
    if (!result.canceled) {
      setCoverUri(result.assets[0].uri);
    }
  };

  const uploadDocument = async (setDocState: React.Dispatch<React.SetStateAction<string | null>>) => {
    const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permission.granted) {
      alert('Permission to access photo library is required.');
      return;
    }
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      quality: 0.8,
    });
    if (!result.canceled) {
      setDocState(result.assets[0].uri);
      Alert.alert('Document Uploaded', 'Document updated and submitted for verification.');
    }
  };

  const handleSave = () => {
    setIsEditing(false);
    Alert.alert('Profile Saved', 'Your store profile details have been updated successfully.');
  };

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <Pressable
          onPress={() => router.back()}
          className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50"
        >
          <ArrowLeft size={20} color="#000" />
        </Pressable>

        <Text className="text-xl font-bold text-slate-900">
          {isEditing ? 'Edit Store Profile' : 'Store Profile'}
        </Text>

        {isEditing ? (
          <Pressable onPress={() => setIsEditing(false)} className="p-1">
            <X size={22} color="#64748b" />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => setIsEditing(true)}
            className="bg-purple-50 px-3.5 py-1.5 rounded-full border border-purple-100 flex-row items-center gap-1"
          >
            <Edit3 size={12} color="#4F26D9" />
            <Text className="text-primary font-bold text-xs">Edit</Text>
          </Pressable>
        )}
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Cover Photo Header */}
        <View className="mx-6 mt-4 h-36 bg-emerald-900 rounded-[32px] relative overflow-hidden justify-between p-4 shadow-sm">
          {coverUri && (
            <Image source={{ uri: coverUri }} className="absolute inset-0 w-full h-full" />
          )}
          <View className="self-end">
            <Pressable
              onPress={pickCover}
              className="bg-black/50 border border-white/30 px-3 py-1.5 rounded-full flex-row items-center gap-1.5 active:bg-black/70"
            >
              <Camera size={12} color="white" />
              <Text className="text-white font-bold text-[10px]">
                {coverUri ? 'Change Cover' : 'Upload Cover'}
              </Text>
            </Pressable>
          </View>
        </View>

        {/* Profile Logo & Details */}
        <View className="mx-6 -mt-12 mb-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
          <View className="flex-row justify-between items-end">
            <View className="w-20 h-20 bg-green-100 rounded-2xl items-center justify-center border-4 border-white shadow-md relative overflow-hidden">
              {logoUri ? (
                <Image source={{ uri: logoUri }} className="w-full h-full" />
              ) : (
                <Text className="text-4xl">🧺</Text>
              )}
              <Pressable
                onPress={pickLogo}
                className="absolute bottom-1 right-1 bg-primary p-1.5 rounded-full border-2 border-white active:bg-primary/90"
              >
                <Camera size={10} color="white" />
              </Pressable>
            </View>

            <View className="bg-green-100 px-3 py-1 rounded-full flex-row items-center">
              <View className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5" />
              <Text className="text-green-800 font-bold text-[10px]">Active & Verified</Text>
            </View>
          </View>

          {!isEditing ? (
            /* VIEW MODE */
            <View className="mt-3">
              <Text className="text-xl font-bold text-slate-900">{storeName}</Text>
              <Text className="text-slate-400 text-xs mt-0.5">ID: ST-45872</Text>
              <Text className="text-slate-500 text-xs mt-2 leading-5">{storeDesc}</Text>
            </View>
          ) : (
            /* EDIT MODE */
            <View className="mt-4 gap-3">
              <View>
                <Text className="text-slate-700 font-bold text-xs mb-1">Store Name</Text>
                <TextInput
                  value={storeName}
                  onChangeText={setStoreName}
                  className="bg-slate-50 border border-slate-200 h-12 px-4 rounded-2xl font-bold text-slate-900 text-sm"
                />
              </View>

              <View>
                <Text className="text-slate-700 font-bold text-xs mb-1">Store Description</Text>
                <TextInput
                  value={storeDesc}
                  onChangeText={setDesc}
                  multiline
                  className="bg-slate-50 border border-slate-200 min-h-[80px] p-3 rounded-2xl text-slate-900 text-xs"
                  textAlignVertical="top"
                />
              </View>
            </View>
          )}
        </View>

        {/* DETAILS SECTION */}
        {!isEditing ? (
          /* VIEW MODE: Options List */
          <View className="mx-6 bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm mb-4 gap-1">
            <ProfileRow icon={Store} label="Store Information" sub={storeName} bg="bg-purple-100" iconColor="#4F26D9" onPress={() => setIsEditing(true)} />
            <ProfileRow icon={MapPin} label="Store Address" sub={`${address}, ${city}`} bg="bg-blue-100" iconColor="#3b82f6" onPress={() => setIsEditing(true)} />
            <ProfileRow icon={Phone} label="Contact Information" sub={`${phone} • ${email}`} bg="bg-green-100" iconColor="#22c55e" onPress={() => setIsEditing(true)} />
            <ProfileRow
              icon={FileText}
              label="Business Documents"
              sub="CAC, Govt ID, NIN/BVN (Verified ✓)"
              bg="bg-purple-100"
              iconColor="#4F26D9"
              onPress={() => setShowDocsModal(true)}
            />
          </View>
        ) : (
          /* EDIT MODE: Form */
          <View className="mx-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-4 gap-4">
            <Text className="font-bold text-slate-900 text-sm">Contact & Location Details</Text>

            <View>
              <Text className="text-slate-700 font-bold text-xs mb-1">Business Phone</Text>
              <View className="bg-slate-50 border border-slate-200 h-12 px-4 rounded-2xl flex-row items-center gap-2">
                <Phone size={16} color="#4F26D9" />
                <TextInput
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                  className="flex-1 text-slate-900 font-bold text-xs"
                />
              </View>
            </View>

            <View>
              <Text className="text-slate-700 font-bold text-xs mb-1">Business Email</Text>
              <View className="bg-slate-50 border border-slate-200 h-12 px-4 rounded-2xl flex-row items-center gap-2">
                <Mail size={16} color="#4F26D9" />
                <TextInput
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  className="flex-1 text-slate-900 text-xs"
                />
              </View>
            </View>

            <View>
              <Text className="text-slate-700 font-bold text-xs mb-1">Store Address</Text>
              <View className="bg-slate-50 border border-slate-200 h-12 px-4 rounded-2xl flex-row items-center gap-2">
                <MapPin size={16} color="#4F26D9" />
                <TextInput
                  value={address}
                  onChangeText={setAddress}
                  className="flex-1 text-slate-900 text-xs"
                />
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1">
                <Text className="text-slate-700 font-bold text-xs mb-1">City</Text>
                <TextInput
                  value={city}
                  onChangeText={setCity}
                  className="bg-slate-50 border border-slate-200 h-12 px-4 rounded-2xl text-slate-900 text-xs"
                />
              </View>

              <View className="flex-1">
                <Text className="text-slate-700 font-bold text-xs mb-1">State</Text>
                <TextInput
                  value={stateName}
                  onChangeText={setStateName}
                  className="bg-slate-50 border border-slate-200 h-12 px-4 rounded-2xl text-slate-900 text-xs"
                />
              </View>
            </View>
          </View>
        )}

        {/* Profile Completion Badge */}
        <View className="mx-6 bg-purple-50/60 border border-purple-100 p-5 rounded-[32px] flex-row items-center justify-between mb-6 shadow-sm">
          <View className="flex-row items-center flex-1 mr-2">
            <View className="w-10 h-10 bg-primary/10 rounded-2xl items-center justify-center mr-3">
              <Star size={20} color="#4F26D9" />
            </View>
            <View className="flex-1">
              <Text className="font-bold text-slate-900 text-xs">Profile Verification</Text>
              <Text className="text-slate-500 text-[10px] mt-0.5 leading-3">Identity and business documents verified.</Text>
            </View>
          </View>

          <View className="w-12 h-12 rounded-full border-4 border-emerald-500 items-center justify-center bg-emerald-50">
            <Check size={18} color="#22c55e" strokeWidth={3} />
          </View>
        </View>

        {/* Action Button */}
        <View className="px-6 mb-12">
          {!isEditing ? (
            <Pressable
              onPress={() => setIsEditing(true)}
              className="bg-primary h-14 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg shadow-primary/30 active:bg-primary/90"
            >
              <Edit3 size={18} color="white" />
              <Text className="text-white font-bold text-base">Edit Store Profile</Text>
            </Pressable>
          ) : (
            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setIsEditing(false)}
                className="flex-1 border border-slate-200 h-14 rounded-2xl justify-center items-center active:bg-slate-50"
              >
                <Text className="text-slate-700 font-bold text-base">Cancel</Text>
              </Pressable>

              <Pressable
                onPress={handleSave}
                className="flex-[2] bg-primary h-14 rounded-2xl flex-row justify-center items-center gap-2 shadow-lg shadow-primary/30 active:bg-primary/90"
              >
                <Check size={18} color="white" />
                <Text className="text-white font-bold text-base">Save Changes</Text>
              </Pressable>
            </View>
          )}
        </View>
      </ScrollView>

      {/* ================= BUSINESS DOCUMENTS MODAL ================= */}
      <Modal visible={showDocsModal} animationType="slide" presentationStyle="pageSheet">
        <SafeAreaView className="flex-1 bg-[#F8F9FE]">
          <View className="px-6 py-4 bg-white border-b border-slate-100 flex-row justify-between items-center">
            <View className="flex-row items-center gap-2">
              <ShieldCheck size={22} color="#4F26D9" />
              <Text className="text-xl font-bold text-slate-900">Business Documents</Text>
            </View>
            <Pressable onPress={() => setShowDocsModal(false)} className="p-1">
              <X size={22} color="#64748b" />
            </Pressable>
          </View>

          <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
            {/* Status Banner */}
            <View className="bg-emerald-50 border border-emerald-200 p-4 rounded-3xl flex-row items-center mb-5">
              <View className="w-10 h-10 bg-emerald-500 rounded-2xl items-center justify-center mr-3">
                <Check size={20} color="white" strokeWidth={3} />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-emerald-900 text-xs">Business Verified</Text>
                <Text className="text-emerald-700 text-[10px] mt-0.5">
                  Your registration and ID documents are approved.
                </Text>
              </View>
            </View>

            {/* Document Item 1: CAC Registration */}
            <View className="bg-white border border-slate-100 p-4 rounded-3xl mb-3 flex-row items-center justify-between shadow-sm">
              <View className="flex-row items-center flex-1 mr-2">
                <View className="w-10 h-10 bg-purple-100 rounded-2xl items-center justify-center mr-3">
                  <FileText size={18} color="#4F26D9" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-slate-900 text-xs">CAC Registration Document</Text>
                  <Text className="text-green-600 font-bold text-[10px] mt-0.5">Verified ✓</Text>
                </View>
              </View>
              <Pressable
                onPress={() => uploadDocument(setCacDoc)}
                className="bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 active:bg-purple-100"
              >
                <Text className="text-primary font-bold text-[10px]">Update</Text>
              </Pressable>
            </View>

            {/* Document Item 2: Government ID */}
            <View className="bg-white border border-slate-100 p-4 rounded-3xl mb-3 flex-row items-center justify-between shadow-sm">
              <View className="flex-row items-center flex-1 mr-2">
                <View className="w-10 h-10 bg-blue-100 rounded-2xl items-center justify-center mr-3">
                  <IdCard size={18} color="#3b82f6" />
                </View>
                <View className="flex-1">
                  <Text className="font-bold text-slate-900 text-xs">Government ID (Passport / Driver's License)</Text>
                  <Text className="text-green-600 font-bold text-[10px] mt-0.5">Verified ✓</Text>
                </View>
              </View>
              <Pressable
                onPress={() => uploadDocument(setGovtIdDoc)}
                className="bg-purple-50 px-3 py-1.5 rounded-xl border border-purple-100 active:bg-purple-100"
              >
                <Text className="text-primary font-bold text-[10px]">Update</Text>
              </Pressable>
            </View>

            {/* Document Item 3: NIN / BVN */}
            <View className="bg-white border border-slate-100 p-4 rounded-3xl mb-6 shadow-sm">
              <View className="flex-row items-center justify-between mb-2">
                <View className="flex-row items-center">
                  <View className="w-8 h-8 bg-orange-100 rounded-xl items-center justify-center mr-2">
                    <Lock size={14} color="#f97316" />
                  </View>
                  <Text className="font-bold text-slate-900 text-xs">NIN / BVN Identity Number</Text>
                </View>
                <Text className="text-green-600 font-bold text-[10px]">Verified ✓</Text>
              </View>
              <TextInput
                value={ninNumber}
                onChangeText={setNinNumber}
                secureTextEntry
                className="bg-slate-50 border border-slate-200 h-11 px-4 rounded-xl text-slate-900 text-xs font-bold"
              />
            </View>
          </ScrollView>

          <View className="p-6 bg-white border-t border-slate-100">
            <Pressable
              onPress={() => setShowDocsModal(false)}
              className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
            >
              <Text className="text-white font-bold text-base">Done</Text>
            </Pressable>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

function ProfileRow({ icon: Icon, label, sub, bg, iconColor, onPress }: any) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center justify-between py-3 border-b border-slate-50 active:bg-purple-50/20 rounded-xl px-2">
      <View className="flex-row items-center flex-1 mr-2">
        <View className={`w-10 h-10 ${bg} rounded-2xl items-center justify-center mr-3`}>
          <Icon size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className="font-bold text-slate-900 text-xs">{label}</Text>
          <Text className="text-slate-400 text-[10px] mt-0.5" numberOfLines={1}>{sub}</Text>
        </View>
      </View>
      <ChevronRight size={16} color="#cbd5e1" />
    </Pressable>
  );
}