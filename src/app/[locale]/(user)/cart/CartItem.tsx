import { Formik, Form } from 'formik';
import formatCurrency from '@/utils/formatCurrency';
import Divider from '@/components/Divider';
import Button from '@/components/Button';
import Icon from '@/components/Icon';
import QuantityInput from '@/components/QuantityInput';
import Image from '@/components/Image';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { ProductDetail } from '@/types/product';
import { useUpdateCartDetail } from '@/services/api/https/cart';
import { WithLoading } from '@/hocs/withLoading';

interface CartItemProps {
  product: ProductDetail;
  cartId: string;
  cartDetailId: string;
}

const CartItem = ({ product, cartId, cartDetailId }: CartItemProps): JSX.Element => {
  const t = useTranslations('common');

  const { trigger: updateCartDetail, isMutating: isMutatingUpdateCartDetail } = useUpdateCartDetail();

  return (
    <WithLoading isLoading={isMutatingUpdateCartDetail}>
      <Formik
        initialValues={{ quantity: 1 }}
        onSubmit={(values) => {
          console.log('Form submitted:', values);
        }}
      >
        {({ values }) => (
          <Form>
            <div className="flex gap-5">
              <Image
                src={product.images[0]}
                alt={product.name}
                width={100}
                height={100}
                className="w-[150px] h-[150px] bg-transparent rounded-md"
              />

              <div className="flex justify-between flex-1">
                <div className="flex flex-col justify-between">
                  <h2 className="text-xl font-semibold w-[80%] line-clamp-2 dark:text-white-200">{product.name}</h2>
                  <div className="flex items-center gap-2">
                    <p className="text-gray-500 text-lg">{formatCurrency(product.price)}</p>
                    <Divider vertical={true} length="20px" thickness="2px" color="gray-500" />
                    <p
                      className={clsx('text-lg', {
                        'text-green-400 dark:text-green-300': product.inStock,
                        'text-red-400 dark:text-red-300': !product.inStock,
                      })}
                    >
                      {product.inStock ? t('inStock') : t('outOfStock')}
                    </p>
                  </div>

                  <div className="flex gap-3">
                    <p className="p-3 border border-gray-500 rounded-md">{product?.manufacturerId?.name}</p>
                    <QuantityInput
                      name="quantity"
                      onChange={(val) => {
                        updateCartDetail({
                          productId: product?._id,
                          quantity: val,
                          cartId: cartId,
                          cartDetailId: cartDetailId,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="flex flex-col justify-between ">
                  <p className="text-right text-xl font-semibold">{formatCurrency(product.price * values.quantity)}</p>
                  <div className="flex gap-5">
                    {/* <Button
                    variant="text"
                    size="zeroPadding"
                    bgHoverColor="none"
                    textColor={product?.isFavorite ? 'red-500' : 'gray'}
                    startIcon={<Icon name="heart" color={product?.isFavorite ? 'red-500' : 'gray'} />}
                  >
                    {t('like')}
                  </Button> */}

                    <Button
                      variant="text"
                      size="zeroPadding"
                      bgHoverColor="none"
                      textColor="gray"
                      startIcon={<Icon name="delete" color="inherit" />}
                    >
                      {t('remove')}
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
