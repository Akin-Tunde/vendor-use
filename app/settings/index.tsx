import React from 'react';
import { View, Text, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { 
  ArrowLeft, ShieldCheck, Globe, DollarSign, Eye, 
  Bell, Wifi, Lock, Shield, FileText, Info, 
  Users, LogOut, Trash2, ChevronRight 
} from 'lucide-react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function AppSettingsScreen() {
  const router = useRouter();

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

        <Text className="text-xl font-bold text-slate-900">App Settings & Logout</Text>

        <View className="w-10 h-10 bg-purple-50 rounded-2xl items-center justify-center border border-purple-100">
          <ShieldCheck size={20} color="#4F26D9" />
        </View>
      </View>

      <ScrollView className="flex-1" showsVerticalScrollIndicator={false}>
        {/* Section 1: App Settings */}
        <View className="px-6 mt-4">
          <Text className="font-bold text-slate-900 text-sm mb-2">App Settings</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm space-y-1">
            <SettingRow icon={Globe} label="Language" value="English" bg="bg-blue-50" iconColor="#3b82f6" />
            <SettingRow icon={DollarSign} label="Currency" value="NGN (₦)" bg="bg-green-50" iconColor="#22c55e" />
            <SettingRow icon={Eye} label="Appearance" value="Light Mode" bg="bg-purple-50" iconColor="#4F26D9" />
            <SettingRow icon={Bell} label="Notification Preferences" bg="bg-orange-50" iconColor="#f97316" onPress={() => router.push('/settings/notifications')} />
            <SettingRow icon={Wifi} label="Data Usage" value="Wi-Fi Only" bg="bg-blue-50" iconColor="#3b82f6" />
            <SettingRow icon={Lock} label="Security" value="Change Password" bg="bg-green-50" iconColor="#22c55e" />
            <SettingRow icon={Shield} label="Privacy Policy" bg="bg-purple-50" iconColor="#4F26D9" />
            <SettingRow icon={FileText} label="Terms & Conditions" bg="bg-amber-50" iconColor="#f59e0b" />
            <SettingRow icon={Info} label="About the App" value="Version 2.4.1" bg="bg-blue-50" iconColor="#3b82f6" />
          </View>
        </View>

        {/* Section 2: Account Actions */}
        <View className="px-6 mt-6">
          <Text className="font-bold text-slate-900 text-sm mb-2">Account Actions</Text>
          <View className="bg-white border border-slate-100 p-4 rounded-[32px] shadow-sm space-y-1">
            <SettingRow icon={Users} label="Switch Account" sub="Switch to another store account" bg="bg-purple-50" iconColor="#4F26D9" />
            <SettingRow icon={LogOut} label="Logout" sub="Sign out of your current account" bg="bg-red-50" iconColor="#ef4444" red />
          </View>
        </View>

        {/* Section 3: Danger Zone */}
        <View className="px-6 mt-6 mb-12">
          <Text className="font-bold text-red-600 text-sm mb-2">Danger Zone</Text>
          <Pressable className="bg-red-50/60 border border-red-200/80 p-4 rounded-[32px] flex-row items-center justify-between active:bg-red-100/50">
            <View className="flex-row items-center flex-1 mr-2">
              <View className="w-10 h-10 bg-red-100 rounded-2xl items-center justify-center mr-3">
                <Trash2 size={18} color="#ef4444" />
              </View>
              <View className="flex-1">
                <Text className="font-bold text-red-600 text-xs">Delete Account</Text>
                <Text className="text-red-500/80 text-[10px] mt-0.5 leading-3">Permanently delete your account and all data. This action cannot be undone.</Text>
              </View>
            </View>
            <ChevronRight size={16} color="#ef4444" />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingRow({ icon: Icon, label, sub, value, bg, iconColor, red, onPress }: any) {
  return (
    <Pressable onPress={onPress} className="flex-row items-center justify-between py-3 border-b border-slate-50 active:bg-purple-50/20 rounded-xl px-2">
      <View className="flex-row items-center flex-1 mr-2">
        <View className={`w-10 h-10 ${bg} rounded-2xl items-center justify-center mr-3`}>
          <Icon size={18} color={iconColor} />
        </View>
        <View className="flex-1">
          <Text className={`font-bold text-xs ${red ? 'text-red-600' : 'text-slate-900'}`}>{label}</Text>
          {sub && <Text className="text-slate-400 text-[10px] mt-0.5">{sub}</Text>}
        </View>
      </View>

      <View className="flex-row items-center">
        {value && <Text className="text-slate-500 font-medium text-xs mr-2">{value}</Text>}
        <ChevronRight size={16} color="#cbd5e1" />
      </View>
    </Pressable>
  );
}