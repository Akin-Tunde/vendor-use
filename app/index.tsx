import { Redirect } from 'expo-router';

export default function Index() {
  // In a real app, check if onboarding has been seen in AsyncStorage
  return <Redirect href="/onboarding" />;
}