"use client";

import Header from "@/components/Header";

import TextField from "@/components/TextField";
import { object, string } from "yup";
import { Form, Formik } from "formik";
import Button from "@/components/Button";
import { TEXTFIELD_ALLOW } from "../constants/regexes";
import TextArea from "@/components/TextArea";
import Icon from "@/components/Icon";

const validationSchema = object({
  username: string().required("Tên người dùng là bắt buộc"),
});

export default function Test() {
  return (
    <main className="">
      <Header />

      <div className="container">
        <Formik
          initialValues={{ username: "fasdfsd" }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <TextField
              name="username"
              label="Username"
              placeholder="Enter your username"
              allow={TEXTFIELD_ALLOW.NUMERIC}
            />

            <TextArea
              name="textarea"
              label="text area"
              placeholder="Enter your text here"
              allow={TEXTFIELD_ALLOW.ALPHANUMERIC_SPECIAL}
            />

            <Button>Submit</Button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
