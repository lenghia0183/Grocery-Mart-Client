'use client';

import React from 'react';
import Logo from './Logo';
import Button from './Button';
import IconButton from './IconButton';
import ToolTip from './ToolTip';
import AvatarMenu from './AvatarMenu';
import { useTranslations } from 'next-intl';
import { PATH } from '@/constants/path';
import { useUser } from '@/context/userProvider';
import Image from './Image';

const Header: React.FC = () => {
  const t = useTranslations();

  const { userData } = useUser();

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
    <header className="bg-blue-200 dark:bg-dark-400 shadow-sm shadow-slate-300 dark:shadow-none">
      <div className="container flex justify-between py-6">
        {/* Logo & Navigation */}
        <div className="flex">
          <Logo />
          <div className="ml-[70px] flex">
            {navItems.map((item, index) => (
              <Button
                key={index}
                href={item.href}
                variant="text"
                className="px-[15px] text-lg text-dark dark:text-white-200"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 text-dark dark:text-white-200">
          <IconButton
            iconName="search"
            variant="contained"
            className="shadow-button-light dark:shadow-button-dark dark:bg-dark-500"
            iconColor="inherit"
            width="50px"
            height="50px"
            iconWidth="21px"
            iconHeight="21px"
            iconStrokeWidth={1.8}
          />

          {/* Wishlist & Cart */}
          <div className="flex items-center gap-3 bg-white dark:bg-dark-500 rounded-md shadow-button-light dark:shadow-button-dark">
            {/* Wishlist */}
            <div className="flex items-center gap-2 py-3 pl-5 hover:text-blue-300 dark:text-white-200">
              <IconButton
                iconName="heart"
                variant="text"
                className="shadow-none"
                iconColor="inherit"
                iconHoverColor="inherit"
                iconWidth="21px"
                iconHeight="21px"
                iconStrokeWidth={1.8}
              />
              <p className="min-w-[20px] max-w-[30px] truncate overflow-ellipsis transition-colors duration-300">333</p>
            </div>

            <div className="w-[1px] h-[60%] bg-gray-400"></div>

            {/* Cart */}
            <div className="flex items-center gap-2 py-3 pr-5 hover:text-blue-300 dark:text-white-200">
              <IconButton
                iconName="cart"
                variant="text"
                className="shadow-none"
                iconColor="inherit"
                iconHoverColor="inherit"
                iconWidth="21px"
                iconHeight="21px"
                iconStrokeWidth={1.8}
              />
              <p className="min-w-[70px] max-w-[130px] truncate overflow-ellipsis transition-colors duration-300">
                0 VND
              </p>
            </div>
          </div>

          {/* User Avatar */}
          <ToolTip
            render={() => <AvatarMenu />}
            openOnClick
            clickable
            opacity={1}
            className="!p-0 !bg-white !rounded-2xl shadow-avatar-menu-light"
          >
            <div className="w-[50px] h-[50px] rounded-md bg-dark">
              <Image src={''} alt={userData?.fullname || ''} width={50} height={50} className="w-[50px] h-[50px]" />
            </div>
          </ToolTip>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
