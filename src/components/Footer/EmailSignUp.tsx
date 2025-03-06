'use client';

import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import TextField from '@/components/TextField';
import Button from '@/components/Button';
import Icon from '@/components/Icon';

interface FormValues {
  email: string;
}

const validationSchema = Yup.object({
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const EmailSignup = () => {
  return (
    <Formik
      initialValues={{
        email: '',
      }}
      validationSchema={validationSchema}
      onSubmit={(values: FormValues) => {
        console.log(values);
      }}
    >
      {() => {
        return (
          <Form className="mt-6 flex space-x-2 w-full">
            <TextField
              name="email"
              label=""
              className="flex-1"
              inputContainerClassName="bg-white border-gray-500 border rounded-lg"
            />
            <Button
              height="45px"
              size="small"
              textColor="white"
              className="border border-dark-300"
              endIcon={<Icon name="send" color="inherit" />}
              type="submit"
            >
              SEND
            </Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default EmailSignup;
