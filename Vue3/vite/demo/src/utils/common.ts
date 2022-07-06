import type { AxiosResponse } from "axios";
import md5 from "blueimp-md5";
import dayjs from "dayjs";
import { FORMAT_DATETIME } from "@/common/constants";
import { ApiReturnType } from "@/api/BasicResponseModel";

/**
 * @description blob格式转file
 * @param file 文件 any类型为了不报错
 */
const blobToFile = (file: any): File => new window.File([file], file.name, { type: file.type });

/**
 * @description blob格式转base64
 * @param blob 文件
 */
const blobToBase64 = (blob: Blob) => {
  return new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.onload = (e) => {
      resolve(e.target?.result);
    };
    // readAsDataURL
    fileReader.readAsDataURL(blob);
    fileReader.onerror = () => {
      reject(new Error("blobToBase64 error"));
    };
  });
};

/**
 * @description 处理数据
 * @param result 请求返回值
 * @return Error 或者 对象 Promise<AxiosResponse<T>>
 */
const handleData = <T>(result: AxiosResponse<ApiReturnType<T>>): ApiReturnType<T> | never => {
  if (result) {
    const { status, data } = result;

    if (!status) {
      throw new Error(result.toString());
    }

    return { ...data, success: data?.error?.code === 0 };
  }
  throw new Error("未知错误，没有获取到任何返回值");
};

/**
 * @description 获取格式化时间
 * @param param 时间
 * @param format 时间
 * @return 格式化后的时间 默认到时分秒
 */
const getDateTime = (
  param: string | number | Date | undefined,
  format = FORMAT_DATETIME
): string => {
  if (dayjs(param).isValid()) {
    return dayjs(param).format(format);
  }
  return "";
};




export { blobToFile, blobToBase64, handleData, getDateTime };
