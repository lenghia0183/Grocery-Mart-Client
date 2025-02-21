'use client';

import { useUser } from '@/context/userProvider';
import SideBar from './sideBar';
import ProfileSideBarSkeleton from '@/components/Skeletons/Profile/ProfileSideBarSkeleton';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  const { userData, isLoading } = useUser();

  return (
    <div className="bg-gray-100 dark:bg-dark-500">
      <div className="grid grid-cols-12 container gap-7 py-14">
        <div className="col-span-3">
          {isLoading ? <ProfileSideBarSkeleton /> : <SideBar userData={userData || null} />}
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
}
