import { FC } from 'react';
import Icon from './Icon';
import Image from './Image';

interface ProductCardProps {
  data: {
    thumbnail: string;
    alt: string;
    nameProduct: string;
    maker: string;
    price: string;
    startRate: number;
  };
}

const ProductCard: FC<ProductCardProps> = ({ data }) => {
  return (
    <div className="h-full p-4 rounded-2xl bg-white dark:bg-dark-400 shadow-product-card-light dark:shadow-product-card-dark text-dark dark:text-white hover:bg-gray-400 transition-all">
      <div className="mx-auto w-[220px] h-[220px] bg-white dark:bg-dark-500 rounded-lg">
        <Image
          width={220}
          height={220}
          src={data.thumbnail}
          className="w-[220px] h-[220px] rounded-md bg-white dark:bg-dark-500"
          alt={data.alt}
        />
      </div>

      <div className="mt-4">
        <h2 className="mb-4 text-lg font-semibold min-h-15 max-h-15 transition-transform duration-300">
          {data.nameProduct}
        </h2>

        <h3 className="text-sm text-gray-500">{data.maker}</h3>

        <div className="flex justify-between my-3">
          <span className="text-base font-semibold">{data.price}</span>
          <div className="flex items-center gap-1">
            <Icon name="star" color="yellow-500" width="18px" height="18px" />
            <span className="text-base font-medium">{data.startRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
