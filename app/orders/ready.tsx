import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bike,
    Check,
    CheckCircle2,
    CreditCard,
    Headphones,
    Info,
    MapPin,
    MessageSquare,
    MoreVertical, Phone,
    Printer,
    ShoppingBag,
    Star,
    User,
    Wallet
} from 'lucide-react-native';
import React from 'react';
import { Image, Pressable,  ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
const STEPS = [
    { label: 'Confirmed', time: '09:10 AM', active: false, completed: true },
    { label: 'Preparing', time: '09:20 AM', active: false, completed: true },
    { label: 'Ready', time: '09:38 AM', active: true, completed: false },
    { label: 'Picked Up', active: false, completed: false },
    { label: 'Delivered', active: false, completed: false },
];

export default function ReadyForPickupScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* 1. Header */}
            <View className="px-6 py-4 flex-row justify-between items-center border-b border-slate-50">
                <View className="flex-row items-center">
                    <Pressable onPress={() => router.back()} className="mr-4">
                        <ArrowLeft size={24} color="#000" />
                    </Pressable>
                    <View>
                        <Text className="text-lg font-bold text-slate-900">Ready for Pickup</Text>
                        <Text className="text-slate-400 text-[10px]">#ORD-8919 • 3 items</Text>
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
                {/* 2. Status Stepper */}
                <View className="px-6 py-6 bg-white">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row">
                        {STEPS.map((step, i) => (
                            <React.Fragment key={i}>
                                <View className="items-center w-16">
                                    <View className={`w-8 h-8 rounded-full items-center justify-center mb-2 
                    ${step.active ? 'bg-primary shadow-lg shadow-primary/40' : step.completed ? 'bg-primary' : 'bg-slate-100'}`}>
                                        {step.completed ? <Check size={14} color="white" /> : <ShoppingBag size={14} color={step.active ? 'white' : '#cbd5e1'} />}
                                    </View>
                                    <Text className={`text-[8px] font-bold text-center ${step.active || step.completed ? 'text-primary' : 'text-slate-400'}`}>{step.label}</Text>
                                    {step.time && <Text className="text-[6px] text-slate-400 mt-0.5">{step.time}</Text>}
                                </View>
                                {i < STEPS.length - 1 && <View className={`w-10 h-[1px] mt-4 mx-1 border-dashed ${step.completed ? 'bg-primary' : 'bg-slate-100'}`} />}
                            </React.Fragment>
                        ))}
                    </ScrollView>
                </View>

                {/* 3. Ready Banner */}
                <View className="mx-6 bg-green-50/50 border border-green-100 p-4 rounded-2xl flex-row items-center justify-between">
                    <View className="flex-row items-center flex-1">
                        <CheckCircle2 size={18} color="#22c55e" />
                        <View className="ml-3">
                            <Text className="text-slate-900 font-bold text-xs">Order is ready for pickup</Text>
                            <Text className="text-slate-500 text-[10px]">Assign a rider or wait for auto-assignment.</Text>
                        </View>
                    </View>
                    <View className="bg-white px-3 py-1.5 rounded-xl border border-green-200 items-center">
                        <Text className="text-green-600 font-bold text-xs tracking-tighter">00:12:45</Text>
                        <Text className="text-slate-400 text-[6px] font-bold uppercase">Ready for</Text>
                    </View>
                </View>

                {/* 4. Customer Info (Profile) */}
                <View className="px-6 mt-6">
                    <View className="bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm flex-row items-center">
                        <View className="w-16 h-16 bg-purple-100 rounded-full items-center justify-center">
                            <Text className="text-primary font-bold text-xl">AB</Text>
                        </View>
                        <View className="flex-1 ml-4">
                            <View className="flex-row items-center">
                                <Text className="text-lg font-bold text-slate-900 mr-2">Alex Brown</Text>
                                <View className="bg-orange-100 px-2 py-0.5 rounded">
                                    <Text className="text-orange-700 text-[8px] font-bold">VIP</Text>
                                </View>
                            </View>
                            <View className="flex-row items-center mt-1">
                                <Phone size={12} color="#94a3b8" />
                                <Text className="text-slate-600 text-xs ml-2">0812 345 6789</Text>
                            </View>
                            <View className="flex-row items-start mt-1">
                                <MapPin size={12} color="#94a3b8" className="mt-0.5" />
                                <Text className="text-slate-400 text-[10px] ml-2 leading-4 flex-1">
                                    45 Freedom Way, Lekki Phase 1, Lagos, Nigeria
                                </Text>
                            </View>
                        </View>
                        <View className="flex-row space-x-2">
                            <Pressable className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center"><Phone size={18} color="#4F26D9" /></Pressable>
                            <Pressable className="w-10 h-10 bg-slate-50 rounded-full items-center justify-center"><MessageSquare size={18} color="#4F26D9" /></Pressable>
                        </View>
                    </View>
                </View>

                {/* 5. Logistics Grid */}
                <View className="flex-row flex-wrap px-6 mt-4 justify-between">
                    <LogisticsChip icon={Bike} label="Standard Delivery" />
                    <LogisticsChip icon={Wallet} label="Paid" color="text-green-500" />
                    <LogisticsChip icon={CreditCard} label="Transfer" />
                    <LogisticsChip icon={ShoppingBag} label="Delivery" />
                </View>

                {/* 6. Customer Note */}
                <View className="mx-6 mt-4 bg-blue-50/50 border border-blue-100 p-3 rounded-xl flex-row items-center">
                    <Info size={14} color="#4F26D9" />
                    <Text className="text-primary text-[10px] ml-2 font-medium">
                        <Text className="font-bold">Customer Note: </Text>Please leave at the gate. Thanks!
                    </Text>
                </View>

                {/* 7. Next Action Cards */}
                <View className="px-6 mt-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <Text className="font-bold text-slate-900 text-xs">Next Action</Text>
                        <View className="bg-purple-100 px-2 py-0.5 rounded">
                            <Text className="text-primary text-[8px] font-bold">Rider waiting</Text>
                        </View>
                    </View>
                    <Text className="text-slate-500 text-[10px] mb-4">Hand over the order to the rider</Text>

                    <View className="flex-row space-x-3">
                        <Pressable className="flex-1 h-12 border border-primary/20 rounded-2xl flex-row items-center justify-center">
                            <User size={16} color="#4F26D9" />
                            <Text className="text-primary font-bold ml-2 text-xs">Assign Rider</Text>
                        </Pressable>
                        <Pressable
                            onPress={() => router.push('/orders/confirmation')}
                            className="flex-1 h-12 bg-primary rounded-2xl flex-row items-center justify-center shadow-md shadow-primary/20"
                        >
                            <Bike size={18} color="white" />
                            <Text className="text-white font-bold ml-2 text-xs">Handover to Rider</Text>
                        </Pressable>
                    </View>
                </View>

                {/* 8. Assigned Rider Card */}
                <View className="px-6 mt-8">
                    <View className="flex-row justify-between items-center mb-4">
                        <View className="flex-row items-center">
                            <User size={16} color="#4F26D9" />
                            <Text className="font-bold text-slate-900 ml-2">Assigned Rider</Text>
                        </View>
                        <View className="bg-green-100 px-2 py-0.5 rounded">
                            <Text className="text-green-700 text-[8px] font-bold">On the way</Text>
                        </View>
                    </View>

                    <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm flex-row items-center">
                        <Image source={{ uri: 'https://avatar.iran.liara.run/public/33' }} className="w-14 h-14 rounded-full bg-slate-100" />
                        <View className="flex-1 ml-3">
                            <View className="flex-row items-center">
                                <Text className="font-bold text-slate-900">Michael Daniel</Text>
                                <View className="flex-row items-center ml-2">
                                    <Star size={10} color="#f59e0b" fill="#f59e0b" />
                                    <Text className="text-slate-900 text-[10px] font-bold ml-1">4.8</Text>
                                </View>
                            </View>
                            <Text className="text-slate-400 text-[10px] mt-0.5">0908 123 4567</Text>
                            <Text className="text-slate-400 text-[10px]">BKJ 123 XY</Text>
                        </View>
                        <View className="items-end mr-4">
                            <Text className="text-slate-400 text-[8px] font-bold uppercase">Arriving in</Text>
                            <Text className="text-slate-900 font-bold text-sm">05:30</Text>
                            <Text className="text-slate-400 text-[8px]">2.4 km away</Text>
                        </View>
                        <View className="flex-row space-x-2">
                            <Pressable className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"><Phone size={16} color="#4F26D9" /></Pressable>
                            <Pressable className="w-9 h-9 bg-slate-50 rounded-full items-center justify-center"><MessageSquare size={16} color="#4F26D9" /></Pressable>
                        </View>
                    </View>
                </View>

                {/* 9. Order Summary (Condensed) */}
                <View className="px-6 mt-8 mb-20">
                    <Text className="text-slate-900 font-bold text-xs mb-4">Order Summary</Text>
                    <View className="space-y-3">
                        <SummaryLine label="Subtotal" value="₦20,200" />
                        <SummaryLine label="Delivery Fee" value="₦1,000" />
                        <SummaryLine label="Service Fee" value="₦500" />
                        <View className="flex-row justify-between pt-2 border-t border-slate-50">
                            <Text className="text-lg font-bold text-slate-900">Total</Text>
                            <Text className="text-lg font-bold text-slate-900">₦21,700</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>

            {/* 10. Footer Footer */}
            <View className="px-6 py-6 border-t border-slate-50 bg-white flex-row space-x-3">
                <FooterAction icon={Printer} label="Print Receipt" />
                <FooterAction icon={MessageSquare} label="Message Customer" />
                <FooterAction icon={MoreVertical} label="More Actions" />
            </View>
        </SafeAreaView>
    );
}

// Helpers
function LogisticsChip({ icon: Icon, label, color = 'text-primary' }: any) {
    return (
        <View className="bg-slate-50/50 border border-slate-100 rounded-xl px-3 py-2 flex-row items-center mb-2">
            <Icon size={12} color="#4F26D9" />
            <Text className={`text-[10px] font-bold ml-2 ${color}`}>{label}</Text>
        </View>
    );
}

function SummaryLine({ label, value }: any) {
    return (
        <View className="flex-row justify-between items-center">
            <Text className="text-slate-400 text-[10px] font-medium">{label}</Text>
            <Text className="text-slate-900 font-bold text-xs">{value}</Text>
        </View>
    );
}

function FooterAction({ icon: Icon, label }: any) {
    return (
        <Pressable className="flex-1 h-14 border border-slate-200 rounded-2xl flex-row items-center justify-center bg-slate-50">
            <Icon size={16} color="#4F26D9" />
            <Text className="text-slate-600 font-bold ml-2 text-[10px]" numberOfLines={1}>{label}</Text>
        </Pressable>
    );
}