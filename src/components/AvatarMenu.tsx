import { useState } from 'react';
import Link from 'next/link';
import Icon from './Icon';
import { useTheme } from '@/context/ThemeProvider';
import { useLanguage } from '@/context/LanguageProvider';
import { Locale, Locales } from '@/config/locales';
import { useTranslations } from 'next-intl';
import { PATH } from '@/constants/path';
import { useUser } from '@/context/userProvider';
import Image from './Image';

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

const AvatarMenu = () => {
  const { setTheme } = useTheme();
  const { changeLanguage } = useLanguage();
  const t = useTranslations('common');
  const { logoutUser, userData } = useUser();

  const handleThemeChange = (newTheme: string) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (newLanguage: Locale) => {
    changeLanguage(newLanguage);
  };

  const menuItems: MenuItem[] = [
    {
      label: t('account'),
      icon: <Icon name="account" color="inherit" strokeWidth={1.75} />,
      to: PATH.PROFILE_EDIT,
      requiresUser: true, // Hiển thị nếu có userData
    },
    {
      label: t('cart'),
      icon: <Icon name="cart" color="inherit" strokeWidth={1.8} />,
      to: PATH.CART,
      requiresUser: true, // Hiển thị nếu có userData
    },
    {
      label: t('favorites'),
      icon: <Icon name="heart" color="inherit" strokeWidth={1.8} />,
      divide: true,
      to: PATH.FAVORITE,
      requiresUser: true, // Hiển thị nếu có userData
    },
    {
      label: t('settings'),
      icon: <Icon name="setting" color="inherit" size={1.7} />,
      subMenu: [
        {
          label: t('themeMode'),
          icon: <Icon name="darkMode" color="inherit" size={1.7} strokeWidth={111} />,
          subMenu: [
            {
              label: t('lightMode'),
              value: 'light',
              icon: <Icon name="sun" color="inherit" strokeWidth={1.6} size={1.9} />,
              action: () => handleThemeChange('light'),
            },
            {
              label: t('darkMode'),
              value: 'dark',
              icon: <Icon name="moon" color="inherit" strokeWidth={0.5} />,
              action: () => handleThemeChange('dark'),
            },
          ],
        },
        {
          label: t('language'),
          icon: <Icon name="language" color="inherit" />,
          subMenu: [
            { label: t('vietnamese'), value: 'vi', action: () => handleLanguageChange(Locales.VI) },
            { label: t('english'), value: 'en', action: () => handleLanguageChange(Locales.EN) },
          ],
        },
      ],
      divide: true,
    },
    {
      label: t('logout'),
      icon: <Icon name="logout" color="inherit" size={1.3} strokeWidth={15} />,
      action: () => {
        logoutUser();
      },
      requiresUser: true, // Hiển thị nếu có userData
    },
    {
      label: t('login'),
      icon: <Icon name="logout" color="inherit" size={1.3} strokeWidth={15} />,
      to: PATH.LOGIN,
      requiresUser: false, // Chỉ hiển thị khi chưa đăng nhập (không có userData)
    },
    {
      label: t('signUp'),
      icon: <Icon name="logout" color="inherit" size={1.3} strokeWidth={15} />,
      to: PATH.SIGN_UP,
      requiresUser: false, // Chỉ hiển thị khi chưa đăng nhập
    },
  ];

  const [menuStack, setMenuStack] = useState<MenuItem[]>([{ label: 'main', subMenu: menuItems }]);
  const currentMenu = menuStack[menuStack.length - 1];

  const goBack = () => {
    if (menuStack.length > 1) {
      setMenuStack((prev) => prev.slice(0, -1));
    }
  };

  return (
    <ul className="max-w-[240px] min-w-[210px] rounded-xl overflow-hidden text-dark bg-white dark:bg-dark-500 dark:text-white-200 font-semibold text-base">
      {userData && (
        <li className="p-5 flex gap-5 items-center">
          <Image
            src={userData?.avatar || ''}
            alt={userData?.fullname || ''}
            width={50}
            height={50}
            className="h-[50px] w-[50px] rounded-md bg-dark"
          />

          <div>
            <p>{userData?.fullname}</p>
            <p className="mt-1 text-sm font-normal text-gray-500 truncate w-[120px]">{userData?.email}</p>
          </div>
        </li>
      )}

      {menuStack.length > 1 && (
        <li onClick={goBack} className="hover:bg-gray-400 hover:text-blue-500 cursor-pointer font-semibold">
          <div className="py-2 px-5 flex items-center gap-2">
            <Icon name="backArrow" color="inherit" size={1.5} />
            {t('back')}
          </div>
          <div className="h-[1px] my-1 mx-1 bg-gray-500"></div>
        </li>
      )}

      {/*
        Lọc các mục menu:
        - Nếu item.requiresUser là true, chỉ hiển thị khi có userData.
        - Nếu item.requiresUser là false, chỉ hiển thị khi không có userData.
        - Nếu không định nghĩa, hiển thị luôn.
      */}
      {currentMenu.subMenu
        ?.filter((item) => {
          if (typeof item.requiresUser === 'boolean') {
            return item.requiresUser ? !!userData : !userData;
          }
          return true;
        })
        .map((item, index) => {
          if (item.to) {
            return (
              <li key={index} className="relative hover:text-blue-500 cursor-pointer">
                <Link href={item.to} rel="noopener noreferrer">
                  <div className="py-3 px-5 hover:bg-gray-400 flex justify-between items-center">
                    <div className="flex items-center justify-between text-inherit w-full">
                      <div>{item.label}</div>
                      {item.icon && item.icon}
                    </div>
                  </div>
                </Link>
                {item.divide && <div className="h-[1px] my-1 mx-5 bg-gray-400"></div>}
              </li>
            );
          } else {
            return (
              <li
                key={index}
                className="relative hover:text-blue-500 cursor-pointer"
                onClick={() => {
                  if (item.subMenu) {
                    setMenuStack((prev) => [...prev, item]);
                  } else if (item.action) {
                    item.action();
                  }
                }}
              >
                <div className="py-3 px-5 hover:bg-gray-400 flex justify-between items-center">
                  <div className="flex items-center justify-between text-inherit w-full">
                    <div>{item.label}</div>
                    {item.icon && item.icon}
                  </div>
                </div>
                {item.divide && <div className="h-[1px] my-1 mx-5 bg-gray-400"></div>}
              </li>
            );
          }
        })}
    </ul>
  );
};

export default AvatarMenu;
