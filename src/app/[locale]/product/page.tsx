import React from 'react';
import ProductFilterSideBar from './ProductFilterSideBar';

const ProductPage = async ({ searchParams }: { searchParams: string }) => {
  // Fetch data on the server side

  return (
    <div className="container mx-auto grid grid-cols-12 gap-6 p-6">
      {/* Sidebar */}
      <aside className="col-span-3 mr-16">
        <ProductFilterSideBar />
      </aside>

      {/* Product List */}
      <main className="col-span-3">{/* <ProductList products={products} /> */}</main>
    </div>
  );
};

export default ProductPage;
