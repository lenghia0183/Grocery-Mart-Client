'use client';

import { createContext, useContext } from 'react';
import { useGetMe } from '@/services/api/https/user';
import { UserData } from '@/types/user';
import { LoginResponse } from '@/types/auth';
import { setLocalStorageItem } from '@/utils';

interface UserContextType {
  userData: UserData | null;
  isLoading: boolean;
  loginUser: (loginData: LoginResponse | undefined) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  isLoading: true,
  loginUser: () => {},
  logoutUser: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading: isLoadingGetMe, isValidating: isValidatingGetMe, mutate: refreshGetMe } = useGetMe();

  const loginUser = (loginData: LoginResponse | undefined) => {
    setLocalStorageItem('user', loginData?.user);
    setLocalStorageItem('accessToken', loginData?.accessToken);
    setLocalStorageItem('refreshToken', loginData?.refreshToken);

    refreshGetMe();
  };

  const logoutUser = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  };

  console.log('userData', data);

  return (
    <UserContext.Provider
      value={{ userData: data ?? null, isLoading: isLoadingGetMe || isValidatingGetMe, loginUser, logoutUser }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
