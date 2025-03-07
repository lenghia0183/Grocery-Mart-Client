const CartSkeleton = () => {
  return (
    <div className="bg-gray-100 dark:bg-dark-500 py-14 dark:text-white-200">
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Cột trái: Danh sách sản phẩm */}
          <div className="xl:col-span-8 col-span-1 bg-white dark:bg-dark-400 shadow-md rounded-md p-4 xl:p-10 flex flex-col gap-5">
            {/* Mô phỏng nhiều item bằng map */}
            {[1, 2, 3].map((item) => (
              <div key={item}>
                <div className="flex gap-5">
                  {/* Ảnh sản phẩm */}
                  <div className="md:w-[150px] md:h-[150px] w-[100px] h-[100px] bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md" />

                  {/* Thông tin chi tiết sản phẩm */}
                  <div className="flex-1 flex flex-col md:flex-row justify-between">
                    {/* Bên trái: Tên, giá, trạng thái, hãng, số lượng */}
                    <div className="flex flex-col justify-between">
                      {/* Tên sản phẩm */}
                      <div>
                        <div className="h-4 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-2" />
                        <div className="h-4 w-1/2 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-2" />
                      </div>
                      {/* Giá + Divider + Trạng thái kho */}
                      <div className="flex items-center gap-2 mb-2">
                        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                        <div className="h-5 w-[2px] bg-gray-300 dark:bg-gray-700 animate-pulse" />
                        <div className="h-5 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                      </div>
                      {/* Hãng sản xuất + ô nhập số lượng */}
                      <div className="flex gap-3 md:flex-row flex-col items-start">
                        <div className="h-10 w-16 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                        <div className="h-10 w-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                      </div>
                    </div>

                    {/* Bên phải: Tổng tiền + nút Xóa */}
                    <div className="flex md:flex-col flex-row items-center xl:items-end justify-between mt-4 md:mt-0">
                      <div className="h-6 w-24 bg-gray-300 dark:bg-gray-700 animate-pulse rounded mb-2" />
                      <div className="flex items-center gap-2">
                        <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                        <div className="h-5 w-10 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                      </div>
                    </div>
                  </div>
                </div>
                {/* Divider giữa các item */}
                <div className="border-b border-gray-200 dark:border-gray-700 mt-5" />
              </div>
            ))}

            {/* Dòng dưới cùng: Tiếp tục mua sắm + Tóm tắt đơn (chỉ hiển thị trên desktop) */}
            <div className="xl:flex hidden flex-col md:flex-row justify-between items-start md:items-center pt-4 gap-4">
              {/* Nút "Tiếp tục mua sắm" + icon */}
              <div className="flex items-center gap-2">
                <div className="h-5 w-5 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-full" />
                <div className="h-5 w-32 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
              </div>

              {/* Tóm tắt đơn hàng (Tổng giá trị, phụ phí, tổng tiền) */}
              <div className="flex flex-col gap-3 w-full md:w-1/2">
                <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-5 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-6 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
              </div>
            </div>
          </div>

          {/* Cột phải: Card tổng hợp + Card quà tặng */}
          <div className="xl:col-span-4 col-span-1 flex flex-col gap-6">
            {/* Card 1: Tổng hợp đơn hàng */}
            <div className="bg-white dark:bg-dark-400 shadow-md rounded-md p-6 flex flex-col gap-4">
              {/* Tổng số lượng sản phẩm */}
              <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
              {/* Tổng giá trị đơn hàng */}
              <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
              {/* Phụ phí */}
              <div className="h-4 w-1/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
              {/* Divider */}
              <div className="h-[1px] w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
              {/* Tổng tiền thanh toán */}
              <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
              {/* Nút "Tiến hành thanh toán" */}
              <div className="h-10 w-full bg-gray-300 dark:bg-gray-700 animate-pulse rounded mt-2" />
            </div>

            {/* Card 2: Gửi đơn hàng như một món quà */}
            <div className="bg-white dark:bg-dark-400 shadow-md rounded-md flex gap-4 p-6">
              {/* Icon quà tặng */}
              <div className="w-16 h-16 md:w-20 md:h-20 bg-gray-300 dark:bg-gray-700 animate-pulse rounded-md flex-shrink-0" />
              {/* Nội dung text */}
              <div className="flex flex-col justify-center gap-2 w-full">
                <div className="h-4 w-2/3 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
                <div className="h-4 w-3/4 bg-gray-300 dark:bg-gray-700 animate-pulse rounded" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CartSkeleton;
