'use client';

import { Middleware, SWRHook, SWRConfiguration } from 'swr';
import { useEffect } from 'react';
import { useLoading } from '@/context/LoadingProvider';

interface CustomSWRConfig extends SWRConfiguration {
  showLoading?: boolean;
}

const swrMiddleware: Middleware = (useSWRNext: SWRHook) => (key, fetcher, config: CustomSWRConfig) => {
  const { setLoading } = useLoading();
  const { showLoading = true, ...restConfig } = config || {};

  const swr = useSWRNext(key, fetcher, restConfig);

  useEffect(() => {
    if (showLoading) {
      setLoading(true);
    }

    if (showLoading && !swr.isValidating && !swr.isLoading) {
      setLoading(false);
    }
    return () => {
      if (showLoading && !swr.isValidating && !swr.isLoading) {
        setLoading(false);
      }
    };
  }, [showLoading, swr.isValidating, setLoading, swr.isLoading]);

  return swr;
};

export default swrMiddleware;
