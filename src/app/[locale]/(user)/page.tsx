import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';

import ProductList from '@/components/ProductList';

import ProductListSkeleton from '@/components/Skeletons/ProductListSkeleton';
import { getQueryState } from '@/utils/getQueryState';
import { Suspense } from 'react';

export default async function Hone({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await getQueryState(searchParams);

  return (
    <main className="dark:bg-dark-500 py-14">
      <Banner />

      <CategoryList />

      <Suspense fallback={<ProductListSkeleton count={10} className="container grid-cols-5" />}>
        <ProductList page={page} filters={{ limit: 10, minRating: 1 }} />
      </Suspense>
    </main>
  );
}
