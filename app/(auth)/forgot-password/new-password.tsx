import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Lock } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View ,Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateNewPasswordScreen() {
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Top Back Button */}
            <View className="px-6 pt-4 pb-2 flex-row items-center">
                <Pressable onPress={() => router.back()} className="p-2 -ml-2 active:opacity-60">
                    <ArrowLeft size={24} color="#000" />
                </Pressable>
            </View>

            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                {/* Large Page Title & Subtitle */}
                <View className="mt-2 mb-4">
                    <Text className="text-3xl font-bold text-slate-900">Create New Password</Text>
                    <Text className="text-slate-500 text-xs mt-2 leading-5">
                        Your new password must be different from previously used passwords.
                    </Text>
                </View>

                {/* Top Illustration Graphic */}
                <View className="items-center justify-center my-4">
                    <View className="w-40 h-40  items-center justify-center">
                      <Image source={require('../../../assets/icons/verify-otp.png')} className="w-full h-full" />
          </View>
                </View>

                {/* New Password Input */}
                <View className="mb-3">
                    <Text className="font-semibold text-slate-700 text-xs mb-2">New Password</Text>
                    <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
                        <Lock size={18} color="#4F26D9" className="mr-3" />
                        <TextInput
                            placeholder="Enter new password"
                            secureTextEntry={!showPass}
                            className="flex-1 text-slate-900 text-base"
                        />
                        <Pressable onPress={() => setShowPass(!showPass)}>
                            {showPass ? <EyeOff size={18} color="#4F26D9" /> : <Eye size={18} color="#64748b" />}
                        </Pressable>
                    </View>
                </View>

                {/* Segmented Password Strength Bar */}
                <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-1">
                        <View className="flex-1 flex-row space-x-2 mr-4">
                            <View className="flex-1 h-1.5 bg-green-500 rounded-full" />
                            <View className="flex-1 h-1.5 bg-slate-200 rounded-full" />
                            <View className="flex-1 h-1.5 bg-slate-200 rounded-full" />
                        </View>
                        <Text className="text-green-600 font-bold text-xs">Strong</Text>
                    </View>
                </View>

                {/* Password Requirements Checklist */}
                <View className="mb-6 space-y-2.5">
                    <Text className="text-slate-600 font-semibold text-xs mb-1">Password must contain:</Text>
                    <CheckItem label="At least 8 characters" checked />
                    <CheckItem label="Contains uppercase letter" checked />
                    <CheckItem label="Contains number" checked />
                    <CheckItem label="Contains special character (e.g. !@#$%^&*)" checked />
                </View>

                {/* Confirm Password Input */}
                <View className="mb-8">
                    <Text className="font-semibold text-slate-700 text-xs mb-2">Confirm Password</Text>
                    <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
                        <Lock size={18} color="#4F26D9" className="mr-3" />
                        <TextInput
                            placeholder="Confirm new password"
                            secureTextEntry={!showConfirm}
                            className="flex-1 text-slate-900 text-base"
                        />
                        <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? <EyeOff size={18} color="#4F26D9" /> : <Eye size={18} color="#64748b" />}
                        </Pressable>
                    </View>
                </View>

                {/* Reset Password Button */}
                <Pressable
                    onPress={() => router.push('/(auth)/forgot-password/success' as any)}
                    className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
                >
                    <Text className="text-white font-bold text-base">Reset Password</Text>
                </Pressable>

                {/* Back to Login Link */}
                <Pressable
                    onPress={() => router.push('/(auth)/login' as any)}
                    className="items-center mt-6 pb-12"
                >
                    <Text className="text-primary font-bold text-sm">Back to Login</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

function CheckItem({ label, checked }: any) {
    return (
        <View className="flex-row items-center">
            <CheckCircle2 size={16} color={checked ? "#22c55e" : "#cbd5e1"} className="mr-2.5" />
            <Text className={`text-xs font-medium ${checked ? 'text-slate-700' : 'text-slate-400'}`}>{label}</Text>
        </View>
    );
}