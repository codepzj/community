import request from "@/utils/request";

export const getRepairType = () => {
  return request.get("/repair_type/all");
};
