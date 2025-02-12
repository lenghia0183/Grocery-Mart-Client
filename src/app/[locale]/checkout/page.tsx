'use client';

import images from '@/asset/images';
import Autocomplete from '@/components/AutoComplete';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import LabelValue from '@/components/LabelValue';
import Radio from '@/components/Radio';
import RadioGroup from '@/components/RadioGroup';
import TextArea from '@/components/TextArea';
import TextField from '@/components/TextField';
import {
  DistrictData,
  getDistrictData,
  getProvinceData,
  getShipPrice,
  getWardData,
  ProvinceData,
  WardData,
} from '@/services/api/GHN';
import { ApiResponse } from '@/types/ApiResponse';
import formatCurrency from '@/utils/formatCurrency';
import { Form, Formik, FormikProps } from 'formik';
import { useEffect, useRef, useState } from 'react';
const initialValues: CheckoutFormValues = {
  buyerName: '',
  buyerEmail: '',
  buyerPhone: '',
  receiverName: '',
  receiverPhone: '',
  province: null,
  district: null,
  ward: null,
  method: 'ghn',
  paymentMethod: '',
  shippingFee: 0,
};

interface CheckoutFormValues {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  receiverName: string;
  receiverPhone: string;
  province: ProvinceData | null;
  district: DistrictData | null;
  ward: WardData | null;
  method: string;
  paymentMethod: string;
  shippingFee: number;
}

const items = [
  {
    id: 'PROD123456',
    name: 'Organic Matcha Green Tea Powder - Premium Grade',
    price: 150000.0,
    images: ['https://img.freepik.com/free-photo/matcha-green-tea-powder-wooden-bowl_1150-11201.jpg'],
    inStock: true,
    branch: 'Japanese Organic Tea Co.',
    quantity: 2,
  },
  {
    id: 'PROD789012',
    name: 'Arabica Coffee Beans - 500g',
    price: 120000.0,
    images: ['https://img.freepik.com/free-photo/coffee-beans-sack_1339-6433.jpg'],
    inStock: false,
    branch: 'Vietnam Premium Coffee',
    quantity: 1,
  },
  {
    id: 'PROD345678',
    name: 'Dark Chocolate 85% Cocoa - Sugar Free',
    price: 95000.0,
    images: ['https://img.freepik.com/free-photo/dark-chocolate-bars_114579-1330.jpg'],
    inStock: true,
    branch: 'Belgian Chocolate Factory',
    quantity: 3,
  },
  {
    id: 'PROD7890121',
    name: 'Arabica Coffee Beans - 500g',
    price: 120000.0,
    images: ['https://img.freepik.com/free-photo/coffee-beans-sack_1339-6433.jpg'],
    inStock: false,
    branch: 'Vietnam Premium Coffee',
    quantity: 1,
  },
  {
    id: 'PROD3456781',
    name: 'Dark Chocolate 85% Cocoa - Sugar Free',
    price: 95000.0,
    images: ['https://img.freepik.com/free-photo/dark-chocolate-bars_114579-1330.jpg'],
    inStock: true,
    branch: 'Belgian Chocolate Factory',
    quantity: 3,
  },
];

const Checkout = (): JSX.Element => {
  const formRef = useRef<FormikProps<CheckoutFormValues> | null>(null);
  const [values, setValues] = useState<CheckoutFormValues>(initialValues);
  const totalPrice = items.reduce((total, item) => total + item.quantity * item.price, 0);

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
            to_ward_code: ward?.WardCode,
            insurance_value: items?.reduce((total, item) => {
              return total + item.quantity * item.price;
            }, 0),
            weight: items?.reduce((total, item) => {
              return total + item.quantity * 700;
            }, 0),
            items: items?.map((i) => {
              return {
                name: i?.name,
                quantity: i?.quantity,
                height: 30,
                weight: 700,
                width: 30,
                length: 30,
              };
            }),
          });

          if (servicePrice && servicePrice.data) {
            setFieldValue('shippingFee', servicePrice.data.total);
          }
        };

        fetchServicePrice();
      }
    }
  }, [values?.province, values?.district, values?.ward]);

  return (
    <>
      <Header />
      <Formik<CheckoutFormValues>
        innerRef={(f) => {
          formRef.current = f;
          if (f?.values) {
            setValues(f?.values);
          }
        }}
        initialValues={initialValues}
        onSubmit={(values) => console.log(values)}
      >
        {({ values, resetForm }) => {
          // console.log('values', values);
          return (
            <Form>
              <main className="p-10 bg-gray-100 dark:bg-dark-500">
                <div className="container grid grid-cols-12 gap-5">
                  {/* Thông tin khách hàng */}
                  <div className="col-span-8 p-10 bg-white dark:bg-dark-400 shadow-md rounded-lg text-dark dark:text-white">
                    <h2 className="text-2xl font-medium">Thông tin khách hàng</h2>
                    <Divider />

                    {/* Người mua hàng */}
                    <div className="mt-5">
                      <h3 className="text-xl font-medium">Người mua hàng</h3>
                      <div className="grid grid-cols-12 gap-7 gap-y-11 px-2 mt-5">
                        <TextField
                          name="buyerName"
                          label="Họ và tên"
                          className="col-span-full sm:col-span-6"
                          required
                        />
                        <TextField name="buyerEmail" label="Email" className="col-span-full sm:col-span-6" required />
                        <TextField
                          name="buyerPhone"
                          label="Số điện thoại"
                          className="col-span-full sm:col-span-6"
                          required
                        />
                      </div>
                    </div>

                    {/* Người nhận hàng */}
                    <div className="mt-10">
                      <h3 className="text-xl font-medium">Người nhận hàng</h3>
                      <div className="grid grid-cols-12 gap-x-7 gap-y-7 px-2 mt-5">
                        <TextField
                          name="receiverName"
                          label="Họ và tên"
                          className="col-span-full sm:col-span-6"
                          required
                        />
                        <TextField
                          name="receiverPhone"
                          label="Số điện thoại"
                          className="col-span-full sm:col-span-6"
                          required
                        />

                        <Button
                          variant="text"
                          className="col-span-full"
                          startIcon={<Icon name="copy" color="inherit" />}
                          bgHoverColor="none"
                          size="zeroPadding"
                        >
                          Sử dụng thông tin người mua hàng
                        </Button>
                      </div>
                    </div>

                    {/* Thông tin giao hàng */}
                    <h2 className="mt-10 text-2xl font-medium">Thông tin giao hàng</h2>
                    <Divider />
                    <div className="grid grid-cols-12 gap-7 mt-7">
                      {/* Địa chỉ giao hàng */}
                      <div className="col-span-6">
                        <h3 className="text-xl font-medium">Địa chỉ giao hàng</h3>
                        <div className="flex flex-col gap-7 mt-7">
                          <Autocomplete<ProvinceData, ApiResponse<ProvinceData[]>>
                            name="province"
                            label="Tỉnh/Thành phố"
                            asyncRequest={async () => {
                              const response = await getProvinceData();
                              return response;
                            }}
                            asyncRequestHelper={(response) => {
                              return response.data || [];
                            }}
                            getOptionLabel={(option) => {
                              return option.ProvinceName;
                            }}
                            required
                          />

                          <Autocomplete<DistrictData, ApiResponse<DistrictData[]>>
                            name="district"
                            label="Quận/Huyện"
                            asyncRequest={async () => {
                              const response = await getDistrictData(values?.province?.ProvinceID || '');
                              return response;
                            }}
                            asyncRequestHelper={(response) => {
                              return response.data || [];
                            }}
                            getOptionLabel={(option) => {
                              return option.DistrictName;
                            }}
                            disabled={values?.province ? false : true}
                            asyncRequestDeps="province"
                            filterOptionsLocally={true}
                            autoFetch={true}
                            required
                          />
                          <Autocomplete
                            name="ward"
                            label="Phường/Xã"
                            asyncRequest={async () => {
                              const response = await getWardData(values?.district?.DistrictID || '');
                              return response;
                            }}
                            asyncRequestHelper={(response) => {
                              return response.data || [];
                            }}
                            getOptionLabel={(option) => {
                              return option.WardName;
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
                      <div className="col-span-6">
                        <h3 className="text-xl font-medium">Đơn vị vận chuyển</h3>
                        <div className="flex items-center gap-5 p-5 mt-7 border border-dashed">
                          <div className="flex-shrink-0">
                            <Image src={images.logoGHN} alt="Grocery-mart" width={170} />
                            <p>
                              Giao hàng tận nơi có phí -{' '}
                              <span className="font-semibold">{formatCurrency(values.shippingFee)}</span>
                            </p>
                            <p className="text-red-500 font-medium">Miễn phí vận chuyển cho đơn từ 500.000đ</p>
                          </div>
                          <Radio name="method" value="ghn" />
                        </div>
                      </div>

                      <TextArea name="street" label="Địa chỉ" className="col-span-full" rows={5} required />
                    </div>

                    {/* Hình thức thanh toán */}
                    <h2 className="mt-10 text-2xl font-medium">Hình thức thanh toán</h2>
                    <Divider />

                    <RadioGroup name="paymentMethod" className="grid grid-cols-12 gap-7 text-dark dark:text-white">
                      {/* cod */}

                      <Radio
                        value="cod"
                        className="col-span-6 h-fit !flex-shrink-0"
                        width="unset"
                        labelClassName="w-full"
                        label={
                          <div className="w-full h-fit flex items-center gap-2 bg-green-200 pr-3 text-lg font-semibold text-white  rounded-sm col-span-6 flex-shrink-0">
                            <Image src={images.codMethod} width={60} alt="" />
                            <p>Thanh toán trực tuyến</p>
                          </div>
                        }
                      />

                      <div className="col-span-6">
                        <div className="flex items-center gap-3">
                          <div className="w-full flex items-center gap-2 bg-blue-400 pr-3 text-lg font-semibold text-white  rounded-sm flex-shrink-0">
                            <Image src={images.bankingMethod} width={60} alt="" />
                            <p>Thanh toán trực tuyến</p>
                          </div>
                        </div>

                        <Radio
                          value="MoMo"
                          label={
                            <div className="flex items-center justify-between py-4 text-base  gap-3">
                              <Image src={images.logoMomo} width={90} height={90} alt="" />
                              <p className="flex-shrink-0">Thanh toán qua ví MoMo</p>
                            </div>
                          }
                        />

                        <Radio
                          value="ZaloPay"
                          label={
                            <div className="flex items-center justify-between py-4 text-base  gap-3">
                              <Image src={images.logoZaloPay} width={90} height={90} alt="" />
                              <p className="flex-shrink-0">Thanh toán qua ví MoMo</p>
                            </div>
                          }
                        />
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Tóm tắt đơn hàng */}
                  <div className="col-span-4 text-dark dark:text-white">
                    <div className="py-10 px-5 bg-white dark:bg-dark-400 rounded-md  border-gray-400 shadow-md ">
                      <h2 className="text-2xl font-medium">Danh sách sản phẩm</h2>
                      <Divider />

                      <div className="h-[350px] overflow-y-auto border  border-gray p-3 mt-5">
                        {items.map((item) => {
                          return (
                            <div key={item.id}>
                              <div className="flex gap-5 items-center mt-3">
                                <Image
                                  src={item.images[0]}
                                  width={60}
                                  height={60}
                                  alt=""
                                  className="w-[60px] h-[60px] flex-shrink-0"
                                />
                                <div>
                                  <p className="line-clamp-2">{item.name}</p>
                                  <p className="text-gray-500">
                                    {item.quantity} x {formatCurrency(item.price)}
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
                      <h2 className="text-2xl font-medium">Danh sách chi phí</h2>
                      <Divider />

                      <LabelValue label={'Tổng số sản phẩm'} value={items.length} className="justify-between" />
                      <LabelValue
                        label={'Tổng tiền sản phẩm'}
                        value={formatCurrency(totalPrice)}
                        className="justify-between"
                      />
                      <LabelValue
                        label={'Phí ship'}
                        value={formatCurrency(values.shippingFee)}
                        className="justify-between"
                      />
                      <LabelValue label={'Phụ phí'} value={formatCurrency(0)} className="justify-between" />
                      <Divider />

                      <LabelValue
                        label={'Tổng tiền thanh toán'}
                        value={formatCurrency(totalPrice + values.shippingFee)}
                        className="justify-between"
                      />

                      <TextArea name="note" label="Ghi chú" rows={5} className="mt-10" />

                      <Button full rounded className="mt-5 py-3">
                        Thanh toán
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
                        Làm mới
                      </Button>
                    </div>
                  </div>
                </div>
              </main>
            </Form>
          );
        }}
      </Formik>
      <Footer />
    </>
  );
};

export default Checkout;
