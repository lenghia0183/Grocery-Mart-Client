import React from 'react';
import ProductListSkeleton from './ProductListSkeleton';

const ProductDetailSkeleton = () => {
  return (
    <div className="dark:bg-dark-500 py-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Cột bên trái - Hình ảnh sản phẩm */}
          <div className="col-span-5">
            {/* Ảnh sản phẩm chính */}
            <div className="w-full aspect-square bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md"></div>
            {/* Ảnh nhỏ bên dưới */}
            <div className="flex mt-3 gap-2">
              {Array(5)
                .fill(null)
                .map((_, index) => (
                  <div
                    key={index}
                    className="w-[20%] aspect-square bg-gray-200 dark:bg-gray-500 animate-pulse rounded-md"
                  ></div>
                ))}
            </div>
          </div>

          {/* Cột bên phải - Thông tin sản phẩm */}
          <div className="col-span-7 bg-gray-600 dark:bg-dark-400 p-14 flex flex-col gap-4 rounded-xl">
            {/* Tiêu đề sản phẩm */}
            <div className="h-6 w-3/4 bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>

            <div className="flex flex-col gap-y-3">
              {/* Giá sản phẩm */}
              <div className="h-5 w-1/3 bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
              {/* Giá gốc (gạch ngang nếu có) */}
              <div className="h-5 w-2/5 bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>

              {/* Xếp hạng & số lượng đánh giá */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-20 bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
                <div className="w-[2px] bg-dark-300 h-[20px]"></div>
                <div className="h-5 w-20 bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
              </div>

              {/* Thông tin bổ sung */}
              <div className="h-5 w-1/2 bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>

              {/* Mô tả sản phẩm */}
              <div className="h-20 w-full bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>

              {/* Nút thêm vào giỏ hàng */}
              <div className="h-6 w-1/5 bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
              <div className="h-10 w-1/3 bg-gray-400 dark:bg-gray-500 animate-pulse rounded"></div>

              <div className="w-1/2 aspect-video ml-auto mt-10 bg-gray-300 dark:bg-gray-500 animate-pulse rounded"></div>
            </div>
          </div>
        </div>

        {/* Tabs (Mô tả - Đánh giá) */}
        <div className="mt-5">
          {/* Thanh điều hướng tab */}
          <div className="flex gap-5 border-b border-gray-300 pb-2">
            {Array(2)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="h-6 w-32 bg-gray-200 dark:bg-gray-500 animate-pulse rounded"></div>
              ))}
          </div>
          {/* Nội dung tab */}
          <div className="mt-3 space-y-3">
            {Array(4)
              .fill(null)
              .map((_, index) => (
                <div key={index} className="h-5 w-3/4 bg-gray-200 dark:bg-gray-500 animate-pulse rounded"></div>
              ))}
          </div>
        </div>

        {/* Sản phẩm liên quan */}
        <div className="mt-10">
          {/* Tiêu đề "Sản phẩm liên quan" */}
          <div className="h-10 w-64 bg-gray-200 dark:bg-gray-500 animate-pulse rounded mb-3"></div>
          {/* Danh sách sản phẩm */}

          <ProductListSkeleton count={5} className="grid-cols-5" />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
