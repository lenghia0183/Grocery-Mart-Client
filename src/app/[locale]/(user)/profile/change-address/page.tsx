'use client';

import Autocomplete from '@/components/AutoComplete';
import Button from '@/components/Button';
import Divider from '@/components/Divider';
import ChangeAddressSkeleton from '@/components/Skeletons/Profile/ChangeAddressSkeleton';
import TextArea from '@/components/TextArea';
import { useToast } from '@/context/toastProvider';
import { useUser } from '@/context/userProvider';
import { WithLoading } from '@/hocs/withLoading';

import { getDistrictData, getProvinceData, getWardData } from '@/services/api/GHN';
import { useUpdateMe } from '@/services/api/https/user';
import { ChangeAddressFormValues } from '@/types/user';

import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { validationSchema } from './schema';

const ChangeAddress = (): JSX.Element => {
  const { userData, isLoading } = useUser();

  const { trigger: updateUserData, isMutating: isMutatingUpdateUserData } = useUpdateMe();
  const { success, error } = useToast();
  const t = useTranslations('changeAddress');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('validation');

  const initialValues: ChangeAddressFormValues = {
    province: userData?.address?.province || null,
    district: userData?.address?.district || null,
    ward: userData?.address?.ward || null,
    street: userData?.address?.street || '',
  };

  if (isLoading) return <ChangeAddressSkeleton />;

  return (
    <WithLoading isLoading={isMutatingUpdateUserData}>
      <div className="p-7 bg-white dark:bg-dark-400 dark:text-white shadow-md rounded-lg">
        <h2 className="text-2xl font-medium">{t('title')}</h2>
        <Divider />

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema(tValidation)}
          onSubmit={(values) => {
            updateUserData(
              {
                address: {
                  province: {
                    provinceName: values?.province?.ProvinceName || '',
                    provinceId: values?.province?.ProvinceID || 0,
                  },
                  district: {
                    districtName: values?.district?.DistrictName || '',
                    districtId: values?.district?.DistrictID || 0,
                  },
                  ward: {
                    wardName: values?.ward?.WardName || '',
                    wardCode: values?.ward?.WardCode || 0,
                  },
                  street: values.street || '',
                },
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
                  {tCommon('cancel')}
                </Button>
                <Button rounded type="submit">
                  {tCommon('saveChange')}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </WithLoading>
  );
};

export default ChangeAddress;
