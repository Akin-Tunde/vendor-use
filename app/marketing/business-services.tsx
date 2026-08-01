import React from 'react';
import { View, Text, SafeAreaView, ScrollView, Pressable } from 'react-native';
import { useRouter } from 'expo-router';
import { ArrowLeft, ChevronRight, Star, ShieldCheck, Image as ImageIcon, Upload, BarChart3, PieChart, MessageSquare } from 'lucide-react-native';

const SERVICES = [
  { id: 'featured', title: 'Featured Store', desc: 'Get featured on the homepage and category pages.', icon: Star, color: 'bg-amber-100 text-amber-600' },
  { id: 'verified', title: 'Verified Business', desc: 'Get verified badge and build trust with customers.', icon: ShieldCheck, color: 'bg-green-100 text-green-600' },
  { id: 'banner', title: 'Homepage Banner', desc: 'Promote your store with premium banner placement.', icon: ImageIcon, color: 'bg-purple-100 text-primary' },
  { id: 'bulk', title: 'Bulk Product Upload', desc: 'Save time by uploading multiple products at once.', icon: Upload, color: 'bg-blue-100 text-blue-600' },
  { id: 'consult', title: 'Marketing Consultation', desc: 'Get expert advice to grow your sales and brand.', icon: BarChart3, color: 'bg-orange-100 text-orange-600' },
  { id: 'insights', title: 'Business Insights', desc: 'Get detailed insights and recommendations.', icon: PieChart, color: 'bg-teal-100 text-teal-600' },
  { id: 'request', title: 'Request New Service', desc: 'Tell us what service you need and we will make it happen.', icon: MessageSquare, color: 'bg-slate-100 text-slate-600' },
];

export default function BusinessServicesHubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable onPress={() => router.back()} className="mr-3 p-1">
            <ArrowLeft size={22} color="#000" />
          </Pressable>
          <View>
            <Text className="text-xl font-bold text-slate-900">Business Services</Text>
            <Text className="text-slate-400 text-xs">Power-up your business with value-added services</Text>
          </View>
        </View>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        <View className="space-y-3 mb-12">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Pressable key={s.id} className="bg-white border border-slate-100 p-4 rounded-3xl flex-row items-center shadow-sm">
                <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-3 ${s.color.split(' ')[0]}`}>
                  <Icon size={22} className={s.color.split(' ')[1]} />
                </View>
                <View className="flex-1 mr-2">
                  <Text className="font-bold text-slate-900 text-sm">{s.title}</Text>
                  <Text className="text-slate-400 text-xs mt-0.5 leading-4">{s.desc}</Text>
                </View>
                <ChevronRight size={18} color="#cbd5e1" />
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}