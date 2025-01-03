"use client";

import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";
import OptionList from "./OptionList";

export interface IAutoCompleteProps<Item, Response = Item[]> {
  width?: string;
  height?: string;
  label?: string;
  options?: Item[];
  getOptionLabel: (option: Item) => string;
  getOptionSubLabel?: (option: Item) => string;
  asyncRequest?: (inputValue: string) => Promise<Response>;
  asyncRequestHelper?: (data: Response) => Item[];
}

const Autocomplete = <Item, Response = Item[]>({
  height = "45px",
  label,
  options: initialOptions = [],
  getOptionLabel,
  getOptionSubLabel = () => "",
  asyncRequestHelper = (data) => data as Item[],
  asyncRequest,
}: IAutoCompleteProps<Item, Response>): JSX.Element => {
  const [options, setOptions] = useState<Item[]>(initialOptions);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFocus, setIsFocus] = useState<boolean>(false);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    if (asyncRequest) fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inputValue]);

  const fetchData = async () => {
    if (!asyncRequest) return;

    try {
      setIsLoading(true);
      const result = await asyncRequest(inputValue);
      const transformedData = asyncRequestHelper(result);
      setOptions(transformedData);
    } catch (error) {
      console.error("Error fetching data:", error);
      setOptions([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleDropdown = () => {
    setIsOpen((prev) => !prev);
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (asyncRequest) fetchData();
  };

  return (
    <div>
      {label && <label className="text-md mb-2">{label}</label>}
      <div
        className="relative group"
        ref={containerRef}
        onClick={handleToggleDropdown}
        onFocus={handleFocus}
      >
        <Input
          height={height}
          isOpen={isOpen}
          isLoading={isLoading}
          handleInputChange={handleInputChange}
          inputValue={inputValue}
          isFocus={isFocus}
          className="group-hover:border-blue-300"
          iconClassName="group-hover:text-blue-300 group-hover:border-blue-300"
        />
        <OptionList
          options={options.map((option) => {
            const subLabel = getOptionSubLabel(option);
            return subLabel
              ? `${getOptionLabel(option)} - ${subLabel}`
              : getOptionLabel(option);
          })}
          isOpen={isOpen}
        />
      </div>
    </div>
  );
};

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
