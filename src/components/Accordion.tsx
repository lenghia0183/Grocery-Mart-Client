import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Icon from './Icon';
import Button from './Button';

type AccordionProps = {
  children: React.ReactNode;
  minHeight?: string;
  maxHeight?: string;
  className?: string;
  buttonClassName?: string;
  iconClassName?: string;
};

const Accordion: React.FC<AccordionProps> = ({
  children,
  minHeight = '100px',
  maxHeight = '',
  className,
  buttonClassName,
  iconClassName,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [contentHeight, setContentHeight] = useState(0);
  const contentRef = useRef<HTMLDivElement | null>(null);

  const newMaxHeightStyle = maxHeight;
  const newMinHeightStyle = minHeight;
  const newMinHeightStyleValue = parseFloat(minHeight);

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  // Điều kiện để hiển thị nút Xem thêm / Thu gọn
  const showToggleButton = contentHeight > newMinHeightStyleValue;

  return (
    <div className={clsx('w-full', className)}>
      <div
        ref={contentRef}
        className="transition-max-height duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? newMaxHeightStyle || `${contentHeight}px` : newMinHeightStyle,
        }}
      >
        {children}
      </div>

      {/* Hiển thị nút Xem thêm / Thu gọn chỉ khi contentHeight lớn hơn minHeight */}
      {showToggleButton && (
        <Button
          onClick={toggleAccordion}
          variant="text"
          bgHoverColor="transparent"
          className={clsx('mx-auto', buttonClassName)}
          startIcon={
            <Icon
              name="arrowDown"
              size={1}
              className={clsx(
                'transition-transform ease-in-out duration-500',
                {
                  'rotate-180': isOpen,
                  'rotate-0': !isOpen,
                },
                iconClassName,
              )}
            />
          }
        >
          {isOpen ? 'Thu gọn' : 'Xem thêm'}
        </Button>
      )}
    </div>
  );
};

export default Accordion;
