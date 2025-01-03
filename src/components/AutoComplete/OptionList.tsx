import clsx from "clsx";
import React from "react";

export interface OptionListProps<Item> {
  options: Item[];
  isOpen?: boolean;
  handleSelectOption: (selectedOption: Item) => void;
  getOptionLabel: (selectedOption: Item) => string;
  getOptionSubLabel: (selectedOption: Item) => string;
}

const OptionList = <Item,>({
  options,
  isOpen = true,
  handleSelectOption,
  getOptionLabel,
  getOptionSubLabel,
}: OptionListProps<Item>) => {
  return (
    <ul
      style={{
        maxHeight: "200px",
      }}
      className={clsx(
        "bg-white-500 rounded-md border border-gray-500 absolute w-full top-[107%] overflow-y-scroll transition-all duration-300 scale-y-0 origin-top opacity-0",
        {
          "opacity-0": !isOpen,
          "scale-y-100 !opacity-100": isOpen,
        }
      )}
    >
      {options.map((option, index) => (
        <li
          key={index}
          className="p-2 hover:bg-gray-400"
          onClick={() => handleSelectOption(option as Item)}
        >
          {getOptionLabel(option as Item)}
          {getOptionSubLabel(option as Item) && (
            <span className="text-sm text-gray-500">
              {" "}
              - {getOptionSubLabel(option as Item)}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
};

OptionList.displayName = "OptionList";

export default OptionList;
