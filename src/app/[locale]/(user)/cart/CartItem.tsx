import { Formik, Form } from 'formik';
import formatCurrency from '@/utils/formatCurrency';
import Divider from '@/components/Divider';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import QuantityInput from '@/components/QuantityInput';
import Image from '@/components/Image';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useDeleteCartDetail, useUpdateCartDetail } from '@/services/api/https/cart';
import { WithLoading } from '@/hocs/withLoading';
import { useToast } from '@/context/toastProvider';
import { CartDetail } from '@/types/cart';

interface CartItemProps {
  cartId: string;
  cartDetail: CartDetail;
}

const CartItem = ({ cartId, cartDetail }: CartItemProps): JSX.Element => {
  const tCommon = useTranslations('common');
  const t = useTranslations('cart');

  const { success, error } = useToast();

  const { trigger: updateCartDetail, isMutating: isMutatingUpdateCartDetail } = useUpdateCartDetail();
  const { trigger: deleteCartDetail, isMutating: isMutatingDeleteCartDetail } = useDeleteCartDetail();

  return (
    <WithLoading isLoading={isMutatingUpdateCartDetail || isMutatingDeleteCartDetail}>
      <Formik initialValues={{ quantity: cartDetail?.quantity }} onSubmit={() => {}}>
        {({ values }) => (
          <Form>
            <div className="flex gap-5">
              <Image
                src={cartDetail?.productId.images[0]}
                alt={cartDetail?.productId.name}
                width={100}
                height={100}
                className="md:w-[150px] md:h-[150px] w-[100px] h-[100px] aspect-square  bg-transparent rounded-md"
              />

              <div className="flex md:flex-row flex-col justify-between flex-1">
                <div className="flex flex-col justify-between">
                  <h2 className="text-md font-semibold w-[80%] line-clamp-2 dark:text-white-200">
                    {cartDetail?.productId.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500 text-lg">{formatCurrency(cartDetail?.productId.price)}</p>
                    <Divider
                      vertical={true}
                      length="20px"
                      thickness="2px"
                      color="gray-500"
                      // className="md:block hidden"
                    />
                    <p
                      className={clsx('text-lg', {
                        'text-green-400 dark:text-green-300': cartDetail?.productId.inStock,
                        'text-red-400 dark:text-red-300': !cartDetail?.productId.inStock,
                      })}
                    >
                      {cartDetail?.productId.inStock ? tCommon('inStock') : tCommon('outOfStock')}
                    </p>
                  </div>

                  <div className="flex gap-3 md:flex-row md:items-center flex-col items-start">
                    <p className="p-2 border border-gray-500 rounded-md">
                      {cartDetail?.productId?.manufacturerId?.name}
                    </p>
                    <QuantityInput
                      name="quantity"
                      onChange={(val) => {
                        updateCartDetail(
                          {
                            productId: cartDetail?.productId?._id,
                            quantity: val,
                            cartId: cartId,
                            cartDetailId: cartDetail?._id,
                          },
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
                      }}
                    />
                  </div>
                </div>

                <div className="flex md:flex-col flex-row justify-between items-center md:mt-0 mt-5">
                  <p className="text-right text-xl font-semibold">
                    {formatCurrency(cartDetail?.productId.price * values.quantity)}
                  </p>
                  <div className="flex gap-5">
                    <Button
                      variant="text"
                      size="zeroPadding"
                      bgHoverColor="none"
                      textColor="gray"
                      startIcon={<Icon name="delete" color="inherit" />}
                      onClick={() => {
                        deleteCartDetail(
                          {
                            cartId: cartId,
                            cartDetailId: cartDetail?._id,
                          },
                          {
                            onSuccess: (response) => {
                              if (response.code === 200) {
                                success(t('deleteSuccessful'));
                              } else {
                                error(response.message);
                              }
                            },
                            onError: () => {
                              error(tCommon('hasErrorTryAgainLater'));
                            },
                          },
                        );
                      }}
                    >
                      {tCommon('remove')}
                    </Button>
                  </div>
                </div>
              </div>
            </div>
            <Divider marginTop="25px" />
          </Form>
        )}
      </Formik>
    </WithLoading>
  );
};

export default CartItem;
