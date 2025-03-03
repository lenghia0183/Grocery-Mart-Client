import useSWR from 'swr';
import { api } from '../axios';
import { ChangeUserDataBody, UserData } from '@/types/user';
import useSWRMutation from 'swr/mutation';

export const useGetMe = () => {
  const url = `v1/auth/me`;
  const fetcher = async (url: string) => {
    const response = await api.get<UserData>(url);
    return response.data;
  };

  return useSWR(url, fetcher);
};

export const useUpdateMe = () => {
  const url = `v1/auth/me`;

  const fetcher = (
    url: string,
    {
      arg,
    }: {
      arg: ChangeUserDataBody;
    },
  ) => {
    console.log('arg', arg);
    const formData = new FormData();

    Object.entries(arg).forEach(([key, value]) =>
      formData.append(key, value instanceof File ? value : JSON.stringify(value)),
    );

    console.log('formData', formData);

    return api.putMultiplePart(url, formData);
  };

  return useSWRMutation(url, fetcher);
};
