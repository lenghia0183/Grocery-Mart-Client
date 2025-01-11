/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { Form, Formik, FormikHelpers } from "formik";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import CheckBoxGroup from "@/components/CheckBoxGroup";
import Header from "@/components/Header";
import Autocomplete from "@/components/AutoComplete";
import TextField from "@/components/TextField";
import * as Yup from "yup"; // Import Yup
import { TEXTFIELD_ALLOW } from "../constants/regexes";
import FileUploadButton from "@/components/FileUploadButton";
import QuantityInput from "@/components/QuantityInput";
import GoToTop from "@/components/GoToTop";
import { useState } from "react";
import Dialog from "@/components/Dialog";

export default function Test() {
  interface Category {
    _id: string;
    name: string;
    image: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
  }

  interface Pagination {
    limit: number;
    totalResult: number;
    totalPage: number;
    currentPage: number;
    currentResult: number;
  }

  interface CategoryResponse {
    code: number;
    message: string;
    data: {
      categories: Category[];
      limit: Pagination["limit"];
      totalResult: Pagination["totalResult"];
      totalPage: Pagination["totalPage"];
      currentPage: Pagination["currentPage"];
      currentResult: Pagination["currentResult"];
    };
  }

  const fetchCategory = async (): Promise<CategoryResponse> => {
    try {
      const response = await fetch("https://api.hauifood.com/v1/categories");
      console.log("response: ", response);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data: CategoryResponse = await response.json();
      console.log("response", data);
      return data;
    } catch (error) {
      console.error("Error fetching posts:", error);
      return {
        code: 0,
        message: "",
        data: {
          categories: [],
          limit: 0,
          totalResult: 0,
          totalPage: 0,
          currentPage: 0,
          currentResult: 0,
        },
      };
    }
  };

  // Define validation schema
  const validationSchema = Yup.object({
    // testArr: Yup.array()
    //   .min(1, "You must select at least one checkbox.")
    //   .required("Required"),
    // test: Yup.string().required("This field is required."),
    // category: Yup.string().required("Please select a category."),
    // files: Yup.required("File upload is required."),
  });

  interface MyFormValues {
    name: string;
  }
  const initialValues: MyFormValues = { name: "" };

  const formikConfig = {
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required("Name is required"),
    }),
    onSubmit: (values: MyFormValues) => {
      console.log("values", values);
    },
  };
  const [isOpen, setIsOpen] = useState(false);

  return (
    <main>
      <Header />
      <div className="container h-[2000px]">
        <button onClick={() => setIsOpen(true)}>Open Dialog</button>
        <Dialog
          isOpen={isOpen}
          onCancel={() => setIsOpen(false)}
          title="Example Dialog"
          formikProps={formikConfig}
          submitLabel="Submit"
          cancelLabel="Cancel"
        >
          <TextField name="name" label="haha" disabled={false} />
        </Dialog>

        <GoToTop />
      </div>
    </main>
  );
}
