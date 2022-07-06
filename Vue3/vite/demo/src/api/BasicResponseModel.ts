import type { Method } from "axios";

// 声明正常返回值类型
export type NormalReturnType<T> = {
  data?: T;
  error: error;
};

export type error = {
  code: number;
  message: string;
};

// 声明基础返回值类型
type BaseReturnType = {
  success: boolean;
};

// 声明返回值类型，仅限于 handleData 方法
export type apiReturnType<T = any> = NormalReturnType<T> & BaseReturnType;

// 声明返回值promise类型，用于定义请求
export type promiseApi<T> = Promise<apiReturnType<T>>;

// 列表页返回值需要的数据格式
export type list<T> = NormalReturnType<T> & {
  pageable: IPageable;
};

// 列表分页返回基础类型
export type IPageable = IBasePageParams & {
  total: number;
  totalPages: number;
};

// 列表分页请求基础类型
export type IBasePageParams = {
  page_number: number;
  page_size: number;
};

export type IOption = {
  method: Method;
  params?: Record<string, unknown>;
};
