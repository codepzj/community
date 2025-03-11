import request from "@/utils/request";
import type { Response } from "@/api/interfaces/resp";
import type { UpdateRepairStatusReq } from "../interfaces/review";

export const getPendingRepair: () => Promise<Response<any>> = () => {
  return request.get("/admin/repair/pending");
};

export const checkRepair: (id: number, data: UpdateRepairStatusReq) => Promise<Response<any>> = (id, data) => {
  return request.put(`/admin/repair/update/${id}`, data);
};
