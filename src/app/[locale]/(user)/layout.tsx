import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';
import Header from '@/components/header';

export default function UserLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <GoToTop />
    </>
  );
}
