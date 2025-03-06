'use client';

import React, { useState } from 'react';
import Logo from './Logo';
import Button from './Button';
import IconButton from './IconButton';
import ToolTip from './ToolTip';
import AvatarMenu from './AvatarMenu';
import { useTranslations } from 'next-intl';
import { PATH } from '@/constants/path';
import { useUser } from '@/context/userProvider';
import Image from './Image';
import formatCurrency from '@/utils/formatCurrency';
import Icon from './Icon';
import DrawerMenu from './DrawerMenu';

const Header: React.FC = () => {
  const t = useTranslations();

  const { userData, userFavoritesCount, userCartTotalMoney } = useUser();

  const [isOpenDrawerMenu, setIsOpenDrawerMenu] = useState(false);

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
      <div className=" hidden xl:flex container justify-between py-6">
        {/* Logo & Navigation */}
        <div className="flex">
          <Logo />
          <div className="ml-[70px]">
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
        <div className="gap-3 text-dark dark:text-white-200">
          {userData && (
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
          )}

          {/* Wishlist & Cart */}
          {userData && (
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
                  href={PATH.FAVORITE}
                />
                <p className="min-w-[20px] max-w-[30px] truncate overflow-ellipsis transition-colors duration-300">
                  {userFavoritesCount}
                </p>
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
                  href={PATH.CART}
                />
                <p className="min-w-[70px] max-w-[130px] truncate overflow-ellipsis transition-colors duration-300">
                  {formatCurrency(userCartTotalMoney)}
                </p>
              </div>
            </div>
          )}

          {/* User Avatar */}
          <ToolTip
            render={() => <AvatarMenu />}
            openOnClick
            clickable
            opacity={1}
            className="!p-0 !rounded-2xl !bg-white dark:!bg-dark-500 dark:text-dark-500 shadow-avatar-menu-light dark:shadow-avatar-menu-dark"
          >
            {userData ? (
              <Image
                src={userData?.avatar || ''}
                alt={userData?.fullname || ''}
                width={50}
                height={50}
                className="w-[50px] h-[50px] rounded-md"
              />
            ) : (
              <Icon name="menu" />
            )}
          </ToolTip>
        </div>
      </div>

      <div className="flex xl:hidden container py-6 justify-between">
        <Logo />
        <IconButton
          iconName="menu"
          onClick={() => {
            setIsOpenDrawerMenu(true);
          }}
        />
      </div>

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
            <IconButton iconName="close" onClick={() => setIsOpenDrawerMenu(false)} />
          </div>
        )}
        renderContent={() => (
          <nav className="flex flex-col p-4">
            {navItems.map((item, index) => (
              <Button
                key={index}
                href={item.href}
                variant="text"
                className="py-3 text-lg text-dark dark:text-white-200"
                onClick={() => setIsOpenDrawerMenu(false)}
              >
                {item.label}
              </Button>
            ))}
          </nav>
        )}
        overlayColor="rgba(0, 0, 0, 0.5)"
        bgColor="white"
      />
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
