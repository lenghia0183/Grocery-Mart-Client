/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { useClearMyCart, useGetMyCart } from '@/services/api/https/cart';
import { useToast } from '@/context/toastProvider';
import CartSkeleton from '@/components/Skeletons/CartSkeleton';

const Cart = (): JSX.Element => {
  const t = useTranslations('cart');
  const tCommon = useTranslations('common');
  const { error, success } = useToast();
  const { data: cartData, isLoading: isLoadingCartData, isValidating: isValidatingCartData } = useGetMyCart();
  const { trigger: clearMyCart, isMutating: isMutatingClearMyCart } = useClearMyCart();

  const cartItems = cartData?.data?.cartDetails || [];

  if (isLoadingCartData || isValidatingCartData) return <CartSkeleton />;

  return (
    <div className="bg-gray-100 dark:bg-dark-500 py-14 dark:text-white-200">
      <main className="container mx-auto px-4">
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* Danh sách sản phẩm */}
          <div className="xl:col-span-8 bg-white dark:bg-dark-400 shadow-md rounded-md p-4 xl:p-10 flex flex-col gap-5">
            {cartItems.map((cartItem) => (
              <CartItem key={cartItem?.productId?._id} cartId={cartData?.data?.id || ''} cartDetail={cartItem} />
            ))}
            {/* Phần tóm tắt giỏ hàng chỉ hiển thị trên desktop */}
            <div className="hidden xl:flex justify-between items-center pt-4">
              <Button
                variant="text"
                size="zeroPadding"
                bgHoverColor="none"
                startIcon={<Icon name="backArrow" color="inherit" />}
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
                  labelClassName="text-2xl"
                  className="justify-between"
                />
              </div>
            </div>
          </div>

          {/* Phần thanh toán */}
          <div className="xl:col-span-4 flex flex-col gap-6">
            <div className="bg-white dark:bg-dark-400 shadow-md rounded-md p-6">
              <LabelValue
                label={t('totalItems')}
                value={cartData?.data?.cartDetails?.length}
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
              <Button full rounded className="mt-5 py-3" to={PATH.CHECKOUT}>
                {t('checkout')}
              </Button>
            </div>
            <div className="bg-white dark:bg-dark-400 shadow-md rounded-md flex gap-4 p-6">
              <div className="flex items-center justify-center w-20 h-20 bg-purple-100 dark:bg-dark-500 rounded-md flex-shrink-0">
                <Image src={images.gift} alt="grocery-mart" className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-xl font-semibold">{t('giftTitle')}</p>
                <p className="text-sm">{t('giftDescription')}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Cart;
