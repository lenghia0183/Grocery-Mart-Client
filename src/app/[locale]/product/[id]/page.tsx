import React from 'react';
import ProductGallery from '@/components/ProductGallery';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Icon from '@/components/Icon';
import ProductForm from './productForm';
import LabelValue from '@/components/LabelValue';
import Tabs from '@/components/Tabs';
import formatCurrency from '@/utils/formatCurrency';
import RelatedProducts from '@/components/RelatedProductList';

const tabList = [
  { label: 'Thông tin sản phẩm', value: 'product-info' },
  { label: 'Bình luận', value: 'product-comments' },
];

const fakeProduct = {
  id: 'PROD123456',
  name: 'Organic Matcha Green Tea Powder - Premium Grade',
  price: 150000.0,
  description:
    'Premium organic matcha green tea powder, rich in antioxidants and perfect for lattes, baking, and smoothies. Sourced from the finest Japanese tea leaves.',
  images: [
    'https://img.freepik.com/free-photo/matcha-green-tea-powder-wooden-bowl_1150-11201.jpg',
    'https://img.freepik.com/free-photo/green-tea-leaves-bowl_144627-16144.jpg',
    'https://img.freepik.com/free-photo/matcha-green-tea-latte_1150-19189.jpg',
    'https://img.freepik.com/free-photo/japanese-ceramic-tea-set-matcha_1150-19190.jpg',
    'https://img.freepik.com/free-photo/matcha-green-tea-traditional-wooden-spoon_1150-11202.jpg',
  ],
  rating: 4.8,
  inStock: true,
  branch: 'Japanese Organic Tea Co.',
};

const ProductDetail: React.FC = () => {
  return (
    <>
      <Header />
      <div className="dark:bg-dark-500 py-10">
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left Column */}
            <div className="col-span-5">
              <ProductGallery images={fakeProduct.images} />
            </div>

            {/* Right Column */}
            <div className="col-span-7 bg-gray-600 dark:bg-dark-400 p-14 flex flex-col gap-4 rounded-xl">
              <h1 className="text-[28px] dark:text-white font-semibold">{fakeProduct.name}</h1>

              <div className="flex text-lg flex-col gap-y-3">
                <LabelValue
                  labelClassName="!font-normal dark:text-white"
                  valueClassName="text-blue-500 dark:text-blue-400"
                  label="Tình trạng tồn kho:"
                  value={fakeProduct.inStock ? 'Còn hàng' : 'Hết hàng'}
                />

                <div className="flex items-center gap-2">
                  <LabelValue
                    labelClassName="!font-normal dark:text-white"
                    valueClassName="text-blue-500 dark:text-blue-400"
                    label="Thương hiệu:"
                    value={fakeProduct.branch}
                  />

                  <div className="w-[2px] bg-dark-300 h-[20px]"></div>

                  <LabelValue
                    labelClassName="!font-normal dark:text-white"
                    valueClassName="text-blue-500 dark:text-blue-400"
                    label="Mã sản phẩm:"
                    value={fakeProduct.id}
                  />
                </div>

                <div className="flex items-center gap-2 dark:text-white">
                  <Icon name="star" color="yellow" />({fakeProduct.rating}) 350 reviews
                </div>

                <p className="dark:text-white">{fakeProduct.description}</p>

                <ProductForm product={fakeProduct} />
              </div>
            </div>
          </div>

          <Tabs className="sm:mt-5 mt-3" list={tabList} divider={true}>
            <div className="text-dark-400 text-lg flex flex-col gap-3">
              <LabelValue label="Thương hiệu:" value={fakeProduct.branch} labelWidth="200px" />
              <LabelValue label="Mã sản phẩm:" value={fakeProduct.id} labelWidth="200px" />
              <LabelValue label="Giá sản phẩm:" value={formatCurrency(fakeProduct.price)} labelWidth="200px" />
              <LabelValue label="Giới thiệu sản phẩm:" value={fakeProduct.description} labelWidth="200px" />
            </div>
            <LabelValue label="Thông báo" value="Chức năng này sẽ sớm được ra mắt" labelWidth="200px" />
          </Tabs>
        </div>
        <RelatedProducts />
      </div>

      <Footer />
    </>
  );
};

export default ProductDetail;
