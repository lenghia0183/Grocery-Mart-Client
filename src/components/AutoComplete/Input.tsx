import React from "react";
import Icon from "../Icon";
import Loading from "../Loading";
import clsx from "clsx";

export interface IInputProps {
  height?: string;
  placeholder?: string;
  isLoading?: boolean;
  isOpen?: boolean;
}

const Input: React.FC<IInputProps> = ({
  height,
  placeholder,
  isLoading = false,
  isOpen = false,
}) => {
  return (
    <div className="flex">
      <input
        type="text"
        className="outline-none placeholder-gray-500 w-full bg-transparent border border-gray-500 rounded-md p-2"
        placeholder={placeholder}
        style={{
          height: height,
        }}
      />
      <div
        style={{
          width: height,
          height: height,
        }}
        className="border border-gray-500 flex items-center justify-center ml-1 rounded-md"
      >
        {isLoading ? (
          <Loading width="30px" height="30px" />
        ) : (
          <Icon
            name="arrowDown"
            className={clsx({
              "rotate-180": !isOpen,
              "rotate-0": isOpen,
            })}
          />
        )}
      </div>
    </div>
  );
};

Input.displayName = "input";

export default Input;
