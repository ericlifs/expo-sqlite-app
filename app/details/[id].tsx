import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View, TouchableOpacity } from 'react-native';

import ProductForm from '~/components/product-form';
import useDeleteProduct from '~/queries/useDeleteProduct';
import useProductInfo from '~/queries/useProductInfo';
import useUpdateProduct from '~/queries/useUpdateProduct';
import { Product } from '~/types';

export default function Details() {
  const { id } = useLocalSearchParams();
  const { product, status } = useProductInfo(Number(id));
  const { updateProduct } = useUpdateProduct(Number(id));
  const { deleteProduct } = useDeleteProduct(Number(id));

  const onFormSubmit = (payload: Product) => updateProduct(payload);

  if (status === 'loading' || !product) {
    return (
      <>
        <Stack.Screen options={{ title: '' }} />
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator />
        </View>
      </>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          title: product.name,
          headerRight: () => (
            <TouchableOpacity onPress={() => deleteProduct()}>
              <Ionicons name="trash" size={20} />
            </TouchableOpacity>
          ),
        }}
      />
      <ProductForm product={product} onFormSubmit={onFormSubmit} />
    </>
  );
}
