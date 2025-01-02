"use client";

import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";
import OptionList from "./OptionList";

export interface IAutoCompleteProps<T> {
  width?: string;
  height?: string;
  label?: string;
  options: T[];
  getOptionLabel: (option: T) => string;
  getOptionSubLabel?: (option: T) => string;
}

const Autocomplete = <T,>({
  height = "45px",
  label,
  options: initialOptions,
  getOptionLabel,
  getOptionSubLabel = () => "",
}: IAutoCompleteProps<T>): JSX.Element => {
  const [options] = useState<T[]>(initialOptions);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  const handleToggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  return (
    <div>
      <label className="text-md mb-2">{label}</label>
      <div
        className="relative group"
        ref={containerRef}
        onClick={handleToggleDropdown}
        onFocus={handleFocus}
      >
        <Input
          height={height}
          isOpen={isOpen}
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
