import React from "react";
import Logo from "./Logo";
import Button from "./Button";
import IconButton from "./IconButton";

const Header: React.FC = () => {
  return (
    <header className="bg-blue-200 shadow-sm shadow-slate-300">
      <div className="container py-6 flex">
        <Logo />

        <div className="flex ml-[70px]">
          <Button href="/" variant="text" className="text-lg px-[15px]">
            Trang chủ
          </Button>
          <Button href="/" variant="text" className="text-lg px-[15px]">
            Coffee
          </Button>
          <Button href="/" variant="text" className="text-lg px-[15px]">
            Trà đào
          </Button>
          <Button href="/" variant="text" className="text-lg px-[15px]">
            Cacao
          </Button>

          <IconButton
            iconName="search"
            variant="contained"
            width="50px"
            height="50px"
            iconWidth="21px"
            iconHeight="21px"
            iconStrokeWidth={1.8}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
