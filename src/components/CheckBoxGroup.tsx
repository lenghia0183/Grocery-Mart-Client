import React, { ReactNode, ReactElement, useEffect } from 'react';
import clsx from 'clsx';
import CheckBox, { CheckBoxProps } from './CheckBox';
import { useField, useFormikContext } from 'formik';

interface CheckBoxGroupProps {
    name: string;
    children: ReactNode;
    vertical?: boolean;
    className?: string;
    disabled?: boolean;
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({
    name,
    children,
    vertical = true,
    className = '',
    disabled = false,
}) => {
    const [field, meta, helpers] = useField(name);
    const { setFieldValue } = useFormikContext();

    useEffect(() => {
        const value = field.value;

        if (Array.isArray(value)) {
            value.forEach((item) => {
                const key = Object.keys(item)[0];
                setFieldValue(key, item[key]);
            });
        } else {
            helpers.setValue([]);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const error = meta.error ? meta.error : '';

    const renderChildren = (children: ReactNode): ReactNode => {
        return React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
                if (child.type === CheckBox) {
                    return React.cloneElement(child as ReactElement<CheckBoxProps>, {
                        onChange: handleChange,
                        disabled,
                    });
                } else {
                    return React.cloneElement(child as ReactElement<{ children?: ReactNode }>, {
                        children: renderChildren(child.props.children),
                    });
                }
            }
            return child;
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { checked, name } = e.target;
        const currentValue = field.value || [];

        const newValues = currentValue.map((item: { [key: string]: boolean }) =>
            item[name] !== undefined ? { ...item, [name]: checked } : item,
        );

        if (!currentValue.some((item: { [key: string]: boolean }) => item[name] !== undefined)) {
            newValues.push({ [name]: checked });
        }

        helpers.setValue(newValues);
    };

    return (
        <div>
            <div
                className={clsx(className, {
                    'flex flex-col space-y-2': vertical,
                    'flex space-x-4': !vertical,
                })}
            >
                {renderChildren(children)}
            </div>
            {error && <span className="text-red-400 text-xs">{error}</span>}
        </div>
    );
};

CheckBoxGroup.displayName = 'CheckBoxGroup';

export default CheckBoxGroup;
