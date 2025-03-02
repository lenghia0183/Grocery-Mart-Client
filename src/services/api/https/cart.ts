import useSWRMutation from 'swr/mutation';
import { api } from '../axios';
import { AddProductToCartBody } from '@/types/cart';
import sleep from '@/utils/sleep';

export const useAddProductToCart = () => {
  const url = 'v1/cart';
  const fetcher = async (url: string, { arg }: { arg: AddProductToCartBody }) => {
    const response = await api.post(url, arg);
    await sleep(1000);
    return response;
  };

  return useSWRMutation(url, fetcher);
};
