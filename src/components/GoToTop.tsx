'use client';

import { useEffect, useState } from 'react';

import clsx from 'clsx';
import Icon from '@/components/Icon';

const GoToTop: React.FC = () => {
  const [scrollPercentage, setScrollPercentage] = useState<number>(0);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (scrollTop / scrollHeight) * 100;
    setScrollPercentage(Math.floor(scrolled));
  };

  const handleGoToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      onClick={handleGoToTop}
      className={clsx(
        'fixed cursor-pointer flex items-center justify-center transition-all duration-300',
        {
          'bottom-4 right-4': scrollPercentage > 0,
        },
        {
          'bottom-4 -right-4 translate-x-full': scrollPercentage === 0,
        },
      )}
    >
      <div className="relative flex items-center justify-center w-[50px] h-[50px] rounded-full">
        <div
          className="absolute inset-0 rounded-full"
          style={{
            background: `conic-gradient(#0a58ca ${scrollPercentage}%, #f7a825 ${scrollPercentage}%)`,
          }}
        />
        <div className="absolute inset-[2px] bg-white rounded-full flex items-center justify-center text-emerald text-lg">
          <Icon name="arrowDown" className="rotate-180" size={1.5} color="blue-500" />
        </div>
      </div>
    </div>
  );
};

export default GoToTop;
