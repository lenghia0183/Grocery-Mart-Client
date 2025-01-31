import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';
import GoToTop from '@/components/GoToTop';
import Header from '@/components/Header';

export default function Test() {
  return (
    <main>
      <Header />
      <Banner className="mt-10" />

      <CategoryList />
      <div className="container"></div>
      <GoToTop />
    </main>
  );
}
