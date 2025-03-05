'use client';

import React from 'react';

interface ReviewListSkeletonProps {
  count?: number;
}

const ReviewListSkeleton: React.FC<ReviewListSkeletonProps> = ({ count = 3 }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className="flex items-start space-x-4 p-4 rounded-lg shadow-md bg-gray-600 dark:bg-dark-400 animate-pulse"
        >
          {/* Avatar Skeleton */}
          <div className="flex-shrink-0">
            <div className="w-[70px] h-[70px] rounded-full bg-gray-300 dark:bg-dark-500" />
          </div>

          {/* Nội dung Skeleton */}
          <div className="flex-grow space-y-2">
            <div className="flex justify-between items-center">
              <div className="w-1/2 h-4 bg-gray-300 dark:bg-dark-500 rounded" />
              <div className="w-1/4 h-4 bg-gray-300 dark:bg-dark-500 rounded" />
            </div>
            <div className="w-3/4 h-4 bg-gray-300 dark:bg-dark-500 rounded" />
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="w-4 h-4 bg-gray-300 dark:bg-dark-500 rounded-full" />
              ))}
            </div>
            <div className="space-y-1">
              <div className="w-full h-3 bg-gray-300 dark:bg-dark-500 rounded" />
              <div className="w-5/6 h-3 bg-gray-300 dark:bg-dark-500 rounded" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewListSkeleton;
