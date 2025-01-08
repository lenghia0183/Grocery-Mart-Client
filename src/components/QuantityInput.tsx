import React from "react";
import clsx from "clsx";
import { useField } from "formik";
import IconButton from "./IconButton";

type QuantityInputProps = {
  name: string; // Tên của trường trong Formik
  min?: number;
  max?: number;
  step?: number;
  className?: string;
  inputClassName?: string;
  buttonClassName?: string;
  disabled?: boolean;
  height?: string;
  width?: string;
};

const QuantityInput: React.FC<QuantityInputProps> = ({
  name,
  min = 1,
  max = 100,
  step = 1,
  className = "",
  inputClassName = "",
  buttonClassName = "",
  disabled = false,
  height = "40px",
  width = "100%",
}) => {
  const [field, meta, helpers] = useField(name);
  const { value = 1 } = field;
  const { setValue } = helpers;

  const handleDecrease = () => {
    if (typeof value === "number" && value > min) {
      setValue(Math.max(min, value - step));
    }
  };

  const handleIncrease = () => {
    if (typeof value === "number" && value < max) {
      setValue(Math.min(max, value + step));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (newValue === "") {
      setValue("");
      return;
    }

    const isNumeric = /^[0-9]*$/.test(newValue);

    if (isNumeric) {
      const parsedValue = parseInt(newValue, 10);

      const clampedValue = Math.max(min, Math.min(max, parsedValue));
      setValue(clampedValue);
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (value === "") {
      setValue(min);
    }
    field.onBlur(e);
  };

  return (
    <div
      className={clsx("flex items-center", className, "w-full")}
      style={{ width }}
    >
      <IconButton
        iconName="minus"
        iconColor="dark"
        className={clsx(
          //   "border-gray-300 border rounded-sm shrink-0",
          //   { "hover:border-emerald": !(value <= min) },
          buttonClassName
        )}
        iconWidth="50%"
        iconHeight="50%"
        type="button"
        height={height}
        width={height}
        iconStrokeWidth={30}
        onClick={handleDecrease}
        disabled={disabled || (typeof value === "number" && value <= min)}
      />

      <input
        type="text"
        {...field}
        value={value}
        onBlur={handleBlur}
        onChange={handleInputChange}
        className={clsx(
          "p-2 text-center border border-gray-300 outline-none focus:border-emerald text-dark font-medium",
          inputClassName,
          "flex-grow min-w-0"
        )}
        style={{ height }}
        disabled={disabled}
      />

      <IconButton
        iconName="plus"
        iconColor="dark"
        className={clsx(
          //   "border-gray-300 border rounded-sm shrink-0",
          //   { "hover:border-emerald": !(value >= max) },
          buttonClassName
        )}
        type="button"
        iconWidth="50%"
        iconHeight="50%"
        height={height}
        width={height}
        iconStrokeWidth={20}
        onClick={handleIncrease}
        disabled={disabled || (typeof value === "number" && value >= max)}
      />

      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
    </div>
  );
};

export default QuantityInput;
