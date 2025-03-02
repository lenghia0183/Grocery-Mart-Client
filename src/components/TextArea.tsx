'use client';

import clsx from 'clsx';
import { useField } from 'formik';
import { useId } from 'react';

interface TextAreaProps {
  name: string;
  label: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  iconOnClick?: React.MouseEventHandler<HTMLElement>;
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
  allow?: RegExp;
  prevent?: RegExp;
  rows?: number;
  cols?: number;
  required?: boolean;
  disabled?: boolean;
}

const TextArea = ({
  name,
  label,
  onClick,
  onBlur,
  onChange,
  iconOnClick,
  vertical = true,
  placeholder,
  inputClassName,
  labelClassName,
  className,
  width,
  height,
  leftIcon,
  rightIcon,
  labelWidth = '80px',
  allow,
  prevent,
  rows = 15,
  cols,
  required,
  disabled = true,
}: TextAreaProps) => {
  const inputId = useId();
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const error = meta.error && meta.touched ? meta.error : '';

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    let newValue = e.target.value;
    if (allow) {
      newValue = newValue.replace(allow, '');
    }
    setValue(newValue);
    if (onChange) onChange(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    setTouched(true);
    if (onBlur) onBlur(e);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (prevent) {
      const char = e.key;
      if (!prevent.test(char)) {
        e.preventDefault();
      }
    }
  };

  const handleDivClick = () => {
    const inputElement = document.getElementById(inputId) as HTMLTextAreaElement;
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
        className={clsx('group', { 'select-none pointer-events-none': disabled }, className)}
      >
        {label && (
          <label htmlFor={name} className={clsx('block mb-1', { 'text-gray-500': disabled }, labelClassName)}>
            {required && <span className="text-red-400 mr-1">*</span>} {label}
          </label>
        )}
        <div
          className={clsx(
            'flex items-center border-gray-300 border p-2 rounded-md bg-transparent text-dark dark:text-white-200',
            {
              'border-red-400': error && !disabled,
              'hover:border-blue-400 group-focus-within:border-blue-400 ': !error && !disabled,
              '!bg-gray-200 dark:!bg-gray-600 text-gray-300 dark:!text-gray-500 border-gray-300': disabled,
            },
          )}
          onClick={handleDivClick}
        >
          {leftIcon && (
            <span className="mr-2" onClick={iconOnClick}>
              {leftIcon}
            </span>
          )}
          <textarea
            className={clsx('outline-none placeholder-gray-500 w-full bg-transparent', inputClassName)}
            onKeyPress={handleKeyPress}
            value={field.value}
            id={inputId}
            name={name}
            placeholder={placeholder}
            onClick={onClick}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={rows}
            cols={cols}
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
        className={clsx(
          'group',
          'flex items-center space-x-2',
          {
            'pointer-events-none select-none': disabled,
          },
          className,
        )}
        onClick={handleDivClick}
      >
        {label && (
          <label htmlFor={name} className={clsx('mr-2', labelClassName)} style={{ width: labelWidth }}>
            {required && <span className="text-red-400 mr-1">*</span>} {label}
          </label>
        )}
        <div
          className={clsx(
            'flex-grow flex items-center border-gray-300 border p-2 rounded-md bg-transparent text-dark dark:text-white-200',
            {
              'border-red-400': error && !disabled,
              'hover:border-blue-400 group-focus-within:border-blue-400': !error && !disabled,
              '!bg-gray-200 dark:!bg-gray-600 text-gray-300 dark:!text-gray-500 border-gray-300': disabled,
            },
          )}
        >
          {leftIcon && (
            <span className="mr-2" onClick={iconOnClick}>
              {leftIcon}
            </span>
          )}
          <textarea
            className={clsx('outline-none placeholder-gray-500 w-full bg-transparent', inputClassName)}
            value={field.value}
            id={inputId}
            name={name}
            placeholder={placeholder}
            onKeyPress={handleKeyPress}
            onClick={onClick}
            onChange={handleChange}
            onBlur={handleBlur}
            rows={rows}
            cols={cols}
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

TextArea.displayName = 'TextArea';
export default TextArea;
