'use client';

import Accordion from '@/components/Accordion';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Image from '@/components/Image';
import LabelValue from '@/components/LabelValue';
import Pagination from '@/components/Pagination';
import Tabs from '@/components/Tabs';
import { PATH } from '@/constants/path';
import { useQueryState } from '@/hooks/useQueryState';
import { useGetOrder, useUpdateOrderStatus } from '@/services/api/https/order';

import formatCurrency from '@/utils/formatCurrency';
import { useEffect, useState } from 'react';
import { CartDetail } from '@/types/cart';
import ReviewDialog from './ReviewDialog';
import { useToast } from '@/context/toastProvider';
import { useTranslations } from 'next-intl';
import { COMMENT_STATUS, ORDER_STATUS, ORDER_STATUS_LIST, PAYMENT_METHOD } from '@/constants/common';
import OrderListSkeleton from '@/components/Skeletons/Profile/OrderListSkeleton';
import { WithLoading } from '@/hocs/withLoading';

function Order() {
  const { page } = useQueryState();

  const tCommon = useTranslations('common');
  const t = useTranslations('order');

  const { tab, setTab } = useQueryState({ tab: ORDER_STATUS.PENDING });

  const {
    data: orderData,
    mutate: refreshOrder,
    isLoading: isLoadingGetOrderData,
    isValidating: isValidatingGetOrderData,
  } = useGetOrder({ status: tab, limit: 3, page });

  const { success, error } = useToast();

  const { trigger: updateOrderStatus, isMutating: isMutatingUpdateOrderStatus } = useUpdateOrderStatus();
  const [isOpenDialogReview, setIsOpenDialogReview] = useState(false);
  const [selectedCartDetail, setSelectedCartDetail] = useState<CartDetail | null>(null);

  useEffect(() => {
    refreshOrder();
  }, [tab, refreshOrder, page]);

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    updateOrderStatus(
      { orderId, status },
      {
        onSuccess: (response) => {
          if (response.code === 200) {
            success(t('updateSuccessful'));
          } else {
            error(response.message);
          }
        },
        onError: () => {
          error(tCommon('hasErrorTryAgainLater'));
        },
      },
    );
  };

  if (isLoadingGetOrderData || isValidatingGetOrderData) return <OrderListSkeleton />;

  return (
    <WithLoading isLoading={isMutatingUpdateOrderStatus}>
      <div className="p-7 bg-white dark:bg-dark-400 dark:text-white shadow-md rounded-lg">
        <h2 className="text-2xl font-medium">{t('title')}</h2>
        <Divider />
        <div className="sm:mt-5 mt-3 w-full">
          <Tabs
            className="w-full"
            list={ORDER_STATUS_LIST}
            getOptionLabel={(val) => {
              return tCommon(val.label);
            }}
            divider={true}
            value={tab}
            onChange={(val) => {
              setTab(val || '');
            }}
          >
            <div className="text-dark-400 dark:text-white-200 text-lg flex flex-col gap-3">
              {orderData?.data?.orders?.map((item) => (
                <div className="p-5 shadow-md bg-gray-100 dark:bg-dark-500" key={item._id}>
                  <div className="flex flex-col gap-2">
                    <LabelValue
                      className="!text-base"
                      label={t('paymentMethod')}
                      value={item.paymentMethod === PAYMENT_METHOD.BANK ? t('onlinePayment') : t('cod')}
                    />
                    <LabelValue
                      className="!text-base"
                      label={t('paymentStatus')}
                      value={item?.paymentMethod === PAYMENT_METHOD.BANK && item?.isPaid ? t('paid') : t('unPaid')}
                    />
                    <LabelValue className="!text-base" label={t('buyerName')} value={item.buyerName} />
                    <LabelValue className="!text-base" label={t('recipientName')} value={item.recipientName} />
                    <LabelValue
                      className="!text-base"
                      label={t('address')}
                      value={`${item.address.street}, ${item.address.ward.wardName}, ${item.address.district.districtName}, ${item.address.province.provinceName}`}
                    />
                  </div>

                  <h2 className="text-2xl text-center mt-5 text-yellow">{t('productList')}</h2>
                  <Divider length="80%" className="mx-auto" />
                  <Accordion key={item._id} minHeight="180px">
                    {item.cartDetails.map((cartItem) => (
                      <div key={cartItem._id}>
                        <div className="flex justify-between items-start py-3">
                          <div className="flex gap-3 xl:w-1/2 w-3/4 text-lg font-medium text-left ">
                            <Image
                              src={cartItem.productId.images[0]}
                              alt={''}
                              className="w-[100px] h-[100px]"
                              width={50}
                              height={50}
                            />
                            <p>{cartItem.productId.name}</p>
                          </div>
                          <div className="xl:flex gap-4">
                            <p className="text-lg text-center">{cartItem.quantity}</p>
                            <p className="text-lg text-center">x</p>
                            <p className="text-lg ">{formatCurrency(cartItem.productId.price)}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button
                            variant="outlined"
                            textColor="blue-500 dark:blue-400"
                            borderColor="blue-500 dark:blue-400"
                            textHoverColor="blue-400 dark:blue-500"
                            borderHoverColor="blue-400 dark:blue-500"
                            to={PATH.PRODUCT_DETAIL.replace(':productId', cartItem?.productId?._id)}
                          >
                            {tCommon('showItemDetail')}
                          </Button>

                          {cartItem?.commentStatus === COMMENT_STATUS.ALLOWED && (
                            <Button
                              variant="outlined"
                              textColor="blue-500 dark:blue-400"
                              borderColor="blue-500 dark:blue-400"
                              textHoverColor="blue-400 dark:blue-500"
                              borderHoverColor="blue-400 dark:blue-500"
                              bgHoverColor="none"
                              onClick={() => {
                                setIsOpenDialogReview(true);
                                setSelectedCartDetail(cartItem);
                              }}
                            >
                              {tCommon('review')}
                            </Button>
                          )}
                        </div>

                        <Divider color="dark-200" borderStyle="dashed" />
                      </div>
                    ))}
                  </Accordion>

                  <div className="flex flex-col gap-2">
                    <LabelValue
                      labelWidth="200px"
                      label={t('totalItemsPrice')}
                      labelClassName="!text-base"
                      valueClassName="text-blue-500 dark:text-blue-400"
                      value={formatCurrency(item.totalAmount - item?.shippingFee)}
                    />
                    <LabelValue
                      labelWidth="200px"
                      label={t('shippingFee')}
                      labelClassName="!text-base"
                      valueClassName="text-blue-500 dark:text-blue-400"
                      value={formatCurrency(item?.shippingFee)}
                    />
                    <LabelValue
                      labelWidth="200px"
                      label={t('totalPayment')}
                      labelClassName="!text-base"
                      valueClassName="text-blue-500 dark:text-blue-400"
                      value={formatCurrency(item.totalAmount)}
                    />
                  </div>

                  <div className="mt-7 ml-auto flex">
                    <div className="flex gap-3 ml-auto">
                      {item.status === ORDER_STATUS.PENDING && (
                        <Button
                          variant="outlined"
                          textColor="red-400"
                          borderColor="red-400"
                          bgHoverColor="red-300"
                          onClick={() => handleUpdateOrderStatus(item._id, ORDER_STATUS.CANCELED)}
                        >
                          {tCommon('cancel')}
                        </Button>
                      )}
                      {item?.paymentMethod === PAYMENT_METHOD.BANK &&
                        !item?.isPaid &&
                        item?.status === ORDER_STATUS.PENDING && (
                          <Button
                            variant="outlined"
                            textColor="blue-500 dark:blue-400"
                            borderColor="blue-500 dark:blue-400"
                            textHoverColor="blue-400 dark:blue-500"
                            borderHoverColor="blue-400 dark:blue-500"
                            href={item.payUrl}
                          >
                            {tCommon('continueCheckout')}
                          </Button>
                        )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Tabs>
        </div>

        <ReviewDialog
          isOpen={isOpenDialogReview}
          onCancel={() => {
            setIsOpenDialogReview(false);
            setSelectedCartDetail(null);
          }}
          selectedCartDetail={selectedCartDetail}
        />
        <Pagination pageCount={orderData?.data?.totalPage || 0} className="ml-auto mt-10" />
      </div>
    </WithLoading>
  );
}

export default Order;
