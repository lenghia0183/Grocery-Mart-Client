const CartSkeleton = () => {
  return (
    <div className="">
      <div className="bg-gray-100 dark:bg-dark-500 py-14 dark:text-white-200">
        <main className="container">
          <div className="grid grid-cols-12 gap-x-10">
            {/* Skeleton cho danh sách sản phẩm trong giỏ hàng */}
            <div className="col-span-8 p-10 flex flex-col gap-5 bg-white dark:bg-dark-400 shadow-md rounded-md">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex gap-5 border-b border-gray-200 dark:border-gray-700 pb-5">
                  {/* Ảnh sản phẩm */}
                  <div className="w-[150px] h-[150px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
                  <div className="flex flex-col justify-between flex-1">
                    {/* Tiêu đề sản phẩm */}
                    <div className="flex justify-between">
                      <div className="h-6 w-2/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                      <div className="h-6 w-[100px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                    </div>
                    {/* Giá và trạng thái tồn kho */}
                    <div className="flex items-center gap-2">
                      <div className="h-5 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                      <div className="h-5 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                    </div>
                    {/* Hãng sản xuất và quantity input */}
                    <div className="flex gap-3">
                      <div className="h-8 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                      <div className="h-8 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                    </div>
                  </div>
                </div>
              ))}

              {/* Row tóm tắt giỏ hàng */}
              <div className="flex justify-between items-center pt-5">
                {/* Nút "Tiếp tục mua sắm" với icon */}
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
                  <div className="h-8 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                </div>
                {/* Tổng tiền và các thông tin */}
                <div className="flex flex-col gap-3 w-1/2">
                  <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                  <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                  <div className="h-8 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                </div>
              </div>
            </div>

            {/* Skeleton cho phần thanh toán */}
            <div className="col-span-4">
              <div className="flex flex-col gap-3 bg-white dark:bg-dark-400 p-10 shadow-md rounded-md">
                <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-6 w-28 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded mt-5" />
              </div>
              <div className="flex bg-white dark:bg-dark-400 px-10 py-7 shadow-md rounded-md mt-7 gap-4">
                {/* Ảnh quà tặng */}
                <div className="w-[70px] h-[70px] flex-shrink-0 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />
                <div className="flex flex-col justify-between w-full">
                  <div className="h-10 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                  <div className="h-10 w-full mt-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CartSkeleton;
