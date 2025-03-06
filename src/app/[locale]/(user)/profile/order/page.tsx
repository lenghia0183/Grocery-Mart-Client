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
  const tCommon = useTranslations('common');
  const t = useTranslations('order');

  const { tab, setTab, page } = useQueryState({ tab: ORDER_STATUS.PENDING });

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
      <div className="p-4 sm:p-7 bg-white dark:bg-dark-400 dark:text-white shadow-md rounded-lg">
        <h2 className="text-2xl font-medium">{t('title')}</h2>
        <Divider />
        <div className="mt-3 sm:mt-5 w-full">
          <Tabs
            className="w-full"
            list={ORDER_STATUS_LIST}
            getOptionLabel={(val) => tCommon(val.label)}
            divider={true}
            value={tab}
            onChange={(val) => {
              setTab(val || '');
            }}
          >
            <div className="text-dark-400 dark:text-white-200 text-base sm:text-lg flex flex-col gap-3">
              {orderData?.data?.orders?.map((item) => (
                <div className="p-4 sm:p-5 shadow-md bg-gray-100 dark:bg-dark-500 rounded-lg" key={item._id}>
                  {/* Thông tin đơn hàng */}
                  <div className="flex flex-col gap-2">
                    <LabelValue
                      className="text-sm sm:text-base"
                      label={t('paymentMethod')}
                      value={item.paymentMethod === PAYMENT_METHOD.BANK ? t('onlinePayment') : t('cod')}
                    />
                    <LabelValue
                      className="text-sm sm:text-base"
                      label={t('paymentStatus')}
                      value={item?.paymentMethod === PAYMENT_METHOD.BANK && item?.isPaid ? t('paid') : t('unPaid')}
                    />
                    <LabelValue className="text-sm sm:text-base" label={t('buyerName')} value={item.buyerName} />
                    <LabelValue
                      className="text-sm sm:text-base"
                      label={t('recipientName')}
                      value={item.recipientName}
                    />
                    <LabelValue
                      className="text-sm sm:text-base"
                      label={t('address')}
                      value={`${item.address.street}, ${item.address.ward.wardName}, ${item.address.district.districtName}, ${item.address.province.provinceName}`}
                    />
                  </div>

                  {/* Danh sách sản phẩm */}
                  <h2 className="text-xl sm:text-2xl text-center mt-5 text-yellow">{t('productList')}</h2>
                  <Divider length="80%" className="mx-auto" />
                  <Accordion key={item._id} minHeight="180px">
                    {item.cartDetails.map((cartItem) => (
                      <div key={cartItem._id} className="mb-3">
                        <div className="flex flex-col sm:flex-row justify-between items-center py-3">
                          <div className="flex gap-3 w-full sm:w-1/2 text-base sm:text-lg font-medium text-left">
                            <Image
                              src={cartItem.productId.images[0]}
                              alt={cartItem.productId.name}
                              className="w-20 h-20 sm:w-[100px] sm:h-[100px] object-cover"
                              width={50}
                              height={50}
                            />
                            <p className="break-words">{cartItem.productId.name}</p>
                          </div>
                          <div className="flex gap-4 items-center mt-2 sm:mt-0">
                            <p className="text-base sm:text-lg text-center">{cartItem.quantity}</p>
                            <p className="text-base sm:text-lg text-center">x</p>
                            <p className="text-base sm:text-lg">{formatCurrency(cartItem.productId.price)}</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center gap-2">
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

                  {/* Tổng tiền đơn hàng */}
                  <div className="flex flex-col gap-2 mt-4">
                    <LabelValue
                      labelWidth="170px"
                      label={t('totalItemsPrice')}
                      labelClassName="text-sm sm:text-base"
                      valueClassName="text-blue-500 dark:text-blue-400"
                      value={formatCurrency(item.totalAmount - item?.shippingFee)}
                    />
                    <LabelValue
                      labelWidth="170px"
                      label={t('shippingFee')}
                      labelClassName="text-sm sm:text-base"
                      valueClassName="text-blue-500 dark:text-blue-400"
                      value={formatCurrency(item?.shippingFee)}
                    />
                    <LabelValue
                      labelWidth="170px"
                      label={t('totalPayment')}
                      labelClassName="text-sm sm:text-base"
                      valueClassName="text-blue-500 dark:text-blue-400"
                      value={formatCurrency(item.totalAmount)}
                    />
                  </div>

                  {/* Các hành động */}
                  <div className="mt-7 ml-auto flex">
                    <div className="flex gap-3 ml-auto flex-wrap">
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
