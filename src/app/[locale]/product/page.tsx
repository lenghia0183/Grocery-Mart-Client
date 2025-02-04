import React from 'react';
import ProductFilterSideBar from './ProductFilterSideBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';

const ProductPage = async ({ searchParams }: { searchParams: string }) => {
  // Fetch data on the server side

  return (
    <div>
      <Header />
      <div className="container mx-auto grid grid-cols-12 gap-6 p-6">
        {/* Sidebar */}
        <aside className="col-span-3 mr-16">
          <ProductFilterSideBar />
        </aside>

        {/* Product List */}
        <main className="col-span-3">{/* <ProductList products={products} /> */}</main>
      </div>
      <Footer />
      <GoToTop />
    </div>
  );
};

export default ProductPage;
