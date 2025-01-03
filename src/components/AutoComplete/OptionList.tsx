import clsx from "clsx";
import React from "react";

export interface OptionListProps {
  options: string[];
  isOpen?: boolean;
}

const OptionList: React.FC<OptionListProps> = ({ options, isOpen = true }) => {
  return (
    <ul
      style={{
        maxHeight: "200px",
      }}
      className={clsx(
        "bg-blue-300 rounded-md border border-gray-500 absolute w-full top-[107%] overflow-y-scroll transition-all duration-300 scale-y-0 origin-top opacity-0",
        {
          "opacity-0": !isOpen,
          "scale-y-100 !opacity-100": isOpen,
        }
      )}
    >
      {options.map((option, index) => (
        <li key={index} className="p-2 hover:bg-blue-400">
          {option}
        </li>
      ))}
    </ul>
  );
};

OptionList.displayName = "OptionList";

export default OptionList;
