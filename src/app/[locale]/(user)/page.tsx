import Banner from '@/components/Banner';
import CategoryList from '@/components/CategoryList';

import ProductList from '@/components/ProductList';

export default function Hone() {
  return (
    <main className="dark:bg-dark-500 py-14">
      <Banner />

      <CategoryList />
      <ProductList />
    </main>
  );
}
