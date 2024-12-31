"use client";

import Header from "@/components/Header";

import { object, string } from "yup";
import { Form, Formik } from "formik";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";

const validationSchema = object({});

export default function Test() {
  return (
    <main className="">
      <Header />

      <div className="container">
        <Formik
          initialValues={{ test: true }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <CheckBox name="test" label="test" disabled={true} />
            <Button>Submit</Button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
