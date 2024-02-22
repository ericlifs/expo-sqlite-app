import { useQuery } from 'react-query';

import useDB from '~/hooks/useDB';
import { Product } from '~/types';

const sql = `SELECT * FROM products;`;

export default function useGetAllProducts() {
  const { db } = useDB();

  const { status, data, refetch } = useQuery<Product[]>({
    queryKey: ['ALL_PRODUCTS'],
    queryFn: async () => {
      const res = await db.execAsync([{ sql, args: [] }], false);

      if ('rows' in res[0]) {
        return res[0].rows as Product[];
      }

      return [] as Product[];
    },
  });

  return {
    products: data,
    refetchAllProducts: refetch,
    status,
  };
}
