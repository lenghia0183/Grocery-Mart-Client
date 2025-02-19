import React, { Suspense } from 'react';
import ProductFilterSideBar from './ProductFilterSideBar';
import ProductFilterTopBar from './ProductFilterTopBar';
import ProductList from '@/components/ProductList';
import { getQueryState } from '@/utils/getQueryState';

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { filters, page, keyword } = await getQueryState(searchParams);

  return (
    <div className="bg-gray-600 dark:bg-dark-500 py-14">
      <div className="container mx-auto grid grid-cols-12 mt-10">
        <aside className="col-span-3 mr-16">
          <ProductFilterSideBar />
        </aside>

        <main className="col-span-9">
          <ProductFilterTopBar />

          {/* Bọc ProductList trong Suspense để hiển thị loading */}
          <Suspense fallback={<div className="text-yellow-500 text-center py-5">Đang tải sản phẩm...</div>}>
            <ProductList className="p-0" listClassName="!grid-cols-4 !gap-3" />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
