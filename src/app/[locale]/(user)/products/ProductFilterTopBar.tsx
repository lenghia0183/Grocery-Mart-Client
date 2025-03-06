'use client';

import React from 'react';
import { Formik, Form } from 'formik';

import { useQueryState } from '@/hooks/useQueryState';
import clsx from 'clsx';
import Button from '@/components/Button';
import { ProductFilter, ProductFilterFormValues } from '@/types/product';

interface ProductFilterTopBarProps {
  className?: string;
}

const priceOptions = [
  { label: 'Giá: Tăng dần', value: 'price:asc' },
  { label: 'Giá: Giảm dần', value: 'price:desc' },
];

const displayOptions = [
  { label: 'Mới nhất', value: 'createdAt:desc' },
  { label: 'Bán chạy nhất', value: 'bestSeller' },
  { label: 'Đánh giá cao nhất', value: 'ratings:desc' },
];

const ProductFilterTopBar = ({ className }: ProductFilterTopBarProps) => {
  const { filters, setFilters } = useQueryState<ProductFilter>();

  return (
    <Formik
      initialValues={{ displayOption: filters?.displayOption || 'createdAt:desc' }}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      onSubmit={(values: Pick<ProductFilterFormValues, 'displayOption'>) => {}}
    >
      {({ values, setFieldValue }) => (
        <Form>
          <div className={clsx(className)}>
            <div className="flex flex-col xl:flex-row items-center gap-4">
              <div className="text-lg font-medium dark:text-white-200 w-full xl:w-fit">Hiển thị theo</div>

              <div className="flex flex-wrap gap-2 w-full xl:w-auto">
                {displayOptions.concat(priceOptions).map((option) => (
                  <Button
                    key={option.value}
                    type="submit"
                    className={clsx('hover:-translate-y-1 w-full xl:w-auto', {
                      '-translate-y-1': values.displayOption === option.value,
                    })}
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
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default ProductFilterTopBar;
