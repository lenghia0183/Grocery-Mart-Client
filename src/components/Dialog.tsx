import clsx from 'clsx';
import { Form, Formik, FormikConfig, FormikValues } from 'formik';
import React, { ReactNode } from 'react';
import Button, { ButtonProps } from './Button';
import IconButton, { IconButtonProps } from './IconButton';

interface DialogProps<MyFormValues extends FormikValues> {
    title?: string;
    maxWidth?: string;
    fullWidth?: boolean;
    isOpen: boolean;
    onCancel: () => void;
    cancelLabel?: string;
    cancelProps?: Omit<ButtonProps, 'children'>;
    onSubmit?: () => void;
    submitLabel?: string;
    submitProps?: Omit<ButtonProps, 'children'>;
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
    iconButtonProps?: Omit<IconButtonProps, 'name'>;
}

const Dialog = <MyFormValues extends FormikValues>({
    isOpen,
    onCancel,
    title = '',
    children,
    onSubmit,
    cancelLabel = '',
    submitLabel = '',
    cancelProps,
    submitProps,
    renderFooter,
    fullWidth = false,
    disableBackdropClick = false,
    noBorderTop = false,
    noBorderBottom = false,
    formikProps,
    iconButtonProps,
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
            <Formik {...formikProps}>{() => <Form className="flex flex-col overflow-y-auto">{children}</Form>}</Formik>
        ) : (
            <>{children}</>
        );

    const DialogInner = () => (
        <>
            <div
                className={clsx('p-6', contentClassName, {
                    'border-b-2 border-gray-200': !noBorderBottom,
                    'border-t-2 border-gray-200': !noBorderTop,
                })}
            >
                {children}
            </div>
            {(cancelLabel || submitLabel || typeof renderFooter === 'function') && (
                <div className={clsx('p-4 flex justify-end', footerClassName)}>
                    {renderFooter ? (
                        renderFooter()
                    ) : (
                        <div className="flex gap-2">
                            {cancelLabel && (
                                <Button onClick={onCancel} bgColor="gray-300" bgHoverColor="gray-50" {...cancelProps}>
                                    {cancelLabel}
                                </Button>
                            )}
                            {submitLabel && (
                                <Button
                                    type={formikProps ? 'submit' : 'button'}
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

    return (
        <div
            className={clsx(
                'fixed inset-0 flex items-center justify-center bg-black text-xl transition-all duration-300 ',
                {
                    'opacity-0 pointer-events-none': !isOpen,
                    'bg-opacity-50 opacity-100': isOpen,
                },
                backdropClassName,
            )}
            onClick={handleBackdropClick}
        >
            <div className="container flex items-center justify-center">
                <div
                    className={clsx({
                        'w-full': fullWidth,
                        'w-[90%] md:w-[70%] lg:w-[60%] xl:w-[50%]': !fullWidth,
                    })}
                >
                    <div
                        className={clsx(
                            'bg-white rounded-lg shadow-lg transition-all duration-300',
                            {
                                '-translate-y-1/2': !isOpen,
                                'translate-y-0': isOpen,
                            },
                            dialogClassName,
                        )}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className={clsx('p-4 flex items-center justify-between', titleContainerClassName)}>
                            <div className={clsx('font-semibold', titleClassName)}>{title}</div>
                            <IconButton
                                iconName="close"
                                iconColor="gray"
                                onClick={onCancel}
                                className="shadow-none"
                                iconHoverColor="blue"
                                {...iconButtonProps}
                            />
                        </div>
                        <DialogWrapper>
                            <DialogInner />
                        </DialogWrapper>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dialog;
