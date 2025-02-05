import React from 'react';
import clsx from 'clsx';

interface LabelValueProps {
  label: React.ReactNode;
  value?: React.ReactNode | string;
  labelWidth?: string;
  labelClassName?: string;
  valueClassName?: string;
  className?: string;
}

const LabelValue: React.FC<LabelValueProps> = ({
  label,
  value,
  labelWidth = 'auto',
  labelClassName = '',
  valueClassName = '',
  className = '',
}) => {
  return (
    <div className={clsx('flex items-start text-lg text-dark', className)}>
      <div className={clsx('font-semibold flex-shrink-0', labelClassName)} style={{ width: labelWidth }}>
        {label}
      </div>
      <div className={clsx('ml-2', valueClassName)}>{value}</div>
    </div>
  );
};

LabelValue.displayName = 'LabelValue';

export default LabelValue;
