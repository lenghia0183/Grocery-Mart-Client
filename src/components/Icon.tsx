import React from 'react';
import clsx from 'clsx';
import Gift from '../asset/icons/gift.svg';
import Search from '../asset/icons/search.svg';
import Heart from '../asset/icons/heart.svg';
import Cart from '../asset/icons/cart.svg';
import Password from '../asset/icons/password.svg';
import Email from '../asset/icons/email.svg';
import ArrowDown from '../asset/icons/arrowDown.svg';
import Close from '../asset/icons/close.svg';
import Upload from '../asset/icons/upload.svg';
import Plus from '../asset/icons/plus.svg';
import Minus from '../asset/icons/minus.svg';
import PreviousPage from '../asset/icons/previousPage.svg';
import NextPage from '../asset/icons/nextPage.svg';
import FirstPage from '../asset/icons/firstPage.svg';
import LastPage from '../asset/icons/lastPage.svg';
import Account from '../asset/icons/account.svg';
import DarkMode from '../asset/icons/darkMode.svg';
import Language from '../asset/icons/language.svg';
import Logout from '../asset/icons/logout.svg';
import setting from '../asset/icons/setting.svg';
import Sun from '../asset/icons/sun.svg';
import Moon from '../asset/icons/moon.svg';
import BackArrow from '../asset/icons/backArrow.svg';
import Star from '../asset/icons/star.svg';
import Facebook from '../asset/icons/facebook.svg';
import Zalo from '../asset/icons/zalo.svg';
import Instagram from '../asset/icons/instagram.svg';
import Phone from '../asset/icons/phone.svg';
import Address from '../asset/icons/address.svg';
import Calendar from '../asset/icons/calendar.svg';
import Clock from '../asset/icons/clock.svg';
import Send from '../asset/icons/send.svg';

import { createTailwindClass } from '@/utils';

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

export const icons: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  gift: Gift,
  search: Search,
  heart: Heart,
  cart: Cart,
  password: Password,
  email: Email,
  arrowDown: ArrowDown,
  close: Close,
  upload: Upload,
  plus: Plus,
  minus: Minus,
  previousPage: PreviousPage,
  nextPage: NextPage,
  firstPage: FirstPage,
  lastPage: LastPage,
  account: Account,
  darkMode: DarkMode,
  language: Language,
  logout: Logout,
  setting: setting,
  sun: Sun,
  moon: Moon,
  backArrow: BackArrow,
  star: Star,
  facebook: Facebook,
  zalo: Zalo,
  instagram: Instagram,
  phone: Phone,
  address: Address,
  calendar: Calendar,
  clock: Clock,
  send: Send,
};

const Icon: React.FC<IconProps> = ({
  name,
  size = 1.5,
  width,
  height,
  className = '',
  color = 'gray-500',
  hoverColor = '',
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
    ...(!width && !height && size && { width: `${size}em`, height: `${size}em` }),
    strokeWidth,
  };

  const colorsClass = createTailwindClass(['text', 'hover:text'], [color, hoverColor]);

  return (
    <span
      className={clsx('inline-flex items-center justify-center transition duration-300', colorsClass, className)}
      {...props}
    >
      <IconComponent {...iconProps} />
    </span>
  );
};

Icon.displayName = 'Icon';

export default Icon;
