import useSWRMutation from 'swr/mutation';

import { AddOrderResponse, CheckoutBody } from '@/types/checkout';
import { api } from '../axios';

export const useAddOrder = () => {
  const url = 'v1/order';
  const fetcher = (url: string, { arg }: { arg: CheckoutBody }) => {
    console.log('arg', arg);
    return api.post<AddOrderResponse, CheckoutBody>(url, arg);
  };

  return useSWRMutation(url, fetcher);
};
