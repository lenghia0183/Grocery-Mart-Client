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
}: IAutoCompleteProps<Item, Response>): JSX.Element => {
  const [options, setOptions] = useState<Item[]>(initialOptions);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [isClearInput, setIsClearInput] = useState<boolean>(false);

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
    // thay đổi input sẽ call api
    if (debouncedInputValue && !isSelected && isOpen && !isClearInput) {
      fetchData();
    }

    // đóng mở sẽ call api
    if (isOpen && !autoFetch && !debouncedInputValue && !isClearInput) {
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
    setInputValue(e.target.value);
    setValue(e.target.value);
    setIsSelected(false);
    setIsClearInput(false);
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
  };

  return (
    <div
      className={clsx({ "pointer-events-none cursor-not-allowed": disabled })}
    >
      {label && <label className="text-md mb-2">{label}</label>}
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
          options={options}
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
};

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
