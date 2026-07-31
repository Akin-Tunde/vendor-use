import { Stack, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';
import { ArrowLeft } from 'lucide-react-native';

export default function SignupLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitle: "",
        headerLeft: () => (
          <Pressable onPress={() => router.back()} className="p-2">
            <ArrowLeft size={24} color="#4F26D9" />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable onPress={() => router.push('/login')} className="pr-4 flex-row items-center">
            <Text className="text-slate-500">Already have an account? </Text>
            <Text className="text-primary font-bold">Log In</Text>
          </Pressable>
        ),
        headerShadowVisible: false,
      }}
    />
  );
}