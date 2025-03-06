'use client';

import React from 'react';
import { Formik, Form } from 'formik';

import Icon from '@/components/Icon';

import Button from '@/components/Button';

import clsx from 'clsx';
import TextField from '@/components/TextField';

import { useQueryState } from '@/hooks/useQueryState';

import Divider from '@/components/Divider';
import ManufacturerList from './ManufacturerList';
import CategoryList from './CategoryList';
import { ProductFilter, ProductFilterFormValues } from '@/types/product';
import { useTranslations } from 'next-intl';

const DEFAULT_FILTER_VALUES: ProductFilter = {
  minRating: 1,
  category: '',
  minPrice: undefined,
  maxPrice: undefined,
  manufacturers: [],
  displayOption: 'createdAt:desc',
};

const ProductFilterSideBar: React.FC = () => {
  const tCommon = useTranslations('common');

  const ratings = [1, 2, 3, 4, 5];

  const { keyword, filters, setMultiple } = useQueryState<ProductFilter>({
    keyword: '',
    filters: DEFAULT_FILTER_VALUES,
  });

  return (
    <Formik
      initialValues={{
        keyword,
        ...filters,
      }}
      onSubmit={(values: ProductFilterFormValues) => {
        // console.log('values', values);
        setMultiple({
          keyword: values.keyword,
          filters: {
            minRating: values.minRating,
            category: values.category,
            minPrice: values.minPrice,
            maxPrice: values.maxPrice,
            manufacturers: values.manufacturers,
            displayOption: values?.displayOption,
          },
        });
      }}
    >
      {({ values, setFieldValue, resetForm }) => {
        return (
          <Form className="">
            {/* Tìm kiếm */}
            <TextField
              name="keyword"
              rightIcon={<Icon name="search" color="dark dark:white" />}
              inputContainerClassName="border-dark dark:border-white"
              inputClassName="rounded dark:text-white-200"
              labelClassName="dark:text-white-200"
              label={tCommon('search')}
            />

            {/* Danh mục sản phẩm */}
            <div className="rounded-md   mt-5">
              <h3 className="text-xl font-medium text-dark dark:text-white-200 flex items-center gap-2">
                <Icon name="category" size={0.8} color="dark dark:white" strokeWidth={2} />{' '}
                {tCommon('filter.categoryList')}
              </h3>
              {/* <div className="h-[1px] bg-dark dark:bg-white mt-4 mb-3"></div> */}

              <Divider marginBottom="15px" marginTop="12px" />

              <CategoryList setFieldValue={setFieldValue} values={values} />
            </div>

            {/* Bộ lọc */}
            <div className="  mt-5">
              <h3 className="text-xl font-medium text-dark dark:text-white-200 flex items-center gap-2">
                <Icon name="filter" size={0.8} color="dark dark:white" strokeWidth={2} /> {tCommon('filter.title')}
              </h3>

              <Divider marginBottom="15px" marginTop="12px" />

              <div className=" ">
                <h3 className="text-lg font-medium text-dark dark:text-white-200 flex items-center gap-2">
                  <Icon name="vendor" size={1.5} /> {tCommon('filter.byManufacturer')}
                </h3>

                <ManufacturerList />
              </div>

              <Divider marginBottom="15px" marginTop="12px" />

              <h3 className="text-lg font-medium text-dark dark:text-white-200 flex items-center gap-2 ">
                <Icon name="coin" size={1.5} />
                {tCommon('filter.byPrice')}
              </h3>

              <div className="flex items-center mt-6">
                <TextField
                  name="minPrice"
                  label=""
                  placeholder={tCommon('filter.minPrice')}
                  inputContainerClassName="border-dark dark:border-white"
                  inputClassName="dark:text-white-200"
                />
                <div className="mx-4 text-xl font-semibold text-dark-300 p-[1px] rounded-full">-</div>
                <TextField
                  name="maxPrice"
                  label=""
                  placeholder={tCommon('filter.maxPrice')}
                  inputContainerClassName="border-dark dark:border-white"
                  inputClassName="dark:text-white-200"
                />
              </div>

              <Button onClick={() => {}} full className="mt-5 hover:text-dark">
                {tCommon('apply')}
              </Button>
            </div>

            <Divider marginBottom="15px" marginTop="12px" />

            {/* Đánh giá */}
            <div className="">
              <h3 className="text-lg font-medium text-dark dark:text-white-200 flex items-center gap-2">
                {tCommon('filter.byReview')}
              </h3>

              <div className="flex flex-col gap-2 mt-2 px-2">
                {ratings.map((rating) => (
                  <label
                    key={rating}
                    className={clsx('flex items-center cursor-pointer transition-all', {
                      'bg-gray-400 rounded-md px-2': rating === values.minRating,
                    })}
                  >
                    <input
                      type="radio"
                      name="minRating"
                      value={rating}
                      checked={values.minRating === rating}
                      onChange={() => setFieldValue('minRating', rating)}
                      className="sr-only"
                    />
                    <div className="flex items-center gap-1">
                      {[...Array(rating)].map((_, i) => (
                        <Icon key={i} name="star" size={1.3} color="yellow" />
                      ))}
                      {[...Array(5 - rating)].map((_, i) => (
                        <Icon key={i} name="emptyStar" size={1.3} color="emerald" />
                      ))}
                    </div>
                  </label>
                ))}
              </div>

              <Divider marginBottom="15px" marginTop="12px" />

              <Button type="submit" full className="mt-5 hover:text-dark">
                {tCommon('search')}
              </Button>

              <Button
                full
                className="mt-5 hover:text-dark"
                onClick={() => {
                  resetForm();
                  setMultiple({
                    keyword: '',
                    filters: DEFAULT_FILTER_VALUES,
                  });
                }}
              >
                {tCommon('cancel')}
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductFilterSideBar;
