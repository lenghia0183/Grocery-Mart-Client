'use client';

import { createContext, useContext } from 'react';
import { useGetMe } from '@/services/api/https/user';
import { UserData } from '@/types/user';

interface UserContextType {
  userData: UserData | null;
  isLoading: boolean;
}

const UserContext = createContext<UserContextType>({
  userData: null,
  isLoading: true,
});

export function UserProvider({ children }: { children: React.ReactNode }) {
  const { data, isLoading } = useGetMe();

  console.log('loading', isLoading);

  return <UserContext.Provider value={{ userData: data ?? null, isLoading }}>{children}</UserContext.Provider>;
}

export function useUser() {
  return useContext(UserContext);
}
