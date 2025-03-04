import { COMMENT_STATUS, ORDER_STATUS, PAYMENT_GATEWAY, PAYMENT_METHOD } from '@/constants/common';

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
  status?: string;
}

export type OrderStatus = (typeof ORDER_STATUS)[keyof typeof ORDER_STATUS];

export type PaymentMethod = (typeof PAYMENT_METHOD)[keyof typeof PAYMENT_METHOD];

export type PaymentGateway = (typeof PAYMENT_GATEWAY)[keyof typeof PAYMENT_GATEWAY];

export type CommentStatus = (typeof COMMENT_STATUS)[keyof typeof COMMENT_STATUS];

export interface OrderStatusItem {
  label: string;
  value: OrderStatus;
}
