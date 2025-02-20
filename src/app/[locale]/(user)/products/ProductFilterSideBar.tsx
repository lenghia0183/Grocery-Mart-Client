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
import { ProductFormValues } from '@/types/product';

type FilterProduct = {
  rating: number;
  category: string;
  minPrice: string;
  maxPrice: string;
  manufacturers: string[];
  sortBy: string;
};

const ProductFilterSideBar: React.FC = () => {
  const ratings = [1, 2, 3, 4, 5];

  const { keyword, filters, setMultiple } = useQueryState<FilterProduct>({
    keyword: '',
    filters: {
      rating: 5,
      category: '',
      minPrice: '',
      maxPrice: '',
      manufacturers: [],
      sortBy: '',
    },
  });

  console.log('filter side bar', filters);

  return (
    <Formik
      initialValues={{
        keyword,
        rating: filters.rating ?? 5,
        category: filters.category ?? '',
        minPrice: filters.minPrice ?? '',
        maxPrice: filters.maxPrice ?? '',
        manufacturers: filters.manufacturers ?? [],
      }}
      onSubmit={(values: ProductFormValues) => {
        console.log('values', values);
        setMultiple({
          keyword: values.keyword,
          filters: {
            rating: values.rating,
            category: values.category,
            minPrice: values.minPrice,
            maxPrice: values.maxPrice,
            manufacturers: values.manufacturers,
            sortBy: filters.sortBy ?? '',
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
              label="Tìm kiếm"
            />

            {/* Danh mục sản phẩm */}
            <div className="rounded-md   mt-5">
              <h3 className="text-xl font-medium text-dark dark:text-white-200 flex items-center gap-2">
                <Icon name="category" size={0.8} color="dark dark:white" strokeWidth={2} /> Danh mục sản phẩm
              </h3>
              {/* <div className="h-[1px] bg-dark dark:bg-white mt-4 mb-3"></div> */}

              <Divider marginBottom="15px" marginTop="12px" />

              <CategoryList setFieldValue={setFieldValue} values={values} />
            </div>

            {/* Bộ lọc */}
            <div className="  mt-5">
              <h3 className="text-2xl font-medium text-dark dark:text-white-200 flex items-center gap-2">
                <Icon name="filter" size={0.8} color="dark dark:white" strokeWidth={2} /> Bộ lọc
              </h3>

              <Divider marginBottom="15px" marginTop="12px" />

              <div className=" ">
                <h3 className="text-lg font-medium text-dark dark:text-white-200 flex items-center gap-2">
                  <Icon name="vendor" size={1.5} /> Theo thương hiệu
                </h3>

                <ManufacturerList />
              </div>

              <Divider marginBottom="15px" marginTop="12px" />

              <h3 className="text-lg font-medium text-dark dark:text-white-200 flex items-center gap-2 ">
                <Icon name="coin" size={1.5} /> Theo giá sản phẩm
              </h3>

              <div className="flex items-center mt-6">
                <TextField
                  name="minPrice"
                  label=""
                  placeholder="Giá tối thiểu"
                  inputContainerClassName="border-dark dark:border-white"
                  inputClassName="dark:text-white-200"
                />
                <div className="mx-4 text-xl font-semibold text-dark-300 p-[1px] rounded-full">-</div>
                <TextField
                  name="maxPrice"
                  label=""
                  placeholder="Giá tối đa"
                  inputContainerClassName="border-dark dark:border-white"
                  inputClassName="dark:text-white-200"
                />
              </div>

              <Button onClick={() => {}} full className="mt-5 hover:text-dark">
                Áp dụng
              </Button>
            </div>

            <Divider marginBottom="15px" marginTop="12px" />

            {/* Đánh giá */}
            <div className="">
              <h3 className="text-lg font-medium text-dark dark:text-white-200 flex items-center gap-2">
                Theo dánh giá
              </h3>

              <div className="flex flex-col gap-2 mt-2 px-2">
                {ratings.map((rating) => (
                  <label
                    key={rating}
                    className={clsx('flex items-center cursor-pointer transition-all', {
                      'bg-gray-400 rounded-md px-2': rating === values.rating,
                    })}
                  >
                    <input
                      type="radio"
                      name="rating"
                      value={rating}
                      checked={values.rating === rating}
                      onChange={() => setFieldValue('rating', rating)}
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
                Tìm kiếm
              </Button>

              <Button
                full
                className="mt-5 hover:text-dark"
                onClick={() => {
                  resetForm();
                  setMultiple({
                    keyword: '',
                    filters: {
                      rating: 5,
                      category: '',
                      minPrice: '',
                      maxPrice: '',
                      manufacturers: [],
                      sortBy: '',
                    },
                    page: 1,
                  });
                }}
              >
                Hủy bỏ
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};

export default ProductFilterSideBar;
