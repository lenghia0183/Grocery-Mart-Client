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

function Order() {
  const { page } = useQueryState();

  const { tab, setTab } = useQueryState({ tab: 'pending' });

  const { data, mutate: refreshOrder, isLoading, isValidating } = useGetOrder({ status: tab, limit: 3, page });

  const { success, error } = useToast();

  const { trigger: updateOrderStatus } = useUpdateOrderStatus();
  const [isOpenDialogReview, setIsOpenDialogReview] = useState(false);
  const [selectedCartDetail, setSelectedCartDetail] = useState<CartDetail | null>(null);

  const isFetching = isLoading || isValidating;

  const tabList = [
    { label: 'Pending', value: 'pending' },
    { label: 'Confirmed', value: 'confirmed' },
    { label: 'Rejected', value: 'reject' },
    { label: 'Shipping', value: 'shipping' },
    { label: 'Success', value: 'success' },
    { label: 'Canceled', value: 'canceled' },
  ];

  useEffect(() => {
    refreshOrder();
  }, [tab, refreshOrder, page]);

  const handleUpdateOrderStatus = (orderId: string, status: string) => {
    updateOrderStatus(
      { orderId, status },
      {
        onSuccess: (response) => {
          if (response.code === 200) {
            success('Cập nhật đơn hàng thành công');
          } else {
            error(response.message);
          }
        },
        onError: () => {},
      },
    );
  };

  return (
    <div className="xl:p-4">
      <h2 className="text-2xl font-semibold text-dark shadow-md p-4">Order List</h2>
      <div className="sm:mt-5 mt-3 w-full">
        <Tabs
          className="w-full"
          list={tabList}
          divider={true}
          value={tab}
          onChange={(val) => {
            setTab(val || '');
          }}
        >
          {isFetching ? (
            // <OrderListSkeleton />
            <></>
          ) : (
            <div className="text-dark-400 text-lg flex flex-col gap-3">
              {data?.data?.orders?.map((item) => (
                <div className="p-5 shadow-md bg-gray-100" key={item._id}>
                  <div className="flex flex-col gap-2">
                    <LabelValue
                      className="!text-base"
                      label="Phương thức thanh toán:"
                      value={item.paymentMethod === 'Bank' ? 'Thanh toán trực tuyến' : 'Thanh toán khi nhận hàng'}
                    />
                    <LabelValue
                      className="!text-base"
                      label="Trạng thái thanh toán:"
                      value={item?.paymentMethod === 'bank' && item?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                    />
                    <LabelValue className="!text-base" label="Tên ngượi mua:" value={item.buyerName} />
                    <LabelValue className="!text-base" label="Tên người nhận:" value={item.recipientName} />
                    <LabelValue
                      className="!text-base"
                      label="Địa chỉ:"
                      value={`${item.address.street}, ${item.address.ward.wardName}, ${item.address.district.districtName}, ${item.address.province.provinceName}`}
                    />
                  </div>

                  <h2 className="text-2xl text-center mt-5 text-yellow">Danh sách sản phẩm</h2>
                  <Divider length="80%" className="mx-auto" />
                  <Accordion key={item._id} minHeight="180px">
                    {item.cartDetails.map((cartItem) => (
                      <div key={cartItem._id}>
                        <div className="flex justify-between items-start py-3">
                          <div className="flex gap-3 xl:w-1/2 w-3/4 text-lg font-medium text-left text-dark">
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
                            <p className="text-lg text-crimson text-center">{cartItem.quantity}</p>
                            <p className="text-lg text-crimson text-center">x</p>
                            <p className="text-lg text-crimson">{formatCurrency(cartItem.productId.price)}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Button
                            variant="outlined"
                            textColor="blue-500"
                            borderColor="blue-500"
                            textHoverColor="blue-400"
                            borderHoverColor="blue-400"
                            to={PATH.PRODUCT_DETAIL.replace(':productId', cartItem?.productId?._id)}
                          >
                            Xem chi tiết sản phẩm
                          </Button>

                          {cartItem?.commentStatus === 'allowed' && (
                            <Button
                              variant="outlined"
                              textHoverColor="blue"
                              borderHoverColor="blue"
                              onClick={() => {
                                setIsOpenDialogReview(true);
                                setSelectedCartDetail(cartItem);
                              }}
                            >
                              Đánh giá
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
                      label="Tổng tiền sản phẩm:"
                      labelClassName="!text-base"
                      valueClassName="text-blue-500"
                      value={formatCurrency(item.totalAmount - item?.shippingFee)}
                    />
                    <LabelValue
                      labelWidth="200px"
                      label="Phí giao hàng:"
                      labelClassName="!text-base"
                      valueClassName="text-blue-500"
                      value={formatCurrency(item?.shippingFee)}
                    />
                    <LabelValue
                      labelWidth="200px"
                      label="Tổng tiền đơn hàng:"
                      labelClassName="!text-base"
                      valueClassName="text-blue-500"
                      value={formatCurrency(item.totalAmount)}
                    />
                  </div>

                  <div className="mt-7 ml-auto flex">
                    <div className="flex gap-3 ml-auto">
                      {item.status === 'pending' && (
                        <Button
                          variant="outlined"
                          textColor="red-400"
                          borderColor="red-400"
                          bgHoverColor="red-300"
                          onClick={() => handleUpdateOrderStatus(item._id, 'canceled')}
                        >
                          Hủy
                        </Button>
                      )}
                      {item?.paymentMethod === 'Bank' && !item?.isPaid && item?.status === 'pending' && (
                        <Button
                          variant="outlined"
                          textHoverColor="blue"
                          borderHoverColor="blue"
                          onClick={() => handleUpdateOrderStatus(item._id, 'confirmed')}
                          href={item.payUrl}
                        >
                          Tiến hành thanh thanh toán
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Tabs>
      </div>
      <Pagination pageCount={data?.data?.totalPage || 0} className="ml-auto mt-10" />

      <ReviewDialog
        isOpen={isOpenDialogReview}
        onCancel={() => {
          setIsOpenDialogReview(false);
          setSelectedCartDetail(null);
        }}
        selectedCartDetail={selectedCartDetail}
      />
    </div>
  );
}

export default Order;
