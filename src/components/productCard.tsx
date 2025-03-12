'use client';

import { FC, useEffect, useState } from 'react';
import Icon from './Icon';
import Image from './Image';
import clsx from 'clsx';

import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path';
import formatNumber from '@/utils/formatNumber';
import formatCurrency from '@/utils/formatCurrency';

interface ProductCardProps {
  className?: string;
  data: Product;
}

const ProductCard: FC<ProductCardProps> = ({ data, className }) => {
  const route = useRouter();
  const [productData, setProductData] = useState<Product | null>(null);

  useEffect(() => {
    setProductData(data);
  }, [data]);
  return (
    <div
      className={clsx(
        'h-full p-4 rounded-2xl bg-white dark:bg-dark-400 shadow-product-card-light dark:shadow-product-card-dark text-dark dark:text-white-200 hover:bg-gray-400 transition-all',
        className,
      )}
      onClick={() => {
        route.push(PATH.PRODUCT_DETAIL.replace(':productId', productData?._id || ''));
      }}
    >
      <div className="mx-auto w-full aspect-square bg-white dark:bg-dark-500 rounded-lg">
        <Image
          width={220}
          height={220}
          src={productData?.image || ''}
          className="w-full aspect-square rounded-md bg-white dark:bg-dark-500"
          alt={productData?.name || ''}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold h-[60px] transition-transform duration-300 overflow-hidden line-clamp-2">
          {productData?.name || ''}
        </h2>

        <h3 className="text-sm text-gray-500 mt-4">{productData?.manufacturerId?.name || ''}</h3>

        <div className="flex justify-between my-3">
          <span className="text-base font-semibold">{formatCurrency(productData?.price)}</span>
          <div className="flex items-center gap-1">
            <Icon name="star" color="yellow-500" width="18px" height="18px" />
            <span className="text-base font-medium">{formatNumber(productData?.ratings)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
