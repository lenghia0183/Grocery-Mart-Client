import React from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import Loading from '@/components/Loading';
import Icon from '@/components/Icon';
import { createTailwindClass } from '@/utils';

export interface IconButtonProps {
  iconName: string;
  onClick?: () => void;
  disabled?: boolean;
  loading?: boolean;
  size?: 'small' | 'medium' | 'large' | 'zeroPadding';
  variant?: 'contained' | 'outlined' | 'text';
  iconSize?: number;
  iconWidth?: string;
  iconHeight?: string;
  iconClass?: string;
  iconStrokeWidth?: number;
  iconColor?: string;
  iconHoverColor?: string;
  bgColor?: string;
  bgHoverColor?: string;
  borderColor?: string;
  className?: string;
  rounded?: boolean;
  width?: string;
  height?: string;
  href?: string;
  type?: 'button' | 'submit' | 'reset';
}

const IconButton: React.FC<IconButtonProps> = ({
  iconName,
  onClick,
  disabled = false,
  loading = false,
  size = 'zeroPadding',
  variant = 'text',
  iconSize,
  iconWidth,
  iconHeight,
  iconClass,
  iconStrokeWidth,
  iconColor = '',
  iconHoverColor = '',
  bgColor = '',
  bgHoverColor = '',
  borderColor = '',
  className,
  rounded = false,
  width = '',
  height = '',
  href,
  type = 'button',
  ...props
}) => {
  const textHoverColorClass = createTailwindClass('hover:text', iconHoverColor);
  const iconColorClass = createTailwindClass('text', iconColor);
  const bgColorClass = createTailwindClass('bg', bgColor);
  const bgHoverColorClass = createTailwindClass('hover:bg', bgHoverColor);

  const baseClasses =
    'shadow-button-light outline-none rounded-md transition duration-200 flex items-center justify-center';

  const sizeClasses = {
    small: 'px-2 py-2',
    medium: 'px-3 py-3',
    large: 'px-4 py-4',
    zeroPadding: 'p-0',
  };

  const variantClasses = {
    contained: clsx(
      iconColorClass || 'text-dark',
      textHoverColorClass || 'hover:text-blue',
      bgColorClass || 'bg-white',
      bgHoverColorClass || '',
    ),
    outlined: clsx(
      'border',
      iconColorClass || 'text-dark-400',
      textHoverColorClass,
      borderColor || 'border-gray-400',
      bgHoverColorClass || 'hover:bg-blue-100',
    ),
    text: clsx(iconColorClass || 'text-blue-400', textHoverColorClass, bgHoverColorClass || '', bgColorClass || ''),
  };

  const classes = clsx(
    baseClasses,
    sizeClasses[size],
    variantClasses[variant],
    {
      'opacity-50 cursor-not-allowed': disabled || loading,
      'rounded-full': rounded,
    },
    className,
  );

  if (href) {
    return (
      <Link href={href} className={classes} style={{ width, height }} {...props}>
        {loading ? (
          <Loading color={iconColor || 'white'} size={1} />
        ) : (
          <Icon
            className={iconClass}
            name={iconName}
            size={iconSize}
            width={iconWidth}
            height={iconHeight}
            color="inherit"
            strokeWidth={iconStrokeWidth}
          />
        )}
      </Link>
    );
  }

  return (
    <button
      className={classes}
      onClick={disabled || loading ? undefined : onClick}
      disabled={disabled || loading}
      style={{ width, height }}
      type={type}
      {...props}
    >
      {loading ? (
        <Loading color={iconColor || 'white'} size={1} />
      ) : (
        <Icon
          className={iconClass}
          name={iconName}
          size={iconSize}
          width={iconWidth}
          height={iconHeight}
          color="inherit"
          strokeWidth={iconStrokeWidth}
        />
      )}
    </button>
  );
};

IconButton.displayName = 'IconButton';
export default IconButton;
