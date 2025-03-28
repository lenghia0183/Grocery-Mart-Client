'use client';

import React, { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';
import { PATH } from '@/constants/path';
import { useUser } from '@/context/userProvider';

import formatCurrency from '@/utils/formatCurrency';

import AvatarDrawerMenu from './AvatarDrawerMenu';
import Image from '@/components/Image';
import ToolTip from '../ToolTip';
import AvatarMenu from './../AvatarMenu';
import Icon from '@/components/Icon';
import IconButton from '@/components/IconButton';
import Logo from '@/components/Logo';
import DrawerMenu from '../DrawerMenu';
import Button from '@/components/Button';
import { usePathname } from '@/i18n/routing';
import { generateServerQueryUrl } from '@/utils/generateUrl';
import { CATEGORY_ID } from '@/constants/common';
import { useQueryState } from '@/hooks/useQueryState';
import { ProductFilter } from '@/types/product';

const Header: React.FC = () => {
  const t = useTranslations();

  const pathname = usePathname();

  const { userData, userFavoritesCount, userCartTotalMoney } = useUser();
  const { filters } = useQueryState<ProductFilter>();

  const [isOpenDrawerMenu, setIsOpenDrawerMenu] = useState(false);

  const navItems = [
    {
      label: t('pageTitle.home'),
      href: PATH.HOME,
    },
    {
      label: t('pageTitle.coffee'),
      categoryId: CATEGORY_ID.COFFEE,
      href: generateServerQueryUrl('/products', {
        filters: { category: CATEGORY_ID.COFFEE },
      }),
    },
    {
      label: t('pageTitle.tea'),
      categoryId: CATEGORY_ID.TEA,

      href: generateServerQueryUrl('/products', {
        filters: { category: CATEGORY_ID.TEA },
      }),
    },
    {
      label: t('pageTitle.cacao'),
      categoryId: CATEGORY_ID.CACAO,
      href: generateServerQueryUrl('/products', {
        filters: { category: CATEGORY_ID.CACAO },
      }),
    },
  ];

  useEffect(() => {
    setIsOpenDrawerMenu(false);
  }, [pathname]);

  return (
    <header className="bg-blue-200 dark:bg-dark-400 shadow-sm shadow-slate-300 dark:shadow-none">
      <div className=" hidden xl:flex container justify-between py-6">
        {/* Logo & Navigation */}
        <div className="flex">
          <Logo />
          <div className="flex items-center ml-[70px]">
            {navItems.map((item, index) => (
              <Button
                key={index}
                href={item.href}
                variant="text"
                textColor={item.categoryId === filters.category ? 'blue-500' : 'dark dark:white-200'}
                className="px-[15px] text-lg"
              >
                {item.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3 text-dark dark:text-white-200">
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
        width="100%"
        position="top"
        animationDuration={500}
        className="bh-white dark:bg-dark-500 text-dark dark:text-white-200"
        renderTitle={() => (
          <div className="flex justify-between items-center p-5">
            <Logo />

            <IconButton iconName="close" onClick={() => setIsOpenDrawerMenu(false)} />
          </div>
        )}
        renderContent={() => <AvatarDrawerMenu />}
      />
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
