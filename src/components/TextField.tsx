'use client';

import clsx from 'clsx';
import { useField } from 'formik';
import { useEffect, useId } from 'react';

interface TextFieldProps {
  name: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  iconOnClick?: React.MouseEventHandler<HTMLElement>;
  type?: 'text' | 'email' | 'password';
  vertical?: boolean;
  placeholder?: string;
  inputClassName?: string;
  inputContainerClassName?: string;
  labelClassName?: string;
  className?: string;
  width?: string;
  height?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  labelWidth?: string;
  allow?: RegExp;
  prevent?: RegExp;
  disabled?: boolean;
  required?: boolean;
}

const TextField = ({
  name,
  label,
  onClick,
  onBlur,
  onChange,
  iconOnClick,
  type = 'text',
  vertical = true,
  placeholder,
  inputClassName,
  inputContainerClassName,
  labelClassName,
  className,
  width,
  height = '45px',
  leftIcon,
  rightIcon,
  labelWidth = '80px',
  allow,
  prevent,
  disabled = false,
  required = false,
}: TextFieldProps) => {
  const inputId = useId();
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const error = meta.error && meta.touched ? meta.error : '';

  useEffect(() => {
    setValue(field.value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field.value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;
    if (allow) {
      newValue = newValue.replace(allow, '');
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
        className={clsx('group', className)}
      >
        {label && (
          <label
            htmlFor={name}
            className={clsx('mb-1 text-left flex items-center', { 'text-gray-500': disabled }, labelClassName)}
          >
            {required && <span className="text-red-400 mr-1">*</span>}
            {label}
          </label>
        )}
        <div
          style={{
            height: height,
          }}
          className={clsx(
            'flex items-center border-gray-300 border p-2 rounded-md bg-transparent',
            inputContainerClassName,
            {
              'border-red-400': error && !disabled,
              'hover:border-blue-400 group-focus-within:border-blue-400': !error && !disabled,
              '!bg-gray-200 text-gray-300 border-gray-300 pointer-events-none': disabled,
            },
          )}
          onClick={handleDivClick}
        >
          {leftIcon && (
            <span className="mr-2" onClick={iconOnClick}>
              {leftIcon}
            </span>
          )}
          <input
            className={clsx('outline-none placeholder-gray-500 w-full bg-transparent', inputClassName)}
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
        {error && <p className="text-red-400 text-xs mt-2 text-left">{error}</p>}
      </div>
    );
  } else {
    return (
      <div className={clsx(className)}>
        <div
          style={{
            width: width,
            height: height,
          }}
          className={clsx('group', 'flex items-center space-x-2', {
            'pointer-events-none': disabled,
          })}
          onClick={handleDivClick}
        >
          {label && (
            <label
              htmlFor={name}
              className={clsx('mr-2', { 'text-gray-500': disabled }, labelClassName)}
              style={{ width: labelWidth }}
            >
              {required && <span className="text-red-400 mr-1">*</span>}
              {label}
            </label>
          )}
          <div
            className={clsx(
              'flex-grow flex items-center border-gray-300 border p-2 rounded-md bg-transparent',
              inputContainerClassName,
              {
                'border-red-400': error && !disabled,
                'hover:border-blue-400 group-focus-within:border-blue-400': !error && !disabled,
                '!bg-gray-200 text-gray-300 border-gray-300 pointer-events-none': disabled,
              },
            )}
          >
            {leftIcon && (
              <span className="mr-2" onClick={iconOnClick}>
                {leftIcon}
              </span>
            )}
            <input
              className={clsx('outline-none placeholder-gray-500 w-full bg-transparent', inputClassName)}
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
        </div>
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    );
  }
};

TextField.displayName = 'TextField';
export default TextField;
