'use client';

import { createContext, useContext } from 'react';
import { useGetMe } from '@/services/api/https/user';
import { UserData } from '@/types/user';
import { LoginResponse } from '@/types/auth';
import { setLocalStorageItem } from '@/utils';
import { useGetMyFavorite } from '@/services/api/https/favorite';

interface UserContextType {
  userData: UserData | null;
  isLoading: boolean;
  userFavoritesCount: number;
  loginUser: (loginData: LoginResponse | undefined) => void;
  logoutUser: () => void;
  refreshUserFavorites: () => void;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  isLoading: true,
  userFavoritesCount: 0,
  loginUser: () => {},
  logoutUser: () => {},
  refreshUserFavorites: () => {},
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading: isLoadingGetMe, isValidating: isValidatingGetMe, mutate: refreshGetMe } = useGetMe();
  const { data: userFavoriteData, mutate: refreshUserFavorites } = useGetMyFavorite({ page: 1, limit: 50 });

 

  const loginUser = (loginData: LoginResponse | undefined) => {
    setLocalStorageItem('user', loginData?.user);
    setLocalStorageItem('accessToken', loginData?.accessToken);
    setLocalStorageItem('refreshToken', loginData?.refreshToken);

    refreshUserFavorites();
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
      value={{
        userData: data ?? null,
        isLoading: isLoadingGetMe || isValidatingGetMe,
        userFavoritesCount: userFavoriteData?.data?.totalResult || 0,
        refreshUserFavorites,
        loginUser,
        logoutUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}
