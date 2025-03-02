'use client';

import React, { useEffect, useRef } from 'react';
import clsx from 'clsx';
import Icon from '@/components/Icon';
import Loading from '@/components/Loading';

export interface IInputProps {
  height?: string;
  placeholder?: string;
  isLoading?: boolean;
  isOpen?: boolean;
  className?: string;
  iconClassName?: string;
  inputValue?: string;
  error?: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleOpenDropDown: () => void;
  handleToggleDropdown: () => void;
  disabled?: boolean;
  handleBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  handleClearInput: () => void;
}

const Input: React.FC<IInputProps> = ({
  height,
  placeholder,
  isLoading = false,
  isOpen,
  iconClassName,
  className,
  inputValue,
  handleInputChange,
  handleOpenDropDown,
  handleToggleDropdown,
  handleClearInput,
  error,
  disabled,
  handleBlur,
}) => {
  const handleIconClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    handleToggleDropdown();
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div className={clsx('flex', {})}>
      <div className="flex w-full relative">
        <input
          ref={inputRef}
          type="text"
          className={clsx(
            'w-full p-2 bg-transparent border rounded-md outline-none placeholder-gray-500  ',
            {
              'border-red-400': error,
              'border-gray-500': !error,
              '!bg-gray-200 dark:!bg-gray-600 text-gray-300 dark:!text-gray-500 !border-gray-300': disabled,
            },

            className,
          )}
          placeholder={placeholder}
          style={{
            height: height,
          }}
          onChange={handleInputChange}
          value={inputValue}
          onFocus={handleOpenDropDown}
          onBlur={handleBlur}
        />

        {inputValue && (
          <span
            className={'absolute right-2 top-1/2 -translate-y-1/2 flex'}
            onClick={() => {
              handleClearInput();
              if (inputRef.current != null) {
                inputRef.current.focus();
              }
            }}
          >
            <Icon name="close" strokeWidth={1} />
          </span>
        )}
      </div>
      <div
        style={{
          width: height,
          height: height,
        }}
        className={clsx(
          'flex items-center justify-center ml-1 rounded-md border',
          {
            'border-red-400': error,
            'border-gray-500': !error,
            '!bg-gray-200 dark:!bg-gray-600 text-gray-300 dark:!text-gray-500 !border-gray-300': disabled,
          },
          iconClassName,
        )}
        onClick={handleIconClick}
      >
        {isLoading ? (
          <Loading width="30px" height="30px" />
        ) : (
          <Icon
            name="arrowDown"
            className={clsx('text-inherit', {
              'rotate-0': isOpen,
              'rotate-180': !isOpen,
            })}
          />
        )}
      </div>
    </div>
  );
};

Input.displayName = 'input';

export default Input;
