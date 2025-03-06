import React, { Suspense } from 'react';
import ProductFilterSideBar from './SideBar/ProductFilterSideBar';
import ProductFilterTopBar from './ProductFilterTopBar';
import ProductList from '@/components/ProductList';
import { getQueryState } from '@/utils/getQueryState';

import ProductListSkeleton from '@/components/Skeletons/ProductListSkeleton';
import { ProductFilter } from '@/types/product';

const ProductPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { filters, page, keyword } = await getQueryState<ProductFilter>(searchParams);

  return (
    <div className="bg-gray-600 dark:bg-dark-500 py-14">
      <div className="container mx-auto grid xl:grid-cols-12 grid-cols-1 mt-10">
        <aside className="xl:col-span-3 col-span-full xl:mr-16">
          <ProductFilterSideBar />
        </aside>

        <main className="xl:col-span-9 col-span-full">
          <ProductFilterTopBar />

          <Suspense fallback={<ProductListSkeleton />}>
            <ProductList
              className="p-0"
              listClassName="xl:!grid-cols-4 !gap-3"
              page={page}
              filters={filters}
              keyword={keyword}
            />
          </Suspense>
        </main>
      </div>
    </div>
  );
};

export default ProductPage;
