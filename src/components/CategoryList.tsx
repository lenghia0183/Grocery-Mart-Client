'use server';

import { api } from '@/services/api/axios';
import Image from './Image';
import { CategoryResponse } from '@/types/category';
import { getTranslations } from 'next-intl/server';

const CategoryList = async (): Promise<JSX.Element> => {
  const response = await api.get<CategoryResponse>('https://api.hauifood.com/v1/categories?limit=3&page=1');
  const t = await getTranslations('home');

  const categoryList = response.data?.categories || [];

  return (
    <div className="container">
      <h2 className="text-2xl font-semibold mt-10 mb-5">{t('category')}</h2>
      <ul className="grid grid-cols-3 gap-4">
        {categoryList.map((category) => (
          <li
            key={category._id}
            className="group shadow-category-card-light flex gap-3  hover:bg-gray-400 p-[20px] items-center rounded-[16px] transition-all duration-300"
          >
            <Image
              src={category.image}
              alt={category.name}
              width={115}
              height={115}
              className="group-hover:scale-110 rounded-[16px] w-[100px] h-[100px] transition-all duration-300"
            />
            <div>
              <div className="font-semibold text-xl">20k - 150k</div>
              <div className="text-lg">{category.name + 'Grocery-mart'}</div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
