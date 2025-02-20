'use client';

import React from 'react';
import { Formik, Form } from 'formik';

import { useQueryState } from '@/hooks/useQueryState';
import clsx from 'clsx';
import Button from '@/components/Button';
import { ProductFilter, ProductFilterFormValues } from '@/types/product';

const priceOptions = [
  { label: 'Giá: Tăng dần', value: 'price:asc' },
  { label: 'Giá: Giảm dần', value: 'price:desc' },
];

const displayOptions = [
  { label: 'Mới nhất', value: 'createdAt:desc' },
  { label: 'Bán chạy nhất', value: 'bestSeller' },
  { label: 'Đánh giá cao nhất', value: 'ratings:desc' },
];

const ProductFilterTopBar = ({}) => {
  const { filters, setFilters } = useQueryState<ProductFilter>();
  // console.log('filter top bar', filters);
  return (
    <Formik
      initialValues={{ displayOption: filters?.displayOption || 'createdAt:desc' }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSubmit={(values: Pick<ProductFilterFormValues, 'displayOption'>) => {}}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className="flex gap-x-4 bg-white dark:bg-dark-400 shadow-md rounded-md h-[80px] px-3 xl:py-0 py-2">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="text-lg font-medium hidden sm:block dark:text-gray-500">Hiển thị theo</div>

              {displayOptions.concat(priceOptions).map((option) => (
                <Button
                  type="submit"
                  key={option.value}
                  className={clsx('hover:-translate-y-1', { '-translate-y-1': values.displayOption === option.value })}
                  bgColor={values.displayOption === option.value ? 'gray-500' : 'gray-200'}
                  height="50px"
                  onClick={() => {
                    setFieldValue('displayOption', option.value);
                    setFilters({
                      ...filters,
                      displayOption: option.value,
                    });
                  }}
                >
                  {option.label}
                </Button>
              ))}
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductFilterTopBar;
