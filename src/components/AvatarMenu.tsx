import clsx from 'clsx';
import { useState } from 'react';
import Icon from './Icon';

interface MenuItem {
  label: string;
  subMenu?: MenuItem[];
  icon?: React.ReactNode;
  divide?: boolean;
  value?: string;
}

const menuItems: MenuItem[] = [
  {
    label: 'Tài khoản',
    icon: <Icon name="account" color="inherit" strokeWidth={1.75} />,
  },
  {
    label: 'Giỏ hàng',
    icon: <Icon name="cart" color="inherit" strokeWidth={1.8} />,
  },
  {
    label: 'Yêu thích',
    icon: <Icon name="heart" color="inherit" strokeWidth={1.8} />,
    divide: true,
  },
  {
    label: 'Cài đặt',
    icon: <Icon name="setting" color="inherit" size={1.7} />,
    subMenu: [
      {
        label: 'Chế độ sáng tối',
        icon: <Icon name="darkMode" color="inherit" size={1.7} strokeWidth={111} />,
        subMenu: [
          {
            label: 'Chế độ sáng',
            value: 'light',
            icon: <Icon name="sun" color="inherit" strokeWidth={1.6} size={1.9} />,
          },
          { label: 'Chế độ tối', value: 'dark', icon: <Icon name="moon" color="inherit" strokeWidth={0.5} /> },
        ],
      },
      {
        label: 'Ngôn ngữ',
        icon: <Icon name="language" color="inherit" />,
        subMenu: [
          { label: 'Tiếng Việt', value: 'vi' },
          { label: 'Tiếng Anh', value: 'en' },
        ],
      },
    ],
    divide: true,
  },
  {
    label: 'Đăng xuất',
    icon: <Icon name="logout" color="inherit" size={1.3} strokeWidth={15} />,
  },
];

const AvatarMenu = () => {
  const [menuStack, setMenuStack] = useState<MenuItem[]>([{ label: 'main', subMenu: menuItems }]);

  const currentMenu = menuStack[menuStack.length - 1];

  const goBack = () => {
    if (menuStack.length > 1) {
      setMenuStack((prev) => prev.slice(0, -1));
    }
  };

  return (
    <ul className="max-w-[240px] rounded-2xl overflow-hidden text-dark font-semibold text-base pb-">
      <li className="p-5 flex gap-5 item-center">
        <div className="h-[50px] w-[50px] rounded-md bg-dark"></div>
        <div className="">
          <p>Lenghia0183</p>
          <p className="mt-1 text-sm font-normal text-gray-500 truncate w-[120px]" title="Lenghia0183@gmail.com">
            Lenghia0183@gmail.com
          </p>
        </div>
      </li>

      {menuStack.length > 1 && (
        <li onClick={goBack} className=" hover:bg-gray-400 hover:text-blue-500 cursor-pointer font-semibold">
          <div className=" py-2 px-5 flex items-center justify-between">
            <Icon name="backArrow" color="inherit" size={1.5} />
            Quay lại
          </div>
          <div className="h-[1px] my-1 mx-1 bg-gray-500"></div>
        </li>
      )}
      {currentMenu.subMenu?.map((item, index) => (
        <li key={index} className="relative hover:text-blue-500">
          <div
            onClick={() => item.subMenu && setMenuStack((prev) => [...prev, item])}
            className={clsx('py-3 px-5 hover:bg-gray-400 cursor-pointer flex justify-between items-center')}
          >
            <div className="flex items-center justify-between text-inherit w-full">
              <div>{item.label}</div>
              {item.icon && item.icon}
            </div>
          </div>
          {item.divide && <div className="h-[1px] my-1 mx-5 bg-gray-400"></div>}
        </li>
      ))}
    </ul>
  );
};

export default AvatarMenu;
