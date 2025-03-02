import useSWRMutation from 'swr/mutation';
import { api } from '../axios';
import { AddProductToFavoriteListBody, GetFavoriteListResponse } from '@/types/favorite';
import useSWR from 'swr';
import { QueryState } from '@/types/common';

export const useAddProductToFavoriteList = (productId: string) => {
  const url = `v1/favorite/${productId}/toggle`;
  const fetcher = async (url: string, { arg }: { arg: AddProductToFavoriteListBody }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useGetMyFavorite = (filters: QueryState) => {
  const url = `v1/favorite/me`;
  const fetcher = async (url: string) => {
    const response = await api.get<GetFavoriteListResponse, QueryState>(url, filters);

    return response;
  };

  return useSWR(url, fetcher);
};
