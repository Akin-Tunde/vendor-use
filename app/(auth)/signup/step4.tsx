import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Camera,
    CheckCircle2,
    Clock,
    CreditCard,
    FileText,
    HelpCircle,
    IdCard,
    Lock,
    ShieldCheck,
    Upload,
    UserCircle2
} from 'lucide-react-native';
import React from 'react';
import { Pressable, SafeAreaView, ScrollView, Text, View } from 'react-native';

export default function BusinessVerificationScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* 1. Custom Header (Matches image) */}
            <View className="flex-row justify-between items-center px-6 py-4">
                <Pressable onPress={() => router.back()} className="p-1">
                    <ArrowLeft size={24} color="#4F26D9" />
                </Pressable>
                <Text className="text-primary font-bold text-sm">Step 4 of 4</Text>
                <Pressable className="flex-row items-center">
                    <HelpCircle size={18} color="#4F26D9" />
                    <Text className="text-primary font-bold ml-1 text-sm">Help</Text>
                </Pressable>
            </View>

            {/* 2. Progress Indicator */}
            <View className="flex-row items-center justify-center px-10 mb-6">
                {[1, 2, 3, 4].map((step) => (
                    <React.Fragment key={step}>
                        <View
                            className={`w-7 h-7 rounded-full items-center justify-center 
                ${step < 4 ? 'bg-primary' : 'bg-primary border-2 border-primary'}`}
                        >
                            {step < 4 ? (
                                <CheckCircle2 size={16} color="white" />
                            ) : (
                                <Text className="text-white text-xs font-bold">4</Text>
                            )}
                        </View>
                        {step < 4 && <View className="flex-1 h-[2px] mx-0.5 bg-primary" />}
                    </React.Fragment>
                ))}
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* 3. Illustration & Title Section */}
                <View className="px-6 flex-row justify-between items-start">
                    <View className="flex-1 pr-4">
                        <Text className="text-3xl font-bold text-slate-900 leading-tight">Verify Your Business</Text>
                        <Text className="text-slate-500 mt-2 leading-5">
                            We need to verify your identity and business to keep our platform safe and trusted.
                        </Text>
                    </View>
                    {/* Illustration placeholder */}
                    <View className="w-32 h-32 bg-slate-50 rounded-2xl items-center justify-center">
                        <ShieldCheck size={70} color="#4F26D9" opacity={0.1} />
                        <View className="absolute">
                            <FileText size={40} color="#4F26D9" opacity={0.4} />
                        </View>
                    </View>
                </View>

                {/* 4. Privacy Note */}
                <View className="mx-6 mt-6 bg-green-50/80 p-4 rounded-2xl flex-row items-center">
                    <View className="w-8 h-8 bg-green-500/10 rounded-full items-center justify-center">
                        <Lock size={16} color="#22c55e" />
                    </View>
                    <Text className="flex-1 ml-3 text-green-800 text-[11px] leading-4">
                        Your information is secure and will only be used for verification purposes. It will never be shared with the public.
                    </Text>
                </View>

                {/* 5. Verification Checklist */}
                <View className="px-6 mt-8">
                    <Text className="font-bold text-slate-900 mb-4">Complete All Verification Steps</Text>

                    <VerificationItem
                        icon={IdCard}
                        bg="bg-green-50"
                        iconColor="#22c55e"
                        title="Government ID"
                        desc="Upload a valid means of identification (e.g. National ID, Driver's License, International Passport)"
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

                {/* 6. Encryption Note */}
                <View className="mx-6 mt-8 bg-slate-50 p-4 rounded-2xl flex-row items-center mb-10">
                    <Lock size={16} color="#94a3b8" />
                    <Text className="flex-1 ml-3 text-slate-400 text-[10px] leading-4">
                        All documents are encrypted and secured. We comply with global data protection standards.
                    </Text>
                </View>
            </ScrollView>

            {/* 7. Action Footer */}
            <View className="p-6 bg-white border-t border-slate-50">
                <Pressable
                    className="bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30"
                    onPress={() => router.push('/signup/complete')}
                >
                    <Text className="text-white font-bold text-lg">Submit for Verification</Text>
                </Pressable>

                <Pressable className="mt-4 border-2 border-primary h-16 rounded-2xl flex-row justify-center items-center">
                    <Clock size={20} color="#4F26D9" />
                    <Text className="text-primary font-bold text-lg ml-2">Save & Continue Later</Text>
                </Pressable>

                <View className="flex-row items-center justify-center mt-6">
                    <ShieldCheck size={14} color="#64748b" />
                    <Text className="text-slate-400 text-[10px] ml-1.5 font-medium">Verification usually takes 5–24 hours.</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

// Subcomponent for the list items
function VerificationItem({ icon: Icon, bg, iconColor, title, desc, isSelfie }: any) {
    return (
        <View className="flex-row items-center p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm mb-4">
            <View className={`w-12 h-12 ${bg} rounded-2xl items-center justify-center mr-4`}>
                <Icon size={24} color={iconColor} />
            </View>

            <View className="flex-1 pr-2">
                <View className="flex-row items-center mb-1">
                    <Text className="font-bold text-slate-900 text-sm mr-2">{title}</Text>
                    <View className="bg-green-100 px-2 py-0.5 rounded">
                        <Text className="text-green-700 text-[8px] font-bold">Required</Text>
                    </View>
                </View>
                <Text className="text-slate-400 text-[10px] leading-4">{desc}</Text>
            </View>

            <Pressable className="bg-purple-50 px-4 py-2 rounded-xl flex-row items-center border border-primary/10">
                {isSelfie ? (
                    <>
                        <Camera size={14} color="#4F26D9" />
                        <Text className="text-primary font-bold text-[10px] ml-1.5">Take Selfie</Text>
                    </>
                ) : (
                    <>
                        <Upload size={14} color="#4F26D9" />
                        <Text className="text-primary font-bold text-[10px] ml-1.5">Upload</Text>
                    </>
                )}
            </Pressable>
        </View>
    );
}