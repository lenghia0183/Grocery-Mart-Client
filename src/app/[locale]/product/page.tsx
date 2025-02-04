import React from 'react';
import ProductFilterSideBar from './ProductFilterSideBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import GoToTop from '@/components/GoToTop';
import ProductList from '@/components/ProductList';
import ProductFilterTopBar from './ProductFilterTopBar';
import { getQueryState } from '@/utils/getQueryState';

const ProductPage = async ({ searchParams }: { searchParams: { [key: string]: string | string[] | undefined } }) => {
  const { filters, page, keyword } = await getQueryState(searchParams);
  console.log('filter server', filters);
  console.log('page', page);
  console.log('keyword', keyword);

  return (
    <div className="bg-gray-600">
      <Header />
      <div className="container mx-auto grid grid-cols-12 mt-10">
        {/* Sidebar */}
        <aside className="col-span-3 mr-16">
          <ProductFilterSideBar />
        </aside>

        {/* Product List */}
        <main className="col-span-9">
          <ProductFilterTopBar />
          <ProductList className="p-0" listClassName="!grid-cols-4 !gap-3" />
        </main>
      </div>
      <Footer />
      <GoToTop />
    </div>
  );
};

export default ProductPage;
