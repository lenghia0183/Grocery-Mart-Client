'use client';

import React from 'react';
import { Formik, Form } from 'formik';

import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Button from '@/components/Button';
import Accordion from '@/components/Accordion';
import clsx from 'clsx';
import TextField from '@/components/TextField';
import CheckBox from '@/components/CheckBox';
import { useQueryState } from '@/hooks/useQueryState';
import CheckBoxGroup from '@/components/CheckBoxGroup';
import Divider from '@/components/Divider';

type Category = {
  name: string;
  image: string;
  _id: string;
};

type Manufacturer = {
  name: string;
  _id: string;
};

const ProductFilterSideBar: React.FC = () => {
  // Fake dữ liệu danh mục sản phẩm
  const categoryList: Category[] = [
    { _id: '1', name: 'Cà phê', image: '' },
    { _id: '2', name: 'Trà', image: '' },
    { _id: '3', name: 'Cacao', image: '' },
  ];

  // Fake dữ liệu thương hiệu
  const manufacturerList: Manufacturer[] = [
    { _id: 'apple', name: 'Apple' },
    { _id: 'samsung', name: 'Samsung' },
    { _id: 'xiaomi', name: 'Xiaomi' },
    { _id: 'dell', name: 'Dell' },
    { _id: 'apple1', name: 'Apple' },
    { _id: 'samsung1', name: 'Samsung' },
    { _id: 'xiaomi1', name: 'Xiaomi' },
    { _id: 'dell1', name: 'Dell' },
  ];

  const ratings = [1, 2, 3, 4, 5];

  const { keyword, filters, setMultiple } = useQueryState({
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

  console.log('filter', filters);

  return (
    <Formik
      initialValues={{
        keyword: keyword,
        ...(filters as {
          rating: number;
          category: string;
          minPrice: string;
          maxPrice: string;
          manufacturers: boolean[];
        }),
      }}
      onSubmit={(values) => {
        console.log('values', values);
        setMultiple({
          keyword: values.keyword,
          filters: {
            rating: values.rating,
            category: values.category,
            minPrice: values.minPrice,
            maxPrice: values.maxPrice,
            manufacturers: values.manufacturers,
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
              inputClassName="rounded dark:text-white"
              labelClassName="dark:text-white"
              label="Tìm kiếm"
            />

            {/* Danh mục sản phẩm */}
            <div className="rounded-md   mt-5">
              <h3 className="text-xl font-medium text-dark dark:text-white flex items-center gap-2">
                <Icon name="category" size={0.8} color="dark dark:white" strokeWidth={2} /> Danh mục sản phẩm
              </h3>
              {/* <div className="h-[1px] bg-dark dark:bg-white mt-4 mb-3"></div> */}

              <Divider marginBottom="15px" marginTop="12px" />

              <Accordion minHeight="240px">
                {categoryList.map(({ name, image, _id }) => (
                  <div
                    key={_id}
                    onClick={() => setFieldValue('category', _id)}
                    className={clsx('cursor-pointer flex items-center gap-3 py-2 transition-all dark:text-white', {
                      'px-2 text-blue-500 dark:!text-blue-500': values.category === _id,
                    })}
                  >
                    <div className="w-[30px] h-[30px]">
                      <Image src={image} alt={name} />
                    </div>
                    <p className={clsx('text-base font-normal ')}>{name}</p>
                  </div>
                ))}
              </Accordion>
            </div>

            {/* Bộ lọc */}
            <div className="  mt-5">
              <h3 className="text-2xl font-medium text-dark dark:text-white flex items-center gap-2">
                <Icon name="filter" size={0.8} color="dark dark:white" strokeWidth={2} /> Bộ lọc
              </h3>

              <Divider marginBottom="15px" marginTop="12px" />

              <div className=" ">
                <h3 className="text-lg font-medium text-dark dark:text-white flex items-center gap-2">
                  <Icon name="vendor" size={1.5} /> Theo thương hiệu
                </h3>

                <Accordion minHeight="165px">
                  <div className="mt-3">
                    <CheckBoxGroup name="manufacturers">
                      {manufacturerList.map(({ name, _id }) => (
                        <CheckBox
                          key={_id}
                          label={name}
                          name={_id}
                          labelClassName="text-dark dark:text-white"
                          borderColor="dark dark:white"
                        />
                      ))}
                    </CheckBoxGroup>
                  </div>
                </Accordion>
              </div>

              <Divider marginBottom="15px" marginTop="12px" />

              <h3 className="text-lg font-medium text-dark dark:text-white flex items-center gap-2 ">
                <Icon name="coin" size={1.5} /> Theo giá sản phẩm
              </h3>

              <div className="flex items-center mt-6">
                <TextField
                  name="minPrice"
                  label=""
                  placeholder="Giá tối thiểu"
                  inputContainerClassName="border-dark dark:border-white"
                  inputClassName="dark:text-white"
                />
                <div className="mx-4 text-xl font-semibold text-dark-300 p-[1px] rounded-full">-</div>
                <TextField
                  name="maxPrice"
                  label=""
                  placeholder="Giá tối đa"
                  inputContainerClassName="border-dark dark:border-white"
                  inputClassName="dark:text-white"
                />
              </div>

              <Button onClick={() => {}} full className="mt-5 hover:text-dark">
                Áp dụng
              </Button>
            </div>

            <Divider marginBottom="15px" marginTop="12px" />

            {/* Đánh giá */}
            <div className="">
              <h3 className="text-lg font-medium text-dark dark:text-white flex items-center gap-2">Theo dánh giá</h3>

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
