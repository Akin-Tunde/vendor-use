import { useRouter } from 'expo-router';
import {
   Bell,
   ChevronRight,
   Eye,
   Percent,
   ReceiptText,
   ShoppingBag,
   Tag,
   TrendingUp,
   Users,
   Wallet
} from 'lucide-react-native';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Dashboard() {
   const router = useRouter();

   return (
      <SafeAreaView className="flex-1 bg-[#F8F9FE]">
         {/* Top Header */}
         <View className="px-6 pt-4 pb-3 bg-white flex-row justify-between items-center border-b border-slate-50">
            <View className="flex-row items-center">
               <View className="ml-2">
                  <View className="flex-row items-center">
                     <Text className="text-xl font-bold text-primary">useMarket</Text>
                     <View className="bg-primary/10 px-2 py-0.5 rounded ml-2">
                        <Text className="text-[10px] font-bold text-primary">Vendor</Text>
                     </View>
                  </View>
               </View>
            </View>

            <View className="flex-row items-center">
               <Pressable
                  onPress={() => router.push('/settings/notifications' as any)}
                  className="relative mr-4 p-1 active:opacity-70"
               >
                  <Bell size={24} color="#4F26D9" />
                  <View className="absolute -top-1 -right-1 bg-red-500 w-4 h-4 rounded-full border-2 border-white items-center justify-center">
                     <Text className="text-[8px] text-white font-bold">3</Text>
                  </View>
               </Pressable>

               <Pressable
                  onPress={() => router.push('/(tabs)/profile')}
                  className="w-10 h-10 rounded-full bg-slate-200 overflow-hidden border-2 border-green-500 active:opacity-80"
               >
                  <Image source={{ uri: 'https://avatar.iran.liara.run/public/31' }} className="w-full h-full" />
               </Pressable>
            </View>
         </View>

         <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
            {/* Overview Section Card */}
            <View className="mx-3 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm">
               <View className="flex-row justify-between items-center mb-4">
                  <Text className="text-base font-bold text-slate-900">Overview</Text>
                  <Pressable className="flex-row items-center bg-slate-50 px-3 py-1.5 rounded-2xl border border-slate-100">
                     <Image
                        source={require('../../assets/icons/calendar.png')}
                        className="w-3.5 h-3.5 mr-1.5"
                        resizeMode="contain"
                     />
                     <Text className="text-xs font-bold text-slate-700 mr-1">Today</Text>
                     <ChevronRight size={14} color="#94a3b8" className="rotate-90" />
                  </Pressable>
               </View>

               <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                  <StatCard
                     title="Total Orders"
                     value="24"
                     trend="+ 20%"
                     image={require('../../assets/icons/add product.png')}
                     icon={ShoppingBag}
                     iconBg="bg-purple-100"
                     iconColor="#4F26D9"
                     onPress={() => router.push('/orders')}
                  />
                  <StatCard
                     title="Total Sales"
                     value="₦158,450"
                     trend="+ 18%"
                     image={require('../../assets/icons/performance.png')}
                     icon={Wallet}
                     iconBg="bg-green-100"
                     iconColor="#22c55e"
                     onPress={() => router.push('/analytics/sales')}
                  />
                  <StatCard
                     title="New Customers"
                     value="12"
                     trend="+ 9%"
                     image={require('../../assets/icons/customers.png')}
                     icon={Users}
                     iconBg="bg-orange-100"
                     iconColor="#f59e0b"
                     onPress={() => router.push('/analytics/customers')}
                  />
                  <StatCard
                     title="Store Views"
                     value="342"
                     trend="+ 15%"
                     image={require('../../assets/icons/store_profile.png')}
                     icon={Eye}
                     iconBg="bg-blue-100"
                     iconColor="#3b82f6"
                     onPress={() => router.push('/(tabs)/analytics')}
                  />
               </ScrollView>

               <Pressable
                  onPress={() => router.push('/(tabs)/analytics')}
                  className="flex-row items-center justify-between border-t border-slate-50 mt-4 pt-3 active:bg-slate-50/50 rounded-xl px-1"
               >
                  <View className="flex-row items-center">
                     <TrendingUp size={14} color="#4F26D9" className="mr-2" />
                     <Text className="text-primary font-bold text-xs">View Analytics</Text>
                  </View>
                  <ChevronRight size={16} color="#4F26D9" />
               </Pressable>
            </View>

            {/* Quick Actions */}
            <View className="mx-6 mt-6">
               <Text className="text-base font-bold text-slate-900 mb-3">Quick Actions</Text>
               <View className="flex-row justify-between">
                  <ActionItem
                     label="Add Product"
                     image={require('../../assets/icons/add product.png')}
                     icon={ShoppingBag}
                     onPress={() => router.push('/products/add')}
                  />
                  <ActionItem
                     label="Manage Products"
                     image={require('../../assets/icons/products.png')}
                     icon={Tag}
                     onPress={() => router.push('/products/inventory')}
                  />
                  <ActionItem
                     label="Manage Orders"
                     image={require('../../assets/icons/orders.png')}
                     icon={ReceiptText}
                     onPress={() => router.push('/orders')}
                  />
                  <ActionItem
                     label="Promotions"
                     image={require('../../assets/icons/promotion.png')}
                     icon={Percent}
                     onPress={() => router.push('/marketing')}
                  />
                  <ActionItem
                     label="Payouts"
                     image={require('../../assets/icons/payouts.png')}
                     icon={Wallet}
                     onPress={() => router.push('/finance/payouts')}
                  />
               </View>
            </View>

            {/* Recent Orders */}
            {/* Recent Orders */}
            <View className="mx-3 mt-6 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm mb-12">
               <View className="flex-row justify-between items-center mb-3">
                  <Text className="text-base font-bold text-slate-900">Recent Orders</Text>
                  <Pressable onPress={() => router.push('/orders')} className="flex-row items-center">
                     <Text className="text-primary text-xs font-bold mr-1">View All Orders</Text>
                     <ChevronRight size={14} color="#4F26D9" />
                  </Pressable>
               </View>

               <OrderItem
                  id="#ORD-8921"
                  tag="New"
                  name="John Doe"
                  count="2 items"
                  price="₦18,650"
                  status="Pending"
                  bgColor="bg-green-100"
                  textColor="text-green-700"
                  dotColor="bg-green-500"
                  iconBg="bg-purple-100"
                  onPress={() => router.push('/orders/confirmation')}
                  image={require('../../assets/icons/new order.png')}
               />
               <OrderItem
                  id="#ORD-8920"
                  tag="Preparing"
                  name="Mary Johnson"
                  count="4 items"
                  price="₦32,800"
                  status="Preparing"
                  bgColor="bg-blue-100"
                  textColor="text-blue-700"
                  dotColor="bg-blue-500"
                  iconBg="bg-orange-100"
                  onPress={() => router.push('/orders/preparing order')}
                  image={require('../../assets/icons/preparing order.png')}
               />
               <OrderItem
                  id="#ORD-8919"
                  tag="Out for Delivery"
                  name="Alex Brown"
                  count="3 items"
                  price="₦22,500"
                  status="Out for Delivery"
                  bgColor="bg-emerald-100"
                  textColor="text-emerald-700"
                  dotColor="bg-emerald-500"
                  iconBg="bg-green-100"
                  onPress={() => router.push('/orders/delivery')}
                  image={require('../../assets/icons/Out for Delivery order.png')}
               />

               <Pressable onPress={() => router.push('/orders')} className="items-center border-t border-slate-50 mt-3 pt-3">
                  <Text className="text-primary font-bold text-xs">View All Orders</Text>
               </Pressable>
            </View>


         </ScrollView>
      </SafeAreaView>
   );
}

function StatCard({ title, value, trend, icon: Icon, image, iconBg, iconColor, onPress }: any) {
   return (
      <Pressable
         onPress={onPress}
         className="w-36 bg-slate-50/50 border border-slate-100 p-3.5 rounded-3xl mr-3 active:bg-purple-50/30"
      >
         <View className={`w-8 h-8 ${iconBg} rounded-xl items-center justify-center mb-3`}>
            {image ? (
               <Image source={image} className="w-8 h-8" resizeMode="contain" />
            ) : (
               <Icon size={16} color={iconColor} />
            )}
         </View>
         <Text className="text-slate-400 text-[9px] font-bold uppercase">{title}</Text>
         <Text className="text-lg font-bold text-slate-900 mt-0.5">{value}</Text>
         <Text className="text-green-600 text-[9px] font-bold mt-0.5">
            {trend} <Text className="text-slate-400 font-normal">vs yesterday</Text>
         </Text>
      </Pressable>
   );
}
function ActionItem({ label, image, icon: Icon, onPress }: any) {
   return (
      <Pressable onPress={onPress} className="items-center w-[18%]">
         <View className="w-12 h-12 bg-white border border-slate-100 rounded-2xl items-center justify-center mb-2 shadow-sm active:bg-purple-50">
            {image ? (
               <Image source={image} className="w-6 h-6" resizeMode="contain" />
            ) : (
               <Icon size={20} color="#4F26D9" />
            )}
         </View>
         <Text className="text-slate-600 text-[8px] font-bold text-center uppercase" numberOfLines={2}>{label}</Text>
      </Pressable>
   );
}

function OrderItem({ id, tag, name, count, price, status, bgColor, textColor, dotColor, iconBg, image, onPress }: any) {
   return (
      <Pressable onPress={onPress} className="flex-row items-center py-3 border-b border-slate-50 active:bg-slate-50">
         <View className={`w-10 h-10  rounded-2xl items-center justify-center mr-3`}>
            {image ? (
               <Image source={image} className="w-10 h-10" resizeMode="contain" />
            ) : (
               <ShoppingBag size={18} color="#4F26D9" />
            )}
         </View>
         <View className="flex-1">
            <View className="flex-row items-center">
               <Text className="font-bold text-slate-900 text-xs mr-2">{id}</Text>
               <View className="bg-primary/10 px-1.5 py-0.5 rounded">
                  <Text className="text-primary text-[8px] font-bold">{tag}</Text>
               </View>
            </View>
            <Text className="text-slate-400 text-[10px] mt-0.5">{name} • {count}</Text>
            <Text className="text-slate-400 text-[9px]">Today, 09:31 AM</Text>
         </View>
         <View className="items-end">
            <Text className="font-bold text-slate-900 text-xs">{price}</Text>
            <View className={`px-2 py-0.5 rounded-full mt-1 flex-row items-center ${bgColor}`}>
               <View className={`w-1.5 h-1.5 rounded-full mr-1 ${dotColor}`} />
               <Text className={`text-[8px] font-bold ${textColor}`}>{status}</Text>
            </View>
         </View>
         <ChevronRight size={16} color="#94a3b8" className="ml-2" />
      </Pressable>
   );
}