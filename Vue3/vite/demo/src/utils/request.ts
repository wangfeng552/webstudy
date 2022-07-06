/**
 * @description 请求封装，对外暴露了get、post、put、del四个方法及axios实例
 */
import axios from "axios";
import { message } from "ant-design-vue";
import type { AxiosRequestConfig, AxiosInstance, AxiosResponse } from "axios";
import { handleData } from "@/utils/common";
import {
  promiseApi,
  IOption,
  apiReturnType,
  NormalReturnType,
} from "@/api/BasicResponseModel";
import { RequestEnum } from "@/enums/httpEnum";

// 从全局变量中获取，这是vite打包打进去的
const { VITE_GLOB_API_HOST } = import.meta.env;

// TODO 初始化的时候参数根据实际情况来吧
const instance: AxiosInstance = axios.create({
  // baseURL: VITE_GLOB_API_HOST,
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 5000,
  headers: {
    "X-Token": "token",
    "x-user-id": 1,
  },
});

const fetch = <T>(
  url: string,
  options: IOption,
  config?: AxiosRequestConfig
): Promise<AxiosResponse<apiReturnType<T>>> => {
  const { method = RequestEnum.GET, params } = options;
  switch (method) {
    case RequestEnum.GET:
      return instance.get(url, {
        params,
        ...config,
      });
    case RequestEnum.DELETE:
      return instance.delete(url, config);
    case RequestEnum.HEAD:
      return instance.head(url, {
        params,
        ...config,
      });
    case RequestEnum.POST:
      return instance.post(url, params, config);
    case RequestEnum.PUT:
      return instance.put(url, params, config);
    case RequestEnum.PATCH:
      return instance.patch(url, params, config);
    default:
      return instance.request(config);
  }
};

/**
 * @description 请求
 * @param url
 * @param options
 * @param config
 */
const request = async <T>(
  url: string,
  options: IOption,
  config?: AxiosRequestConfig
): promiseApi<T> => handleData<T>(await fetch<T>(url, options, config));

/**
 * @description get请求
 * @param url
 * @param options
 * @param config
 */
export const get = <T>(
  url: string,
  options?: Record<string, unknown>,
  config?: AxiosRequestConfig
): promiseApi<T> => request<T>(url, { ...options, method: RequestEnum.GET }, config);

/**
 * @description post请求
 * @param url
 * @param options
 * @param config
 */
export const post = <T>(
  url: string,
  options?: Record<string, unknown>,
  config?: AxiosRequestConfig
): promiseApi<T> => request<T>(url, { ...options, method: RequestEnum.POST }, config);

/**
 * @description put请求
 * @param url
 * @param options
 * @param config
 */
export const put = <T>(
  url: string,
  options?: Record<string, unknown>,
  config?: AxiosRequestConfig
): promiseApi<T> => request<T>(url, { ...options, method: RequestEnum.PUT }, config);

/**
 * @description del请求
 * @param url
 * @param options
 * @param config
 */
export const remove = <T>(
  url: string,
  options?: Record<string, unknown>,
  config?: AxiosRequestConfig
): promiseApi<T> => request<T>(url, { ...options, method: RequestEnum.DELETE }, config);

// http request 拦截器
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse<NormalReturnType<unknown>>) => {
    const { data, status } = response;

    if (status >= 200 && status < 300) {
      const { error } = data;
      if (error.code !== 0) {
        message.error(error.message);
      } else {
        return response;
      }
    }

    return response;
  },
  (err) => {
    return err;
  }
);

export default instance;
