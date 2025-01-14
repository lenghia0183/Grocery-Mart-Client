import React, { FC } from 'react';
import clsx from 'clsx';

interface LoadingProps {
    width?: string;
    height?: string;
    size?: number;
    thickness?: string;
    color?: string;
    speed?: string;
    className?: string;
}

const Loading: FC<LoadingProps> = ({
    width = '40px',
    height = '40px',
    size,
    thickness = '4px',
    color = 'text-blue-500',
    speed = '.75s',
    className = '',
}) => {
    const sizeStyle = size ? { width: `${size}em`, height: `${size}em` } : { width: width, height: height };

    return (
        <div className={`flex items-center justify-center ${className}`} style={{ ...sizeStyle }}>
            <div
                className={clsx('rounded-full', color)}
                style={{
                    width,
                    height,
                    background: `
            radial-gradient(farthest-side, currentColor 94%, transparent) top/${thickness} ${thickness} no-repeat,
            conic-gradient(transparent 30%, currentColor)`,
                    mask: `
            radial-gradient(farthest-side, transparent calc(100% - ${thickness}), #000 0)`,
                    WebkitMask: `
            radial-gradient(farthest-side, transparent calc(100% - ${thickness}), #000 0)`,
                    animation: `spin ${speed} infinite linear`,
                }}
            />
            <style>
                {`
          @keyframes spin {
            0% {
              transform: rotate(0);
            }
            100% {
              transform: rotate(1turn);
            }
          }
        `}
            </style>
        </div>
    );
};

Loading.displayName = 'Loading';
export default Loading;
