'use server';

import React from 'react';

import ProductGallery from '@/components/ProductGallery';
import Icon from '@/components/Icon';
import ProductForm from './productForm';
import LabelValue from '@/components/LabelValue';
import Tabs from '@/components/Tabs';
import formatCurrency from '@/utils/formatCurrency';
import RelatedProducts from '@/components/RelatedProductList';
import { getTranslations } from 'next-intl/server';

const ProductDetail: React.FC = async () => {
  const t = await getTranslations('productDetail');

  const tabList = [
    { label: t('productInfo'), value: 'product-info' },
    { label: t('productComments'), value: 'product-comments' },
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

  return (
    <div className="dark:bg-dark-500 py-14">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="col-span-5">
            <ProductGallery images={fakeProduct.images} />
          </div>

          {/* Right Column */}
          <div className="col-span-7 bg-gray-600 dark:bg-dark-400 p-14 flex flex-col gap-4 rounded-xl">
            <h1 className="text-[28px] dark:text-white-200 font-semibold">{fakeProduct.name}</h1>

            <div className="flex text-lg flex-col gap-y-3">
              <LabelValue
                labelClassName="!font-normal dark:text-white-200"
                valueClassName="text-blue-500 dark:text-blue-400"
                label={t('stockStatus')}
                value={fakeProduct.inStock ? t('inStock') : t('outOfStock')}
              />

              <div className="flex items-center gap-2">
                <LabelValue
                  labelClassName="!font-normal dark:text-white-200"
                  valueClassName="text-blue-500 dark:text-blue-400"
                  label={t('brand')}
                  value={fakeProduct.branch}
                />

                <div className="w-[2px] bg-dark-300 h-[20px]"></div>

                <LabelValue
                  labelClassName="!font-normal dark:text-white-200"
                  valueClassName="text-blue-500 dark:text-blue-400"
                  label={t('productCode')}
                  value={fakeProduct.id}
                />
              </div>

              <div className="flex items-center gap-2 dark:text-white-200">
                <Icon name="star" color="yellow" />({fakeProduct.rating}) 350 {t('reviews')}
              </div>

              <p className="dark:text-white-200">{fakeProduct.description}</p>

              <ProductForm product={fakeProduct} />
            </div>
          </div>
        </div>

        <Tabs className="sm:mt-5 mt-3" list={tabList} divider={true}>
          <div className="text-dark-400 text-lg flex flex-col gap-3">
            <LabelValue label={t('brand')} value={fakeProduct.branch} labelWidth="200px" />
            <LabelValue label={t('productCode')} value={fakeProduct.id} labelWidth="200px" />
            <LabelValue label={t('productPrice')} value={formatCurrency(fakeProduct.price)} labelWidth="200px" />
            <LabelValue label={t('productDescription')} value={fakeProduct.description} labelWidth="200px" />
          </div>
          <LabelValue label={t('announcement')} value={t('comingSoon')} labelWidth="200px" />
        </Tabs>
      </div>
      <RelatedProducts />
    </div>
  );
};

export default ProductDetail;
