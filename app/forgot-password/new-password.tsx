import { useRouter } from 'expo-router';
import { ArrowLeft, CheckCircle2, Eye, EyeOff, Lock } from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function CreateNewPasswordScreen() {
    const router = useRouter();
    const [showPass, setShowPass] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Header */}
            <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
                <Pressable
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50"
                >
                    <ArrowLeft size={20} color="#000" />
                </Pressable>

                <Text className="text-lg font-bold text-slate-900">Create New Password</Text>

                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                {/* Top Illustration */}
                <View className="items-center justify-center my-6">
                    <View className="w-28 h-28 bg-purple-50 rounded-full items-center justify-center border border-purple-100">
                        <Text className="text-5xl">🔐</Text>
                    </View>
                </View>

                {/* Heading */}
                <View className="items-center mb-6">
                    <Text className="text-2xl font-bold text-slate-900 text-center">Set a new password</Text>
                    <Text className="text-slate-500 text-xs text-center mt-2 leading-5 px-4">
                        Your new password must be different from previous used passwords.
                    </Text>
                </View>

                {/* New Password Input */}
                <View className="mb-3">
                    <Text className="font-semibold text-slate-700 text-xs mb-2">New Password</Text>
                    <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
                        <Lock size={18} color="#4F26D9" className="mr-3" />
                        <TextInput
                            secureTextEntry={!showPass}
                            defaultValue="••••••••••••"
                            className="flex-1 text-slate-900 text-base"
                        />
                        <Pressable onPress={() => setShowPass(!showPass)}>
                            {showPass ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                        </Pressable>
                    </View>
                </View>

                {/* Password Strength Meter */}
                <View className="mb-4">
                    <View className="flex-row justify-between items-center mb-1">
                        <View className="flex-1 flex-row space-x-1 mr-3">
                            <View className="flex-1 h-1 bg-green-500 rounded-full" />
                            <View className="flex-1 h-1 bg-green-500 rounded-full" />
                            <View className="flex-1 h-1 bg-green-500 rounded-full" />
                        </View>
                        <Text className="text-green-600 font-bold text-[10px]">Strong</Text>
                    </View>
                </View>

                {/* Password Requirements Checklist */}
                <View className="space-y-2 mb-6">
                    <CheckItem label="At least 8 characters" checked />
                    <CheckItem label="Contains uppercase letter" checked />
                    <CheckItem label="Contains number" checked />
                    <CheckItem label="Contains special character" checked />
                </View>

                {/* Confirm Password Input */}
                <View className="mb-8">
                    <Text className="font-semibold text-slate-700 text-xs mb-2">Confirm Password</Text>
                    <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
                        <Lock size={18} color="#4F26D9" className="mr-3" />
                        <TextInput
                            secureTextEntry={!showConfirm}
                            defaultValue="••••••••••••"
                            className="flex-1 text-slate-900 text-base"
                        />
                        <Pressable onPress={() => setShowConfirm(!showConfirm)}>
                            {showConfirm ? <EyeOff size={18} color="#64748b" /> : <Eye size={18} color="#64748b" />}
                        </Pressable>
                    </View>
                </View>

                {/* Reset Password Button */}
                <Pressable
                    onPress={() => router.push('/(auth)/forgot-password/success' as any)}
                    className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90 mb-12"
                >
                    <Text className="text-white font-bold text-base">Reset Password</Text>
                </Pressable>
            </ScrollView>
        </SafeAreaView>
    );
}

function CheckItem({ label, checked }: any) {
    return (
        <View className="flex-row items-center">
            <CheckCircle2 size={14} color={checked ? "#22c55e" : "#cbd5e1"} className="mr-2" />
            <Text className={`text-xs font-medium ${checked ? 'text-slate-700' : 'text-slate-400'}`}>{label}</Text>
        </View>
    );
}