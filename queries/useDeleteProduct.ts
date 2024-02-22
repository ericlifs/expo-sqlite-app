import { useRouter } from 'expo-router';
import { useMutation } from 'react-query';

import useGetAllProducts from './useGetAllProducts';

import useDB from '~/hooks/useDB';

const sql = `DELETE FROM products WHERE id = ?;`;

export default function useDeleteProduct(id: number) {
  const { db } = useDB();
  const { refetchAllProducts } = useGetAllProducts();
  const router = useRouter();

  const { status, mutate } = useMutation({
    mutationFn: () => db.execAsync([{ sql, args: [id] }], false),
    onSuccess: () => {
      refetchAllProducts();

      if (router.canGoBack()) {
        router.back();
      }
    },
  });

  return {
    deleteProduct: mutate,
    status,
  };
}
