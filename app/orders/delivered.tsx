import { useRouter } from 'expo-router';
import {
    Archive,
    ArrowLeft,
    Bike,
    CheckCircle2,
    Clock,
    FileText,
    Headphones,
    History,
    Info,
    MapPin,
    MoreVertical,
    Printer,
    Star
} from 'lucide-react-native';
import React from 'react';
import { Image, Pressable,  ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const STEPS = [
    { label: 'Confirmed', time: '09:05 AM' },
    { label: 'Preparing', time: '09:20 AM' },
    { label: 'Ready', time: '09:38 AM' },
    { label: 'Picked Up', time: '10:02 AM' },
    { label: 'Out for Delivery', time: '10:15 AM' },
    { label: 'Delivered', time: '10:32 AM' },
];

export default function OrderDeliveredScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FE]">
            {/* 1. Header */}
            <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-50">
                <View className="flex-row items-center">
                    <Pressable onPress={() => router.back()} className="mr-4">
                        <ArrowLeft size={24} color="#000" />
                    </Pressable>
                    <View>
                        <Text className="text-lg font-bold text-slate-900">Delivered</Text>
                        <Text className="text-slate-400 text-[10px]">#ORD-8917 • 2 items</Text>
                    </View>
                </View>
                <View className="flex-row items-center space-x-3">
                    <Pressable className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-full border border-slate-100">
                        <Headphones size={14} color="#4F26D9" />
                        <Text className="text-primary font-bold ml-1.5 text-xs">Help</Text>
                    </Pressable>
                    <MoreVertical size={24} color="#64748b" />
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* 2. Completed Status Stepper */}
                <View className="px-6 py-6 bg-white">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {STEPS.map((step, i) => (
                            <React.Fragment key={i}>
                                <View className="items-center w-20">
                                    <View className="w-8 h-8 rounded-full items-center justify-center mb-2 bg-primary">
                                        <CheckCircle2 size={16} color="white" />
                                    </View>
                                    <Text className="text-[7px] font-bold text-center text-primary">{step.label}</Text>
                                    <Text className="text-[6px] mt-0.5 font-bold text-slate-400">{step.time}</Text>
                                </View>
                                {i < STEPS.length - 1 && <View className="w-8 h-[1px] mt-4 mx-0.5 bg-primary border-dashed" />}
                            </React.Fragment>
                        ))}
                    </ScrollView>
                </View>

                {/* 3. Delivery Success Banner */}
                <View className="mx-6 mt-4 bg-green-50 border border-green-100 p-4 rounded-2xl flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                        <View className="bg-green-500 rounded-full p-1">
                            <CheckCircle2 size={14} color="white" />
                        </View>
                        <View className="ml-3">
                            <Text className="text-slate-900 font-bold text-xs">Order Delivered Successfully!</Text>
                            <Text className="text-slate-500 text-[10px]">This order has been completed. Payment has been received.</Text>
                        </View>
                    </View>
                    <View className="items-end">
                        <Text className="text-slate-400 text-[6px] font-bold uppercase">Delivered at</Text>
                        <Text className="text-green-600 font-bold text-xs">10:32 AM</Text>
                        <Text className="text-slate-400 text-[6px]">Today, May 16</Text>
                    </View>
                </View>

                {/* 4. Customer & Rider Cards */}
                <View className="flex-row px-6 mt-6 space-x-3">
                    <PersonCard label="Customer" name="Michael Daniel" rating="4.8" uri="https://avatar.iran.liara.run/public/31" />
                    <PersonCard label="Rider" name="David Williams" rating="4.9" uri="https://avatar.iran.liara.run/public/33" />
                </View>

                {/* 5. Proof of Delivery */}
                <View className="px-6 mt-6">
                    <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
                        <View className="flex-row items-center mb-4">
                            <CheckCircle2 size={16} color="#22c55e" />
                            <Text className="font-bold text-slate-900 ml-2 text-xs">Proof of Delivery</Text>
                        </View>
                        <View className="flex-row space-x-4">
                            <View className="flex-1">
                                <Text className="text-slate-400 text-[8px] font-bold uppercase mb-2">Recipient Name</Text>
                                <Text className="text-slate-900 font-bold text-xs mb-4">Michael Daniel</Text>
                                <Text className="text-slate-400 text-[8px] font-bold uppercase mb-2">Customer Signature</Text>
                                <View className="h-12 bg-slate-50 rounded-xl items-center justify-center">
                                    <Text className="text-slate-400 text-[10px] italic">Sign-placeholder</Text>
                                </View>
                            </View>
                            <View className="flex-1">
                                <Text className="text-slate-400 text-[8px] font-bold uppercase mb-2">Delivery Photo</Text>
                                <View className="h-24 bg-slate-200 rounded-xl overflow-hidden">
                                    {/* Placeholder for delivery photo */}
                                    <Image source={{ uri: 'https://images.unsplash.com/photo-1530124560676-4fbc91848b9b?q=80&w=1000' }} className="w-full h-full" />
                                </View>
                            </View>
                        </View>
                        <View className="mt-4 pt-4 border-t border-slate-50">
                            <Text className="text-slate-400 text-[8px] font-bold uppercase mb-2">GPS Delivery Location</Text>
                            <View className="flex-row items-center">
                                <View className="w-20 h-14 bg-slate-100 rounded-lg mr-3 items-center justify-center">
                                    <MapPin size={20} color="#ef4444" />
                                </View>
                                <View className="flex-1">
                                    <Text className="text-slate-900 font-bold text-[10px]">23 Admiralty Way, Lekki Phase 1, Lagos, Nigeria</Text>
                                    <Text className="text-slate-400 text-[9px] mt-1">6.4365° N, 3.4528° E</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 6. Delivery Summary Metrics */}
                <View className="px-6 mt-6">
                    <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm flex-row flex-wrap">
                        <MetricItem icon={Clock} label="Preparation Time" value="18 mins" sub="09:20 AM - 09:38 AM" />
                        <MetricItem icon={Bike} label="Pickup Time" value="24 mins" sub="09:38 AM - 10:02 AM" />
                        <MetricItem icon={Bike} label="Delivery Time" value="30 mins" sub="10:02 AM - 10:32 AM" />
                        <MetricItem icon={CheckCircle2} label="Total Time" value="1h 12m" sub="09:20 AM - 10:32 AM" />
                    </View>
                </View>

                {/* 7. Order & Payment Breakdown */}
                <View className="flex-row px-6 mt-6 space-x-4">
                    {/* Order Summary */}
                    <View className="flex-1 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
                        <Text className="font-bold text-slate-900 text-xs mb-4">Order Summary</Text>
                        <View className="flex-row items-center mb-3">
                            <View className="w-8 h-8 bg-slate-50 rounded-lg items-center justify-center mr-2"><Text>🥤</Text></View>
                            <View className="flex-1">
                                <Text className="text-slate-900 font-bold text-[10px]">Coca Cola (1.5L)</Text>
                                <View className="flex-row justify-between"><Text className="text-slate-400 text-[8px]">x1</Text><Text className="text-slate-900 font-bold text-[8px]">₦2,000</Text></View>
                            </View>
                        </View>
                        <View className="flex-row items-center mb-4">
                            <View className="w-8 h-8 bg-slate-50 rounded-lg items-center justify-center mr-2"><Text>🥔</Text></View>
                            <View className="flex-1">
                                <Text className="text-slate-900 font-bold text-[10px]">Lay's Classic (145g)</Text>
                                <View className="flex-row justify-between"><Text className="text-slate-400 text-[8px]">x1</Text><Text className="text-slate-900 font-bold text-[8px]">₦1,500</Text></View>
                            </View>
                        </View>
                        <View className="space-y-2 pt-2 border-t border-slate-50">
                            <SummaryLine label="Subtotal" value="₦24,800" />
                            <SummaryLine label="Delivery Fee" value="₦1,000" />
                            <SummaryLine label="Platform Fee" value="₦500" hasInfo />
                            <View className="flex-row justify-between mt-2 pt-2 border-t border-slate-50">
                                <Text className="text-sm font-bold text-slate-900">Total</Text>
                                <Text className="text-sm font-bold text-slate-900">₦26,300</Text>
                            </View>
                        </View>
                    </View>

                    {/* Payment Breakdown */}
                    <View className="flex-1 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
                        <View className="flex-row justify-between items-center mb-4">
                            <Text className="font-bold text-slate-900 text-xs">Payment Information</Text>
                            <View className="bg-green-100 px-2 py-0.5 rounded"><Text className="text-green-700 text-[8px] font-bold">Payment Received</Text></View>
                        </View>
                        <Text className="text-slate-400 text-[9px] font-bold">Paid with</Text>
                        <View className="flex-row items-center mt-1 mb-4">
                            <Text className="text-slate-900 font-bold text-[11px]">Mastercard •••• 4242</Text>
                            <View className="w-4 h-2.5 bg-red-500 rounded-sm ml-2" />
                        </View>
                        <View className="space-y-3">
                            <SummaryLine label="Paid Amount" value="₦26,300" />
                            <SummaryLine label="Vendor Earnings" value="₦24,800" highlight />
                            <SummaryLine label="Platform Commission" value="- ₦1,500" red />
                            <View className="bg-green-50 p-3 rounded-2xl mt-4">
                                <Text className="text-green-800 text-[10px] font-bold">You Earned</Text>
                                <Text className="text-green-600 text-lg font-bold mt-1">₦23,300</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 8. Ratings Section */}
                <View className="px-6 mt-6 mb-10">
                    <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm flex-row justify-between">
                        <RatingCol label="Customer Rating" score="5.0" />
                        <RatingCol label="Delivery Rating" score="5.0" />
                        <RatingCol label="Vendor Rating" score="5.0" />
                    </View>
                </View>
            </ScrollView>

            {/* 9. Final Footer Actions */}
            <View className="px-6 py-6 border-t border-slate-50 bg-white flex-row space-x-3">
                <FooterIconBtn icon={Printer} label="Print Receipt" />
                <FooterIconBtn icon={History} label="View Timeline" />
                <FooterIconBtn icon={FileText} label="View Invoice" />
                <FooterIconBtn icon={Archive} label="Archive Order" />
            </View>
        </SafeAreaView>
    );
}

// Helpers
function PersonCard({ label, name, rating, uri }: any) {
    return (
        <View className="flex-1 bg-white border border-slate-100 p-3 rounded-3xl flex-row items-center">
            <Image source={{ uri }} className="w-10 h-10 rounded-full bg-slate-50" />
            <View className="flex-1 ml-2">
                <Text className="text-slate-400 text-[8px] font-bold uppercase">{label}</Text>
                <Text className="text-slate-900 font-bold text-[10px]" numberOfLines={1}>{name}</Text>
            </View>
            <View className="flex-row items-center bg-slate-50 px-1.5 py-0.5 rounded-lg">
                <Star size={10} color="#f59e0b" fill="#f59e0b" />
                <Text className="text-slate-900 text-[10px] font-bold ml-1">{rating}</Text>
            </View>
        </View>
    );
}

function MetricItem({ icon: Icon, label, value, sub }: any) {
    return (
        <View className="w-[50%] mb-4">
            <View className="flex-row items-center mb-1">
                <Icon size={12} color="#4F26D9" />
                <Text className="text-slate-400 text-[9px] font-bold ml-2 uppercase">{label}</Text>
            </View>
            <Text className="text-slate-900 font-bold text-xs ml-5">{value}</Text>
            <Text className="text-slate-400 text-[8px] ml-5">{sub}</Text>
        </View>
    );
}

function SummaryLine({ label, value, highlight, red, hasInfo }: any) {
    return (
        <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
                <Text className="text-slate-400 text-[9px] font-medium">{label}</Text>
                {hasInfo && <Info size={10} color="#94a3b8" className="ml-1" />}
            </View>
            <Text className={`font-bold text-[9px] ${highlight ? 'text-primary' : red ? 'text-red-500' : 'text-slate-900'}`}>{value}</Text>
        </View>
    );
}

function RatingCol({ label, score }: any) {
    return (
        <View className="items-center">
            <Text className="text-slate-400 text-[9px] font-bold uppercase mb-2">{label}</Text>
            <View className="flex-row items-center">
                <Text className="text-slate-900 text-sm font-bold mr-1">{score}</Text>
                <Star size={14} color="#4F26D9" fill="#4F26D9" />
            </View>
        </View>
    );
}

function FooterIconBtn({ icon: Icon, label }: any) {
    return (
        <Pressable className="flex-1 h-14 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center">
            <Icon size={18} color="#4F26D9" />
            <Text className="text-slate-600 font-bold text-[8px] mt-1.5" numberOfLines={1}>{label}</Text>
        </Pressable>
    );
}