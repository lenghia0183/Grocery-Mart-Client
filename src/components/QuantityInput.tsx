'use client';

import React, { useEffect } from 'react';
import clsx from 'clsx';
import { useField } from 'formik';
import IconButton from './IconButton';
import { createTailwindClass } from '@/utils';

type QuantityInputProps = {
  name: string;
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  disabled?: boolean;
  height?: string;
  width?: string;
  borderColor?: string;
  onChange?: (value: number) => void;
};

const QuantityInput: React.FC<QuantityInputProps> = ({
  name,
  min = 1,
  max = 100,
  step = 1,
  className = '',
  inputClassName = '',
  buttonClassName = '',
  disabled = false,
  height = '40px',
  width = '120px',
  borderColor = 'gray-500',
  onChange,
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  const borderColorClass = createTailwindClass('border', borderColor);

  useEffect(() => {
    if (value == undefined) {
      setValue(min);
      onChange?.(min);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDecrease = () => {
    if (typeof value === 'number' && value > min) {
      const newValue = Math.max(min, value - step);
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleIncrease = () => {
    if (typeof value === 'number' && value < max) {
      const newValue = Math.min(max, value + step);
      setValue(newValue);
      onChange?.(newValue);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === '') {
      setValue('');
      onChange?.(NaN);
      return;
    }

    const isNumeric = /^[0-9]*$/.test(newValue);

    if (isNumeric) {
      const parsedValue = parseInt(newValue, 10);

      const clampedValue = Math.max(min, Math.min(max, parsedValue));
      setValue(clampedValue);
      onChange?.(clampedValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value === '') {
      setValue(min);
      onChange?.(min);
    }
    field.onBlur(e);
  };

  return (
    <div
      className={clsx(
        'flex items-center justify-center border rounded-[10px]',
        borderColorClass,
        { 'pointer-events-none border-gray-300': disabled },
        className,
      )}
      style={{ width }}
    >
      <IconButton
        iconName="minus"
        iconColor="dark dark:white"
        className={clsx(
          {
            'text-gray-300 dark:!text-gray-500': (typeof value === 'number' && value <= min) || disabled,
          },

          'shadow-none',
          buttonClassName,
        )}
        type="button"
        iconHeight={'24px'}
        iconWidth={'24px'}
        iconStrokeWidth={1}
        onClick={handleDecrease}
      />

      <input
        type="text"
        {...field}
        value={value ?? min}
        onBlur={handleBlur}
        onChange={handleInputChange}
        className={clsx(
          'max-w-9 text-center outline-none bg-transparent text-dark dark:text-white-200',
          {
            'text-gray-300 ': disabled,
          },
          inputClassName,
        )}
        style={{ height }}
        disabled={disabled}
      />

      <IconButton
        iconName="plus"
        iconColor="dark dark:white"
        className={clsx(
          {
            '!text-gray-300 dark:!text-gray-500': (typeof value === 'number' && value >= max) || disabled,
          },
          'shadow-none',
          buttonClassName,
        )}
        type="button"
        iconHeight={'24px'}
        iconWidth={'24px'}
        iconStrokeWidth={1}
        onClick={handleIncrease}
        disabled={disabled || (typeof value === 'number' && value >= max)}
      />

      {meta.touched && meta.error && <div className="text-red-500 text-sm">{meta.error}</div>}
    </div>
  );
};

export default QuantityInput;
