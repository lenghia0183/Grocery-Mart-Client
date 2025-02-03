'use client';

import { Form, Formik } from 'formik';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Icon from '@/components/Icon';
import TextField from '@/components/TextField';
import React from 'react';

const LoginForm: React.FC = () => {
  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={(values) => {
        console.log(values);
        // Xử lý đăng nhập ở đây
      }}
    >
      {() => (
        <Form className="mt-12">
          <TextField name="email" label="" type="email" placeholder="Email" rightIcon={<Icon name="email" />} />

          <TextField
            name="password"
            label=""
            type="password"
            placeholder="Password"
            rightIcon={<Icon name="password" />}
            className="mt-6"
          />

          <div className="flex justify-between mt-6">
            <CheckBox name="showPassword" label="Hiển thị mật khẩu" />

            <Button variant="text" size="zeroPadding">
              Quên mật khẩu
            </Button>
          </div>
          <div className="mt-6 flex flex-col gap-5">
            <Button type="submit" full>
              Sign In
            </Button>

            <Button
              full
              variant="outlined"
              textHoverColor="yellow-500"
              borderHoverColor="yellow-500"
              bgHoverColor="none"
              startIcon={<Icon name="gmail" color="inherit" />}
            >
              Login with Gmail
            </Button>

            <div className="flex gap-2 m-auto">
              <span className="text-gray-500"> Don&apos;t have an account?</span>
              <Button variant="text" size="zeroPadding">
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
