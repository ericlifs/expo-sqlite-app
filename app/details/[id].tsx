import { Stack, useLocalSearchParams } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';

import ProductForm from '~/components/product-form';
import useCreateProduct from '~/queries/useCreateProduct';
import useProductInfo from '~/queries/useProductInfo';
import { Product } from '~/types';

export default function Details() {
  const { id } = useLocalSearchParams();
  const { product, status } = useProductInfo(Number(id));
  const { createProduct } = useCreateProduct();

  const onFormSubmit = (payload: Product) => createProduct(payload);

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
      <Stack.Screen options={{ title: product.name }} />
      <ProductForm product={product} onFormSubmit={onFormSubmit} />
    </>
  );
}
