import { post } from "@/utils/request";
import { promiseApi } from "../BasicResponseModel";
import { ILogin, IUser } from "@/api/user/type";

// 管理员登录，登录成功后，返回管理员信息
export const login = (param: ILogin): promiseApi<IUser> => post("/manager/login", { param });
