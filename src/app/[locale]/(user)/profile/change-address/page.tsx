'use client';

import Autocomplete from '@/components/AutoComplete';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import TextArea from '@/components/TextArea';

import {
  DistrictData,
  getDistrictData,
  getProvinceData,
  getWardData,
  ProvinceData,
  WardData,
} from '@/services/api/GHN';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';

interface ChangeAddressFormValues {
  province: ProvinceData | null;
  district: DistrictData | null;
  ward: WardData | null;
  address: string;
}

const initialValues: ChangeAddressFormValues = {
  province: null,
  district: null,
  ward: null,
  address: '',
};

const ChangeAddress = (): JSX.Element => {
  const t = useTranslations('changeAddress');
  return (
    <div className="p-7 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-medium">Đổi địa chỉ</h2>
      <Divider />

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ values }) => (
          <Form className="flex flex-col">
            <div className="grid grid-cols-2 grid-rows-2 gap-7 mt-5">
              <Autocomplete
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
                  return option.ProvinceName;
                }}
                required
              />

              <Autocomplete
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
                label={t('ward')}
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
              <div></div>
            </div>

            <TextArea
              name="address"
              label={t('address')}
              rows={5}
              required
              className="mt-7"
              placeholder={t('addressPlaceholder')}
            />
            <div className="flex gap-4 ml-auto mt-10">
              <Button bgColor="gray-300" bgHoverColor="none" rounded type="reset">
                Hủy thay đổi
              </Button>
              <Button rounded type="submit">
                Lưu thay đổi
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default ChangeAddress;
