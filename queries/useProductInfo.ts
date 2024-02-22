import { useQuery } from 'react-query';

import useDB from '~/hooks/useDB';
import { Product } from '~/types';

const sql = `SELECT * FROM products WHERE id = ?;`;

export default function useProductInfo(id: number) {
  const { db } = useDB();

  const { status, data } = useQuery<Product>({
    queryKey: ['PRODUCT', id],
    queryFn: async () => {
      const res = await db.execAsync([{ sql, args: [id] }], false);

      if ('rows' in res[0]) {
        return res[0].rows[0] as Product;
      }

      throw new Error('There was an error when fetching product info');
    },
  });

  return {
    product: data,
    status,
  };
}
