export interface QueryState {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  order?: string;
  filters?: Record<string, string>;
  keyword?: string;
  tab?: string;
  quickFilters?: Record<string, string>;
  limit?: number;
}
