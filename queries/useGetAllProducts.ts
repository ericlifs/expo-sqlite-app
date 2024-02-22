import { useQuery, useQueryClient } from 'react-query';

import useDB from '~/hooks/useDB';
import { Product } from '~/types';

const sql = `SELECT * FROM products;`;

export default function useGetAllProducts() {
  const { db } = useDB();
  const queryClient = useQueryClient();

  const { status, data, refetch } = useQuery<Product[]>({
    queryKey: ['ALL_PRODUCTS'],
    queryFn: async () => {
      const res = await db.execAsync([{ sql, args: [] }], false);

      if ('rows' in res[0]) {
        return res[0].rows as Product[];
      }

      return [] as Product[];
    },
    onSuccess: (products: Product[]) => {
      products.forEach((product) => queryClient.setQueryData(['PRODUCT', product.id], product));
    },
  });

  return {
    products: data,
    refetchAllProducts: refetch,
    status,
  };
}
