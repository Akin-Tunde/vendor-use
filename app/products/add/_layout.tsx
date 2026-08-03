import { Stack, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import { Pressable, Text } from 'react-native';

export default function AddProductLayout() {
  const router = useRouter();

  return (
    <Stack
      screenOptions={{
        headerTitle: "Add Product",
        headerTitleStyle: { fontWeight: 'bold' },
        headerLeft: () => (
          <Pressable onPress={() => router.back()} className="mr-4">
            <ArrowLeft size={24} color="#4F26D9" />
          </Pressable>
        ),
        headerRight: () => (
          <Pressable className="bg-purple-50 px-4 py-2 rounded-xl border border-primary/10">
            <Text className="text-primary font-bold text-xs">Save as Draft</Text>
          </Pressable>
        ),
        headerShadowVisible: false,
      }}
    >
      {/* Hide default layout header for variants screen */}
      <Stack.Screen name="variants" options={{ headerShown: false }} />
    </Stack>
  );
}