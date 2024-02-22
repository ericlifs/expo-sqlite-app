import { useRouter } from 'expo-router';
import { useMutation } from 'react-query';

import useGetAllProducts from './useGetAllProducts';

import useDB from '~/hooks/useDB';
import { Product } from '~/types';

const sql = `INSERT INTO products (name, price, quantity, image, description, category) VALUES (?, ?, ?, ?, ?, ?);`;

export default function useCreateProduct() {
  const { db } = useDB();
  const router = useRouter();
  const { refetchAllProducts } = useGetAllProducts();

  const { status, mutate } = useMutation({
    mutationFn: ({ name, price, quantity, image, description, category }: Product) => {
      const args = [name, price, quantity, image, description, category];

      return db.execAsync([{ sql, args }], false);
    },
    onSuccess: () => {
      refetchAllProducts();

      if (router.canGoBack()) {
        router.back();
      }
    },
  });

  return {
    createProduct: mutate,
    status,
  };
}
