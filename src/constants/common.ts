import { OrderStatusItem } from '@/types/common';

export const ORDER_STATUS = {
  PENDING: 'pending',
  CONFIRMED: 'confirmed',
  REJECTED: 'reject',
  SHIPPING: 'shipping',
  SUCCESS: 'success',
  CANCELED: 'canceled',
} as const;

export const ORDER_STATUS_LIST: OrderStatusItem[] = [
  { label: 'pending', value: ORDER_STATUS.PENDING },
  { label: 'confirmed', value: ORDER_STATUS.CONFIRMED },
  { label: 'rejected', value: ORDER_STATUS.REJECTED },
  { label: 'shipping', value: ORDER_STATUS.SHIPPING },
  { label: 'success', value: ORDER_STATUS.SUCCESS },
  { label: 'canceled', value: ORDER_STATUS.CANCELED },
];

export const PAYMENT_METHOD = {
  COD: 'cod',
  BANK: 'Bank',
} as const;

export const PAYMENT_GATEWAY = {
  MOMO: 'MoMo',
  ZALO_PAY: 'ZaloPay',
} as const;

export const COMMENT_STATUS = {
  NOT_ALLOWED: 'not-allowed',
  ALLOWED: 'allowed',
  COMMENTED: 'commented',
} as const;

export const RATING_LIST = [
  { label: '5star', value: 5 },
  { label: '4star', value: 4 },
  { label: '3star', value: 3 },
  { label: '2star', value: 2 },
  { label: '1star', value: 1 },
];

export const ERROR = {
  UNAUTHENTICATED: 'unauthenticated',
  UNAUTHORIZED: 'unauthorized',
};

export const EVENT_EMITTER = {
  LOGOUT: 'logout',
};

export const CATEGORY_ID = {
  CACAO: '67d15f75649d62411760b5e5',
  TEA: '67d15f0e649d62411760b5da',
  COFFEE: '67d1597f2e777d99a23ef8f2',
};
