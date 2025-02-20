import clsx from 'clsx';

interface ProductCardSkeletonProps {
  className?: string;
}

const ProductCardSkeleton = ({ className }: ProductCardSkeletonProps): JSX.Element => {
  return (
    <div
      className={clsx(
        'h-full p-4 rounded-2xl bg-white dark:bg-dark-400 shadow-product-card-light dark:shadow-product-card-dark animate-pulse',
        className,
      )}
    >
      <div className="mx-auto w-[220px] h-[220px] bg-gray-200 dark:bg-gray-500 rounded-lg"></div>

      <div className="mt-4">
        <div className="h-6 bg-gray-200 dark:bg-gray-500 rounded w-3/4"></div>

        <div className="h-4 bg-gray-200 dark:bg-gray-500 rounded w-1/2 mt-4"></div>

        <div className="flex justify-between my-3">
          <div className="h-6 bg-gray-200 dark:bg-gray-500 rounded w-1/4"></div>
          <div className="flex items-center gap-1">
            <div className="w-5 h-5 bg-gray-200 dark:bg-gray-500 rounded-full"></div>
            <div className="h-5 bg-gray-200 dark:bg-gray-500 rounded w-6"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
