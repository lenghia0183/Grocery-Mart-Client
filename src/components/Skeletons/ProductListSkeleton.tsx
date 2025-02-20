import clsx from 'clsx';
import ProductCardSkeleton from './productCardSkeleton';

interface ProductListSkeletonProps {
  count?: number;
  className?: string;
}

const ProductListSkeleton = ({ count = 8, className }: ProductListSkeletonProps): JSX.Element => {
  return (
    <div className={clsx('grid grid-cols-4 gap-3 mt-4', className)}>
      {Array.from({ length: count }).map((_, index) => (
        <ProductCardSkeleton key={index} />
      ))}
    </div>
  );
};

export default ProductListSkeleton;
