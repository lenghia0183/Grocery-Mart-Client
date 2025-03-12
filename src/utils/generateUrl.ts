import { QueryState } from '@/hooks/useQueryState';

export const generateServerQueryUrl = <TFilters, TQuickFilters>(
  pathname: string,
  params: Partial<QueryState<TFilters, TQuickFilters>> = {},
  prefix: string = '',
): string => {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      const prefixedKey = `${prefix}${key}`;
      searchParams.set(prefixedKey, typeof value === 'object' ? JSON.stringify(value) : String(value));
    }
  });

  return `${pathname}?${searchParams.toString()}`;
};
