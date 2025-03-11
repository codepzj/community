import request from "@/utils/request";
import type { GoodsVO, AddGoodsReq, UpdateGoodsReq } from "@/api/interfaces/goods";
import type { Response } from "@/api/interfaces/resp";

export const getGoodsList = () => {
  return request.get<GoodsVO[]>("/goods/all");
};

export const addGoods: (data: AddGoodsReq) => Promise<Response<GoodsVO>> = (data) => {
  return request.post("/admin/goods/create", data);
};

export const updateGoods: (data: UpdateGoodsReq) => Promise<Response<GoodsVO>> = (data) => {
  return request.put(`/admin/goods/update/${data.id}`, data);
};

export const deleteGoods: (id: number) => Promise<Response<GoodsVO>> = (id) => {
  return request.delete(`/admin/goods/delete/${id}`);
};
