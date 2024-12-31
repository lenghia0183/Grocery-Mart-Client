import React, { useId } from "react";
import { useField } from "formik";
import clsx from "clsx";

export interface CheckBoxProps {
  name: string;
  label: string;
  size?: number;
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  disabled?: boolean; // Added disabled prop
}

const CheckBox: React.FC<CheckBoxProps> = ({
  name,
  label,
  onChange,
  checked,
  size = 20,
  disabled = false, // Default to false if not passed
}) => {
  const [field, meta, helpers] = useField({ name, type: "checkbox" });
  const id = useId();
  const error = meta.error && meta.touched ? meta.error : "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return; // Prevent changes if disabled

    const isChecked = e.target.checked;
    helpers.setValue(isChecked);
    if (onChange) {
      onChange(isChecked);
    }
  };

  return (
    <>
      <label
        htmlFor={id}
        className={clsx("ml-2 flex items-center gap-2", {
          "cursor-not-allowed opacity-30": disabled,
        })}
      >
        <input
          type="checkbox"
          id={id}
          {...field}
          checked={checked ?? field.checked}
          onChange={handleChange}
          disabled={disabled}
          className="hidden"
        />
        <div
          className={clsx(
            "border-2 flex items-center justify-center relative",
            {
              "border-gray-500 bg-gray-300": disabled,
              "border-dark": !disabled,
            }
          )}
          style={{ width: `${size}px`, height: `${size}px` }}
        >
          <div
            className={clsx("absolute bg-dark transition-all", {
              "scale-0 left-0 bottom-0": !(checked ?? field.checked),
              "scale-100": checked ?? field.checked,
            })}
            style={{
              width: `80%`,
              height: `80%`,
              clipPath:
                "polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%)",
            }}
          ></div>
        </div>

        {label}
      </label>
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </>
  );
};

export default CheckBox;