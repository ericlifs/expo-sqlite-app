import { Stack } from 'expo-router';
import { QueryClient, QueryClientProvider } from 'react-query';

import useDB from '~/hooks/useDB';

import '../global.css';

const queryClient = new QueryClient();

export default function Layout() {
  useDB();

  return (
    <QueryClientProvider client={queryClient}>
      <Stack screenOptions={{ headerBackTitleVisible: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="details/[id]" />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </QueryClientProvider>
  );
}
