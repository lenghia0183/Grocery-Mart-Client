import React, { useId } from 'react';
import { useField } from 'formik';
import clsx from 'clsx';
import { createTailwindClass } from '@/utils';

export interface CheckBoxProps {
  name: string;
  label: string;
  size?: number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  checked?: boolean;
  disabled?: boolean;
  borderColor?: string;
  labelClassName?: string;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  label,
  onChange,
  checked,
  size = 20,
  disabled = false,
  labelClassName,
  borderColor = 'gray-500',
}) => {
  const [field, meta, helpers] = useField({ name, type: 'checkbox' });
  const id = useId();
  const error = meta.error && meta.touched ? meta.error : '';

  const borderColorClass = createTailwindClass('border', borderColor);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const isChecked = e.target.checked;
    helpers.setValue(isChecked);
    if (onChange) {
      onChange(e);
    }
  };

  const isChecked = checked ?? field.checked;

  return (
    <>
      <label
        htmlFor={id}
        className={clsx('flex items-center gap-2 text-gray-500', labelClassName, {
          'cursor-not-allowed opacity-30': disabled,
        })}
      >
        <input
          type="checkbox"
          id={id}
          {...field}
          value={name}
          checked={isChecked}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
        <div
          className={clsx('border flex items-center justify-center relative rounded-md', borderColorClass, {
            '!border-gray-500 !bg-gray-300': disabled,
          })}
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <div
            className={clsx('absolute bg-blue-500 transition-all', {
              'scale-0 left-0 bottom-0': !isChecked,
              'scale-100': isChecked,
            })}
            style={{
              width: `80%`,
              height: `80%`,
              clipPath: 'polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)',
            }}
          ></div>
        </div>

        {label}
      </label>
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </>
  );
};

CheckBox.displayName = 'CheckBox';

export default CheckBox;
