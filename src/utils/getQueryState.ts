import { QueryState } from '@/hooks/useQueryState';

export const getQueryState = async <TFilters = Record<string, unknown>, TQuickFilters = Record<string, unknown>>(
  query: Record<string, string | string[] | undefined> | Promise<Record<string, string | string[] | undefined>>,
  initialQuery: Partial<QueryState<TFilters, TQuickFilters>> = { order: 'asc', pageSize: 8 },
  prefix: string = '',
): Promise<QueryState<TFilters, TQuickFilters>> => {
  const resolvedQuery = query instanceof Promise ? await query : query;

  const initialQueryPrefix = Object.fromEntries(
    Object.entries(initialQuery).map(([key, value]) => [`${prefix}${key}`, value]),
  );

  const jsonParse = <T>(str: string | null | undefined, fallback: T): T => {
    try {
      return str ? JSON.parse(str) : fallback;
    } catch {
      return fallback;
    }
  };

  const queryObj = {
    ...initialQueryPrefix,
    ...resolvedQuery,
  };

  const filters = jsonParse<TFilters>(queryObj[`${prefix}filters`] as string, {} as TFilters);
  const quickFilters = jsonParse<TQuickFilters>(queryObj[`${prefix}quickFilters`] as string, {} as TQuickFilters);

  return {
    page: parseInt(queryObj[`${prefix}page`] as string) || 1,
    pageSize: parseInt(queryObj[`${prefix}limit`] as string) || 8,
    filters,
    quickFilters,
    keyword: String(queryObj[`${prefix}keyword`] ?? ''),
    tab: String(queryObj[`${prefix}tab`] ?? initialQueryPrefix[`${prefix}tab`] ?? ''),
    order: String(queryObj[`${prefix}order`] ?? 'asc'),
    orderBy: String(queryObj[`${prefix}orderBy`] ?? ''),
  };
};
