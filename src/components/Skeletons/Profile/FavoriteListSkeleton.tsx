import React from 'react';
import clsx from 'clsx';
import ProductListSkeleton from '../ProductListSkeleton';
interface FavoriteListSkeletonProps {
  className?: string;
  listClassName?: string;
}

const FavoriteListSkeleton: React.FC<FavoriteListSkeletonProps> = ({ className }) => {
  return (
    <div className="p-7 bg-white dark:bg-dark-400 shadow-md rounded-lg dark:text-white animate-pulse">
      <div className="h-8 w-60 bg-gray-300 dark:bg-dark-600 rounded mb-4"></div>
      <div className="h-[1px] w-full bg-gray-300 dark:bg-dark-500 rounded mt-[10px]"></div>

      <div className={clsx('flex flex-col', className)}>
        <ProductListSkeleton
          count={4}
          className=""
          listClassName="xl:!grid-cols-4 md:!grid-cols-3 !grid-cols-1 md:px-0 !gap-3 mt-7"
        />
      </div>
    </div>
  );
};

export default FavoriteListSkeleton;
