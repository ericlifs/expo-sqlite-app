import '../global.css';

import { Stack } from 'expo-router';

export default function Layout() {
  return (
    <Stack screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
