import React, { Suspense } from 'react';
import ProductFilterSideBar from './ProductFilterSideBar';
import ProductFilterTopBar from './ProductFilterTopBar';
import ProductList from '@/components/ProductList';
import { getQueryState } from '@/utils/getQueryState';

import ProductListSkeleton from '@/components/Skeletons/ProductListSkeleton';

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { filters, page, keyword } = await getQueryState(searchParams);

  return (
    <div className="bg-gray-600 dark:bg-dark-500 py-14">
      <div className="container mx-auto grid grid-cols-12 mt-10">
        <aside className="col-span-3 mr-16">
          <ProductFilterSideBar />
        </aside>

        <main className="col-span-9">
          <ProductFilterTopBar />

          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList
              className="p-0"
              listClassName="!grid-cols-4 !gap-3"
              page={page}
              filters={filters}
              keyWords={keyword}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
