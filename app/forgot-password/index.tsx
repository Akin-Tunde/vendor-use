import { useRouter } from 'expo-router';
import { ArrowLeft, Info, Mail, Phone, Send } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* Top Header */}
            <View className="px-6 pt-4 pb-2 flex-row items-center justify-between">
                <Pressable
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50"
                >
                    <ArrowLeft size={20} color="#000" />
                </Pressable>

                <Text className="text-lg font-bold text-slate-900">Forgot Password</Text>

                <View className="w-10" />
            </View>

            <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
                {/* Top Illustration */}
                <View className="items-center justify-center my-6">
                    <View className="w-32 h-32 bg-purple-50 rounded-full items-center justify-center">
                        <Text className="text-6xl">🔒</Text>
                    </View>
                </View>

                {/* Heading */}
                <View className="items-center mb-6">
                    <Text className="text-2xl font-bold text-slate-900 text-center">Let's recover your account</Text>
                    <Text className="text-slate-500 text-xs text-center mt-2 px-4 leading-5">
                        Enter your email address or phone number and we'll send you a code to reset your password.
                    </Text>
                </View>

                {/* Tab Switcher (Email vs Phone Number) */}
                <View className="flex-row border-b border-slate-100 mb-6">
                    <Pressable
                        onPress={() => setActiveTab('email')}
                        className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'email' ? 'border-primary' : 'border-transparent'}`}
                    >
                        <Text className={`font-bold text-sm ${activeTab === 'email' ? 'text-primary' : 'text-slate-400'}`}>Email</Text>
                    </Pressable>

                    <Pressable
                        onPress={() => setActiveTab('phone')}
                        className={`flex-1 py-3 items-center border-b-2 ${activeTab === 'phone' ? 'border-primary' : 'border-transparent'}`}
                    >
                        <Text className={`font-bold text-sm ${activeTab === 'phone' ? 'text-primary' : 'text-slate-400'}`}>Phone Number</Text>
                    </Pressable>
                </View>

                {/* Input Field */}
                <View className="mb-4">
                    <Text className="font-semibold text-slate-700 text-xs mb-2">
                        {activeTab === 'email' ? 'Email Address' : 'Phone Number'}
                    </Text>

                    {activeTab === 'email' ? (
                        <View className="flex-row items-center border border-slate-200 rounded-2xl px-4 h-14 bg-slate-50/50">
                            <Mail size={18} color="#4F26D9" className="mr-3" />
                            <TextInput
                                placeholder="Enter your email address"
                                keyboardType="email-address"
                                className="flex-1 text-slate-900 text-base"
                            />
                        </View>
                    ) : (
                        <View className="flex-row items-center border border-slate-200 rounded-2xl h-14 bg-slate-50/50">
                            <View className="flex-row items-center px-3 border-r border-slate-200">
                                <Phone size={16} color="#4F26D9" />
                                <Text className="text-xs font-bold ml-1.5">+234</Text>
                            </View>
                            <TextInput placeholder="Enter phone number" className="flex-1 px-4 text-base text-slate-900" keyboardType="phone-pad" />
                        </View>
                    )}
                </View>

                {/* Info Callout Box */}
                <View className="bg-purple-50/60 border border-purple-100 p-4 rounded-2xl flex-row items-center mb-6">
                    <Info size={16} color="#4F26D9" className="mr-3" />
                    <Text className="text-slate-600 text-xs flex-1 leading-4">
                        We'll send a 6-digit verification code to your {activeTab === 'email' ? 'email address' : 'phone number'}.
                    </Text>
                </View>

                {/* Send OTP Button */}
                <Pressable
                    onPress={() => router.push('/(auth)/forgot-password/verify' as any)}
                    className="bg-primary h-14 rounded-2xl flex-row justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90"
                >
                    <Text className="text-white font-bold text-base mr-2">Send OTP</Text>
                    <Send size={16} color="white" />
                </Pressable>

                {/* Divider */}
                <View className="flex-row items-center my-6">
                    <View className="flex-1 h-[1px] bg-slate-100" />
                    <Text className="mx-4 text-slate-400 font-bold text-xs uppercase">or</Text>
                    <View className="flex-1 h-[1px] bg-slate-100" />
                </View>

                {/* Google Button */}
                <Pressable className="flex-row items-center justify-center border border-slate-200 h-14 rounded-2xl mb-8">
                    <Image source={require('../../assets/icons/google.jpg')} className="w-6 h-6 mr-3" resizeMode="contain" />
                    <Text className="font-bold text-slate-700">Continue with Google</Text>
                </Pressable>

                {/* Bottom Link */}
                <View className="items-center pb-12">
                    <Text className="text-slate-500 text-xs">
                        Remember your password? <Text className="text-primary font-bold" onPress={() => router.push('/(auth)/login' as any)}>Login</Text>
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}