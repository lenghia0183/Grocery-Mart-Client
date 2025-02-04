/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { useCallback, useMemo, useRef } from 'react';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';

interface UseQueryStateOptions {
  prefix?: string;
}

export interface QueryState {
  page: number;
  pageSize?: number;
  orderBy: string;
  order: string;
  filters: Record<string, unknown>;
  quickFilters: Record<string, unknown>;
  keyword: string;
  tab: string | undefined;
}

type UpdateQueryPayload = Partial<QueryState>;

export const useQueryState = (
  initialQuery: Partial<QueryState> = { order: 'asc', pageSize: 8 },
  { prefix = '' }: UseQueryStateOptions = {},
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const queryObjRef = useRef<Record<string, string | number | null | Record<string, unknown>>>({});

  // console.log('queryObjRef', queryObjRef);

  const initialQueryPrefix = useMemo(() => {
    return Object.fromEntries(
      Object.entries(initialQuery).map(([key, value]) => {
        if (typeof value === 'object') {
          value = JSON.stringify(value);
        }
        return [`${prefix}${key}`, value];
      }),
    );
  }, [initialQuery, prefix]);

  const pf = useMemo(() => prefix.trim(), [prefix]);

  const [$page, $pageSize, $orderBy, $order, $filters, $quickFilters, $keyword, $tab] = useMemo(
    () => [
      `${pf}page`,
      `${pf}limit`,
      `${pf}orderBy`,
      `${pf}order`,
      `${pf}filters`,
      `${pf}quickFilters`,
      `${pf}keyword`,
      `${pf}tab`,
    ],
    [pf],
  );

  const jsonParse = <T>(str: string | null, fallback: T): T => {
    // console.log('srt', str);
    try {
      return str ? JSON.parse(str) : fallback;
    } catch {
      return fallback;
    }
  };

  const queryObj = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    // console.log('params', params);
    const result = { ...initialQueryPrefix, ...params };
    // console.log('result', result);

    if (!queryObjRef.current || JSON.stringify(result) !== JSON.stringify(queryObjRef.current)) {
      queryObjRef.current = result;
    }

    return queryObjRef.current || {};
  }, [searchParams, initialQueryPrefix, pathname]);

  const page = useMemo(() => {
    const pageNumber = Number(queryObj[$page]);
    return isNaN(pageNumber) ? 1 : pageNumber;
  }, [queryObj, $page]);

  const pageSize = useMemo(() => {
    const pageSizeNumber = Number(queryObj[$pageSize]);
    return isNaN(pageSizeNumber) ? 8 : pageSizeNumber;
  }, [queryObj, $pageSize]);

  const filters = useMemo(() => {
    return jsonParse<Record<string, unknown>>(queryObj[$filters] as string | null, {});
  }, [queryObj, $filters]);

  const quickFilters = useMemo(
    () => jsonParse<Record<string, unknown>>(queryObj[$quickFilters] as string | null, {}),
    [queryObj, $quickFilters],
  );

  const keyword = useMemo(() => String(queryObj[$keyword] || ''), [queryObj, $keyword]);

  const order = useMemo(() => String(queryObj[$order] || ''), [queryObj, $keyword]);

  const orderBy = useMemo(() => String(queryObj[$orderBy] || ''), [queryObj, $keyword]);

  const tab = useMemo(() => String(queryObj[$tab] || initialQueryPrefix?.tab), [queryObj, $tab, initialQueryPrefix]);

  const updateUrl = useCallback(
    (obj: UpdateQueryPayload = {}) => {
      const updatedQuery = {
        ...initialQueryPrefix,
        ...queryObj,
        ...obj,
      };
      console.log('queryObj', queryObj);
      console.log('obj', obj);
      console.log('updateUrl', updatedQuery);
      const searchParams = new URLSearchParams();

      Object.entries(updatedQuery).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'object') {
            searchParams.set(key, JSON.stringify(value));
          } else {
            searchParams.set(key, String(value));
          }
        } else {
          searchParams.delete(key);
        }
      });

      router.replace(`${pathname}?${searchParams.toString()}`);
    },
    [pathname, queryObj, initialQueryPrefix],
  );

  const setMultiple = useCallback(
    (payload: Record<string, unknown>) => {
      const updatedQuery = {
        ...queryObj,
        ...payload,
      };

      const searchParams = new URLSearchParams();

      Object.entries(updatedQuery).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          if (typeof value === 'object') {
            searchParams.set(key, JSON.stringify(value));
          } else {
            searchParams.set(key, String(value));
          }
        } else {
          searchParams.delete(key);
        }
      });

      router.replace(`${pathname}?${searchParams.toString()}`);
    },
    [queryObj, pathname, router],
  );

  const setPage = useCallback((payload: number) => updateUrl({ [$page]: payload }), [updateUrl, $page]);

  const setPageSize = useCallback(
    (payload: number) => updateUrl({ [$pageSize]: payload, [$page]: 1 }),
    [updateUrl, $pageSize],
  );

  const setOrder = useCallback((payload: string) => updateUrl({ [$order]: payload, [$page]: 1 }), [updateUrl, $order]);

  const setOrderBy = useCallback(
    (payload: string) => updateUrl({ [$orderBy]: payload, [$page]: 1 }),
    [updateUrl, $orderBy],
  );

  const setFilters = useCallback(
    (payload: Record<string, unknown>) => updateUrl({ [$filters]: payload, [$page]: 1 }),
    [updateUrl, $filters],
  );

  const setQuickFilters = useCallback(
    (payload: Record<string, unknown>) => updateUrl({ [$quickFilters]: payload, [$page]: 1 }),
    [updateUrl, $quickFilters],
  );

  const setKeyword = useCallback(
    (payload: string) => {
      console.log('payload', payload);
      updateUrl({ [$keyword]: payload, [$page]: 1 });
    },
    [updateUrl, $keyword],
  );

  const setTab = useCallback((payload: string) => updateUrl({ [$tab]: payload, [$page]: 1 }), [updateUrl, $tab]);

  return {
    page,
    pageSize,
    filters,
    quickFilters,
    keyword,
    tab,
    order,
    orderBy,
    setPage,
    setPageSize,
    setFilters,
    setQuickFilters,
    setKeyword,
    setTab,
    setOrder,
    setOrderBy,
    setMultiple,
  };
};
