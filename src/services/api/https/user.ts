import useSWR from 'swr';
import { api } from '../axios';
import { UserData } from '@/types/user';

export const useGetMe = () => {
  const url = `v1/auth/me`;
  const fetcher = async (url: string) => {
    const response = await api.get<UserData>(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};
