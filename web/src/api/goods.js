import request from "@/utils/request";

export const getGoodsList = () => {
  return request.get("/goods/all");
};

