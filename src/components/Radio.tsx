'use client';

import React, { ReactNode } from 'react';
import { useField, useFormikContext } from 'formik';
import clsx from 'clsx';

export interface RadioProps {
  name?: string;
  value: string;
  label?: ReactNode;
  vertical?: boolean;
  onChange?: (value: string) => void;
  className?: string;
  width?: string;
  disabled?: boolean;
  hideInput?: boolean;
  labelClassName?: string;
}

const Radio: React.FC<RadioProps> = ({
  name = '',
  value,
  label,
  vertical = false,
  onChange = () => {},
  className = '',
  width = '100%',
  disabled = false,
  hideInput = false,
  labelClassName = '',
}) => {
  const id = React.useId();
  const { setFieldValue } = useFormikContext();
  const [field] = useField({ name });

  const handleChange = () => {
    if (!disabled) {
      setFieldValue(name, value);
      onChange(value);
    }
  };

  if (vertical) {
    return (
      <div className={clsx('flex flex-col items-center flex-grow', className)} style={{ width }}>
        <input
          type="radio"
          id={id}
          {...field}
          value={value}
          checked={field.value === value}
          onChange={handleChange}
          className={clsx('form-radio h-4 w-4 text-blue-600', {
            'cursor-not-allowed': disabled,
            'cursor-pointer': !disabled,
            hidden: hideInput,
          })}
          disabled={disabled}
        />
        {label && (
          <label
            htmlFor={id}
            className={clsx('text-sm select-none mt-2', labelClassName, {
              'text-gray-500 cursor-not-allowed': disabled,
              'cursor-pointer': !disabled,
            })}
          >
            {label}
          </label>
        )}
      </div>
    );
  }

  return (
    <div className={clsx('flex items-center', className)} style={{ width }}>
      <input
        type="radio"
        id={id}
        {...field}
        value={value}
        checked={field.value === value}
        onChange={handleChange}
        className={clsx('form-radio h-4 w-4 text-blue-600', {
          'cursor-not-allowed': disabled,
          'cursor-pointer': !disabled,
          hidden: hideInput,
        })}
        disabled={disabled}
      />
      {label && (
        <label
          htmlFor={id}
          className={clsx('text-sm select-none', labelClassName, {
            'ml-2': !vertical,
            'text-gray-500 cursor-not-allowed': disabled,
            'cursor-pointer': !disabled,
          })}
        >
          {label}
        </label>
      )}
    </div>
  );
};

Radio.displayName = 'Radio';
export default Radio;
