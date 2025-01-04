"use client";

import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";
import OptionList from "./OptionList";
import useDebounce from "@/hooks/useDebounce";
import clsx from "clsx";
import { useField } from "formik";

export interface IAutoCompleteProps<Item, Response = Item[]> {
  name: string;
  width?: string;
  height?: string;
  label?: string;
  options?: Item[];
  getOptionLabel: (option: Item) => string;
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
}

const Autocomplete = <Item, Response = Item[]>({
  name,
  height = "45px",
  label,
  options: initialOptions = [],
  getOptionLabel,
  getOptionSubLabel = () => "",
  asyncRequestHelper = (data) => data as Item[],
  asyncRequest,
  getOptionValue = (data) => data as Item,
  autoFetch = true,
  disabled = false,
  filterOptionsLocally = true,
  vertical = true,
  labelWidth = "80px",
  className,
  allow,
}: IAutoCompleteProps<Item, Response>): JSX.Element => {
  const [options, setOptions] = useState<Item[]>(initialOptions);
  const [filteredOptions, setFilteredOptions] =
    useState<Item[]>(initialOptions);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isClearInput, setIsClearInput] = useState<boolean>(false);
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedInputValue = useDebounce(inputValue, 500);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta, helpers] = useField(name);
  const { setValue, setTouched } = helpers;
  const error = meta.error && meta.touched ? meta.error : "";

  useEffect(() => {
    if (autoFetch) {
      if (asyncRequest) fetchData();
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // thay đổi input sẽ call api không tìm kiếm trong options đã có
    if (
      debouncedInputValue &&
      !isSelected &&
      isOpen &&
      !isClearInput &&
      !filterOptionsLocally
    ) {
      fetchData();
    }

    // đóng mở sẽ call api không tìm kiếm trong options đã có
    if (
      isOpen &&
      !autoFetch &&
      !debouncedInputValue &&
      !isClearInput &&
      !filterOptionsLocally
    ) {
      fetchData();
    }

    // call api khi chưa có options và autoFectch là true và filterOptionsLocally là true (call khi lần đầu mount)
    if (autoFetch && filterOptionsLocally && !hasFetchedData) {
      fetchData();
    }

    // sẽ call api khi chưa có options và autoFectch là false vì phải call api thì filterdOptions mới có dữ liệu (call trong lần mở đầu tiên)
    if (isOpen && !autoFetch && filterOptionsLocally && !hasFetchedData) {
      fetchData();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedInputValue, isOpen]);

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
      newValue = newValue.replace(allow, "");
    }

    setInputValue(newValue);
    setValue(newValue);
    setIsSelected(false);
    setIsClearInput(false);

    if (filterOptionsLocally && hasFetchedData) {
      setFilteredOptions(
        options.filter((option) =>
          getOptionLabel(option).toLowerCase().includes(newValue.toLowerCase())
        )
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
    setInputValue("");
    setValue("");
    setIsSelected(false);
    setIsClearInput(true);

    if (filterOptionsLocally) {
      setFilteredOptions(options);
    }
  };

  if (vertical) {
    return (
      <div
        className={clsx({ "pointer-events-none cursor-not-allowed": disabled })}
      >
        {label && (
          <label
            className={clsx("text-md mb-2", { "text-gray-500": disabled })}
          >
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
            inputValue={inputValue}
            handleClearInput={handleClearInput}
            error={error}
            disabled={disabled}
            className={clsx({
              "!border-blue-300": isOpen,
              "group-hover:border-blue-300": !error,
            })}
            iconClassName={clsx({
              "!text-blue-300": isOpen,
              "!border-blue-300": isOpen,
              "group-hover:text-blue-300 group-hover:border-blue-300": !error,
            })}
          />
          <OptionList
            options={filterOptionsLocally ? filteredOptions : options}
            inputValue={inputValue}
            getOptionSubLabel={getOptionSubLabel}
            getOptionLabel={getOptionLabel}
            isOpen={isOpen}
            handleSelectOption={handleSelectOption}
            className={clsx("group-hover:border-blue-300", {
              "!border-blue-300": isOpen,
            })}
          />
        </div>
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    );
  } else {
    return (
      <div className={clsx(className)}>
        <div
          className={clsx("flex items-center gap-2", {
            "pointer-events-none": disabled,
          })}
        >
          {label && (
            <label
              className={clsx("text-md mb-2", { "text-gray-500": disabled })}
              style={{
                width: labelWidth,
              }}
            >
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
                "!border-blue-300": isOpen,
                "group-hover:border-blue-300": !error,
              })}
              iconClassName={clsx({
                "!text-blue-300": isOpen,
                "!border-blue-300": isOpen,
                "group-hover:text-blue-300 group-hover:border-blue-300": !error,
              })}
            />
            <OptionList
              options={filterOptionsLocally ? filteredOptions : options}
              inputValue={inputValue}
              getOptionSubLabel={getOptionSubLabel}
              getOptionLabel={getOptionLabel}
              isOpen={isOpen}
              handleSelectOption={handleSelectOption}
              className={clsx("group-hover:border-blue-300", {
                "!border-blue-300": isOpen,
              })}
            />
          </div>
        </div>
        {error && <span className="text-red-400 text-xs">{error}</span>}
      </div>
    );
  }
};

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
