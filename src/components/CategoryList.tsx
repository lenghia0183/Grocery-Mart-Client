'use server';

import { api } from '@/services/api/axios';
import Image from './Image';
import Link from 'next/link';

import { getTranslations } from 'next-intl/server';
import { GetCategoryResponse } from '@/types/category';
import { generateServerQueryUrl } from '@/utils/generateUrl';

const CategoryList = async (): Promise<JSX.Element> => {
  const response = await api.get<GetCategoryResponse>('v1/category');
  const t = await getTranslations('home');

  const categoryList = response.data?.categories || [];

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mt-10 mb-5 text-dark dark:text-white-200">{t('category')}</h2>
      <ul className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {categoryList.map((category) => {
          const url = generateServerQueryUrl('/products', {
            filters: { category: category._id },
          });

          return (
            <li key={category._id} className="group">
              <Link
                href={url}
                className="flex dark:shadow-category-card-dark shadow-category-card-light gap-3 dark:bg-dark-400 hover:bg-gray-400 xl:p-[20px] p-4 items-start rounded-[16px] transition-all duration-300"
              >
                <div className="group-hover:scale-110 rounded-[16px] xl:w-[100px] w-[75px] aspect-square transition-all duration-300 dark:bg-dark-500">
                  <Image
                    src={category.image}
                    alt={category.name + ' Grocery Mart'}
                    width={115}
                    height={115}
                    className="rounded-[16px] xl:w-[100px] w-[75px] aspect-square"
                  />
                </div>
                <div className="text-dark dark:text-white-200">
                  <div className="font-semibold text-xl">20k - 150k</div>
                  <div className="text-lg">{category.name}</div>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CategoryList;
