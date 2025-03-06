'use client';

import React, { useState } from 'react';
import Link from 'next/link';

import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import { Locale, Locales } from '@/config/locales';
import { useTranslations } from 'next-intl';
import { PATH } from '@/constants/path';
import { useUser } from '@/context/userProvider';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Button from '@/components/Button';
import Divider from '../Divider';

interface MenuItem {
  label: string;
  subMenu?: MenuItem[];
  icon?: React.ReactNode;
  divide?: boolean;
  value?: string;
  action?: () => void;
  to?: string;
  requiresUser?: boolean;
}

const AvatarDrawerMenu: React.FC = () => {
  const { setTheme } = useTheme();
  const { changeLanguage } = useLanguage();
  const { logoutUser, userData } = useUser();
  const tCommon = useTranslations('common');
  const t = useTranslations();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: Locale) => {
    changeLanguage(newLanguage);
  };

  const menuItems: MenuItem[] = [
    {
      label: tCommon('account'),
      icon: <Icon name="account" color="inherit" strokeWidth={1.75} />,
      to: PATH.PROFILE_EDIT,
      requiresUser: true,
    },
    {
      label: tCommon('cart'),
      icon: <Icon name="cart" color="inherit" strokeWidth={1.8} />,
      to: PATH.CART,
      requiresUser: true,
    },
    {
      label: tCommon('favorites'),
      icon: <Icon name="heart" color="inherit" strokeWidth={1.8} />,
      divide: true,
      to: PATH.FAVORITE,
      requiresUser: true,
    },
    {
      label: tCommon('settings'),
      icon: <Icon name="setting" color="inherit" size={1.7} />,
      subMenu: [
        {
          label: tCommon('themeMode'),
          icon: <Icon name="darkMode" color="inherit" size={1.7} strokeWidth={111} />,
          subMenu: [
            {
              label: tCommon('lightMode'),
              value: 'light',
              icon: <Icon name="sun" color="inherit" strokeWidth={1.6} size={1.9} />,
              action: () => handleThemeChange('light'),
            },
            {
              label: tCommon('darkMode'),
              value: 'dark',
              icon: <Icon name="moon" color="inherit" strokeWidth={0.5} />,
              action: () => handleThemeChange('dark'),
            },
          ],
        },
        {
          label: tCommon('language'),
          icon: <Icon name="language" color="inherit" />,
          subMenu: [
            { label: tCommon('vietnamese'), value: 'vi', action: () => handleLanguageChange(Locales.VI) },
            { label: tCommon('english'), value: 'en', action: () => handleLanguageChange(Locales.EN) },
          ],
        },
      ],
      divide: true,
    },
    {
      label: tCommon('logout'),
      icon: <Icon name="logout" color="inherit" size={1.3} strokeWidth={15} />,
      action: () => logoutUser(),
      requiresUser: true,
    },
    {
      label: tCommon('login'),
      icon: <Icon name="logout" color="inherit" size={1.3} strokeWidth={15} />,
      to: PATH.LOGIN,
      requiresUser: false,
    },
    {
      label: tCommon('signUp'),
      icon: <Icon name="logout" color="inherit" size={1.3} strokeWidth={15} />,
      to: PATH.SIGN_UP,
      requiresUser: false,
    },
  ];

  const [menuStack, setMenuStack] = useState<MenuItem[]>([{ label: 'main', subMenu: menuItems }]);
  const currentMenu = menuStack[menuStack.length - 1];

  const goBack = () => {
    if (menuStack.length > 1) {
      setMenuStack((prev) => prev.slice(0, -1));
    }
  };

  const navItems = [
    {
      label: t('pageTitle.home'),
      href: PATH.HOME,
    },
    {
      label: t('pageTitle.coffee'),
      href: PATH.PRODUCTS,
    },
    {
      label: t('pageTitle.tea'),
      href: PATH.PRODUCTS,
    },
    {
      label: t('pageTitle.cacao'),
      href: PATH.PRODUCTS,
    },
  ];

  return (
    <div className="w-full h-full ">
      <Divider marginTop="0px" marginBottom="opx" />
      {userData && (
        <div className="flex items-center px-5 py-3 gap-5 border-b">
          <Image
            src={userData?.avatar || ''}
            alt={userData?.fullname || ''}
            width={50}
            height={50}
            className="h-[70px] w-[70px] rounded-md"
          />
          <div className="flex-shrink-0 flex-1">
            <p className="text-xl font-bold">{userData?.fullname}</p>
            <p className="text-base text-gray-500 truncate w-[90%]">{userData?.email}</p>
          </div>
        </div>
      )}

      {/* Nút Back khi ở menu con */}
      {menuStack.length > 1 && (
        <div
          onClick={goBack}
          className="cursor-pointer p-4 flex items-center gap-2 hover:bg-gray-400 hover:text-blue-500"
        >
          <Icon name="backArrow" color="inherit" size={1.5} />
          <span className="font-semibold">{tCommon('back')}</span>
        </div>
      )}

      {/* Danh sách các mục menu lồng */}
      <ul className="divide-y divide-gray-300">
        {currentMenu.subMenu
          ?.filter((item) => {
            if (typeof item.requiresUser === 'boolean') {
              return item.requiresUser ? !!userData : !userData;
            }
            return true;
          })
          .map((item, index) => (
            <li key={index} className=" hover:bg-gray-400 dark:hover:bg-gray-400 hover:text-blue-500 cursor-pointer">
              {item.to ? (
                <Link href={item.to} rel="noopener noreferrer">
                  <div className="flex justify-between items-center p-4">
                    <span>{item.label}</span>
                    {item.icon}
                  </div>
                </Link>
              ) : (
                <div
                  onClick={() => {
                    if (item.subMenu) {
                      setMenuStack((prev) => [...prev, item]);
                    } else if (item.action) {
                      item.action();
                    }
                  }}
                  className="flex justify-between items-center p-4"
                >
                  <span>{item.label}</span>
                  {item.icon}
                </div>
              )}
            </li>
          ))}
      </ul>

      <div className="mt-6 border-t border-gray-200 dark:border-gray-700 pt-4 px-4">
        <h3 className="mb-3 text-lg font-semibold text-gray-700 dark:text-gray-200">Điều Hướng Nhanh</h3>
        <div className="grid grid-cols-2 gap-4">
          {navItems.map((item, index) => (
            <Button
              key={index}
              to={item.href}
              variant="outlined"
              borderColor="gray-500"
              textColor="gray-500"
              bgHoverColor="gray-400"
              full
            >
              {item.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AvatarDrawerMenu;
