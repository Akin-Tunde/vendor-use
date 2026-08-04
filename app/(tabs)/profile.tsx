import { useRouter } from 'expo-router';
import {
  BarChart3,
  Bell,
  Briefcase,
  ChevronRight,
  Clock,
  HelpCircle,
  LogOut,
  Megaphone,
  Settings,
  Sliders,
  Store,
  TrendingUp,
  Wallet
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View>
          <Text className="text-2xl font-bold text-slate-900">Profile</Text>
          <Text className="text-slate-400 text-xs">Store profile, analytics, finance and settings</Text>
        </View>

        <Pressable
          onPress={() => router.push('/settings' as any)}
          className="w-10 h-10 bg-purple-50 rounded-2xl items-center justify-center border border-purple-100"
        >
          <Settings size={20} color="#4F26D9" />
        </Pressable>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Store Profile Card Header */}
        <Pressable
          onPress={() => router.push('/settings/store-profile' as any)}
          className="mx-6 mt-4 bg-white border border-slate-100 p-5 rounded-[32px] shadow-sm active:bg-purple-50/20"
        >
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center flex-1 pr-2">
              <View className="w-16 h-16 bg-green-800 rounded-2xl items-center justify-center mr-3.5 shadow-sm">
                <Text className="text-3xl">🧺</Text>
              </View>
              <View className="flex-1">
                <View className="flex-row items-center">
                  <Text className="text-base font-bold text-slate-900 mr-1" numberOfLines={1}>Green Basket Groceries</Text>
                  <View className="bg-primary rounded-full p-0.5">
                    <Text className="text-[8px] text-white font-bold">✓</Text>
                  </View>
                </View>
                <Text className="text-slate-400 text-xs mt-0.5">ID: ST-45872</Text>
                <View className="flex-row items-center mt-1">
                  <View className="bg-green-100 px-2 py-0.5 rounded-md mr-2">
                    <Text className="text-green-700 text-[10px] font-bold">Active</Text>
                  </View>
                  <Text className="text-slate-400 text-[10px]">Lagos, Nigeria</Text>
                </View>
              </View>
            </View>

            <ChevronRight size={18} color="#cbd5e1" />
          </View>
        </Pressable>

        {/* Quick Hub Cards: Analytics & Wallet */}
        <View className="mx-6 mt-4 flex-row gap-3">
          <Pressable
            onPress={() => router.push('/(tabs)/analytics')}
            className="flex-1 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm active:bg-purple-50/20"
          >
            <View className="w-10 h-10 bg-purple-100 rounded-2xl items-center justify-center mb-2">
              <BarChart3 size={20} color="#4F26D9" />
            </View>
            <Text className="font-bold text-slate-900 text-xs">Analytics</Text>
            <Text className="text-slate-400 text-[10px] mt-0.5">Sales & Growth</Text>
          </Pressable>

          <Pressable
            onPress={() => router.push('/(tabs)/finance')}
            className="flex-1 bg-white border border-slate-100 p-4 rounded-[28px] shadow-sm active:bg-purple-50/20"
          >
            <View className="w-10 h-10 bg-green-100 rounded-2xl items-center justify-center mb-2">
              <Wallet size={20} color="#22c55e" />
            </View>
            <Text className="font-bold text-slate-900 text-xs">Wallet & Finance</Text>
            <Text className="text-slate-400 text-[10px] mt-0.5">₦842,300.00</Text>
          </Pressable>
        </View>

        {/* Business Performance & Analytics Section */}
        <View className="mx-6 mt-6">
          <Text className="font-bold text-slate-900 text-sm mb-2">Performance & Insights</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm gap-1">
            <MenuLink
              icon={TrendingUp}
              label="Sales & Revenue Reports"
              sub="View detailed sales breakdowns and trends"
              bg="bg-purple-100"
              iconColor="#4F26D9"
              onPress={() => router.push('/analytics/sales' as any)}
            />
            <MenuLink
              icon={BarChart3}
              label="Analytics Overview"
              sub="Track customer insights and product performance"
              bg="bg-blue-100"
              iconColor="#3b82f6"
              onPress={() => router.push('/(tabs)/analytics' as any)}
            />
            <MenuLink
              icon={Wallet}
              label="Earnings & Payouts"
              sub="Check net earnings, fees and payout schedules"
              bg="bg-green-100"
              iconColor="#22c55e"
              onPress={() => router.push('/analytics/earnings' as any)}
              last
            />
          </View>
        </View>

        {/* Store Operations & Growth */}
        <View className="mx-6 mt-6">
          <Text className="font-bold text-slate-900 text-sm mb-2">Store Operations & Growth</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm gap-1">
            <MenuLink
              icon={Store}
              label="Store Profile"
              sub="Store name, logo, cover and address"
              bg="bg-purple-100"
              iconColor="#4F26D9"
              onPress={() => router.push('/settings/store-profile' as any)}
            />
            <MenuLink
              icon={Clock}
              label="Business Hours & Delivery"
              sub="Operating hours, radius and fees"
              bg="bg-green-100"
              iconColor="#22c55e"
              onPress={() => router.push('/settings/business-hours' as any)}
            />
            <MenuLink
              icon={Megaphone}
              label="Marketing Hub"
              sub="Campaigns, promotions and ads"
              bg="bg-amber-100"
              iconColor="#f59e0b"
              onPress={() => router.push('/marketing' as any)}
            />
            <MenuLink
              icon={Briefcase}
              label="Business Services"
              sub="Value-added store growth services"
              bg="bg-orange-100"
              iconColor="#f97316"
              onPress={() => router.push('/marketing/business-services' as any)}
              last
            />
          </View>
        </View>

        {/* Preferences & App Settings */}
        <View className="mx-6 mt-6">
          <Text className="font-bold text-slate-900 text-sm mb-2">Preferences & Support</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm gap-1">
            <MenuLink
              icon={Bell}
              label="Notification Preferences"
              sub="Manage order and store alerts"
              bg="bg-blue-100"
              iconColor="#3b82f6"
              onPress={() => router.push('/settings/notifications' as any)}
            />
            <MenuLink
              icon={HelpCircle}
              label="Help & Support"
              sub="24/7 customer support and FAQs"
              bg="bg-teal-100"
              iconColor="#14b8a6"
              onPress={() => router.push('/settings/help-support' as any)}
            />
            <MenuLink
              icon={Sliders}
              label="App Settings"
              sub="Language, currency, security and privacy"
              bg="bg-purple-100"
              iconColor="#4F26D9"
              onPress={() => router.push('/settings' as any)}
              last
            />
          </View>
        </View>

        {/* Logout */}
        <View className="mx-6 mt-6 mb-12">
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm">
            <MenuLink
              icon={LogOut}
              label="Logout"
              sub="Sign out of your vendor account"
              bg="bg-red-50"
              iconColor="#ef4444"
              red
              onPress={() => router.replace('/(auth)/login')}
              last
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function MenuLink({ icon: Icon, label, sub, bg, iconColor, red, last, onPress }: any) {
  return (
    <Pressable
      onPress={onPress}
      className={`flex-row items-center justify-between py-3 ${last ? '' : 'border-b border-slate-50'} active:bg-purple-50/20 rounded-xl px-2`}
    >
      <View className="flex-row items-center flex-1 mr-2">
        <View className={`w-10 h-10 ${bg} rounded-2xl items-center justify-center mr-3`}>
          <Icon size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className={`font-bold text-xs ${red ? 'text-red-600' : 'text-slate-900'}`}>{label}</Text>
          {sub && <Text className="text-slate-400 text-[10px] mt-0.5">{sub}</Text>}
        </View>
      </View>

      <ChevronRight size={16} color="#cbd5e1" />
    </Pressable>
  );
}