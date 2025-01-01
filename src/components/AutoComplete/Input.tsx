import React from "react";
import Icon from "../Icon";
import Loading from "../Loading";
import clsx from "clsx";

export interface IInputProps {
  height?: string;
  placeholder?: string;
  isLoading?: boolean;
  isOpen?: boolean;
  isFocus?: boolean;
  className?: string;
  iconClassName?: string;
}

const Input: React.FC<IInputProps> = ({
  height,
  placeholder,
  isLoading = false,
  isOpen,
  iconClassName,
  className,
}) => {
  return (
    <div className="flex">
      <input
        type="text"
        className={clsx(
          "w-full p-2 bg-transparent border rounded-md outline-none placeholder-gray-500 border-gray-500",
          className
        )}
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
        className={clsx(
          "flex items-center justify-center ml-1 rounded-md border border-gray-500 text-gray-500",
          iconClassName
        )}
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
