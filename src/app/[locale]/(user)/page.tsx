import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';

import ProductList from '@/components/ProductList';

import ProductListSkeleton from '@/components/Skeletons/ProductListSkeleton';
import { getQueryState } from '@/utils/getQueryState';
import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';

export const revalidate = 900; // 15 phút (900 giây)

export async function generateStaticParams() {
  return [1, 2, 3].map((page) => ({ searchParams: { page: page.toString() } }));
}

export default async function Hone({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { page } = await getQueryState(searchParams);
  const t = await getTranslations('home');
  return (
    <main className="dark:bg-dark-500 py-14">
      <Banner />

      <CategoryList />

      <h2 className="container mt-10 mb-5 text-2xl font-semibold text-dark dark:text-white-200">{t('latest')}</h2>
      <Suspense
        fallback={
          <ProductListSkeleton
            count={10}
            className="container"
            listClassName="!grid-cols-1 md:!grid-cols-3 xl:!grid-cols-5 md:px-0 px-6"
          />
        }
      >
        <ProductList
          page={page}
          filters={{ limit: 10, minRating: 1 }}
          className="container"
          listClassName="!grid-cols-1 md:!grid-cols-3 xl:!grid-cols-5 md:px-0 px-6"
        />
      </Suspense>
    </main>
  );
}
