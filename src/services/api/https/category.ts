import useSWR from 'swr';
import { api } from '../axios';
import {} from '@/types/manufacturer';
import { GetCategoryResponse } from '@/types/category';

export const useGetCategory = () => {
  const url = 'v1/category';
  const fetcher = async (url: string, arg: Record<string, string>) => {
    const response = await api.get<GetCategoryResponse>(url, arg);

    return response?.data;
  };

  return useSWR(url, fetcher);
};
