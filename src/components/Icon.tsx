import React from "react";
import clsx from "clsx";
import Gift from "../asset/icons/gift.svg";
import Search from "../asset/icons/search.svg";
import Heart from "../asset/icons/heart.svg";
import Cart from "../asset/icons/cart.svg";
import Password from "../asset/icons/password.svg";
import Email from "../asset/icons/email.svg";

import { createTailwindClass } from "@/utils";

type IconProps = {
  name: string;
  size?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
  hoverColor?: string;
  strokeWidth?: number;
};

export const icons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  gift: Gift,
  search: Search,
  heart: Heart,
  cart: Cart,
  password: Password,
  email: Email,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 1.5,
  width,
  height,
  className = "",
  color = "gray-500",
  hoverColor = "",
  strokeWidth,
  ...props
}) => {
  const IconComponent = icons[name];
  if (!IconComponent) {
    return null;
  }

  const iconProps = {
    ...(width && { width }),
    ...(height && { height }),
    ...(!width &&
      !height &&
      size && { width: `${size}em`, height: `${size}em` }),
    strokeWidth,
  };

  const colorsClass = createTailwindClass(
    ["text", "hover:text"],
    [color, hoverColor]
  );

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center transition duration-300",
        colorsClass,
        className
      )}
      {...props}
    >
      <IconComponent {...iconProps} />
    </span>
  );
};

Icon.displayName = "Icon";

export default Icon;
