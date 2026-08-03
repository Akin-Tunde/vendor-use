import { useRouter } from 'expo-router';
import { ArrowLeft, Info, Mail, Phone, Send } from 'lucide-react-native';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ForgotPasswordScreen() {
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'email' | 'phone'>('email');

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
                    <Text className="text-3xl font-bold text-slate-900">Forgot Password</Text>
                    <Text className="text-slate-500 text-xs mt-2 leading-5">
                        Don't worry! It happens. Please enter your email address or phone number linked to your account. We'll send you a code to reset your password.
                    </Text>
                </View>

                {/* Top Illustration Graphic */}
                <View className="items-center justify-center my-4">
                    <View className="w-48 h-40  items-center justify-center  ">
                        <Image source={require('../../../assets/icons/forgot-password.png')} className="w-full h-full"  />
                    </View>
                </View>

                {/* Rounded Tab Switcher Container */}
                <View className="bg-slate-50 border border-slate-200/80 rounded-2xl p-1 flex-row mb-6 mt-2">
                    <TouchableOpacity
                        onPress={() => setActiveTab('email')}
                        className={`flex-1 py-3 rounded-xl items-center justify-center ${activeTab === 'email' ? 'bg-white shadow-sm border border-slate-100' : ''
                            }`}
                    >
                        <Text className={`font-bold text-xs ${activeTab === 'email' ? 'text-primary' : 'text-slate-500'}`}>
                            Email
                        </Text>
                        {activeTab === 'email' && <View className="h-0.5 w-12 bg-primary rounded-full mt-1" />}
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => setActiveTab('phone')}
                        className={`flex-1 py-3 rounded-xl items-center justify-center ${activeTab === 'phone' ? 'bg-white shadow-sm border border-slate-100' : ''
                            }`}
                    >
                        <Text className={`font-bold text-xs ${activeTab === 'phone' ? 'text-primary' : 'text-slate-500'}`}>
                            Phone Number
                        </Text>
                        {activeTab === 'phone' && <View className="h-0.5 w-16 bg-primary rounded-full mt-1" />}
                    </TouchableOpacity>
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
                <Pressable className="flex-row items-center justify-center border border-slate-200 h-14 rounded-2xl mb-8 active:bg-slate-50">
                    <Image source={require('../../../assets/icons/google.jpg')} className="w-6 h-6 mr-3" resizeMode="contain" />
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