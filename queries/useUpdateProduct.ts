import { useRouter } from 'expo-router';
import { useMutation } from 'react-query';

import useGetAllProducts from './useGetAllProducts';

import useDB from '~/hooks/useDB';
import { Product } from '~/types';

const sql = `UPDATE products SET name = ?, price = ?, quantity = ? , image = ?, description = ?, category = ? WHERE id = ?;`;

export default function useUpdateProduct(id: number) {
  const { db } = useDB();
  const router = useRouter();
  const { refetchAllProducts } = useGetAllProducts();

  const { status, mutate } = useMutation({
    mutationFn: ({ name, price, quantity, image, description, category, id }: Product) => {
      const args = [name, price, quantity, image, description, category, id];

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
    updateProduct: mutate,
    status,
  };
}
