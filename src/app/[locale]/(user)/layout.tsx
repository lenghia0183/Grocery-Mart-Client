'use server';

import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';
import Header from '@/components/Header/Header';

import { Suspense } from 'react';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <Suspense fallback={<div>loading...</div>}>{children}</Suspense>

      <Footer />
      <GoToTop />
    </>
  );
}
