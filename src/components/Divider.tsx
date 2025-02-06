import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { createTailwindClass } from '@/utils';

type DividerProps = {
  vertical?: boolean;
  color?: string;
  width?: string;
  height?: string;
  marginTop?: string;
  marginBottom?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Divider: React.FC<DividerProps> = ({
  vertical = false,
  color = 'gray-400',
  width = '100%',
  height = '1px',
  marginTop = '10px',
  marginBottom = '10px',
  borderStyle = 'solid',
  className,
  ...props
}) => {
  const borderThickness = vertical ? width : height;

  const borderColorClass = createTailwindClass('border', color);

  const style: CSSProperties = {
    borderWidth: borderThickness,
    borderStyle: borderStyle,
    marginTop,
    marginBottom,
  };

  return <div className={clsx(className, borderColorClass)} style={style} {...props} />;
};

export default Divider;
