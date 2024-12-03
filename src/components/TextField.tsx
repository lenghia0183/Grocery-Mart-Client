"use client";

import clsx from "clsx";
import { useId } from "react";

import { useFormContext } from "react-hook-form";

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
  width?: number;
  height?: number;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  labelWidth?: string;
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
  height,
  leftIcon,
  rightIcon,
  labelWidth = "80px",
}: TextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const inputId = useId();

  const { onChange: innerOnChange, onBlur: innerOnBlur, ref } = register(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) onChange(e);
    innerOnChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (onBlur) onBlur(e);
    innerOnBlur(e);
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
          height: height,
        }}
        className={clsx("group", className)}
      >
        {label && (
          <label htmlFor={name} className={clsx("block mb-1", labelClassName)}>
            {label}
          </label>
        )}
        <div
          className={clsx(
            "flex items-center border p-2 rounded-md bg-transparent",
            {
              "border-red-400": errors[name],
              "hover:border-blue-300 group-focus-within:border-blue-300":
                !errors[name],
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
            {...register(name)}
            id={inputId}
            name={name}
            placeholder={placeholder}
            type={type}
            ref={ref}
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
        {errors[name] && (
          <span className="text-red-400 text-xs">
            {errors[name]?.message as string}
          </span>
        )}
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
              "border-red-400": errors[name],
              "hover:border-blue-300 group-focus-within:border-blue-300":
                !errors[name],
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
            {...register(name)}
            id={inputId}
            name={name}
            placeholder={placeholder}
            type={type}
            ref={ref}
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
        {errors[name] && (
          <span className="text-red-400 text-xs">
            {errors[name]?.message as string}
          </span>
        )}
      </div>
    );
  }
};

TextField.displayName = "TextField";
export default TextField;
