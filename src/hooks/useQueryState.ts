import { useCallback, useMemo, useRef } from "react";
import { useSearchParams, usePathname } from "next/navigation";

interface UseQueryStateOptions {
  prefix?: string;
}

interface Sort {
  orderBy: string;
  order: string;
}

export const useQueryState = (
  initialQuery: Record<string, any> = {},
  { prefix = "" }: UseQueryStateOptions = {}
) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const queryObjRef = useRef<Record<string, any>>();

  const pf = useMemo(() => prefix.trim(), [prefix]);
  const $page = `${pf}page`;
  const $pageSize = `${pf}limit`;
  const $orderBy = `${pf}orderBy`;
  const $order = `${pf}order`;
  const $filters = `${pf}filters`;
  const $quickFilters = `${pf}quickFilters`;
  const $keyword = `${pf}keyword`;
  const $tab = `${pf}tab`;

  const jsonParse = (str: string | null, fallback: any) => {
    try {
      return str ? JSON.parse(str) : fallback;
    } catch {
      return fallback;
    }
  };

  const queryObj = useMemo(() => {
    const params = Object.fromEntries(searchParams.entries());
    const result = { ...initialQuery, ...params };

    if (
      !queryObjRef.current ||
      JSON.stringify(result) !== JSON.stringify(queryObjRef.current)
    ) {
      queryObjRef.current = result;
    }

    return queryObjRef.current;
  }, [searchParams, initialQuery]);

  const page = useMemo(() => Number(queryObj[$page] || 1), [queryObj, $page]);
  const pageSize = useMemo(
    () => (queryObj[$pageSize] ? Number(queryObj[$pageSize]) : undefined),
    [queryObj, $pageSize]
  );

  const sort: Sort | null = useMemo(
    () =>
      queryObj[$orderBy] && queryObj[$order]
        ? { orderBy: queryObj[$orderBy], order: queryObj[$order] }
        : null,
    [queryObj, $orderBy, $order]
  );

  const filters = useMemo(
    () => jsonParse(queryObj[$filters], {}),
    [queryObj, $filters]
  );
  const quickFilters = useMemo(
    () => jsonParse(queryObj[$quickFilters], {}),
    [queryObj, $quickFilters]
  );
  const keyword = useMemo(() => queryObj[$keyword] || "", [queryObj, $keyword]);
  const tab = useMemo(
    () => queryObj[$tab] || initialQuery?.tab,
    [queryObj, $tab]
  );

  const updateUrl = useCallback(
    (obj: Record<string, any> = {}) => {
      const updatedQuery = {
        ...initialQuery,
        ...queryObj,
        ...obj,
      };

      const searchParams = new URLSearchParams();
      Object.entries(updatedQuery).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== "") {
          searchParams.set(
            key,
            typeof value === "object" ? JSON.stringify(value) : String(value)
          );
        }
      });

      window.history.replaceState(
        null,
        "",
        `${pathname}?${searchParams.toString()}`
      );
    },
    [pathname, queryObj, initialQuery]
  );

  const setPage = useCallback(
    (payload: number) => updateUrl({ [$page]: payload }),
    [updateUrl, $page]
  );
  const setPageSize = useCallback(
    (payload: number) => updateUrl({ [$pageSize]: payload, [$page]: 1 }),
    [updateUrl, $pageSize, $page]
  );
  const setSort = useCallback(
    (payload: Sort) =>
      updateUrl({
        [$orderBy]: payload.orderBy,
        [$order]: payload.order,
        [$page]: 1,
      }),
    [updateUrl, $orderBy, $order, $page]
  );
  const setFilters = useCallback(
    (payload: Record<string, any>) =>
      updateUrl({ [$filters]: payload, [$page]: 1 }),
    [updateUrl, $filters, $page]
  );
  const setQuickFilters = useCallback(
    (payload: Record<string, any>) =>
      updateUrl({ [$quickFilters]: payload, [$page]: 1 }),
    [updateUrl, $quickFilters, $page]
  );
  const setKeyword = useCallback(
    (payload: string) => updateUrl({ [$keyword]: payload, [$page]: 1 }),
    [updateUrl, $keyword, $page]
  );
  const setTab = useCallback(
    (payload: string) => updateUrl({ [$tab]: payload, [$page]: 1 }),
    [updateUrl, $tab, $page]
  );

  return {
    page,
    pageSize,
    sort,
    filters,
    quickFilters,
    keyword,
    tab,
    setPage,
    setPageSize,
    setSort,
    setFilters,
    setQuickFilters,
    setKeyword,
    setTab,
  };
};
