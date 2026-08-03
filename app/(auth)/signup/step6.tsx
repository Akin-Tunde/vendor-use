import { useRouter } from 'expo-router';
import { ArrowLeft, Bike, Check, CheckCircle2, ChevronDown, Clock, MapPin, ShoppingBag } from 'lucide-react-native';
import React, { useState } from 'react';
import { Image, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

export default function DeliveryOperatingHoursScreen() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState('Mon');
  const [isOpen24Hours, setIsOpen24Hours] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('delivery');
  const [radius, setRadius] = useState(5);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-row items-center px-6 pt-4 pb-2">
        <Pressable onPress={() => router.back()} className="w-10 h-10 bg-slate-50 border border-slate-200 rounded-2xl items-center justify-center active:bg-purple-50 active:border-purple-200">
          <ArrowLeft size={20} color="#000" />
        </Pressable>
        <Text className="flex-1 text-center text-primary font-bold text-sm">Step 6 of 6</Text>
        <View className="w-10" />
      </View>

      <View className="flex-row items-center justify-center px-6 mt-4 mb-6">
        {[1, 2, 3, 4, 5, 6].map((step) => (
          <React.Fragment key={step}>
            <View className={`w-7 h-7 rounded-full items-center justify-center ${step < 6 ? 'bg-primary' : 'border-2 border-primary bg-white'}`}>
              {step < 6 ? <CheckCircle2 size={16} color="white" /> : <Text className="text-xs text-primary font-bold">{step}</Text>}
            </View>
            {step < 6 && <View className="flex-1 h-[2px] mx-0.5 bg-primary" />}
          </React.Fragment>
        ))}
      </View>

      <ScrollView className="flex-1 px-6" showsVerticalScrollIndicator={false}>
        <View className="flex-row justify-between items-start">
          <View className="flex-1 pr-4">
            <Text className="text-3xl font-bold text-slate-900 leading-tight">Set Your Delivery & Operating Hours</Text>
            <Text className="text-slate-500 mt-2 leading-5">Let customers know when you're open and where you deliver.</Text>
          </View>
          <View className="w-32 h-32 rounded-3xl items-center justify-center ">
            <Image source={require('../../../assets/icons/step-6.png')} className="w-full h-full" />
          </View>
        </View>

        <View className="mt-8 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <Text className="font-bold text-slate-900 mb-4">Operating Hours</Text>

          <View className="flex-row justify-between mb-6">
            {DAYS.map((day) => (
              <Pressable key={day} onPress={() => setSelectedDay(day)} className={`px-3 py-2 rounded-xl ${selectedDay === day ? 'bg-primary' : 'bg-slate-50'}`}>
                <Text className={`text-xs font-bold ${selectedDay === day ? 'text-white' : 'text-slate-500'}`}>{day}</Text>
              </Pressable>
            ))}
          </View>

          <View className="flex-row items-center justify-between mb-6">
            <View className="flex-1">
              <Text className="text-slate-500 text-[10px] mb-2 font-bold uppercase">Opening Time</Text>
              <Pressable className="flex-row items-center justify-between border border-slate-200 rounded-2xl px-3 py-3 bg-slate-50/50">
                <Clock size={14} color="#4F26D9" />
                <Text className="text-slate-900 font-bold text-xs">08:00 AM</Text>
                <ChevronDown size={14} color="#64748b" />
              </Pressable>
            </View>
            <View className="mx-4 mt-6"><View className="w-4 h-[1.5px] bg-slate-300" /></View>
            <View className="flex-1">
              <Text className="text-slate-500 text-[10px] mb-2 font-bold uppercase">Closing Time</Text>
              <Pressable className="flex-row items-center justify-between border border-slate-200 rounded-2xl px-3 py-3 bg-slate-50/50">
                <Clock size={14} color="#4F26D9" />
                <Text className="text-slate-900 font-bold text-xs">10:00 PM</Text>
                <ChevronDown size={14} color="#64748b" />
              </Pressable>
            </View>
          </View>

          <View className="flex-row items-center justify-between border-t border-slate-50 pt-4">
            <View>
              <Text className="font-bold text-slate-900">Open 24 hours</Text>
              <Text className="text-slate-500 text-[10px]">My store is open 24 hours every day</Text>
            </View>
            <Switch value={isOpen24Hours} onValueChange={setIsOpen24Hours} trackColor={{ false: '#e2e8f0', true: '#4F26D9' }} />
          </View>
        </View>

        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm">
          <Text className="font-bold text-slate-900 mb-1">Delivery Options</Text>
          <Text className="text-slate-400 text-[10px] mb-4">Choose how customers can receive their orders</Text>
          <View className="flex-row space-x-3">
            <OptionCard icon={Bike} label="Delivery" desc="We deliver to customers" selected={deliveryOption === 'delivery'} onPress={() => setDeliveryOption('delivery')} />
            <OptionCard icon={ShoppingBag} label="Pickup" desc="Customers pick up" selected={deliveryOption === 'pickup'} onPress={() => setDeliveryOption('pickup')} />
            <OptionCard icon={Bike} label="Both" desc="Offer both" selected={deliveryOption === 'both'} onPress={() => setDeliveryOption('both')} />
          </View>
        </View>

        <View className="mt-6 p-5 bg-white border border-slate-100 rounded-[32px] shadow-sm pb-10">
          <View className="flex-row justify-between items-center mb-4">
            <View>
              <Text className="font-bold text-slate-900">Delivery Radius</Text>
              <Text className="text-slate-400 text-[10px]">Set the area within which you deliver</Text>
            </View>
            <View className="bg-slate-50 w-24 h-16 rounded-xl overflow-hidden items-center justify-center">
              <MapPin size={24} color="#4F26D9" opacity={0.2} />
            </View>
          </View>

          <View className="items-center">
            <Text className="text-primary font-bold mb-2">{radius} km</Text>
            <View className="w-full h-1.5 bg-slate-100 rounded-full">
              <View className="h-full bg-primary rounded-full relative" style={{ width: `${(radius / 20) * 100}%` }}>
                <View className="absolute right-0 top-[-6px] w-4 h-4 bg-primary rounded-full border-2 border-white shadow" />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      <View className="p-6 bg-white border-t border-slate-50 flex-row space-x-5">
        <Pressable className="flex-1 border border-slate-200 bg-white h-16 rounded-2xl justify-center items-center active:bg-purple-50 active:border-primary" onPress={() => router.back()}>
          <Text className="text-slate-700 font-bold text-base">Previous</Text>
        </Pressable>

        <Pressable className="flex-1 bg-primary h-16 rounded-2xl justify-center items-center shadow-lg shadow-primary/30 active:bg-primary/90" onPress={() => router.push('/signup/complete')}>
          <Text className="text-white font-bold text-base text-center px-2">Complete Setup</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

function OptionCard({ icon: Icon, label, desc, selected, onPress }: any) {
  return (
    <Pressable onPress={onPress} className={`flex-1 p-3 rounded-2xl border-2 items-center text-center ${selected ? 'border-primary bg-primary/5' : 'border-slate-100 bg-white'}`}>
      <View className={`w-10 h-10 rounded-xl items-center justify-center mb-2 ${selected ? 'bg-primary/10' : 'bg-slate-50'}`}>
        <Icon size={20} color="#4F26D9" />
      </View>
      <Text className={`text-[11px] font-bold mb-1 ${selected ? 'text-primary' : 'text-slate-900'}`}>{label}</Text>
      <Text className="text-slate-400 text-[8px] text-center" numberOfLines={2}>{desc}</Text>
      <View className={`absolute top-2 right-2 w-4 h-4 rounded-full border items-center justify-center ${selected ? 'bg-primary border-primary' : 'border-slate-200'}`}>
        {selected && <Check size={10} color="white" strokeWidth={3} />}
      </View>
    </Pressable>
  );
}