import request from "@/utils/request";
import type { RepairTypeVO, AddRepairTypeReq, UpdateRepairTypeReq } from "@/api/interfaces/repair_type";
import type { Response } from "@/api/interfaces/resp";

export const getRepairTypeList: () => Promise<
  Response<RepairTypeVO[]>
> = () => {
  return request.get("/repair_type/all");
};


export const addRepairType: (data: AddRepairTypeReq) => Promise<Response<void>> = (data) => {
  return request.post("/repair_type/create", data);
};

export const updateRepairType: (id: number, data: UpdateRepairTypeReq) => Promise<Response<void>> = (id, data) => {
  return request.put(`/repair_type/update/${id}`, data);
};

export const deleteRepairType: (id: number) => Promise<Response<void>> = (id) => {
  return request.delete(`/repair_type/delete/${id}`);
};

