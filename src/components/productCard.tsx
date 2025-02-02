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
    <div className="h-full p-4 rounded-2xl shadow-product-card-light bg-white hover:bg-gray-400 transition-all">
      <div className="mx-auto rounded-lg w-[220px] h-[220px] bg-white">
        <Image
          width={220}
          height={220}
          src={data.thumbnail}
          className="rounded-lg w-[220px] h-[220px] bg-white"
          alt={data.alt}
        />
      </div>

      <div className="mt-4">
        <h2 className="text-lg font-semibold max-h-15 min-h-15 mb-4 text-dark transition-transform duration-300">
          {data.nameProduct}
        </h2>

        <h3 className="text-sm  text-gray-500">{data.maker}</h3>

        <div className="flex justify-between my-3">
          <span className="text-base font-semibold text-dark">{data.price}</span>
          <div className="flex items-center gap-1">
            <Icon name="star" color="yellow" />
            <span className="text-base font-medium text-dark">{data.startRate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
