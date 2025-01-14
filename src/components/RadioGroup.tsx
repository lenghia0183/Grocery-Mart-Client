import React, { ReactNode, ReactElement } from 'react';
import clsx from 'clsx';
import Radio, { RadioProps } from './Radio';
import { useField } from 'formik';

interface RadioGroupProps {
  name: string;
  children: ReactNode;
  vertical?: boolean;
  className?: string;
  disabled?: boolean;
}

const RadioGroup: React.FC<RadioGroupProps> = ({
  name,
  children,
  vertical = false,
  className = '',
  disabled = false,
}) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [field, meta] = useField(name);

  const error = meta.error ? meta.error : '';

  const renderChildren = (children: ReactNode): ReactNode => {
    return React.Children.map(children, (child) => {
      if (React.isValidElement(child)) {
        if (child.type === Radio) {
          return React.cloneElement(child as ReactElement<RadioProps>, {
            name: name,
            disabled: disabled,
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

export default RadioGroup;
