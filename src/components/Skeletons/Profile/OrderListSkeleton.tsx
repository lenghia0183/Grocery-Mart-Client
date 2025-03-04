import React from 'react';
import clsx from 'clsx';

interface OrderListSkeletonProps {
  count?: number;
  className?: string;
}

const OrderListSkeleton: React.FC<OrderListSkeletonProps> = ({ count = 3, className }) => {
  return (
    <div className="p-7 bg-white dark:bg-dark-400 shadow-md rounded-lg dark:text-white animate-pulse">
      <div className="h-6 w-60 bg-gray-300 dark:bg-dark-600 rounded mb-4"></div>
      <div className="h-[1px] w-full bg-gray-300 dark:bg-dark-500 rounded mb-4"></div>

      <div className="h-[50px] w-full bg-gray-300 dark:bg-dark-500 rounded mb-4"></div>

      <div className={clsx('flex flex-col gap-y-7', className)}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="p-5 shadow-md bg-gray-100 dark:bg-dark-500 animate-pulse">
            <div className="flex justify-between">
              <div className="h-5 bg-gray-300 dark:bg-dark-400 rounded w-1/2 mb-3"></div>
              <div className="h-5 bg-gray-300 dark:bg-dark-400 rounded w-[10%] mb-3"></div>
            </div>
            <div className="h-5 bg-gray-300 dark:bg-dark-400 rounded w-1/5 mb-3"></div>
            <div className="h-5 bg-gray-300 dark:bg-dark-400 rounded w-1/5 mb-3"></div>
            <div className="h-5 bg-gray-300 dark:bg-dark-400 rounded w-1/3 mb-3"></div>
            <div className="mt-5 space-y-2">
              <div className="h-7 bg-gray-300 dark:bg-dark-400 rounded w-1/5 m-auto"></div>
              <div className="h-20 bg-gray-300 dark:bg-dark-400 rounded w-full mt-3"></div>
              <div className="h-20 bg-gray-300 dark:bg-dark-400 rounded w-1/3"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderListSkeleton;
