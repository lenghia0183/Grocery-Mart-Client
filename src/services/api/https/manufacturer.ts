import useSWR, { SWRConfiguration } from 'swr';
import { api } from '../axios';
import { GetManufacturerResponse } from '@/types/manufacturer';

export const useGetManufacturer = (config?: SWRConfiguration) => {
  const url = 'v1/manufacturer';
  const fetcher = async (url: string, arg: Record<string, string>) => {
    const response = await api.get<GetManufacturerResponse>(url, arg);
    return response?.data;
  };

  return useSWR(url, fetcher, {
    ...config,
  });
};
