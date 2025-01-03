"use client";

import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";
import OptionList from "./OptionList";
import useDebounce from "@/hooks/useDebounce";
import clsx from "clsx";

export interface IAutoCompleteProps<Item, Response = Item[]> {
  width?: string;
  height?: string;
  label?: string;
  options?: Item[];
  getOptionLabel: (option: Item) => string;
  getOptionSubLabel?: (option: Item) => string;
  asyncRequest?: (inputValue: string) => Promise<Response>;
  asyncRequestHelper?: (data: Response) => Item[];
  autoFetch?: boolean;
}

const Autocomplete = <Item, Response = Item[]>({
  height = "45px",
  label,
  options: initialOptions = [],
  getOptionLabel,
  getOptionSubLabel = () => "",
  asyncRequestHelper = (data) => data as Item[],
  asyncRequest,
  autoFetch = true,
}: IAutoCompleteProps<Item, Response>): JSX.Element => {
  const [options, setOptions] = useState<Item[]>(initialOptions);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);
  const [isSelected, setIsSelected] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const debouncedInputValue = useDebounce(inputValue, 500);

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
    if (debouncedInputValue && !isSelected) {
      fetchData();
    }

    if (isOpen && !autoFetch && !debouncedInputValue) {
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

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    setIsSelected(false);
  };

  const handleSelectOption = (selectedOption: Item) => {
    console.log("select option", selectedOption);
    setInputValue(getOptionLabel(selectedOption));
    setIsOpen(false);
    setIsSelected(true);
  };

  return (
    <div>
      {label && <label className="text-md mb-2">{label}</label>}
      <div
        className="relative group"
        ref={containerRef}
        onClick={handleOpenDropdown}
        onFocus={handleFocus}
      >
        <Input
          height={height}
          isOpen={isOpen}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          handleToggleDropdown={handleToggleDropdown}
          inputValue={inputValue}
          isFocus={isFocus}
          className={clsx("group-hover:border-blue-300", {
            "!border-blue-300": isOpen,
          })}
          iconClassName={clsx(
            "group-hover:text-blue-300 group-hover:border-blue-300",
            {
              "!text-blue-300": isOpen,
              "!border-blue-300": isOpen,
            }
          )}
        />
        <OptionList
          options={options}
          getOptionSubLabel={getOptionSubLabel}
          getOptionLabel={getOptionLabel}
          isOpen={isOpen}
          handleSelectOption={handleSelectOption}
        />
      </div>
    </div>
  );
};

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
