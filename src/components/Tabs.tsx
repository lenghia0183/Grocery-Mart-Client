import React, { useState, useEffect, ReactNode } from "react";
import clsx from "clsx";

interface TabItem {
  label: string;
  value?: string;
  required?: boolean;
}

interface TabsProps {
  list: TabItem[];
  children: ReactNode | ReactNode[];
  onChange?: (value?: string) => void;
  value?: number | string;
  divider?: boolean;
  className?: string;
  tabClassName?: string;
}

const Tabs: React.FC<TabsProps> = ({
  list,
  children,
  onChange = () => {},
  value: externalValue,
  divider = true,
  className,
  tabClassName,
}) => {
  const [value, setValue] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState<React.CSSProperties>({});

  useEffect(() => {
    if (externalValue !== undefined) {
      const index = list.findIndex((item) => item.value === externalValue);
      setValue(index >= 0 ? index : 0);
    }
  }, [externalValue, list]);

  useEffect(() => {
    const tab = document.querySelector(`.tab-${value}`) as HTMLElement;
    if (tab) {
      const { offsetLeft, offsetWidth } = tab;
      setUnderlineStyle({
        left: offsetLeft,
        width: offsetWidth,
      });
    }
  }, [value]);

  const handleChange = (newValue: number) => {
    setValue(newValue);
    onChange(list[newValue]?.value);
  };

  const renderContent = () => {
    return Array.isArray(children) ? children[value] : children;
  };

  return (
    <div className={clsx("overflow-hidden", className)}>
      <div
        className={clsx(`flex  mb-4 relative text-xl overflow-auto`, {
          "border-b": divider,
        })}
      >
        {list.map((item, index) => (
          <button
            key={index}
            onClick={() => handleChange(index)}
            className={`${tabClassName} tab-${index} py-2 px-4 text-nowrap ${
              value === index ? "font-semibold text-blue" : "text-gray-500"
            } transition-all`}
            type="button"
          >
            {item.label}
            {item.required && <span className="text-red-500 ml-1">*</span>}
          </button>
        ))}
        <span
          className="absolute bottom-0 h-[2px] bg-blue transition-all duration-500"
          style={underlineStyle}
        />
      </div>
      <div>{renderContent()}</div>
    </div>
  );
};

export default Tabs;
