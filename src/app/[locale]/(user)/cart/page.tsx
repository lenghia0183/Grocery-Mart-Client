'use client';

import LabelValue from '@/components/LabelValue';
import CartItem from './CartItem';
import Divider from '@/components/Divider';
import Button from '@/components/Button';
import formatCurrency from '@/utils/formatCurrency';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import images from '@/asset/images';

import { PATH } from '@/constants/path';
import { useTranslations } from 'next-intl';
import { useGetMyCart } from '@/services/api/https/cart';

const Cart = (): JSX.Element => {
  const t = useTranslations('cart');

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: cartData, isLoading: isLoadingCartData } = useGetMyCart();

  const cartItems = cartData?.data?.cartDetails || [];

  return (
    <>
      <div className="bg-gray-100 dark:bg-dark-500 py-14 dark:text-white-200">
        <main className="container">
          <div className="grid grid-cols-12 gap-x-10">
            {/* Danh sách sản phẩm trong giỏ hàng */}
            <div className="col-span-8 p-10 flex flex-col gap-5 bg-white dark:bg-dark-400 shadow-md rounded-md">
              {cartItems.map((product) => (
                <CartItem
                  key={product?.productId?._id}
                  product={product?.productId}
                  cartId={cartData?.data?.id || ''}
                  cartDetailId={product?._id}
                />
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
                  {t('continueShopping')}
                </Button>
                <div className="flex flex-col w-1/2 gap-3">
                  <LabelValue
                    label={t('totalPrice')}
                    value={formatCurrency(cartData?.data?.cartTotalMoney)}
                    className="justify-between"
                  />
                  <LabelValue label={t('extraFee')} value={formatCurrency(0)} className="justify-between" />
                  <Divider />

                  <LabelValue
                    label={t('totalPayment')}
                    value={formatCurrency(cartData?.data?.cartTotalMoney)}
                    labelClassName="text-[25px]"
                    className="justify-between"
                  />
                </div>
              </div>
            </div>

            {/* Phần thanh toán */}
            <div className="col-span-4 ">
              <div className="flex flex-col gap-3 bg-white dark:bg-dark-400 p-10 shadow-md rounded-md">
                <LabelValue
                  label={t('totalItems')}
                  value={cartData?.data?.cartDetails.length}
                  className="justify-between"
                />
                <LabelValue
                  label={t('totalPrice')}
                  value={formatCurrency(cartData?.data?.cartTotalMoney)}
                  className="justify-between"
                />
                <LabelValue label={t('extraFee')} value={formatCurrency(0)} className="justify-between" />
                <Divider />

                <LabelValue
                  label={t('totalPayment')}
                  value={formatCurrency(cartData?.data?.cartTotalMoney)}
                  className="justify-between"
                />

                <Button full rounded className="mt-5 py-3">
                  {t('checkout')}
                </Button>
              </div>

              <div className="flex bg-white dark:bg-dark-400 px-10 py-7 shadow-md rounded-md mt-7 gap-4">
                <div className="flex items-center justify-center w-[80px] h-[80px] bg-purple-100 dark:bg-dark-500 rounded-md flex-shrink-0">
                  <Image src={images.gift} alt="grocery-mart" />
                </div>
                <div className="flex flex-col justify-between">
                  <p className="text-xl font-semibold"> {t('giftTitle')}</p>
                  <p className="">{t('giftDescription')}</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Cart;
