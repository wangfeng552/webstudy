// 品牌
import { IBasePageParams, list } from "@/api/BasicResponseModel";

export type IBrandItem = {
  brand_descp: string;
  brand_name: string;
  brand_number: string;
  brand_opTime: number;
  id: number;
  [propName: string]: any; // 任意属性
};

export type IBrandAdd = {
  brandName: string;
  brandNumber: string;
  brandDescp: string;
};

export type IchafenItem = {
  id: number;
  name: string
  descp: string
  os: number
  file: string
}

export type IModelSelectDataType = {
  brand_name: string;
  model_name: string;
  model_number: string;
  model_descp: string;
  model_year: string;
  id: number;
}
export type IModelSelect = IModelSelectDataType[]

export type IBrandEdit = IBrandAdd & { id?: number };

// 品牌列表返回类型
export type IBrandList = IBrandItem[];
// 品牌列表请求类型
export type IBrandListParam = IBasePageParams & {
  keyword: string;
};

// 差分列表返回

export type IChafenList = list<IchafenItem>;

// export type IModelSelect = IModelSelectDataType[]


