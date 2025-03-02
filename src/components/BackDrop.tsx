'use client';

import { useLoading } from '@/context/LoadingProvider';
import React, { useEffect } from 'react';
import Loading from './Loading';

interface BackdropProps {
  open?: boolean;
  onClick?: () => void;
  className?: string;
}

const Backdrop: React.FC<BackdropProps> = ({ open, onClick, className = '' }) => {
  const { isLoading } = useLoading();

  const isVisible = open ?? isLoading;

  useEffect(() => {
    if (isVisible) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center ${className}`}
      onClick={onClick}
      role="presentation"
    >
      <Loading thickness="6px" />
    </div>
  );
};

export default Backdrop;
