import clsx from "clsx";
import { Form, Formik, FormikConfig, FormikValues } from "formik";
import React, { ReactNode } from "react";
import Button from "./Button";
import IconButton from "./IconButton";

interface DialogProps<MyFormValues extends FormikValues> {
  title?: string;
  maxWidth?: string;
  fullWidth?: boolean;
  isOpen: boolean;
  onCancel: () => void;
  cancelLabel?: string;
  cancelProps?: Record<string, unknown>;
  onSubmit?: () => void;
  submitLabel?: string;
  submitProps?: Record<string, unknown>;
  disableBackdropClick?: boolean;
  children?: ReactNode;
  renderFooter?: () => ReactNode;
  noBorderBottom?: boolean;
  noBorderTop?: boolean;
  formikProps?: FormikConfig<MyFormValues>;
  titleClassName?: string;
  dialogClassName?: string;
  titleContainerClassName?: string;
  contentClassName?: string;
  footerClassName?: string;
  backdropClassName?: string;
  iconButtonProps?: Record<string, unknown>;
}

const Dialog = <MyFormValues extends FormikValues>({
  isOpen,
  onCancel,
  title = "",
  children,
  onSubmit,
  cancelLabel = "",
  submitLabel = "",
  cancelProps = { bgColor: "gray-400" },
  submitProps = { bgColor: "crimson" },
  renderFooter,
  maxWidth = "max-w-md",
  fullWidth = true,
  disableBackdropClick = false,
  noBorderTop = false,
  noBorderBottom = false,
  formikProps,
  iconButtonProps = {},
  titleClassName,
  dialogClassName,
  titleContainerClassName,
  contentClassName,
  footerClassName,
  backdropClassName,
}: DialogProps<MyFormValues>) => {
  const handleBackdropClick = () => {
    if (!disableBackdropClick) {
      onCancel();
    }
  };

  const DialogWrapper = ({ children }: { children: ReactNode }) =>
    formikProps ? (
      <Formik {...formikProps}>
        {() => (
          <Form className="flex flex-col overflow-y-auto">{children}</Form>
        )}
      </Formik>
    ) : (
      <>{children}</>
    );

  const DialogInner = () => (
    <>
      <div
        className={clsx("p-6", contentClassName, {
          "border-b-2 border-gray-200": !noBorderBottom,
          "border-t-2 border-gray-200": !noBorderTop,
        })}
      >
        {children}
      </div>
      {(cancelLabel || submitLabel || typeof renderFooter === "function") && (
        <div className={clsx("p-4 flex justify-end", footerClassName)}>
          {renderFooter ? (
            renderFooter()
          ) : (
            <div className="flex gap-2">
              {cancelLabel && (
                <Button onClick={onCancel} {...cancelProps}>
                  {cancelLabel}
                </Button>
              )}
              {submitLabel && (
                <Button
                  type={formikProps ? "submit" : "button"}
                  onClick={formikProps ? undefined : onSubmit}
                  {...submitProps}
                >
                  {submitLabel}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </>
  );

  if (!isOpen) return null;

  return (
    <div
      className={clsx(
        "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 text-xl",
        backdropClassName
      )}
      onClick={handleBackdropClick}
    >
      <div
        className={clsx(
          "bg-white rounded-lg shadow-lg w-full",
          dialogClassName,
          maxWidth,
          { "max-w-full": fullWidth },
          "max-w-md sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className={clsx(
            "p-4 flex items-center justify-between",
            titleContainerClassName
          )}
        >
          <div className={clsx("font-semibold", titleClassName)}>{title}</div>
          <IconButton
            iconName="close"
            onClick={onCancel}
            {...iconButtonProps}
          />
        </div>
        <DialogWrapper>
          <DialogInner />
        </DialogWrapper>
      </div>
    </div>
  );
};

export default Dialog;
