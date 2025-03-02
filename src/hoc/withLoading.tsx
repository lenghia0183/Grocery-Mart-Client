import { ReactNode, useEffect } from 'react';
import { useLoading } from '@/context/LoadingProvider';

interface WithLoadingProps {
  isLoading: boolean;
  children: ReactNode;
}

export function WithLoading({ isLoading, children }: WithLoadingProps) {
  const { setLoading } = useLoading();

  useEffect(() => {
    setLoading(isLoading);
  }, [isLoading, setLoading]);

  return <>{children}</>;
}
