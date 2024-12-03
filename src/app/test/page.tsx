"use client";

import Header from "@/components/Header";
import { useForm, FormProvider } from "react-hook-form";
import TextField from "@/components/TextField";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Icon from "@/components/Icon";
interface FormData {
  username: string;
  email: string;
}

const schema = object({
  username: string().required("Tên người dùng là bắt buộc"),
  email: string()
    .email("Địa chỉ email không hợp lệ")
    .required("Email là bắt buộc"),
});

export default function Test() {
  const methods = useForm<FormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      username: "",
      email: "",
    },
    mode: "all",
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  return (
    <main className="">
      <Header />

      <div className="container">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-4">
            <TextField
              name="username"
              label="Username"
              type="text"
              placeholder="Tên người dùng"
              rightIcon={<Icon name="email" />}
            />
            <TextField
              name="email"
              label="Email"
              type="email"
              vertical={false}
              rightIcon={<Icon name="email" size={4} />}
              iconOnClick={() => {
                console.log("Clicked");
              }}
            />
            <button
              type="submit"
              className="bg-blue-500 text-white p-2 rounded-md"
            >
              Submit
            </button>
          </form>
        </FormProvider>
      </div>
    </main>
  );
}
