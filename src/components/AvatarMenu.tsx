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
        label: 'Giao diện',

        subMenu: [
          { label: 'Chế độ sáng', value: 'light' },
          { label: 'Chế độ tối', value: 'dark' },
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
            <div className="flex items-center justify-between text-inherit w-full">
              <div>{item.label}</div>
              {item.icon && item.icon}
            </div>
            {/* {item.subMenu && <span className="text-gray-500">▶</span>} */}
          </div>
          {item.divide && <div className="h-[1px] my-1 mx-5 bg-gray-400"></div>}
        </li>
      ))}
    </ul>
  );
};

export default AvatarMenu;
