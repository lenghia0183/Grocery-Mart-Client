import useSWRMutation from 'swr/mutation';
import { api } from '../axios';
import { AddProductToCartBody, GetMyCartResponse, UpdateCartDetailBody } from '@/types/cart';
import sleep from '@/utils/sleep';
import useSWR from 'swr';

export const useAddProductToCart = () => {
  const url = 'v1/cart';
  const fetcher = async (url: string, { arg }: { arg: AddProductToCartBody }) => {
    const response = await api.post(url, arg);
    await sleep(1000);
    return response;
  };

  return useSWRMutation(url, fetcher);
};

export const useGetMyCart = () => {
  const url = 'v1/cart/me';
  const fetcher = async (url: string) => {
    const response = await api.get<GetMyCartResponse>(url);

    return response;
  };

  return useSWR(url, fetcher);
};

export const useUpdateCartDetail = () => {
  const url = 'v1/cart/me';
  const fetcher = (url: string, { arg }: { arg: UpdateCartDetailBody }) => {
    url += `/${arg?.cartDetailId}`;
    return api.put(url, { cartId: arg?.cartId, quantity: arg?.quantity });
  };

  return useSWRMutation(url, fetcher);
};
