'use server';

import { api } from '@/services/api/axios';
import { CategoryResponse } from '@/types/category';
import { getTranslations } from 'next-intl/server';
import Pagination from './Pagination';
import ProductCard from './productCard';
import clsx from 'clsx';

interface ProductListProps {
  className?: string;
  listClassName?: string;
}

const ProductList = async ({ className, listClassName }: ProductListProps): Promise<JSX.Element> => {
  const response = await api.get<CategoryResponse>('https://api.hauifood.com/v1/categories?limit=10&page=1');
  const t = await getTranslations('home');

  const productList = response.data?.categories || [];
  const fakeProductData = {
    thumbnail: 'https://www.crispoconfetti.com/wp-content/uploads/2020/06/ciocoli-rhum.png',
    alt: 'Product image',
    nameProduct: 'Qualità Oro Mountain Grown - Espresso Coffee Beans',
    maker: 'Trung Nguyên',
    price: '$99.99',
    startRate: 4.5,
  };

  return (
    <div className={clsx('container', className, listClassName)}>
      <h2 className="mt-10 mb-5 text-2xl font-semibold text-dark dark:text-white">{t('latest')}</h2>

      <ul className={clsx('grid grid-cols-5 gap-7', listClassName)}>
        {productList.map((product, index) => (
          <ProductCard key={index} data={fakeProductData} />
        ))}
      </ul>

      <Pagination pageCount={10} className="mt-10" />
    </div>
  );
};

export default ProductList;
