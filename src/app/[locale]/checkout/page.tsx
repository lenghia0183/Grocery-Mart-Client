'use client';

import images from '@/asset/images';
import Autocomplete from '@/components/AutoComplete';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import Image from '@/components/Image';
import Radio from '@/components/Radio';
import RadioGroup from '@/components/RadioGroup';
import TextArea from '@/components/TextArea';
import TextField from '@/components/TextField';
import { DistrictData, getDistrictData, getProvinceData, getWardData, ProvinceData } from '@/services/api/GHN';
import { ApiResponse } from '@/types/ApiResponse';
import formatCurrency from '@/utils/formatCurrency';
import { Form, Formik } from 'formik';
const initialValues: CheckoutFormValues = {
  buyerName: '',
  buyerEmail: '',
  buyerPhone: '',
  receiverName: '',
  receiverPhone: '',
  province: null,
  district: null,
  ward: '',
  method: 'ghn',
  paymentMethod: '',
};

interface CheckoutFormValues {
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  receiverName: string;
  receiverPhone: string;
  province: ProvinceData | null;
  district: DistrictData | null;
  ward: string;
  method: string;
  paymentMethod: string;
}

const Checkout = (): JSX.Element => {
  return (
    <>
      <Header />
      <Formik<CheckoutFormValues> initialValues={initialValues} onSubmit={(values) => console.log(values)}>
        {({ values }) => {
          console.log('values', values);
          return (
            <Form>
              <main className="p-10 bg-gray-100">
                <div className="container grid grid-cols-12 gap-5">
                  {/* Thông tin khách hàng */}
                  <div className="col-span-8 p-10 bg-white shadow-md rounded-lg text-dark">
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
                              Giao hàng tận nơi có phí - <span className="font-semibold">{formatCurrency(0)}</span>
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

                    <RadioGroup name="paymentMethod" className="grid grid-cols-12 gap-7">
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
                            <div className="flex items-center justify-between py-4 text-base text-dark gap-3">
                              <Image src={images.logoMomo} width={90} height={90} alt="" />
                              <p className="flex-shrink-0">Thanh toán qua ví MoMo</p>
                            </div>
                          }
                        />

                        <Radio
                          value="ZaloPay"
                          label={
                            <div className="flex items-center justify-between py-4 text-base text-dark gap-3">
                              <Image src={images.logoZaloPay} width={90} height={90} alt="" />
                              <p className="flex-shrink-0">Thanh toán qua ví MoMo</p>
                            </div>
                          }
                        />
                      </div>
                    </RadioGroup>
                  </div>

                  {/* Tóm tắt đơn hàng */}
                  <div className="col-span-4 p-10 bg-white shadow-md rounded-lg"></div>
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
