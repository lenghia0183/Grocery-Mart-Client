'use client';

import Button from '@/components/Button';
import Divider from '@/components/Divider';
import TextField from '@/components/TextField';
import { Form, Formik } from 'formik';

interface ProfileFormValues {
  name: string;
  phone: string;
  displayName?: string;
  email: string;
}

const initialValues: ProfileFormValues = {
  name: '',
  phone: '',
  displayName: '',
  email: '',
};

const Profile = (): JSX.Element => {
  return (
    <div className="p-7 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-medium">Thông tin cá nhân</h2>
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
              <TextField name="name" label="Họ và tên" placeholder="Họ và tên" required />
              <TextField name="phone" label="Số điện thoại" placeholder="Số điện thoại" required />
              <TextField name="displayName" label="Tên hiển thị" placeholder="Tên hiển thị" />
              <TextField name="email" label="Email" placeholder="Email" required />
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

export default Profile;
