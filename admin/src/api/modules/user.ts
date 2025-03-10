import type {
  LoginForm,
  LoginVO,
  ResidentReq,
  UserListVO,
} from "@/api/interfaces/user";
import type { Response } from "@/api/interfaces/resp";
import request from "@/utils/request";
import type { ResidentVO } from "@/api/interfaces/user";

export const getResidentList: () => Promise<Response<ResidentVO[]>> = () => {
  return request.get("/admin/user/findAll");
};

export const userLogin: (data: LoginForm) => Promise<Response<LoginVO>> = (
  data
) => {
  return request.post("/user/login", data);
};

export const getUserList: () => Promise<Response<UserListVO>> = () => {
  return request.post("/user/list");
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
