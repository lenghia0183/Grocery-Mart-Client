'use client';

import { FC } from 'react';
import Icon from './Icon';
import Image from './Image';
import clsx from 'clsx';
import formatCurrency from '@/utils/formatCurrency';
import { Product } from '@/types/product';
import { useRouter } from 'next/navigation';
import { PATH } from '@/constants/path';

interface ProductCardProps {
  className?: string;
  data: Product;
}

const ProductCard: FC<ProductCardProps> = ({ data, className }) => {
  const route = useRouter();

  return (
    <div
      className={clsx(
        'h-full p-4 rounded-2xl bg-white dark:bg-dark-400 shadow-product-card-light dark:shadow-product-card-dark text-dark dark:text-white-200 hover:bg-gray-400 transition-all',
        className,
      )}
      onClick={() => {
        route.push(PATH.PRODUCT_DETAIL.replace(':productId', data?._id));
      }}
    >
      <div className="mx-auto w-[220px] h-[220px] bg-white dark:bg-dark-500 rounded-lg">
        <Image
          width={220}
          height={220}
          src={data.image}
          className="w-[220px] h-[220px] rounded-md bg-white dark:bg-dark-500"
          alt={data.name}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold h-[60px] transition-transform duration-300 overflow-hidden line-clamp-2">
          {data.name}
        </h2>

        <h3 className="text-sm text-gray-500 mt-4">{data.manufacturerId.name}</h3>

        <div className="flex justify-between my-3">
          <span className="text-base font-semibold">{formatCurrency(data.price)}</span>
          <div className="flex items-center gap-1">
            <Icon name="star" color="yellow-500" width="18px" height="18px" />
            <span className="text-base font-medium">{data.ratings}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
