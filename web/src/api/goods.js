import request from "@/utils/request";

export const getGoodsList = () => {
  return request.get("/goods/all");
};

export const getGoodsById = (id) => {
  return request.get(`/goods/${id}`);
};
