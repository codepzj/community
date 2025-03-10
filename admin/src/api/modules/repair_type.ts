import request from "@/utils/request";
import type { RepairTypeVO } from "@/api/interfaces/repair_type";
import type { Response } from "@/api/interfaces/resp";

export const getRepairTypeList: () => Promise<
  Response<RepairTypeVO[]>
> = () => {
  return request.get("/repair_type/all");
};
