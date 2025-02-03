'use client';

import { Form, Formik } from 'formik';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Icon from '@/components/Icon';
import TextField from '@/components/TextField';
import React from 'react';
import { useTranslations } from 'next-intl';

const SignUpForm: React.FC = () => {
  const t = useTranslations('signUp.form');

  return (
    <Formik
      initialValues={{ email: '', password: '', confirmPassword: '' }}
      onSubmit={(values) => {
        console.log(values);
        // Xử lý đăng nhập ở đây
      }}
    >
      {() => (
        <Form className="mt-12">
          <TextField name="email" label="" type="email" placeholder={t('email')} rightIcon={<Icon name="email" />} />

          <TextField
            name="password"
            label=""
            type="password"
            placeholder={t('password')}
            rightIcon={<Icon name="password" />}
            className="mt-6"
          />

          <TextField
            name="confirmPassword"
            label=""
            type="password"
            placeholder={t('confirmPassword')}
            rightIcon={<Icon name="password" />}
            className="mt-6"
          />

          <div className="flex justify-between mt-6">
            <CheckBox name="showPassword" label={t('showPassword')} />

            <Button variant="text" size="zeroPadding" textColor="blue-500 dark:white" bgHoverColor="none">
              {t('forgotPassword')}
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-5">
            <Button type="submit" full>
              {t('signUp')}
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
            >
              {t('loginWithGoogle')}
            </Button>

            <div className="flex gap-2 m-auto">
              <span className="text-gray-500 "> {t('haveAccount')}</span>
              <Button variant="text" size="zeroPadding" bgHoverColor="none">
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
