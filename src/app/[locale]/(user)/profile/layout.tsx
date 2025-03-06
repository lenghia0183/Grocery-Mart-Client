'use client';

import { useUser } from '@/context/userProvider';
import SideBar from './sideBar';
import ProfileSideBarSkeleton from '@/components/Skeletons/Profile/ProfileSideBarSkeleton';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { userData, isLoading } = useUser();

  return (
    <div className="bg-gray-100 dark:bg-dark-500">
      <div className="grid xl:grid-cols-12 grid-cols-1 container gap-7 py-14">
        <div className="xl:col-span-3 col-span-full">
          {isLoading ? <ProfileSideBarSkeleton /> : <SideBar userData={userData || null} />}
        </div>
        <div className="xl:col-span-9 col-span-full">{children}</div>
      </div>
    </div>
  );
}
