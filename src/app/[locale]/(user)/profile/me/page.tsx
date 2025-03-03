'use client';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import EditMeSkeleton from '@/components/Skeletons/Profile/EditMeSkeleton';

import TextField from '@/components/TextField';
import { useToast } from '@/context/toastProvider';

import { useUser } from '@/context/userProvider';
import { WithLoading } from '@/hocs/withLoading';
import { useUpdateMe } from '@/services/api/https/user';
import { ChangeUserDataFormValues } from '@/types/user';
import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { validationSchema } from './schema';

const Profile = (): JSX.Element => {
  const { userData, isLoading } = useUser();

  const { trigger: updateUserData, isMutating: isMutatingUpdateUserData } = useUpdateMe();
  const { success, error } = useToast();
  const t = useTranslations('editUser');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('validation');

  const initialValues: ChangeUserDataFormValues = {
    name: userData?.fullname || '',
    phone: userData?.phone || '',
    displayName: userData?.displayName || '',
    email: userData?.email || '',
  };

  if (isLoading) return <EditMeSkeleton />;

  return (
    <WithLoading isLoading={isMutatingUpdateUserData}>
      <div className="p-7 bg-white dark:bg-dark-400 shadow-md rounded-lg dark:text-white">
        <h2 className="text-2xl font-medium">Thông tin cá nhân</h2>
        <Divider />

        <Formik
          initialValues={initialValues}
          enableReinitialize={true}
          validationSchema={validationSchema(tValidation)}
          onSubmit={(values) => {
            console.log(values);
            updateUserData(
              { fullname: values?.name, phone: values?.phone },
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
          {() => (
            <Form className="flex flex-col">
              <div className="grid grid-cols-2 gap-7 mt-5">
                <TextField name="email" label={t('email')} placeholder="Email" required disabled />
                <TextField name="name" label={t('name')} placeholder="Họ và tên" required />
                <TextField name="phone" label={t('phone')} placeholder="Số điện thoại" required />
                <TextField name="displayName" label={t('displayName')} placeholder="Tên hiển thị" />
              </div>
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

export default Profile;
