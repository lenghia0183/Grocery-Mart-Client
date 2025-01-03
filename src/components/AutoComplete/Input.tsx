import React, { useEffect, useRef } from "react";
import Icon from "../Icon";
import Loading from "../Loading";
import clsx from "clsx";

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
  error,
  disabled,
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
    <div className={clsx("flex", {})}>
      <input
        ref={inputRef}
        type="text"
        className={clsx(
          "w-full p-2 bg-transparent border rounded-md outline-none placeholder-gray-500 ",
          {
            "border-red-400": error,
            "border-gray-500": !error,
            "!bg-gray-50 border-gray-300 ": disabled,
          },
          className
        )}
        placeholder={placeholder}
        style={{
          height: height,
        }}
        onChange={handleInputChange}
        value={inputValue}
        onFocus={handleOpenDropDown}
      />
      <div
        style={{
          width: height,
          height: height,
        }}
        className={clsx(
          "flex items-center justify-center ml-1 rounded-md border",
          {
            "border-red-400 text-red-400": error,
            "border-gray-500 text-gray-500": !error,
            "!bg-gray-50 border-gray-300 text-gray-300": disabled,
          },
          iconClassName
        )}
        onClick={handleIconClick}
      >
        {isLoading ? (
          <Loading width="30px" height="30px" />
        ) : (
          <Icon
            name="arrowDown"
            className={clsx("text-inherit", {
              "rotate-0": isOpen,
              "rotate-180": !isOpen,
            })}
          />
        )}
      </div>
    </div>
  );
};

Input.displayName = "input";

export default Input;
