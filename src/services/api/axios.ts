/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { getCookie, setCookie } from 'cookies-next';
import { getLocalStorageItem, setLocalStorageItem } from '../../utils/localStorage';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL + '/api/';
const BASE_URL_GHN = process.env.NEXT_PUBLIC_BASE_URL_GHN || '';
const TOKEN_GHN = process.env.NEXT_PUBLIC_GHN_API_KEY || '';
const SHOP_ID_GHN = process.env.NEXT_PUBLIC_GHN_SHOP_ID || '';

const REFRESH_TOKEN_URL = 'v1/auth/refresh-token';
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
    (config: InternalAxiosRequestConfig) => {
      let token: string | undefined;
      if (typeof window === 'undefined') {
        token = getCookie('token') as string | undefined;
      } else {
        token = getLocalStorageItem('token') || (getCookie('token') as string | undefined);
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
      const { response, config: originalRequest } = error;
      if (
        response?.status === 401 &&
        !originalRequest?._isRefreshBefore &&
        originalRequest?.url !== REFRESH_TOKEN_URL &&
        getLocalStorageItem('refreshToken')
      ) {
        originalRequest._isRefreshBefore = true;
        try {
          const refresh = await refreshAccessToken();
          const newAccessToken = refresh?.data?.accessToken;

          if (newAccessToken) {
            setLocalStorageItem('token', newAccessToken);
            setCookie('token', newAccessToken);
            setCookie('refreshToken', newAccessToken);

            originalRequest.headers = {
              ...originalRequest.headers,
              Authorization: `Bearer ${newAccessToken}`,
            };
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

export const createApi = (instance: AxiosInstance) => ({
  instance,

  post: async (endpoint: string, params: unknown) => {
    try {
      return await instance.post(endpoint, params);
    } catch (err: AxiosError | unknown) {
      return (err as AxiosError)?.response?.data || err;
    }
  },

  postMultiplePart: async (endpoint: string, params: unknown) => {
    try {
      return await instance.post(endpoint, params, {
        headers: HEADERS_MULTIPLE_PART,
      });
    } catch (err: AxiosError | unknown) {
      return (err as AxiosError)?.response?.data || err;
    }
  },

  get: async (endpoint: string, params: Record<string, unknown> = {}, options: InternalAxiosRequestConfig = {}) => {
    try {
      return await instance.get(endpoint, { ...options, params });
    } catch (err: AxiosError | unknown) {
      return (err as AxiosError)?.response?.data || err;
    }
  },

  put: async (endpoint: string, params: unknown) => {
    try {
      return await instance.put(endpoint, params);
    } catch (err: AxiosError | unknown) {
      return (err as AxiosError)?.response?.data || err;
    }
  },

  patch: async (endpoint: string, params: unknown) => {
    try {
      return await instance.patch(endpoint, params);
    } catch (err: AxiosError | unknown) {
      return (err as AxiosError)?.response?.data || err;
    }
  },

  delete: async (endpoint: string, params: unknown) => {
    try {
      return await instance.delete(endpoint, { data: params });
    } catch (err: AxiosError | unknown) {
      return (err as AxiosError)?.response?.data || err;
    }
  },
});

export const refreshAccessToken = async () => {
  const refreshToken = getCookie('refreshToken') as string | undefined;
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
