import { Stack } from 'expo-router';
import React from 'react';

import ProductForm from '~/components/product-form';
import useCreateProduct from '~/queries/useCreateProduct';
import { Product } from '~/types';

const ModalScreen = () => {
  const { createProduct } = useCreateProduct();

  const onFormSubmit = (payload: Product) => createProduct(payload);

  return (
    <>
      <Stack.Screen options={{ title: 'Add new product' }} />
      <ProductForm product={{ price: 10, quantity: 1 }} onFormSubmit={onFormSubmit} />
    </>
  );
};

export default ModalScreen;
