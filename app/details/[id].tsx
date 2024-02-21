import { Stack, useLocalSearchParams } from 'expo-router';
import { Text, View } from 'react-native';

export default function Details() {
  const { id } = useLocalSearchParams();

  return (
    <View className={styles.container}>
      <Stack.Screen options={{ title: id.toString() }} />
      <View className={styles.main}>
        <Text className={styles.title}>Details</Text>
        <Text className={styles.subtitle}>Showing details for user {id}.</Text>
      </View>
    </View>
  );
}

const styles = {
  backButton: 'flex-row',
  backButtonText: 'text-blue-500 ml-1',
  container: 'flex-1 p-6',
  main: 'flex-1 max-w-[960]',
  title: 'text-[64px] font-bold',
  subtitle: 'text-4xl text-gray-700',
};
