'use client';

import React, { useEffect } from 'react';
import { useGetReviewByProductId } from '@/services/api/https/review';
import { Review } from '@/types/review';
import Image from './Image';
import Icon from './Icon';
import Pagination from './Pagination';
import { useTranslations } from 'next-intl';
import ReviewListSkeleton from './Skeletons/ReviewListSkeleton';
import { useQueryState } from '@/hooks/useQueryState';

interface ReviewListProps {
  productId: string;
}

const ReviewList: React.FC<ReviewListProps> = ({ productId }) => {
  const { page } = useQueryState();

  const {
    data: reviewData,
    isLoading: isLoadingReviewData,
    isValidating: isValidatingReviewData,
    mutate: refreshGetReviewData,
  } = useGetReviewByProductId({ productId, limit: 3, page: page });
  const t = useTranslations('productDetail');

  useEffect(() => {
    refreshGetReviewData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  if (isLoadingReviewData || isValidatingReviewData) {
    return <ReviewListSkeleton />;
  }

  if (!reviewData?.comments || reviewData.comments.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-6 bg-gray-600 dark:bg-dark-400 rounded-lg">
        <Icon name="cart" size={8} color="gray-500" className="mb-4" />
        <p className="text-center text-gray-500 text-lg">
          {t('noReview')}
          <br />
          {t('buyToReview')}
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6 gap-3">
        {reviewData.comments.map((comment: Review, index: number) => (
          <div key={index} className="flex items-start space-x-4 p-4 rounded-lg shadow-md bg-gray-600 dark:bg-dark-400">
            <div className="flex-shrink-0">
              <Image
                src={comment.userId?.avatar || ''}
                alt={comment.userId?.fullname || 'Avatar'}
                className="w-[70px] h-[70px] rounded-full"
                width={70}
                height={70}
              />
            </div>

            <div className="flex-grow">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium text-dark dark:text-white-200">
                  {comment.userId?.fullname || 'Anonymous'}
                </h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(comment.createdAt).toLocaleDateString()}
                </span>
              </div>
              {comment.userId?.email && (
                <p className="text-sm text-gray-500 dark:text-gray-400">{comment.userId.email}</p>
              )}
              <div className="flex items-center gap-1 my-2">
                {[...Array(comment.rating)].map((_, i) => (
                  <Icon key={`star-${i}`} name="star" size={1.2} color="yellow" />
                ))}
                {[...Array(5 - comment.rating)].map((_, i) => (
                  <Icon key={`emptyStar-${i}`} name="emptyStar" size={1.2} color="emerald" />
                ))}
              </div>
              <p className="mt-2 text-dark dark:text-white-200">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>
      <Pagination pageCount={reviewData?.totalPage} className="mt-7" />
    </div>
  );
};

export default ReviewList;
