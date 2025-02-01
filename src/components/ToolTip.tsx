import { ComponentProps, ReactNode, useId } from 'react';
import { Tooltip as ReactTooltip } from 'react-tooltip';

interface ToolTipProps extends Omit<ComponentProps<typeof ReactTooltip>, 'id' | 'children'> {
  children: ReactNode;
}

const ToolTip = ({ content, children, ...props }: ToolTipProps) => {
  const tooltipId = useId();

  return (
    <div className="inline-block">
      <span data-tooltip-id={tooltipId}>{children}</span>

      <ReactTooltip id={tooltipId} {...props}>
        {content}
      </ReactTooltip>
    </div>
  );
};

export default ToolTip;
