'use server';

import { getTranslations } from 'next-intl/server';
import clsx from 'clsx';
import Pagination from './Pagination';
import ProductCard from './productCard';
import { Product } from '@/types/product';

const fetchProducts = async () => {
  try {
    const response = await fetch('https://mid-autumn-api-1.onrender.com/api/v1/product?limit=8&page=1', {
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    const data = await response.json();
    console.log('data', data);
    return data?.data?.products || [];
  } catch (error) {
    console.error('Lỗi fetch sản phẩm:', error);
    return [];
  }
};

const ProductList = async ({ className, listClassName }: { className?: string; listClassName?: string }) => {
  const t = await getTranslations('home');
  const productList = (await fetchProducts()) || [];

  return (
    <div className={clsx('container', className, listClassName)}>
      <h2 className="mt-10 mb-5 text-2xl font-semibold text-dark dark:text-white-200">{t('latest')}</h2>

      <ul className={clsx('grid grid-cols-5 gap-7', listClassName)}>
        {productList.map((product: Product) => (
          <ProductCard key={product._id} data={product} />
        ))}
      </ul>

      <Pagination pageCount={10} className="mt-10" />
    </div>
  );
};

export default ProductList;
