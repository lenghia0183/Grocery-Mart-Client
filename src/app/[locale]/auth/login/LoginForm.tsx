'use client';

import { Form, Formik } from 'formik';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Icon from '@/components/Icon';
import TextField from '@/components/TextField';
import React, { useEffect, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { PATH } from '@/constants/path';
import { LoginFormValues, LoginResponse } from '@/types/auth';
import { useLogin, useSocialLogin } from '@/services/api/https/auth';
import { ApiResponse } from '@/types/ApiResponse';
import { useToast } from '@/context/toastProvider';
import { getLoginValidationSchema } from './validation';
import { useSearchParams } from 'next/navigation';
import { nextApi } from '@/services/api/axios';
import { useUser } from '@/context/userProvider';
import { ERROR } from '@/constants/common';
import { usePathname, useRouter } from '@/i18n/routing';
import { GoogleAuthProvider, signInWithPopup, UserCredential } from 'firebase/auth';
import { auth } from '@/firebase';

const LoginForm: React.FC = () => {
  const t = useTranslations('login.form');
  const tCommon = useTranslations('common');
  const tValidation = useTranslations('validation');
  const { loginUser } = useUser();

  const { info } = useToast();

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const errorParams = searchParams.get('error');

  const toastShownRef = useRef(false);

  useEffect(() => {
    if (errorParams === ERROR.UNAUTHENTICATED && !toastShownRef.current) {
      toastShownRef.current = true;
      info(tCommon('unAuthenticationError'));

      const params = new URLSearchParams(searchParams.toString());
      params.delete('error');

      router.replace(`${pathname}?${params.toString()}`);
    }
  }, [errorParams, info, router, searchParams, tCommon, pathname]);

  const { success, error: errorToast } = useToast();
  const { trigger: handleLogin, isMutating } = useLogin();
  const { trigger: handleSocialLogin, isMutating: isMutatingSocialLogin } = useSocialLogin();

  const initialValues: LoginFormValues = {
    email: '',
    password: '',
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
          onSuccess: async (response: ApiResponse<LoginResponse>) => {
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
      validationSchema={getLoginValidationSchema(tValidation)}
      onSubmit={(values) => {
        handleLogin(
          { email: values.email, password: values.password },
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
            name="password"
            label=""
            type={values.showPassword ? 'text' : 'password'}
            placeholder={t('password')}
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
              {isMutating || isMutatingSocialLogin ? t('loggingIn') : t('login')}
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
              {isMutating || isMutatingSocialLogin ? t('loggingIn') : t('loginWithGoogle')}
            </Button>

            <div className="flex gap-2 m-auto">
              <span className="text-gray-500 "> {t('noAccount')}</span>
              <Button variant="text" size="zeroPadding" bgHoverColor="none" href={PATH.SIGN_UP}>
                {t('registerNow')}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
