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

import { WithLoading } from '@/hocs/withLoading';
import { useToast } from '@/context/toastProvider';
import { useAddProductToFavoriteList } from '@/services/api/https/favorite';
import { useUser } from '@/context/userProvider';

interface ProductFormProps {
  product: ProductDetail | null;
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  const { refreshUserFavorites, refreshUserCart } = useUser();

  const initialValues: AddProductToCartFormValues = {
    quantity: 1,
    isFavorite: product?.isFavorite || false,
  };

  const t = useTranslations('productDetail');
  const tCommon = useTranslations('common');
  const { success, error } = useToast();

  const { trigger: addProductToCart, isMutating: isMutatingAddProductToCart } = useAddProductToCart();
  const { trigger: addProductToFavoriteList, isMutating: isMutatingAddProductToFavoriteList } =
    useAddProductToFavoriteList(product?._id || '');

  return (
    <WithLoading isLoading={isMutatingAddProductToCart || isMutatingAddProductToFavoriteList}>
      <Formik initialValues={initialValues} onSubmit={(values) => console.log('Submit', values)}>
        {({ values, resetForm, setFieldValue }) => {
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
                              refreshUserCart();
                              resetForm();
                            },
                            onError: () => {
                              error(tCommon('hasErrorTryAgainLater'));
                              resetForm();
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
                      borderColor={values?.isFavorite ? 'red-500' : 'gray-500'}
                      borderHoverColor="blue-500"
                      iconHoverColor="blue-500"
                      iconColor={values?.isFavorite ? 'red-500' : 'gray-500'}
                      bgHoverColor="none"
                      onClick={() => {
                        addProductToFavoriteList(
                          {},
                          {
                            onSuccess: (response) => {
                              if (response.code === 200) {
                                if (values?.isFavorite) {
                                  success(t('deleteProductToFavoriteSuccessful'));
                                } else {
                                  success(t('addProductToFavoriteSuccessful'));
                                }
                                setFieldValue('isFavorite', !values?.isFavorite);
                                refreshUserFavorites();
                              } else {
                                error(response.message);
                                setFieldValue('isFavorite', values?.isFavorite);
                              }
                            },
                            onError: () => {
                              error(tCommon('hasErrorTryAgainLater'));
                              setFieldValue('isFavorite', values?.isFavorite);
                            },
                          },
                        );
                      }}
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
