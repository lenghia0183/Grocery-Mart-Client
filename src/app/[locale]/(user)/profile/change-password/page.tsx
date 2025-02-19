'use client';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import TextField from '@/components/TextField';
import { Form, Formik } from 'formik';

interface ChangePasswordFormValues {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const initialValues: ChangePasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = (): JSX.Element => {
  return (
    <div className="p-7 bg-white dark:bg-dark-400 dark:text-white shadow-md rounded-lg">
      <h2 className="text-2xl font-medium">Đổi mật khẩu</h2>
      <Divider />

      <Formik
        initialValues={initialValues}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {() => (
          <Form className="flex flex-col">
            <div className="grid grid-cols-2 gap-7 mt-5">
              <TextField
                name="currentPassword"
                label="Mật khẩu hiện tại"
                placeholder="Nhập mật khẩu hiện tại"
                required
                type="password"
              />
              <TextField
                name="newPassword"
                label="Mật khẩu mới"
                placeholder="Nhập mật khẩu mới"
                required
                type="password"
              />
              <TextField
                name="confirmPassword"
                label="Xác nhận mật khẩu mới"
                placeholder="Nhập lại mật khẩu mới"
                required
                type="password"
              />
            </div>
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

export default ChangePassword;
