import React from "react";
import clsx from "clsx";
import Gift from "../asset/icons/gift.svg";

type IconProps = {
  name: string;
  size?: number;
  width?: number | string;
  height?: number | string;
  className?: string;
  color?: string;
  strokeWidth?: string | number;
};

export const icons: Record<
  string,
  React.ComponentType<React.SVGProps<SVGSVGElement>>
> = {
  gift: Gift,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 2,
  width,
  height,
  className = "",
  color = "text-gray",
  strokeWidth,
  ...props
}) => {
  const IconComponent = icons[name];
  if (!IconComponent) {
    return null;
  }

  const sizeStyle = {
    width: width || `${size}em`,
    height: height || `${size}em`,
  };

  const style = {
    strokeWidth,
  };

  return (
    <span
      className={clsx(
        "inline-flex items-center justify-center transition duration-300",
        color,
        className
      )}
      style={{ ...sizeStyle, ...style }}
      {...props}
    >
      <IconComponent className="w-full h-full" />
    </span>
  );
};

export default Icon;
