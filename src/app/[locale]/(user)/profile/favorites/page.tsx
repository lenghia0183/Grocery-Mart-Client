'use client';

import Divider from '@/components/Divider';
import Pagination from '@/components/Pagination';
import ProductCard from '@/components/productCard';
import FavoriteListSkeleton from '@/components/Skeletons/Profile/FavoriteListSkeleton';
import { useQueryState } from '@/hooks/useQueryState';
import { useGetMyFavorite } from '@/services/api/https/favorite';
import { useTranslations } from 'next-intl';

const Profile = (): JSX.Element => {
  const { page } = useQueryState();
  const { data: favoriteData, isLoading: isLoadingFavoriteData } = useGetMyFavorite({ limit: 8, page: page });

  const t = useTranslations('favorite');

  if (isLoadingFavoriteData) return <FavoriteListSkeleton />;

  return (
    <div className="p-7 bg-white dark:bg-dark-400 shadow-md rounded-lg dark:text-white">
      <h2 className="text-2xl font-medium">{t('title')}</h2>
      <Divider />

      <div className="grid grid-cols-4 gap-3 mt-7">
        {favoriteData?.data?.favorites.map((item) => {
          return <ProductCard key={item?._id} data={item} />;
        })}
      </div>

      <Pagination pageCount={favoriteData?.data?.totalPage || 0} className="mt-10" />
    </div>
  );
};

export default Profile;
