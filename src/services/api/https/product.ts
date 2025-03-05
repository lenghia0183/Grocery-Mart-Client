import useSWR from 'swr';
import { api } from '../axios';
import { GetProductParams, GetProductResponse } from '@/types/product';

export const useGetProduct = (filters: GetProductParams) => {
  const url = 'v1/product';
  const fetcher = async (url: string) => {
    return api.get<GetProductResponse>(url, { params: filters });
  };

  return useSWR(url, fetcher);
};
