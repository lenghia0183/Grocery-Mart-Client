import React from "react";
import Logo from "./Logo";

const Header: React.FC = () => {
  return (
    <header className="bg-gray-200">
      <div className="container py-6">
        <Logo />
      </div>
    </header>
  );
};

export default Header;
