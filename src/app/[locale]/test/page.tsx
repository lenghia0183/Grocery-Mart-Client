import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';
import Header from '@/components/Header';
import ProductList from '@/components/ProductList';

export default function Test() {
  return (
    <main>
      <Header />
      <Banner className="mt-10" />

      <CategoryList />
      <ProductList />
      <div className="container"></div>
      <GoToTop />
      <Footer />
    </main>
  );
}
