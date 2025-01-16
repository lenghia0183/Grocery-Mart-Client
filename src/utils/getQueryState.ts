import { QueryState } from '@/hooks/useQueryState';

export const getQueryState = async (
  query: { [key: string]: string | string[] | undefined } | Promise<{ [key: string]: string | string[] | undefined }>,
  initialQuery: Partial<QueryState> = { order: 'asc', pageSize: 8 },
  prefix: string = '',
): Promise<QueryState> => {
  const resolvedQuery = query instanceof Promise ? await query : query;

  const initialQueryPrefix = Object.fromEntries(
    Object.entries(initialQuery).map(([key, value]) => [`${prefix}${key}`, value]),
  );

  const queryObj = { ...initialQueryPrefix, ...resolvedQuery };

  const jsonParse = <T>(str: string | null | undefined, fallback: T): T => {
    try {
      return str ? JSON.parse(str) : fallback;
    } catch {
      return fallback;
    }
  };

  const page = Number(queryObj[`${prefix}page`] ?? 1);
  const pageSize = Number(queryObj[`${prefix}limit`] ?? 8);
  const filters = jsonParse<Record<string, unknown>>(queryObj[`${prefix}filters`] as string, {});
  const quickFilters = jsonParse<Record<string, unknown>>(queryObj[`${prefix}quickFilters`] as string, {});
  const keyword = String(queryObj[`${prefix}keyword`] ?? '');
  const tab = String(queryObj[`${prefix}tab`] ?? initialQueryPrefix[`${prefix}tab`] ?? undefined);
  const order = String(queryObj[`${prefix}order`] ?? 'asc');
  const orderBy = String(queryObj[`${prefix}orderBy`] ?? '');

  return {
    page,
    pageSize,
    filters,
    quickFilters,
    keyword,
    tab,
    order,
    orderBy,
  };
};
