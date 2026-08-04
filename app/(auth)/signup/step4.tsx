import * as ImagePicker from 'expo-image-picker';
import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Camera,
    CheckCircle2,
    CreditCard,
    FileText,
    IdCard,
    ShieldCheck,
    Upload,
    UserCircle2
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function BusinessVerificationScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Top Header with Back Button and Centered Step Text */}
            <View className="flex-row items-center px-6 ">
                <Pressable
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50 active:border-purple-200"
                >
                    <ArrowLeft size={20} color="#000" />
                </Pressable>

                <Text className="flex-1 text-center text-primary font-bold text-sm">Step 3 of 5</Text>

                <View className="w-10" />
            </View>

            {/* Progress Indicator */}
            <View className="flex-row items-center justify-center px-5 mt-4 mb-3">
                {[1, 2, 3, 4, 5].map((step) => (
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
                        {step < 5 && <View className={`flex-1 h-[2px] mx-1 ${step < 3 ? 'bg-primary' : 'bg-slate-100'}`} />}
                    </React.Fragment>
                ))}
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Illustration & Title Section */}
                <View className="px-6 flex-row justify-between items-start">
                    <View className="flex-1 pr-4">
                        <Text className="text-2xl font-bold text-slate-900 leading-tight">Verify Your Business</Text>
                        <Text className="text-slate-500 mt-2 text-sm leading-5">
                            We need to verify your identity and business to keep our platform safe and trusted.
                        </Text>
                    </View>
                  {/*  <View className="w-32 h-32 rounded-2xl items-center justify-center overflow-hidden">
                        <Image source={require('../../../assets/icons/step-4.png')} className="w-full h-full" />
                    </View>
                    */}
                </View>

                {/* Verification Checklist */}
                <View className="px-6 mt-8 pb-10">
                    <Text className="font-bold text-slate-900 mb-4">Complete All Verification Steps</Text>

                    <VerificationItem
                        icon={IdCard}
                        bg="bg-green-50"
                        iconColor="#22c55e"
                        title="Government ID"
                        desc="Upload a valid means of identification (e.g. National ID, Driver's License, Passport)"
                    />

                    <VerificationItem
                        icon={FileText}
                        bg="bg-blue-50"
                        iconColor="#3b82f6"
                        title="Business Registration (CAC)"
                        desc="Upload your CAC certificate or business registration document."
                    />

                    <VerificationItem
                        icon={CreditCard}
                        bg="bg-orange-50"
                        iconColor="#f97316"
                        title="NIN / BVN"
                        desc="Provide your NIN or BVN for identity verification."
                    />

                    <VerificationItem
                        icon={UserCircle2}
                        bg="bg-purple-50"
                        iconColor="#4F26D9"
                        title="Selfie Verification"
                        desc="Take a clear selfie to confirm it's really you."
                        isSelfie
                    />
                </View>
            </ScrollView>

            {/* Action Footer Side-by-Side */}
            <View className="p-6 bg-white border-t border-slate-50">
                <View className="flex-row" style={{ gap: 20 }}>
                    <Pressable
                        className="flex-1 border border-slate-200 bg-white h-16 rounded-2xl justify-center items-center active:bg-purple-50 active:border-primary"
                        onPress={() => router.back()}
                    >
                        <Text className="text-slate-700 font-bold text-base">Previous</Text>
                    </Pressable>

                    <Pressable
                        className="flex-1 bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
                        onPress={() => router.push('/signup/step5')}
                    >
                        <Text className="text-white font-bold text-base text-center px-2">Submit</Text>
                    </Pressable>
                </View>

            </View>
        </SafeAreaView>
    );
}

// Subcomponent for the list items
function VerificationItem({ icon: Icon, bg, iconColor, title, desc, isSelfie }: any) {
    const [fileUri, setFileUri] = useState<string | null>(null);

    const handlePress = async () => {
        if (isSelfie) {
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (!permission.granted) {
                alert('Camera permission is required to take a selfie.');
                return;
            }
            const result = await ImagePicker.launchCameraAsync({
                cameraType: ImagePicker.CameraType.front,
                quality: 0.8,
            });
            if (!result.canceled) {
                setFileUri(result.assets[0].uri);
            }
        } else {
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
                setFileUri(result.assets[0].uri);
            }
        }
    };

    return (
        <View className="flex-row items-center p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
            <View className={`w-12 h-12 ${bg} rounded-2xl items-center justify-center mr-4`}>
                <Icon size={24} color={iconColor} />
            </View>

          <View className="flex-1 pr-2">
                <View className="flex-row items-center mb-1">
                    <Text className="font-bold text-slate-900 text-sm mr-2">{title}</Text>
                    {fileUri && (
                        <View className="bg-green-100 px-2 py-0.5 rounded">
                            <Text className="text-green-700 text-[8px] font-bold">Uploaded ✓</Text>
                        </View>
                    )}
                </View>
                <Text className="text-slate-400 text-[10px] leading-4">{desc}</Text>
            </View>

            <Pressable
                onPress={handlePress}
                className="bg-purple-50 px-4 py-2 rounded-xl flex-row items-center border border-primary/10 active:bg-purple-100"
            >
                {isSelfie ? (
                    <>
                        <Camera size={14} color="#4F26D9" />
                        <Text className="text-primary font-bold text-[10px] ml-1.5">{fileUri ? "Retake" : "Take Selfie"}</Text>
                    </>
                ) : (
                    <>
                        <Upload size={14} color="#4F26D9" />
                        <Text className="text-primary font-bold text-[10px] ml-1.5">{fileUri ? "Change" : "Upload"}</Text>
                    </>
                )}
            </Pressable>
        </View>
    );
}