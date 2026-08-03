import { useRouter } from 'expo-router';
import {
    ArrowLeft,
    BarChart2,
    Bell,
    HelpCircle,
    Megaphone,
    MessageSquare,
    Tag
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NotificationsPreferencesScreen() {
    const router = useRouter();

    const [newOrder, setNewOrder] = useState(true);
    const [orderUpdates, setOrderUpdates] = useState(true);
    const [orderCancellations, setOrderCancellations] = useState(true);
    const [promotions, setPromotions] = useState(true);
    const [marketingTips, setMarketingTips] = useState(false);
    const [storePerf, setStorePerf] = useState(true);
    const [messages, setMessages] = useState(true);
    const [systemUpdates, setSystemUpdates] = useState(true);

    return (
        <SafeAreaView className="flex-1 bg-[#F8F9FE]">
            {/* Top Header */}
            <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
                <Pressable
                    onPress={() => router.back()}
                    className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50"
                >
                    <ArrowLeft size={20} color="#000" />
                </Pressable>

                <Text className="text-xl font-bold text-slate-900">Notifications</Text>

                <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
                    <HelpCircle size={18} color="#64748b" />
                </Pressable>
            </View>

            <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
                {/* Banner */}
             

                {/* Section 1: Order Notifications */}
                <View className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
                    <Text className="font-bold text-slate-900 text-sm mb-1">Order Notifications</Text>
                    <ToggleRow icon={Bell} label="New Order" sub="Get notified when a new order is placed" value={newOrder} onToggle={setNewOrder} bg="bg-green-100" iconColor="#22c55e" />
                    <ToggleRow icon={Bell} label="Order Updates" sub="Get notified for order status changes" value={orderUpdates} onToggle={setOrderUpdates} bg="bg-orange-100" iconColor="#f97316" />
                    <ToggleRow icon={Bell} label="Order Cancellations" sub="Get notified when an order is cancelled" value={orderCancellations} onToggle={setOrderCancellations} bg="bg-blue-100" iconColor="#3b82f6" />
                </View>

                {/* Section 2: Store Notifications */}
                <View className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3">
                    <Text className="font-bold text-slate-900 text-sm mb-1">Store Notifications</Text>
                    <ToggleRow icon={Megaphone} label="Promotions & Offers" sub="Get notified about promotions and offers" value={promotions} onToggle={setPromotions} bg="bg-purple-100" iconColor="#4F26D9" />
                    <ToggleRow icon={Tag} label="Marketing Tips" sub="Receive tips to grow your business" value={marketingTips} onToggle={setMarketingTips} bg="bg-pink-100" iconColor="#ec4899" />
                    <ToggleRow icon={BarChart2} label="Store Performance" sub="Get alerts about your store performance" value={storePerf} onToggle={setStorePerf} bg="bg-amber-100" iconColor="#f59e0b" />
                </View>

                {/* Section 3: General */}
                <View className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm space-y-3 mb-6">
                    <Text className="font-bold text-slate-900 text-sm mb-1">General</Text>
                    <ToggleRow icon={MessageSquare} label="Messages" sub="Get notified for new messages" value={messages} onToggle={setMessages} bg="bg-teal-100" iconColor="#14b8a6" />
                    <ToggleRow icon={Bell} label="System Updates" sub="Important updates and announcements" value={systemUpdates} onToggle={setSystemUpdates} bg="bg-blue-100" iconColor="#3b82f6" />
                </View>

                {/* Save Button */}
                <View className="px-6 mb-12">
                    <Pressable className="bg-primary h-14 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90">
                        <Text className="text-white font-bold text-base">Save Preferences</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

function ToggleRow({ icon: Icon, label, sub, value, onToggle, bg, iconColor }: any) {
    return (
        <View className="flex-row items-center justify-between py-2 border-b border-slate-50">
            <View className="flex-row items-center flex-1 mr-2">
                <View className={`w-10 h-10 ${bg} rounded-2xl items-center justify-center mr-3`}>
                    <Icon size={18} color={iconColor} />
                </View>
                <View className="flex-1">
                    <Text className="font-bold text-slate-900 text-xs">{label}</Text>
                    <Text className="text-slate-400 text-[10px] mt-0.5">{sub}</Text>
                </View>
            </View>
            <Switch value={value} onValueChange={onToggle} trackColor={{ false: '#e2e8f0', true: '#4F26D9' }} />
        </View>
    );
}