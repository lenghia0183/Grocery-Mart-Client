'use client';

import Autocomplete from '@/components/AutoComplete';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import ChangeAddressSkeleton from '@/components/Skeletons/Profile/ChangeAddressSkeleton';
import TextArea from '@/components/TextArea';
import { useUser } from '@/context/userProvider';

import { getDistrictData, getProvinceData, getWardData } from '@/services/api/GHN';
import { ChangeAddressFormValues } from '@/types/address';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';

let initialValues: ChangeAddressFormValues = {
  province: null,
  district: null,
  ward: null,
  street: '',
};

const ChangeAddress = (): JSX.Element => {
  const { userData, isLoading } = useUser();

  initialValues = {
    province: userData?.address?.province || null,
    district: userData?.address?.district || null,
    ward: userData?.address?.ward || null,
    street: userData?.address?.street || '',
  };

  // console.log('initialValues', initialValues);

  const t = useTranslations('changeAddress');
  if (isLoading) return <ChangeAddressSkeleton />;

  return (
    <div className="p-7 bg-white dark:bg-dark-400 dark:text-white shadow-md rounded-lg">
      <h2 className="text-2xl font-medium">Đổi địa chỉ</h2>
      <Divider />

      <Formik
        initialValues={initialValues}
        enableReinitialize={true}
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
                  return option.ProvinceName || option.provinceName;
                }}
                required
              />

              <Autocomplete
                name="district"
                label={t('district')}
                asyncRequest={async () => {
                  const response = await getDistrictData(
                    values?.province?.ProvinceID || values?.province?.provinceId || '',
                  );
                  return response;
                }}
                asyncRequestHelper={(response) => {
                  return response.data || [];
                }}
                getOptionLabel={(option) => {
                  return option.DistrictName || option.districtName;
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
                  const response = await getWardData(
                    values?.district?.DistrictID || values?.district?.districtId || '',
                  );
                  return response;
                }}
                asyncRequestHelper={(response) => {
                  return response.data || [];
                }}
                getOptionLabel={(option) => {
                  return option.WardName || option.wardName;
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
              name="street"
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
