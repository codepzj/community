import type {
  LoginReq,
  LoginVO,
  ResidentReq,
  User,
} from "@/api/interfaces/user";
import type { Response } from "@/api/interfaces/resp";
import request from "@/utils/request";
import type { ResidentVO } from "@/api/interfaces/user";

export const getResidentList: () => Promise<Response<ResidentVO[]>> = () => {
  return request.get("/admin/user/findAll");
};

export const deleteResidentById: (id: number) => Promise<Response<void>> = (
  id
) => {
  return request.delete(`/admin/user/delete/${id}`);
};

export const updateResident: (data: ResidentReq) => Promise<Response<void>> = (
  data
) => {
  return request.put("/admin/user/update", data);
};

export const addResident: (data: ResidentReq) => Promise<Response<void>> = (
  data
) => {
  return request.post("/admin/user/add", data);
};

// 登录
export const Login: (data: LoginReq) => Promise<Response<LoginVO>> = (data) => {
  return request.post("/admin/super/isExist", data);
};

export const getAllAdmin: () => Promise<Response<User[]>> = () => {
  return request.get("/admin/super/findAll");
};

export const addAdmin: (data: User) => Promise<Response<void>> = (data) => {
  return request.post("/admin/super/create", data);
};

export const updateAdmin: (data: User) => Promise<Response<void>> = (data) => {
  return request.put(`/admin/super/update/${data.id}`, data);
};

export const deleteAdmin: (id: number) => Promise<Response<void>> = (id) => {
  return request.delete(`/admin/super/delete/${id}`);
};
