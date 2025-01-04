"use client";

import { Form, Formik } from "formik";
import Button from "@/components/Button";
import CheckBox from "@/components/CheckBox";
import CheckBoxGroup from "@/components/CheckBoxGroup";
import Header from "@/components/Header";
import Autocomplete from "@/components/AutoComplete";
import TextField from "@/components/TextField";
import * as Yup from "yup"; // Import Yup

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
    testArr: Yup.array()
      .min(1, "You must select at least one checkbox.")
      .required("Required"),
    test: Yup.string().required("This field is required."),
    category: Yup.string().required("Please select a category."),
  });

  return (
    <main>
      <Header />
      <div className="container">
        <Formik
          initialValues={{
            testArr: [{ test1: true }, { test2: true }],
            test: "",
            category: "",
          }}
          validationSchema={validationSchema}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          {({}) => (
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

              <TextField
                name="test"
                label="test"
                className="mb-4"
                vertical={false}
                labelWidth="20px"
              />

              <Autocomplete
                name="category"
                label="test test test"
                getOptionLabel={(data) => {
                  return data.name;
                }}
                getOptionSubLabel={(data) => data._id}
                asyncRequest={fetchCategory}
                asyncRequestHelper={(
                  response: CategoryResponse
                ): Category[] => {
                  return response.data.categories;
                }}
                getOptionValue={(data: Category) => {
                  return data._id;
                }}
                autoFetch={false}
                filterOptionsLocally={false}
                // disabled
                // vertical={false}
                className="mt-10"
              />

              <Button className="mt-2">Submit</Button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
}
