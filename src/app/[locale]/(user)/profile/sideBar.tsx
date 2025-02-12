'use client';

import Link from 'next/link';

import Icon from '@/components/Icon';
import { PATH } from '@/constants/path';
import images from '@/asset/images';

import Image from '@/components/Image';
import { usePathname } from '@/i18n/routing';

const accountLinks = [
  { name: 'Thông tin tài khoản', path: PATH.PROFILE_EDIT, icon: 'account' },
  { name: 'Đổi mật khẩu', path: PATH.CHANGE_PASSWORD, icon: 'password' },
];

const transactionLinks = [
  { name: 'Đơn hàng của bạn', path: PATH.ORDER, icon: 'account' },
  { name: 'Sản phẩm đã xem', path: PATH.VIEWED_PRODUCTS, icon: 'account' },
  { name: 'Danh sách yêu thích', path: PATH.FAVORITE, icon: 'heart' },
];

function SideBar() {
  const pathname = usePathname();

  return (
    <nav className="sm:pb-[200px] pb-[100px] bg-white shadow-md rounded-xl overflow-hidden">
      <div className="mb-4   relative">
        <Image src={images.avatarCover} alt="grocery-mart" height={250} className="h-[250px] w-full" />
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center justify-center w-full">
          <Image
            src={images.avatarTest}
            alt="grocery-mart"
            height={100}
            className="h-[100px] w-[100px] rounded-full "
          />
          <div className="text-white-200 text-lg font-semibold mt-5">Lenghia0183</div>
          <div className="text-white-200 text-sm">Registered: 17th May 2022</div>
        </div>
      </div>

      <div className="mb-6 mt-7">
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-blue-400"></div>
          <h2 className="flex-1 font-semibold text-dark text-lg bg-gray-100 h-full flex items-center p-2 mb-0">
            QUẢN LÝ TÀI KHOẢN
          </h2>
        </div>
        <ul className="space-y-1 px-3">
          {accountLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`flex items-center space-x-2 p-2 text-lg font-medium rounded hover:text-blue transition-all ${
                  pathname === link.path ? 'text-blue' : 'text-dark'
                }`}
              >
                <Icon name={link.icon} size={1.3} color="inherit" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <div className="flex h-fit items-stretch">
          <div className="w-[3px] bg-blue-400"></div>
          <h2 className="flex-1 font-semibold text-dark text-lg bg-gray-100 h-full flex items-center p-2 mb-0">
            QUẢN LÝ GIAO DỊCH
          </h2>
        </div>
        <ul className="space-y-2 px-3">
          {transactionLinks.map((link) => (
            <li key={link.path}>
              <Link
                href={link.path}
                className={`flex items-center space-x-2 p-2 text-lg font-medium rounded hover:text-blue transition-all ${
                  pathname === link.path ? 'text-blue' : 'text-dark'
                }`}
              >
                <Icon name={link.icon} size={1.3} color="inherit" />
                <span>{link.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default SideBar;
