import request from "@/utils/request";

// 添加商品到购物车
export const addCart = (data) => {
  return request.post("/cart/add", data);
};

// 获取购物车
export const getCart = (cart_id) => {
  return request.get(`/cart/get/${cart_id}`);
};
