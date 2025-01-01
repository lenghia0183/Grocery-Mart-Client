"use client";

import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";
import OptionList from "./OptionList";

export interface IAutoCompleteProps {
  width?: string;
  height?: string;
  label?: string;
}

const Autocomplete: React.FC<IAutoCompleteProps> = ({
  height = "45px",
  label,
}) => {
  const [options, setOptions] = useState(["options", "option-1"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
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

  return (
    <div>
      <label className="text-md mb-2">{label}</label>
      <div
        className="relative"
        ref={containerRef}
        onClick={handleToggleDropdown}
      >
        <Input height={height} isOpen={isOpen} />
        <OptionList options={options} isOpen={isOpen} />
      </div>
    </div>
  );
};

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
