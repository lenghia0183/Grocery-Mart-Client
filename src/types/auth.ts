import { UserData } from './user';

export interface LoginFormValues {
  email: string;
  password: string;
  showPassword: boolean;
}

export interface LoginBody {
  email: string;
  password: string;
}

export interface LoginResponse {
  user: UserData;
  accessToken: string;
  refreshToken: string;
}
