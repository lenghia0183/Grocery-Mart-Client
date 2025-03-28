'use client';

import React, { useState, useRef, useEffect } from 'react';
import Input from './Input';
import OptionList from './OptionList';
import useDebounce from '@/hooks/useDebounce';
import clsx from 'clsx';
import { useField, useFormikContext } from 'formik';

export interface IAutoCompleteProps<Item, Response = Item[]> {
  name: string;
  width?: string;
  height?: string;
  label?: string;
  options?: Item[];
  getOptionLabel?: (option: Item) => string;
  getOptionSubLabel?: (option: Item) => string;
  getOptionValue?: (option: Item) => Item | string;
  asyncRequest?: (inputValue: string) => Promise<Response>;
  asyncRequestHelper?: (data: Response) => Item[];
  autoFetch?: boolean;
  disabled?: boolean;
  filterOptionsLocally?: boolean;
  vertical?: boolean;
  labelWidth?: string;
  className?: string;
  allow?: RegExp;
  required?: boolean;
  asyncRequestDeps?: string;
}

const Autocomplete = <Item, Response = Item[]>({
  name,
  height = '45px',
  label,
  options: initialOptions = [],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getOptionLabel = (option: Item) => '',
  getOptionSubLabel = () => '',
  asyncRequestHelper = (data) => data as Item[],
  asyncRequest,
  getOptionValue = (data) => data as Item,
  autoFetch = true,
  disabled = false,
  filterOptionsLocally = true,
  vertical = true,
  labelWidth = '80px',
  className,
  allow,
  asyncRequestDeps = '',
  required,
}: IAutoCompleteProps<Item, Response>): JSX.Element => {
  const [options, setOptions] = useState<Item[]>(initialOptions);
  const [filteredOptions, setFilteredOptions] = useState<Item[]>(initialOptions);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isClearInput, setIsClearInput] = useState<boolean>(false);
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedInputValue = useDebounce(inputValue, 500);

  const { values } = useFormikContext<Record<string, string | number | boolean>>();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const error = meta.error && meta.touched ? meta.error : '';
  const value = field.value;
  // console.log('values autoComplete', field.value);

  useEffect(() => {
    // if (autoFetch) {
    //   if (asyncRequest) fetchData();
    // }

    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // mỗi lần nhập từ mới sẽ call api để tìm kiếm vì khi filterOptionsLocally là false sẽ call api để tìm kiếm
    if (
      asyncRequestDeps &&
      values[asyncRequestDeps] &&
      !autoFetch &&
      isOpen &&
      !filterOptionsLocally &&
      !isClearInput &&
      !isSelected
    ) {
      fetchData();
    }

    if (
      asyncRequestDeps &&
      values[asyncRequestDeps] &&
      autoFetch &&
      !hasFetchedData &&
      !filterOptionsLocally &&
      !isClearInput &&
      !isSelected
    ) {
      fetchData();
    }

    if (
      asyncRequestDeps &&
      values[asyncRequestDeps] &&
      autoFetch &&
      debouncedInputValue &&
      !filterOptionsLocally &&
      !isClearInput &&
      !isSelected
    ) {
      fetchData();
    }

    // mở ra phát nào là call api phát ý và dùng tìm kiếm không call apiapi
    if (asyncRequestDeps && values[asyncRequestDeps] && !autoFetch && isOpen && filterOptionsLocally) {
      fetchData();
    }

    // call lần đầu để cho vào filterOptionsLocally và tìm kiếm không call api
    if (asyncRequestDeps && values[asyncRequestDeps] && autoFetch && !hasFetchedData && filterOptionsLocally) {
      fetchData();
    }

    // thay đổi input sẽ call api không tìm kiếm trong options đã có
    if (
      debouncedInputValue &&
      !isSelected &&
      isOpen &&
      !isClearInput &&
      !filterOptionsLocally &&
      !asyncRequestDeps &&
      !values[asyncRequestDeps]
    ) {
      fetchData();
    }

    // đóng mở sẽ call api không tìm kiếm trong options đã có
    if (
      isOpen &&
      !autoFetch &&
      !debouncedInputValue &&
      !isClearInput &&
      !filterOptionsLocally &&
      !asyncRequestDeps &&
      !values[asyncRequestDeps]
    ) {
      fetchData();
    }

    // call api khi chưa có options và autoFectch là true và filterOptionsLocally là true (call khi lần đầu mount)
    if (autoFetch && filterOptionsLocally && !hasFetchedData && !asyncRequestDeps && !values[asyncRequestDeps]) {
      fetchData();
    }

    // sẽ call api khi chưa có options và autoFectch là false vì phải call api thì filterdOptions mới có dữ liệu (call trong lần mở đầu tiên)
    if (
      isOpen &&
      !autoFetch &&
      filterOptionsLocally &&
      !hasFetchedData &&
      !asyncRequestDeps &&
      !values[asyncRequestDeps]
    ) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, isOpen, values[asyncRequestDeps]]);

  useEffect(() => {
    if (asyncRequestDeps) {
      setHasFetchedData(false);
      setValue('');
      setInputValue('');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values[asyncRequestDeps], asyncRequestDeps]);

  useEffect(() => {
    setInputValue(getOptionLabel(value ?? ''));
    setValue(getOptionValue(value));
    // console.log(`value ${name}`, value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  const fetchData = async () => {
    if (!asyncRequest) return;

    try {
      setIsLoading(true);
      const result = await asyncRequest(debouncedInputValue);
      const transformedData = asyncRequestHelper(result);
      setOptions(transformedData);
      setHasFetchedData(true);
      if (filterOptionsLocally) {
        setFilteredOptions(transformedData);
      }
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenDropdown = () => {
    setIsOpen(true);
  };

  const handleToggleDropdown = () => {
    setIsOpen((pre) => !pre);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (allow) {
      newValue = newValue.replace(allow, '');
    }

    setInputValue(newValue);
    // setValue(newValue);
    setIsSelected(false);
    setIsClearInput(false);

    if (filterOptionsLocally && hasFetchedData) {
      setFilteredOptions(
        options.filter((option) => getOptionLabel(option).toLowerCase().includes(newValue.toLowerCase())),
      );
    }
  };

  const handleSelectOption = (selectedOption: Item) => {
    setInputValue(getOptionLabel(selectedOption));
    setIsOpen(false);
    setIsSelected(true);
    setValue(getOptionValue(selectedOption));
    setIsClearInput(false);
  };

  const handleBlur = () => {
    setTouched(true);
  };

  const handleClearInput = () => {
    setInputValue('');
    setValue('');
    setIsSelected(false);
    setIsClearInput(true);

    if (filterOptionsLocally) {
      setFilteredOptions(options);
    }
  };

  if (vertical) {
    return (
      <div className={clsx({ 'pointer-events-none cursor-not-allowed select-none': disabled })}>
        {label && (
          <label className={clsx('text-md mb-2', { 'text-gray-500': disabled })}>
            {' '}
            {required && <span className="text-red-400 dark:text-red-300 mr-1">*</span>}
            {label}
          </label>
        )}
        <div className="relative group" ref={containerRef}>
          <Input
            height={height}
            isOpen={isOpen}
            isLoading={isLoading}
            handleInputChange={handleInputChange}
            handleToggleDropdown={handleToggleDropdown}
            handleOpenDropDown={handleOpenDropdown}
            handleBlur={handleBlur}
            inputValue={inputValue || ''}
            handleClearInput={handleClearInput}
            error={error}
            disabled={disabled}
            className={clsx({
              '!border-blue-400': isOpen,
              'group-hover:border-blue-400': !error,
            })}
            iconClassName={clsx({
              '!text-blue-400': isOpen,
              '!border-blue-400': isOpen,
              'group-hover:text-blue-400 group-hover:border-blue-400': !error,
            })}
          />
          <OptionList
            options={filterOptionsLocally ? filteredOptions : options}
            inputValue={inputValue}
            getOptionSubLabel={getOptionSubLabel}
            getOptionLabel={getOptionLabel}
            isOpen={isOpen}
            handleSelectOption={handleSelectOption}
            className={clsx('group-hover:border-blue-400', {
              '!border-blue-400': isOpen,
            })}
          />
        </div>
        {error && !disabled && <span className="text-red-400 dark:text-red-300 text-xs">{error}</span>}
      </div>
    );
  } else {
    return (
      <div className={clsx(className)}>
        <div
          className={clsx('flex items-center gap-2', {
            'pointer-events-none select-none': disabled,
          })}
        >
          {label && (
            <label
              className={clsx('text-md mb-2', { 'text-gray-500': disabled })}
              style={{
                width: labelWidth,
              }}
            >
              {' '}
              {required && <span className="text-red-400 dark:text-red-300 mr-1">*</span>}
              {label}
            </label>
          )}
          <div className="relative group w-full" ref={containerRef}>
            <Input
              height={height}
              isOpen={isOpen}
              isLoading={isLoading}
              handleInputChange={handleInputChange}
              handleToggleDropdown={handleToggleDropdown}
              handleOpenDropDown={handleOpenDropdown}
              handleBlur={handleBlur}
              inputValue={inputValue}
              handleClearInput={handleClearInput}
              error={error}
              disabled={disabled}
              className={clsx({
                '!border-blue-400': isOpen,
                'group-hover:border-blue-400': !error,
              })}
              iconClassName={clsx({
                '!text-blue-400': isOpen,
                '!border-blue-400': isOpen,
                'group-hover:text-blue-400 group-hover:border-blue-400': !error,
              })}
            />
            <OptionList
              options={filterOptionsLocally ? filteredOptions : options}
              inputValue={inputValue}
              getOptionSubLabel={getOptionSubLabel}
              getOptionLabel={getOptionLabel}
              isOpen={isOpen}
              handleSelectOption={handleSelectOption}
              className={clsx('group-hover:border-blue-400', {
                '!border-blue-400': isOpen,
              })}
            />
          </div>
        </div>
        {error && !disabled && <span className="text-red-400 dark:text-red-300 text-xs">{error}</span>}
      </div>
    );
  }
};

Autocomplete.displayName = 'Autocomplete';

export default Autocomplete;
