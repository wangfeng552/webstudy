import { get, post, put, remove } from "@/utils/request";
import { error, promiseApi, IBasePageParams } from "../BasicResponseModel";
import { IBrandAdd, IBrandEdit, IBrandList, IBrandListParam, IChafenList, IModelSelect } from "@/api/brand/type";
import axios from "axios";

//
export const brandList = (params: IBrandListParam): promiseApi<IBrandList> =>
  get("/api/equipment-ms/v1/brand", { params });

//
export const brandAdd = (params: IBrandAdd): promiseApi<error> =>
  post("/api/equipment-ms/v1/brand", { params });

//
export const brandEdit = (params: IBrandEdit): promiseApi<error> =>
  put("/api/equipment-ms/v1/brand", { params });

//
export const brandRemove = (id: number): promiseApi<error> =>
  remove("/api/equipment-ms/v1/brand", { params: { id } });

export const chafenList = (params: IBasePageParams): promiseApi<IChafenList> =>
  get("/api/equipment-ms/v1/delta-algos", { params });

export const ecuList = (params) =>
  get("/api/equipment-ms/v1/ecu", { params });

export const modelList = (params: IBasePageParams): promiseApi<IModelSelect> =>
  get("/api/equipment-ms/v1/model", { params });

export const service = async () => {
  const { data } = await axios.get("/api/equipment-ms/v1/brand", { headers: { "x-user-id": 1 } });
  return {
    sex: data.sex === 1 ? "Male" : "Female",
    ...data,
  };
};
