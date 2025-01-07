import React from "react";
import { useField, useFormikContext } from "formik";

type FileUploadButtonProps = {
  name: string;
  accept?: string;
  maxNumberOfFiles?: number;
  fileSizeLimit?: number;
  disabled?: boolean;
  readOnly?: boolean;
  multiple?: boolean;
};

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  name,
  accept = "application/pdf, image/jpeg, image/png",
  maxNumberOfFiles = 1,
  disabled = false,
  readOnly = false,
  multiple = true,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const value = field.value;
  const error = meta.error && meta.touched ? meta.error : "";

  const filesLimit = multiple ? maxNumberOfFiles : 1;

  const normalizedValue = Array.isArray(value) ? value : value ? [value] : [];

  const onFilesPicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pickedFiles = Array.from(event.target.files || []);
    const newFiles = [...normalizedValue, ...pickedFiles].slice(0, filesLimit);
    setFieldValue(name, multiple ? newFiles : pickedFiles[0] || null);
  };

  const handleDelete = (index: number) => {
    const newFiles = [...normalizedValue];
    newFiles.splice(index, 1);
    setFieldValue(name, newFiles.length ? newFiles : null);
  };

  return (
    <div className="flex flex-col gap-2">
      {!readOnly && (
        <label className="inline-block cursor-pointer bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed">
          Upload Files
          <input
            type="file"
            className="hidden"
            multiple={multiple}
            accept={accept}
            onChange={onFilesPicked}
            disabled={
              disabled || (multiple && normalizedValue.length >= filesLimit)
            }
          />
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {normalizedValue.map((file: File, index: number) => (
          <div
            key={index}
            className="flex items-center justify-between bg-blue-100 text-blue-800 rounded px-2 py-1 w-full max-w-xs"
          >
            <span>{file.name}</span>
            {!readOnly && (
              <button
                type="button"
                onClick={() => handleDelete(index)}
                className="text-red-500 hover:text-red-700"
              >
                &times;
              </button>
            )}
          </div>
        ))}
      </div>
      {error && <span className="text-red-400 text-xs">{error}</span>}
    </div>
  );
};

export default FileUploadButton;
