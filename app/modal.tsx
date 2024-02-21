import { Stack } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import tailshake from 'tailshake';

import useCreateProduct from '~/queries/useCreateProduct';
import { Product } from '~/types';

const ModalScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const { createProduct } = useCreateProduct();

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Product>({
    mode: 'all',
    defaultValues: {
      name: 'Nike AirForce 1',
      description: 'Nice shoes',
      quantity: 5,
      price: 100,
      category: 'Clothing',
      image: 'https://nike.com',
    },
  });

  const onFormSubmit = (payload: Product) => {
    createProduct(payload);
  };

  return (
    <>
      <Stack.Screen options={{ title: 'Add new product' }} />
      <View className="flex-1 p-5" style={{ paddingBottom: bottom }}>
        <View className="flex-1">
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                className={tailshake(
                  'bg-white p-5 border-2 rounded-full mb-5 placeholder:text-indigo-500 border-indigo-500 text-black',
                  errors.name && 'text-red-800 border-red-800 placeholder:text-red-800'
                )}
                placeholder="Name"
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="name"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                className={tailshake(
                  'bg-white p-5 border-2 rounded-full mb-5 placeholder:text-indigo-500 border-indigo-500 text-black',
                  errors.description && 'text-red-800 border-red-800 placeholder:text-red-800'
                )}
                placeholder="Description"
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="description"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                className={tailshake(
                  'bg-white p-5 border-2 rounded-full mb-5 placeholder:text-indigo-500 border-indigo-500 text-black',
                  errors.category && 'text-red-800 border-red-800 placeholder:text-red-800'
                )}
                placeholder="Category"
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="category"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              min: 1,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value.toString()}
                className={tailshake(
                  'bg-white p-5 border-2 rounded-full mb-5 placeholder:text-indigo-500 border-indigo-500 text-black',
                  errors.price && 'text-red-800 border-red-800 placeholder:text-red-800'
                )}
                placeholder="Price"
                onBlur={onBlur}
                onChangeText={(value) => {
                  if (!value) {
                    return onChange(0);
                  }

                  onChange(parseFloat(value));
                }}
              />
            )}
            name="price"
          />

          <Controller
            control={control}
            rules={{
              required: true,
              min: 1,
              validate: (value) => !Number.isNaN(value),
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value.toString()}
                className={tailshake(
                  'bg-white p-5 border-2 rounded-full mb-5 placeholder:text-indigo-500 border-indigo-500 text-black',
                  errors.quantity && 'text-red-800 border-red-800 placeholder:text-red-800'
                )}
                placeholder="Quantity"
                onBlur={onBlur}
                onChangeText={(value) => {
                  if (!value) {
                    return onChange(0);
                  }

                  onChange(parseInt(value, 10));
                }}
              />
            )}
            name="quantity"
          />

          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                value={value}
                className={tailshake(
                  'bg-white p-5 border-2 rounded-full mb-5 placeholder:text-indigo-500 border-indigo-500 text-black',
                  errors.image && 'text-red-800 border-red-800 placeholder:text-red-800'
                )}
                placeholder="Image"
                onBlur={onBlur}
                onChangeText={onChange}
              />
            )}
            name="image"
          />
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onFormSubmit)}
          disabled={!isValid}
          className="items-center bg-indigo-500 rounded-[28px] shadow-md p-4 disabled:bg-zinc-400 disabled:shadow-none">
          <Text className="text-white text-lg font-semibold text-center">Create</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

export default ModalScreen;
