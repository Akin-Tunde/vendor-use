import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bike,
    CheckCircle2,
    ChevronDown,
    Clock,
    Info,
    MapPin,
    MoreVertical,
    Star
} from 'lucide-react-native';
import React, { useState } from 'react';
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STEPS = [
    { label: 'Confirmed', time: '09:05 AM' },
    { label: 'Preparing', time: '09:20 AM' },
    { label: 'Ready', time: '09:38 AM' },
    { label: 'Picked Up', time: '10:02 AM' },
    { label: 'Out for Delivery', time: '10:15 AM' },
    { label: 'Delivered', time: '10:32 AM' },
];

const ORDER_ITEMS = [
    { emoji: '🥤', name: "Coca Cola (1.5L)", qty: 1, price: '₦2,000' },
    { emoji: '🥔', name: "Lay's Classic (145g)", qty: 1, price: '₦1,500' },
];

export default function OrderDeliveredScreen() {
    const router = useRouter();
    const [showAllItems, setShowAllItems] = useState(false);


    const handleMoreOptions = () => {
        Alert.alert('Order options', 'More actions coming soon.');
    };

    const handlePrintReceipt = () => {
        router.push('/orders/8917/receipt');
    };

    const handleViewTimeline = () => {
        router.push('/orders/8917/timeline');
    };

    const handleViewInvoice = () => {
        router.push('/orders/8917/invoice');
    };

    const handleArchiveOrder = () => {
        Alert.alert(
            'Archive order',
            'This order will be moved to your archive.',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Archive', style: 'destructive', onPress: () => router.back() },
            ]
        );
    };

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FE]">
            {/* 1. Header */}
            <View className="px-6 py-4 flex-row justify-between items-center bg-white border-b border-slate-50">
                <View className="flex-row items-center">
                    <Pressable
                        onPress={() => router.back()}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="Go back"
                        className="mr-4 p-1"
                    >
                        <ArrowLeft size={24} color="#000" />
                    </Pressable>
                    <View>
                        <Text className="text-lg font-bold text-slate-900">Delivered</Text>
                        <Text className="text-slate-400 text-xs">#ORD-8917 • 2 items</Text>
                    </View>
                </View>
                <View className="flex-row items-center gap-3">

                    <Pressable
                        onPress={handleMoreOptions}
                        hitSlop={8}
                        accessibilityRole="button"
                        accessibilityLabel="More options"
                        className="p-1"
                    >
                        <MoreVertical size={24} color="#64748b" />
                    </Pressable>
                </View>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* 2. Completed Status Stepper */}
                <View
                    className="px-6 py-6 bg-white"
                    accessibilityRole="progressbar"
                    accessibilityLabel="Order status: Delivered, all 6 steps complete"
                >
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {STEPS.map((step, i) => (
                            <React.Fragment key={i}>
                                <View className="items-center w-20">
                                    <View className="w-8 h-8 rounded-full items-center justify-center mb-2 bg-primary">
                                        <CheckCircle2 size={16} color="white" />
                                    </View>
                                    <Text className="text-[10px] font-bold text-center text-primary">{step.label}</Text>
                                    <Text className="text-[9px] mt-0.5 font-bold text-slate-400">{step.time}</Text>
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
                        <Text className="text-slate-400 text-[9px] font-bold uppercase">Delivered at</Text>
                        <Text className="text-green-600 font-bold text-xs">10:32 AM</Text>
                        <Text className="text-slate-400 text-[9px]">Today, May 16</Text>
                    </View>
                </View>

                {/* 4. Customer & Rider Cards */}
                <View className="flex-row px-6 mt-6 gap-3">
                    <PersonCard label="Rider" name="David Williams" rating="4.9" uri="https://avatar.iran.liara.run/public/33" />
                </View>

                {/* 5. Proof of Delivery */}
                <View className="px-6 mt-6">
                    <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
                        <View className="flex-row items-center mb-4">
                            <CheckCircle2 size={16} color="#22c55e" />
                            <Text className="font-bold text-slate-900 ml-2 text-xs">Proof of Delivery</Text>
                        </View>
                        <View className="flex-row gap-4">
                            
                            <View className="flex-1">
                                <Text className="text-slate-400 text-[9px] font-bold uppercase mb-2">Delivery Photo</Text>
                                <View className="h-24 bg-slate-200 rounded-xl overflow-hidden">
                                    <Image
                                        source={{ uri: 'https://images.unsplash.com/photo-1530124560676-4fbc91848b9b?q=80&w=1000' }}
                                        className="w-full h-full"
                                        accessibilityLabel="Photo taken at delivery, showing the package at the doorstep"
                                    />
                                </View>
                            </View>
                        </View>
                        <View className="mt-4 pt-4 border-t border-slate-50">
                            <Text className="text-slate-400 text-[9px] font-bold uppercase mb-2">GPS Delivery Location</Text>
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

                {/* 7. Order Summary (Full Width) */}
                <View className="px-6 mt-6">
                    <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
                        <Text className="font-bold text-slate-900 text-xs mb-4">Order Summary</Text>
                        {ORDER_ITEMS.slice(0, showAllItems ? ORDER_ITEMS.length : 2).map((item, i) => (
                            <View key={i} className="flex-row items-center mb-3">
                                <View className="w-8 h-8 bg-slate-50 rounded-lg items-center justify-center mr-2">
                                    <Text>{item.emoji}</Text>
                                </View>
                                <View className="flex-1">
                                    <Text className="text-slate-900 font-bold text-[10px]">{item.name}</Text>
                                    <View className="flex-row justify-between">
                                        <Text className="text-slate-400 text-[9px]">x{item.qty}</Text>
                                        <Text className="text-slate-900 font-bold text-[9px]">{item.price}</Text>
                                    </View>
                                </View>
                            </View>
                        ))}
                        {ORDER_ITEMS.length > 2 && (
                            <Pressable
                                onPress={() => setShowAllItems(v => !v)}
                                accessibilityRole="button"
                                accessibilityLabel={showAllItems ? 'Show fewer items' : 'View all items'}
                                className="flex-row items-center justify-center py-2"
                            >
                                <Text className="text-slate-500 font-bold text-[10px] mr-1">
                                    {showAllItems ? 'Show less' : 'View all items'}
                                </Text>
                                <ChevronDown
                                    size={12}
                                    color="#64748b"
                                    style={{ transform: [{ rotate: showAllItems ? '180deg' : '0deg' }] }}
                                />
                            </Pressable>
                        )}
                        <View className="gap-2 pt-2 border-t border-slate-50">
                            <SummaryLine label="Subtotal" value="₦24,800" />
                            <SummaryLine label="Delivery Fee" value="₦1,000" />
                            <SummaryLine label="Platform Fee" value="₦500" hasInfo />
                            <View className="flex-row justify-between mt-2 pt-2 border-t border-slate-50">
                                <Text className="text-sm font-bold text-slate-900">Total</Text>
                                <Text className="text-sm font-bold text-slate-900">₦26,300</Text>
                            </View>
                        </View>
                    </View>
                </View>

                {/* 8. Ratings Section */}
                <View className="px-6 mt-4 mb-10">
                    <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm flex-row justify-between">
                        <RatingCol label="Customer Rating" score="5.0" />
                        <RatingCol label="Delivery Rating" score="5.0" />
                        <RatingCol label="Vendor Rating" score="5.0" />
                    </View>
                </View>
            </ScrollView>


        </SafeAreaView>
    );
}

// Helpers
function PersonCard({ label, name, rating, uri }: any) {
    return (
        <View className="flex-1 bg-white border border-slate-100 p-3 rounded-3xl flex-row items-center">
            <Image
                source={{ uri }}
                className="w-10 h-10 rounded-full bg-slate-50"
                accessibilityLabel={`Photo of ${label.toLowerCase()} ${name}`}
            />
            <View className="flex-1 ml-2">
                <Text className="text-slate-400 text-[9px] font-bold uppercase">{label}</Text>
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
                <Text className="text-slate-400 text-[10px] font-bold ml-2 uppercase">{label}</Text>
            </View>
            <Text className="text-slate-900 font-bold text-xs ml-5">{value}</Text>
            <Text className="text-slate-400 text-[9px] ml-5">{sub}</Text>
        </View>
    );
}

function SummaryLine({ label, value, highlight, red, hasInfo }: any) {
    return (
        <View className="flex-row justify-between items-center">
            <View className="flex-row items-center">
                <Text className="text-slate-400 text-[10px] font-medium">{label}</Text>
                {hasInfo && (
                    <Pressable
                        hitSlop={8}
                        onPress={() => Alert.alert('Platform Fee', 'Covers payment processing and platform operations.')}
                        accessibilityRole="button"
                        accessibilityLabel={`More info about ${label}`}
                        className="ml-1"
                    >
                        <Info size={10} color="#94a3b8" />
                    </Pressable>
                )}
            </View>
            <Text className={`font-bold text-[10px] ${highlight ? 'text-primary' : red ? 'text-red-500' : 'text-slate-900'}`}>{value}</Text>
        </View>
    );
}

function RatingCol({ label, score }: any) {
    return (
        <View className="items-center">
            <Text className="text-slate-400 text-[10px] font-bold uppercase mb-2">{label}</Text>
            <View className="flex-row items-center">
                <Text className="text-slate-900 text-sm font-bold mr-1">{score}</Text>
                <Star size={14} color="#4F26D9" fill="#4F26D9" />
            </View>
        </View>
    );
}

function FooterIconBtn({ icon: Icon, label, onPress }: any) {
    return (
        <Pressable
            onPress={onPress}
            accessibilityRole="button"
            accessibilityLabel={label}
            className="flex-1 h-14 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-slate-100"
        >
            <Icon size={18} color="#4F26D9" />
            <Text className="text-slate-600 font-bold text-[9px] mt-1.5" numberOfLines={1}>{label}</Text>
        </Pressable>
    );
}