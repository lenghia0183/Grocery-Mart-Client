'use client';

import Button from '@/components/Button';
import DrawerMenu from '@/components/DrawerMenu';
import IconButton from '@/components/IconButton';
import Logo from '@/components/Logo';
import { useEffect, useState } from 'react';
import ProductFilterSideBar from './SideBar';
import Divider from '@/components/Divider';
import ProductFilterTopBar from './ProductFilterTopBar';
import Accordion from '@/components/Accordion';
import Icon from '@/components/Icon';
import { useSearchParams } from 'next/navigation';

const FilterDrawer = () => {
  const [isOpenFilterDrawer, setIsOpenFilterDrawer] = useState(false);

  const searchParam = useSearchParams();

  useEffect(() => {
    setIsOpenFilterDrawer(false);
  }, [searchParam]);

  return (
    <div>
      <Button
        variant="outlined"
        className="mb-7"
        startIcon={<Icon name="filter" color="inherit" />}
        textColor="blue-500 dark:blue-400"
        borderColor="blue-500 dark:blue-400"
        textHoverColor="blue-400 dark:blue-500"
        bgHoverColor="none"
        borderHoverColor="blue-400 dark:blue-500"
        onClick={() => {
          setIsOpenFilterDrawer(true);
        }}
      >
        Mở bộ lọc
      </Button>

      <DrawerMenu
        width="100%"
        position="bottom"
        animationDuration={500}
        isOpen={isOpenFilterDrawer}
        handleClose={() => {
          setIsOpenFilterDrawer(false);
        }}
        handleOverlayClick={() => {
          setIsOpenFilterDrawer(false);
        }}
        className="bh-white dark:bg-dark-500 text-dark dark:text-white-200"
        renderTitle={() => (
          <div className="flex justify-between items-center  p-5">
            <Logo />
            <IconButton iconName="close" onClick={() => setIsOpenFilterDrawer(false)} />
          </div>
        )}
        renderContent={() => {
          return (
            <>
              <Divider marginTop="0px" marginBottom="opx" />

              <div className="p-5">
                <Accordion minHeight="90px">
                  <ProductFilterTopBar />
                </Accordion>
                <ProductFilterSideBar />
              </div>
            </>
          );
        }}
      />
    </div>
  );
};

export default FilterDrawer;
