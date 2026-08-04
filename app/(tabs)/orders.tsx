import { useRouter } from 'expo-router';
import {
   ArrowUpDown,
   Bell,
   Bike,
   Check,
   CheckSquare,
   ChefHat,
   ChevronDown,
   ChevronLeft,
   ChevronRight,

   Search,
   ShoppingBag,
   Square,
   X,
   Zap,
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// ----------------------------------------------------------------------
// Types & Interfaces
// ----------------------------------------------------------------------

type OrderStatus = 'NEW' | 'CONFIRMED' | 'PREPARING' | 'READY' | 'PICKED UP' | 'OUT FOR DELIVERY' | 'DELIVERED';

type ActionType = 'accept_reject' | 'start_preparing' | 'mark_ready' | 'handover_rider' | 'badge_only';

interface OrderItem {
   id: string;
   customer: string;
   phone: string;
   time: string;
   amount: string;
   typeIsExpress: boolean;
   status: OrderStatus;
   statusBg: string;
   statusText: string;
   timerColor: string;
   itemCount: string;
   items: string[];
   itemExtraCount: string | null;
   actionType: ActionType;
   actionLabel?: string;
   badgeLabel?: string;
   badgeStyle?: string;
   route: string;
}

interface StatusTab {
   id: string;
   label: string;
   count: number;
   badgeBg: string;
   badgeText: string;
}

// ----------------------------------------------------------------------
// Constants & Mock Data
// ----------------------------------------------------------------------

const STATUS_TABS: StatusTab[] = [
   { id: 'all', label: 'All', count: 24, badgeBg: 'bg-purple-900', badgeText: 'text-white' },
   { id: 'new', label: 'New', count: 6, badgeBg: 'bg-red-100', badgeText: 'text-red-600' },
   { id: 'confirmed', label: 'Confirmed', count: 3, badgeBg: 'bg-amber-100', badgeText: 'text-amber-700' },
   { id: 'preparing', label: 'Preparing', count: 5, badgeBg: 'bg-blue-100', badgeText: 'text-blue-600' },
   { id: 'ready', label: 'Ready', count: 4, badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700' },
   { id: 'picked', label: 'Picked Up', count: 2, badgeBg: 'bg-cyan-100', badgeText: 'text-cyan-700' },
   { id: 'delivery', label: 'Out for Delivery', count: 7, badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700' },
   { id: 'delivered', label: 'Delivered', count: 18, badgeBg: 'bg-slate-200', badgeText: 'text-slate-700' },
];

const ORDERS: OrderItem[] = [
   {
      id: '#ORD-8921',
      customer: 'John Doe',
      phone: '0803 123 4567',
      time: 'Today, 09:31 AM',
      amount: '₦18,650',
      typeIsExpress: true,
      status: 'NEW',
      statusBg: 'bg-red-100',
      statusText: 'text-red-600',
      timerColor: 'text-red-500',
      itemCount: '2 items',
      items: ['🍌', '🍎'],
      itemExtraCount: '+1',
      actionType: 'accept_reject',
      route: '/orders/1',
   },
   {
      id: '#ORD-8920',
      customer: 'Mary Johnson',
      phone: '0807 654 3210',
      time: 'Today, 09:15 AM',
      amount: '₦32,800',
      typeIsExpress: false,
      status: 'CONFIRMED',
      statusBg: 'bg-amber-100',
      statusText: 'text-amber-800',
      timerColor: 'text-amber-600',
      itemCount: '4 items',
      items: ['🧃', '🌾', '🛢️'],
      itemExtraCount: '+1',
      actionType: 'start_preparing',
      actionLabel: 'Start Preparing',
      route: '/orders/preparing',
   },
   {
      id: '#ORD-8919',
      customer: 'Alex Brown',
      phone: '0812 345 6789',
      time: 'Today, 08:45 AM',
      amount: '₦22,500',
      typeIsExpress: true,
      status: 'PREPARING',
      statusBg: 'bg-blue-100',
      statusText: 'text-blue-700',
      timerColor: 'text-amber-600',
      itemCount: '3 items',
      items: ['🍊', '🍞', '🥛'],
      itemExtraCount: null,
      actionType: 'mark_ready',
      actionLabel: 'Mark Ready',
      route: '/orders/ready',
   },
   {
      id: '#ORD-8918',
      customer: 'Chioma Okafor',
      phone: '0909 876 5432',
      time: 'Today, 08:20 AM',
      amount: '₦41,200',
      typeIsExpress: false,
      status: 'READY',
      statusBg: 'bg-emerald-100',
      statusText: 'text-emerald-700',
      timerColor: 'text-emerald-600',
      itemCount: '5 items',
      items: ['🍌', '🥩', '🥬'],
      itemExtraCount: '+2',
      actionType: 'handover_rider',
      actionLabel: 'Handover to Rider',
      route: '/orders/confirmation',
   },
   {
      id: '#ORD-8917',
      customer: 'David Williams',
      phone: '0806 222 3333',
      time: 'Today, 08:05 AM',
      amount: '₦28,750',
      typeIsExpress: false,
      status: 'PICKED UP',
      statusBg: 'bg-cyan-100',
      statusText: 'text-cyan-700',
      timerColor: 'text-blue-600',
      itemCount: '6 items',
      items: ['🍾', '🍟', '🥚'],
      itemExtraCount: '+3',
      actionType: 'badge_only',
      badgeLabel: '• Rider is on the way',
      badgeStyle: 'bg-blue-50 text-blue-600 border border-blue-200',
      route: '/orders/tracking',
   },
   {
      id: '#ORD-8916',
      customer: 'Fatima Yusuf',
      phone: '0908 111 2222',
      time: 'Today, 07:50 AM',
      amount: '₦12,300',
      typeIsExpress: true,
      status: 'OUT FOR DELIVERY',
      statusBg: 'bg-indigo-100',
      statusText: 'text-indigo-700',
      timerColor: 'text-blue-600',
      itemCount: '2 items',
      items: ['🍇', '🥣'],
      itemExtraCount: null,
      actionType: 'badge_only',
      badgeLabel: '• Est. delivery 10:15 AM',
      badgeStyle: 'bg-blue-50 text-blue-600 border border-blue-200',
      route: '/orders/delivery',
   },
   {
      id: '#ORD-8915',
      customer: 'Bola Ahmed',
      phone: '0803 999 8888',
      time: 'Today, 07:15 AM',
      amount: '₦15,600',
      typeIsExpress: false,
      status: 'DELIVERED',
      statusBg: 'bg-slate-200',
      statusText: 'text-slate-700',
      timerColor: 'text-emerald-600',
      itemCount: '3 items',
      items: ['🍾', '🍞', '🧈'],
      itemExtraCount: null,
      actionType: 'badge_only',
      badgeLabel: '✓ Completed',
      badgeStyle: 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200',
      route: '/orders/delivered',
   },
];

// ----------------------------------------------------------------------
// Main Screen Component
// ----------------------------------------------------------------------

export default function ManageOrdersScreen() {
   const router = useRouter();
   const [activeTab, setActiveTab] = useState('all');
   const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
   const [selectAll, setSelectAll] = useState(false);

   const toggleSelectOrder = (id: string) => {
      if (selectedOrders.includes(id)) {
         setSelectedOrders((prev) => prev.filter((item) => item !== id));
      } else {
         setSelectedOrders((prev) => [...prev, id]);
      }
   };

   const toggleSelectAll = () => {
      if (selectAll) {
         setSelectedOrders([]);
         setSelectAll(false);
      } else {
         setSelectedOrders(ORDERS.map((o) => o.id));
         setSelectAll(true);
      }
   };

   return (
      <SafeAreaView className="flex-1 bg-[#F8F9FE]">
         {/* 1. Header Bar */}
         <View className="px-5 py-3.5 bg-white flex-row justify-between items-center border-b border-slate-100">
            <View className="flex-row items-center">
               <View className="ml-1">
                  <Text className="text-xl font-bold text-slate-900">Manage Orders</Text>
                  <Text className="text-slate-400 text-xs">View and manage customer orders</Text>
               </View>
            </View>

            <View className="flex-row items-center gap-x-2.5">
               <Pressable className="w-9 h-9 bg-slate-50 border border-slate-200 rounded-xl items-center justify-center active:bg-slate-100">
                  <Search size={18} color="#475569" />
               </Pressable>


               <Pressable className="relative w-9 h-9 bg-slate-50 border border-slate-200 rounded-xl items-center justify-center active:bg-slate-100">
                  <Bell size={18} color="#475569" />
                  <View className="absolute -top-1 -right-1 bg-red-500 min-w-[16px] h-4 rounded-full px-1 items-center justify-center border-2 border-white">
                     <Text className="text-[9px] text-white font-extrabold">3</Text>
                  </View>
               </Pressable>
            </View>
         </View>

         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* 2. Top Status Filter Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white py-3 px-5 border-b border-slate-100">
               <View className="flex-row gap-x-2 pr-6">
                  {STATUS_TABS.map((tab) => (
                     <Pressable
                        key={tab.id}
                        onPress={() => setActiveTab(tab.id)}
                        className={`px-3.5 py-2 rounded-xl flex-row items-center ${activeTab === tab.id ? 'bg-primary' : 'bg-slate-50 border border-slate-100'
                           }`}
                     >
                        <Text className={`font-bold text-xs ${activeTab === tab.id ? 'text-white' : 'text-slate-700'}`}>
                           {tab.label}
                        </Text>
                        <View className={`ml-1.5 px-1.5 py-0.5 rounded-full ${activeTab === tab.id ? 'bg-white/20' : tab.badgeBg}`}>
                           <Text className={`text-[10px] font-bold ${activeTab === tab.id ? 'text-white' : tab.badgeText}`}>
                              {tab.count}
                           </Text>
                        </View>
                     </Pressable>
                  ))}
               </View>
            </ScrollView>

            {/* 3. Sorting & Bulk Actions Bar */}
            <View className="px-5 mt-4 flex-row justify-between items-center">
               <View className="flex-row items-center">
                  <Text className="text-xs text-slate-500 font-medium mr-1.5">Sort by:</Text>
                  <Pressable className="flex-row items-center bg-white border border-slate-200 px-2.5 py-1.5 rounded-xl shadow-sm">
                     <Text className="text-xs font-bold text-slate-900 mr-1">Newest</Text>
                     <ChevronDown size={14} color="#64748b" />
                  </Pressable>
                  <Pressable className="ml-2 p-1.5 bg-white border border-slate-200 rounded-xl shadow-sm">
                     <ArrowUpDown size={14} color="#64748b" />
                  </Pressable>
               </View>


            </View>

            {/* 4. Orders List */}
            <View className="px-5 pt-4 gap-y-3.5">
               {ORDERS.map((order) => (
                  <OrderCard
                     key={order.id}
                     order={order}
                     isSelected={selectedOrders.includes(order.id)}
                     onToggleSelect={() => toggleSelectOrder(order.id)}
                     onPressCard={() => router.push(order.route as any)}
                  />
               ))}
            </View>

            {/* 5. Pagination */}
            <PaginationBar />
         </ScrollView>
      </SafeAreaView>
   );
}

// ----------------------------------------------------------------------
// Improved Order Card Component
// ----------------------------------------------------------------------

interface OrderCardProps {
   order: OrderItem;
   isSelected: boolean;
   onToggleSelect: () => void;
   onPressCard: () => void;
}

function OrderCard({ order, isSelected, onToggleSelect, onPressCard }: OrderCardProps) {
   const router = useRouter();
   const hasSingleAction = order.actionType === 'start_preparing' || order.actionType === 'mark_ready' || order.actionType === 'handover_rider';

   return (
      <Pressable
         onPress={onPressCard}
         className="bg-white border border-slate-100 rounded-[24px] p-4 shadow-sm active:bg-slate-50/50"
      >
         {/* Top Header Row: Selection + Order ID + Time  ·  Amount */}
         <View className="flex-row justify-between items-center">
            <View className="flex-row items-center flex-1 pr-2">
               <Pressable onPress={onToggleSelect} hitSlop={8} className="mr-2.5">
                  {isSelected ? <CheckSquare size={18} color="#4F26D9" /> : <Square size={18} color="#cbd5e1" />}
               </Pressable>

               <Text className="font-extrabold text-slate-900 text-sm">{order.id}</Text>
               <Text className="text-slate-300 text-xs mx-1.5">·</Text>
               <Text className="text-slate-400 text-xs font-medium" numberOfLines={1}>{order.time}</Text>
            </View>

            <Text className="font-extrabold text-slate-900 text-lg">{order.amount}</Text>
         </View>

         {/* Metadata Row: Status + Delivery Type */}
         <View className="flex-row items-center mt-2 pb-3 border-b border-slate-50">
            <View className={`px-2.5 py-1 rounded-full mr-1.5 ${order.statusBg}`}>
               <Text className={`text-[10px] font-extrabold ${order.statusText}`}>
                  {order.status}
               </Text>
            </View>

            {order.typeIsExpress ? (
               <View className="bg-amber-50 border border-amber-200/80 px-2 py-0.5 rounded-full flex-row items-center">
                  <Zap size={10} color="#f59e0b" fill="#f59e0b" />
                  <Text className="text-[9px] font-extrabold text-amber-700 ml-0.5">Express</Text>
               </View>
            ) : (
               <View className="bg-slate-100 px-2 py-0.5 rounded-full flex-row items-center">
                  <Bike size={10} color="#64748b" />
                  <Text className="text-[9px] font-extrabold text-slate-600 ml-1">Standard</Text>
               </View>
            )}
         </View>

         {/* Middle Body Row: Items Preview */}
         <View className="flex-row mt-3 items-center justify-between">
            <View className="flex-row items-center gap-x-1.5">
               {order.items.map((emoji, idx) => (
                  <View
                     key={idx}
                     className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg items-center justify-center"
                  >
                     <Text className="text-sm">{emoji}</Text>
                  </View>
               ))}
               {order.itemExtraCount && (
                  <View className="bg-slate-100 px-1.5 py-1 rounded-lg">
                     <Text className="text-[9px] font-extrabold text-slate-600">{order.itemExtraCount}</Text>
                  </View>
               )}
            </View>

            <Text className="text-[10px] text-slate-400 font-bold">{order.itemCount}</Text>
         </View>

         {/* Bottom Action Footer */}
         <View className={`mt-3.5 pt-3 border-t border-slate-50 flex-row items-center ${hasSingleAction ? 'justify-between' : 'justify-end'}`}>
            {hasSingleAction && (
               <Text className="text-slate-400 text-[10px] font-medium">Ordered {order.time}</Text>
            )}

            {order.actionType === 'accept_reject' && (
               <View className="flex-row gap-x-2.5 flex-1 justify-end">
                  <Pressable
                     onPress={(e) => {
                        e.stopPropagation();
                        router.push('/orders/1');
                     }}
                     className="flex-1 bg-primary h-11 rounded-xl flex-row items-center justify-center shadow-md shadow-primary/20 active:bg-primary/90"
                  >
                     <Check size={16} color="white" strokeWidth={3} />
                     <Text className="text-white font-bold text-xs ml-1.5">Accept Order</Text>
                  </Pressable>

                  <Pressable
                     onPress={(e) => e.stopPropagation()}
                     className="bg-red-50 border border-red-200/80 px-4 h-11 rounded-xl flex-row items-center justify-center active:bg-red-100"
                  >
                     <X size={16} color="#ef4444" />
                     <Text className="text-red-600 font-bold text-xs ml-1">Reject</Text>
                  </Pressable>
               </View>
            )}

            {order.actionType === 'start_preparing' && (
               <Pressable
                  onPress={(e) => {
                     e.stopPropagation();
                     router.push('/orders/preparing');
                  }}
                  className="bg-purple-50 border border-primary/30 px-4 h-10 rounded-xl flex-row items-center justify-center active:bg-purple-100"
               >
                  <ChefHat size={16} color="#4F26D9" />
                  <Text className="text-primary font-bold text-xs ml-1.5">{order.actionLabel}</Text>
               </Pressable>
            )}

            {order.actionType === 'mark_ready' && (
               <Pressable
                  onPress={(e) => {
                     e.stopPropagation();
                     router.push('/orders/ready');
                  }}
                  className="bg-purple-50 border border-primary/30 px-4 h-10 rounded-xl flex-row items-center justify-center active:bg-purple-100"
               >
                  <ShoppingBag size={16} color="#4F26D9" />
                  <Text className="text-primary font-bold text-xs ml-1.5">{order.actionLabel}</Text>
               </Pressable>
            )}

            {order.actionType === 'handover_rider' && (
               <Pressable
                  onPress={(e) => {
                     e.stopPropagation();
                     router.push('/orders/confirmation');
                  }}
                  className="bg-purple-50 border border-primary/30 px-4 h-10 rounded-xl flex-row items-center justify-center active:bg-purple-100"
               >
                  <Bike size={16} color="#4F26D9" />
                  <Text className="text-primary font-bold text-xs ml-1.5">{order.actionLabel}</Text>
               </Pressable>
            )}

            {order.actionType === 'badge_only' && (
               <View className={`px-3 py-1.5 rounded-full ${order.badgeStyle}`}>
                  <Text className="text-xs font-bold">{order.badgeLabel}</Text>
               </View>
            )}
         </View>
      </Pressable>
   );
}

// Pagination Controls
function PaginationBar() {
   return (
      <View className="px-5 pt-4 pb-6 items-center">
         <Text className="text-slate-400 text-xs font-medium mb-3">Showing 1 to 7 of 24 orders</Text>
         <View className="flex-row items-center gap-x-1.5">
            <Pressable className="w-8 h-8 rounded-xl bg-slate-100 items-center justify-center border border-slate-200">
               <ChevronLeft size={16} color="#94a3b8" />
            </Pressable>
            <Pressable className="w-8 h-8 rounded-xl bg-primary items-center justify-center shadow-sm">
               <Text className="text-white font-bold text-xs">1</Text>
            </Pressable>
            <Pressable className="w-8 h-8 rounded-xl bg-white border border-slate-200 items-center justify-center">
               <Text className="text-slate-700 font-bold text-xs">2</Text>
            </Pressable>
            <Pressable className="w-8 h-8 rounded-xl bg-white border border-slate-200 items-center justify-center">
               <Text className="text-slate-700 font-bold text-xs">3</Text>
            </Pressable>
            <Text className="text-slate-400 font-bold text-xs px-0.5">...</Text>
            <Pressable className="w-8 h-8 rounded-xl bg-white border border-slate-200 items-center justify-center">
               <Text className="text-slate-700 font-bold text-xs">4</Text>
            </Pressable>
            <Pressable className="w-8 h-8 rounded-xl bg-white border border-slate-200 items-center justify-center">
               <ChevronRight size={16} color="#475569" />
            </Pressable>
         </View>
      </View>
   );
}