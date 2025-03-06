'use client';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import ChangePasswordSkeleton from '@/components/Skeletons/Profile/ChangePasswordSkeleton';
import TextField from '@/components/TextField';
import { useToast } from '@/context/toastProvider';
import { useUser } from '@/context/userProvider';

import { Form, Formik } from 'formik';
import { useTranslations } from 'next-intl';
import { validationSchema } from './schema';
import { WithLoading } from '@/hocs/withLoading';
import { ChangePasswordFormValues } from '@/types/auth';
import { useChangePassword } from '@/services/api/https/auth';

const ChangePassword = (): JSX.Element => {
  const { isLoading } = useUser();

  const { trigger: updateChangePassword, isMutating: isMutatingChangePassword } = useChangePassword();

  const { success, error } = useToast();
  const t = useTranslations('changePassword');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('validation');

  const initialValues: ChangePasswordFormValues = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  };

  if (isLoading) return <ChangePasswordSkeleton />;

  return (
    <WithLoading isLoading={isMutatingChangePassword}>
      <div className="md:p-7 px-5 py-7 bg-white dark:bg-dark-400 dark:text-white shadow-md rounded-lg">
        <h2 className="text-2xl font-medium">{t('title')}</h2>
        <Divider />

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema(tValidation)}
          onSubmit={(values, { resetForm }) => {
            updateChangePassword(
              { newPassword: values.newPassword, currentPassword: values.currentPassword },
              {
                onSuccess: (response) => {
                  if (response.code === 200) {
                    success(t('changePasswordSuccessful'));
                    resetForm();
                  } else {
                    error(response.message);
                  }
                },
                onError: () => {
                  error(tCommon('hasErrorTryAgainLater'));
                  resetForm();
                },
              },
            );
          }}
        >
          {() => (
            <Form className="flex flex-col">
              <div className="grid xl:grid-cols-2 gap-7 mt-5">
                <TextField
                  name="currentPassword"
                  label={t('currentPassword')}
                  placeholder={t('placeholderCurrentPassword')}
                  required
                  type="password"
                />
                <TextField
                  name="newPassword"
                  label={t('newPassword')}
                  placeholder={t('placeholderNewPassword')}
                  required
                  type="password"
                />
                <TextField
                  name="confirmPassword"
                  label={t('confirmPassword')}
                  placeholder={t('placeholderConfirmPassword')}
                  required
                  type="password"
                />
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

export default ChangePassword;
