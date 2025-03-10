import request from "@/utils/request";

// 生成订单
export const createOrder = (data) => request.post("/order/create", data);

// 检查订单是否存在
export const checkOrderExist = (cart_id) => request.get(`/order/exist/${cart_id}`);

// 更新订单状态
export const updateOrderStatus = (order_id) => request.put(`/order/update/${order_id}`);

// 获取订单详情
export const getOrderDetailById = (order_id) => request.get(`/order/${order_id}`);

// 获取所有订单
export const getAllOrders = (user_id) => request.get(`/order/all/${user_id}`);

// 删除订单
export const deleteOrder = (order_id) => request.delete(`/order/delete/${order_id}`);
