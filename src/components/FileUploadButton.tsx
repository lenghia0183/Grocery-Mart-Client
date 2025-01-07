import React from "react";
import { useField, useFormikContext } from "formik";

type FileUploadButtonProps = {
  name: string;
  accept?: string;
  maxNumberOfFiles?: number;
  fileSizeLimit?: number;
  disabled?: boolean;
  readOnly?: boolean;
};

const FileUploadButton: React.FC<FileUploadButtonProps> = ({
  name,
  accept = "application/pdf, image/jpeg, image/png",
  maxNumberOfFiles = 1,

  disabled = false,
  readOnly = false,
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const value = field.value;

  const multiple = maxNumberOfFiles > 1;

  const onFilesPicked = (event: React.ChangeEvent<HTMLInputElement>) => {
    const pickedFiles = Array.from(event.target.files || []);

    const newFiles = (value ? [...value] : [])
      .concat(pickedFiles)
      .slice(0, maxNumberOfFiles);
    setFieldValue(name, multiple ? newFiles : pickedFiles[0] || null);
  };

  const handleDelete = (index: number) => {
    if (multiple) {
      const newFiles = Array.isArray(value) ? [...value] : [];
      newFiles.splice(index, 1);
      setFieldValue(name, newFiles);
    } else {
      setFieldValue(name, null);
    }
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
              disabled ||
              (multiple &&
                Array.isArray(value) &&
                value.length >= maxNumberOfFiles)
            }
          />
        </label>
      )}
      <div className="flex flex-wrap gap-2">
        {Array.isArray(value) &&
          value.map((file, index) => (
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
      {meta.touched && meta.error && (
        <div className="text-red-500 text-sm">{meta.error}</div>
      )}
    </div>
  );
};

export default FileUploadButton;
