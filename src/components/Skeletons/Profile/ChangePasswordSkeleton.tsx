import React from 'react';

const ChangePasswordSkeleton = () => {
  return (
    <div className="p-7 bg-white dark:bg-dark-400 shadow-md rounded-lg dark:text-white animate-pulse">
      <div className="h-8 w-32 bg-gray-300 dark:bg-dark-600 rounded mb-4"></div>
      <div className="h-[1px] w-full bg-gray-300 dark:bg-dark-500 rounded my-[10px]"></div>

      <div className="grid xl:grid-cols-2 gap-7 mt-6">
        {/* Mật khẩu hiện tại */}
        <div className="flex flex-col">
          <div className="h-6 w-24 bg-gray-300 dark:bg-dark-600 rounded mb-2"></div>
          <div className="h-11 bg-gray-300 dark:bg-dark-500 rounded"></div>
        </div>

        {/* Mật khẩu mới */}
        <div className="flex flex-col">
          <div className="h-6 w-24 bg-gray-300 dark:bg-dark-600 rounded mb-2"></div>
          <div className="h-11 bg-gray-300 dark:bg-dark-500 rounded"></div>
        </div>
      </div>

      <div className="grid xl:grid-cols-2 gap-7 mt-7">
        {/* Xác nhận mật khẩu mới */}
        <div className="flex flex-col">
          <div className="h-6 w-24 bg-gray-300 dark:bg-dark-600 rounded mb-2"></div>
          <div className="h-11 bg-gray-300 dark:bg-dark-500 rounded"></div>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex justify-end gap-7 ml-auto mt-10">
        <div className="h-11 w-24 bg-gray-300 dark:bg-dark-500 rounded"></div>
        <div className="h-11 w-28 bg-gray-400 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );
};

export default ChangePasswordSkeleton;
