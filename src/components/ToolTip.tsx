import { ComponentProps, ReactNode, useId, isValidElement, cloneElement } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface ToolTipProps extends Omit<ComponentProps<typeof ReactTooltip>, 'id' | 'children'> {
  children?: ReactNode;
}

const ToolTip = ({ children, render, ...props }: ToolTipProps) => {
  const tooltipId = useId();

  const renderChildren = isValidElement(children)
    ? cloneElement(children as React.ReactElement, { 'data-tooltip-id': tooltipId })
    : children;

  return (
    <>
      <>{renderChildren}</>
      <ReactTooltip id={tooltipId} render={render} {...props} />
    </>
  );
};

export default ToolTip;
