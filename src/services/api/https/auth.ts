import useSWRMutation from 'swr/mutation';
import { api } from '../axios';
import { LoginBody, LoginResponse } from '@/types/auth';

export const useLogin = () => {
  const url = 'v1/auth/login';

  const fetcher = async (key: string, { arg }: { arg: LoginBody }) => {
    return api.post<LoginResponse, LoginBody>(key, arg);
  };

  return useSWRMutation(url, fetcher);
};
