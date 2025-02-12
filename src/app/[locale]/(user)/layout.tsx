'use server';

import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';
import Header from '@/components/Header';

export default async function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <GoToTop />
    </>
  );
}
