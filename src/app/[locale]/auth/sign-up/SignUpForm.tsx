'use client';

import { Form, Formik } from 'formik';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Icon from '@/components/Icon';
import TextField from '@/components/TextField';
import React from 'react';
import { useTranslations } from 'next-intl';
import { PATH } from '@/constants/path';
import { getSignUpValidationSchema } from './validation';
import { SignUpFormValues, SignUpResponse } from '@/types/auth';
import { useRegister, useSocialLogin } from '@/services/api/https/auth';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/context/toastProvider';
import { useRouter } from 'next/navigation';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth } from '@/firebase';
import { nextApi } from '@/services/api/axios';
import { useUser } from '@/context/userProvider';

const SignUpForm: React.FC = () => {
  const t = useTranslations('signUp.form');
  const tValidation = useTranslations('validation');
  const tCommon = useTranslations('common');
  const router = useRouter();
  const { loginUser } = useUser();

  const { trigger: handleSignUp, isMutating } = useRegister();
  const { trigger: handleSocialLogin, isMutating: isMutatingSocialLogin } = useSocialLogin();
  const { success, error: errorToast } = useToast();

  const initialValues: SignUpFormValues = {
    email: '',
    password: '',
    confirmPassword: '',
    fullName: '',
    showPassword: false,
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result: UserCredential = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();

      handleSocialLogin(
        { idToken },
        {
          onSuccess: async (response) => {
            if (response.code === 200) {
              const res = await nextApi.post('/auth/set-cookie', {
                accessToken: response.data?.accessToken,
                refreshToken: response.data?.refreshToken,
              });

              if (res.code === 200) {
                router.push(PATH.HOME);
                loginUser(response?.data);
                success(t('successful'));
              } else {
                errorToast(res.message);
              }
            } else {
              errorToast(response.message);
            }
          },
          onError: () => {
            errorToast(tCommon('hasErrorTryAgainLater'));
          },
        },
      );
    } catch (error) {
      errorToast(tCommon('hasErrorTryAgainLater'));
      console.log('error', error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={getSignUpValidationSchema(tValidation)}
      onSubmit={(values) => {
        handleSignUp(
          { email: values.email, password: values.password, fullname: values.fullName },
          {
            onSuccess: (response: ApiResponse<SignUpResponse>) => {
              if (response.code === 201) {
                success(t('successful'));
                router.push(PATH.LOGIN);
              } else {
                errorToast(response.message);
              }
            },
            onError: () => {
              errorToast(tCommon('hasErrorTryAgainLater'));
            },
          },
        );
      }}
    >
      {({ values }) => (
        <Form className="mt-12">
          <TextField
            name="email"
            label=""
            type="email"
            placeholder={t('email')}
            rightIcon={<Icon name="email" />}
            disabled={isMutating || isMutatingSocialLogin}
          />

          <TextField
            name="fullName"
            label=""
            placeholder={t('fullName')}
            rightIcon={<Icon name="account" />}
            className="mt-6"
            disabled={isMutating || isMutatingSocialLogin}
          />

          <TextField
            name="password"
            label=""
            type={values.showPassword ? 'text' : 'password'}
            placeholder={t('password')}
            rightIcon={<Icon name="password" />}
            className="mt-6"
            disabled={isMutating || isMutatingSocialLogin}
          />

          <TextField
            name="confirmPassword"
            label=""
            type={values.showPassword ? 'text' : 'password'}
            placeholder={t('confirmPassword')}
            rightIcon={<Icon name="password" />}
            className="mt-6"
            disabled={isMutating || isMutatingSocialLogin}
          />

          <div className="flex justify-between mt-6">
            <CheckBox name="showPassword" label={t('showPassword')} disabled={isMutating || isMutatingSocialLogin} />

            <Button variant="text" size="zeroPadding" textColor="blue-500 dark:white" bgHoverColor="none">
              {t('forgotPassword')}
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-5">
            <Button type="submit" full disabled={isMutating || isMutatingSocialLogin}>
              {isMutating || isMutatingSocialLogin ? t('signingUp') : t('signUp')}
            </Button>

            <Button
              full
              variant="outlined"
              textHoverColor="yellow-500"
              borderHoverColor="yellow-500"
              textColor="blue-500 dark:white"
              borderColor="blue-500 dark:white"
              bgHoverColor="none"
              startIcon={<Icon name="gmail" color="inherit" />}
              disabled={isMutating || isMutatingSocialLogin}
              onClick={handleGoogleLogin}
            >
              {isMutating || isMutatingSocialLogin ? t('signingUp') : t('loginWithGoogle')}
            </Button>

            <div className="flex gap-2 m-auto">
              <span className="text-gray-500 "> {t('haveAccount')}</span>
              <Button variant="text" size="zeroPadding" bgHoverColor="none" href={PATH.LOGIN}>
                {t('loginNow')}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUpForm;
