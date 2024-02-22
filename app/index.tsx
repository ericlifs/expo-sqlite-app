import { Ionicons } from '@expo/vector-icons';
import { Stack, Link } from 'expo-router';
import { FlatList, Pressable, Text, View } from 'react-native';

import useGetAllProducts from '~/queries/useGetAllProducts';
import { Product } from '~/types';

const formatPrice = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export default function Page() {
  const { products } = useGetAllProducts();

  const renderProduct = ({ item }: { item: Product }) => (
    <Link href={`/details/${item.id}`} asChild>
      <Pressable className="bg-white rounded px-4 py-2 flex flex-row items-center">
        <View className="flex-1 mr-5">
          <Text className="font-bold">{item.name}</Text>
          <Text className="mt-2">
            {formatPrice.format(item.price)} x {item.category}
          </Text>
        </View>

        <Ionicons name="chevron-forward" size={20} />
      </Pressable>
    </Link>
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Products',
          headerRight: () => (
            <Link href="/modal">
              <Ionicons name="add" size={24} />
            </Link>
          ),
        }}
      />
      <View className="flex-1 p-5">
        <FlatList
          data={products}
          keyExtractor={(item) => item.id!.toString()}
          ItemSeparatorComponent={() => <View className="h-5" />}
          renderItem={renderProduct}
        />
      </View>
    </>
  );
}
