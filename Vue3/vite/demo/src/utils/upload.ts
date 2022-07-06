/**
 * @description 请求封装，对外暴露了uploadImage及axios实例
 */
import axios from "axios";
import type { AxiosInstance, AxiosResponse } from "axios";
import { handleData } from "@/utils/common";
import { ApiReturnType } from "@/api/BasicResponseModel";
// import { randomString } from "@/utils/request";

// 从全局变量中获取，这是vite打包打进去的
const { VITE_GLOB_UPLOAD_HOST } = import.meta.env;

const instance: AxiosInstance = axios.create({
  baseURL: VITE_GLOB_UPLOAD_HOST,
  method: "POST",
  timeout: 30000,
  headers: {

  },
});

/**
 * @description 请求
 * @param url
 * @param param
 */
const request = async (url: string, param: Record<string, unknown>): Promise<ApiReturnType> =>
  handleData(await instance.post(url, param));

/**
 * @description post请求
 * @param url
 * @param param
 */
export const uploadImage = (url: string, param: Record<string, any>): Promise<ApiReturnType> =>
  request(url, param);

// 响应拦截
instance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data, status } = response;

    if (status >= 200 && status < 300) {
      const { code } = data;

      if (code !== 200) {
      }
    }

    return response;
  },
  (err) => {
    return err;
  }
);

export default instance;
