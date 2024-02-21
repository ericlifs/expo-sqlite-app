import { Stack } from 'expo-router';

import useDB from '~/hooks/useDB';

import '../global.css';

export default function Layout() {
  useDB();

  return (
    <Stack screenOptions={{ headerBackTitleVisible: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="details/[id]" />
      <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
    </Stack>
  );
}
