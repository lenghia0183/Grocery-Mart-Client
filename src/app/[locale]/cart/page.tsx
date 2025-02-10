'use client';

import LabelValue from '@/components/LabelValue';
import CartItem from './CartItem';
import Divider from '@/components/Divider';
import Button from '@/components/Button';
import formatCurrency from '@/utils/formatCurrency';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import images from '@/asset/images';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { PATH } from '@/constants/path';

const Cart = (): JSX.Element => {
  const fakeCartItems = [
    {
      id: 'PROD123456',
      name: 'Organic Matcha Green Tea Powder - Premium Grade',
      price: 150000.0,
      images: ['https://img.freepik.com/free-photo/matcha-green-tea-powder-wooden-bowl_1150-11201.jpg'],
      inStock: true,
      branch: 'Japanese Organic Tea Co.',
      quantity: 2,
    },
    {
      id: 'PROD789012',
      name: 'Arabica Coffee Beans - 500g',
      price: 120000.0,
      images: ['https://img.freepik.com/free-photo/coffee-beans-sack_1339-6433.jpg'],
      inStock: false,
      branch: 'Vietnam Premium Coffee',
      quantity: 1,
    },
    {
      id: 'PROD345678',
      name: 'Dark Chocolate 85% Cocoa - Sugar Free',
      price: 95000.0,
      images: ['https://img.freepik.com/free-photo/dark-chocolate-bars_114579-1330.jpg'],
      inStock: true,
      branch: 'Belgian Chocolate Factory',
      quantity: 3,
    },
  ];

  // Tính tổng số lượng sản phẩm
  const totalItems = fakeCartItems.reduce((acc, item) => acc + item.quantity, 0);

  // Tính tổng giá trị đơn hàng (chỉ tính sản phẩm còn hàng)
  const totalPrice = fakeCartItems
    .filter((item) => item.inStock)
    .reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      <Header />
      <div className="bg-gray-100 py-10">
        <main className="container">
          <div className="grid grid-cols-12 gap-x-10">
            {/* Danh sách sản phẩm trong giỏ hàng */}
            <div className="col-span-8 p-10 flex flex-col gap-5 bg-white shadow-md rounded-md">
              {fakeCartItems.map((product) => (
                <CartItem key={product.id} product={product} />
              ))}
              <div className="flex justify-between">
                <Button
                  variant="text"
                  size="zeroPadding"
                  bgHoverColor="none"
                  startIcon={<Icon name="backArrow" color="inherit" />}
                  className="mt-auto"
                  href={PATH.PRODUCTS}
                >
                  Tiếp tục mua hàng
                </Button>
                <div className="flex flex-col w-1/2 gap-3">
                  <LabelValue
                    label="Tổng giá trị đơn hàng:"
                    value={formatCurrency(totalPrice)}
                    className="justify-between"
                  />
                  <LabelValue label="Phụ phí:" value={formatCurrency(0)} className="justify-between" />
                  <Divider />

                  <LabelValue
                    label="Tổng tiền thanh toán:"
                    value={formatCurrency(totalPrice)}
                    labelClassName="text-[25px]"
                    className="justify-between"
                  />
                </div>
              </div>
            </div>

            {/* Phần thanh toán */}
            <div className="col-span-4 ">
              <div className="flex flex-col gap-3 bg-white p-10 shadow-md rounded-md">
                <LabelValue label="Tổng số lượng sản phẩm" value={totalItems} className="justify-between" />
                <LabelValue
                  label="Tổng giá trị đơn hàng:"
                  value={formatCurrency(totalPrice)}
                  className="justify-between"
                />
                <LabelValue label="Phụ phí:" value={formatCurrency(0)} className="justify-between" />
                <Divider />

                <LabelValue
                  label="Tổng tiền thanh toán:"
                  value={formatCurrency(totalPrice)}
                  className="justify-between"
                />

                <Button full rounded className="mt-5 py-3">
                  Tiến hành thanh toán
                </Button>
              </div>

              <div className="flex bg-white px-10 py-7 shadow-md rounded-md mt-7 gap-4">
                <div className="flex items-center justify-center w-[80px] h-[80px] bg-purple-100 rounded-md flex-shrink-0">
                  <Image src={images.gift} alt="grocery-mart" />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-xl font-semibold">Send this order as a gift.</p>
                  <p className="">Available items will be shipped to your gift recipient.</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </>
  );
};

export default Cart;
