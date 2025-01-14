import React from 'react';
import Logo from './Logo';
import Button from './Button';
import IconButton from './IconButton';

const Header: React.FC = () => {
  return (
    <header className="bg-blue-200 shadow-sm shadow-slate-300">
      <div className="container flex justify-between py-6">
        <div className="flex">
          <Logo />

          <div className="ml-[70px] flex">
            <Button href="/" variant="text" className="px-[15px] text-lg">
              Trang chủ
            </Button>
            <Button href="/" variant="text" className="px-[15px] text-lg">
              Coffee
            </Button>
            <Button href="/" variant="text" className="px-[15px] text-lg">
              Trà đào
            </Button>
            <Button href="/" variant="text" className="px-[15px] text-lg">
              Cacao
            </Button>
          </div>
        </div>

        <div className="flex gap-3">
          <IconButton
            iconName="search"
            variant="contained"
            width="50px"
            height="50px"
            iconWidth="21px"
            iconHeight="21px"
            iconStrokeWidth={1.8}
          />

          <div className="flex items-center gap-3 rounded-md bg-white shadow-button-light">
            <div className="flex items-center gap-2 py-3 pl-5 hover:text-blue-300">
              <IconButton
                className="shadow-none"
                iconName="heart"
                variant="text"
                iconColor="inherit"
                iconHoverColor="inherit"
                iconWidth="21px"
                iconHeight="21px"
                iconStrokeWidth={1.8}
              />
              <p className="min-w-[20px] max-w-[30px] truncate overflow-ellipsis transition-colors duration-300">333</p>
            </div>

            <div className="h-[60%] w-[1px] bg-gray-400"></div>

            <div className="flex items-center gap-2 py-3 pr-5 hover:text-blue-300">
              <IconButton
                className="shadow-none"
                iconName="cart"
                variant="text"
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
          <div className="h-[50px] w-[50px] rounded-md bg-dark-100"></div>
        </div>
      </div>
    </header>
  );
};

Header.displayName = 'Header';
export default Header;
