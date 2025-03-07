'use client';

import images from '@/asset/images';
import Autocomplete from '@/components/AutoComplete';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import LabelValue from '@/components/LabelValue';
import Radio from '@/components/Radio';
import RadioGroup from '@/components/RadioGroup';
import TextArea from '@/components/TextArea';
import TextField from '@/components/TextField';
import { PAYMENT_GATEWAY, PAYMENT_METHOD } from '@/constants/common';
import { PATH } from '@/constants/path';
import { useToast } from '@/context/toastProvider';
import { useUser } from '@/context/userProvider';
import { WithLoading } from '@/hocs/withLoading';
import { useRouter } from '@/i18n/routing';
import { getDistrictData, getProvinceData, getShipPrice, getWardData } from '@/services/api/GHN';
import { useGetMyCart } from '@/services/api/https/cart';
import { useAddOrder } from '@/services/api/https/checkout';
import { DistrictData, ProvinceData } from '@/types/address';
import { ApiResponse } from '@/types/ApiResponse';
import { CheckoutBody, CheckoutFormValues } from '@/types/checkout';
import formatCurrency from '@/utils/formatCurrency';
import { Form, Formik, FormikProps } from 'formik';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import { validationSchema } from './schema';

const Checkout = (): JSX.Element => {
  const router = useRouter();

  const { data: cartData } = useGetMyCart();
  const { userData } = useUser();
  const t = useTranslations('checkout');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('validation');

  const { success, error } = useToast();

  const initialValues: CheckoutFormValues = {
    buyerName: userData?.fullname || '',
    buyerEmail: userData?.email || '',
    buyerPhone: userData?.phone || '',
    recipientName: '',
    recipientPhone: '',
    province: null,
    district: null,
    ward: null,
    method: 'ghn',
    paymentMethod: '',
    shippingFee: 0,
    street: '',
    note: '',
  };

  const formRef = useRef<FormikProps<CheckoutFormValues> | null>(null);
  const [values, setValues] = useState<CheckoutFormValues>(initialValues);
  const { trigger: addOrder, isMutating: isMutatingAddOrder } = useAddOrder();

  useEffect(() => {
    const { province = '', district = '', ward = '' } = values;

    if (formRef.current) {
      const { setFieldValue } = formRef?.current;
      setFieldValue('shippingFee', 0);
      if (province && district && ward) {
        const fetchServicePrice = async () => {
          const servicePrice = await getShipPrice({
            service_type_id: 2,
            to_district_id: district?.DistrictID,
            to_ward_code: ward?.WardCode || 0,
            insurance_value:
              cartData?.data?.cartDetails?.reduce((total, item) => {
                return total + (item?.quantity || 0) * (item?.productId?.price || 0);
              }, 0) ?? 0,
            weight:
              cartData?.data?.cartDetails?.reduce((total, item) => {
                return total + item.quantity * 700;
              }, 0) ?? 0,
            items:
              cartData?.data?.cartDetails?.map((i) => {
                return {
                  name: i?.productId?.name,
                  quantity: i?.quantity,
                  height: 30,
                  weight: 700,
                  width: 30,
                  length: 30,
                };
              }) || [],
          });

          if (servicePrice && servicePrice.data) {
            setFieldValue('shippingFee', servicePrice.data.total);
          }
        };

        fetchServicePrice();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values?.province, values?.district, values?.ward]);

  return (
    <WithLoading isLoading={isMutatingAddOrder}>
      <Formik<CheckoutFormValues>
        innerRef={(f) => {
          formRef.current = f;
          if (f?.values) {
            setValues(f?.values);
          }
        }}
        initialValues={initialValues}
        validationSchema={validationSchema(tValidation)}
        enableReinitialize={true}
        onSubmit={(values) => {
          console.log('values', values);

          const convertValue: CheckoutBody = {
            cartId: cartData?.data?.id || '',
            buyerName: values?.buyerName,
            buyerEmail: values?.buyerEmail,
            buyerPhone: values?.buyerPhone,
            recipientName: values?.recipientName,
            recipientPhone: values?.recipientPhone,
            shippingFee: values?.shippingFee,
            paymentMethod: values?.paymentMethod === PAYMENT_METHOD.COD ? PAYMENT_METHOD.COD : PAYMENT_METHOD.BANK,
            paymentGateway: values?.paymentMethod !== PAYMENT_METHOD.COD ? values?.paymentMethod : '',
            address: {
              province: {
                provinceId: values?.province?.ProvinceID || 0,
                provinceName: values?.province?.ProvinceName || '',
              },
              district: {
                districtId: values?.district?.DistrictID || 0,
                districtName: values?.district?.DistrictName || '',
              },
              ward: {
                wardCode: values?.ward?.WardCode || 0,
                wardName: values?.ward?.WardName || '',
              },
              street: values?.street,
            },
            note: values?.note,
          };

          addOrder(convertValue, {
            onSuccess: (response) => {
              console.log('response', response);
              if (response.code == 201) {
                success(t('addOrderSuccess'));
                window.open(response?.data?.payUrl, '_blank');
                router.replace(PATH.HOME);
              } else {
                error(response.message);
              }
            },
            onError: () => {
              error(tCommon('toast.hasErrorTryAgainLater'));
            },
          });
        }}
      >
        {({ values, resetForm, setFieldValue }) => {
          return (
            <Form>
              <main className="py-14 bg-gray-100 dark:bg-dark-500">
                <div className="container grid xl:grid-cols-12 col-span-full gap-5">
                  {/* Thông tin khách hàng */}
                  <div className="xl:col-span-8 col-span-full md:p-10 p-5 bg-white dark:bg-dark-400 shadow-md rounded-lg text-dark dark:text-white-200">
                    <h2 className="text-2xl font-medium">{t('customerInfo')}</h2>
                    <Divider />

                    {/* Người mua hàng */}
                    <div className="mt-5">
                      <h3 className="text-xl font-medium">{t('buyer')}</h3>
                      <div className="grid grid-cols-12 gap-7 gap-y-11 px-2 mt-5">
                        <TextField
                          name="buyerName"
                          label={t('buyerName')}
                          className="col-span-full sm:col-span-6"
                          required
                        />
                        <TextField
                          name="buyerEmail"
                          label={t('buyerEmail')}
                          className="col-span-full sm:col-span-6"
                          required
                        />
                        <TextField
                          name="buyerPhone"
                          label={t('buyerPhone')}
                          className="col-span-full sm:col-span-6"
                          required
                        />
                      </div>
                    </div>

                    {/* Người nhận hàng */}
                    <div className="mt-10">
                      <h3 className="text-xl font-medium">{t('recipient')}</h3>
                      <div className="grid grid-cols-12 gap-x-7 gap-y-7 px-2 mt-5">
                        <TextField
                          name="recipientName"
                          label={t('recipientName')}
                          className="col-span-full sm:col-span-6"
                          required
                        />
                        <TextField
                          name="recipientPhone"
                          label={t('recipientPhone')}
                          className="col-span-full sm:col-span-6"
                          required
                        />

                        <Button
                          variant="text"
                          className="col-span-full"
                          startIcon={<Icon name="copy" color="inherit" />}
                          bgHoverColor="none"
                          size="zeroPadding"
                          onClick={() => {
                            setFieldValue('recipientName', userData?.fullname);
                            setFieldValue('recipientPhone', userData?.phone);
                          }}
                        >
                          {t('useBuyerInfo')}
                        </Button>
                      </div>
                    </div>

                    {/* Thông tin giao hàng */}
                    <h2 className="mt-10 text-2xl font-medium">{t('shippingInfo')}</h2>
                    <Divider />
                    <div className="grid xl:grid-cols-12 grid-cols-1 gap-7 mt-7">
                      {/* Địa chỉ giao hàng */}
                      <div className="xl:col-span-6 col-span-full">
                        <h3 className="text-xl font-medium">{t('shippingAddress')}</h3>
                        <div className="flex flex-col gap-7 mt-7">
                          <Autocomplete<ProvinceData, ApiResponse<ProvinceData[]>>
                            name="province"
                            label={t('province')}
                            asyncRequest={async () => {
                              const response = await getProvinceData();
                              return response;
                            }}
                            asyncRequestHelper={(response) => {
                              return response.data || [];
                            }}
                            getOptionLabel={(option) => {
                              return option.ProvinceName || '';
                            }}
                            required
                          />

                          <Autocomplete<DistrictData, ApiResponse<DistrictData[]>>
                            name="district"
                            label={t('district')}
                            asyncRequest={async () => {
                              const response = await getDistrictData(values?.province?.ProvinceID || '');
                              return response;
                            }}
                            asyncRequestHelper={(response) => {
                              return response.data || [];
                            }}
                            getOptionLabel={(option) => {
                              return option.DistrictName || '';
                            }}
                            disabled={values?.province ? false : true}
                            asyncRequestDeps="province"
                            filterOptionsLocally={true}
                            autoFetch={true}
                            required
                          />
                          <Autocomplete
                            name="ward"
                            label={t('ward')}
                            asyncRequest={async () => {
                              const response = await getWardData(values?.district?.DistrictID || '');
                              return response;
                            }}
                            asyncRequestHelper={(response) => {
                              return response.data || [];
                            }}
                            getOptionLabel={(option) => {
                              return option.WardName || '';
                            }}
                            disabled={values?.district ? false : true}
                            filterOptionsLocally={true}
                            autoFetch={true}
                            asyncRequestDeps="district"
                            required
                          />
                        </div>
                      </div>

                      {/* Đơn vị vận chuyển */}
                      <div className="xl:col-span-6 col-span-full">
                        <h3 className="text-xl font-medium">{t('shippingCompany')}</h3>
                        <div className="flex items-center gap-5 p-5 mt-7 border border-dashed">
                          <div className="flex-shrink-0">
                            <Image src={images.logoGHN} alt="Grocery-mart" width={170} />
                            <p>
                              {t('shippingWithFee')} -{' '}
                              <span className="font-semibold">{formatCurrency(values.shippingFee)}</span>
                            </p>
                            <p className="text-red-500 dark:text-red-300 font-medium">{t('freeShipping')}</p>
                          </div>
                          <Radio name="method" value="ghn" />
                        </div>
                      </div>

                      <TextArea name="street" label={t('address')} className="col-span-full" rows={5} required />
                    </div>

                    {/* Hình thức thanh toán */}
                    <h2 className="mt-10 text-2xl font-medium">{t('paymentMethod')}</h2>
                    <Divider />

                    <RadioGroup
                      name="paymentMethod"
                      className="grid xl:grid-cols-12 grid-cols-1 gap-7 text-dark dark:text-white-200"
                    >
                      {/* cod */}

                      <Radio
                        value="cod"
                        className="xl:col-span-6 col-span-full h-fit !flex-shrink-0"
                        width="unset"
                        labelClassName="w-full"
                        label={
                          <div className="w-full h-fit flex items-center gap-2 bg-green-200 pr-3 text-lg font-semibold text-white-200  rounded-sm col-span-6 flex-shrink-0">
                            <Image src={images.codMethod} width={60} alt="" />
                            <p>{t('cod')}</p>
                          </div>
                        }
                      />

                      <div className="xl:col-span-6 col-span-full gap-y-7 !flex-shrink-0">
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="w-full flex items-center gap-2 bg-blue-400 pr-3 text-lg font-semibold text-white-200  rounded-sm flex-shrink-0">
                            <Image src={images.bankingMethod} width={60} alt="" />
                            <p>{t('onlinePayment')}</p>
                          </div>
                        </div>

                        <Radio
                          value={PAYMENT_GATEWAY.MOMO}
                          label={
                            <div className="flex items-center justify-between py-4 text-base  gap-3">
                              <Image src={images.logoMomo} width={90} height={90} alt="" />
                              <p className="flex-shrink-0">{t('MoMoPayment')}</p>
                            </div>
                          }
                        />

                        <Radio
                          value={PAYMENT_GATEWAY.ZALO_PAY}
                          label={
                            <div className="flex items-center justify-between py-4 text-base  gap-3">
                              <Image src={images.logoZaloPay} width={90} height={90} alt="" />
                              <p className="flex-shrink-0">{t('ZaloPayment')}</p>
                            </div>
                          }
                        />
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Tóm tắt đơn hàng */}
                  <div className="xl:col-span-4 col-span-full text-dark dark:text-white-200">
                    <div className="py-10 px-5 bg-white dark:bg-dark-400 rounded-md  border-gray-400 shadow-md ">
                      <h2 className="text-2xl font-medium">{t('productList')}</h2>
                      <Divider />

                      <div className="h-[350px] overflow-y-auto border  border-gray p-3 mt-5">
                        {cartData?.data?.cartDetails?.map((item) => {
                          return (
                            <div key={item._id}>
                              <div className="flex gap-5 items-center mt-3">
                                <Image
                                  src={item?.productId?.images[0]}
                                  width={60}
                                  height={60}
                                  alt=""
                                  className="w-[60px] h-[60px] flex-shrink-0"
                                />
                                <div>
                                  <p className="line-clamp-2">{item?.productId?.name}</p>
                                  <p className="text-gray-500">
                                    {item.quantity} x {formatCurrency(item?.productId?.price)}
                                  </p>
                                </div>
                              </div>
                              <Divider />
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="py-10 px-5 bg-white dark:bg-dark-400   rounded-md shadow-md mt-10">
                      <h2 className="text-2xl font-medium">{t('listFee')}</h2>
                      <Divider />

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
                      <LabelValue
                        label={t('shippingFee')}
                        value={formatCurrency(values.shippingFee)}
                        className="justify-between"
                      />
                      <LabelValue label={t('extraFee')} value={formatCurrency(0)} className="justify-between" />
                      <Divider />

                      <LabelValue
                        label={t('totalPayment')}
                        value={formatCurrency((cartData?.data?.cartTotalMoney || 0) + values.shippingFee)}
                        className="justify-between"
                      />

                      <TextArea name="note" label={t('note')} rows={5} className="mt-10" />

                      <Button type="submit" full rounded className="mt-5 py-3">
                        {t('checkout')}
                      </Button>

                      <Button
                        bgColor="gray-300"
                        bgHoverColor="gray-400"
                        full
                        rounded
                        className="mt-5 py-3"
                        onClick={() => {
                          resetForm();
                        }}
                      >
                        {t('reset')}
                      </Button>
                    </div>
                  </div>
                </div>
              </main>
            </Form>
          );
        }}
      </Formik>
    </WithLoading>
  );
};

export default Checkout;
