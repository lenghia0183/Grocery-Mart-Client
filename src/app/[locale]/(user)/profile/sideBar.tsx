'use client';

import Link from 'next/link';

import Icon from '@/components/Icon';
import { PATH } from '@/constants/path';
import images from '@/asset/images';

import Image from '@/components/Image';
import { usePathname } from '@/i18n/routing';
import { UserData } from '@/types/user';
import { formatRegisteredDate } from '@/utils/formatRegisteredDate';
import { useTranslations } from 'next-intl';

interface SideBarProps {
  userData: UserData | null;
}

const SideBar = ({ userData }: SideBarProps): JSX.Element => {
  const pathname = usePathname();

  const t = useTranslations('profileSideBar');

  const accountLinks = [
    { name: t('userInfo'), path: PATH.PROFILE_EDIT, icon: 'account' },
    { name: t('changePassword'), path: PATH.CHANGE_PASSWORD, icon: 'password' },
    { name: t('address'), path: PATH.CHANGE_ADDRESS, icon: 'address' },
  ];

  const transactionLinks = [
    { name: t('yourOrder'), path: PATH.ORDER, icon: 'account' },
    { name: t('favoriteList'), path: PATH.FAVORITE, icon: 'heart' },
  ];

  return (
    <nav className="sm:pb-[200px] pb-[100px] bg-white dark:bg-dark-400 shadow-md rounded-xl overflow-hidden dark:text-white">
      <div className="mb-4   relative">
        <Image src={images.avatarCover} alt="grocery-mart" height={250} width={250} className="h-[250px] w-full" />
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full">
          <Image
            src={userData?.avatar || ''}
            alt="grocery-mart"
            height={100}
            width={100}
            className="h-[100px] w-[100px] rounded-full "
          />
          <div className="text-white-200 text-lg font-semibold mt-5">{userData?.fullname || ''}</div>
          <div className="text-white-200 text-sm">{formatRegisteredDate(userData?.createdAt || '')}</div>
        </div>
      </div>

      <div className="mb-6 mt-7">
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-blue-400"></div>
          <h2 className="flex-1 font-semibold dark:text-white text-base bg-gray-100 dark:bg-dark-500 h-full flex items-center p-2 mb-0">
            {t('accountManage')}
          </h2>
        </div>
        <ul className="space-y-1 px-3">
          {accountLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`flex items-center space-x-2 p-2 text-base font-medium rounded hover:text-blue transition-all ${
                  pathname === link.path ? 'text-blue' : ''
                }`}
              >
                <Icon name={link.icon} size={1.3} color="inherit" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-blue-400"></div>
          <h2 className="flex-1 font-semibold  text-base bg-gray-100 dark:bg-dark-500 h-full flex items-center p-2 mb-0">
            {t('transactionManage')}
          </h2>
        </div>
        <ul className="space-y-2 px-3">
          {transactionLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`flex items-center space-x-2 p-2 text-base font-medium rounded hover:text-blue transition-all ${
                  pathname === link.path ? 'text-blue' : ''
                }`}
              >
                <Icon name={link.icon} size={1.3} color="inherit" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default SideBar;
