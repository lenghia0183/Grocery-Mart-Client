'use client';

import React, { useState, useRef, useEffect, FC } from 'react';
import clsx from 'clsx';

import { useSearchParams } from 'next/navigation';
import Icon from './Icon';

type PaginationProps = {
  pageCount: number;
  pageRangeDisplayed?: number;
  marginPagesDisplayed?: number;
  previousLabel?: string;
  nextLabel?: string;
  breakLabel?: string;
  className?: string;
  buttonWidth?: string;
  buttonHeight?: string;
  buttonClassName?: string;
  labelClassName?: string;
  width?: string;
  previousComponent?: FC;
  nextComponent?: FC;
  firstLabel?: string;
  lastLabel?: string;
  firstComponent?: FC;
  lastComponent?: FC;
};

const Pagination: FC<PaginationProps> = ({
  pageCount,
  pageRangeDisplayed = 2,
  marginPagesDisplayed = 1,
  previousLabel = 'Previous',
  nextLabel = 'Next',
  breakLabel = '...',
  className,
  buttonWidth = '2.5rem',
  buttonHeight = '2.5rem',
  buttonClassName,
  labelClassName,
  width,
  previousComponent: PreviousComponent = () => <Icon name="previousPage" color="inherit" size={1} strokeWidth={40} />,
  nextComponent: NextComponent = () => <Icon name="nextPage" color="inherit" size={1} strokeWidth={40} />,
  firstLabel = 'First',
  lastLabel = 'Last',
  firstComponent: FirstComponent = () => <Icon name="firstPage" color="inherit" size={1} strokeWidth={40} />,
  lastComponent: LastComponent = () => <Icon name="lastPage" color="inherit" size={1} strokeWidth={40} />,
}) => {
  const [ulWidth, setUlWidth] = useState<string>('auto');
  const ulRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLLIElement>(null);
  const searchParams = useSearchParams();

  const currentForcePage = Number(searchParams.get('page')) || 1;

  useEffect(() => {
    if (ulRef.current && buttonRef.current) {
      const calculateWidth = () => {
        const buttonCount = ulRef.current?.children.length || 0;
        const buttonWidthPx = parseFloat(getComputedStyle(buttonRef.current!).width);
        const buttonGapPx = parseFloat(getComputedStyle(ulRef.current!).gap);
        const width = buttonCount * buttonWidthPx + (buttonCount - 1) * buttonGapPx;
        setUlWidth(`${width}px`);
      };
      calculateWidth();
      window.addEventListener('resize', calculateWidth);
      return () => window.removeEventListener('resize', calculateWidth);
    }
  }, [pageCount, currentForcePage, buttonWidth, buttonHeight]);

  const handlePageClick = (selectedPage: number) => {
    if (selectedPage !== currentForcePage) {
      const params = new URLSearchParams(window.location.search);
      params.set('page', selectedPage.toString());
      window.history.pushState({}, '', `${window.location.pathname}?${params}`);
    }
  };

  const handlePreviousClick = () => {
    if (currentForcePage > 1) {
      handlePageClick(currentForcePage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentForcePage < pageCount) {
      handlePageClick(currentForcePage + 1);
    }
  };

  const handleFirstClick = () => {
    if (currentForcePage !== 1) {
      handlePageClick(1);
    }
  };

  const handleLastClick = () => {
    if (currentForcePage !== pageCount) {
      handlePageClick(pageCount);
    }
  };

  const renderPages = () => {
    const pages: JSX.Element[] = [];
    const activePage = currentForcePage;

    for (let i = 1; i <= pageCount; i++) {
      const isActive = i === activePage;
      const inRange =
        i >= Math.max(1, activePage - pageRangeDisplayed) && i <= Math.min(pageCount, activePage + pageRangeDisplayed);
      const isMargin = i <= marginPagesDisplayed || i > pageCount - marginPagesDisplayed;

      if (inRange || isMargin) {
        pages.push(
          <li
            key={i}
            style={{ width: buttonWidth, height: buttonHeight }}
            ref={i === activePage ? buttonRef : null}
            className={clsx(
              'flex items-center justify-center flex-shrink-0 rounded-full text-gray-500 font-semibold border cursor-pointer border-gray-500 hover:text-blue hover:border-blue transition duration-300',
              buttonClassName,
              { 'bg-blue text-white hover:text-white !border-blue': isActive },
            )}
            onClick={() => handlePageClick(i)}
          >
            <span className={labelClassName}>{i}</span>
          </li>,
        );
      } else if (
        i === Math.max(1, activePage - pageRangeDisplayed) - 1 ||
        i === Math.min(pageCount, activePage + pageRangeDisplayed) + 1
      ) {
        pages.push(
          <li
            key={`break-${i}`}
            style={{ width: buttonWidth, height: buttonHeight }}
            className={clsx(
              'flex items-center justify-center text-gray-500 font-semibold rounded-full ',
              buttonClassName,
            )}
          >
            <span className={labelClassName}>{breakLabel}</span>
          </li>,
        );
      }
    }

    return pages;
  };

  return (
    <ul
      ref={ulRef}
      style={{ width: width || ulWidth }}
      className={clsx('flex flex-wrap gap-2 items-center transition-all duration-300 w-full m-auto', className)}
    >
      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          'flex items-center justify-center cursor-pointer flex-shrink-0 rounded-full border border-gray-500 text-gray-500 transition duration-300',
          buttonClassName,
          { 'opacity-40 pointer-events-none': currentForcePage === 1 },
          { 'hover:border-blue hover:text-blue': currentForcePage !== 1 },
        )}
        onClick={handleFirstClick}
      >
        {FirstComponent ? <FirstComponent /> : <span className={labelClassName}>{firstLabel}</span>}
      </li>

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          'flex items-center justify-center cursor-pointer flex-shrink-0 rounded-full border border-gray-500 text-gray-500 transition duration-300',
          buttonClassName,
          {
            'opacity-40 pointer-events-none': currentForcePage === 1,
          },
          { ' hover:border-blue hover:text-blue': currentForcePage !== 1 },
        )}
        onClick={handlePreviousClick}
      >
        {PreviousComponent ? <PreviousComponent /> : <span className={labelClassName}>{previousLabel}</span>}
      </li>

      {renderPages()}

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          'flex items-center justify-center cursor-pointer flex-shrink-0 rounded-full border border-gray-500 text-gray-500 transition duration-300',
          buttonClassName,
          { 'opacity-40 pointer-events-none': currentForcePage === pageCount },
          {
            ' hover:border-blue hover:text-blue': currentForcePage !== pageCount,
          },
        )}
        onClick={handleNextClick}
      >
        {NextComponent ? <NextComponent /> : <span className={labelClassName}>{nextLabel}</span>}
      </li>

      <li
        style={{ width: buttonWidth, height: buttonHeight }}
        className={clsx(
          'flex items-center justify-center cursor-pointer flex-shrink-0 rounded-full border border-gray-500 text-gray-500 transition duration-300',
          buttonClassName,
          { 'opacity-40 pointer-events-none': currentForcePage === pageCount },
          {
            ' hover:border-blue hover:text-blue': currentForcePage !== pageCount,
          },
        )}
        onClick={handleLastClick}
      >
        {LastComponent ? <LastComponent /> : <span className={labelClassName}>{lastLabel}</span>}
      </li>
    </ul>
  );
};

export default Pagination;
