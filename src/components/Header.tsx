'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import IconButton from './IconButton';
import { useTranslations } from 'next-intl';
import { PATH } from '@/constants/path';
import DrawerMenu from './DrawerMenu';
import Link from 'next/link';
import Icon from './Icon';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import { Locale, Locales } from '@/config/locales';
import { useUser } from '@/context/userProvider';
import Image from './Image';

const Header: React.FC = () => {
  const t = useTranslations();
  const [isOpenDrawerMenu, setIsOpenDrawerMenu] = useState(false);

  // Định nghĩa nội dung của DrawerMenu dưới dạng 1 component nội bộ
  const DrawerContent = () => {
    const { setTheme } = useTheme();
    const { changeLanguage } = useLanguage();
    const { logoutUser, userData } = useUser();
    const tCommon = useTranslations('common');

    const handleThemeChange = (newTheme: string) => {
      setTheme(newTheme);
    };

    const handleLanguageChange = (newLanguage: Locale) => {
      changeLanguage(newLanguage);
    };

    interface MenuItem {
      label: string;
      subMenu?: MenuItem[];
      icon?: React.ReactNode;
      divide?: boolean;
      value?: string;
      action?: () => void;
      to?: string;
      // Nếu true: hiển thị khi có userData, false: hiển thị khi không có userData
      requiresUser?: boolean;
    }

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

    // Sử dụng menuStack để quản lý menu lồng nhau
    const [menuStack, setMenuStack] = useState<MenuItem[]>([{ label: 'main', subMenu: menuItems }]);
    const currentMenu = menuStack[menuStack.length - 1];

    const goBack = () => {
      if (menuStack.length > 1) {
        setMenuStack((prev) => prev.slice(0, -1));
      }
    };

    return (
      <div className="w-full">
        {/* Thông tin người dùng */}
        {userData && (
          <div className="flex items-center p-5 gap-5 border-b">
            <Image
              src={userData?.avatar || '/default-avatar.png'}
              alt={userData?.fullname || ''}
              width={50}
              height={50}
              className="h-[50px] w-[50px] rounded-md"
            />
            <div>
              <p className="font-bold">{userData?.fullname}</p>
              <p className="text-sm text-gray-500 truncate w-[140px]">{userData?.email}</p>
            </div>
          </div>
        )}

        {/* Nút Back khi đang ở menu con */}
        {menuStack.length > 1 && (
          <div onClick={goBack} className="cursor-pointer p-4 flex items-center gap-2 hover:bg-gray-200">
            <Icon name="backArrow" color="inherit" size={1.5} />
            <span className="font-semibold">{tCommon('back')}</span>
          </div>
        )}

        {/* Danh sách các mục menu */}
        <ul className="divide-y divide-gray-300">
          {currentMenu.subMenu
            ?.filter((item) => {
              if (typeof item.requiresUser === 'boolean') {
                return item.requiresUser ? !!userData : !userData;
              }
              return true;
            })
            .map((item, index) => (
              <li key={index} className="hover:bg-gray-200 cursor-pointer">
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
      </div>
    );
  };

  return (
    <header className="bg-blue-200 dark:bg-dark-400 shadow-sm shadow-slate-300 dark:shadow-none">
      {/* Mobile Header */}
      <div className="flex xl:hidden container py-6 justify-between items-center">
        <Logo />
        <IconButton iconName="menu" onClick={() => setIsOpenDrawerMenu(true)} aria-label="Open Menu" />
      </div>

      {/* DrawerMenu tích hợp trực tiếp nội dung của Avatar Menu */}
      <DrawerMenu
        isOpen={isOpenDrawerMenu}
        handleClose={() => setIsOpenDrawerMenu(false)}
        handleOverlayClick={() => setIsOpenDrawerMenu(false)}
        width="75%"
        position="left"
        animationDuration={300}
        renderTitle={() => (
          <div className="flex justify-between items-center p-4 border-b">
            <div className="text-lg font-semibold">{t('menu')}</div>
            <IconButton
              iconName="close"
              onClick={() => setIsOpenDrawerMenu(false)}
              variant="text"
              aria-label="Close Menu"
            />
          </div>
        )}
        renderContent={() => <DrawerContent />}
        overlayColor="rgba(0, 0, 0, 0.5)"
        bgColor="white"
      />
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
