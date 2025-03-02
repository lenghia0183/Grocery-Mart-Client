'use client';

import { Form, Formik } from 'formik';
import QuantityInput from '@/components/QuantityInput';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import formatCurrency from '@/utils/formatCurrency';
import LabelValue from '@/components/LabelValue';
import { useTranslations } from 'next-intl';
import { ProductDetail } from '@/types/product';
import { useAddProductToCart } from '@/services/api/https/cart';
import { AddProductToCartFormValues } from '@/types/cart';

import { WithLoading } from '@/hoc/withLoading';
import { useToast } from '@/context/toastProvider';

interface ProductFormProps {
  product: ProductDetail | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const initialValues: AddProductToCartFormValues = {
    quantity: 1,
  };

  const t = useTranslations('productDetail');
  const tCommon = useTranslations('common');
  const { success, error } = useToast();

  const { trigger: addProductToCart, isMutating } = useAddProductToCart();

  return (
    <WithLoading isLoading={isMutating}>
      <Formik initialValues={initialValues} onSubmit={(values) => console.log('Submit', values)}>
        {({ values }) => {
          return (
            <Form>
              <p className="text-2xl font-medium mt-3 dark:text-white-200">{t('quantity')}</p>
              <div className="flex mt-3">
                {/* left column */}
                <div className="flex-1">
                  <QuantityInput name="quantity" width="140px" height="50px" buttonClassName="dark:text-white-200" />
                </div>

                {/* right column */}
                <div className="border border-gray-500 p-7 rounded-md flex-1">
                  <LabelValue
                    labelClassName="!font-normal "
                    value={<p className="bg-green-100 px-1 rounded-sm ">0%</p>}
                    label={formatCurrency(product?.price)}
                  />

                  <LabelValue
                    className="mt-5"
                    labelClassName="text-[30px] font-medium"
                    label={formatCurrency(product?.price)}
                  />

                  <div className="flex gap-5 mt-5">
                    <Button
                      size="large"
                      onClick={() => {
                        if (!product?._id) return;
                        addProductToCart(
                          { productId: product._id, quantity: values.quantity },
                          {
                            onSuccess: (response) => {
                              if (response.code === 201) {
                                success(t('addProductToCartSuccessful'));
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
                      {t('addToCart')}
                    </Button>
                    <IconButton
                      iconName="heart"
                      variant="outlined"
                      size="medium"
                      borderColor="gray-500"
                      borderHoverColor="blue-500"
                      iconHoverColor="blue-500"
                      iconColor="gray-500 "
                      bgHoverColor="none"
                    />
                  </div>
                </div>
              </div>
            </Form>
          );
        }}
      </Formik>
    </WithLoading>
  );
};

export default ProductForm;
