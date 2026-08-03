import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    Bike,
    Check,
    CheckCircle2,
    ChevronDown,
    CreditCard,
    Headphones,
    Info,
    MapPin,
    MessageSquare,
    MoreVertical,
    Phone,
    Printer,
    ShoppingBag,
    Star,
    User,
    Wallet
} from 'lucide-react-native';
import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const STEPS = [
    { label: 'Confirmed', time: '09:10 AM', active: false, completed: true },
    { label: 'Preparing', time: '09:20 AM', active: false, completed: true },
    { label: 'Ready', time: '09:38 AM', active: true, completed: false },
    { label: 'Picked Up', active: false, completed: false },
    { label: 'Delivered', active: false, completed: false },
];

const ITEMS = [
    {
        name: 'Orange (1kg)',
        desc: 'Fresh Valencia Orange',
        qty: 'x1',
        price: '₦2,500',
        emoji: '🍊',
        bg: 'bg-orange-50/60',
        border: 'border-orange-100',
    },
    {
        name: 'Bread Loaf',
        desc: 'Premium Whole Wheat Bread',
        qty: 'x1',
        price: '₦1,800',
        emoji: '🍞',
        bg: 'bg-amber-50/60',
        border: 'border-amber-100',
    },
    {
        name: 'Fresh Milk (1L)',
        desc: 'Full Cream Milk',
        qty: 'x1',
        price: '₦1,900',
        emoji: '🥛',
        bg: 'bg-blue-50/60',
        border: 'border-blue-100',
    },
];

export default function ReadyForPickupScreen() {
    const router = useRouter();

    return (
        <SafeAreaView className="flex-1 bg-white">
            {/* 1. Header */}
            <View className="px-5 py-3.5 flex-row justify-between items-center border-b border-slate-100 bg-white">
                <View className="flex-row items-center">
                    <Pressable onPress={() => router.back()} className="mr-3 p-1">
                        <ArrowLeft size={22} color="#1e293b" />
                    </Pressable>
                    <View>
                        <Text className="text-lg font-bold text-slate-900">Ready for Pickup</Text>
                        <Text className="text-slate-400 text-xs">#ORD-8919 • 3 items</Text>
                    </View>
                </View>

                <View className="flex-row items-center space-x-2.5">
                    <Pressable className="flex-row items-center bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                        <Headphones size={14} color="#4F26D9" />
                        <Text className="text-primary font-bold ml-1.5 text-xs">Help</Text>
                    </Pressable>
                    <Pressable className="p-1">
                        <MoreVertical size={20} color="#64748b" />
                    </Pressable>
                </View>
            </View>

            <ScrollView className="flex-1 bg-[#F8F9FE]" showsVerticalScrollIndicator={false}>
                {/* 2. Status Stepper */}
                <View className="px-5 py-5 bg-white border-b border-slate-100">
                    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                        <View className="flex-row items-center pr-6">
                            {STEPS.map((step, i) => (
                                <React.Fragment key={i}>
                                    <View className="items-center min-w-[64px]">
                                        <View
                                            className={`w-9 h-9 rounded-full items-center justify-center mb-1.5 ${step.active
                                                    ? 'bg-primary shadow-md shadow-primary/30'
                                                    : step.completed
                                                        ? 'bg-primary'
                                                        : 'bg-slate-100 border border-slate-200'
                                                }`}
                                        >
                                            {step.completed ? (
                                                <Check size={16} color="white" />
                                            ) : (
                                                <ShoppingBag
                                                    size={16}
                                                    color={step.active ? 'white' : '#94a3b8'}
                                                />
                                            )}
                                        </View>
                                        <Text
                                            className={`text-[10px] font-bold text-center ${step.active || step.completed ? 'text-primary' : 'text-slate-500'
                                                }`}
                                        >
                                            {step.label}
                                        </Text>
                                        {step.time && (
                                            <Text
                                                className={`text-[9px] font-bold mt-0.5 ${step.active ? 'text-primary' : 'text-slate-400'
                                                    }`}
                                            >
                                                {step.time}
                                            </Text>
                                        )}
                                    </View>
                                    {i < STEPS.length - 1 && (
                                        <View
                                            className={`w-10 h-[1px] mx-1 border-dashed -mt-5 ${step.completed ? 'bg-primary' : 'bg-slate-200'
                                                }`}
                                        />
                                    )}
                                </React.Fragment>
                            ))}
                        </View>
                    </ScrollView>
                </View>

                {/* 3. Ready Banner */}
                <View className="mx-5 mt-4 bg-emerald-50/70 border border-emerald-200/80 p-3.5 rounded-2xl flex-row items-center justify-between shadow-sm">
                    <View className="flex-row items-center flex-1 mr-2">
                        <CheckCircle2 size={20} color="#10b981" />
                        <View className="ml-2.5 flex-1">
                            <Text className="text-slate-900 font-bold text-xs">
                                Order is ready for pickup
                            </Text>
                            <Text className="text-slate-500 text-[10px] mt-0.5">
                                Assign a rider or wait for auto-assignment.
                            </Text>
                        </View>
                    </View>
                    <View className="bg-white px-3 py-1.5 rounded-xl border border-emerald-200 items-center">
                        <Text className="text-slate-400 text-[8px] font-bold uppercase">Ready for</Text>
                        <Text className="text-emerald-600 font-extrabold text-xs">00:12:45</Text>
                    </View>
                </View>

            
                {/* 5. Logistics Grid 
                <View className="flex-row px-5 mt-4 justify-between gap-x-2">
                    <LogisticsCard icon={Bike} label="Delivery Type" value="Standard Delivery" color="text-primary" />
                    <LogisticsCard icon={Wallet} label="Payment Status" value="Paid" color="text-emerald-600" />
                    <LogisticsCard icon={CreditCard} label="Payment Method" value="Transfer" color="text-primary" />
                    <LogisticsCard icon={ShoppingBag} label="Order Type" value="Delivery" color="text-primary" />
                </View>
*/}
                {/* 6. Customer Note 
                <View className="mx-5 mt-3.5 bg-blue-50/70 border border-blue-100 p-3 rounded-2xl flex-row items-center">
                    <Info size={14} color="#4F26D9" />
                    <Text className="text-primary text-[10px] ml-2 font-medium flex-1">
                        <Text className="font-bold">Customer Note: </Text>Please leave at the gate. Thanks!
                    </Text>
                </View>
*/}
                {/* 7. Order Items Card */}
                <View className="mx-5 mt-4 bg-white border border-slate-100 rounded-[28px] p-4.5 shadow-sm">
                    <View className="flex-row justify-between items-center mb-3">
                        <View className="flex-row items-center">
                            <View className="w-8 h-8 bg-purple-100 rounded-xl items-center justify-center mr-2.5">
                                <ShoppingBag size={18} color="#4F26D9" />
                            </View>
                            <Text className="font-bold text-slate-900 text-sm">Order Items (3)</Text>
                        </View>
                        <Pressable>
                            <Text className="text-primary font-bold text-xs">See all items</Text>
                        </Pressable>
                    </View>

                    {ITEMS.map((item, idx) => (
                        <View key={idx} className="flex-row items-center py-3 border-b border-slate-100/60">
                            <View className={`w-14 h-14 ${item.bg} border ${item.border} rounded-2xl items-center justify-center mr-3 flex-shrink-0`}>
                                <Text className="text-3xl">{item.emoji}</Text>
                            </View>
                            <View className="flex-1 pr-2">
                                <Text className="font-bold text-slate-900 text-sm">{item.name}</Text>
                                <Text className="text-slate-400 text-xs mt-0.5">{item.desc}</Text>
                            </View>
                            <View className="items-end justify-between py-0.5 h-12">
                                <Text className="text-slate-400 text-xs font-medium">{item.qty}</Text>
                                <Text className="font-bold text-slate-900 text-sm">{item.price}</Text>
                            </View>
                        </View>
                    ))}

                    <Pressable className="flex-row items-center justify-center pt-3">
                        <Text className="text-slate-600 font-bold text-xs mr-1">View more items</Text>
                        <ChevronDown size={14} color="#64748b" />
                    </Pressable>
                </View>

                {/* 8. Next Action Card */}
                <View className="mx-5 mt-4 bg-purple-50/40 border border-purple-100 p-4 rounded-[28px] shadow-sm space-y-3">
                    <View className="flex-row justify-between items-center">
                        <Text className="font-bold text-slate-900 text-xs">Next Action</Text>
                        <View className="bg-purple-100 px-2.5 py-0.5 rounded-full">
                            <Text className="text-primary text-[10px] font-bold">Rider waiting</Text>
                        </View>
                    </View>
                    <Text className="text-slate-500 text-[11px]">Hand over the order to the rider</Text>

                    <View className="flex-row space-x-2.5 pt-1">
                        <Pressable className="flex-1 h-12 bg-white border border-primary rounded-2xl flex-row items-center justify-center active:bg-purple-50">
                            <ShoppingBag size={16} color="#4F26D9" />
                            <Text className="text-primary font-bold text-xs ml-1.5">Assign Rider</Text>
                        </Pressable>

                        <Pressable
                            onPress={() => router.push('/orders/confirmation')}
                            className="flex-1 h-12 bg-primary rounded-2xl flex-row items-center justify-center shadow-md shadow-primary/30 active:bg-primary/90"
                        >
                            <Bike size={18} color="white" />
                            <Text className="text-white font-bold text-xs ml-1.5">Handover to Rider</Text>
                        </Pressable>
                    </View>
                </View>

                {/* 9. Assigned Rider Card */}
                <View className="mx-5 mt-4 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm space-y-3">
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <User size={16} color="#4F26D9" />
                            <Text className="font-bold text-slate-900 text-xs ml-2">Assigned Rider</Text>
                        </View>
                        <View className="bg-emerald-100 px-2.5 py-0.5 rounded-full">
                            <Text className="text-emerald-700 text-[10px] font-bold">On the way</Text>
                        </View>
                    </View>

                    <View className="flex-row items-center justify-between pt-1">
                        <View className="flex-row items-center flex-1 mr-2">
                            <Image
                                source={{ uri: 'https://avatar.iran.liara.run/public/33' }}
                                className="w-14 h-14 rounded-full bg-slate-100 mr-3"
                            />
                            <View className="flex-1">
                                <View className="flex-row items-center">
                                    <Text className="font-bold text-slate-900 text-sm mr-1.5">Michael Daniel</Text>
                                    <View className="flex-row items-center">
                                        <Star size={12} color="#f59e0b" fill="#f59e0b" />
                                        <Text className="text-slate-900 font-bold text-[10px] ml-0.5">4.8</Text>
                                    </View>
                                </View>
                                <Text className="text-slate-500 text-[11px] mt-0.5">0908 123 4567</Text>
                                <Text className="text-slate-400 text-[10px]">BKJ 123 XY</Text>
                            </View>
                        </View>

                        <View className="items-end mr-2">
                            <Text className="text-slate-400 text-[8px] font-bold uppercase">Arriving in</Text>
                            <Text className="text-slate-900 font-extrabold text-base">05:30</Text>
                            <Text className="text-slate-400 text-[9px]">2.4 km away</Text>
                        </View>

                        <View className="flex-row space-x-1.5">
                            <Pressable className="w-8 h-8 bg-purple-50 rounded-full items-center justify-center border border-purple-100">
                                <Phone size={14} color="#4F26D9" />
                            </Pressable>
                            <Pressable className="w-8 h-8 bg-purple-50 rounded-full items-center justify-center border border-purple-100">
                                <MessageSquare size={14} color="#4F26D9" />
                            </Pressable>
                        </View>
                    </View>
                </View>

                {/* 10. Order Summary Card */}
                <View className="mx-5 mt-4 bg-white border border-slate-100 p-4.5 rounded-[28px] shadow-sm space-y-2.5">
                    <View className="flex-row items-center mb-1">
                        <ShoppingBag size={14} color="#4F26D9" />
                        <Text className="font-bold text-slate-900 text-xs ml-2">Order Summary</Text>
                    </View>

                    <View className="flex-row justify-between items-center">
                        <Text className="text-slate-500 text-xs font-medium">Subtotal</Text>
                        <Text className="font-bold text-slate-900 text-xs">₦20,200</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <Text className="text-slate-500 text-xs font-medium">Delivery Fee</Text>
                        <Text className="font-bold text-slate-900 text-xs">₦1,000</Text>
                    </View>
                    <View className="flex-row justify-between items-center">
                        <View className="flex-row items-center">
                            <Text className="text-slate-500 text-xs font-medium">Service Fee</Text>
                            <Info size={11} color="#94a3b8" className="ml-1" />
                        </View>
                        <Text className="font-bold text-slate-900 text-xs">₦500</Text>
                    </View>

                    <View className="flex-row justify-between items-center pt-3 border-t border-slate-100 mt-2">
                        <Text className="text-lg font-extrabold text-slate-900">Total</Text>
                        <Text className="text-xl font-extrabold text-slate-900">₦21,700</Text>
                    </View>
                </View>

                {/* 11. Bottom Action Buttons
                <View className="mx-5 mt-5 mb-10 flex-row space-x-2">
                    <Pressable className="flex-1 bg-white border border-slate-200 h-11 rounded-2xl flex-row items-center justify-center shadow-sm active:bg-slate-50">
                        <Printer size={14} color="#4F26D9" />
                        <Text className="text-slate-800 font-bold text-[11px] ml-1.5">Print Receipt</Text>
                    </Pressable>

                    <Pressable className="flex-1 bg-white border border-slate-200 h-11 rounded-2xl flex-row items-center justify-center shadow-sm active:bg-slate-50">
                        <MessageSquare size={14} color="#4F26D9" />
                        <Text className="text-slate-800 font-bold text-[11px] ml-1.5">Message Customer</Text>
                    </Pressable>

                    <Pressable className="flex-1 bg-white border border-slate-200 h-11 rounded-2xl flex-row items-center justify-center shadow-sm active:bg-slate-50">
                        <MoreVertical size={14} color="#64748b" />
                        <Text className="text-slate-800 font-bold text-[11px] ml-1.5">More Actions</Text>
                    </Pressable>
                </View>
 */}
                <View className="h-10" />
            </ScrollView>
        </SafeAreaView>
    );
}

// Helpers
function LogisticsCard({ icon: Icon, label, value, color = 'text-slate-900' }: any) {
    return (
        <View className="flex-1 bg-white border border-slate-100 p-2.5 rounded-2xl shadow-sm min-h-[72px] justify-between">
            <Icon size={16} color="#4F26D9" />
            <View>
                <Text className="text-slate-400 text-[8px] font-bold uppercase tracking-wider">{label}</Text>
                <Text className={`${color} text-[10px] font-bold mt-0.5`} numberOfLines={1}>
                    {value}
                </Text>
            </View>
        </View>
    );
}