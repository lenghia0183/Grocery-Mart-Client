import useSWR from 'swr';
import { api } from '../axios';
import { QueryState } from '@/types/common';
import useSWRMutation from 'swr/mutation';
import { GetOrderResponse, UpdateStatusOrderBody } from '@/types/order';

export const useGetOrder = (filters: QueryState) => {
  const url = 'v1/order/me';
  const fetcher = async (url: string) => {
    console.log('filters', filters);
    return api.get<GetOrderResponse>(url, { params: filters });
  };

  return useSWR(url, fetcher);
};

export const useUpdateOrderStatus = () => {
  const url = 'v1/order/change-status';
  const fetcher = (url: string, { arg }: { arg: UpdateStatusOrderBody }) => {
    url += `/${arg?.orderId}`;
    return api.put(url, { status: arg.status });
  };

  return useSWRMutation(url, fetcher);
};
