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

export interface SignUpFormValues {
  email: string;
  password: string;
  confirmPassword: string;
  showPassword: boolean;
  fullName: string;
}

export interface SignUpBody {
  email: string;
  password: string;
  fullname: string;
}

export interface SignUpResponse {
  user: UserData;
}
