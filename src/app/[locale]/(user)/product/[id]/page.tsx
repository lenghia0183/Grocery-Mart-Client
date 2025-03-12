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
import { api } from '@/services/api/axios';
import { ProductDetail as ProductDetailType } from '@/types/product';
import ReviewList from '@/components/ReviewList';
import formatNumber from '@/utils/formatNumber';

const fetchProductDetails = async (id: string) => {
  const response = await api.get<ProductDetailType>(`v1/product/${id}`);

  return response?.data;
};

const ProductDetail = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;

  const t = await getTranslations('productDetail');

  const tabList = [
    { label: t('productInfo'), value: 'product-info' },
    { label: t('productComments'), value: 'product-comments' },
  ];

  const fakeProduct = await fetchProductDetails(id);

  return (
    <div className="dark:bg-dark-500 py-14">
      <div className="container">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-10">
          {/* Left Column */}
          <div className="xl:col-span-5 col-span-full">
            <ProductGallery images={fakeProduct?.images || []} />
          </div>

          {/* Right Column */}
          <div className="xl:col-span-7 col-span-full bg-gray-600 dark:bg-dark-400 xl:p-14 p-7 flex flex-col gap-4 rounded-xl">
            <h1 className="text-[28px] dark:text-white-200 font-semibold">{fakeProduct?.name || ''}</h1>

            <div className="flex text-lg flex-col gap-y-3">
              <LabelValue
                labelClassName="!font-normal dark:text-white-200"
                valueClassName="text-blue-500 dark:text-blue-400"
                label={t('stockStatus')}
                value={fakeProduct?.inStock ? t('inStock') : t('outOfStock')}
              />

              <div className="flex xl:flex-row flex-col xl:items-center gap-2">
                <LabelValue
                  labelClassName="!font-normal dark:text-white-200"
                  valueClassName="text-blue-500 dark:text-blue-400"
                  label={t('brand')}
                  value={fakeProduct?.manufacturerId?.name}
                />

                <div className="w-[2px] bg-dark-300 h-[20px] xl:block hidden"></div>

                <LabelValue
                  labelClassName="!font-normal dark:text-white-200"
                  valueClassName="text-blue-500 dark:text-blue-400"
                  label={t('productCode')}
                  value={fakeProduct?.code}
                />
              </div>

              <div className="flex items-center gap-2 dark:text-white-200">
                <Icon name="star" color="yellow" />({formatNumber(fakeProduct?.ratings)}) 350 {t('reviews')}
              </div>

              <p className="dark:text-white-200">{fakeProduct?.description}</p>

              <ProductForm product={fakeProduct || null} />
            </div>
          </div>
        </div>

        <Tabs className="sm:mt-5 mt-3 mb-7" list={tabList} divider={true}>
          <div className="text-dark-400 text-lg flex flex-col gap-3">
            <LabelValue label={t('brand')} value={fakeProduct?.manufacturerId?.name} labelWidth="150px" />
            <LabelValue label={t('productCode')} value={fakeProduct?.code} labelWidth="150px" />
            <LabelValue label={t('productPrice')} value={formatCurrency(fakeProduct?.price)} labelWidth="150px" />
            <LabelValue label={t('productDescription')} value={fakeProduct?.description} labelWidth="150px" />
          </div>
          {/* <LabelValue label={t('announcement')} value={t('comingSoon')} labelWidth="200px" /> */}
          <ReviewList productId={fakeProduct?._id || ''} />
        </Tabs>
      </div>
      <RelatedProducts product={fakeProduct || null} />
    </div>
  );
};

export default ProductDetail;
