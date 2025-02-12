import clsx from 'clsx';
import React from 'react';

export interface OptionListProps<Item> {
  options: Item[];
  isOpen?: boolean;
  handleSelectOption: (selectedOption: Item) => void;
  getOptionLabel: (selectedOption: Item) => string;
  getOptionSubLabel: (selectedOption: Item) => string;
  className?: string;
  inputValue?: string;
}

const OptionList = <Item,>({
  options,
  isOpen = true,
  handleSelectOption,
  getOptionLabel,
  getOptionSubLabel,
  className,
  inputValue,
}: OptionListProps<Item>) => {
  return (
    <ul
      style={{
        maxHeight: '200px',
      }}
      className={clsx(
        'bg-white dark:bg-dark-400 rounded-md border border-gray-500 absolute w-full top-[107%] overflow-y-scroll transition-all duration-300 scale-y-0 origin-top opacity-0 z-10',
        {
          'opacity-0': !isOpen,
          'scale-y-100 !opacity-100': isOpen,
        },
        className,
      )}
    >
      {options.length === 0 ? (
        <li className="p-2 text-center text-gray-500">Không có kết quả</li>
      ) : (
        options?.map((option, index) => (
          <li
            key={index}
            className={clsx('p-2 hover:bg-gray-200 dark:hover:bg-gray-400', {
              'bg-yellow-300 dark:bg-yellow-400 hover:!bg-yellow-300 dark:hover:!bg-yellow-400 text-dark': inputValue === getOptionLabel(option),
            })}
            onClick={() => handleSelectOption(option as Item)}
          >
            {getOptionLabel(option as Item)}
            {getOptionSubLabel(option as Item) && (
              <span className="text-sm text-gray-500"> - {getOptionSubLabel(option as Item)}</span>
            )}
          </li>
        ))
      )}
    </ul>
  );
};

OptionList.displayName = 'OptionList';

export default OptionList;