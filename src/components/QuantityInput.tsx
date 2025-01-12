"use client";

import React, { useEffect } from "react";
import clsx from "clsx";
import { useField } from "formik";
import IconButton from "./IconButton";

type QuantityInputProps = {
  name: string;
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
  disabled = true,
  height = "40px",
  width = "120px",
}) => {
  const [field, meta, helpers] = useField(name);
  const { value } = field;
  const { setValue } = helpers;

  useEffect(() => {
    if (value == undefined) {
      setValue(min);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      className={clsx(
        "flex items-center justify-center border border-gray-300 rounded-[10px]",
        { "pointer-events-none border-gray-300": disabled },
        className
      )}
      style={{ width }}
    >
      <IconButton
        iconName="minus"
        iconColor="dark"
        className={clsx(
          {
            "text-gray-300":
              (typeof value === "number" && value <= min) || disabled,
          },

          "shadow-none",
          buttonClassName
        )}
        type="button"
        iconHeight={"24px"}
        iconWidth={"24px"}
        iconStrokeWidth={1}
        onClick={handleDecrease}
      />

      <input
        type="text"
        {...field}
        value={value ?? min}
        onBlur={handleBlur}
        onChange={handleInputChange}
        className={clsx(
          "max-w-9 text-center outline-none",
          {
            "text-gray-300": disabled,
          },
          inputClassName
        )}
        style={{ height }}
        disabled={disabled}
      />

      <IconButton
        iconName="plus"
        iconColor="dark"
        className={clsx(
          {
            "text-gray-300":
              (typeof value === "number" && value >= max) || disabled,
          },
          "shadow-none",
          buttonClassName
        )}
        type="button"
        iconHeight={"24px"}
        iconWidth={"24px"}
        iconStrokeWidth={1}
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
