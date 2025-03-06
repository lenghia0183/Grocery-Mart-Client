import React from 'react';
import clsx from 'clsx';

interface OrderListSkeletonProps {
  count?: number;
  className?: string;
}

const OrderListSkeleton: React.FC<OrderListSkeletonProps> = ({ count = 3, className }) => {
  return (
    <div
      className={clsx('p-7 bg-white dark:bg-dark-400 shadow-md rounded-lg dark:text-white animate-pulse', className)}
    >
      {/* Tiêu đề (title) */}
      <div className="h-8 w-32 bg-gray-300 dark:bg-dark-600 rounded mb-4"></div>

      {/* Divider giả lập */}
      <div className="h-[1px] w-full bg-gray-300 dark:bg-dark-500 rounded my-[10px]"></div>

      {/* Tabs giả lập */}
      <div className="h-[60px] w-full mt-3 sm:mt-5 bg-gray-300 dark:bg-dark-500 rounded mb-4" />

      {/* Danh sách đơn hàng (một cột) */}
      <div className="flex flex-col gap-4">
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="p-4 sm:p-5 shadow-md bg-gray-100 dark:bg-dark-500 rounded-lg animate-pulse">
            {/* Thông tin đơn hàng */}
            <div className="flex flex-col gap-2">
              {/* Payment Method */}
              <div className="flex items-center gap-2">
                <div className="w-[150px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                <div className="w-[180px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
              {/* Payment Status */}
              <div className="flex items-center gap-2">
                <div className="w-[150px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                <div className="w-[180px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
              {/* Buyer Name */}
              <div className="flex items-center gap-2">
                <div className="w-[150px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                <div className="w-[180px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
              {/* Recipient Name */}
              <div className="flex items-center gap-2">
                <div className="w-[150px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                <div className="w-[180px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
              {/* Address */}
              <div className="flex items-center gap-2">
                <div className="w-[150px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                <div className="w-[300px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
            </div>

            {/* Tiêu đề danh sách sản phẩm */}
            <div className="mt-5 h-5 w-40 bg-gray-300 dark:bg-dark-400 rounded mx-auto" />

            {/* Divider giả lập */}
            <div className="h-[1px] w-[80%] bg-gray-300 dark:bg-dark-400 rounded mx-auto my-3" />

            {/* Accordion giả lập (một vài sản phẩm) */}
            <div className="space-y-3">
              {/* Sản phẩm 1 */}
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center py-3">
                  <div className="flex gap-3 w-full sm:w-1/2">
                    <div className="w-20 h-20 sm:w-[100px] sm:h-[100px] bg-gray-300 dark:bg-dark-400 rounded" />
                    <div className="flex flex-col gap-1">
                      <div className="w-[150px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                      <div className="w-[80px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mt-2 sm:mt-0">
                    <div className="w-6 h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                    <div className="w-6 h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                    <div className="w-[80px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-3">
                  <div className="w-[140px] h-8 bg-gray-300 dark:bg-dark-400 rounded" />
                  <div className="w-[140px] h-8 bg-gray-300 dark:bg-dark-400 rounded" />
                </div>
                <div className="h-[1px] w-full bg-gray-300 dark:bg-dark-400 rounded" />
              </div>

              {/* Sản phẩm 2 (giả lập) */}
              <div>
                <div className="flex flex-col sm:flex-row justify-between items-center py-3">
                  <div className="flex gap-3 w-full sm:w-1/2">
                    <div className="w-20 h-20 sm:w-[100px] sm:h-[100px] bg-gray-300 dark:bg-dark-400 rounded" />
                    <div className="flex flex-col gap-1">
                      <div className="w-[150px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                      <div className="w-[80px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                    </div>
                  </div>
                  <div className="flex gap-4 items-center mt-2 sm:mt-0">
                    <div className="w-6 h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                    <div className="w-6 h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                    <div className="w-[80px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row justify-between items-center gap-2 mb-3">
                  <div className="w-[140px] h-8 bg-gray-300 dark:bg-dark-400 rounded" />
                  <div className="w-[140px] h-8 bg-gray-300 dark:bg-dark-400 rounded" />
                </div>
                <div className="h-[1px] w-full bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
            </div>

            {/* Tổng tiền đơn hàng */}
            <div className="flex flex-col gap-2 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-[170px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                <div className="w-[100px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[170px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                <div className="w-[100px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
              <div className="flex items-center gap-2">
                <div className="w-[170px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
                <div className="w-[100px] h-4 bg-gray-300 dark:bg-dark-400 rounded" />
              </div>
            </div>

            {/* Các hành động (Cancel / Continue Checkout) */}
            <div className="mt-7 ml-auto flex flex-wrap gap-3 justify-end">
              <div className="w-[80px] h-8 bg-gray-300 dark:bg-dark-400 rounded" />
              <div className="w-[120px] h-8 bg-gray-300 dark:bg-dark-400 rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderListSkeleton;
