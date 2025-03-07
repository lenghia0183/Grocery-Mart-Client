import clsx from 'clsx';
import ProductCardSkeleton from './productCardSkeleton';

interface ProductListSkeletonProps {
  count?: number;
  className?: string;
  listClassName?: string;
}

const ProductListSkeleton = ({ count = 8, className, listClassName }: ProductListSkeletonProps): JSX.Element => {
  return (
    <div className={clsx('', className)}>
      <div className={clsx('grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5 xl:gap-7 gap-3', listClassName)}>
        {Array.from({ length: count }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
};

export default ProductListSkeleton;
