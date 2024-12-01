import React from "react";
import clsx from "clsx";
import Loading from "@/components/Loading";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: "small" | "medium" | "large" | "zeroPadding";
  variant?: "contained" | "outlined" | "text";
  textColor?: string;
  textHoverColor?: string;
  bgColor?: string;
  bgHoverColor?: string;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  borderColor?: string;
  borderHoverColor?: string;
  className?: string;
  iconClassName?: string;
  width?: string;
  rounded?: boolean;
  full?: boolean;
  height?: string;
  href?: string;
  to?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  loading = false,
  size = "medium",
  variant = "contained",
  textColor = "",
  textHoverColor = "",
  bgColor = "",
  bgHoverColor = "",
  startIcon,
  endIcon,
  borderColor,
  borderHoverColor,
  className,
  iconClassName = "",
  width,
  rounded,
  full,
  height,
  href,
  to,
  ...props
}) => {
  const isLink = Boolean(to || href);

  const baseClasses =
    "rounded focus:outline-none transition duration-300 flex w-fit items-center justify-center cursor-pointer font-medium";

  const sizeClasses = {
    small: "px-2 py-1 text-sm",
    medium: "px-5 py-2 text-base",
    large: "px-7 py-3 text-lg",
    zeroPadding: "p-0",
  };

  const variantClasses = {
    contained: clsx(
      textColor || "text-dark",
      bgColor || "bg-yellow",
      bgHoverColor || "hover:bg-yellow",
      textHoverColor || "hover:text-blue-500"
    ),
    outlined: clsx(
      "border",
      textColor || "text-blue-500",
      borderColor || "border-blue-500",
      bgHoverColor || "hover:bg-blue-200",
      textHoverColor || "hover:text-white",
      borderHoverColor || ""
    ),
    text: clsx(
      "hover:underline",
      textColor || "text-blue-500",
      bgHoverColor || "hover:bg-blue-200",
      textHoverColor || ""
    ),
  };

  const linkClass = clsx(
    textColor || "text-dark-500",
    bgHoverColor || "hover:bg-transparent",
    borderColor || "",
    borderHoverColor || "",
    bgColor || "",
    textHoverColor || "hover:text-blue-400"
  );

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    {
      [variantClasses[variant]]: variant,
      [linkClass]: isLink,
      "opacity-50 cursor-not-allowed": disabled || loading,
      "rounded-full": rounded,
      "w-full": full,
    },
    className
  );

  const content = () => (
    <>
      {loading ? (
        <>
          <Loading color={textColor || "white"} size={1} />
          <span className="ml-2">Đang tải...</span>
        </>
      ) : (
        <>
          {startIcon && (
            <span
              className={clsx(
                "mr-2 flex items-center text-inherit",
                iconClassName
              )}
            >
              {startIcon}
            </span>
          )}
          <span className={clsx("text-inherit", iconClassName)}>
            {children}
          </span>
          {endIcon && <span className="ml-2 flex items-center">{endIcon}</span>}
        </>
      )}
    </>
  );

  return isLink ? (
    <Link href={to || href || "#"} className={classes} {...props}>
      {content()}
    </Link>
  ) : (
    <button
      className={classes}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={{ width, height }}
      {...props}
    >
      {content()}
    </button>
  );
};

export default Button;
