'use server';

import { getTranslations } from 'next-intl/server';
import clsx from 'clsx';
import Pagination from './Pagination';

import { GetProductResponse, Product, ProductFilter } from '@/types/product';
import ProductCard from './productCard';
import { api } from '@/services/api/axios';
import { GetProductParams } from './../types/product';

interface ProductListProps {
  className?: string;
  listClassName?: string;
  filters?: ProductFilter;
  page?: number;
  keyword?: string;
}

const fetchProducts = async (page: number, filters?: ProductFilter, keyword?: string) => {
  const params: GetProductParams = {
    keyword: keyword,
    page: page,
    limit: 8,
    minPrice: filters?.minPrice || undefined,
    maxPrice: filters?.maxPrice,
    minRating: filters?.minRating,
    categoryId: filters?.category,
    sortBy: filters?.displayOption || 'createdAt:asc',
    manufacturerId:
      filters?.manufacturers?.flatMap((obj) =>
        Object.entries(obj)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .filter(([_, value]) => value)
          .map(([key]) => key),
      ) || [],
  };

  const response = await api.get<GetProductResponse>('v1/product', {
    params,
  });

  return response?.data;
};

const ProductList = async ({ className, listClassName, page = 1, filters, keyword }: ProductListProps) => {
  const t = await getTranslations('home');

  const productResponse = await fetchProducts(page, filters, keyword);
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
