'use server';

import { getTranslations } from 'next-intl/server';
import clsx from 'clsx';
import Pagination from './Pagination';

import { GetProductResponse, Product } from '@/types/product';
import ProductCard from './productCard';
import { api } from '@/services/api/axios';

interface ProductListProps {
  className?: string;
  listClassName?: string;
  filters?: Record<string, unknown>;
  keyWords?: string;
  page?: number;
}

const fetchProducts = async (page: number, filters: Record<string, unknown>) => {
  const response = await api.get<GetProductResponse>('v1/product', { params: { page: page, limit: 8, filters } });

  return response?.data;
};

const ProductList = async ({ className, listClassName, page = 1, filters = {} }: ProductListProps) => {
  const t = await getTranslations('home');
  const productResponse = await fetchProducts(page, filters);
  const productList = productResponse?.products || [];

  return (
    <div className={clsx('container', className)}>
      <h2 className="mt-10 mb-5 text-2xl font-semibold text-dark dark:text-white-200">{t('latest')}</h2>

      <ul className={clsx('grid grid-cols-5 gap-7', listClassName)}>
        {productList.map((product: Product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </ul>

      <Pagination pageCount={productResponse?.totalPage || 1} className="mt-10" />
    </div>
  );
};

export default ProductList;
