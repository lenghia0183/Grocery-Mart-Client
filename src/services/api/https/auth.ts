import useSWRMutation from 'swr/mutation';
import { api } from '../axios';
import { LoginBody, LoginResponse, SignUpBody, SignUpResponse } from '@/types/auth';

export const useLogin = () => {
  const url = 'v1/auth/login';

  const fetcher = async (key: string, { arg }: { arg: LoginBody }) => {
    return api.post<LoginResponse, LoginBody>(key, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useRegister = () => {
  const url = 'v1/auth/register';
  const fetcher = async (url: string, { arg }: { arg: SignUpBody }) => {
    return api.post<SignUpResponse, SignUpBody>(url, arg);
  };

  return useSWRMutation(url, fetcher);
};
