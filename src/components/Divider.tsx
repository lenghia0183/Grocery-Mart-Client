import React, { CSSProperties } from 'react';
import clsx from 'clsx';
import { createTailwindClass } from '@/utils';

type DividerProps = {
  vertical?: boolean;
  color?: string;
  thickness?: string;
  length?: string;
  marginTop?: string;
  marginBottom?: string;
  marginLeft?: string;
  marginRight?: string;
  borderStyle?: 'solid' | 'dashed' | 'dotted';
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>;

const Divider: React.FC<DividerProps> = ({
  vertical = false,
  color = 'gray-400',
  thickness = '1px',
  length = '100%',
  marginTop = '10px',
  marginBottom = '10px',
  marginLeft = '',
  marginRight = '',
  borderStyle = 'solid',
  className,
  ...props
}) => {
  const borderColorClass = createTailwindClass('border', color);

  const style: CSSProperties = vertical
    ? {
        width: thickness,
        height: length,
        borderLeftWidth: thickness,
        borderStyle,
        marginTop,
        marginBottom,
        marginLeft,
        marginRight,
      }
    : {
        width: length,
        height: thickness,
        borderTopWidth: thickness,
        borderStyle,
        marginTop,
        marginBottom,
      };

  return <div className={clsx(className, borderColorClass)} style={style} {...props} />;
};

export default Divider;
