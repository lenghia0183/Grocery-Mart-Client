"use client";

import { Form, Formik } from "formik";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import CheckBoxGroup from "@/components/CheckBoxGroup";
import Header from "@/components/header";

export default function Test() {
  return (
    <main className="">
      <Header />

      <div className="container">
        <Formik
          initialValues={{
            testArr: [{ test1: true }, { test2: true }],
          }}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form>
            <CheckBoxGroup name="testArr" vertical={true}>
              <div>
                <div>
                  <CheckBox name="test1" label="test1" size={100} />
                </div>
              </div>
              <div>
                <div>
                  <CheckBox name="test2" label="test2" />
                </div>
              </div>
            </CheckBoxGroup>
            <Button>Submit</Button>
          </Form>
        </Formik>
      </div>
    </main>
  );
}
