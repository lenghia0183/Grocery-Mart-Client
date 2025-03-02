import useSWR, { SWRConfiguration } from 'swr';
import { api } from '../axios';
import {} from '@/types/manufacturer';
import { GetCategoryResponse } from '@/types/category';
import sleep from '@/utils/sleep';

export const useGetCategory = (config?: SWRConfiguration) => {
  const url = 'v1/category';
  const fetcher = async (url: string, arg: Record<string, string>) => {
    const response = await api.get<GetCategoryResponse>(url, arg);

    await sleep(30000);

    return response?.data;
  };

  return useSWR(url, fetcher, {
    ...config,
    showLoading: false,
  });
};
