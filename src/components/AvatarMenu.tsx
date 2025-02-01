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
    icon: <Icon name="account" />,
  },
  {
    label: 'Giỏ hàng',
  },
  {
    label: 'Yêu thích',
    divide: true,
  },
  {
    label: 'Cài đặt',
    subMenu: [
      {
        label: 'Giao diện',
        subMenu: [
          { label: 'Chế độ sáng', value: 'light' },
          { label: 'Chế độ tối', value: 'dark' },
        ],
      },
      {
        label: 'Ngôn ngữ',
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
        <div className="h-[50px] w-[50px] rounded-md bg-dark-100"></div>
        <div className="">
          <p>Lenghia0183</p>
          <p className="mt-1 text-sm font-normal text-gray-500 truncate w-[120px]" title="Lenghia0183@gmail.com">
            Lenghia0183@gmail.com
          </p>
        </div>
      </li>

      {menuStack.length > 1 && (
        <li onClick={goBack} className="py-3 px-5 hover:bg-gray-400 cursor-pointer font-semibold">
          ← Back
        </li>
      )}
      {currentMenu.subMenu?.map((item, index) => (
        <li key={index} className="relative hover:text-blue-500">
          <div
            onClick={() => item.subMenu && setMenuStack((prev) => [...prev, item])}
            className={clsx('py-3 px-5 hover:bg-gray-400 cursor-pointer flex justify-between items-center')}
          >
            {item.label}
            {item.subMenu && <span className="text-gray-500">▶</span>}
          </div>
          {item.divide && <div className="h-[1px] my-1 mx-5 bg-gray-400"></div>}
        </li>
      ))}
    </ul>
  );
};

export default AvatarMenu;
