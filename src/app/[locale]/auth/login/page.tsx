'use client';

import images from '@/asset/images';
import Button from '@/components/Button';
import CheckBox from '@/components/CheckBox';
import Icon from '@/components/Icon';

import Image from '@/components/Image';
import Logo from '@/components/Logo';
import TextField from '@/components/TextField';
import { Form, Formik } from 'formik';
import React from 'react';

const LoginPage: React.FC = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="h-screen relative bg-[linear-gradient(to_right,_#FAF7FF_50%,_#ffffff_50%)]">
        <div className="grid grid-cols-12 h-full container">
          {/* Nửa bên trái với màu gradient */}
          <div className="col-span-6 flex items-center justify-center h-full">
            <div>
              <Image src={images.login} alt="Grocery Mart" />
              <p className="w-[70%] text-center mt-10 text-dark">
                Experience the best shopping experience with Grocery Mart, offering high-quality products and innovative
                services tailored for you.
              </p>
            </div>
          </div>

          {/* Nửa bên phải với màu khác */}
          <div className="col-span-6 h-full p-24 pt-0 text-center flex flex-col  justify-center">
            <Logo className="mx-auto" />

            <h2 className="text-[30px] mt-10">Hello Again!</h2>
            <p className="text-gray-500 mt-7">
              Sign in to your <strong>Grocery Mart</strong> account to access your saved information, exclusive deals,
              and a seamless shopping experience.
            </p>

            <Formik
              initialValues={{ email: '', password: '' }}
              onSubmit={(values) => {
                console.log(values);
                // Xử lý đăng nhập ở đây
              }}
            >
              {({}) => (
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
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
