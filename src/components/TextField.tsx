"use client";

import clsx from "clsx";
import { useField } from "formik";
import { useId } from "react";

interface TextFieldProps {
  name: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  iconOnClick?: React.MouseEventHandler<HTMLElement>;
  type?: "text" | "email" | "password";
  vertical?: boolean;
  placeholder?: string;
  inputClassName?: string;
  labelClassName?: string;
  className?: string;
  width?: string;
  height?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  labelWidth?: string;
  allow?: RegExp;
  prevent?: RegExp;
}

const TextField = ({
  name,
  label,
  onClick,
  onBlur,
  onChange,
  iconOnClick,
  type = "text",
  vertical = true,
  placeholder,
  inputClassName,
  labelClassName,
  className,
  width,
  height = "45px",
  leftIcon,
  rightIcon,
  labelWidth = "80px",
  allow,
  prevent,
}: TextFieldProps) => {
  const inputId = useId();
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const error = meta.error && meta.touched ? meta.error : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (allow) {
      newValue = newValue.replace(allow, "");
    }
    setValue(newValue);
    if (onChange) onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setTouched(true);
    if (onBlur) onBlur(e);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (prevent) {
      const char = e.key;
      if (!prevent.test(char)) {
        e.preventDefault();
      }
    }
  };

  const handleDivClick = () => {
    const inputElement = document.getElementById(inputId) as HTMLInputElement;
    if (inputElement) {
      inputElement.focus();
    }
  };

  if (vertical) {
    return (
      <div
        style={{
          width: width,
        }}
        className={clsx("group", className)}
      >
        {label && (
          <label htmlFor={name} className={clsx("block mb-1", labelClassName)}>
            {label}
          </label>
        )}
        <div
          style={{
            height: height,
          }}
          className={clsx(
            "flex items-center border border-gray-500 p-2 rounded-md bg-transparent",
            {
              "border-red-400": error,
              "hover:border-blue-300 group-focus-within:border-blue-300":
                !error,
            }
          )}
          onClick={handleDivClick}
        >
          {leftIcon && (
            <span className="mr-2" onClick={iconOnClick}>
              {leftIcon}
            </span>
          )}
          <input
            className={clsx(
              "outline-none placeholder-gray-500 w-full bg-transparent",
              inputClassName
            )}
            onKeyPress={handleKeyPress}
            value={field.value}
            id={inputId}
            name={name}
            placeholder={placeholder}
            type={type}
            onClick={onClick}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {rightIcon && (
            <span className="ml-2 flex items-center" onClick={iconOnClick}>
              {rightIcon}
            </span>
          )}
        </div>
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    );
  } else {
    return (
      <div
        style={{
          width: width,
          height: height,
        }}
        className={clsx("group", "flex items-center space-x-2", className)}
        onClick={handleDivClick}
      >
        {label && (
          <label
            htmlFor={name}
            className={clsx("mr-2", labelClassName)}
            style={{ width: labelWidth }}
          >
            {label}
          </label>
        )}
        <div
          className={clsx(
            "flex-grow flex items-center border p-2 rounded-md bg-transparent",
            {
              "border-red-400": error,
              "hover:border-blue-300 group-focus-within:border-blue-300":
                !error,
            }
          )}
        >
          {leftIcon && (
            <span className="mr-2" onClick={iconOnClick}>
              {leftIcon}
            </span>
          )}
          <input
            className={clsx(
              "outline-none placeholder-gray-500 w-full bg-transparent",
              inputClassName
            )}
            value={field.value}
            id={inputId}
            name={name}
            placeholder={placeholder}
            type={type}
            onKeyPress={handleKeyPress}
            onClick={onClick}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {rightIcon && (
            <span className="ml-2 flex items-center" onClick={iconOnClick}>
              {rightIcon}
            </span>
          )}
        </div>
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    );
  }
};

TextField.displayName = "TextField";
export default TextField;
