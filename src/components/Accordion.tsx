import { useState, useRef, useEffect } from 'react';
import clsx from 'clsx';
import Icon from './Icon';
import Button from './Button';
import { useTranslations } from 'next-intl';

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

  const newMinHeightStyleValue = parseFloat(minHeight);

  const tCommon = useTranslations('common');

  useEffect(() => {
    if (contentRef.current) {
      setContentHeight(contentRef.current.scrollHeight);
    }
  }, [isOpen, children]);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  const showToggleButton = contentHeight > newMinHeightStyleValue;

  return (
    <div className={clsx('w-full', className)}>
      <div
        ref={contentRef}
        className="transition-max-height duration-300 ease-in-out overflow-hidden"
        style={{
          maxHeight: isOpen ? maxHeight || `${contentHeight}px` : minHeight,
        }}
      >
        {children}
      </div>

      {showToggleButton && (
        <Button
          onClick={toggleAccordion}
          variant="text"
          bgHoverColor="transparent"
          borderHoverColor="transparent"
          textColor="blue-500 dark:blue-400"
          className={clsx('mx-auto transition-all', buttonClassName)}
          startIcon={
            <Icon
              name="arrowDown"
              color="inherit"
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
          {isOpen ? tCommon('hidden') : tCommon('showMore')}
        </Button>
      )}
    </div>
  );
};

export default Accordion;
