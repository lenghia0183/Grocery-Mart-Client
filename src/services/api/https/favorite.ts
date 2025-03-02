import useSWRMutation from 'swr/mutation';
import { api } from '../axios';
import { AddProductToFavoriteListBody } from '@/types/favorite';

export const useAddProductToFavoriteList = (productId: string) => {
  const url = `v1/favorite/${productId}/toggle`;
  const fetcher = async (url: string, { arg }: { arg: AddProductToFavoriteListBody }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher);
};
