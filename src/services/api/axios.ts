/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse, AxiosHeaders } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/localStorage';
import { ApiResponse } from '@/types/ApiResponse';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
const BASE_URL_GHN = process.env.NEXT_PUBLIC_BASE_URL_GHN || '';
const TOKEN_GHN = process.env.NEXT_PUBLIC_GHN_API_KEY || '';
const SHOP_ID_GHN = process.env.NEXT_PUBLIC_GHN_SHOP_ID || '';
const isDevelopment = process.env.NEXT_PUBLIC_ENV === 'development';

const REFRESH_TOKEN_URL = 'auth/refresh-tokens';
const HEADERS_MULTIPLE_PART = {
  'Content-Type': 'multipart/form-data; boundary=something',
};

export const createInstance = (baseURL: string, customHeaders: Record<string, string> = {}): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      ...customHeaders,
    },
  });

  instance.interceptors.request.use(
    (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
      let token: string | undefined;
      if (typeof window === 'undefined') {
        token = getCookie('accessToken') as string | undefined;
      } else {
        token = getLocalStorageItem('accessToken') || (getCookie('accessToken') as string | undefined);
      }

      if (config.url !== REFRESH_TOKEN_URL && token) {
        config.headers = axios.AxiosHeaders.from(config.headers || {});
        config.headers.set('Authorization', `Bearer ${token}`);
      }
      return config;
    },
    (error: AxiosError) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      if (response.status >= 200 && response.status < 300) {
        return response.data;
      } else if (response.status === 401) {
        // triggerLogout();
      }
      return Promise.reject(response);
    },
    async (error: AxiosError) => {
      const { response } = error;

      const originalRequest = error.config as InternalAxiosRequestConfig & { _isRefreshBefore?: boolean };

      if (
        response?.status === 401 &&
        !originalRequest._isRefreshBefore &&
        originalRequest?.url !== REFRESH_TOKEN_URL &&
        getLocalStorageItem('refreshToken')
      ) {
        originalRequest._isRefreshBefore = true;
        try {
          const refresh = await refreshAccessToken();
          const newAccessToken = refresh?.data?.accessToken;

          if (newAccessToken) {
            setLocalStorageItem('accessToken', newAccessToken);
            setCookie('accessToken', newAccessToken);
            setCookie('refreshToken', newAccessToken);

            originalRequest.headers = AxiosHeaders.from(originalRequest.headers || {});
            originalRequest.headers.set('Authorization', `Bearer ${newAccessToken}`);
            return instance(originalRequest);
          }
        } catch (refreshError) {
          //   triggerLogout();
        }
      }

      return Promise.reject(error);
    },
  );

  return instance;
};

const handleAxiosError = <T>(err: unknown): ApiResponse<T> => {
  if (axios.isAxiosError(err)) {
    const errorResponse: ApiResponse<T> = {
      code: err.response?.data?.code || err.response?.status || 500,
      message: err.response?.data?.message || err.message,
      ...(isDevelopment ? { errorDetails: err } : {}),
    };
    return errorResponse;
  }
  throw err;
};

export const createApi = (instance: AxiosInstance) => ({
  instance,

  post: async <T, P>(endpoint: string, params: P): Promise<ApiResponse<T>> => {
    try {
      return await instance.post(endpoint, params);
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  postMultiplePart: async <T>(endpoint: string, params: Record<string, unknown>): Promise<ApiResponse<T>> => {
    try {
      return await instance.post(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
      });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  get: async <T>(
    endpoint: string,
    params: Record<string, unknown> = {},
    options: Record<string, string> = {},
  ): Promise<ApiResponse<T>> => {
    try {
      return await instance.get(endpoint, { ...options, ...params });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  put: async <T>(endpoint: string, params: Record<string, unknown>): Promise<ApiResponse<T> | AxiosError> => {
    try {
      return await instance.put(endpoint, params);
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  patch: async <T>(endpoint: string, params: Record<string, unknown>): Promise<ApiResponse<T> | AxiosError> => {
    try {
      return await instance.patch(endpoint, params);
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },

  delete: async <T>(endpoint: string, params: Record<string, unknown>): Promise<ApiResponse<T> | AxiosError> => {
    try {
      return await instance.delete(endpoint, { data: params });
    } catch (err: unknown) {
      return handleAxiosError(err);
    }
  },
});

export const refreshAccessToken = async () => {
  const refreshToken = (getCookie('refreshToken') as string | undefined) || getLocalStorageItem('refreshToken');
  return api.instance.post(REFRESH_TOKEN_URL, {
    refreshToken,
  });
};

const instance = createInstance(BASE_URL);
const instanceGhn = createInstance(BASE_URL_GHN, {
  Token: TOKEN_GHN,
  ShopId: SHOP_ID_GHN,
});

const api = createApi(instance);
const ghnApi = createApi(instanceGhn);

export { api, ghnApi };
