import { useRouter } from 'expo-router';
import {
  ArrowLeft,
  BarChart2,
  ChevronRight,
  HelpCircle,
  Megaphone,
  MoreHorizontal,
  PieChart,
  ShieldCheck,
  Star,
  Upload
} from 'lucide-react-native';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const SERVICES = [
  {
    id: 'featured',
    title: 'Featured Store',
    desc: 'Get featured on the homepage and category pages.',
    icon: Star,
    bg: 'bg-amber-100',
    iconColor: '#f59e0b',
    btnText: 'Get Started'
  },
  {
    id: 'verified',
    title: 'Verified Business',
    desc: 'Get verified badge and build trust with customers.',
    icon: ShieldCheck,
    bg: 'bg-green-100',
    iconColor: '#22c55e',
    btnText: 'Get Started'
  },
  {
    id: 'bulk',
    title: 'Bulk Product Upload',
    desc: 'Save time by uploading multiple products at once.',
    icon: Upload,
    bg: 'bg-purple-100',
    iconColor: '#4F26D9',
    btnText: 'Get Started'
  },
  {
    id: 'banner',
    title: 'Homepage Banner',
    desc: 'Promote your store with premium banner placement.',
    icon: Megaphone,
    bg: 'bg-orange-100',
    iconColor: '#f97316',
    btnText: 'Get Started'
  },
  {
    id: 'consult',
    title: 'Marketing Consultation',
    desc: 'Get expert advice to grow your sales and brand.',
    icon: BarChart2,
    bg: 'bg-blue-100',
    iconColor: '#3b82f6',
    btnText: 'Get Started'
  },
  {
    id: 'insights',
    title: 'Business Insights',
    desc: 'Get detailed insights and recommendations.',
    icon: PieChart,
    bg: 'bg-teal-100',
    iconColor: '#14b8a6',
    btnText: 'View Insights'
  },
  {
    id: 'request',
    title: 'Request New Service',
    desc: 'Tell us what service you need and we\'ll make it happen.',
    icon: MoreHorizontal,
    bg: 'bg-slate-100',
    iconColor: '#64748b',
    btnText: 'Request'
  },
];

export default function BusinessServicesHubScreen() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#F8F9FE]">
      {/* Top Header */}
      <View className="px-6 py-4 bg-white border-b border-slate-50 flex-row justify-between items-center">
        <View className="flex-row items-center">
          <Pressable
            onPress={() => router.back()}
            className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center mr-3 active:bg-purple-50"
          >
            <ArrowLeft size={20} color="#000" />
          </Pressable>
          <Text className="text-xl font-bold text-slate-900">Business Services Hub</Text>
        </View>

        <Pressable className="w-10 h-10 bg-slate-50 border border-slate-100 rounded-2xl items-center justify-center shadow-sm">
          <HelpCircle size={18} color="#64748b" />
        </Pressable>
      </View>

      <ScrollView className="flex-1 px-6 pt-4" showsVerticalScrollIndicator={false}>
        <Text className="font-bold text-slate-900 text-base mb-1">Power-up your store with our value-added services.</Text>
        <Text className="text-slate-400 text-xs mb-4">Choose a service to boost your store visibility and operations.</Text>

        <View className="space-y-3 mb-12">
          {SERVICES.map((s) => {
            const Icon = s.icon;
            return (
              <Pressable
                key={s.id}
                className="bg-white border border-slate-100 p-4 rounded-[28px] flex-row items-center justify-between shadow-sm active:bg-purple-50/20"
              >
                <View className="flex-row items-center flex-1 mr-2">
                  <View className={`w-12 h-12 rounded-2xl items-center justify-center mr-3 ${s.bg}`}>
                    <Icon size={22} color={s.iconColor} />
                  </View>
                  <View className="flex-1 pr-1">
                    <Text className="font-bold text-slate-900 text-sm">{s.title}</Text>
                    <Text className="text-slate-400 text-[10px] mt-0.5 leading-3.5" numberOfLines={2}>{s.desc}</Text>
                  </View>
                </View>

                <View className="flex-row items-center space-x-1.5">
                  <View className="bg-purple-50 border border-purple-100 px-3 py-1.5 rounded-xl">
                    <Text className="text-primary font-bold text-[10px]">{s.btnText}</Text>
                  </View>
                  <ChevronRight size={16} color="#cbd5e1" />
                </View>
              </Pressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}