'use client';

import Accordion from '@/components/Accordion';
import Image from 'next/image';
import clsx from 'clsx';
import { useGetCategory } from '@/services/api/https/category';
import CategoryListSkeleton from '@/components/Skeletons/CategoryListSkeleton';
import { ProductFilterFormValues } from '@/types/product';

const CategoryList = ({
  setFieldValue,
  values,
}: {
  setFieldValue: (field: string, value: string) => void;
  values: ProductFilterFormValues;
}) => {
  const { data = { categories: [] }, isLoading } = useGetCategory();
  if (isLoading) return <CategoryListSkeleton />;

  return (
    <Accordion minHeight="240px">
      {data.categories.map(({ name, image, _id }: { name: string; image: string; _id: string }) => (
        <button
          key={_id}
          onClick={() => setFieldValue('category', _id)}
          className={clsx('cursor-pointer flex items-center gap-3 py-2 transition-all dark:text-white-200', {
            'px-2 text-blue-500 dark:!text-blue-500': values.category === _id,
          })}
        >
          <div className="w-[30px] h-[30px]">
            <Image src={image} alt={name} width={30} height={30} />
          </div>
          <p className="text-base font-normal">{name}</p>
        </button>
      ))}
    </Accordion>
  );
};

export default CategoryList;
