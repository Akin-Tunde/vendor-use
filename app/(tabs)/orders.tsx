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
   Clock,
   CreditCard,
   Filter,
   PackageCheck,
   Search,
   ShoppingBag,
   Square,
   TrendingUp,
   X,
   Zap
} from 'lucide-react-native';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const TABS = [
   { id: 'all', label: 'All', count: 24, badgeBg: 'bg-purple-900', badgeText: 'text-white' },
   { id: 'new', label: 'New', count: 6, badgeBg: 'bg-red-100', badgeText: 'text-red-600' },
   { id: 'confirmed', label: 'Confirmed', count: 3, badgeBg: 'bg-amber-100', badgeText: 'text-amber-700' },
   { id: 'preparing', label: 'Preparing', count: 5, badgeBg: 'bg-blue-100', badgeText: 'text-blue-600' },
   { id: 'ready', label: 'Ready', count: 4, badgeBg: 'bg-emerald-100', badgeText: 'text-emerald-700' },
   { id: 'picked', label: 'Picked Up', count: 2, badgeBg: 'bg-cyan-100', badgeText: 'text-cyan-700' },
   { id: 'delivery', label: 'Out for Delivery', count: 7, badgeBg: 'bg-indigo-100', badgeText: 'text-indigo-700' },
   { id: 'delivered', label: 'Delivered', count: 18, badgeBg: 'bg-slate-200', badgeText: 'text-slate-700' },
];

const FILTER_CHIPS = [
   { id: 'all', label: 'All' },
   { id: 'pickup', label: 'Pickup', icon: ShoppingBag },
   { id: 'delivery', label: 'Delivery', icon: Bike },
   { id: 'express', label: 'Express', icon: Zap },
   { id: 'scheduled', label: 'Scheduled', icon: Clock },
   { id: 'cash', label: 'Cash', icon: CreditCard },
   { id: 'card', label: 'Card', icon: CreditCard },
];

const ORDERS = [
   {
      id: '#ORD-8921',
      customer: 'John Doe',
      phone: '0803 123 4567',
      time: 'Today, 09:31 AM',
      amount: '₦18,650',
      //  type: 'Express Delivery',
      typeIsExpress: true,
      // paymentStatus: 'Paid • Card',
      status: 'NEW',
      statusBg: 'bg-red-100',
      statusText: 'text-red-500',
      //   timer: 'Waiting 6 min',
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
      type: 'Standard Delivery',
      typeIsExpress: false,
      paymentStatus: 'Paid • Online',
      status: 'CONFIRMED',
      statusBg: 'bg-amber-100',
      statusText: 'text-amber-800',
      timer: 'Waiting 12 min',
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
      type: 'Express Delivery',
      typeIsExpress: true,
      paymentStatus: 'Paid • Card',
      status: 'PREPARING',
      statusBg: 'bg-blue-100',
      statusText: 'text-blue-700',
      timer: 'Preparing 8 min',
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
      type: 'Standard Delivery',
      typeIsExpress: false,
      paymentStatus: 'Paid • Cash',
      status: 'READY',
      statusBg: 'bg-emerald-100',
      statusText: 'text-emerald-700',
      timer: 'Ready 2 min',
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
      type: 'Standard Delivery',
      typeIsExpress: false,
      paymentStatus: 'Paid • Card',
      status: 'PICKED UP',
      statusBg: 'bg-cyan-100',
      statusText: 'text-cyan-700',
      timer: 'Picked up 7 min',
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
      type: 'Express Delivery',
      typeIsExpress: true,
      paymentStatus: 'Paid • Online',
      status: 'OUT FOR DELIVERY',
      statusBg: 'bg-indigo-100',
      statusText: 'text-indigo-700',
      timer: 'Out for delivery 12 min',
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
      type: 'Standard Delivery',
      typeIsExpress: false,
      paymentStatus: 'Paid • Card',
      status: 'DELIVERED',
      statusBg: 'bg-slate-200',
      statusText: 'text-slate-700',
      timer: 'Delivered 07:32 AM',
      timerColor: 'text-emerald-600',
      itemCount: '3 items',
      items: ['🍾', '🍞', '🧈'],
      itemExtraCount: null,
      actionType: 'badge_only',
      badgeLabel: 'Completed',
      badgeStyle: 'bg-emerald-50 text-emerald-700 font-bold border border-emerald-200',
      route: '/orders/delivered',
   },
];

export default function ManageOrdersScreen() {
   const router = useRouter();
   const [activeTab, setActiveTab] = useState('all');
   const [activeChip, setActiveChip] = useState('all');
   const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
   const [selectAll, setSelectAll] = useState(false);

   const toggleSelectOrder = (id: string) => {
      if (selectedOrders.includes(id)) {
         setSelectedOrders(selectedOrders.filter((item) => item !== id));
      } else {
         setSelectedOrders([...selectedOrders, id]);
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
         {/* 1. Header */}
         <View className="px-5 py-3.5 bg-white flex-row justify-between items-center border-b border-slate-100">
            <View className="flex-row items-center">

               <View className="ml-3">
                  <Text className="text-xl font-bold text-slate-900">Manage Orders</Text>
                  <Text className="text-slate-400 text-xs">View and manage customer orders</Text>
               </View>
            </View>
            <View className="flex-row items-center space-x-2.5">
               <Pressable className="w-9 h-9 bg-slate-50 border border-slate-200 rounded-xl items-center justify-center">
                  <Search size={18} color="#475569" />
               </Pressable>
               <Pressable className="flex-row items-center bg-slate-50 border border-slate-200 px-2.5 h-9 rounded-xl">
                  <Filter size={15} color="#475569" />
                  <Text className="text-xs font-bold text-slate-700 ml-1.5">Filter</Text>
               </Pressable>
               <Pressable className="relative w-9 h-9 bg-slate-50 border border-slate-200 rounded-xl items-center justify-center">
                  <Bell size={18} color="#475569" />
                  <View className="absolute -top-1 -right-1 bg-red-500 min-w-[16px] h-4 rounded-full px-1 items-center justify-center border-2 border-white">
                     <Text className="text-[9px] text-white font-extrabold">3</Text>
                  </View>
               </Pressable>
            </View>
         </View>

         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* 2. Top Status Tabs */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="bg-white py-3 px-5 border-b border-slate-100">
               <View className="flex-row space-x-2 pr-6">
                  {TABS.map((tab) => {
                     const isActive = activeTab === tab.id;
                     return (
                        <Pressable
                           key={tab.id}
                           onPress={() => setActiveTab(tab.id)}
                           className={`px-3.5 py-2 rounded-xl flex-row items-center ${isActive ? 'bg-primary' : 'bg-slate-50 border border-slate-100'
                              }`}
                        >
                           <Text className={`font-bold text-xs ${isActive ? 'text-white' : 'text-slate-700'}`}>
                              {tab.label}
                           </Text>
                           <View
                              className={`ml-1.5 px-1.5 py-0.5 rounded-full ${isActive ? 'bg-white/20' : tab.badgeBg
                                 }`}
                           >
                              <Text className={`text-[10px] font-bold ${isActive ? 'text-white' : tab.badgeText}`}>
                                 {tab.count}
                              </Text>
                           </View>
                        </Pressable>
                     );
                  })}
                  <Pressable className="px-3 py-2 rounded-xl flex-row items-center bg-slate-50 border border-slate-100">
                     <Text className="font-bold text-xs text-slate-700 mr-1">More</Text>
                     <ChevronDown size={14} color="#64748b" />
                  </Pressable>
               </View>
            </ScrollView>

            {/* 3. Summary Stats Grid (5 Cards Horizontal Scroll) */}
            <ScrollView horizontal showsHorizontalScrollIndicator={false} className="px-5 py-4">
               <View className="flex-row space-x-3 pr-6">
                  <SummaryCard
                     icon={ShoppingBag}
                     label="New Orders"
                     value="6"
                     sub="Needs action"
                     color="text-red-500"
                     bg="bg-red-50"
                     iconColor="#ef4444"
                  />
                  <SummaryCard
                     icon={ChefHat}
                     label="Preparing"
                     value="5"
                     sub="In progress"
                     color="text-primary"
                     bg="bg-primary/10"
                     iconColor="#4F26D9"
                  />
                  <SummaryCard
                     icon={PackageCheck}
                     label="Ready for Pickup"
                     value="4"
                     sub="Waiting rider"
                     color="text-emerald-600"
                     bg="bg-emerald-50"
                     iconColor="#10b981"
                  />
                  <SummaryCard
                     icon={Bike}
                     label="Out for Delivery"
                     value="7"
                     sub="On the way"
                     color="text-indigo-600"
                     bg="bg-indigo-50"
                     iconColor="#6366f1"
                  />
                  <SummaryCard
                     icon={TrendingUp}
                     label="Today's Revenue"
                     value="₦245,800"
                     sub="+12.5% vs yesterday"
                     color="text-emerald-600"
                     bg="bg-amber-50"
                     iconColor="#f59e0b"
                  />
               </View>
            </ScrollView>


            {/* 6. Sorting & Bulk Actions Bar */}
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

               <View className="flex-row items-center space-x-3">
                  <Pressable onPress={toggleSelectAll} className="flex-row items-center">
                     {selectAll ? (
                        <CheckSquare size={18} color="#4F26D9" />
                     ) : (
                        <Square size={18} color="#94a3b8" />
                     )}
                     <Text className="text-xs font-bold text-slate-700 ml-1.5">Select All</Text>
                  </Pressable>

                  <Pressable className="flex-row items-center bg-white border border-slate-200 px-3 py-1.5 rounded-xl shadow-sm">
                     <Text className="text-xs font-bold text-primary mr-1">Bulk Actions</Text>
                     <ChevronDown size={14} color="#4F26D9" />
                  </Pressable>
               </View>
            </View>

            {/* 7. Orders Detailed Cards List */}
            <View className="px-5 py-4 space-y-3.5">
               {ORDERS.map((order) => {
                  const isSelected = selectedOrders.includes(order.id);
                  return (
                     <View
                        key={order.id}
                        className="bg-white border border-slate-100 rounded-[28px] p-4 shadow-sm"
                     >
                        {/* Top ID & Status Header */}
                        <View className="flex-row justify-between items-center">
                           <View className="flex-row items-center flex-1 pr-2">
                              <Pressable onPress={() => toggleSelectOrder(order.id)} className="mr-2.5">
                                 {isSelected ? (
                                    <CheckSquare size={18} color="#4F26D9" />
                                 ) : (
                                    <Square size={18} color="#cbd5e1" />
                                 )}
                              </Pressable>

                              <View className={`px-2 py-0.5 rounded-md mr-2 ${order.statusBg}`}>
                                 <Text className={`text-[9px] font-extrabold ${order.statusText}`}>
                                    {order.status}
                                 </Text>
                              </View>

                              <Text className="font-bold text-slate-900 text-sm">{order.id}</Text>
                           </View>

                           <Pressable
                              onPress={() => router.push(order.route as any)}
                              className="flex-row items-center"
                           >
                              <Text className="font-extrabold text-slate-900 text-base mr-1">{order.amount}</Text>
                              <ChevronRight size={18} color="#cbd5e1" />
                           </Pressable>
                        </View>

                        {/* Middle Info & Tag Badges */}
                        <View className="flex-row mt-3 items-start justify-between">
                           {/* Customer Info */}
                           <View className="flex-1 pr-2">
                              <Text className="text-slate-900 font-bold text-xs">{order.customer}</Text>
                              <Text className="text-slate-400 text-[11px] mt-0.5">{order.phone}</Text>
                              <Text className="text-slate-400 text-[10px] mt-0.5">{order.time}</Text>
                           </View>

                           {/* Items Preview */}
                           <View className="items-end">
                              <Text className="text-[10px] text-slate-400 font-bold mb-1">{order.itemCount}</Text>
                              <View className="flex-row items-center space-x-1">
                                 {order.items.map((emoji, idx) => (
                                    <View
                                       key={idx}
                                       className="w-8 h-8 bg-slate-50 border border-slate-100 rounded-lg items-center justify-center"
                                    >
                                       <Text className="text-sm">{emoji}</Text>
                                    </View>
                                 ))}
                                 {order.itemExtraCount && (
                                    <View className="bg-slate-100 px-1.5 py-1 rounded-md">
                                       <Text className="text-[9px] font-bold text-slate-600">
                                          {order.itemExtraCount}
                                       </Text>
                                    </View>
                                 )}
                              </View>
                           </View>
                        </View>

                        {/* Bottom Actions Row */}
                        <View className="mt-3.5 pt-3 border-t border-slate-50 flex-row justify-end items-center">
                           {order.actionType === 'accept_reject' && (
                              <View className="flex-row space-x-2 flex-1 justify-end">
                                 <Pressable
                                    onPress={() => router.push('/orders/1')}
                                    className="bg-red-500 px-5 h-10 rounded-xl flex-row items-center justify-center shadow-sm active:bg-red-600"
                                 >
                                    <Check size={16} color="white" />
                                    <Text className="text-white font-bold text-xs ml-1">Accept</Text>
                                 </Pressable>
                                 <Pressable className="bg-white border border-slate-200 px-4 h-10 rounded-xl flex-row items-center justify-center">
                                    <X size={16} color="#64748b" />
                                    <Text className="text-slate-700 font-bold text-xs ml-1">Reject</Text>
                                 </Pressable>
                              </View>
                           )}

                           {order.actionType === 'start_preparing' && (
                              <Pressable
                                 onPress={() => router.push('/orders/preparing')}
                                 className="bg-purple-50 border border-primary/20 px-4 h-10 rounded-xl flex-row items-center justify-center active:bg-purple-100"
                              >
                                 <ChefHat size={16} color="#4F26D9" />
                                 <Text className="text-primary font-bold text-xs ml-1.5">{order.actionLabel}</Text>
                              </Pressable>
                           )}

                           {order.actionType === 'mark_ready' && (
                              <Pressable
                                 onPress={() => router.push('/orders/ready')}
                                 className="bg-purple-50 border border-primary/20 px-4 h-10 rounded-xl flex-row items-center justify-center active:bg-purple-100"
                              >
                                 <ShoppingBag size={16} color="#4F26D9" />
                                 <Text className="text-primary font-bold text-xs ml-1.5">{order.actionLabel}</Text>
                              </Pressable>
                           )}

                           {order.actionType === 'handover_rider' && (
                              <Pressable
                                 onPress={() => router.push('/orders/confirmation')}
                                 className="bg-purple-50 border border-primary/20 px-4 h-10 rounded-xl flex-row items-center justify-center active:bg-purple-100"
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
                     </View>
                  );
               })}
            </View>

            {/* 8. Pagination Section */}
            <View className="px-5 py-6 flex-row justify-between items-center">
               <Text className="text-slate-400 text-xs font-medium">Showing 1 to 7 of 24 orders</Text>
               <View className="flex-row items-center space-x-1.5">
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

            <View className="h-28" />
         </ScrollView>


      </SafeAreaView>
   );
}

// Subcomponents
function SummaryCard({ icon: Icon, label, value, sub, color, bg, iconColor }: any) {
   return (
      <View className="w-36 bg-white border border-slate-100 p-3.5 rounded-[22px] shadow-sm">
         <View className={`w-8 h-8 ${bg} rounded-xl items-center justify-center mb-2.5`}>
            <Icon size={18} color={iconColor} />
         </View>
         <Text className="text-slate-400 text-[9px] font-bold uppercase tracking-wider">{label}</Text>
         <Text className="text-xl font-bold text-slate-900 mt-0.5">{value}</Text>
         <Text className={`${color} text-[9px] font-bold mt-0.5`}>{sub}</Text>
      </View>
   );
}

