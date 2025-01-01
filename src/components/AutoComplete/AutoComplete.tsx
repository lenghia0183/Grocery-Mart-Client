"use client";

import React, { useState, useRef, useEffect } from "react";
import Input from "./Input";
import OptionList from "./OptionList";

export interface IAutoCompleteProps {
  width?: string;
  height?: string;
}

const Autocomplete: React.FC<IAutoCompleteProps> = ({ height = "45px" }) => {
  const [options, setOptions] = useState(["options", "option-1"]);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null); // Tham chiếu đến container

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
    <div className="relative" ref={containerRef} onClick={handleToggleDropdown}>
      <Input height={height} isOpen={isOpen} />
      <OptionList options={options} isOpen={isOpen} />
    </div>
  );
};

Autocomplete.displayName = "Autocomplete";

export default Autocomplete;
