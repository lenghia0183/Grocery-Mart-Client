import useSWRMutation from 'swr/mutation';
import { api } from '../axios';
import {
  ChangePasswordBody,
  LoginBody,
  LoginResponse,
  SignUpBody,
  SignUpResponse,
  SocialLoginBody,
} from '@/types/auth';

export const useLogin = () => {
  const url = 'v1/auth/login';

  const fetcher = async (key: string, { arg }: { arg: LoginBody }) => {
    return api.post<LoginResponse, LoginBody>(key, arg);
  };

  return useSWRMutation(url, fetcher);
};

export const useSocialLogin = () => {
  const url = 'v1/auth/social-login';
  const fetcher = (url: string, { arg }: { arg: SocialLoginBody }) => {
    return api.post<LoginResponse, SocialLoginBody>(url, arg);
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

export const useChangePassword = () => {
  const url = 'v1/auth/change-password';
  const fetcher = (url: string, { arg }: { arg: ChangePasswordBody }) => {
    return api.put(url, arg);
  };

  return useSWRMutation(url, fetcher);
};
